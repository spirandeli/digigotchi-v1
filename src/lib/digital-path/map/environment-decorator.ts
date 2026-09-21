import type { RunRNG } from "./rng";
import type { ClusterType, EnvironmentCluster, RoomSizeCategory, Tile } from "./types";

export interface DecoratorOptions {
  id: string;
  width: number;
  height: number;
  tiles: readonly Tile[][];
  spawn: { x: number; y: number };
  exit: { x: number; y: number };
  sizeCategory: RoomSizeCategory;
  themeId: "lighting" | "fire" | "ice" | "tech";
  rng: RunRNG;
  hasLandmark?: boolean;
}

export const ENVIRONMENT_BUDGET: Record<RoomSizeCategory, number> = {
  micro: 4,
  small: 8,
  medium: 15,
  large: 25,
  arena: 35,
  huge: 35,
};

export function generateEnvironmentClusters(options: DecoratorOptions): {
  clusters: EnvironmentCluster[];
  budgetUsed: number;
} {
  const { id, width, height, tiles, spawn, exit, sizeCategory, themeId, rng, hasLandmark } = options;
  const budgetMax = ENVIRONMENT_BUDGET[sizeCategory] || 15;
  let budgetUsed = hasLandmark ? 7 : 0;
  const clusters: EnvironmentCluster[] = [];

  // 1. Trace Combat Navigation Mask (safe clearance around spawn, exit, and main route)
  const navMask = new Set<string>();
  const addMaskZone = (cx: number, cy: number, radius: number) => {
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        navMask.add(`${cx + dx},${cy + dy}`);
      }
    }
  };

  addMaskZone(spawn.x, spawn.y, 3);
  addMaskZone(exit.x, exit.y, 3);

  // Approximate straight corridor connecting spawn and exit
  const minX = Math.min(spawn.x, exit.x);
  const maxX = Math.max(spawn.x, exit.x);
  const midY = Math.floor((spawn.y + exit.y) / 2);
  for (let cx = minX; cx <= maxX; cx++) {
    navMask.add(`${cx},${midY}`);
    navMask.add(`${cx},${midY - 1}`);
    navMask.add(`${cx},${midY + 1}`);
  }

  // 2. Collect eligible floor tiles
  const eligibleTiles: Array<{ x: number; y: number; isNearWall: boolean }> = [];
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ] as const;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (tiles[y][x] === "floor" && !navMask.has(`${x},${y}`)) {
        const isNearWall = dirs.some(([dx, dy]) => tiles[y + dy]?.[x + dx] === "wall");
        eligibleTiles.push({ x, y, isNearWall });
      }
    }
  }

  if (eligibleTiles.length === 0) {
    return { clusters, budgetUsed };
  }

  // 3. Define allowed clusters per theme
  const themeClusterPool: Record<string, ClusterType[]> = {
    fire: ["rubble", "hazard", "structure"],
    ice: ["crystal", "hazard", "structure"],
    lighting: ["energy", "hazard", "structure", "rubble"],
    tech: ["tech", "energy", "structure"],
  };
  const allowedTypes = themeClusterPool[themeId] || ["rubble", "structure"];

  // Max number of clusters based on remaining budget
  const maxClusters = Math.min(4, Math.max(1, Math.floor((budgetMax - budgetUsed) / 3)));
  const shuffledEligible = [...eligibleTiles].sort(() => rng.next() - 0.5);

  const usedClusterCenters = new Set<string>();

  for (let i = 0; i < maxClusters && shuffledEligible.length > 0; i++) {
    if (budgetUsed + 3 > budgetMax) break;

    // Pick an anchor that is at least 3 tiles away from other cluster centers
    const anchor = shuffledEligible.find(
      (cand) =>
        !Array.from(usedClusterCenters).some((usedKey) => {
          const [ux, uy] = usedKey.split(",").map(Number);
          return Math.hypot(cand.x - ux, cand.y - uy) < 3.5;
        })
    );

    if (!anchor) break;
    usedClusterCenters.add(`${anchor.x},${anchor.y}`);

    const cType = rng.pick(allowedTypes);
    const clusterTiles: Array<{ x: number; y: number; role?: string }> = [
      { x: anchor.x, y: anchor.y, role: "anchor" },
    ];

    // Add 1 to 2 satellite tiles contiguous to the anchor
    for (const [dx, dy] of dirs) {
      if (clusterTiles.length >= 3) break;
      const nx = anchor.x + dx;
      const ny = anchor.y + dy;
      if (
        nx > 0 &&
        nx < width - 1 &&
        ny > 0 &&
        ny < height - 1 &&
        tiles[ny][nx] === "floor" &&
        !navMask.has(`${nx},${ny}`) &&
        rng.chance(0.65)
      ) {
        clusterTiles.push({ x: nx, y: ny, role: "satellite" });
      }
    }

    clusters.push({
      id: `${id}_cluster_${i + 1}`,
      type: cType,
      zone: cType === "hazard" ? "hazard_zone" : anchor.isNearWall ? "landmark_zone" : "combat_zone",
      centerX: anchor.x,
      centerY: anchor.y,
      tiles: clusterTiles,
    });

    budgetUsed += 3;
  }

  return { clusters, budgetUsed };
}
