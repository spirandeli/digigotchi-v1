import type { StatusEffectType } from "./status-effects";
import { normalizeDigimonName, getDigimonSpriteBasePath } from "./enemy-sprites";

export type EnemyArchetype = "melee" | "ranged" | "tank" | "swarm";

export type EnemyTemplate = {
  id: string;
  name: string;
  digimon: string; // Espécie canônica do Digimon em public/sprites/[digimon]/
  archetype: EnemyArchetype;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  xpReward: number;
  coinReward: number;
  attackCooldownMs: number;
  projectileColor?: number;
  statusEffectOnHit?: StatusEffectType;
  preferredDistance?: number;
  spriteKey?: string;
};

export const ENEMY_TEMPLATES: Record<string, EnemyTemplate> = {
  goburimon: {
    id: "goburimon",
    name: "Goburimon",
    digimon: "gabumon",
    archetype: "melee",
    maxHp: 38,
    attack: 8,
    defense: 2,
    speed: 62,
    xpReward: 16,
    coinReward: 8,
    attackCooldownMs: 1400,
    spriteKey: "enemy_gabumon_idle",
  },
  gazimon_ranged: {
    id: "gazimon_ranged",
    name: "Gazimon Arqueiro",
    digimon: "veemon",
    archetype: "ranged",
    maxHp: 28,
    attack: 10,
    defense: 1,
    speed: 48,
    xpReward: 18,
    coinReward: 10,
    attackCooldownMs: 2000,
    projectileColor: 0xaa00ff,
    preferredDistance: 150,
    spriteKey: "enemy_veemon_idle",
  },
  guardromon_tank: {
    id: "guardromon_tank",
    name: "Sentinela Blindada",
    digimon: "etemon",
    archetype: "tank",
    maxHp: 75,
    attack: 14,
    defense: 6,
    speed: 35,
    xpReward: 32,
    coinReward: 18,
    attackCooldownMs: 2200,
    spriteKey: "enemy_etemon_idle",
  },
  chibimon_swarm: {
    id: "chibimon_swarm",
    name: "Inseto Rápido",
    digimon: "veemon",
    archetype: "swarm",
    maxHp: 18,
    attack: 6,
    defense: 0,
    speed: 82,
    xpReward: 12,
    coinReward: 6,
    attackCooldownMs: 1100,
    spriteKey: "enemy_veemon_idle",
  },
  agumon_wild: {
    id: "agumon_wild",
    name: "Agumon Selvagem",
    digimon: "agumon",
    archetype: "melee",
    maxHp: 44,
    attack: 11,
    defense: 3,
    speed: 58,
    xpReward: 20,
    coinReward: 12,
    attackCooldownMs: 1300,
    spriteKey: "enemy_agumon_idle",
  },
  garurumon_wild: {
    id: "garurumon_wild",
    name: "Garurumon Selvagem",
    digimon: "garurumon",
    archetype: "melee",
    maxHp: 65,
    attack: 15,
    defense: 4,
    speed: 70,
    xpReward: 35,
    coinReward: 20,
    attackCooldownMs: 1500,
    spriteKey: "enemy_garurumon_idle",
  },
};

export const BIOME_ENEMY_POOLS: Record<string, string[]> = {
  digital: ["goburimon", "gazimon_ranged", "chibimon_swarm", "guardromon_tank", "agumon_wild"],
  fire: ["goburimon", "agumon_wild", "guardromon_tank"],
  storm: ["goburimon", "chibimon_swarm", "gazimon_ranged"],
  ice: ["goburimon", "garurumon_wild", "gazimon_ranged"],
};

export function getEnemyTemplate(id: string): EnemyTemplate {
  return ENEMY_TEMPLATES[id] ?? ENEMY_TEMPLATES.goburimon;
}

/**
 * Retorna automaticamente o caminho dos sprites do inimigo baseado em seu Digimon
 * Ex: /sprites/agumon/
 */
export function getEnemySpritePath(template: EnemyTemplate): string {
  return getDigimonSpriteBasePath(template.digimon || template.name);
}

export function pickRandomEnemyForBiome(biome: string, randomFloat: number): EnemyTemplate {
  const pool = BIOME_ENEMY_POOLS[biome] || BIOME_ENEMY_POOLS.digital;
  const index = Math.floor(randomFloat * pool.length) % pool.length;
  return getEnemyTemplate(pool[index]);
}
