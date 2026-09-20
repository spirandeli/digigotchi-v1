export type BossPhaseConfig = {
  phase: number;
  triggerHpPercent: number; // e.g. 0.5 for 50% HP
  name: string;
  speedMultiplier: number;
  attackCooldownMs: number;
  hasAreaTelegraph: boolean;
  hasRadialProjectiles: boolean;
  hazardType?: "none" | "lava" | "lightning";
  description: string;
};

export type BossDefinition = {
  id: string;
  name: string;
  biome: "digital" | "fire" | "storm" | "ice" | "dark";
  baseHp: number;
  attackDamage: number;
  defense: number;
  speed: number;
  phases: BossPhaseConfig[];
  xpReward: number;
  coinReward: number;
  guaranteedItemDrop: string;
};

export const DIGITAL_PATH_CONFIG = {
  maxFloor: 300,
  bossInterval: 10,
  minibossInterval: 10,
  minibossOffset: 5,
  bossFloors: Array.from({ length: 30 }, (_, i) => (i + 1) * 10) as readonly number[],
  minibossFloors: Array.from({ length: 30 }, (_, i) => i * 10 + 5) as readonly number[],
  checkpointFloors: Array.from({ length: 30 }, (_, i) => i * 10 + 1) as readonly number[],
} as const;

export type MiniBossDefinition = {
  id: string;
  name: string;
  digimon: string;
  baseHp: number;
  attackDamage: number;
  defense: number;
  speed: number;
  xpReward: number;
  coinReward: number;
  guaranteedItemDrop?: string;
};

export const BOSS_DEFINITIONS: Record<string, BossDefinition> = {
  kuwagamon: {
    id: "kuwagamon",
    name: "Kuwagamon da Fenda",
    biome: "digital",
    baseHp: 300,
    attackDamage: 18,
    defense: 4,
    speed: 55,
    xpReward: 200,
    coinReward: 100,
    guaranteedItemDrop: "carne_digital",
    phases: [
      {
        phase: 1,
        triggerHpPercent: 1.0,
        name: "Guardião da Fenda",
        speedMultiplier: 1.0,
        attackCooldownMs: 1800,
        hasAreaTelegraph: false,
        hasRadialProjectiles: false,
        description: "Investidas agressivas e golpes de tenazes.",
      },
      {
        phase: 2,
        triggerHpPercent: 0.5,
        name: "Fase 2: Fúria Digital",
        speedMultiplier: 1.35,
        attackCooldownMs: 1300,
        hasAreaTelegraph: true,
        hasRadialProjectiles: true,
        description: "Sobrecarga de dados com rajada quádrupla e pisada telegrafada.",
      },
    ],
  },
  meramon: {
    id: "meramon",
    name: "Meramon Incandescente",
    biome: "fire",
    baseHp: 480,
    attackDamage: 24,
    defense: 6,
    speed: 52,
    xpReward: 320,
    coinReward: 150,
    guaranteedItemDrop: "carne_digital",
    phases: [
      {
        phase: 1,
        triggerHpPercent: 1.0,
        name: "Espírito das Chamas",
        speedMultiplier: 1.0,
        attackCooldownMs: 1900,
        hasAreaTelegraph: false,
        hasRadialProjectiles: false,
        hazardType: "lava",
        description: "Socos de fogo e projeção de brasas.",
      },
      {
        phase: 2,
        triggerHpPercent: 0.45,
        name: "Fase 2: Erupção Magmática",
        speedMultiplier: 1.35,
        attackCooldownMs: 1200,
        hasAreaTelegraph: true,
        hasRadialProjectiles: true,
        hazardType: "lava",
        description: "Ondas de calor e rajadas ígneas omnidirecionais.",
      },
    ],
  },
  seadramon: {
    id: "seadramon",
    name: "Seadramon Glacial",
    biome: "ice",
    baseHp: 680,
    attackDamage: 30,
    defense: 8,
    speed: 60,
    xpReward: 450,
    coinReward: 200,
    guaranteedItemDrop: "fruta_digital",
    phases: [
      {
        phase: 1,
        triggerHpPercent: 1.0,
        name: "Guardião do Oceano de Dados",
        speedMultiplier: 1.0,
        attackCooldownMs: 1700,
        hasAreaTelegraph: false,
        hasRadialProjectiles: false,
        hazardType: "lightning",
        description: "Sopro congelante em linha e descargas frias.",
      },
      {
        phase: 2,
        triggerHpPercent: 0.5,
        name: "Fase 2: Tempestade de Gelo",
        speedMultiplier: 1.4,
        attackCooldownMs: 1100,
        hasAreaTelegraph: true,
        hasRadialProjectiles: true,
        hazardType: "lightning",
        description: "Descargas elétricas no solo e dispersão gélida em 4 direções.",
      },
    ],
  },
  metaletemon: {
    id: "metaletemon",
    name: "MetalEtemon Tirano Metálico",
    biome: "storm",
    baseHp: 920,
    attackDamage: 38,
    defense: 12,
    speed: 65,
    xpReward: 600,
    coinReward: 300,
    guaranteedItemDrop: "fruta_digital",
    phases: [
      {
        phase: 1,
        triggerHpPercent: 1.0,
        name: "Tirano de Metal",
        speedMultiplier: 1.0,
        attackCooldownMs: 1600,
        hasAreaTelegraph: false,
        hasRadialProjectiles: false,
        hazardType: "lightning",
        description: "Golpes pesados com blindagem de Chrome Digizoid.",
      },
      {
        phase: 2,
        triggerHpPercent: 0.45,
        name: "Fase 2: Sobrecarga Metálica",
        speedMultiplier: 1.45,
        attackCooldownMs: 1000,
        hasAreaTelegraph: true,
        hasRadialProjectiles: true,
        hazardType: "lightning",
        description: "Descargas de alta voltagem contínuas e disparos omnidirecionais.",
      },
    ],
  },
  wargeymon: {
    id: "wargeymon",
    name: "BlackWarGreymon (Chefe Final)",
    biome: "dark",
    baseHp: 1350,
    attackDamage: 48,
    defense: 16,
    speed: 75,
    xpReward: 1200,
    coinReward: 600,
    guaranteedItemDrop: "carne_digital",
    phases: [
      {
        phase: 1,
        triggerHpPercent: 1.0,
        name: "Soberano do Núcleo Negro",
        speedMultiplier: 1.0,
        attackCooldownMs: 1500,
        hasAreaTelegraph: true,
        hasRadialProjectiles: true,
        hazardType: "lava",
        description: "Garras Dracônicas e esferas de fogo sombrio concentradas.",
      },
      {
        phase: 2,
        triggerHpPercent: 0.5,
        name: "Fase 2: Fúria do Dragão Negro (Clímax)",
        speedMultiplier: 1.5,
        attackCooldownMs: 900,
        hasAreaTelegraph: true,
        hasRadialProjectiles: true,
        hazardType: "lava",
        description: "Gaia Force sombria com erupção cataclísmica e choque devastador.",
      },
    ],
  },
};

export function isBossFloor(floor: number): boolean {
  return floor > 0 && floor <= DIGITAL_PATH_CONFIG.maxFloor && floor % DIGITAL_PATH_CONFIG.bossInterval === 0;
}

export function isMiniBossFloor(floor: number): boolean {
  return (
    floor > 0 &&
    floor <= DIGITAL_PATH_CONFIG.maxFloor &&
    floor % DIGITAL_PATH_CONFIG.minibossInterval === DIGITAL_PATH_CONFIG.minibossOffset
  );
}

export function getBossForFloor(floor: number, biome?: string): BossDefinition {
  const cycleIndex = Math.floor((floor - 1) / 10) % 5; // 0: kuwagamon, 1: meramon, 2: seadramon, 3: metaletemon, 4: wargeymon
  const cycleTier = Math.min(6, Math.floor((floor - 1) / 50) + 1); // 1 to 6
  const tierMultiplier = 1 + (cycleTier - 1) * 0.25;

  let baseBoss: BossDefinition;
  switch (cycleIndex) {
    case 0:
      baseBoss = BOSS_DEFINITIONS.kuwagamon;
      break;
    case 1:
      baseBoss = BOSS_DEFINITIONS.meramon;
      break;
    case 2:
      baseBoss = BOSS_DEFINITIONS.seadramon;
      break;
    case 3:
      baseBoss = BOSS_DEFINITIONS.metaletemon;
      break;
    case 4:
    default:
      baseBoss = BOSS_DEFINITIONS.wargeymon;
      break;
  }

  if (cycleTier > 1) {
    return {
      ...baseBoss,
      name: `${baseBoss.name} (Ciclo ${cycleTier})`,
      baseHp: Math.round(baseBoss.baseHp * tierMultiplier),
      attackDamage: Math.round(baseBoss.attackDamage * (1 + (cycleTier - 1) * 0.15)),
      defense: baseBoss.defense + (cycleTier - 1) * 2,
      xpReward: Math.round(baseBoss.xpReward * tierMultiplier),
      coinReward: Math.round(baseBoss.coinReward * tierMultiplier),
    };
  }

  return baseBoss;
}

export function getMiniBossForFloor(floor: number): MiniBossDefinition {
  const cycleIndex = Math.floor((floor - 5) / 10) % 5;
  const cycleTier = Math.min(6, Math.floor((floor - 1) / 50) + 1);
  const tierMultiplier = 1 + (cycleTier - 1) * 0.25;

  const miniBosses: MiniBossDefinition[] = [
    {
      id: "miniboss_garurumon",
      name: "Garurumon Alfa",
      digimon: "garurumon",
      baseHp: 180,
      attackDamage: 14,
      defense: 4,
      speed: 68,
      xpReward: 120,
      coinReward: 75,
      guaranteedItemDrop: "carne_digital",
    },
    {
      id: "miniboss_etemon",
      name: "Etemon Sentinela",
      digimon: "etemon",
      baseHp: 240,
      attackDamage: 16,
      defense: 6,
      speed: 58,
      xpReward: 160,
      coinReward: 90,
      guaranteedItemDrop: "fruta_digital",
    },
    {
      id: "miniboss_veemon",
      name: "V-mon Campeão Renegado",
      digimon: "veemon",
      baseHp: 210,
      attackDamage: 18,
      defense: 5,
      speed: 72,
      xpReward: 190,
      coinReward: 100,
      guaranteedItemDrop: "carne_digital",
    },
    {
      id: "miniboss_agumon",
      name: "GeoGreymon Guardião Intermediário",
      digimon: "agumon",
      baseHp: 260,
      attackDamage: 20,
      defense: 7,
      speed: 62,
      xpReward: 220,
      coinReward: 110,
      guaranteedItemDrop: "fruta_digital",
    },
    {
      id: "miniboss_weregarurumon",
      name: "WereGarurumon das Sombras",
      digimon: "weregarurumon",
      baseHp: 300,
      attackDamage: 22,
      defense: 8,
      speed: 75,
      xpReward: 260,
      coinReward: 130,
      guaranteedItemDrop: "carne_digital",
    },
  ];

  const mb = miniBosses[cycleIndex] || miniBosses[0];
  return {
    ...mb,
    name: cycleTier > 1 ? `${mb.name} (Ciclo ${cycleTier})` : mb.name,
    baseHp: Math.round(mb.baseHp * tierMultiplier),
    attackDamage: Math.round(mb.attackDamage * (1 + (cycleTier - 1) * 0.15)),
    defense: mb.defense + (cycleTier - 1) * 2,
    xpReward: Math.round(mb.xpReward * tierMultiplier),
    coinReward: Math.round(mb.coinReward * tierMultiplier),
  };
}
