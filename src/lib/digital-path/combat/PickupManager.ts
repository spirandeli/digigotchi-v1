/**
 * PickupManager — BLOCK 5
 *
 * Pure-data XP orb physics. No Phaser dependency.
 * The scene is responsible for:
 *   - Creating/destroying Phaser Graphics for each orb (keyed by OrbId)
 *   - Syncing graphic position to XpOrbState.x / .y each frame
 */

export type OrbId = number;

export interface XpOrbState {
  id: OrbId;
  x: number;
  y: number;
  xpValue: number;
  /** "idle" = on ground, "attracted" = flying to player */
  state: "idle" | "attracted";
}

const ATTRACT_SPEED_PX_PER_S = 420;
const COLLECT_RADIUS = 16;

export class PickupManager {
  private orbs: XpOrbState[] = [];
  private nextId = 0;

  /** Call when entering a new room. */
  reset(): void {
    this.orbs = [];
  }

  /** Spawns a new XP orb at the given position. Returns the orb state. */
  spawn(x: number, y: number, xpValue: number): XpOrbState {
    const orb: XpOrbState = {
      id: this.nextId++,
      x,
      y,
      xpValue,
      state: "idle",
    };
    this.orbs.push(orb);
    return orb;
  }

  /**
   * Called every frame. Returns collected orbs (and removes them internally).
   * @param playerX  Player world X
   * @param playerY  Player world Y
   * @param magnetRadius  Distance at which orbs start flying to the player
   * @param delta  Frame delta in milliseconds
   */
  update(
    playerX: number,
    playerY: number,
    magnetRadius: number,
    delta: number,
  ): XpOrbState[] {
    const collected: XpOrbState[] = [];
    const speed = (ATTRACT_SPEED_PX_PER_S * delta) / 1000;

    for (const orb of this.orbs) {
      const dx = playerX - orb.x;
      const dy = playerY - orb.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Collect
      if (dist <= COLLECT_RADIUS) {
        collected.push(orb);
        continue;
      }

      // Attract
      if (dist <= magnetRadius) {
        orb.state = "attracted";
        const s = Math.min(speed, dist); // never overshoot
        orb.x += (dx / dist) * s;
        orb.y += (dy / dist) * s;
      }
    }

    // Remove collected orbs
    const collectedIds = new Set(collected.map((o) => o.id));
    this.orbs = this.orbs.filter((o) => !collectedIds.has(o.id));

    return collected;
  }

  getActiveOrbs(): readonly XpOrbState[] {
    return this.orbs;
  }
}
