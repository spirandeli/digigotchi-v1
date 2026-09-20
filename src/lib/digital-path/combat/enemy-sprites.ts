export type EnemyActionType = "idle" | "walk" | "attack_01" | "attack_02" | "attack" | "hit" | "death";

export const KNOWN_DIGIMON_SPECIES = [
  "agumon",
  "veemon",
  "gabumon",
  "etemon",
  "flamedramon",
  "garurumon",
  "geogreymon",
  "metaletemon",
  "wargreymon",
  "weregarurumon",
  "xvmon",
] as const;

export type DigimonSpeciesId = (typeof KNOWN_DIGIMON_SPECIES)[number];

export const ENEMY_SPECIES_ACTION_FRAMES: Record<string, Partial<Record<EnemyActionType, number>>> = {
  agumon: {
    idle: 9,
    attack_01: 12,
    hit: 1,
    death: 1,
  },
  veemon: {
    idle: 4,
    attack_01: 8,
    hit: 3,
    death: 3,
  },
  gabumon: {
    idle: 10,
    attack_01: 12,
  },
  etemon: {
    idle: 10,
    attack_01: 12,
  },
  garurumon: {
    idle: 10,
    attack_01: 12,
  },
  flamedramon: {
    idle: 1,
  },
  geogreymon: {
    idle: 10,
    attack_01: 12,
  },
  metaletemon: {
    idle: 10,
    attack_01: 12,
  },
  wargreymon: {
    idle: 10,
    attack_01: 12,
  },
  weregarurumon: {
    idle: 10,
    attack_01: 12,
  },
  xvmon: {
    idle: 8,
    attack_01: 8,
  },
  kingetemon: {},
};

/**
 * Normaliza qualquer string ou nome de personagem para o id canônico do Digimon.
 * Trata maiúsculas/minúsculas, hífens, espaços e nomes compostos.
 */
export function normalizeDigimonName(name?: string | null): string {
  if (!name) return "gabumon";

  const raw = name.toLowerCase().trim();
  const cleaned = raw.replace(/[-_\s]+/g, "");

  // Mapeamento direto se já for conhecido
  if (cleaned.includes("agumon")) return "agumon";
  if (cleaned.includes("veemon") || cleaned.includes("chibimon") || cleaned.includes("vmon")) return "veemon";
  if (cleaned.includes("gabumon") || cleaned.includes("goburimon") || cleaned.includes("gazimon")) return "gabumon";
  if (cleaned.includes("metaletemon")) return "metaletemon";
  if (cleaned.includes("etemon") || cleaned.includes("guardromon") || cleaned.includes("sentinela")) return "etemon";
  if (cleaned.includes("flamedramon")) return "flamedramon";
  if (cleaned.includes("weregarurumon")) return "weregarurumon";
  if (cleaned.includes("garurumon")) return "garurumon";
  if (cleaned.includes("geogreymon")) return "geogreymon";
  if (cleaned.includes("wargreymon") || cleaned.includes("wargeymon")) return "wargreymon";
  if (cleaned.includes("xvmon") || cleaned.includes("exveemon")) return "xvmon";

  // Se corresponder exatamente a um dos conhecidos
  for (const known of KNOWN_DIGIMON_SPECIES) {
    if (cleaned === known) return known;
  }

  return "gabumon";
}

/**
 * Retorna o caminho base dos sprites do Digimon no navegador.
 * Exemplo: normalizeDigimonName("Agumon") => "/sprites/agumon/"
 */
export function getDigimonSpriteBasePath(speciesOrName: string): string {
  const norm = normalizeDigimonName(speciesOrName);
  return `/sprites/${norm}/`;
}

export type ResolvedAnimation = {
  actualAction: EnemyActionType;
  fallbackUsed: boolean;
  frameCount: number;
};

/**
 * Resolve a animação solicitada para um Digimon aplicando fallback seguro.
 * Prioridades:
 * - attack_02 -> attack_01 -> attack -> idle
 * - walk -> idle (se walk não tiver frames recortados)
 * - hit -> hit (se existir) ou fallback para idle com flash de tint
 * - death -> death (se existir) ou fallback para idle com tween
 */
export function resolveEnemyAnimation(species: string, requestedAction: string): ResolvedAnimation {
  const normSpecies = normalizeDigimonName(species);
  const speciesFrames = ENEMY_SPECIES_ACTION_FRAMES[normSpecies] || {};

  // 1. Ação exata disponível
  const directCount = speciesFrames[requestedAction as EnemyActionType];
  if (directCount && directCount > 0) {
    return {
      actualAction: requestedAction as EnemyActionType,
      fallbackUsed: false,
      frameCount: directCount,
    };
  }

  // 2. Cadeia de fallback para ataque
  if (requestedAction === "attack_02" || requestedAction === "attack" || requestedAction === "special") {
    if (speciesFrames.attack_01 && speciesFrames.attack_01 > 0) {
      return { actualAction: "attack_01", fallbackUsed: true, frameCount: speciesFrames.attack_01 };
    }
  }

  const idleCount = speciesFrames.idle ?? 0;

  // 3. Cadeia de fallback para walk
  if (requestedAction === "walk") {
    return { actualAction: "idle", fallbackUsed: true, frameCount: idleCount };
  }

  // 4. Cadeia de fallback para hit
  if (requestedAction === "hit") {
    return { actualAction: "idle", fallbackUsed: true, frameCount: idleCount };
  }

  // 5. Cadeia de fallback para death
  if (requestedAction === "death") {
    return { actualAction: "idle", fallbackUsed: true, frameCount: idleCount };
  }

  // 6. Default absoluto para idle
  return {
    actualAction: "idle",
    fallbackUsed: requestedAction !== "idle",
    frameCount: idleCount,
  };
}

/**
 * Retorna uma chave única de animação do Phaser para o inimigo.
 * Exemplo: enemy_agumon_idle, enemy_veemon_attack_01
 */
export function getEnemyAnimationKey(species: string, action: string): string {
  const norm = normalizeDigimonName(species);
  return `enemy_${norm}_${action}`;
}
