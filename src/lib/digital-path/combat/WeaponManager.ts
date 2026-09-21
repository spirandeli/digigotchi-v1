/**
 * WeaponManager — BLOCK 1 + BLOCK 2
 *
 * Manages weapon cooldowns and drives automatic firing (Survivors-like).
 * The scene remains responsible for the Phaser-side execution (spawning
 * sprites, playing animations, etc.); this class only decides *when* to fire.
 *
 * No Phaser dependency — safe for unit tests.
 */

import type { PlayableSpeciesCombatProfile } from "./loadout";
import type { PlayerStatsModifiers } from "./upgrades";
import type { AttackSlot } from "./types";

export type { AttackSlot };

export interface WeaponFireCallbacks {
  fireBasic1: (time: number) => void;
  fireBasic2: (time: number) => void;
  fireSpecial: (time: number) => void;
  onCooldownChange?: (slot: AttackSlot, remainingMs: number, maxMs: number) => void;
}

export class WeaponManager {
  /** Timestamp (scene time) after which the slot may fire again. */
  private nextFireTime: Record<AttackSlot, number> = {
    basic_1: 0,
    basic_2: 0,
    special: 0,
  };

  /** Last configured cooldown duration per slot (for HUD display). */
  private cooldownDuration: Record<AttackSlot, number> = {
    basic_1: 0,
    basic_2: 0,
    special: 0,
  };

  /** Call once when entering a new room so cooldowns reset cleanly. */
  reset(): void {
    this.nextFireTime = { basic_1: 0, basic_2: 0, special: 0 };
    this.cooldownDuration = { basic_1: 0, basic_2: 0, special: 0 };
  }

  /**
   * Called every frame from the scene's update().
   * Fires each weapon slot automatically when its cooldown expires,
   * but only when there are living targets in the room.
   */
  update(
    time: number,
    profile: PlayableSpeciesCombatProfile,
    modifiers: PlayerStatsModifiers,
    hasTargets: boolean,
    callbacks: WeaponFireCallbacks,
  ): void {
    if (!hasTargets) return;

    const cdMult = modifiers.cooldownMultiplier ?? 1.0;
    const slots: AttackSlot[] = ["basic_1", "basic_2", "special"];

    for (const slot of slots) {
      if (time >= this.nextFireTime[slot]) {
        const config =
          slot === "basic_1"
            ? profile.basic1
            : slot === "basic_2"
              ? profile.basic2
              : profile.special;

        const cooldown = Math.round(config.cooldownMs * cdMult);
        this.nextFireTime[slot] = time + cooldown;
        this.cooldownDuration[slot] = cooldown;

        // Notify HUD of the new cooldown cycle
        callbacks.onCooldownChange?.(slot, cooldown, cooldown);

        // Dispatch the attack to the scene
        if (slot === "basic_1") callbacks.fireBasic1(time);
        else if (slot === "basic_2") callbacks.fireBasic2(time);
        else callbacks.fireSpecial(time);
      }
    }
  }

  /** Returns remaining cooldown for HUD rendering. */
  getCooldownInfo(
    slot: AttackSlot,
    time: number,
  ): { remainingMs: number; totalMs: number } {
    const remaining = Math.max(0, this.nextFireTime[slot] - time);
    const total = this.cooldownDuration[slot];
    return { remainingMs: remaining, totalMs: total };
  }
}
