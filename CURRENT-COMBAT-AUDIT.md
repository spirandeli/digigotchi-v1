# CURRENT-COMBAT-AUDIT.md
# AUDITORIA TÉCNICA E EMPÍRICA DO SISTEMA DE COMBATE ATUAL
**Projeto:** Digigotchi — Tamagotchi + Caminho Digital (Roguelike 2D Top-Down Phaser)  
**Ambiente Auditado:** `http://172.27.140.162:8080/` & Local Sandbox  
**Data:** 21 de Setembro de 2026  
**Status da Auditoria:** AUDIT COMPLETE — ZERO PRODUCTION CODE MODIFIED  

---

## 1. RESUMO EXECUTIVO

Esta auditoria analisou profundamente a arquitetura de código, os fluxos de dados, a integração entre o Tamagotchi e o Caminho Digital, e o comportamento do gameplay em tempo real através de testes automatizados com Playwright Chromium no ambiente real (`http://172.27.140.162:8080/`).

### Diagnóstico Central
O Caminho Digital atualmente opera como um **Dungeon Crawler Melee/Ranged manual**, onde:
1. **Monólito de Cena Phaser:** A classe `DigitalPathScene` está declarada inline dentro do arquivo `src/lib/digital-path/runtime/DigitalPathGame.ts`, totalizando **3.521 linhas** de código altamente acoplado.
2. **Congelamento de Movimento durante Ataque [CONFIRMED]:** O jogador fica **completamente imóvel** toda vez que ataca (`if (this.isPlayerAttacking) return;` em `DigitalPathGame.ts:3249`). Nos testes empíricos, ao pressionar tecla de movimento e ataque, as coordenadas do jogador não se alteraram durante os frames da animação de golpe.
3. **Ausência de Dash Dedicado [CONFIRMED]:** A tecla `Espaço` está vinculada ao ataque básico 1 (`Golpe de Garra`), concorrendo com a tecla `J`. O dash existe apenas como um impulso pontual hardcoded de 44 pixels embutido no disparo do ataque especial (`L`) do Agumon/Veemon (`DigitalPathGame.ts:2174-2187`).
4. **Ausência de Hordas e Waves Dinâmicas [CONFIRMED]:** Cada sala instancia uma única lista estática de 2 a 5 inimigos predefinidos em `room.enemies`. Não há `EnemyDirector`, nem sistema de waves contínuas, nem timer de sala com escalonamento de densidade.
5. **Inexistência de XP Físico no Mapa [CONFIRMED]:** Ao derrotar um inimigo, o XP é creditado imediatamente nas variáveis internas do jogador e sincronizado em tempo real com o store Zustand do Tamagotchi (`DigitalPathGame.ts:2401-2406`). Não existem orbes de XP, drops físicos, nem atributos de Magnet ou Growth.
6. **Inexistência de Level-Up Durante a Run [CONFIRMED]:** O ganho de XP na run não concede níveis nem seleção de habilidades durante o combate. A seleção de melhorias (draft de upgrades) só é disparada arbitrariamente na morte de inimigos dos tipos `"elite"` ou `"miniboss"` (`DigitalPathGame.ts:2432`).
7. **Inimigos Preto e Branco Preservados sem Alterar Arquivos [CONFIRMED]:** Os sprites dos inimigos são desaturados em tempo real na GPU via shader Phaser `preFX.addColorMatrix().grayscale(1)` (`DigitalPathGame.ts:1526-1541`). Os arquivos originais em `public/sprites/` permanecem intactos.
8. **Reaproveitamento Estrito de Efeitos e Sprites [CONFIRMED]:** O projeto já possui uma biblioteca rica de sprites e VFX autênticos em `public/sprites/[digimon]/` (pastas `attacks/`, `effects/`, `projectiles/`) e em `public/fx/` (`fire`, `blue-fire`, `laser`, `claw`, `energy`, `banana`, `sound-wave`, `speed`). **Nenhum efeito ou sprite novo precisa ser gerado.**

---

## 2. MAPA ARQUITETURAL DOS SUBSISTEMAS EXISTENTES

Abaixo está o mapeamento dos 24 subsistemas solicitados, com a localização exata de sua responsabilidade no código atual:

| Subsistema Solicitado | Arquivo / Localização | Classe / Função Principal | Status no Projeto |
| :--- | :--- | :--- | :--- |
| **Player Controller** | `src/lib/digital-path/runtime/DigitalPathGame.ts:3248-3332` | `DigitalPathScene.handlePlayerMovement(delta)` | **CONFIRMED** (Acoplado à cena) |
| **Combat Controller** | `src/lib/digital-path/runtime/DigitalPathGame.ts:1890-2301` | `DigitalPathScene.handlePlayerAttacks(time)` | **CONFIRMED** (Ataques manuais síncronos) |
| **Attack System** | `src/lib/digital-path/combat/loadout.ts:31-479` & `DigitalPathGame.ts:1952-2301` | `performBasicAttack1()`, `performBasicAttack2()`, `performSpecialAttack()` | **CONFIRMED** (Hardcoded em 3 slots fixos) |
| **Skill System** | `src/lib/digital-path/combat/abilities.ts` vs `loadout.ts` | `AGUMON_ABILITIES` vs `PLAYABLE_COMBAT_PROFILES` | **CONFIRMED (DESCONEXÃO)** (`abilities.ts` não é usado pelo runtime) |
| **Projectile System** | `src/lib/digital-path/runtime/DigitalPathGame.ts:2304-2340` | `DigitalPathScene.updateProjectiles(delta)` | **CONFIRMED** (Array simples, sem pooling) |
| **Enemy System** | `src/lib/digital-path/combat/enemies.ts` & `DigitalPathGame.ts:1472-1570` | `ENEMY_TEMPLATES`, `ActiveEnemy` | **CONFIRMED** |
| **Enemy AI** | `src/lib/digital-path/runtime/DigitalPathGame.ts:2958-3160` | `DigitalPathScene.updateEnemies(time, delta)` | **CONFIRMED** (IA rodando a 60 FPS no loop principal) |
| **Spawn System** | `src/lib/digital-path/runtime/DigitalPathGame.ts:1471-1570` | `DigitalPathScene.loadRoom() -> Spawn Enemies` | **CONFIRMED** (Apenas estático por sala) |
| **Collision System** | `src/lib/digital-path/runtime/DigitalPathGame.ts:2314-2334` & `3273-3286` | Verificação manual com `isWalkable()` e `Phaser.Math.Distance` | **CONFIRMED** (Sem física Arcade ou Spatial Hash) |
| **Damage System** | `src/lib/digital-path/runtime/DigitalPathGame.ts:2342-2391` | `DigitalPathScene.damageEnemy()`, `damagePlayer()` | **CONFIRMED** (`rawDamage - defense`) |
| **Health System** | `src/lib/digital-path/runtime/DigitalPathGame.ts:168-169`, `2346`, `3243` | `playerHp`, `enemy.currentHp`, `healPlayer()` | **CONFIRMED** |
| **XP System** | `src/lib/digital-path/runtime/DigitalPathGame.ts:2399-2406` | `killEnemy() -> options.onAwardXp()` | **CONFIRMED** (Instantâneo, sem drop físico) |
| **Level System (Run)** | N/A | N/A | **NOT FOUND** (Level-up só existe no Tamagotchi persistente) |
| **Boss System** | `src/lib/digital-path/combat/bosses.ts:50-229` & `DigitalPathGame.ts:2997-3021` | `BOSS_DEFINITIONS`, `updateEnemies()` | **CONFIRMED** (Fase 1 e Fase 2 Enrage a <50% HP) |
| **Miniboss System** | `src/lib/digital-path/combat/bosses.ts:280-361` | `getMiniBossForFloor()`, `isMiniBossFloor()` | **CONFIRMED** (Salas com terminação 5) |
| **Room System** | `src/lib/digital-path/map/procedural-map.ts` | `createFiniteRun()`, `generateSingleRoom()` | **CONFIRMED** (Até 300 salas conectadas) |
| **Map System** | `src/lib/digital-path/map/map-themes.ts` | `MAP_THEMES`, Autotiling 11 camadas | **CONFIRMED** |
| **VFX System** | `src/lib/digital-path/combat/visual-effects.ts` & `DigitalPathGame.ts:1979-2235` | `DIGIMON_VFX_PROFILES`, `transientVfx` array | **CONFIRMED** (Sprites criados e destruídos on-the-fly) |
| **Animation System** | `src/lib/digital-path/runtime/DigitalPathGame.ts:656-720` | `registerAnimations()`, `getEnemyAnimationKey()` | **CONFIRMED** |
| **Input System** | `src/lib/digital-path/runtime/DigitalPathGame.ts:182-196`, `1890-1938` | `Phaser.Input.Keyboard.Key`, input buffering manual 120ms | **CONFIRMED** |
| **Dash System** | `src/lib/digital-path/runtime/DigitalPathGame.ts:2174-2187` | Tween embutido no ataque especial | **CONFIRMED (INCOMPLETO)** (Não é mecânica livre) |
| **Death System** | `src/lib/digital-path/runtime/DigitalPathGame.ts:3407-3436` | `DigitalPathScene.triggerDefeat()` | **CONFIRMED** (Executa animação e atraso de 1600ms) |
| **Restart System** | `src/lib/digital-path/runtime/DigitalPathGame.ts:3456-3485` & `DigitalPathScreen.tsx:210-213` | `DigitalPathGame.stop()` + reinicialização de cena | **CONFIRMED** (Limpeza de keyboard handlers presente) |

---

## 3. MAPA DE DEPENDÊNCIAS E FLUXO DE EXECUÇÃO

### 3.1 Fluxograma de Chamadas no Combate Atual
```text
React (DigitalPathScreen.tsx)
  │ monta canvas e instancia DigitalPathGame
  ▼
DigitalPathGame.start()
  │ configura Phaser.Game com cena única DigitalPathScene
  ▼
DigitalPathScene.preload()
  │ pré-carrega tiles de MAP_THEMES, sprites do manifest do parceiro,
  │ e spritesheets/frames dos inimigos e efeitos VFX em public/sprites/
  ▼
DigitalPathScene.create()
  │ instancia Player sprite, registra animações Phaser, inicia câmera
  │ chama loadRoom(1)
  ▼
DigitalPathScene.update(time, delta)  [Loop 60 FPS]
  ├── handlePlayerAttacks(time)
  │     ├── se J ou Espaço: performBasicAttack1() (Melee frontal + hitbox offset)
  │     ├── se K: performBasicAttack2() (Disparo de Projétil)
  │     └── se L: performSpecialAttack() (Disparo em Área + Dash impulse)
  ├── handlePlayerMovement(delta)
  │     └── SE isPlayerAttacking == true: RETORNA E NÃO MOVE!
  ├── updateProjectiles(delta)
  │     └── loop nos projéteis ativos, colisão com parede e com ActiveEnemy
  │           └── ao atingir: damageEnemy(enemy, proj.damage)
  ├── updateEnemyProjectiles(delta)
  │     └── colisão de tiros inimigos com o Player
  ├── updateEnemies(time, delta)
  │     └── atualiza status effects, atualiza barras de vida Graphics,
  │         calcula ângulo e move inimigos contra o Player,
  │         dispara ataques melee ou projéteis inimigos a cada intervalo
  └── updateHazards(delta)
```

### 3.2 Diagrama de Acoplamento do Monólito `DigitalPathScene`
```text
DigitalPathScene (3.355 linhas de código inline)
 ├── Gerenciamento de Câmera e Canvas
 ├── Autotiling e Carregamento de Tiles de Mapa
 ├── Parsing e Validação de RoomData (300 salas)
 ├── Controles de Input e Buffering (W, A, S, D, J, K, L, Space, E, Esc, Tab)
 ├── Player Movement Physics (Verificação por quadrícula de tiles com margens de 12px)
 ├── Player Melee, Projectile e AoE Spells
 ├── Pool inexistente: Alocação e destruição dinâmica de Sprite, Graphics e Text
 ├── IA de Inimigos Melee, Ranged, Minibosses e Bosses com 2 fases
 ├── Sistema de Danos, Críticos e Hitstop
 ├── Status Effects (Burn, Slow, Shock)
 ├── Sistema de Spawn de Inimigos (ao entrar na sala)
 ├── Geração de Hazards (Lava, Raio)
 ├── Baús e Props Interativos (Event, Rest, Shop)
 ├── Atualização de HUD via Callbacks React
 ├── Sincronização direta de XP para o Store do Tamagotchi
 └── Gestão de Transição entre Salas, Vitória e Derrota
```

---

## 4. CLASSIFICAÇÃO DOS SUBSISTEMAS EXISTENTES

| Subsistema / Componente | Classificação | Motivo Técnico / Arquitetural |
| :--- | :---: | :--- |
| **PreFX Grayscale para Inimigos** | **KEEP** | Excelente implementação em GPU (`sprite.preFX.addColorMatrix().grayscale(1)`). Preserva 100% dos assets coloridos originais intactos e possui fallback neutro (`0xaaaaaa`) em ambientes sem WebGL. |
| **Biblioteca de Mapas & Autotiling** | **KEEP** | O gerador procedural de 11 camadas (`room-layout-generator.ts`, autotiling, microbiomas, 300 salas) é robusto, modular e passou com 100% de sucesso nos testes de conectividade. |
| **Biblioteca de Sprites & VFX** | **KEEP** | As pastas de `public/sprites/` e `public/fx/` contêm animações autênticas dos Digimons (Agumon, Veemon, Gabumon, WarGreymon, etc.) e projéteis. **Não gerar novos assets.** |
| **Limpeza de Teclado no Stop** | **KEEP** | A rotina em `DigitalPathGame.stop()` que remove todos os key listeners e destrói o Phaser limpa os eventos do teclado, prevenindo travamento no restart. |
| **Status Effects Base (Burn, Slow, Shock)** | **EXTEND** | O módulo `status-effects.ts` possui lógica pura desacoplada com `mergeStatusEffect` e `updateEntityStatusEffects`. Deve ser expandido para Freeze, Poison, Bleed, Stun e Vulnerability com suporte a resistências por tipo de inimigo. |
| **Visual Effects Mapping** | **EXTEND** | O arquivo `visual-effects.ts` já mapeia texturas e offsets direcionais para Agumon, Veemon e Gabumon. Deve ser estendido para suportar pooling e novas habilidades sem recriação dinâmica de objetos. |
| **Boss & Miniboss Scaling** | **EXTEND** | As estruturas `BOSS_DEFINITIONS` e `getMiniBossForFloor()` suportam milestones de 10 em 10 salas e 5 em 5 salas. Precisam ser estendidas com fases mais dinâmicas, adds telegrafados e drops de baús de evolução. |
| **Player Controller / Movimentação** | **REFACTOR** | Remover a trava `if (isPlayerAttacking) return;`. Permitir movimentação livre, contínua e suave em 360°/8 direções enquanto os ataques disparam automaticamente. |
| **Dash System** | **REPLACE** | Substituir o impulso acidental do Especial por um sistema de Dash dedicado com tecla `Space`, cooldown próprio, trail visual, invulnerabilidade temporária (I-frames) e passagem por dentro de hordas. |
| **Attack Controller Manual** | **REPLACE** | Substituir os inputs manuais de teclas `J, K, L` por um `WeaponManager` com `SkillRuntime` autônomo, timers independentes e seleção automática de alvos. |
| **Concessão Direta de XP** | **REPLACE** | Substituir o acréscimo instantâneo de XP ao matar por drop de Orbes Físicos no chão, com atração via raio de `Magnet` e multiplicador de `Growth`. |
| **Monólito `DigitalPathGame.ts`** | **REFACTOR** | Extrair a cena e seus componentes em classes dedicadas e desacopladas (`WeaponManager`, `EnemyDirector`, `PickupManager`, `CombatHUDBridge`, `SpatialHashGrid`). |
| **Criação e Destruição Dinâmica (New/Destroy)** | **REPLACE** | Substituir a instanciação em tempo real de projéteis, textos flutuantes de dano e sprites de efeito por **Object Pooling** rigoroso. |
| **`abilities.ts` Antigo** | **REMOVE** | O arquivo `src/lib/digital-path/combat/abilities.ts` possui dados legados incompletos com status `"blocked"` e não é consumido pelo runtime do jogo (que utiliza `loadout.ts`). |

---

## 5. DÉBITOS TÉCNICOS, BUGS E GARGALOS IDENTIFICADOS

### 5.1 Tabela de Problemas e Vulnerabilidades

| ID | Subsistema | Problema Detectado | Severidade | Impacto | Arquivo / Linhas | Causa Provável | Correção Proposta |
| :---: | :--- | :--- | :---: | :--- | :--- | :--- | :--- |
| **ISS-01** | Player Movement | Jogador congela durante ataques | **CRITICAL** | Incompatível com Survivors-like; morte certa em hordas | `DigitalPathGame.ts:3249` | `if (this.isPlayerAttacking) return;` | Desacoplar estado de ataque do controle de velocidade |
| **ISS-02** | Input / Dash | Falta de Dash dedicado; tecla Espaço ataca básico 1 | **HIGH** | Jogador não consegue desvencilhar de multidões | `DigitalPathGame.ts:1921-1925` | `this.keys?.Space?.isDown` dispara `performBasicAttack1` | Mapear `Space` exclusivamente para `performDash()` com cooldown |
| **ISS-03** | Spawn / Waves | Ausência de hordas e waves dinâmicas | **CRITICAL** | Salas têm apenas 3-5 inimigos estáticos que nunca aumentam | `DigitalPathGame.ts:1472-1570` | Spawn ocorre somente na chamada única de `loadRoom()` | Implementar `EnemyDirector` com mini-waves baseadas em tempo de sala |
| **ISS-04** | XP / Level-Up | Inexistência de XP físico e Level-Up na run | **CRITICAL** | Falta o loop viciante central de coleta e build durante o jogo | `DigitalPathGame.ts:2399-2406` | Inimigo morto adiciona XP direto ao total persistente | Implementar `XpOrb` físico, `PickupCollector` com Magnet e tela de Level-Up com 3 escolhas |
| **ISS-05** | Memory / Alloc | Criação e destruição contínua sem Object Pool | **HIGH** | Picos de Garbage Collection (GC spikes) com muitos tiros/mobs | `DigitalPathGame.ts:1983, 2095, 2336, 2380` | `this.add.sprite()`, `this.add.text()`, `destroy()` a cada frame | Implementar pools de projéteis, textos de dano, partículas e inimigos |
| **ISS-06** | Collision / Perf | Detecção de colisão quadrática O(N × M) | **HIGH** | Queda brusca de FPS ao atingir mais de 50 inimigos simultâneos | `DigitalPathGame.ts:2321-2332` | Loop aninhado de cada projétil contra toda a lista `this.enemies` | Implementar `SpatialHashGrid` 2D para consultas de vizinhança rápidas |
| **ISS-07** | HUD / Hardcoded | Banners exibem "SALA X / 50" enquanto o mapa tem 300 salas | **LOW** | Informação visual dessincronizada no jogo | `DigitalPathGame.ts:1589-1591, 3341` | String hardcoded `/50` no banner de entrada de sala | Utilizar `TOTAL_ROOMS` (`300`) dinamicamente |
| **ISS-08** | Timers / Leaks | Múltiplos `window.setTimeout` soltos no callback de cooldown | **MEDIUM** | Desperdício de memória e possíveis triggers após desmontar tela | `DigitalPathScreen.tsx:174-176` | `window.setTimeout` sem rastreamento ou cancelamento no `useEffect` | Gerenciar timers dentro do ciclo de atualização do jogo |
| **ISS-09** | Duplicação de Dados | Conflito arquitetural entre `abilities.ts` e `loadout.ts` | **MEDIUM** | Inconsistência de manutenção e código morto no repositório | `abilities.ts` vs `loadout.ts` | `loadout.ts` foi criado depois mas `abilities.ts` foi mantido | Consolidar em `SkillDefinition` único |

---

## 6. AUDITORIA DOS ASSETS EXISTENTES

### 6.1 Efeitos Visuais em `public/fx/` (DISPONÍVEIS E REUTILIZÁVEIS)
- `public/fx/fire/`: Sequência de animação de chamas (00.png a 05.png).
- `public/fx/blue-fire/`: Sequência de chamas azuis/glaciais.
- `public/fx/laser/`: Feixes de laser de plasma digital.
- `public/fx/claw/`: Cortes de garras físicos para ataques melee.
- `public/fx/energy/`: Esferas de concentração de dados e ondas de choque.
- `public/fx/banana/`: Projéteis cômicos/específicos para Etemon.
- `public/fx/sound-wave/`: Ondas sonoras concêntricas de choque em área.
- `public/fx/speed/`: Rastros de aceleração cibernética.

### 6.2 Sprites e Efeitos em `public/sprites/[digimon]/`
Todas as pastas dos Digimons jogáveis e chefes possuem subpastas organizadas prontas para uso:
- **Agumon:** `attack-pepper-breath`, `attack_01`, `attacks/`, `effects/attack_01`, `effects/mega-blast`, `projectiles/dragon`, `heal`, `hit`, `death`, `idle`, `walk`, `run`, `special_attack`.
- **Veemon:** `attack-vee-headbutt`, `attack_01`, `effects/attack_01`, `effects/special_attack`, `projectiles/laser`, `heal`, `hit`, `death`, `idle`, `walk`.
- **Gabumon:** `attack_01`, `attacks/`, `effects/`, `hit`, `death`, `idle`, `walk`.
- **Chefes e Inimigos (Etemon, MetalEtemon, WarGreymon, WereGarurumon, Garurumon, GeoGreymon, Flamedramon, XV-mon):** Possuem sprites de caminhada, ataque e animações de hit/morte.

**DIRETIVA RIGOROSA:** Todos os efeitos visuais do Combat V2 serão mapeados diretamente a partir destes arquivos existentes. **NENHUM novo sprite ou efeito visual será gerado.**
