/**
 * Combat V2 — Shared Pure Types
 * No Phaser dependency. Safe to use in Node tests.
 */

export type AttackSlot = "basic_1" | "basic_2" | "special";

export interface DamageResult {
  finalDamage: number;
  isCrit: boolean;
}
