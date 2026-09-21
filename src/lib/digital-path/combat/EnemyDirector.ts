/**
 * EnemyDirector — BLOCK 9
 *
 * Drives dynamic horde wave spawning within rooms based on elapsed room time.
 * Decoupled from Phaser — returns pure spawn orders for the scene to materialize.
 */

import {
  type RoomWaveTimeline,
  type WaveSpawnItem,
  getCombatRoomTimeline,
  getBossRoomAddsTimeline,
} from "./WaveTimeline";
import type { RoomKind } from "../map/types";

export interface SpawnOrder {
  id: string;
  templateKey: string;
  kind: "normal" | "elite" | "miniboss";
}

export class EnemyDirector {
  private timeline: RoomWaveTimeline | null = null;
  private elapsedRoomTimeMs = 0;
  private spawnedWaveIndices = new Set<number>();
  private pendingSpawns: { item: WaveSpawnItem; remainingToSpawn: number; nextSpawnTime: number }[] = [];
  private nextEnemySeq = 1;
  private isCombatRoom = false;

  /**
   * Initializes the director for a newly entered room.
   * Cleans up all timers and schedules waves if this is a combat/boss room.
   */
  initRoom(roomNumber: number, biome: string, roomType: RoomKind | string): void {
    this.elapsedRoomTimeMs = 0;
    this.spawnedWaveIndices.clear();
    this.pendingSpawns = [];
    this.nextEnemySeq = 1;

    if (roomType === "combat") {
      this.isCombatRoom = true;
      this.timeline = getCombatRoomTimeline(roomNumber, biome);
    } else if (roomType === "boss" || roomType === "miniboss") {
      this.isCombatRoom = true;
      this.timeline = getBossRoomAddsTimeline(roomNumber);
    } else {
      this.isCombatRoom = false;
      this.timeline = null;
    }
  }

  /**
   * Called every frame in scene update.
   * Returns a list of enemies that should be spawned right now.
   *
   * @param delta Frame time in ms
   * @param currentAliveCount How many enemies are currently alive in the scene
   */
  update(delta: number, currentAliveCount: number): SpawnOrder[] {
    if (!this.timeline || !this.isCombatRoom) return [];

    this.elapsedRoomTimeMs += delta;
    const orders: SpawnOrder[] = [];
    const maxAlive = this.timeline.maxSimultaneousAlive;

    // Fast-track: if all current enemies and pending spawns are dead, trigger next wave immediately
    if (currentAliveCount === 0 && this.pendingSpawns.length === 0 && this.spawnedWaveIndices.size < this.timeline.waves.length) {
      for (let i = 0; i < this.timeline.waves.length; i++) {
        if (!this.spawnedWaveIndices.has(i)) {
          this.elapsedRoomTimeMs = Math.max(this.elapsedRoomTimeMs, this.timeline.waves[i].timestampMs);
          break;
        }
      }
    }

    // 1. Check if any new waves have reached their timestamp
    for (let i = 0; i < this.timeline.waves.length; i++) {
      if (this.spawnedWaveIndices.has(i)) continue;

      const wave = this.timeline.waves[i];
      if (this.elapsedRoomTimeMs >= wave.timestampMs) {
        this.spawnedWaveIndices.add(i);
        // Queue all items in this wave
        for (const item of wave.items) {
          this.pendingSpawns.push({
            item,
            remainingToSpawn: item.count,
            nextSpawnTime: 0,
          });
        }
      }
    }

    // 2. Process pending spawns respecting maxAlive cap
    let effectiveAlive = currentAliveCount;

    for (let i = this.pendingSpawns.length - 1; i >= 0; i--) {
      const pending = this.pendingSpawns[i];
      const stagger = pending.item.staggerMs ?? 80;

      while (
        pending.remainingToSpawn > 0 &&
        effectiveAlive < maxAlive &&
        this.elapsedRoomTimeMs >= pending.nextSpawnTime
      ) {
        orders.push({
          id: `wave_e_${this.nextEnemySeq++}`,
          templateKey: pending.item.templateKey,
          kind: pending.item.kind ?? "normal",
        });

        pending.remainingToSpawn--;
        effectiveAlive++;
        pending.nextSpawnTime = this.elapsedRoomTimeMs + stagger;

        // If staggered, break to next frame/item
        if (stagger > 0) break;
      }

      if (pending.remainingToSpawn <= 0) {
        this.pendingSpawns.splice(i, 1);
      }
    }

    return orders;
  }

  /** True if all waves in the timeline have been triggered and fully spawned */
  isAllWavesSpawned(): boolean {
    if (!this.timeline) return true;
    return (
      this.spawnedWaveIndices.size >= this.timeline.waves.length &&
      this.pendingSpawns.length === 0
    );
  }

  /**
   * For standard combat rooms: returns true when all waves are spawned
   * AND zero enemies remain alive (clearing the room).
   */
  isRoomCompleted(currentAliveCount: number): boolean {
    if (!this.isCombatRoom) return true;
    return this.isAllWavesSpawned() && currentAliveCount === 0;
  }

  /** Get elapsed time in room (seconds) */
  get elapsedSeconds(): number {
    return Math.floor(this.elapsedRoomTimeMs / 1000);
  }
}
