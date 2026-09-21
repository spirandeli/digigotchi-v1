# COMBAT-V2-MIGRATION-PLAN.md
# PLANO DE MIGRAÇÃO DEFINITIVO — COMBAT V2 (SURVIVORS-LIKE)
**Projeto:** Digigotchi — Tamagotchi + Caminho Digital  
**Destinatário da Execução:** IAs de Implementação e Desenvolvedores  
**Regra de Ouro:** ZERO BIG-BANG REWRITE. A migração deve ser realizada estritamente em blocos incrementais, mantendo o jogo sempre funcional a cada bloco concluído.  
**Assets:** Utilizar exclusivamente os sprites e VFX existentes em `public/sprites/` e `public/fx/`. Não gerar novas imagens.

---

## 1. GRAFO DE DEPENDÊNCIA ENTRE OS BLOCOS

```text
BLOCK 0 (Safety & Baseline)
   │
   ▼
BLOCK 1 (Architecture & Decoupling)
   │
   ├───────────────────────────────┐
   ▼                               ▼
BLOCK 2 (Auto-Attacks & Timers)  BLOCK 4 (Movement & Dedicated Dash)
   │                               │
   ▼                               │
BLOCK 3 (Targeting & Behaviors)    │
   │                               │
   ├───────────────────────────────┘
   ▼
BLOCK 5 (Physical XP & Magnet)
   │
   ▼
BLOCK 6 (In-Run Level-Up & Draft UI)
   │
   ├───────────────────────────────┐
   ▼                               ▼
BLOCK 7 (Passives & Build Limits) BLOCK 9 (Enemy Director & Waves)
   │                               │
   ▼                               ▼
BLOCK 8 (Skill Evolution System)  BLOCK 10 (Elites & Chests)
   │                               │
   └───────────────┬───────────────┘
                   ▼
BLOCK 11 (Boss & Miniboss Rework)
   │
   ▼
BLOCK 12 (High-Performance Engine: Pooling & Spatial Hash)
   │
   ▼
BLOCK 13 (Polish, Audio & Final E2E QA)
```

---

## 2. DETALHAMENTO EXECUTIVO DOS BLOCOS (PASSO A PASSO)

---

### BLOCK 0: Safety & Baseline
- **Objetivo:** Estabelecer suíte de testes de regressão e garantia de integridade antes de qualquer refatoração.
- **Problema Resolvido:** Previne regressões silenciosas no autotiling do mapa, no ciclo de vida do Tamagotchi e nos 136 testes automatizados existentes.
- **Arquivos Envolvidos:**
  - `src/lib/digital-path/map/*.test.ts`
  - `src/lib/pet/*.test.ts`
  - `scripts/verify_gameplay.mjs`
- **Passos Exatos:**
  1. Executar `npm test` e registrar baseline dos 136 testes unitários passando.
  2. Executar teste E2E do browser com Playwright (`node scripts/verify_gameplay.mjs`) no domínio `http://172.27.140.162:8080/`.
  3. Criar tag ou snapshot de verificação do commit de segurança.
- **Critérios de Aceite:** 136 testes passando com 0 falhas; carregamento do jogo no browser sem erros de console.
- **Rollback:** `git reset --hard` para o commit baseline.

---

### BLOCK 1: Combat Architecture & Decoupling
- **Objetivo:** Desacoplar a classe monolítica `DigitalPathScene` (3.521 linhas) em controladores modulares especializados, mantendo o gameplay idêntico.
- **Problema Resolvido:** Acoplamento extremo onde movimento, IA, colisão, HUD e magia estão misturados no mesmo método.
- **Arquivos Criados:**
  - `src/lib/digital-path/combat/WeaponManager.ts`
  - `src/lib/digital-path/combat/PlayerController.ts`
  - `src/lib/digital-path/combat/DamageSystem.ts`
  - `src/lib/digital-path/combat/types.ts`
- **Arquivos Modificados:**
  - `src/lib/digital-path/runtime/DigitalPathGame.ts`
- **Passos Exatos:**
  1. Criar `src/lib/digital-path/combat/types.ts` exportando as interfaces de entidade do combate (`CombatEntity`, `PlayerState`, `ActiveEnemy`).
  2. Extrair a lógica de cálculo de dano e acerto crítico de `DigitalPathGame.ts:2342-2391` para `DamageSystem.ts`.
  3. Extrair a gestão de inventário de armas e cooldowns para `WeaponManager.ts`.
  4. Extrair o processamento de teclas de movimento para `PlayerController.ts`.
  5. Delegar as chamadas dentro de `DigitalPathGame.ts` para as novas instâncias desses controladores.
  6. Rodar `npm test` e verificar que o comportamento em jogo permaneceu idêntico.
- **Critérios de Aceite:** `DigitalPathGame.ts` reduzido em pelo menos 1.500 linhas; todos os 136 testes passando; zero quebra de imports.
- **Rollback:** Restaurar `DigitalPathGame.ts` a partir do branch de backup.

---

### BLOCK 2: Automatic Attacks & Independent Cooldowns
- **Objetivo:** Remover a necessidade de pressionar `J, K, L` e implementar disparos automáticos baseados em cooldowns independentes por arma.
- **Problema Resolvido:** Combate manual exaustivo que bloqueia a movimentação e impede o fluxo Survivors-like.
- **Arquivos Criados:**
  - `src/lib/digital-path/combat/SkillRuntime.ts`
- **Arquivos Modificados:**
  - `src/lib/digital-path/combat/WeaponManager.ts`
  - `src/lib/digital-path/runtime/DigitalPathGame.ts`
- **Passos Exatos:**
  1. Criar a classe `SkillRuntime` contendo `skillId`, `level`, `currentCooldownMs`, `nextCastTimestamp` e `maxInstances`.
  2. No `WeaponManager`, criar array de habilidades equipadas `equippedSkills: SkillRuntime[]`.
  3. No método `update(time, delta)` do `WeaponManager`, iterar por cada habilidade equipada.
  4. Para cada arma onde `time >= runtime.nextCastTimestamp`, invocar o disparo automático e atualizar `runtime.nextCastTimestamp = time + runtime.currentCooldownMs`.
  5. Desativar os disparos acionados por `this.keys.J` e `this.keys.K`.
  6. Emitir eventos de cooldown para o HUD React para manter as barras de recarga sincronizadas visualmente.
- **Critérios de Aceite:** O personagem dispara automaticamente suas habilidades no tempo certo sem que o jogador pressione nenhuma tecla de ataque; timers são estritamente independentes.
- **Rollback:** Reativar os listeners manuais de `keys.J` e `keys.K`.

---

### BLOCK 3: Target Selectors & Attack Behaviors
- **Objetivo:** Separar quem a habilidade atinge de como ela se comporta fisicamente e visualmente.
- **Problema Resolvido:** Disparos rígidos que só atiram para a frente ou em linha reta manual.
- **Arquivos Criados:**
  - `src/lib/digital-path/combat/TargetSelector.ts`
  - `src/lib/digital-path/combat/AttackBehaviors.ts`
- **Arquivos Modificados:**
  - `src/lib/digital-path/combat/WeaponManager.ts`
  - `src/lib/digital-path/combat/loadout.ts`
- **Passos Exatos:**
  1. Implementar funções puras em `TargetSelector.ts`:
     - `selectNearest(playerPos, enemies, maxRange)`
     - `selectFacing(playerPos, facingDirection, maxRange)`
     - `selectHighestHp(enemies, maxRange)`
     - `selectDensestCluster(enemies, cellSize)`
  2. Implementar comportamentos em `AttackBehaviors.ts`:
     - `executeStraightProjectile(scene, origin, targetPos, config)` (usando sprites de projéteis existentes)
     - `executePiercingBeam(scene, origin, dirVector, config)` (usando feixes laser existentes em `public/fx/laser/`)
     - `executeMeleeCleave(scene, origin, facing, config)` (usando garras de `public/fx/claw/`)
     - `executeGroundZone(scene, origin, config)` (usando zonas de `public/sprites/agumon/effects/mega-blast/`)
  3. Vincular cada habilidade do perfil do Digimon ao seu `TargetSelector` e `AttackBehavior`.
- **Critérios de Aceite:** Projéteis direcionam-se autonomamente aos inimigos mais próximos; feixes perfuram múltiplos alvos; zonas de dano dão dano em ticks (`hitInterval`).
- **Rollback:** Reverter para mira fixa frontal em `loadout.ts`.

---

### BLOCK 4: Movement Unlocking & Dedicated Dash System
- **Objetivo:** Desbloquear movimentação contínua durante ataques e implementar o Dash dedicado na tecla `Space`.
- **Problema Resolvido:** O jogador ficava congelado ao atacar (ISS-01) e o `Space` estava consumido pelo ataque básico (ISS-02).
- **Arquivos Modificados:**
  - `src/lib/digital-path/combat/PlayerController.ts`
  - `src/lib/digital-path/runtime/DigitalPathGame.ts`
- **Passos Exatos:**
  1. Localizar `DigitalPathGame.ts:3249` (`if (this.isPlayerAttacking) return;`) e remover completamente essa guarda de bloqueio.
  2. Mover o controle de animação do sprite: a caminhada deve sobrepor a base do corpo ou manter a direção sem travar a velocidade vetorial.
  3. Desvincular `Space` de `performBasicAttack1`.
  4. Vincular `Space` exclusivamente ao método `performDash()`.
  5. Implementar `performDash()`:
     - Impulso de velocidade (3x velocidade normal por 200ms).
     - Ativação de `invulnerableUntil = time + 250ms`.
     - Desativação de colisão física corpo-a-corpo contra inimigos durante o dash (permite atravessar hordas).
     - Spawn de 3 clones semi-transparentes (ghost trail) usando o sprite atual do jogador com fade-out de 150ms.
     - Cooldown de 2.2 segundos.
- **Critérios de Aceite:** Jogador move-se suavemente enquanto ataques disparam sozinhos; pressionar `Space` executa dash com rastro, atravessa inimigos e não sofre dano durante os I-frames.
- **Rollback:** Restaurar mapeamento anterior de tecla `Space`.

---

### BLOCK 5: Physical XP Drops & Magnet System
- **Objetivo:** Criar orbes físicos de XP deixados no chão na morte dos inimigos e atração por proximidade (Magnet).
- **Problema Resolvido:** Inimigos davam XP direto e invisível (ISS-04), destruindo a dinâmica de risco/recompensa de coletar XP no chão cercado por monstros.
- **Arquivos Criados:**
  - `src/lib/digital-path/combat/PickupManager.ts`
  - `src/lib/digital-path/combat/XpOrbPool.ts`
- **Arquivos Modificados:**
  - `src/lib/digital-path/runtime/DigitalPathGame.ts`
- **Passos Exatos:**
  1. Criar `XpOrbPool` pré-alocando 150 instâncias de sprites/gráficos de orbes coloridas.
  2. Em `killEnemy(enemy)`, chamar `pickupManager.spawnXpOrb(enemy.sprite.x, enemy.sprite.y, enemy.xpReward)`.
  3. No `update()` do `PickupManager`, verificar distância de cada orbe ativo até o centro do jogador.
  4. Se `distance <= playerStats.magnetRadius`, definir estado da orbe como `ATTRACTED` e acelerar em direção ao jogador a 400px/s.
  5. Ao colidir com o jogador, desativar a orbe (retornar ao pool), emitir som leve de coleta e somar `xpReward * playerStats.growthMultiplier` ao `runXp`.
- **Critérios de Aceite:** Inimigos derrotados deixam gemas/orbes no chão; ao se aproximar, as orbes voam suavemente até o jogador e incrementam a barra de XP da run.
- **Rollback:** Reativar concessão direta em `killEnemy()`.

---

### BLOCK 6: In-Run Level Up & Draft UI
- **Objetivo:** Criar o ciclo de pausa, exibição de 3 cartas de melhoria e retomada do combate ao atingir o XP requerido da run.
- **Problema Resolvido:** Ausência de progressão de poder e escolhas táticas durante a partida.
- **Arquivos Criados:**
  - `src/lib/digital-path/combat/LevelUpManager.ts`
  - `src/components/game/LevelUpModal.tsx`
- **Arquivos Modificados:**
  - `src/components/game/DigitalPathScreen.tsx`
  - `src/lib/digital-path/runtime/DigitalPathGame.ts`
- **Passos Exatos:**
  1. Em `LevelUpManager`, manter `runLevel: 1` e `xpToNextLevel = Math.floor(25 * Math.pow(runLevel, 1.45))`.
  2. Quando `currentRunXp >= xpToNextLevel`:
     - Subtrair `xpToNextLevel` de `currentRunXp`.
     - Incrementar `runLevel++`.
     - Chamar `scene.togglePause()` para congelar o mundo Phaser.
     - Montar pool de escolhas válidas (armas que ainda não atingiram Lv 5, novas armas se houver slot livre, ou passivas).
     - Disparar callback `onTriggerLevelUp(choices)` para a camada React.
  3. No React (`LevelUpModal.tsx`), renderizar 3 cartas elegantes com ícone, nome, nível atual, efeito da melhoria e raridade.
  4. Suportar atalhos de teclado `1, 2, 3` para seleção instantânea.
  5. Ao clicar na carta, aplicar a melhoria no `WeaponManager`, fechar o modal e retomar a cena Phaser.
- **Critérios de Aceite:** Encher a barra de XP pausa o jogo com modal de 3 cartas; escolher uma carta aplica o upgrade e retoma o jogo sem bugs de áudio ou física.
- **Rollback:** Desativar a interceptação de pausa de level-up.

---

### BLOCK 7: Passives & Build Limits
- **Objetivo:** Estabelecer limite rigoroso de build (4 habilidades ativas + 4 passivas) e calcular sinergias de atributos.
- **Problema Resolvido:** Builds infinitas e desbalanceadas que quebram o HUD e o game design.
- **Arquivos Criados:**
  - `src/lib/digital-path/combat/PassiveCatalog.ts`
- **Arquivos Modificados:**
  - `src/lib/digital-path/combat/upgrades.ts`
  - `src/components/game/DigitalPathScreen.tsx`
- **Passos Exatos:**
  1. Criar o catálogo das 8 passivas (`core_power_data`, `core_rapid_clock`, `core_expansion_lens`, `core_magnet_sensor`, `core_growth_algorithm`, `core_data_armor`, `core_velocity_bus`, `core_flame_data`).
  2. Implementar checagem no `LevelUpManager`: se `equippedSkills.length >= 4`, não oferecer novas armas, apenas upgrades das existentes ou passivas.
  3. Se `equippedPassives.length >= 4`, não oferecer novas passivas.
  4. Atualizar o HUD React para exibir 4 slots de armas à esquerda e 4 slots de passivas à direita.
- **Critérios de Aceite:** O jogador nunca pode equipar mais de 4 armas e 4 passivas; atributos globais (área, dano, recarga, velocidade) refletem as passivas equipadas.
- **Rollback:** Retornar ao limite anterior de upgrades lineares.

---

### BLOCK 8: Skill Evolution System
- **Objetivo:** Permitir que armas no nível máximo (Lv 5) evoluam para formas lendárias ao abrir baús especiais se o jogador possuir a passiva necessária.
- **Problema Resolvido:** Falta de clímax e meta-objetivo de build de longo prazo dentro da run.
- **Arquivos Criados:**
  - `src/lib/digital-path/combat/SkillEvolutionRegistry.ts`
- **Arquivos Modificados:**
  - `src/lib/digital-path/combat/WeaponManager.ts`
- **Passos Exatos:**
  1. Registrar pares de evolução em `SkillEvolutionRegistry`:
     - *Chama Bebê* (Lv 5) + *Núcleo Ígneo* = *Mega Erupção de Magma* (projétil vira rajada com explosão em área).
     - *Vee-Laser* (Lv 5) + *Módulo de Expansão* = *Plasma Cannon Contínuo* (laser espesso perfurante).
  2. Ao derrotar um Elite ou Miniboss com as condições satisfeitas, dropar um `Evolution Chest`.
  3. Ao abrir o baú, substituir a definição básica da arma pela definição evoluída no `WeaponManager`.
  4. Trocar a textura do projétil e o efeito de impacto para os assets de alta intensidade já existentes em `public/sprites/[digimon]/effects/`.
- **Critérios de Aceite:** A arma evoluída altera seu comportamento visual e seu modelo de dano em tempo real, mantendo a estabilidade do jogo.
- **Rollback:** Manter a arma no Lv 5 normal sem transformação.

---

### BLOCK 9: Enemy Director & Wave Management
- **Objetivo:** Substituir o spawn estático de sala por um `EnemyDirector` que gera mini-waves dinâmicas de acordo com o tempo decorrido na sala.
- **Problema Resolvido:** Salas vazias com apenas 3 inimigos (ISS-03) sem pressão espacial de horda.
- **Arquivos Criados:**
  - `src/lib/digital-path/combat/EnemyDirector.ts`
  - `src/lib/digital-path/combat/WaveTimeline.ts`
- **Arquivos Modificados:**
  - `src/lib/digital-path/runtime/DigitalPathGame.ts`
- **Passos Exatos:**
  1. Criar `EnemyDirector` gerenciando `roomTimerMs` a cada sala de combate.
  2. Configurar a timeline de mini-waves:
     - 0-15s: 15 Chasers (Goburimon/Insetos).
     - 15-35s: 25 Swarm rápidos em círculo.
     - 35-55s: Inimigos blindados (Tanks) + 2 Ranged ao fundo.
     - 55-75s: 1 Elite com modificador e aura.
     - 75s+: Clímax final. Eliminar a horda destranca a porta.
  3. Utilizar o `findValidSpawnTile()` fora da visão da câmera para que os monstros surjam naturalmente pelos corredores ou bordas da sala.
  4. Limitar a contagem máxima de inimigos vivos simultâneos (`maxAlive: 80` em salas normais, `120` em clímax).
- **Critérios de Aceite:** O jogador enfrenta dezenas de inimigos surgindo progressivamente em ondas; a sensação de sobrevivência e posicionamento se torna intensa e recompensadora.
- **Rollback:** Reverter para o loop estático de `room.enemies`.

---

### BLOCK 10: Elites, Chests & Drop Tables
- **Objetivo:** Adicionar inimigos Elites com modificadores visuais (tamanho maior, aura, mais HP) e baús de recompensa.
- **Problema Resolvido:** Inimigos homogêneos sem variação de prioridade de alvo.
- **Arquivos Criados:**
  - `src/lib/digital-path/combat/EliteModifiers.ts`
  - `src/lib/digital-path/combat/ChestManager.ts`
- **Arquivos Modificados:**
  - `src/lib/digital-path/runtime/DigitalPathGame.ts`
- **Passos Exatos:**
  1. Em `EliteModifiers.ts`, definir modificadores aleatórios para Elites:
     - `FAST`: +35% velocidade de movimento.
     - `SHIELDED`: +8 de Armadura e barreira reflexiva.
     - `EXPLOSIVE`: Explode em estilhaços ao morrer.
  2. Ajustar a escala visual do sprite do Elite para 1.25x e aplicar aura colorida translúcida no chão.
  3. No evento de morte do Elite, dropar um `Chest` interativo (tecla `E` ou contato físico).
  4. O baú concede Bits, cura e chance de Draft de Upgrade ou Evolução.
- **Critérios de Aceite:** Elites são identificáveis visualmente à distância; matar um Elite gera um baú funcional com recompensas de alto valor.
- **Rollback:** Spawns de Elites voltam a ser inimigos padrão.

---

### BLOCK 11: Boss & Miniboss Rework
- **Objetivo:** Transformar os encontros de Chefe (salas múltiplas de 10) e Minichefe (salas terminadas em 5) em batalhas de múltiplas fases com ataques telegrafados e invocação de servos (adds).
- **Problema Resolvido:** Chefes atuais agem apenas como inimigos normais com muito HP e uma única fase de fúria simplória.
- **Arquivos Modificados:**
  - `src/lib/digital-path/combat/bosses.ts`
  - `src/lib/digital-path/runtime/DigitalPathGame.ts`
- **Passos Exatos:**
  1. Em `bosses.ts`, configurar 3 fases dinâmicas para cada um dos 5 chefes principais (Kuwagamon, Meramon, Seadramon, MetalEtemon, WarGreymon):
     - **Fase 1 (100% a 70% HP):** Ataques direcionais e disparos normais.
     - **Fase 2 (70% a 35% HP):** Invocação de horda de servos (adds) e ativação de hazards de arena (lava/tempestade).
     - **Fase 3 (<35% HP - Clímax):** Enrage com telegraph circular vermelho, disparos omnidirecionais e velocidade aumentada.
  2. Implementar telegraphs visuais usando círculos e retângulos de alerta (`Phaser.GameObjects.Graphics`) 600ms antes dos golpes devastadores.
  3. Ao derrotar o chefe, conceder Baú de Ouro garantido e salvar checkpoint permanente no Tamagotchi.
- **Critérios de Aceite:** O combate contra o chefe exige esquiva ativa e uso estratégico do Dash; telegraphs dão tempo de reação ao jogador; vitória desbloqueia o progresso corretamente.
- **Rollback:** Reverter para a configuração de 2 fases simples de `bosses.ts`.

---

### BLOCK 12: High-Performance Engine (Pooling & Spatial Partitioning)
- **Objetivo:** Otimizar o motor Phaser para sustentar centenas de entidades a 60 FPS estáveis sem travamentos de Garbage Collection.
- **Problema Resolvido:** Gargalos de colisão quadrática O(N²) (ISS-06) e picos de GC por destruição de objetos (ISS-05).
- **Arquivos Criados:**
  - `src/lib/digital-path/combat/SpatialHashGrid.ts`
  - `src/lib/digital-path/combat/ObjectPool.ts`
- **Arquivos Modificados:**
  - `src/lib/digital-path/runtime/DigitalPathGame.ts`
- **Passos Exatos:**
  1. Criar `SpatialHashGrid` 2D com tamanho de célula de 64x64 pixels.
  2. A cada frame, limpar a grade e inserir todos os inimigos vivos em suas respectivas células em O(N).
  3. Ao testar colisão de projéteis e dano em área, consultar apenas as células vizinhas em O(1), eliminando o loop aninhado de todos contra todos.
  4. Implementar `ObjectPool<T>` genérico para:
     - Projéteis do jogador e dos inimigos.
     - Textos flutuantes de dano (Damage Numbers) com agregação de números rápidos em <80ms.
     - Sprites de impacto de VFX transitórios.
  5. Desacoplar a taxa de atualização da IA: a física de movimento roda a 60 FPS, mas a seleção de rotas e ataques da IA roda a 15 Hz (a cada 4 frames).
- **Critérios de Aceite:** Teste de estresse com 300 inimigos simultâneos mantendo taxa de quadros acima de 55 FPS; alocação de memória estável sem picos de GC.
- **Rollback:** Desativar a grade espacial e retornar à verificação por distância simples.

---

### BLOCK 13: Polish, Audio & Final E2E QA
- **Objetivo:** Conectar efeitos sonoros existentes em `public/audio/digimon/`, polir feedbacks visuais e realizar bateria de testes finais de ponta a ponta.
- **Problema Resolvido:** Falta de feedback auditivo e validação completa do fluxo de ponta a ponta.
- **Arquivos Modificados:**
  - `src/lib/pet/audio.ts`
  - `src/lib/digital-path/combat/visual-effects.ts`
  - `scripts/qa-m5-alpha-full.mjs`
- **Passos Exatos:**
  1. Conectar os efeitos de áudio existentes nas pastas `public/audio/digimon/[species]/` para disparos, impactos e rugidos de chefe.
  2. Ajustar screen shake suave (4px de amplitude por 120ms) em acertos críticos e explosões.
  3. Executar o script de testes de regressão Playwright cobrindo:
     - Movimentação + Dash em 8 direções.
     - Disparos automáticos e mira em alvos próximos.
     - Coleta de XP físico com atração de magnetismo.
     - Pausa de Level-Up com seleção de 3 cartas.
     - Chegada a uma sala de chefe e combate em fases.
     - Derrota e retorno limpo ao Tamagotchi.
     - Reinício imediato de uma nova run sem vazamento de memória ou travamento de teclas.
  4. Executar `npm test` garantindo que todos os testes unitários e de integração passem com 100% de aprovação.
- **Critérios de Aceite:** Jogo com áudio e feedback tátil estonteante; zero erros de console; todas as asserções de QA aprovadas.
- **Rollback:** Desabilitar áudio e efeitos secundários mantendo o núcleo estável.
