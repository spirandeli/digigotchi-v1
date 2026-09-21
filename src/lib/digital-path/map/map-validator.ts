import type { GenerationMetrics, MacroDungeonArchetype, PropSpawn, Tile } from "./types";

export interface ValidationCheckResult {
  valid: boolean;
  reason?: string;
  reachableTiles: Array<{ x: number; y: number }>;
  metrics?: Partial<GenerationMetrics>;
}

export function isPathConnected(
  tiles: readonly Tile[][],
  start: { x: number; y: number },
  end: { x: number; y: number },
  actualWidth: number,
  actualHeight: number
): boolean {
  if (!tiles || !start || !end) return false;
  if (tiles[start.y]?.[start.x] !== "floor" || tiles[end.y]?.[end.x] !== "floor") {
    return false;
  }

  const queue: Array<[number, number]> = [[start.x, start.y]];
  const visited = new Set<string>([`${start.x},${start.y}`]);
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  while (queue.length > 0) {
    const [cx, cy] = queue.shift()!;
    if (cx === end.x && cy === end.y) return true;

    for (const [dx, dy] of dirs) {
      const nx = cx + dx;
      const ny = cy + dy;
      const key = `${nx},${ny}`;

      if (
        nx >= 0 &&
        nx < actualWidth &&
        ny >= 0 &&
        ny < actualHeight &&
        !visited.has(key) &&
        tiles[ny]?.[nx] === "floor"
      ) {
        visited.add(key);
        queue.push([nx, ny]);
      }
    }
  }

  return false;
}

export function findReachableFloorTiles(
  tiles: readonly Tile[][],
  start: { x: number; y: number },
  width: number,
  height: number
): Array<{ x: number; y: number }> {
  const reachable: Array<{ x: number; y: number }> = [];
  if (start.y < 0 || start.y >= height || start.x < 0 || start.x >= width) return reachable;
  if (tiles[start.y]?.[start.x] !== "floor") return reachable;

  const queue: Array<[number, number]> = [[start.x, start.y]];
  const visited = new Set<string>([`${start.x},${start.y}`]);
  reachable.push({ x: start.x, y: start.y });

  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  while (queue.length > 0) {
    const [cx, cy] = queue.shift()!;
    for (const [dx, dy] of dirs) {
      const nx = cx + dx;
      const ny = cy + dy;
      const key = `${nx},${ny}`;
      if (
        nx >= 0 &&
        nx < width &&
        ny >= 0 &&
        ny < height &&
        !visited.has(key) &&
        tiles[ny]?.[nx] === "floor"
      ) {
        visited.add(key);
        reachable.push({ x: nx, y: ny });
        queue.push([nx, ny]);
      }
    }
  }

  return reachable;
}

export function pruneIsolatedFloorIslands(
  tiles: Tile[][],
  spawn: { x: number; y: number },
  width: number,
  height: number
): void {
  const reachable = new Set<string>(
    findReachableFloorTiles(tiles, spawn, width, height).map((t) => `${t.x},${t.y}`)
  );

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (tiles[y][x] === "floor" && !reachable.has(`${x},${y}`)) {
        // Unreachable isolated island: turn to wall
        tiles[y][x] = "wall";
      }
    }
  }
}

export function validateMapStructure(
  tiles: readonly Tile[][],
  spawn: { x: number; y: number },
  exit: { x: number; y: number },
  props: readonly PropSpawn[],
  width: number,
  height: number,
  macroArchetype: MacroDungeonArchetype = "branching_dungeon",
  seed: number = 0,
  floor: number = 1
): ValidationCheckResult {
  if (tiles[spawn.y]?.[spawn.x] !== "floor") {
    return { valid: false, reason: "Player spawn is inside wall", reachableTiles: [] };
  }
  if (tiles[exit.y]?.[exit.x] !== "floor") {
    return { valid: false, reason: "Exit door is inside wall", reachableTiles: [] };
  }

  const reachableTiles = findReachableFloorTiles(tiles, spawn, width, height);
  const reachableSet = new Set(reachableTiles.map((t) => `${t.x},${t.y}`));

  if (!reachableSet.has(`${exit.x},${exit.y}`)) {
    return { valid: false, reason: "Exit is not reachable from spawn via BFS", reachableTiles };
  }

  if (reachableTiles.length < 25) {
    return {
      valid: false,
      reason: `Reachable floor tile count (${reachableTiles.length}) is below required minimum 25`,
      reachableTiles,
    };
  }

  // Verify that all props (chests, terminals) are reachable
  for (const prop of props) {
    if (!reachableSet.has(`${prop.tileX},${prop.tileY}`)) {
      return {
        valid: false,
        reason: `Prop ${prop.id} (${prop.type}) is unreachable at ${prop.tileX},${prop.tileY}`,
        reachableTiles,
      };
    }
  }

  let totalFloor = 0;
  let totalWall = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (tiles[y][x] === "floor") totalFloor++;
      else totalWall++;
    }
  }

  const totalTiles = width * height;
  const emptySpaceRatio = Number((totalFloor / totalTiles).toFixed(2));

  const metrics: Partial<GenerationMetrics> = {
    seed,
    floor,
    macroArchetype,
    totalFloorTiles: totalFloor,
    totalWallTiles: totalWall,
    emptySpaceRatio,
    bfsReachableCount: reachableTiles.length,
    connectivityValid: true,
  };

  return {
    valid: true,
    reachableTiles,
    metrics,
  };
}
