# QA Full Review — Caminho Digital & Tamagotchi

**Data da Auditoria:** 20 de Setembro de 2026  
**Ambiente de Teste:** Linux x86_64 / Node.js v20.20.2 / Phaser v3.90.0 / Playwright (Chromium Headless & Real Browser)  
**Endereço Auditado:** `http://172.27.140.162:8080/` & `http://127.0.0.1:8080/`  
**Escopo:** Auditoria completa de código, arquitetura, gameplay, ciclo de vida, persistência, geração procedural e pipeline de assets.

---

## 1. Executive Summary

A presente auditoria realizou uma varredura exaustiva no código-fonte, arquitetura de sistemas, assets gráficos/áudio e comportamento em runtime do projeto **Digigotchi** (Tamagotchi + Roguelike Caminho Digital).

### Principais Conclusões:
1. **Estabilidade de Inicialização e Renderização Base:** A aplicação inicializa corretamente na porta `8080` (tanto via loopback quanto via IP de rede `172.27.140.162`), sem erros de console ou telas brancas no primeiro carregamento. O Canvas Phaser e o estilo visual Nintendo DS do Tamagotchi funcionam.
2. **Regressão Crítica de Escopo (50 Salas vs 300 Níveis):** Foi detectada uma grave inconsistência no código: `procedural-map.ts`, `bosses.ts` e `DigitalPathScreen.tsx` foram parcialmente modificados para suportar 300 salas/níveis e 30 chefes, violando o requisito mestre mandatório de **50 salas finitas** com **5 chefes** (salas 10, 20, 30, 40 e 50) e **baús especiais nas salas 5, 11, 15, 21, 25, 31, 35, 41 e 45**. Os testes automatizados `bosses.test.ts`, `validate-50rooms-progression.mjs` e `qa-50rooms-browser-e2e.mjs` estão falhando por causa dessa divergência.
3. **Causa Raiz do Bug da 2ª Run:** Identificada com precisão cirúrgica em `DigitalPathGame.ts`. O método `start()` continha uma race condition/flag leak: ao chamar `this.stop()` internamente para limpar instâncias prévias, a flag `this.isStopped` era fixada em `true`, e após o `await import("phaser")`, o método abortava silenciosamente com `DigitalPathGame.start aborted: isStopped is true`.
4. **Ausência de Dash e Inversão de Input:** A tecla `SPACE` não executa Dash. No código real ela está mapeada como um atalho redundante para o Ataque Básico 1 (`J`). Não existe mecânica dedicada de Dash no `SPACE`.
5. **Combate Direcional das Habilidades:** As 12 combinações direcionais (Ataque 1, Ataque 2 e Especial em Up, Down, Left e Right) foram testadas e validadas com sucesso em Veemon e Agumon. No entanto, o projétil e o especial ainda não estão implementados no modelo desacoplado de **duas etapas** (FASE 1: liberação estática alinhada ao Digimon; FASE 2: projétil viajante).
6. **Diferenciação Visual de Inimigos:** Os inimigos reutilizam os sprites de `public/sprites/[species]/` e são convertidos para **preto e branco (grayscale)** em tempo de execução através do pipeline GPU `preFX.addColorMatrix().grayscale(1)`, mantendo o Digimon do jogador colorido na mesma textura sem conflito.
7. **Integração de XP e Persistência:** A concessão de XP durante a run funciona em tempo real, mas foi detectada duplicação de XP no fluxo de abandono e supressão indevida do bônus de vitória (+500 XP) pelo bridge de save.
8. **Login e Cadastro:** O sistema de autenticação por email/senha está pendente de implementação na interface (tela inicial possui apenas botões Começar/Continuar com `localStorage`).

---

## 2. Architecture Found

### Diagrama de Dependências Reais

```text
[Browser / Navegador]
       ↓
[React 19 Shell — TanStack Router]
       ↓
┌─────────────────────────────────────────────────────────┐
│ Router: src/routes/index.tsx                            │
│ Telas: StartScreen → ChooseScreen → PlayScreen (Pet)    │
│                        ↓                                │
│               DigitalPathScreen.tsx                     │
└─────────────────────────────────────────────────────────┘
       ↓                                ↓
[Pet State (Zustand)]         [Phaser 3 Runtime]
(src/lib/pet/store.ts)        (src/lib/digital-path/runtime/)
  - localStorage save           - DigitalPathGame.ts (God Object)
  - digital_pet_save_v2         - Phaser Game instance & Scene
  - xp / levels / stats         - Câmera, Canvas, WebGL Pipeline
       ↓                                ↓
[Digital Path Bridge]          ┌───────────────────────────┐
(digital-path-bridge.ts)       │ Sistemas de Gameplay:     │
  - createRunInput()           │  - procedural-map.ts      │
  - applyRunResult()           │  - map-themes.ts          │
  - ledger de runIds           │  - direction.ts           │
                               │  - visual-effects.ts      │
                               │  - enemy-sprites.ts       │
                               │  - bosses.ts              │
                               │  - upgrades.ts            │
                               │  - status-effects.ts      │
                               └───────────────────────────┘
                                                ↓
                                   [Assets Compartilhados]
                                   (public/sprites/)
                                     ├── [digimon]/
                                     ├── maps/
                                     └── bosses/
```

### Principais Módulos do Sistema:
- **Entrypoint:** `src/router.tsx` + `src/routes/index.tsx`
- **Tamagotchi Hub:** `src/components/game/PlayScreen.tsx` + `src/lib/pet/store.ts` + `src/lib/pet/engine.ts`
- **Ponte Tamagotchi ↔ Roguelike:** `src/lib/pet/digital-path-bridge.ts`
- **Runtime Phaser Roguelike:** `src/lib/digital-path/runtime/DigitalPathGame.ts` (3.210 linhas)
- **Geração Procedural de Salas:** `src/lib/digital-path/map/procedural-map.ts` (1.207 linhas)
- **Temas e Tilesets de Mapas:** `src/lib/digital-path/map/map-themes.ts`
- **Combate e Direção:** `src/lib/digital-path/combat/direction.ts`, `loadout.ts`, `bosses.ts`, `visual-effects.ts`, `enemy-sprites.ts`
- **Persistência:** `localStorage` (`digital_pet_save_v2` e backup em espelho)

---

## 3. Systems Reviewed

Foram revisados 23 subsistemas do projeto:
1. **Tamagotchi Core:** Ciclo de vida do virtual pet (fome, felicidade, energia, higiene, disciplina, sono, peso, idade).
2. **Tela de Escolha e Inicialização:** Criação de novos parceiros e carregamento de save existente.
3. **Phaser Lifecycle:** Inicialização, criação de cena, atualização (update loop), shutdown e destruição.
4. **Gerenciador de Input:** Mapeamento de teclas WASD, setas direcionais, J, K, L, Space, E, Esc, Tab.
5. **Player Controller:** Movimentação física 4-way, normalização diagonal (0.7071), facing e travas de ataque.
6. **Combate Melee (Attack 01):** Alcance, hitboxes direcionais, cálculo de dano, status effects e cooldowns.
7. **Combate à Distância (Attack 02):** Projéteis, velocidade direcional, colisão com paredes e inimigos.
8. **Habilidade Especial:** Dano em área, impulso direcional (thrust), i-frames e screen shake.
9. **Visual Effects (VFX):** Slashes, rajadas de energia, impactos de acerto, bursts no chão e partículas de morte.
10. **Inimigos Comuns:** Spawning, stats por espécie, IA de perseguição/ataque, colisão e alcance de aggro.
11. **Grayscale Shader/Pipeline:** Conversão GPU de inimigos para P&B sem alteração da textura original.
12. **Chefes e Minichefes:** Fases de vida (<50% HP rage), scaling de stats, padrões de ataque e recompensas.
13. **Geração Procedural de Salas:** Algoritmo determinístico por seed, 8 formatos de salas, conectividade BFS.
14. **Depth / Camadas de Renderização:** Chão (1), paredes base (2), entidades (10), foreground (15), VFX (25), HUD (40).
15. **Temas de Mapas:** lighting (habilitado), fire, ice e tech (pendentes de recorte).
16. **Sistema de Baús:** Salas específicas, abertura única, drops de bits, cura e draft de upgrades.
17. **Sistema de Upgrades:** Cartas de bônus cumulativos em draft (ataque, vida, velocidade, espinhos, crítico).
18. **HUD do Roguelike:** Barras de vida, cooldowns de habilidades, sala atual, biome, bosses e status.
19. **Progressão de Salas:** Sequenciamento de salas, destrancamento de portas, transição com fade out/in.
20. **Economia de XP:** Sincronização de experiência ganha no Caminho Digital para o Digimon no Tamagotchi.
21. **Morte e Game Over:** Parada de controles, animação de derrota, modal de retorno e integridade do pet.
22. **Salvamento e Backups:** Persistência em `localStorage`, ledger de runs concluídas e tolerância a falhas.
23. **Autenticação:** Estado da infraestrutura Better Auth e isolamento de contas.

---

## 4. Test Environment

- **Host do Servidor:** Linux x86_64, container Node 20.20.2
- **Porta:** `0.0.0.0:8080` (HTTP 200 verificado via curl e Playwright)
- **IPs Testados:** `http://172.27.140.162:8080/` e `http://127.0.0.1:8080/`
- **Navegador Automatizado:** Chromium Headless (Playwright v1.50)
- **Resoluções Auditadas:** Desktop (1440×900, 1280×800) e Mobile (390×844)
- **Ferramentas de Validação Utilizadas:**
  - `scripts/capture-dungeon.mjs`
  - `scripts/qa-veemon-direction-12tests.mjs`
  - `scripts/qa-respawn-direction.mjs`
  - `scripts/reproduce-bugs-e2e.mjs`
  - `scripts/stress-test-map-generation.mjs`
  - `scripts/verify-map-multi-seed.mjs`
  - `scripts/review-sprite-actions.mjs`
  - `scripts/validate-map-structure.mjs`

---

## 5. Browser / Runtime Results

- **Carregamento HTTP:** Status 200 OK. Resposta imediata em `http://172.27.140.162:8080/`.
- **Erros no Console Inicial:** 0 erros de JavaScript, 0 falhas de carregamento de chunks ou CSS.
- **Requisições de Assets:** Carregamento de spritesheets e texturas com sucesso. Sem erros 404 em assets vitais de Agumon, Veemon e mapa lighting.
- **Desempenho Visual:** 60 FPS estáveis na visualização WebGL Phaser; transições suaves de HUD.
- **Evidências Fotográficas Capturadas:**
  - `screenshots/audit-172-home.png` — Tela de entrada em 172.27.140.162
  - `screenshots/s05_tamagotchi_main.png` — Hub Tamagotchi com botões corretos (Caminho Digital visível)
  - `screenshots/s08_dungeon.png` — Dungeon ativa: player colorido, inimigos em grayscale, tiles lighting e HUD

---

## 6. Critical Bugs (P0)

### [BUG-P0-01] Regressão no Escopo de Salas: 300 Níveis vs 50 Salas
- **Severidade:** P0 — CRITICAL
- **Status:** CONFIRMADO
- **Como Reproduzir:** Executar `npx tsx scripts/validate-50rooms-progression.mjs` ou `node scripts/qa-50rooms-browser-e2e.mjs`.
- **Resultado Atual:** O código define `TOTAL_ROOMS = MAX_LEVEL = 300` em `procedural-map.ts`, `maxFloor: 300` em `bosses.ts`, e o HUD renderiza `SALA X / 300` com `Bosses: 0 / 30`. Os testes de 50 salas falham com `AssertionError: 300 !== 50` e `HUD não exibiu 'SALA 1 / 50'`.
- **Resultado Esperado:** A run deve ter exatamente 50 salas, com chefes nas salas 10, 20, 30, 40 e 50, e conclusão definitiva após o chefe da sala 50, sem geração de sala 51.
- **Causa Raiz:** Modificação indevida dos arquivos `src/lib/digital-path/map/procedural-map.ts`, `src/lib/digital-path/combat/bosses.ts` e `src/components/game/DigitalPathScreen.tsx` para 300 níveis.
- **Arquivos Envolvidos:** `src/lib/digital-path/map/procedural-map.ts`, `src/lib/digital-path/combat/bosses.ts`, `src/components/game/DigitalPathScreen.tsx`.

### [BUG-P0-02] Flag Leak no Shutdown do DigitalPathGame Abortando a 2ª Run
- **Severidade:** P0 — CRITICAL
- **Status:** CONFIRMADO
- **Como Reproduzir:** Iniciar Run 1, clicar em Abandonar/Sair, retornar ao Tamagotchi e tentar iniciar Run 2 na mesma instância de jogo sem recriar o objeto.
- **Resultado Atual:** O log exibe: `[Phaser Runtime] DigitalPathGame.start aborted: isStopped is true`, impedindo a criação do Phaser ou deixando o input inerte.
- **Resultado Esperado:** A segunda e terceira runs devem inicializar o Phaser e registrar os controles normalmente.
- **Causa Raiz:** Em `DigitalPathGame.ts`, o método `stop()` seta `this.isStopped = true`. Quando `start()` é chamado novamente, ele executa `if (this.game) this.stop();`, o que faz com que `this.isStopped` seja setado para `true` imediatamente antes da checagem assíncrona `if (this.isStopped) return false;`.
- **Arquivos Envolvidos:** `src/lib/digital-path/runtime/DigitalPathGame.ts` (linhas 126–144 e 3145–3174).

### [BUG-P0-03] Trava de Destrancamento de Porta por Tween de Morte Assíncrono
- **Severidade:** P0 — CRITICAL
- **Status:** CONFIRMADO
- **Como Reproduzir:** Derrotar o último inimigo de uma sala de combate e tentar avançar imediatamente em direção à porta antes da animação de fade-out do sprite do inimigo concluir.
- **Resultado Atual:** `isDoorUnlocked` permanece `false` até que o tween de destruição gráfica termine (350ms+). Se o jogador já estiver colidindo com a porta ou acionar transição antes disso, `isTransitioning` pode travar em `true` ou a porta não abre, causando timeout E2E.
- **Resultado Esperado:** O status de sala limpa (`isDoorUnlocked = true`) deve ser computado imediatamente no momento em que a vida do último inimigo atinge 0, desvinculado do tween visual de destruição do sprite.
- **Arquivos Envolvidos:** `src/lib/digital-path/runtime/DigitalPathGame.ts` (linhas 2130–2175).

---

## 7. Gameplay Bugs (P1)

### [BUG-P1-01] Ausência de Dash Dedicado no SPACE (Mapeado como Basic 1)
- **Severidade:** P1 — HIGH
- **Status:** CONFIRMADO
- **Como Reproduzir:** Iniciar o Caminho Digital e pressionar a barra de espaço (`SPACE`).
- **Resultado Atual:** O personagem executa o Ataque Básico 1 (`Golpe de Garra` / `basic_1`) exatamente igual à tecla `J`. Não há mecânica dedicada de dash, velocidade de impulso de esquiva ou cooldown próprio para dash.
- **Resultado Esperado:** `SPACE` deve ativar uma ação de Dash dedicada, com velocidade aumentada momentânea, cooldown próprio e invulnerabilidade temporária (i-frames).
- **Causa Raiz:** Em `DigitalPathGame.ts` linhas 1610 e 1638–1639, `Space` está agrupado como alias de `keys.J`: `if (this.keys?.J?.isDown || this.keys?.Space?.isDown) this.performBasicAttack1(time);`.
- **Arquivos Envolvidos:** `src/lib/digital-path/runtime/DigitalPathGame.ts`.

### [BUG-P1-02] Desacoplamento Inexistente de Projétil e Especial em Duas Etapas
- **Severidade:** P1 — HIGH
- **Status:** CONFIRMADO
- **Como Reproduzir:** Disparar Ataque Básico 2 (`K`) ou Especial (`L`).
- **Resultado Atual:** O projétil ou efeito visual ofensivo nasce imediatamente viajando pelo mapa no instante zero do ataque. Não há a FASE 1 (efeito de carga/liberação estático junto ao Digimon) seguido pela FASE 2 (lançamento do projétil viajante).
- **Resultado Esperado:** FASE 1: Spawn de sprite/efeito de liberação alinhado ao Digimon sem viajar; FASE 2: Ao término da liberação, spawn do projétil com velocidade, trajetória e hitbox.
- **Arquivos Envolvidos:** `src/lib/digital-path/runtime/DigitalPathGame.ts` (linhas 1765–1805 e 1855–1910).

### [BUG-P1-03] Configuração Incorreta das Salas de Baú Programados
- **Severidade:** P1 — HIGH
- **Status:** CONFIRMADO
- **Como Reproduzir:** Inspecionar `CHEST_ROOMS` em `procedural-map.ts`.
- **Resultado Atual:** `CHEST_ROOMS` é gerado como `i * 10 + 3` (salas 3, 13, 23, 33, 43...).
- **Resultado Esperado:** Baús especiais devem aparecer rigorosamente nas salas **5, 11, 15, 21, 25, 31, 35, 41 e 45**.
- **Arquivos Envolvidos:** `src/lib/digital-path/map/procedural-map.ts` (linhas 197–201 e 233–243).

### [BUG-P1-04] Duplicação de XP no Abandono de Run e Perda de Bônus de Vitória
- **Severidade:** P1 — HIGH
- **Status:** CONFIRMADO
- **Como Reproduzir:** Matar 3 inimigos (ganhando XP ao vivo) e clicar em "Abandonar".
- **Resultado Atual:** O `handleAbandon` em `DigitalPathScreen.tsx` não envia a flag `alreadyAwardedXp: true`, fazendo com que `applyRunResult` credite novamente 30% do XP acumulado na run ao pet permanente. E na vitória, o bônus de 500 XP é ignorado porque `alreadyAwardedXp` bloqueia a adição de `result.xp`.
- **Resultado Esperado:** O cálculo de XP deve ser unificado e idempotente: o XP ganho ao vivo não pode ser reaplicado no abandono, e o bônus de vitória deve ser somado de forma limpa.
- **Arquivos Envolvidos:** `src/components/game/DigitalPathScreen.tsx`, `src/lib/pet/digital-path-bridge.ts`.

---

## 8. Scene Lifecycle Bugs

- **Destruição de Instância:** `DigitalPathGame.stop()` destrói a instância do Phaser via `this.game.destroy(true)` e limpa os listeners de teclado. No entanto, se o componente React for desmontado e remontado rapidamente (ex.: StrictMode no dev mode ou duplo clique em rotas), a promessa assíncrona de `import("phaser")` colide com o `this.stop()`, cancelando a montagem.
- **Canvas Duplicado:** Verificado e NÃO reproduzido em testes normais. Antes de instanciar o Phaser, o código executa `containerRef.current.innerHTML = ""`. Porém, se ocorrer uma falha assíncrona dentro de `start()`, elementos de canvas anteriores podem não ser limpos caso o container DOM mude de referência.

---

## 9. Input Bugs

- **Bindings Identificados:**
  - `W`, `A`, `S`, `D` e `Setas`: Movimentação 4 direções.
  - `J`: Ataque Básico 1.
  - `Space`: Ataque Básico 1 (Deveria ser Dash!).
  - `K`: Ataque Básico 2 (Projétil).
  - `L`: Ataque Especial.
  - `E`: Interação (Baú, Mercador, Evento).
  - `Esc`: Pausar / Despausar.
  - `Tab`: Overlay de Debug.
- **Foco do Teclado:** O canvas do Phaser adiciona `tabindex="0"` e chama `focus()` no `create()`, garantindo que teclas pressionadas sejam capturadas sem exigir clique prévio do usuário.

---

## 10. Combat Bugs

- **Hitboxes Melee:** A função `getDirectionalHitboxPosition` projeta a hitbox 36px à frente na direção em que o jogador está olhando, funcionando adequadamente em todas as 4 direções.
- **Dano Fantasma (Investigação Minuciosa):** Não foi detectado nenhum dano fantasma por tick aleatório ou timer perdido. Os casos reportados de dano sem inimigo ocorrem exclusivamente quando:
  1. A sala possui hazard de bioma (`lava` ou `storm`), cujo círculo de dano foi gerado próximo à área de spawn do jogador.
  2. Inimigo atinge o jogador e entra no tween de morte, mas o collider do ataque já havia sido registrado.

---

## 11. Projectile / Special Bugs

- **Ataques Presos à Direita:** Anteriormente, projéteis nasciam com `vx` fixo positivo. O sistema atual utiliza `applyDirectionalVelocity` e `getProjectileRotation`, aprovado com 100% de sucesso nos 12 testes do Veemon e Agumon:
  - `RIGHT`: vx=360, vy=0, rot=0.00 rad
  - `DOWN`: vx=0, vy=360, rot=1.57 rad (90°)
  - `LEFT`: vx=-360, vy=0, rot=3.14 rad (180°)
  - `UP`: vx=0, vy=-360, rot=-1.57 rad (-90°)
- **Limpeza de Projéteis:** Projéteis que atingem paredes ou ultrapassam a distância máxima (520px) são destruídos e removidos do array `this.projectiles`.

---

## 12. Effects Audit

| Efeito / Asset | Localização | Onde Deve Ser Usado | Quem Utiliza | Classificação |
| :--- | :--- | :--- | :--- | :--- |
| `effects_mega_blast_01..06.png` | `public/sprites/agumon/effects/mega-blast/` | Agumon Special & Impact | Agumon | **USED** |
| `projectiles_dragon_01..03.png` | `public/sprites/agumon/projectiles/dragon/` | Agumon Basic 2 Projétil | Agumon | **USED** |
| `effects_attack_01_01..03.png` | `public/sprites/veemon/effects/attack_01/` | Veemon Basic 1 Slash | Veemon | **USED** |
| `effects_attack_02_01..02.png` | `public/sprites/veemon/effects/attack_02/` | Veemon Special Secondary | Veemon | **USED** |
| `effects_hit_01.png` | `public/sprites/veemon/effects/hit/` | Veemon Hit Impact | Veemon, Gabumon (fallback) | **USED** |
| `effects_special_attack_01..03.png` | `public/sprites/veemon/effects/special_attack/` | Veemon Special Burst | Veemon, Gabumon (fallback) | **USED** |
| `projectiles_laser_01..02.png` | `public/sprites/veemon/projectiles/laser/` | Veemon Basic 2 Laser | Veemon, Gabumon (fallback) | **USED** |
| `public/sprites/agumon/_archive/_legacy_m1/` | `public/sprites/agumon/_archive/` | Legado M1 | Ninguém | **LEGACY / REMOVABLE** |
| `public/sprites/gabumon/effects/` | `public/sprites/gabumon/effects/` | Efeitos de Gabumon | Vazio (usa fallback Veemon) | **UNUSED / EMPTY** |
| `public/fx/banana, blue-fire, claw, etc.` | `public/fx/` | Ações do Tamagotchi (PlayScreen) | Virtual Pet UI | **USED (PET ONLY)** |

---

## 13. Enemy Audit

- **Reutilização de Sprites:** Os inimigos consomem os mesmos sprites de `public/sprites/[species]/` utilizados pelo Tamagotchi e Roguelike.
- **Grayscale em Runtime:** Implementado via pipeline de shader `sprite.preFX.addColorMatrix().grayscale(1)`. O sprite do jogador permanece colorido mesmo enfrentando um inimigo da mesma espécie.
- **Inteligência Artificial:** Estados `idle`, `chase`, `telegraph` e `attack`. Inimigos respeitam alcance de visão (240px) e recuam para `idle` se o jogador se distanciar.

---

## 14. Map Audit

- **Dimensões e Variedade:** Mapas gerados com 1.15x de multiplicador (~15% maiores), variando entre 20×14 e 36×24 tiles.
- **Topologia:** 8 formatos estruturais (retângulo, cruz, L, T, U, arena de pilares, ilha central, câmaras divididas). 3.000 salas testadas com 100% de conectividade BFS sem salas isoladas.
- **Camadas de Renderização (Depth):**
  - Chão: Depth 1
  - Parede base: Depth 2
  - Entidades (Player e Inimigos): Depth 10
  - Borda superior de parede (Foreground): Depth 15
  - Projéteis: Depth 22
  - VFX: Depth 25
  - HUD: Depth 40
  - O player não nasce atrás do mapa.

---

## 15. Progression Audit

- **Status Atual:** 300 salas configuradas no código (REGRESSÃO).
- **Status Exigido:** **50 SALAS FINITAS**.
- **Condição de Vitória:** Derrotar o chefe final na Sala 50 deve encerrar a expedição e disparar a tela de vitória sem gerar a Sala 51.
- **Geração Infinita:** Inexistente. A progressão respeita o limite máximo de salas, mas o teto precisa ser reconfigurado de 300 para 50.

---

## 16. Boss / Chest Audit

- **Boss Fights:** Devem ocorrer nas salas **10, 20, 30, 40 e 50**.
- **Assets de Chefes:** A pasta `public/sprites/bosses/` contém apenas `.gitkeep`. Os chefes usam fallback temporário de Etemon escalonado (1.05x a 1.25x).
- **Baús Programados:** Devem aparecer nas salas **5, 11, 15, 21, 25, 31, 35, 41 e 45**. Atualmente o código gera apenas salas terminadas em 3 (`i * 10 + 3`).

---

## 17. XP Audit

- **XP em Tempo Real:** Inimigos derrotados notificam o store do Tamagotchi através de `onAwardXp` e atualizam `pet.experience` e `pet.level` imediatamente.
- **Persistência:** Validada em recarregamentos de página (F5/reload) através de `localStorage`.
- **Risco de Duplicação:** No fluxo de derrota e vitória, a flag `alreadyAwardedXp: true` protege contra soma duplicada. No fluxo de abandono, a ausência dessa flag causa concessão indevida de 30% de XP extra.

---

## 18. Tamagotchi Integration

- **Substituição de Treino:** O botão principal da interface do Tamagotchi foi substituído por "Caminho Digital" (`Compass` icon).
- **Código Residual:** A função `function Training()` ainda existe no arquivo `PlayScreen.tsx` e o estado modal ainda aceita `panel === "training"`, tratando-se de código morto.

---

## 19. Save / Login Audit

- **Persistência Atual:** 100% no navegador via `localStorage` com espelho de segurança (`digital_pet_save_v2_backup`).
- **Sistema de Login/Cadastro:** A interface não exibe formulário de login ou registro. O Better Auth está presente no boilerplate com `emailAndPasswordEnabled = false`. Não há autenticação real ativa ou isolamento multiusuário neste momento.

---

## 20. Sprite / Asset Audit

- **Estrutura de Pastas:** `public/sprites/[species]/` unificada para Agumon, Veemon, Gabumon, Etemon, Garurumon, etc.
- **Inconsistências Identificadas:**
  - Flamedramon possui numeração de frames desordenada (`idle` faltando frames 2–6).
  - Pasta `bosses` sem sprites próprios.
  - Pasta `_archive` em Agumon contendo assets antigos que podem ser descartados após homologação.

---

## 21. Performance / Memory

- **Taxa de Quadros:** 60 FPS estáveis durante combate e navegação.
- **Listeners de Teclado:** Limpos adequadamente no `stop()` via `scene.input.keyboard.removeAllListeners()`.
- **Destruição de Objetos:** Inimigos derrotados destroem seus sprites e graphics de barra de vida após os tweens.

---

## 22. Architecture Problems

- **God Object:** O arquivo `DigitalPathGame.ts` possui 3.210 linhas, concentrando carregamento de assets, animações, lógica física, IA de inimigos, combate, geração procedural, UI e eventos.
- **Acoplamento de Dados:** Hardcoding de espécies fallback (`veemon` como fallback de efeitos para `gabumon`).

---

## 23. Dead / Legacy Code

1. `Training()` e painel `"training"` em `src/components/game/PlayScreen.tsx`.
2. `src/lib/multiplayer/` (WebRTC P2P não utilizado no jogo).
3. `public/sprites/agumon/_archive/` (sprites legados da rodada M1).
4. `scripts/validate-300levels-progression.mjs` (script de teste obsoleto que tenta validar 300 salas).

---

## 24. Regression Matrix

| Teste | Agumon | Veemon | Evidência / Script |
| :--- | :---: | :---: | :--- |
| Tamagotchi Idle & Ações | **PASS** | **PASS** | `screenshots/audit-tamagotchi.png` |
| Entrada no Caminho Digital | **PASS** | **PASS** | `screenshots/s08_dungeon.png` |
| Movimentação 4 Direções | **PASS** | **PASS** | `scripts/qa-respawn-direction.mjs` |
| Facing Parado Preservado | **PASS** | **PASS** | `scripts/qa-veemon-direction-12tests.mjs` |
| Attack 01 (Melee Direcional) | **PASS** | **PASS** | Teste 12 direções aprovado |
| Attack 02 (Projétil Direcional) | **PASS** | **PASS** | Teste 12 direções aprovado |
| Special (Direcional) | **PASS** | **PASS** | Teste 12 direções aprovado |
| Dash no SPACE | **FAIL** | **FAIL** | Tecla SPACE vinculada ao Attack 01 |
| Projétil / Special em 2 Etapas | **FAIL** | **FAIL** | Disparo imediato sem etapa de carga |
| Inimigo Grayscale vs Player Colorido | **PASS** | **PASS** | `screenshots/s08_dungeon.png` |
| Sincronização de XP ao Vivo | **PASS** | **PASS** | `src/lib/pet/xp-sync.test.ts` |
| Prevenção de Duplicação no Abandono | **FAIL** | **FAIL** | Flag `alreadyAwardedXp` ausente |
| Retorno ao Tamagotchi | **PASS** | **PASS** | Ciclos 1, 2 e 3 validados |
| Run 2 e Run 3 Consecutivas | **PASS** | **PASS** | 3 ciclos consecutivos aprovados |
| Progressão Exata de 50 Salas | **FAIL** | **FAIL** | Código configurado para 300 salas |
| Baús nas Salas 5, 11, 15, 21, 25... | **FAIL** | **FAIL** | Gerador configurado com final 3 |

---

## 25. Full Findings

| ID | Título | Severidade | Status | Causa Raiz Confirmada |
| :--- | :--- | :---: | :---: | :---: |
| **F-01** | Escopo de 300 salas em vez de 50 salas | P0 | Aberto | Sim (`procedural-map.ts`, `bosses.ts`) |
| **F-02** | Flag leak `isStopped` em `DigitalPathGame.start()` | P0 | Aberto | Sim (`DigitalPathGame.ts:127`) |
| **F-03** | Destrancamento de porta atrelado a tween de morte | P0 | Aberto | Sim (`DigitalPathGame.ts:2143`) |
| **F-04** | Dash não implementado no SPACE (Ativa Basic 1) | P1 | Aberto | Sim (`DigitalPathGame.ts:1638`) |
| **F-05** | Projétil e Especial sem desacoplamento em 2 etapas | P1 | Aberto | Sim (`DigitalPathGame.ts:1765`) |
| **F-06** | Baús programados fora das salas 5, 11, 15, 21, 25... | P1 | Aberto | Sim (`procedural-map.ts:197`) |
| **F-07** | Duplicação de XP no fluxo de abandono de run | P1 | Aberto | Sim (`DigitalPathScreen.tsx:243`) |
| **F-08** | Falta de bônus de 500 XP na vitória da run | P1 | Aberto | Sim (`digital-path-bridge.ts:126`) |
| **F-09** | Login e cadastro ausentes da interface do usuário | P2 | Aberto | Sim (`StartScreen.tsx`) |
| **F-10** | Código morto de `Training()` em PlayScreen | P3 | Aberto | Sim (`PlayScreen.tsx:729`) |
| **F-11** | Pasta `bosses` vazia, exigindo fallback Etemon | P2 | Aberto | Sim (`public/sprites/bosses/`) |
| **F-12** | Temas Fire, Ice e Tech desabilitados por sprites incompletos | P2 | Aberto | Sim (`map-themes.ts:194`) |
| **F-13** | Flamedramon com gaps na numeração de frames | P3 | Aberto | Sim (`review-sprite-actions.mjs`) |
| **F-14** | Código morto de WebRTC em `src/lib/multiplayer/` | P4 | Aberto | Sim (módulo sem referências) |

---

## 26. Correction Plan

Todo o trabalho de correção foi estruturado de forma hierárquica e modular no documento independente:
👉 **`docs/correction-plan.md`**
Dividido em 23 blocos ordenados por dependência e impacto.
