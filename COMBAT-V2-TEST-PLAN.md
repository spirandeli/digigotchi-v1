# COMBAT-V2-TEST-PLAN.md
# PLANO DE TESTES, QA E VALIDAÇÃO — COMBAT V2
**Projeto:** Digigotchi — Tamagotchi + Caminho Digital  
**Ambiente:** `http://172.27.140.162:8080/` e Node Test Runner (`tsx --test`)  
**Objetivo:** Garantir fidelidade matemática, estabilidade de gameplay, ausência de vazamento de memória e alta performance sob estresse de hordas.

---

## 1. SUÍTE DE TESTES UNITÁRIOS (AUTOMATIZADOS)

Estes testes serão executados pelo comando padrão `npm test` (`tsx --test`):

### 1.1 Dano, Armadura e Acertos Críticos (`damage.test.ts`)
- `calculates basic damage correctly`: Dano bruto igual a `baseDamage * mightMultiplier`.
- `applies flat armor reduction correctly`: `finalDamage = Math.max(1, rawDamage - enemyArmor)`. Garante que dano nunca seja 0 ou negativo.
- `applies critical strike multiplier`: Verifica que quando `isCrit == true`, o dano é multiplicado por `critMultiplier` (ex: 2.0x) e gera hitstop.
- `respects canCrit = false`: Habilidades de dano periódico (Burn/Poison) não devem gerar acertos críticos aleatórios.

### 1.2 Timers e Cooldowns Independentes (`cooldown.test.ts`)
- `independent timers for multiple weapons`: Instancia 3 habilidades com cooldowns de 400ms, 850ms e 2200ms; avança o tempo virtual e valida que cada uma dispara exclusivamente em sua própria janela sem interferência mútua.
- `cooldown reduction modifier`: Redução de 20% reduz proporcionalmente o tempo de espera (`cooldown * 0.80`).

### 1.3 Seletores de Alvos (`target-selector.test.ts`)
- `selects nearest enemy`: Retorna o inimigo mais próximo dentro do alcance máximo.
- `selects facing direction`: Retorna alvos situados no cone/linha à frente da orientação do jogador (`right`, `left`, `up`, `down`).
- `selects densest cluster`: Com 20 inimigos espalhados, identifica corretamente o agrupamento com maior número de entidades para habilidades em área.

### 1.4 Progressão de XP e Fórmulas de Level-Up (`level-up.test.ts`)
- `calculates required XP curve smoothly`: Valida a progressão da fórmula `Math.floor(25 * Math.pow(level, 1.45))` dos níveis 1 ao 50.
- `handles multiple level ups in a single high XP burst`: Concessão de 1.000 XP no nível 1 deve enfileirar a quantidade correta de escolhas de melhoria sem descartar o excedente de XP.

### 1.5 Regras de Evolução de Habilidades (`evolution.test.ts`)
- `blocks evolution if weapon is below level 5`: Rejeita transformação mesmo que o jogador possua a passiva necessária.
- `blocks evolution if required passive is missing`: Rejeita transformação se a arma estiver no nível 5 mas a passiva não estiver no inventário.
- `approves evolution when level 5 and passive are present`: Promove com sucesso a habilidade para seu ID e comportamento evoluído.

### 1.6 Status Effects e Resistências (`status-effects.test.ts`)
- `merges status effects refreshing duration instead of duplicating`: Reaplicar queimadura reinicia o temporizador sem criar múltiplas instâncias concorrentes.
- `applies boss CC resistance`: Valida que um Freeze de 2.0 segundos dura apenas 300ms em um chefe com 85% de resistência.

---

## 2. SUÍTE DE TESTES DE INTEGRAÇÃO

### 2.1 WeaponManager + SpatialHashGrid
- Testa a emissão contínua de 50 projéteis contra 100 inimigos cadastrados no `SpatialHashGrid`.
- Valida que as consultas de colisão retornam apenas entidades das células vizinhas imediatas em tempo < 1.2ms.

### 2.2 LevelUpManager + React UI Bridge
- Simula o gatilho de level-up no runtime Phaser.
- Valida que o Phaser pausa imediatamente (`isPaused === true`).
- Valida que o evento dispara para o React com 3 opções válidas sem opções duplicadas.
- Valida que a seleção de uma opção retoma o loop do Phaser com os novos atributos aplicados.

### 2.3 Salvamento e Integridade do Save State
- Valida que mortes dentro do Caminho Digital nunca alteram nem resetam os status vitais do Tamagotchi (Fome, Higiene, Saúde, Felicidade).
- Valida que o Meta-XP e os Bits conquistados na partida são persistidos de forma idempotente e segura no save principal do jogador.

---

## 3. SUÍTE DE TESTES DE GAMEPLAY E E2E (BROWSER COM PLAYWRIGHT)

Executados no domínio real do projeto: `http://172.27.140.162:8080/`.

### 3.1 Movimentação e Ataques Simultâneos
- **Procedimento:** Pressionar e segurar `KeyD` e acionar disparos contínuos.
- **Asserção:** As coordenadas `player.x` e `player.y` devem incrementar continuamente a cada frame. O jogador **nunca pode parar ou engasgar** durante os ataques.

### 3.2 Mecânica de Dash (`Space`)
- **Procedimento:** Posicionar inimigos bloqueando o caminho e pressionar `Space`.
- **Asserção:** O jogador avança instantaneamente através do corpo dos inimigos; o HP do jogador não diminui (I-frames ativos); o rastro visual (ghost trail) é exibido na tela; o cooldown de 2.2s é ativado no HUD.

### 3.3 Coleta de Orbes de XP
- **Procedimento:** Eliminar um grupo de inimigos e permanecer parado à distância.
- **Asserção:** Orbes permanecem inertes no chão. Ao caminhar em direção a elas até entrar no `magnetRadius`, as orbes devem voar até o jogador e a barra de XP deve subir visivelmente.

### 3.4 Ciclo de Derrota e Reinício Imediato
- **Procedimento:** Sofrer dano até zerar o HP, aguardar mensagem de "Expedição Interrompida", clicar em "Retornar ao Tamagotchi" e imediatamente iniciar uma nova run do Caminho Digital.
- **Asserção:** A nova run deve inicializar em menos de 3 segundos; todos os controles do teclado (`W, A, S, D, Space`) devem responder perfeitamente; nenhum listener antigo deve disparar em duplicidade; zero erros no console do navegador.

---

## 4. TESTES DE ESTRESSE E PERFORMANCE

| Cenário de Teste | Entidades Ativas | Projéteis Ativos | Alvo de FPS | Limite Máximo de Frame Time | Comportamento Esperado |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Cenário A: Sala Padrão** | 25 inimigos | 8 projéteis | 60 FPS | 16.6 ms | Movimento suave, sem flutuação de render |
| **Cenário B: Mini-Wave** | 75 inimigos | 24 projéteis | 60 FPS | 17.0 ms | Sem quedas perceptíveis na taxa de quadros |
| **Cenário C: Horda Clímax** | 150 inimigos | 48 projéteis | >= 58 FPS | 17.5 ms | Pooling ativo; zero alocação de novos objetos |
| **Cenário D: Estresse Extremo** | 300 inimigos | 80 projéteis | >= 55 FPS | 18.2 ms | Spatial Hash mantém colisões rápidas sem lag |
| **Cenário E: Teste de Longa Duração** | 15 salas contínuas | Varia | >= 58 FPS | 16.8 ms | Memória JS Heap estável, sem memory leak |

---

## 5. AUDITORIA DE FIDELIDADE VISUAL E ASSETS

### 5.1 Inimigos Preto e Branco na GPU
- Validar via screenshot do Playwright que os inimigos continuam perfeitamente desaturados (escala de cinza) através do shader `preFX.addColorMatrix().grayscale(1)`.
- Validar que os arquivos de sprites originais em `public/sprites/[species]/` não sofreram alteração ou sobrescrita em disco.

### 5.2 Direcionamento e Alinhamento Visual
- Validar que habilidades direcionais disparam a partir do centro visual real do personagem (`x, y - 18`).
- Validar que projéteis rotacionam suavemente na direção do vetor de movimento (`0 rad` para direita, `PI/2` para baixo, `PI` para esquerda, `-PI/2` para cima).
- Validar que os efeitos de corte (slash) e explosão utilizam as texturas autênticas de `public/sprites/[species]/effects/` e `public/fx/`.

---

## 6. MATRIZ DE RISCO E MITIGAÇÃO

| Risco Identificado | Probabilidade | Impacto | Mitigação Arquitetural | Método de Detecção |
| :--- | :---: | :---: | :--- | :--- |
| **Sobrecarga de Projéteis / Queda de FPS** | Média | Alto | `maxInstances` por habilidade e `ObjectPool` estrito com teto fixo de instâncias. | FPS meter e monitoramento de frame time nos testes de estresse. |
| **Travamento de Teclado no Reinício** | Média | Alto | Preservar a rotina de limpeza de listeners em `DigitalPathGame.stop()` (`removeAllKeys` e `removeAllListeners`). | Teste E2E de ciclo contínuo: Run 1 -> Morte -> Run 2 -> Movimento. |
| **Stun-Lock Permanente em Chefes** | Baixa | Médio | Sistema de resistências em `StatusEffectManager` com redução de 85% de duração de CC em chefes. | Teste unitário de freeze contínuo contra `BossDefinition`. |
| **Danos Excessivos por Frame em AoE** | Alta | Médio | Aplicação de `hitIntervalMs: 350` com timestamp por entidade atingida. | Teste unitário de ticks em habilidades com duração persistente. |
| **Dessincronização de XP do Tamagotchi** | Baixa | Alto | Sincronização em tempo real mantida via callback `onAwardXp` e persistência idempotente no store. | Suíte de testes `xp-sync.test.ts` e `digital-path-bridge.test.ts`. |

---

## 7. CHECKLIST FINAL DE DEFINITION OF DONE (DOD)

```markdown
- [ ] O jogador move-se livremente em 8 direções e nunca congela durante ataques
- [ ] O Dash funciona exclusivamente na tecla Space com invulnerabilidade e cooldown próprio
- [ ] Ataques são disparados 100% de forma automática com timers e cooldowns independentes
- [ ] Inimigos derrotados dropam Orbes Físicos de XP no mapa
- [ ] O jogador atrai orbes através do raio de Magnet e recebe XP aumentado por Growth
- [ ] Atingir o XP da run pausa o combate e exibe modal com 3 cartas de melhoria balanceadas
- [ ] A build do jogador é limitada a até 4 habilidades ativas e 4 passivas
- [ ] Habilidades no nível 5 com a passiva correspondente evoluem ao abrir baús especiais
- [ ] Inimigos surgem em mini-ondas progressivas com escala de pressão por tempo de sala
- [ ] Inimigos de Elite surgem com auras e dropam baús de recompensa
- [ ] Batalhas de Chefe possuem 3 fases com telegraphs vermelhos de alerta
- [ ] O motor utiliza Object Pooling e Spatial Hash Grid sem criar/destruir sprites em tempo de execução
- [ ] Todos os inimigos continuam sendo renderizados em preto e branco sem editar os arquivos de imagem
- [ ] Todos os efeitos e projéteis utilizam exclusivamente os assets locais de public/sprites/ e public/fx/
- [ ] Ciclo completo de morte, retorno ao Tamagotchi e reinício imediato opera com zero erros de console
```
