/**
 * WaveTimeline — BLOCK 9
 *
 * Defines the temporal progression of enemy hordes for Survivors-like combat rooms.
 * Each room has a dynamic timeline of mini-waves that spawn as time progresses.
 *
 * Pure data — safe for unit tests and zero Phaser dependency.
 */

export interface WaveSpawnItem {
  templateKey: string;
  count: number;
  kind?: "normal" | "elite" | "miniboss";
  staggerMs?: number; // Delay between spawning individual enemies in this pack
}

export interface WaveDefinition {
  timestampMs: number;
  name: string;
  items: WaveSpawnItem[];
}

export interface RoomWaveTimeline {
  maxSimultaneousAlive: number;
  waves: WaveDefinition[];
}

/** Standard combat room wave timeline: exactly 3 waves per room (fase) */
export function getCombatRoomTimeline(roomNumber: number, biome: string): RoomWaveTimeline {
  const countScale = 1 + Math.min(0.8, roomNumber * 0.03);

  return {
    maxSimultaneousAlive: 14, // Cap to 14 simultaneous enemies to guarantee 60 FPS and prevent lag
    waves: [
      {
        timestampMs: 0,
        name: "Horda 1: Batedores",
        items: [
          { templateKey: "goburimon", count: Math.max(3, Math.round(3 * countScale)), kind: "normal" },
          { templateKey: "chibimon_swarm", count: Math.max(3, Math.round(3 * countScale)), kind: "normal" },
        ],
      },
      {
        timestampMs: 10000,
        name: "Horda 2: Vanguarda",
        items: [
          { templateKey: "guardromon_tank", count: Math.max(1, Math.round(2 * countScale)), kind: "normal" },
          { templateKey: "gazimon_ranged", count: Math.max(2, Math.round(2 * countScale)), kind: "normal" },
          { templateKey: "goburimon", count: Math.max(2, Math.round(2 * countScale)), kind: "normal" },
        ],
      },
      {
        timestampMs: 22000,
        name: "Horda 3: Clímax & Elite",
        items: [
          { templateKey: roomNumber % 2 === 0 ? "garurumon_wild" : "agumon_wild", count: 1, kind: "elite" },
          { templateKey: "chibimon_swarm", count: Math.max(3, Math.round(4 * countScale)), kind: "normal" },
          { templateKey: "gazimon_ranged", count: Math.max(1, Math.round(2 * countScale)), kind: "normal" },
        ],
      },
    ],
  };
}

/** Boss/Miniboss room adds timeline (periodic small support waves) */
export function getBossRoomAddsTimeline(roomNumber: number): RoomWaveTimeline {
  return {
    maxSimultaneousAlive: 12, // Strict limit during boss so player can focus on boss patterns
    waves: [
      {
        timestampMs: 15000,
        name: "Reforços do Chefe 1",
        items: [{ templateKey: "chibimon_swarm", count: 4, kind: "normal" }],
      },
      {
        timestampMs: 35000,
        name: "Reforços do Chefe 2",
        items: [
          { templateKey: "goburimon", count: 3, kind: "normal" },
          { templateKey: "gazimon_ranged", count: 2, kind: "normal" },
        ],
      },
      {
        timestampMs: 55000,
        name: "Reforços do Chefe 3",
        items: [
          { templateKey: "guardromon_tank", count: 2, kind: "normal" },
          { templateKey: "chibimon_swarm", count: 5, kind: "normal" },
        ],
      },
    ],
  };
}
