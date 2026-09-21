# COMBAT-V2-DATA-MODEL.md
# MODELO DE DADOS E CONTRATOS DO COMBAT V2
**Projeto:** Digigotchi — Tamagotchi + Caminho Digital  
**Foco:** Definições tipadas em TypeScript, contratos estritos de dados, desacoplamento data-driven e mapeamento exclusivo para assets existentes em `public/sprites/` e `public/fx/`.

---

## 1. DEFINIÇÃO DO DIGIMON (`DigimonDefinition`)

Elimina condicionais do tipo `if (species === "agumon")` espalhadas no código. Qualquer espécie é puramente descrita por seus dados:

```typescript
export type CombatArchetype = 
  | "bruiser"    // Equilibrado, média distância, área moderada
  | "caster"     // Alto dano mágico/projéteis, recarga média, foco em área
  | "assassin"   // Altíssima velocidade, crítico alto, curto alcance
  | "tank"       // Alta vida/armadura, absorve dano, controle de multidão
  | "controller" // Lentidão, atordoamento, congelamento, repulsão de hordas
  | "burst";      // Disparos lentos porém devastadores em área

export interface CombatIdentity {
  archetype: CombatArchetype;
  rangePreference: "short" | "medium" | "long" | "screen";
  strengths: string[];
  weaknesses: string[];
  baseCritChance: number;
  baseCritMultiplier: number;
}

export interface DigimonDefinition {
  speciesId: string;
  displayName: string;
  element: "fogo" | "gelo" | "eletricidade" | "neutro" | "trevas";
  baseStats: {
    maxHp: number;
    speed: number;
    armor: number;
    recoveryHpPerSec: number;
    magnetRadius: number;
    growthMultiplier: number;
  };
  combatIdentity: CombatIdentity;
  innateSkillId: string;       // Habilidade que inicia com o Digimon na Run
  signatureSkillPool: string[]; // Habilidades exclusivas que podem aparecer no pool de level-up
  manifestPath: string;        // Caminho do manifest em public/sprites/[species]/manifest.json
  vfxProfileKey: string;
}
```

### Exemplo Concreto — Agumon (Ofensivo Ígneo / Caster-Bruiser)
```json
{
  "speciesId": "agumon",
  "displayName": "Agumon",
  "element": "fogo",
  "baseStats": {
    "maxHp": 120,
    "speed": 115,
    "armor": 2,
    "recoveryHpPerSec": 0.5,
    "magnetRadius": 68,
    "growthMultiplier": 1.0
  },
  "combatIdentity": {
    "archetype": "bruiser",
    "rangePreference": "medium",
    "strengths": ["dano_continuo", "queimadura", "explosao_em_area"],
    "weaknesses": ["baixa_mobilidade_base", "recarregar_longo"],
    "baseCritChance": 0.08,
    "baseCritMultiplier": 1.75
  },
  "innateSkillId": "agumon_baby_flame",
  "signatureSkillPool": [
    "agumon_claw_slash",
    "agumon_pepper_burst",
    "agumon_magma_nova"
  ],
  "manifestPath": "/sprites/agumon/manifest.json",
  "vfxProfileKey": "agumon"
}
```

---

## 2. SISTEMA DE HABILIDADES (`SkillDefinition`)

Representa as armas e habilidades ativas do jogo:

```typescript
export type TargetSelectorType =
  | "NEAREST"
  | "FARTHEST"
  | "RANDOM"
  | "HIGHEST_HP"
  | "LOWEST_HP"
  | "BOSS_PRIORITY"
  | "DENSEST_CLUSTER"
  | "FACING"
  | "AROUND_PLAYER";

export type AttackBehaviorType =
  | "PROJECTILE_STRAIGHT"
  | "PROJECTILE_PIERCING"
  | "ORBITAL"
  | "RADIAL_BURST"
  | "MELEE_CLEAVE"
  | "GROUND_ZONE"
  | "CHAIN_LIGHTNING"
  | "BOUNCE"
  | "HOMING"
  | "SCREEN_NOVA";

export type StatusEffectType = 
  | "burn" 
  | "freeze" 
  | "slow" 
  | "shock" 
  | "poison" 
  | "bleed" 
  | "vulnerability";

export interface SkillLevelProgression {
  level: number;
  damageBonus?: number;
  cooldownReductionMs?: number;
  amountBonus?: number;       // Quantidade de projéteis simultâneos
  areaBonusMultiplier?: number;
  pierceBonus?: number;
  description: string;
}

export interface SkillEvolutionConfig {
  requiredPassiveId: string;
  evolvedSkillId: string;
  chestTierRequired: "normal" | "rare" | "evolution";
}

export interface SkillDefinition {
  id: string;
  name: string;
  description: string;
  element: "fogo" | "gelo" | "eletricidade" | "neutro" | "trevas";
  baseDamage: number;
  baseCooldownMs: number;
  amount: number;             // Projéteis ou instâncias por disparo
  areaMultiplier: number;
  range: number;
  projectileSpeed?: number;
  durationMs?: number;        // Para zonas de chão ou orbitais
  pierce: number;             // Quantos inimigos atravessa
  knockbackForce: number;
  hitIntervalMs?: number;     // Ticks para habilidades persistentes (ex: 350ms)
  critChanceBonus: number;
  canCrit: boolean;
  targeting: TargetSelectorType;
  directionMode: "facing" | "target" | "fixed_angle" | "omnidirectional";
  behavior: AttackBehaviorType;
  statusEffect?: StatusEffectType;
  statusChance?: number;
  maxInstances: number;       // Teto de performance (ex: máx 8 projéteis na tela)
  affectedBy: (
    | "might"
    | "cooldown"
    | "area"
    | "speed"
    | "amount"
    | "duration"
    | "crit"
  )[];
  levels: SkillLevelProgression[];
  evolution?: SkillEvolutionConfig;

  // Mapeamento estrito de assets existentes
  assets: {
    spriteKey?: string;
    texturePath?: string;
    animationKey?: string;
    vfxTextureKey?: string;
    impactTextureKey?: string;
    soundEffectId?: string;
  };
}
```

### Exemplo Concreto — Chama Bebê (Agumon)
```json
{
  "id": "agumon_baby_flame",
  "name": "Chama Bebê",
  "description": "Dispara projéteis de fogo no inimigo mais próximo com chance de queimadura.",
  "element": "fogo",
  "baseDamage": 26,
  "baseCooldownMs": 850,
  "amount": 1,
  "areaMultiplier": 1.0,
  "range": 320,
  "projectileSpeed": 340,
  "pierce": 1,
  "knockbackForce": 25,
  "critChanceBonus": 0.05,
  "canCrit": true,
  "targeting": "NEAREST",
  "directionMode": "target",
  "behavior": "PROJECTILE_STRAIGHT",
  "statusEffect": "burn",
  "statusChance": 0.40,
  "maxInstances": 8,
  "affectedBy": ["might", "cooldown", "area", "speed", "amount", "crit"],
  "levels": [
    { "level": 1, "description": "Dispara 1 chama contra o alvo mais próximo." },
    { "level": 2, "damageBonus": 8, "description": "+8 de Dano." },
    { "level": 3, "amountBonus": 1, "description": "+1 Projétil adicional simultâneo." },
    { "level": 4, "cooldownReductionMs": 150, "description": "-150ms no tempo de recarga." },
    { "level": 5, "damageBonus": 12, "areaBonusMultiplier": 0.35, "description": "+12 de Dano e +35% de Área de explosão." }
  ],
  "evolution": {
    "requiredPassiveId": "core_flame_data",
    "evolvedSkillId": "agumon_mega_flame_burst",
    "chestTierRequired": "evolution"
  },
  "assets": {
    "texturePath": "/sprites/agumon/projectiles/dragon/00.png",
    "vfxTextureKey": "agumon_projectile_dragon_0",
    "impactTextureKey": "agumon_effect_mega_blast_0",
    "soundEffectId": "agumon_attack"
  }
}
```

---

## 3. SISTEMA DE PASSIVAS (`PassiveDefinition`)

Passivas ocupam até 4 slots da build do jogador e modificam atributos globais:

```typescript
export interface PassiveDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  maxLevel: number;
  affectedStats: {
    mightPercentPerLevel?: number;       // Aumento percentual de dano
    cooldownReductionPerLevel?: number;  // 0.08 = -8% por nível
    areaPercentPerLevel?: number;
    projectileSpeedPerLevel?: number;
    amountBonusAtMax?: number;          // Ex: +1 projétil no Lv Max
    magnetRadiusPerLevel?: number;
    growthPercentPerLevel?: number;     // +15% de XP ganho por nível
    maxHpPerLevel?: number;
    armorPerLevel?: number;
    speedPercentPerLevel?: number;
    critChancePerLevel?: number;
  };
  enablesEvolutionOfSkillId?: string;
}
```

### Catálogo Básico de Passivas
1. **Núcleo de Força Digital (`core_power_data`):** +10% Dano por nível (Lv 1 a 5).
2. **Chip de Sobrecarga (`core_rapid_clock`):** -8% Tempo de Recarga por nível.
3. **Módulo de Expansão (`core_expansion_lens`):** +15% Área de efeito por nível.
4. **Sensor Magnético (`core_magnet_sensor`):** +24px de Raio de Magnetismo por nível.
5. **Algoritmo de Crescimento (`core_growth_algorithm`):** +15% XP de orbes por nível.
6. **Armadura de Dados (`core_data_armor`):** +2 de Redução de Dano e +25 HP por nível.
7. **Barramento de Velocidade (`core_velocity_bus`):** +12% Velocidade de Projéteis e +8% Movimentação.
8. **Núcleo Ígneo Concentrado (`core_flame_data`):** +12% Dano de fogo (Evolui *Chama Bebê*).

---

## 4. SISTEMA DE INIMIGOS E HORDAS (`EnemyDefinition` & `WaveDefinition`)

### 4.1 Arquétipos de Inimigos
```typescript
export type EnemyBehaviorArchetype =
  | "CHASER"    // Persegue diretamente o jogador em linha reta
  | "FAST"      // Muito rápido, vida baixa, tenta flanquear
  | "TANK"      // Lento, alta vida e armadura, abre caminho na horda
  | "SWARM"     // Aparece em grupos grandes (15-30 mobs), morre com 1 acerto
  | "RANGED"    // Mantém distância de 150-250px e dispara projéteis
  | "CHARGER"   // Prepara investida em linha reta após telegrafar
  | "EXPLODER"  // Corre em direção ao jogador e explode ao encostar
  | "ELITE";    // Inimigo aumentado com auras e chance de dropar baú
```

### 4.2 Estrutura da Onda de Inimigos (`WaveDefinition`)
```typescript
export interface WaveDefinition {
  waveId: string;
  startSecond: number;
  durationSecond: number;
  spawnRatePerSec: number;
  maxAliveCap: number;
  enemySpeciesPool: {
    speciesId: string;
    archetype: EnemyBehaviorArchetype;
    weight: number;
    isElite?: boolean;
  }[];
  isClimaxWave: boolean;
}
```

---

## 5. SEPARAÇÃO ENTRE RUN STATE E PERSISTENT SAVE

Protege a integridade do Tamagotchi e assegura que mortes ou abandonos nunca corrompam o save principal:

```typescript
// ESTADO TEMPORÁRIO (Descartado ou sintetizado ao encerrar a Run)
export interface CombatRunState {
  runId: string;
  currentRoom: number;
  totalRooms: number;
  runLevel: number;
  currentXp: number;
  xpToNextLevel: number;
  equippedSkills: SkillRuntime[];   // Máx 4
  equippedPassives: { id: string; level: number }[]; // Máx 4
  rerollsLeft: number;
  skipsLeft: number;
  banishesLeft: number;
  totalKills: number;
  elitesKilled: number;
  accumulatedMetaXp: number;
  accumulatedBits: number;
  unlockedChests: { id: string; tier: string }[];
  isPaused: boolean;
}

// ESTADO PERSISTENTE (Salvo no LocalStorage / Backend)
export interface PersistentTamagotchiState {
  trainerId: string;
  activePetId: string;
  speciesId: string;
  permanentLevel: number;
  permanentXp: number;
  vitalStats: {
    hunger: number;
    happiness: number;
    energy: number;
    hygiene: number;
    health: number;
  };
  inventory: Record<string, number>;
  digitalPathProgress: {
    currentFloor: number;
    highestFloor: number;
    defeatedBosses: number[];
    completed: boolean;
  };
}
```
