/**
 * SpatialHashGrid — BLOCK 12
 *
 * 2D spatial hash grid for high-performance collision queries.
 * Eliminates quadratic O(N*M) projectile/AOE loops by checking only nearby cells in O(1).
 *
 * Pure data and algorithms — safe for unit tests and zero Phaser dependency.
 */

export interface SpatialEntity {
  id: string;
  x: number;
  y: number;
  radius?: number;
}

export class SpatialHashGrid<T extends SpatialEntity> {
  private cellSize: number;
  private grid: Map<string, T[]> = new Map();

  constructor(cellSize = 64) {
    this.cellSize = cellSize;
  }

  clear(): void {
    this.grid.clear();
  }

  private hashKey(cellX: number, cellY: number): string {
    return `${cellX}:${cellY}`;
  }

  insert(entity: T): void {
    const cx = Math.floor(entity.x / this.cellSize);
    const cy = Math.floor(entity.y / this.cellSize);
    const key = this.hashKey(cx, cy);

    let list = this.grid.get(key);
    if (!list) {
      list = [];
      this.grid.set(key, list);
    }
    list.push(entity);
  }

  insertAll(entities: readonly T[]): void {
    for (const e of entities) {
      this.insert(e);
    }
  }

  /**
   * Query all entities within a circular radius around (x, y).
   * Fast bounding box to cell range, then radial distance check.
   */
  queryNearby(x: number, y: number, radius: number): T[] {
    const minCx = Math.floor((x - radius) / this.cellSize);
    const maxCx = Math.floor((x + radius) / this.cellSize);
    const minCy = Math.floor((y - radius) / this.cellSize);
    const maxCy = Math.floor((y + radius) / this.cellSize);

    const radiusSq = radius * radius;
    const results: T[] = [];
    const seen = new Set<string>();

    for (let cx = minCx; cx <= maxCx; cx++) {
      for (let cy = minCy; cy <= maxCy; cy++) {
        const key = this.hashKey(cx, cy);
        const cellEntities = this.grid.get(key);
        if (!cellEntities) continue;

        for (const entity of cellEntities) {
          if (seen.has(entity.id)) continue;
          seen.add(entity.id);

          const dx = entity.x - x;
          const dy = entity.y - y;
          const distSq = dx * dx + dy * dy;
          const totalR = radius + (entity.radius ?? 0);

          if (distSq <= totalR * totalR) {
            results.push(entity);
          }
        }
      }
    }

    return results;
  }
}
