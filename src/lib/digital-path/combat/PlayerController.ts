/**
 * PlayerController — BLOCK 1 + BLOCK 4
 *
 * Pure movement vector computation and dash state management.
 * No Phaser dependency — safe for unit tests.
 *
 * The scene is still responsible for Phaser-side work:
 *   - Moving the sprite (player.x, player.y)
 *   - Wall collision checks
 *   - Playing walk/idle animations
 *   - Spawning ghost trail VFX for the dash
 */

/** WASD + arrow key booleans — subset of Phaser key objects. */
interface KeyLike {
  isDown: boolean;
}

/** 2D movement intention, normalised for diagonals. */
export interface MovementVector {
  dx: number;
  dy: number;
}

/**
 * Returns a normalised movement direction from WASD / arrow keys.
 * Diagonal movement is scaled to maintain consistent speed.
 */
export function computeMovementVector(
  cursors:
    | {
        left?: KeyLike;
        right?: KeyLike;
        up?: KeyLike;
        down?: KeyLike;
      }
    | undefined,
  keys:
    | {
        W?: KeyLike;
        A?: KeyLike;
        S?: KeyLike;
        D?: KeyLike;
      }
    | undefined,
): MovementVector {
  let dx = 0;
  let dy = 0;

  if (cursors?.left?.isDown || keys?.A?.isDown) dx -= 1;
  if (cursors?.right?.isDown || keys?.D?.isDown) dx += 1;
  if (cursors?.up?.isDown || keys?.W?.isDown) dy -= 1;
  if (cursors?.down?.isDown || keys?.S?.isDown) dy += 1;

  // Normalise diagonal speed
  if (dx !== 0 && dy !== 0) {
    dx *= 0.7071;
    dy *= 0.7071;
  }

  return { dx, dy };
}

// ---------------------------------------------------------------------------
// Dash State (mutable bag — mutated by the helpers below)
// ---------------------------------------------------------------------------

export interface DashState {
  isActive: boolean;
  endTime: number;
  invulnerableUntil: number;
  cooldownUntil: number;
  /** Dash impulse duration in ms */
  readonly DASH_DURATION_MS: number;
  /** Speed multiplier during the impulse */
  readonly DASH_SPEED_MULTIPLIER: number;
  /** Invulnerability window in ms */
  readonly DASH_IFRAMES_MS: number;
  /** Time between dashes in ms */
  readonly DASH_COOLDOWN_MS: number;
}

export function createDashState(): DashState {
  return {
    isActive: false,
    endTime: 0,
    invulnerableUntil: 0,
    cooldownUntil: 0,
    DASH_DURATION_MS: 200,
    DASH_SPEED_MULTIPLIER: 3,
    DASH_IFRAMES_MS: 250,
    DASH_COOLDOWN_MS: 2200,
  };
}

/** True when the player is allowed to start a new dash. */
export function canDash(dash: DashState, time: number): boolean {
  return time >= dash.cooldownUntil && !dash.isActive;
}

/** Activates the dash, setting all timers. */
export function startDash(dash: DashState, time: number): void {
  dash.isActive = true;
  dash.endTime = time + dash.DASH_DURATION_MS;
  dash.invulnerableUntil = time + dash.DASH_IFRAMES_MS;
  dash.cooldownUntil = time + dash.DASH_COOLDOWN_MS;
}

/** Must be called every frame to auto-expire the active dash. */
export function updateDash(dash: DashState, time: number): void {
  if (dash.isActive && time >= dash.endTime) {
    dash.isActive = false;
  }
}
