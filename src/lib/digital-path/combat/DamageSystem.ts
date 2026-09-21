/**
 * DamageSystem — Pure damage calculation logic.
 * No Phaser dependency — safe for unit tests.
 * Side-effects (VFX, sound, HP update) are the caller's responsibility.
 */
import type { DamageResult } from "./types";

/**
 * Computes final damage applied to an enemy.
 * @param baseDamage Raw attack power before multipliers
 * @param critChance Probability of a critical hit (0–1)
 * @param attackMultiplier Combined damage multiplier from upgrades/passives
 * @param enemyDefense Flat damage reduction from the enemy
 */
export function calculateDamage(
  baseDamage: number,
  critChance: number,
  attackMultiplier: number,
  enemyDefense: number,
): DamageResult {
  const isCrit = Math.random() < critChance;
  const rawDamage = Math.round(baseDamage * attackMultiplier * (isCrit ? 2 : 1));
  const finalDamage = Math.max(1, rawDamage - enemyDefense);
  return { finalDamage, isCrit };
}
