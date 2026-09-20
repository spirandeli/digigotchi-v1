import type { StatusEffectType } from "./status-effects";
import type { AttackDirectionType } from "./direction";

export type AttackSlotConfig = {
  name: string;
  damage: number;
  range?: number;
  area?: number;
  cooldownMs: number;
  animation: string;
  projectileColor?: number;
  statusEffect?: StatusEffectType;
  shakeIntensity?: number;
  invulnerableFramesMs?: number;
  reflectProjectiles?: boolean;
  attackType: AttackDirectionType;
  description: string;
};

export type PlayableSpeciesCombatProfile = {
  speciesId: string;
  displayName: string;
  role: string;
  element: "fogo" | "gelo" | "eletricidade" | "neutro";
  baseSpeed: number;
  basic1: AttackSlotConfig;
  basic2: AttackSlotConfig;
  special: AttackSlotConfig;
};

export const PLAYABLE_COMBAT_PROFILES: Record<string, PlayableSpeciesCombatProfile> = {
  agumon: {
    speciesId: "agumon",
    displayName: "Agumon",
    role: "Ofensivo Equilibrado",
    element: "fogo",
    baseSpeed: 105,
    basic1: {
      name: "Golpe de Garra",
      damage: 18,
      range: 48,
      cooldownMs: 380,
      animation: "player-attack-basic-1",
      attackType: "DIRECTIONAL_MELEE",
      description: "Golpe físico frontal veloz.",
    },
    basic2: {
      name: "Chama Bebê",
      damage: 24,
      range: 240,
      cooldownMs: 650,
      animation: "player-attack-basic-2",
      projectileColor: 0xff6600,
      statusEffect: "burn",
      attackType: "DIRECTIONAL_PROJECTILE",
      description: "Disparo ígneo com chance de queimar o alvo.",
    },
    special: {
      name: "Bafo de Pimenta",
      damage: 48,
      area: 96,
      cooldownMs: 2400,
      animation: "player-attack-special",
      shakeIntensity: 0.008,
      attackType: "RADIAL_AREA",
      description: "Explosão de fogo devastadora em área.",
    },
  },
  veemon: {
    speciesId: "veemon",
    displayName: "Veemon",
    role: "Velocidade e Combos",
    element: "neutro",
    baseSpeed: 125,
    basic1: {
      name: "Vee-Punch",
      damage: 14,
      range: 44,
      cooldownMs: 260,
      animation: "player-attack-basic-1",
      attackType: "DIRECTIONAL_MELEE",
      description: "Socos ultrarrápidos com cancelamento ágil.",
    },
    basic2: {
      name: "Vee-Laser",
      damage: 20,
      range: 300,
      cooldownMs: 500,
      animation: "player-attack-basic-2",
      projectileColor: 0x00e5ff,
      attackType: "DIRECTIONAL_PROJECTILE",
      description: "Feixe de plasma digital de longo alcance.",
    },
    special: {
      name: "Vee-Headbutt Turbinado",
      damage: 42,
      area: 80,
      cooldownMs: 1900,
      animation: "player-attack-special",
      invulnerableFramesMs: 250,
      shakeIntensity: 0.006,
      attackType: "DIRECTIONAL_SPECIAL",
      description: "Investida rápida com invulnerabilidade momentânea.",
    },
  },
  gabumon: {
    speciesId: "gabumon",
    displayName: "Gabumon",
    role: "Tático e Controle",
    element: "gelo",
    baseSpeed: 98,
    basic1: {
      name: "Chifre Perfurante",
      damage: 20,
      range: 52,
      cooldownMs: 420,
      animation: "player-attack-basic-1",
      attackType: "DIRECTIONAL_MELEE",
      description: "Investida perfurante com alto impacto.",
    },
    basic2: {
      name: "Blue Blaster",
      damage: 22,
      range: 220,
      cooldownMs: 700,
      animation: "player-attack-basic-2",
      projectileColor: 0x3399ff,
      statusEffect: "slow",
      attackType: "DIRECTIONAL_PROJECTILE",
      description: "Sopro congelante que reduz a velocidade inimiga.",
    },
    special: {
      name: "Garuru-Aura",
      damage: 38,
      area: 110,
      cooldownMs: 2600,
      animation: "player-attack-special",
      reflectProjectiles: true,
      shakeIntensity: 0.005,
      attackType: "RADIAL_AREA",
      description: "Aura mística que repele inimigos e anula disparos.",
    },
  },
};

export function getSpeciesCombatProfile(speciesId: string): PlayableSpeciesCombatProfile {
  return PLAYABLE_COMBAT_PROFILES[speciesId] ?? PLAYABLE_COMBAT_PROFILES.agumon;
}
