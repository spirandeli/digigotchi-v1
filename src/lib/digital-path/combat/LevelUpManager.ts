/**
 * LevelUpManager — BLOCK 6
 *
 * Tracks in-run level and XP independently from the Tamagotchi pet XP.
 * No Phaser dependency — safe for unit tests.
 *
 * Flow:
 *   1. XP orbs collected → call addXp(amount)
 *   2. If addXp returns true → scene pauses + shows upgrade draft
 *   3. Player picks an upgrade card → run resumes
 */

export class LevelUpManager {
  runLevel = 1;
  runXp = 0;
  /** Map of passive id to level */
  equippedPassives: Map<string, number> = new Map();

  /** XP required to reach the next level (grows with each level). */
  get xpToNextLevel(): number {
    return Math.floor(25 * Math.pow(this.runLevel, 1.45));
  }

  /**
   * Adds XP to the run pool.
   * @returns true if a level-up was triggered (call togglePause + show draft)
   */
  addXp(amount: number): boolean {
    this.runXp += amount;
    if (this.runXp >= this.xpToNextLevel) {
      this.runXp = Math.max(0, this.runXp - this.xpToNextLevel);
      this.runLevel++;
      return true;
    }
    return false;
  }

  /** Record a passive upgrade or acquisition */
  recordPassive(passiveId: string): void {
    const lvl = this.equippedPassives.get(passiveId) ?? 0;
    this.equippedPassives.set(passiveId, lvl + 1);
  }

  /** Current count of equipped passives (max 4 per build limit) */
  get passiveCount(): number {
    return this.equippedPassives.size;
  }

  /** Call when starting a new run. */
  reset(): void {
    this.runLevel = 1;
    this.runXp = 0;
    this.equippedPassives.clear();
  }

  /** 0-1 progress toward the next level (for HUD bar). */
  get xpProgress(): number {
    return Math.min(1, this.runXp / this.xpToNextLevel);
  }
}
