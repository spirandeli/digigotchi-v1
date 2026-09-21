# COMBAT-V2-ARCHITECTURE.md
# ARQUITETURA PROPOSTA — SISTEMA DE COMBATE SURVIVORS-LIKE
**Projeto:** Digigotchi — Tamagotchi + Caminho Digital  
**Objetivo:** Transformação do combate para modelo Survivors-like com foco em movimentação, ataques automáticos independentes, hordas crescentes, builds dinâmicas e identidade individual por Digimon.  
**Assets:** Reutilização estrita dos assets locais existentes em `public/sprites/` e `public/fx/`. Zero geração externa.

---

## 1. FILOSOFIA DE DESIGN DO COMBAT V2

O novo combate adota cinco pilares de design fundamentais:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        OS 5 PILARES DO COMBAT V2                      │
├────────────────────────────────────────────────────────────────────────┤
│ 1. MOVEMENT FIRST      │ O jogador controla apenas a movimentação e    │
│                        │ o Dash. Nunca fica parado durante ataques.    │
│ 2. AUTO-COMBAT         │ Cada habilidade possui seu próprio timer e    │
│                        │ dispara automaticamente com base em seletores.│
│ 3. BUILD DIVERSITY     │ Até 4 armas ativas + 4 passivas. Escolhas     │
│                        │ a cada level-up com sinergias e evoluções.    │
│ 4. MASSIVE HORDES      │ Inimigos surgem em ondas dinâmicas e densas,  │
│                        │ escalando em número, velocidade e pressão.    │
│ 5. DIGIMON IDENTITY    │ Arquétipos únicos (Bruiser, Caster, Ranged,   │
│                        │ Speed), habilidades exclusivas e VFX originais│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. DIAGRAMA ARQUITETURAL GERAL

```text
                               ┌──────────────────────┐
                               │  DigitalPathGame     │
                               │  (Host & Lifecycle)  │
                               └──────────┬───────────┘
                                          │
                                          ▼
                               ┌──────────────────────┐
                               │  CombatScene (Phaser)│
                               └──────────┬───────────┘
            ┌─────────────────────────────┼─────────────────────────────┐
            ▼                             ▼                             ▼
   ┌─────────────────┐           ┌─────────────────┐           ┌─────────────────┐
   │ PlayerEntity    │           │ EnemyDirector   │           │ SpatialHashGrid │
   │                 │           │                 │           │ (Broadphase)    │
   │ ├── MovementCtrl│           │ ├── WaveManager │           │                 │
   │ ├── DashSystem  │           │ ├── SpawnManager│           │ O(1) Queries    │
   │ ├── PlayerStats │           │ └── Scaler      │           └────────┬────────┘
   │ └── WeaponMgr   │           └────────┬────────┘                    │
   └────────┬────────┘                    │                             │
            │                             ▼                             │
            │                    ┌─────────────────┐                    │
            │                    │ EnemyPool       │                    │
            │                    │ (ActiveEnemy[]) │                    │
            │                    └────────┬────────┘                    │
            │                             │                             │
            ▼                             ▼                             ▼
┌───────────────────────┐        ┌─────────────────┐           ┌─────────────────┐
│ WeaponManager         │◄───────┤ CollisionSystem │──────────►│ DamageSystem    │
│                       │        └─────────────────┘           │                 │
│ ├── SkillRuntime [1..4]                                      │ ├── Armor Calc  │
│ ├── TargetSelector    │                                      │ ├── Crit System │
│ ├── AttackBehavior    │                                      │ └── StatusEffMgr│
│ └── ProjectilePool    │                                      └────────┬────────┘
└──────────┬────────────┘                                               │
           │                                                            ▼
           │  (Emite dano / Kills)                             ┌─────────────────┐
           └──────────────────────────────────────────────────►│ PickupManager   │
                                                               │                 │
                                                               │ ├── XpOrbPool   │
                                                               │ ├── MagnetSystem│
                                                               │ └── Chests/Buffs│
                                                               └────────┬────────┘
                                                                        │
                                                                        ▼
                                                               ┌─────────────────┐
                                                               │ LevelUpManager  │
                                                               │                 │
                                                               │ ├── PauseCombat │
                                                               │ ├── Draft (3)   │
                                                               │ └── Build Evol. │
                                                               └─────────────────┘
```

---

## 3. COMPONENTES PRINCIPAIS E SUAS RESPONSABILIDADES

### 3.1 PlayerEntity & MovementController
- **Movimentação Desacoplada de Ataque:** O jogador move-se continuamente em 8 direções através de velocidade vetorial suave (`dx`, `dy`). Não existe trava `isPlayerAttacking`.
- **Facing Direction Atualizada em Tempo Real:** Atualiza a direção do olhar (`right`, `left`, `up`, `down`) para direcionar habilidades do tipo `FACING_DIRECTION` e inverter o sprite (`setFlipX` ou animação directional walk).
- **Dash Dedicado (`Space`):**
  - Aplica um impulso vetorial de alta velocidade na direção do movimento (ou do facing, se parado).
  - Concede invulnerabilidade temporária (I-frames de 250ms).
  - Permite atravessar o corpo físico dos inimigos da horda sem sofrer colisão ou dano.
  - Deixa rastro visual translúcido (ghost effect) utilizando sprites existentes com tween de fade.
  - Cooldown próprio (ex: 2.2 segundos base, reduzível por passivas).

### 3.2 WeaponManager & SkillRuntime
- **Arquitetura de Timers Independentes:** Cada habilidade possui uma instância de `SkillRuntime`. Nunca existe um timer compartilhado.
- **Estrutura de Instância em Execução:**
```typescript
export interface SkillRuntime {
  definition: SkillDefinition;
  level: number;
  currentCooldownMs: number;
  nextCastTimestamp: number;
  activeInstances: number; // Controle de maxInstances
  isEvolved: boolean;
  evolvedDefinition?: SkillDefinition;
}
```
- **Loop de Execução:** A cada tick do Phaser (`update`), o `WeaponManager` percorre as habilidades equipadas. Para cada uma onde `time >= runtime.nextCastTimestamp` e `runtime.activeInstances < maxInstances`:
  1. Consulta o `TargetSelector` configurado na habilidade.
  2. Se encontrar alvo válido (ou se for habilidade de auto-cast em área/facing), invoca o `AttackBehavior`.
  3. Agenda `nextCastTimestamp = time + (runtime.currentCooldownMs * modifiers.cooldownMultiplier)`.
  4. Emite evento de cooldown para o HUD.

### 3.3 TargetSelector (Desacoplamento Alvo vs Ação)
Módulo funcional puro responsável exclusivamente por eleger o alvo ou a coordenada de disparo:
- `NEAREST`: Encontra o inimigo vivo com menor distância euclidiana ao jogador.
- `FARTHEST`: Encontra o inimigo vivo mais distante dentro do alcance máximo.
- `RANDOM`: Sorteia qualquer inimigo vivo no raio da habilidade.
- `HIGHEST_HP`: Prioriza o inimigo com maior HP atual (útil para bosses e elites).
- `LOWEST_HP`: Prioriza inimigos próximos da morte para eliminá-los rapidamente.
- `BOSS_PRIORITY`: Foca obrigatoriamente no Chefe ou Miniboss da sala, se presente; caso contrário, usa `NEAREST`.
- `DENSEST_CLUSTER`: Utiliza o `SpatialHashGrid` para calcular a célula de 64x64px com maior contagem de inimigos e retorna seu centro.
- `FACING`: Dispara na linha de visão atual do jogador (`right`, `left`, `up`, `down`).
- `AROUND_PLAYER`: Retorna a posição do jogador para habilidades de raio e auras orbitais.

### 3.4 Biblioteca de AttackBehaviors
Módulos reutilizáveis que materializam a mecânica física e visual do golpe:
1. `PROJECTILE_STRAIGHT`: Dispara projétil linear na direção do alvo ou facing (ex: *Chama Bebê* do Agumon).
2. `PROJECTILE_PIERCING`: Dispara feixe laser ou perfurante que atravessa até N inimigos (ex: *Vee-Laser* do Veemon).
3. `ORBITAL`: Esferas ou dados orbitando circularmente ao redor do jogador, causando dano a quem encostar.
4. `RADIAL_BURST`: Disparo omnidirecional em 4, 8 ou 12 direções simultâneas.
5. `MELEE_CLEAVE`: Golpe semicircular frontal de corte em curto alcance.
6. `GROUND_ZONE`: Cria zona de chão persistente que causa dano em ticks (`hitInterval`) aos inimigos que pisarem nela (ex: *Fire Zone*, *Magma Trap*).
7. `CHAIN_LIGHTNING`: Projétil que, ao impactar um inimigo, rebate para o próximo mais próximo até N vezes.
8. `BOUNCE`: Projétil que ricocheteia nas paredes da sala.
9. `HOMING`: Projétil guiado com aceleração angular contínua em direção ao alvo mais próximo.
10. `SCREEN_NOVA`: Pulso de tela cheia disparado em clímax ou evoluções de habilidades.

### 3.5 Sistema de Status Effects e Resistências
- **Efeitos Genéricos Suportados:**
  - `Burn`: Dano periódico de fogo a cada 0.5s por 3 segundos.
  - `Freeze`: Congela o movimento e a IA por 1.5s.
  - `Slow`: Reduz velocidade de movimento em 40% por 2.5s.
  - `Shock`: Paralisa momentaneamente com micro-stuns intermitentes.
  - `Poison`: Dano contínuo que ignora defesa do inimigo.
  - `Bleed`: Dano amplificado proporcional ao movimento do inimigo.
  - `Vulnerability`: Aumenta todo dano sofrido em +25%.
- **Resistências Baseadas em Arquétipo:**
  - Inimigo Normal: 0% de resistência a Freeze/Stun.
  - Elite: 40% de redução de duração de CC.
  - Miniboss: 65% de redução de duração de CC.
  - Chefe: 85% de redução de duração de CC (imune a perma-freeze).

### 3.6 Hit Interval em Habilidades Persistentes
Para evitar dezenas de colisões por segundo que esgotam a CPU e causam números excessivos na tela, habilidades em área contínua (ex: campos de fogo, auras gravitacionais) possuem `hitIntervalMs: 350`.  
Cada inimigo atingido armazena `nextValidHitTimestamp: time + hitIntervalMs`. Uma colisão só registra dano se `time >= nextValidHitTimestamp`.

### 3.7 XP Físico, Magnet e Growth
- **Ciclo de Drop:**
  1. Inimigo morre -> Em vez de somar XP imediato, spawna um `XpOrb` do pool na posição do inimigo.
  2. Cores e Valores das Orbes:
     - Azul claro: 5 XP (mobs normais).
     - Verde: 25 XP (mobs rápidos/médios).
     - Roxo: 100 XP (elites).
     - Dourado: 500 XP (chefes/minibosses).
  3. **Magnet Range:** Se a distância euclidiana entre o jogador e a orbe for menor que `playerStats.magnetRadius`, a orbe entra no estado `ATTRACTED` e acelera em direção ao jogador com tween exponencial.
  4. **Coleta:** Ao colidir com o jogador, o orbe retorna ao pool e concede `xpValue * playerStats.growthMultiplier`.

### 3.8 Level-Up na Run e Draft de Builds
- O jogador acumula XP na run através de uma barra de nível independente (`runLevel`).
- **Fórmula de Nível da Run:** `xpRequired = Math.floor(25 * Math.pow(runLevel, 1.45))`.
- Ao atingir o valor requerido:
  1. `LevelUpManager` pausa o loop da cena do Phaser (`scene.isPaused = true`).
  2. Dispara evento para o HUD React com 3 opções balanceadas:
     - **Nova Arma:** Habilidade ativa disponível (até o limite de 4 armas).
     - **Upgrade de Arma:** Subir de nível uma arma existente (Lv 2 ao Lv 5).
     - **Passiva:** Núcleo de atributos (até o limite de 4 passivas).
  3. Suporte arquitetural a **Reroll** (sortear novas opções), **Skip** (pular escolha e converter em cura/bits) e **Banish** (banir opção do pool da run).
  4. Ao selecionar a carta, aplica a melhoria no `WeaponManager` ou `PlayerStats` e retoma o combate suavemente.

### 3.9 Evoluções de Armas
Quando uma arma ativa atinge o **Nível 5 (Máximo)** e o jogador possui a **Passiva correspondente** no inventário da run, a derrota de um Elite ou Miniboss dropa um **Baú de Evolução** (`Evolution Chest`).  
Ao abrir o baú, a arma é promovida para sua versão evoluída, alterando seu comportamento, VFX e efeitos:

```text
Exemplos de Evolução com Assets Existentes:
1. Agumon: Chama Bebê (Lv 5) + Núcleo de Fogo = Mega Explosão de Dados (Mega Blast)
   - Transforma projétil único em rajada tripla que explode em campo de magma persistente (usando public/sprites/agumon/effects/mega-blast/).
2. Veemon: Vee-Laser (Lv 5) + Núcleo de Expansão = Plasma Beam Omnidirecional
   - Transforma disparo fino em feixe massivo perfurante contínuo (usando public/sprites/veemon/projectiles/laser/).
3. Gabumon: Chifre Perfurante (Lv 5) + Núcleo de Velocidade = Vórtice Congelante Alfa
   - Adiciona projéteis de gelo giratórios que congelam os alvos atingidos.
```

### 3.10 EnemyDirector e Mini-Waves por Sala
Em substituição ao spawn único estático, cada sala passa a ser orquestrada por um `EnemyDirector` com linha do tempo de pressão:

```text
Linha do Tempo da Sala de Combate:
00s - 20s: Pressão Inicial    -> 10 a 20 mobs lentos (Chasers) surgem nas bordas.
20s - 45s: Enxame Crescente    -> Mobs rápidos (Swarm) cercam o jogador.
45s - 70s: Inimigos de Elite   -> 1 ou 2 Elites surgem com mais HP e modificadores.
70s - 90s: Clímax da Sala      -> Horda máxima (60 a 100 mobs).
Ao eliminar os alvos de clímax -> Portão destranca para a próxima sala.
```

---

## 4. ARQUITETURA DE PERFORMANCE E ESCALA

Para suportar **300 a 500 entidades simultâneas** sem quedas de taxa de quadros (60 FPS estáveis no browser), implementa-se:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        OTIMIZAÇÕES DE PERFORMANCE                     │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Object Pooling         │ Zero "new" ou "destroy" durante combate.   │
│                           │ Pools pré-alocados para Projéteis, Inimigos│
│                           │ Orbes de XP, VFX transitórios e Textos.    │
│ 2. Spatial Hash Grid      │ Grade 2D (células 64x64px). Colisões O(1)  │
│                           │ apenas entre entidades na mesma célula.    │
│ 3. IA Decoupled Tick      │ Física/movimento rodam a 60 FPS.           │
│                           │ Lógica de targeting e IA rodam a 15-20 Hz. │
│ 4. Damage Aggregator      │ Múltiplos acertos no mesmo inimigo em <80ms│
│                           │ agregam em um único número de dano visual. │
└────────────────────────────────────────────────────────────────────────┘
```
