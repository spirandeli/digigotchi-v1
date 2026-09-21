/**
 * EliteModifiers — BLOCK 10
 *
 * Defines procedural modifiers applied to Elite enemies in horde waves.
 * Pure data and logic — safe for unit tests and zero Phaser dependency.
 */

export type EliteModifierType = "FAST" | "SHIELDED" | "EXPLOSIVE" | "REGENERATING";

export interface EliteModifierDef {
  type: EliteModifierType;
  name: string;
  description: string;
  speedMultiplier: number;
  bonusDefense: number;
  hpMultiplier: number;
  tintColor: number;
}

export const ELITE_MODIFIERS: Record<EliteModifierType, EliteModifierDef> = {
  FAST: {
    type: "FAST",
    name: "Ultra-Veloz",
    description: "+35% de velocidade de perseguição",
    speedMultiplier: 1.35,
    bonusDefense: 0,
    hpMultiplier: 1.0,
    tintColor: 0xffff44,
  },
  SHIELDED: {
    type: "SHIELDED",
    name: "Blindado de Dados",
    description: "+8 de defesa e barreira contra impactos",
    speedMultiplier: 0.9,
    bonusDefense: 8,
    hpMultiplier: 1.2,
    tintColor: 0x44ffff,
  },
  EXPLOSIVE: {
    type: "EXPLOSIVE",
    name: "Núcleo Instável",
    description: "Detona em estilhaços ao ser destruído",
    speedMultiplier: 1.0,
    bonusDefense: 0,
    hpMultiplier: 1.0,
    tintColor: 0xff4400,
  },
  REGENERATING: {
    type: "REGENERATING",
    name: "Auto-Reparo",
    description: "Regenera 4% de HP por segundo",
    speedMultiplier: 0.95,
    bonusDefense: 2,
    hpMultiplier: 1.3,
    tintColor: 0x44ff44,
  },
};

const MODIFIER_KEYS: EliteModifierType[] = ["FAST", "SHIELDED", "EXPLOSIVE", "REGENERATING"];

/** Pick a deterministic or random elite modifier */
export function rollEliteModifier(seed: number): EliteModifierDef {
  const idx = Math.abs(seed) % MODIFIER_KEYS.length;
  return ELITE_MODIFIERS[MODIFIER_KEYS[idx]];
}
