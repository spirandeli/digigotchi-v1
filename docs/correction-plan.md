# Plano de Correção — Caminho Digital & Tamagotchi

**Data de Criação:** 20 de Setembro de 2026  
**Documento de Origem:** `docs/qa-full-review.md`  
**Diretriz Primária:** Correções modulares e ordenadas por dependência rígida, sem refatorações em massa que misturem sistemas não relacionados. Cada bloco possui critérios de aceite verificáveis e testes específicos.

---

## Tabela de Dependências Entre Blocos

```text
BLOCO 0 (Bloqueadores / Baseline)
   ↓
BLOCO 1 (Lifecycle / Segunda Run)
   ↓
BLOCO 2 (Dano Fantasma / Physics)
   ↓
BLOCO 3 (Render / Depth / Camera)
   ↓
BLOCO 4 (Input & Movimentação / Dash SPACE)
   ↓
BLOCO 5 (Combate Melee & Hitboxes)
   ↓
BLOCO 6 (Projéteis & Especial em Duas Etapas)
   ↓
BLOCO 7 (Auditoria & Mapeamento de Efeitos)
   ↓
BLOCO 8 (Player & Digimons Manifests)
   ↓
BLOCO 9 (Inimigos & Grayscale Runtime)
   ↓
BLOCO 10 (Gerador de Salas & BFS)
   ↓
BLOCO 11 (Elementos de Mapa & Unificação)
   ↓
BLOCO 12 (Progressão Mandatória de 50 Salas)
   ↓
BLOCO 13 (Chefes 10, 20, 30, 40, 50)
   ↓
BLOCO 14 (Baús 5, 11, 15, 21, 25, 31, 35, 41, 45)
   ↓
BLOCO 15 (Escalonamento & Densidade de Inimigos)
   ↓
BLOCO 16 (XP Roguelike → Tamagotchi Sem Duplicação)
   ↓
BLOCO 17 (Login, Cadastro & Persistência)
   ↓
BLOCO 18 (Asset Pipeline & Estrutura Unificada)
   ↓
BLOCO 19 (Performance, Garbage Collection & Leak Check)
   ↓
BLOCO 20 (Qualidade de Código & Modularização do God Object)
   ↓
BLOCO 21 (Limpeza de Código Morto & Legado)
   ↓
BLOCO 22 (Suíte Completa de Regressão E2E)
```

---

## BLOCO 0 — Bloqueadores de Execução

- **BLOCK ID:** B00
- **Nome:** Correção de Alinhamento de Tipos e Baseline de Build
- **Objetivo:** Garantir que o ambiente de compilação TypeScript e os testes unitários básicos rodem sem nenhum erro de tipagem ou falha de importação sintática.
- **Problemas Relacionados:** Scripts de teste com extensões TypeScript rodando diretamente via node ESM sem loader.
- **Prioridade:** P0 — CRITICAL
- **Arquivos Envolvidos:** `package.json`, `tsconfig.json`, `src/lib/digital-path/runtime/types.ts`.
- **Dependências:** Nenhuma.
- **Riscos:** Baixo.
- **Implementação Necessária:**
  - Ajustar o comando de teste no `package.json` para suportar execução unificada de testes `.ts` e `.mjs` via `tsx` ou Node test runner nativo.
  - Assegurar que `npm run typecheck` e `npm run build` rodem 100% limpos.
- **Testes Necessários:** `npm run typecheck` e `npm run build`.
- **Critério de Aceite:** `npm run typecheck` com 0 erros e build de produção gerado com sucesso.
- **Estimativa Relativa de Complexidade:** XS

---

## BLOCO 1 — Lifecycle / Segunda Run

- **BLOCK ID:** B01
- **Nome:** Correção do Ciclo de Vida do Phaser e Inicialização Consecutiva de Runs
- **Objetivo:** Eliminar a race condition e o vazamento de estado em `DigitalPathGame.ts` que impede a execução da 2ª e 3ª runs.
- **Problemas Relacionados:** `BUG-P0-02` (`isStopped` travando em `true` após `stop()`), perda de foco de input após retorno.
- **Prioridade:** P0 — CRITICAL
- **Arquivos Envolvidos:** `src/lib/digital-path/runtime/DigitalPathGame.ts`, `src/components/game/DigitalPathScreen.tsx`.
- **Dependências:** B00.
- **Riscos:** Alto (regressão de ciclo de vida em React/Phaser).
- **Implementação Necessária:**
  - Em `DigitalPathGame.ts`, garantir que `start()` resete `this.isStopped = false` após chamar `this.stop()` interno.
  - Adicionar controle de token de montagem assíncrona para que unmounts rápidos no React não abortem a inicialização subsequente.
  - No `shutdown`/`destroy`, remover listeners de teclado e ponteiros sem destruir o listener global do DOM prematuramente.
  - Re-focar o canvas do Phaser automaticamente via `canvas.focus()` sempre que a cena for criada.
- **Testes Necessários:**
  - Execução sequencial: Run 1 → Morte/Abandono → Retorno → Run 2 → Retorno → Run 3.
  - `node scripts/reproduce-bugs-e2e.mjs` e `node scripts/qa-respawn-direction.mjs`.
- **Critério de Aceite:** 3 runs executadas consecutivamente no navegador com movimentação e ataques funcionando perfeitamente em todas elas.
- **Estimativa Relativa de Complexidade:** M

---

## BLOCO 2 — Dano Fantasma / Physics

- **BLOCK ID:** B02
- **Nome:** Sanitização de Hazards de Bioma e Colliders Residuais
- **Objetivo:** Eliminar qualquer ocorrência de dano recebido pelo jogador sem atacante visível ou próximo.
- **Problemas Relacionados:** Hazards de lava/tempestade spawnando sob o ponto de nascimento do jogador; corpos de inimigos mortos causando dano durante o tween de morte.
- **Prioridade:** P0 — CRITICAL
- **Arquivos Envolvidos:** `src/lib/digital-path/runtime/DigitalPathGame.ts`, `src/lib/digital-path/map/hazards.ts`.
- **Dependências:** B01.
- **Riscos:** Médio.
- **Implementação Necessária:**
  - No spawn de hazards (`buildCurrentRoom`), verificar distância Euclidiana mínima (>120px) em relação ao ponto de spawn do jogador (`findValidSpawnTile`).
  - Imediatamente após a vida do inimigo chegar a 0, desativar seu body de física e remover qualquer flag de ataque ativo antes de iniciar a animação ou tween de morte.
  - Instrumentar logs de dano com origem, atacante, posição e timestamp em modo debug.
- **Testes Necessários:** Permanecer parado por 5 segundos na entrada de salas de combate com hazards (fogo/tempestade) sem sofrer nenhum dano.
- **Critério de Aceite:** Jogador permanece parado e sofre exatamente 0 de dano até que um inimigo ativo se aproxime e ataque.
- **Estimativa Relativa de Complexidade:** S

---

## BLOCO 3 — Render / Depth / Camera

- **BLOCK ID:** B03
- **Nome:** Padronização Rigorosa de Depths e Limites de Câmera
- **Objetivo:** Garantir que o jogador, inimigos, paredes e efeitos estejam sempre nas camadas visuais corretas, sem oclusão indevida ou corte de viewport.
- **Problemas Relacionados:** Relato histórico de jogador renderizado atrás do mapa; bordas superiores de parede.
- **Prioridade:** P1 — HIGH
- **Arquivos Envolvidos:** `src/lib/digital-path/runtime/DigitalPathGame.ts`, `src/lib/digital-path/map/procedural-map.ts`.
- **Dependências:** B00.
- **Riscos:** Baixo.
- **Implementação Necessária:**
  - Garantir que toda entidade utilize a constante centralizada `RENDER_DEPTH`:
    - Floor: 1
    - Wall Base: 2
    - Hazards/Spawn Ring: 3-4
    - Entidades (Player, Inimigos, Baús): 10
    - Wall Foreground (Rim superior de parede): 15
    - Projéteis: 22
    - VFX: 25
    - Floating Text: 30
    - HUD: 40
  - Manter a câmera com bounds definidos pelo tamanho real da sala em pixels e follow suave (`startFollow(this.player, true, 0.08, 0.08)`).
- **Testes Necessários:** Inspeção visual de screenshots de salas pequenas e grandes em desktop e mobile.
- **Critério de Aceite:** O jogador caminha à frente do chão e de paredes inferiores, com o topo da cabeça ocluído adequadamente apenas ao passar imediatamente atrás de paredes superiores frontais.
- **Estimativa Relativa de Complexidade:** S

---

## BLOCO 4 — Input e Movimentação / Dash no SPACE

- **BLOCK ID:** B04
- **Nome:** Implementação do Dash no SPACE e Preservação de Facing Parado
- **Objetivo:** Separar a tecla SPACE do ataque básico e implementar a mecânica dedicada de Dash com esquiva, cooldown e i-frames.
- **Problemas Relacionados:** `BUG-P1-01` (SPACE mapeado como Basic 1 em vez de Dash).
- **Prioridade:** P1 — HIGH
- **Arquivos Envolvidos:** `src/lib/digital-path/runtime/DigitalPathGame.ts`, `src/lib/digital-path/combat/loadout.ts`.
- **Dependências:** B01, B03.
- **Riscos:** Médio (balanceamento e interação com física de colisão com paredes).
- **Implementação Necessária:**
  - Remover `Space` do gatilho de `performBasicAttack1`.
  - Criar o método `performDash(time)` acionado exclusivamente por `this.keys.Space`.
  - Configurar velocidade de dash (impulso de 120–150px na direção do facing atual por 180ms).
  - Adicionar cooldown de dash (ex.: 1200ms) com feedback visual ou no HUD.
  - Conceder invulnerabilidade (i-frames) durante os 180ms do dash.
  - Verificar colisão de tilemap para não atravessar paredes (`isWalkable`).
- **Testes Necessários:** Testar pressionar SPACE em todas as 4 direções, contra paredes e em cooldown.
- **Critério de Aceite:** Pressionar SPACE executa um dash veloz na direção do facing atual sem disparar o ataque básico 1.
- **Estimativa Relativa de Complexidade:** M

---

## BLOCO 5 — Combate Melee & Hitboxes

- **BLOCK ID:** B05
- **Nome:** Validação e Refinamento do Ataque Básico 1
- **Objetivo:** Assegurar que o ataque básico 1 (`J`) aplique dano direcional consistente com animação e feedback de impacto.
- **Problemas Relacionados:** Sincronização de alcance melee e animação de ataque.
- **Prioridade:** P1 — HIGH
- **Arquivos Envolvidos:** `src/lib/digital-path/runtime/DigitalPathGame.ts`, `src/lib/digital-path/combat/direction.ts`.
- **Dependências:** B04.
- **Riscos:** Baixo.
- **Implementação Necessária:**
  - Garantir que a hitbox seja projetada dinamicamente via `getDirectionalHitboxPosition(origin, facing, 36)`.
  - Aplicar cooldown individual sem travar a movimentação além da duração da animação de golpe.
  - Validar cálculo de dano com base nos stats do Digimon do jogador.
- **Testes Necessários:** Executar ataque 1 nas 4 direções (Up, Down, Left, Right) atingindo inimigos posicionados.
- **Critério de Aceite:** Inimigos em frente ao Digimon sofrem dano conforme seu atributo de ataque e a animação do golpe completa normalmente.
- **Estimativa Relativa de Complexidade:** S

---

## BLOCO 6 — Projéteis & Especial em Duas Etapas

- **BLOCK ID:** B06
- **Nome:** Implementação do Fluxo em Duas Etapas (Liberação + Projétil / Área)
- **Objetivo:** Reformular o Ataque Básico 2 (`K`) e o Especial (`L`) para exibirem a etapa de liberação estática seguida pelo projétil ou efeito ofensivo em trajetória.
- **Problemas Relacionados:** `BUG-P1-02` (Projéteis nascendo instantaneamente em viagem).
- **Prioridade:** P1 — HIGH
- **Arquivos Envolvidos:** `src/lib/digital-path/runtime/DigitalPathGame.ts`, `src/lib/digital-path/combat/visual-effects.ts`.
- **Dependências:** B05.
- **Riscos:** Médio (timing de animação).
- **Implementação Necessária:**
  - **Ataque 2 (Projétil):**
    - **Fase 1 (Release):** Criar sprite de liberação (`b2Vfx.releaseAnimKey` ou efeito frontal) alinhado ao Digimon pelo tempo de carga (ex.: 100–120ms).
    - **Fase 2 (Projectile):** No término da Fase 1, spawnar o projétil viajante com velocidade (`applyDirectionalVelocity`), rotação (`getProjectileRotation`) e hitbox.
  - **Especial:**
    - **Fase 1 (Aura/Charge):** Efeito de energia surgindo no corpo do Digimon.
    - **Fase 2 (Burst/Impact):** Disparo da explosão/thrust ofensivo na direção do facing com camera shake e hitstop.
- **Testes Necessários:** Testar nas 4 direções observando visualmente as duas etapas de cada habilidade.
- **Critério de Aceite:** O efeito visual inicial surge e completa sua fase de carga junto ao Digimon antes do projétil se deslocar pelo mapa.
- **Estimativa Relativa de Complexidade:** M

---

## BLOCO 7 — Auditoria & Mapeamento de Efeitos

- **BLOCK ID:** B07
- **Nome:** Limpeza de Efeitos Órfãos e Mapeamento de Assets Reais
- **Objetivo:** Mapear todos os sprites de efeitos existentes em `public/sprites/[species]/effects/` e eliminar fallbacks impróprios.
- **Problemas Relacionados:** Gabumon usando efeitos do Veemon como fallback hardcoded.
- **Prioridade:** P2 — MEDIUM
- **Arquivos Envolvidos:** `src/lib/digital-path/combat/visual-effects.ts`, `src/lib/digital-path/runtime/DigitalPathGame.ts`.
- **Dependências:** B06.
- **Riscos:** Baixo.
- **Implementação Necessária:**
  - Atualizar `DIGIMON_VFX_PROFILES` para utilizar texturas nativas quando disponíveis.
  - Para espécies sem efeitos recortados próprios, utilizar fallback genérico neutro (ex.: burst de partículas) em vez de texturas temáticas de outro personagem.
  - Registrar assets legados na documentação e marcá-los para remoção no bloco 21.
- **Testes Necessários:** `npx tsx scripts/validate-vfx-e2e.mjs`.
- **Critério de Aceite:** Cada espécie utiliza exclusivamente seus próprios efeitos ou um efeito neutro genérico sem discrepância visual.
- **Estimativa Relativa de Complexidade:** S

---

## BLOCO 8 — Player / Digimons Manifests

- **BLOCK ID:** B08
- **Nome:** Padronização Data-Driven de Manifests de Digimons
- **Objetivo:** Garantir que Agumon, Veemon e outros Digimons carreguem a partir de uma estrutura de manifest genérica e uniforme.
- **Problemas Relacionados:** Flamedramon com gaps de numeração; condicionais `if (species === 'veemon')`.
- **Prioridade:** P2 — MEDIUM
- **Arquivos Envolvidos:** `src/lib/digital-path/runtime/manifests.ts`, `src/lib/digital-path/combat/loadout.ts`, `scripts/review-sprite-actions.mjs`.
- **Dependências:** B07.
- **Riscos:** Baixo.
- **Implementação Necessária:**
  - Corrigir a numeração de arquivos e manifests de Flamedramon.
  - Garantir que todos os stats, velocidades e animações venham de `getSpeciesCombatProfile` sem condicionais espalhadas pelo código de gameplay.
- **Testes Necessários:** `node scripts/review-sprite-actions.mjs`.
- **Critério de Aceite:** `review-sprite-actions.mjs` reportando 0 gaps e 0 issues para todos os Digimons auditados.
- **Estimativa Relativa de Complexidade:** S

---

## BLOCO 9 — Inimigos & Grayscale Runtime

- **BLOCK ID:** B09
- **Nome:** Estabilização do Pipeline de Inimigos e Destrancamento de Porta
- **Objetivo:** Garantir que os inimigos spawneem em grayscale, morram com animação e destranquem a porta no instante da derrota.
- **Problemas Relacionados:** `BUG-P0-03` (destrancamento de porta travado por tween de morte).
- **Prioridade:** P0 — CRITICAL
- **Arquivos Envolvidos:** `src/lib/digital-path/runtime/DigitalPathGame.ts`, `src/lib/digital-path/combat/enemy-sprites.ts`.
- **Dependências:** B05, B08.
- **Riscos:** Médio.
- **Implementação Necessária:**
  - Em `damageEnemy()`, quando o HP do inimigo zerar, marcar `enemy.state = "dead"` e executar `this.checkRoomCompletion()` imediatamente, sem aguardar o término do tween gráfico de destruição.
  - Manter o efeito visual de grayscale via GPU shader `preFX.addColorMatrix().grayscale(1)`.
  - Garantir que animações de morte com `repeat: 0` emitam `ANIMATION_COMPLETE` e destruam o sprite de forma limpa.
- **Testes Necessários:** `npx tsx scripts/validate-enemies-e2e.mjs`.
- **Critério de Aceite:** Ao derrotar todos os inimigos da sala, a porta destranca imediatamente e o jogador pode avançar sem timeout.
- **Estimativa Relativa de Complexidade:** S

---

## BLOCO 10 — Map Generator & Variedade

- **BLOCK ID:** B10
- **Nome:** Auditoria e Manutenção da Geração Procedural de Salas
- **Objetivo:** Garantir a estabilidade da geração procedural variada (+15% de área) com conectividade garantida entre entrada e saída.
- **Problemas Relacionados:** Validação de diversidade de salas e safe spawns.
- **Prioridade:** P1 — HIGH
- **Arquivos Envolvidos:** `src/lib/digital-path/map/procedural-map.ts`, `src/lib/digital-path/map/rng.ts`.
- **Dependências:** B03.
- **Riscos:** Baixo.
- **Implementação Necessária:**
  - Preservar os 8 formatos de salas (rectangle, cross, L, T, U, pillars, island, chambers) e validação de BFS.
  - Garantir que `findValidSpawnTile` nunca posicione o jogador em cima de paredes ou de hazards.
- **Testes Necessários:** `npx tsx scripts/stress-test-map-generation.mjs` (3.000 salas testadas).
- **Critério de Aceite:** 100% das salas geradas com conectividade válida e sem spawns inseguros.
- **Estimativa Relativa de Complexidade:** S

---

## BLOCO 11 — Map Assets / Elementos

- **BLOCK ID:** B11
- **Nome:** Unificação Visual dos Tilesets de Mapas
- **Objetivo:** Manter a seleção randômica apenas entre elementos de mapas cujos assets estejam 100% preparados e fatiados.
- **Problemas Relacionados:** Temas incompletos com `enabled: false`.
- **Prioridade:** P2 — MEDIUM
- **Arquivos Envolvidos:** `src/lib/digital-path/map/map-themes.ts`, `src/lib/digital-path/map/map-themes.test.ts`.
- **Dependências:** B10.
- **Riscos:** Baixo.
- **Implementação Necessária:**
  - Manter `lighting` como tema principal plenamente habilitado.
  - Garantir que `pickRandomTheme` filtre estritamente por `t.enabled === true`, com fallback seguro caso nenhum esteja ativo.
  - Não permitir que temas com tiles ausentes entrem no pool de sorteio de produção.
- **Testes Necessários:** `npx tsx scripts/verify-map-multi-seed.mjs`.
- **Critério de Aceite:** Múltiplas seeds utilizam apenas assets existentes sem nenhuma requisição 404 de tiles.
- **Estimativa Relativa de Complexidade:** S

---

## BLOCO 12 — Progressão das 50 Salas

- **BLOCK ID:** B12
- **Nome:** Restauração do Escopo Mandatório de 50 Salas
- **Objetivo:** Reconfigurar a progressão da run para exatamente 50 salas finitas, eliminando as referências a 300 níveis.
- **Problemas Relacionados:** `BUG-P0-01` (300 salas vs 50 salas).
- **Prioridade:** P0 — CRITICAL
- **Arquivos Envolvidos:** `src/lib/digital-path/map/procedural-map.ts`, `src/lib/digital-path/combat/bosses.ts`, `src/components/game/DigitalPathScreen.tsx`, `src/lib/digital-path/runtime/DigitalPathGame.ts`.
- **Dependências:** B10, B11.
- **Riscos:** Alto (afeta a lógica de toda a run e HUD).
- **Implementação Necessária:**
  - Em `procedural-map.ts`: configurar `MAX_LEVEL = 50` e `TOTAL_ROOMS = 50`.
  - Em `bosses.ts`: configurar `DIGITAL_PATH_CONFIG.maxFloor = 50`.
  - Em `DigitalPathScreen.tsx`: substituir `totalRooms || 300` por `50`.
  - Na Sala 50, após a vitória sobre o chefe final, disparar a tela de conclusão de expedição (`triggerGrandVictory`), sem gerar a Sala 51.
- **Testes Necessários:** `npx tsx scripts/validate-50rooms-progression.mjs` e `node scripts/qa-50rooms-browser-e2e.mjs`.
- **Critério de Aceite:** O HUD exibe `SALA X / 50`, `validate-50rooms-progression.mjs` passa com 100% de sucesso e a run termina na Sala 50.
- **Estimativa Relativa de Complexidade:** M

---

## BLOCO 13 — Bosses (Salas 10, 20, 30, 40, 50)

- **BLOCK ID:** B13
- **Nome:** Configuração das 5 Batalhas de Chefe
- **Objetivo:** Garantir que os 5 chefes ocorram estritamente nas salas 10, 20, 30, 40 e 50, com mecânicas de fases e recompensas.
- **Problemas Relacionados:** Array de chefes configurado para 30 encontros em vez de 5.
- **Prioridade:** P0 — CRITICAL
- **Arquivos Envolvidos:** `src/lib/digital-path/combat/bosses.ts`, `src/lib/digital-path/combat/bosses.test.ts`.
- **Dependências:** B12.
- **Riscos:** Médio.
- **Implementação Necessária:**
  - Configurar `bossFloors = [10, 20, 30, 40, 50]`.
  - Configurar `checkpointFloors = [1, 11, 21, 31, 41]`.
  - Atribuir cada um dos 5 chefes únicos (`kuwagamon`, `meramon`, `seadramon`, `metaletemon`, `wargeymon`) para sua respectiva sala de marco.
  - Manter o fallback de Etemon escalonado enquanto não existirem sprites dedicados em `public/sprites/bosses/`.
- **Testes Necessários:** `npx tsx --test src/lib/digital-path/combat/bosses.test.ts`.
- **Critério de Aceite:** `bosses.test.ts` passando com sucesso, identificando exatamente 5 encontros de chefes nas salas 10, 20, 30, 40 e 50.
- **Estimativa Relativa de Complexidade:** S

---

## BLOCO 14 — Baús Programados

- **BLOCK ID:** B14
- **Nome:** Alinhamento das Salas de Baús Especiais
- **Objetivo:** Posicionar baús programados rigorosamente nas salas 5, 11, 15, 21, 25, 31, 35, 41 e 45.
- **Problemas Relacionados:** `BUG-P1-03` (`CHEST_ROOMS` configurado incorretamente como `i * 10 + 3`).
- **Prioridade:** P1 — HIGH
- **Arquivos Envolvidos:** `src/lib/digital-path/map/procedural-map.ts`.
- **Dependências:** B12.
- **Riscos:** Baixo.
- **Implementação Necessária:**
  - Substituir a fórmula genérica de `CHEST_ROOMS` pelo array explícito:
    `export const CHEST_ROOMS = [5, 11, 15, 21, 25, 31, 35, 41, 45] as const;`
  - Atualizar `getRoomKind(roomNumber)` para retornar `"treasure"` para cada uma dessas salas.
- **Testes Necessários:** Teste unitário e verificação em runtime do spawn do baú nas salas 5 e 11.
- **Critério de Aceite:** Salas 5, 11, 15, 21, 25, 31, 35, 41 e 45 contêm o baú interativo com drops de bits e draft de cartas.
- **Estimativa Relativa de Complexidade:** XS

---

## BLOCO 15 — Escalonamento & Densidade de Inimigos

- **BLOCK ID:** B15
- **Nome:** Ajuste da Curva de Dificuldade e Quantidade de Inimigos
- **Objetivo:** Escalonar nível, vida, dano e quantidade de inimigos proporcionalmente ao avanço da sala (1 a 50).
- **Problemas Relacionados:** Salas avançadas sem aumento perceptível de desafio.
- **Prioridade:** P2 — MEDIUM
- **Arquivos Envolvidos:** `src/lib/digital-path/map/procedural-map.ts`.
- **Dependências:** B12, B13.
- **Riscos:** Médio (balanceamento de gameplay).
- **Implementação Necessária:**
  - Ajustar a fórmula de level dos inimigos: `enemyLevel = Math.max(1, Math.floor(roomNumber / 3) + 1)`.
  - Aumentar levemente a densidade de inimigos em salas médias/grandes (de 2–3 para 3–5 inimigos conforme a progressão avança).
  - Manter o spawn seguro garantindo raio livre ao redor do jogador.
- **Testes Necessários:** Inspeção de stats de inimigos nas salas 1, 25 e 48.
- **Critério de Aceite:** Inimigos nas salas avançadas apresentam maior nível, HP e quantidade controlada sem degradação de performance.
- **Estimativa Relativa de Complexidade:** S

---

## BLOCO 16 — XP Roguelike → Tamagotchi Sem Duplicação

- **BLOCK ID:** B16
- **Nome:** Idempotência e Unificação do Fluxo de Recompensa de XP
- **Objetivo:** Garantir que o XP conquistado no Caminho Digital seja transferido com precisão ao Tamagotchi, sem duplicar no abandono e sem perder o bônus de vitória.
- **Problemas Relacionados:** `BUG-P1-04` (duplicação no abandono e perda de 500 XP de vitória).
- **Prioridade:** P1 — HIGH
- **Arquivos Envolvidos:** `src/components/game/DigitalPathScreen.tsx`, `src/lib/pet/digital-path-bridge.ts`, `src/lib/digital-path/runtime/DigitalPathGame.ts`.
- **Dependências:** B01, B12.
- **Riscos:** Médio (economia do jogo e progressão do pet).
- **Implementação Necessária:**
  - No `handleAbandon` em `DigitalPathScreen.tsx`, passar `alreadyAwardedXp: true`.
  - Em `digital-path-bridge.ts`, se houver bônus de vitória (`bonusXp`), aplicá-lo explicitamente mesmo quando `alreadyAwardedXp` for verdadeiro.
  - Garantir que recarregar a página (F5) preserve o nível e XP do pet permanente no `localStorage`.
- **Testes Necessários:** `npx tsx --test src/lib/pet/xp-sync.test.ts`.
- **Critério de Aceite:** XP inicial + XP ganho na run = XP final exato no Tamagotchi em vitória, derrota e abandono.
- **Estimativa Relativa de Complexidade:** S

---

## BLOCO 17 — Login / Save / Persistência

- **BLOCK ID:** B17
- **Nome:** Auditoria e Documentação da Camada de Autenticação e Persistência
- **Objetivo:** Registrar com clareza o estado atual do save em `localStorage` e a arquitetura planejada para login futuro.
- **Problemas Relacionados:** Ausência de UI de login/cadastro; persistência estritamente local.
- **Prioridade:** P2 — MEDIUM
- **Arquivos Envolvidos:** `src/components/game/StartScreen.tsx`, `src/lib/pet/store.ts`, `src/lib/auth/email-password.ts`.
- **Dependências:** B16.
- **Riscos:** Baixo.
- **Implementação Necessária:**
  - Manter o sistema de backup espelho (`digital_pet_save_v2_backup`) ativo e tolerante a corrupção.
  - Documentar explicitamente no relatório que a autenticação atual é client-side prototype e planejar a tela de login/cadastro sem bloquear o fluxo offline.
- **Testes Necessários:** `npx tsx --test src/lib/pet/save-backup.test.ts`.
- **Critério de Aceite:** Save do pet e do progresso do Caminho Digital resiste a reloads e corrupções parciais.
- **Estimativa Relativa de Complexidade:** S

---

## BLOCO 18 — Asset Pipeline

- **BLOCK ID:** B18
- **Nome:** Consolidação da Fonte Única de Sprites em `public/sprites/`
- **Objetivo:** Garantir que todos os loaders consumam exclusivamente a pasta padronizada `public/sprites/`.
- **Problemas Relacionados:** Referências residuais a `/maps/tilesets/` fora de `public/sprites/maps/`.
- **Prioridade:** P2 — MEDIUM
- **Arquivos Envolvidos:** `src/lib/digital-path/runtime/DigitalPathGame.ts`, `src/lib/digital-path/map/map-themes.ts`.
- **Dependências:** B11.
- **Riscos:** Baixo.
- **Implementação Necessária:**
  - Apontar os fallbacks de tilesets para os assets equivalentes já consolidados em `public/sprites/maps/`.
  - Manter `public/sprites/[digimon]/` como única fonte para Agumon, Veemon e demais espécies.
- **Testes Necessários:** `node scripts/validate-map-structure.mjs`.
- **Critério de Aceite:** 0 requisições 404 e 0 referências a diretórios antigos fora de `public/sprites/`.
- **Estimativa Relativa de Complexidade:** S

---

## BLOCO 19 — Performance, Memory & Leaks

- **BLOCK ID:** B19
- **Nome:** Profiling de Memória, Timers e Listeners Entre Múltiplas Runs
- **Objetivo:** Verificar ausência de vazamento de memória e acúmulo de listeners após 5 ciclos consecutivos de abertura e fechamento.
- **Problemas Relacionados:** Acúmulo potencial de graphics objects ou tweens.
- **Prioridade:** P2 — MEDIUM
- **Arquivos Envolvidos:** `src/lib/digital-path/runtime/DigitalPathGame.ts`.
- **Dependências:** B01, B09.
- **Riscos:** Baixo.
- **Implementação Necessária:**
  - Limpar explicitamente tweens de cena (`this.tweens.killAll()`) e timers pendentes (`this.time.removeAllEvents()`) no shutdown.
  - Destruir todos os graphics transitórios em `cleanCurrentRoom()`.
- **Testes Necessários:** Executar 5 ciclos contínuos via script E2E monitorando uso de heap e listeners.
- **Critério de Aceite:** Quantidade de listeners e memória permanece estável após 5 runs consecutivas.
- **Estimativa Relativa de Complexidade:** S

---

## BLOCO 20 — Code Quality & Refatoração do God Object

- **BLOCK ID:** B20
- **Nome:** Modularização Parcial de `DigitalPathGame.ts`
- **Objetivo:** Desacoplar subsistemas de `DigitalPathGame.ts` (3.210 linhas) em controladores específicos sem alterar contratos públicos.
- **Problemas Relacionados:** God Object de difícil manutenção e alto acoplamento.
- **Prioridade:** P3 — LOW
- **Arquivos Envolvidos:** `src/lib/digital-path/runtime/DigitalPathGame.ts`, novos submódulos em `src/lib/digital-path/runtime/`.
- **Dependências:** Todos os blocos de gameplay funcionais (B01 a B19 concluídos).
- **Riscos:** Alto se feito prematuramente; executar somente após gameplay estar congelado e testado.
- **Implementação Necessária:**
  - Extrair o gerenciador de combate e projéteis para módulo dedicado.
  - Extrair a montagem de sala/tilesets para módulo dedicado.
  - Manter `DigitalPathGame.ts` como orquestrador fino.
- **Testes Necessários:** Toda a suíte de testes unitários e E2E.
- **Critério de Aceite:** Linhas de `DigitalPathGame.ts` reduzidas significativamente sem introduzir regressões.
- **Estimativa Relativa de Complexidade:** L

---

## BLOCO 21 — Legacy Cleanup

- **BLOCK ID:** B21
- **Nome:** Remoção de Código Morto, Pastas de Arquivo e Aliases Obsoletos
- **Objetivo:** Limpar definitivamente código e assets não utilizados no projeto.
- **Problemas Relacionados:** `function Training()` em PlayScreen; `src/lib/multiplayer/`; `public/sprites/agumon/_archive/`.
- **Prioridade:** P4 — CLEANUP
- **Arquivos Envolvidos:** `src/components/game/PlayScreen.tsx`, `src/lib/multiplayer/`, `public/sprites/agumon/_archive/`.
- **Dependências:** B20.
- **Riscos:** Baixo.
- **Implementação Necessária:**
  - Remover `function Training()` e o case `panel === "training"` de `PlayScreen.tsx`.
  - Remover ou arquivar o diretório `src/lib/multiplayer/`.
  - Deletar arquivos obsoletos da pasta `_archive`.
- **Testes Necessários:** `git status` e `npm run build`.
- **Critério de Aceite:** Código morto removido sem quebrar nenhuma importação ou tela.
- **Estimativa Relativa de Complexidade:** S

---

## BLOCO 22 — Regression Suite Final

- **BLOCK ID:** B22
- **Nome:** Homologação E2E Completa no Navegador
- **Objetivo:** Executar toda a bateria de testes de aceitação em `http://172.27.140.162:8080/` para certificar o produto final.
- **Problemas Relacionados:** Garantia de ausência de regressões em todos os 23 subsistemas.
- **Prioridade:** P0 — CRITICAL
- **Arquivos Envolvidos:** Todos os scripts de QA em `scripts/`.
- **Dependências:** Todos os blocos anteriores (B00 a B21).
- **Riscos:** Baixo.
- **Implementação Necessária:**
  - Rodar `npm run typecheck`.
  - Rodar `node scripts/review-sprite-actions.mjs`.
  - Rodar `npx tsx --test src/lib/digital-path/combat/bosses.test.ts`.
  - Rodar `npx tsx scripts/validate-50rooms-progression.mjs`.
  - Rodar `node scripts/qa-50rooms-browser-e2e.mjs`.
  - Rodar `npx tsx scripts/qa-veemon-direction-12tests.mjs`.
  - Rodar `npx tsx scripts/qa-respawn-direction.mjs`.
  - Capturar screenshots comparativas desktop e mobile.
- **Critério de Aceite:** 100% dos testes PASS, 0 erros no console do navegador, 50 salas completadas e progressão sincronizada com o Tamagotchi.
- **Estimativa Relativa de Complexidade:** M
