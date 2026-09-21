import type { RunRNG } from "./rng";
import type { MapThemeConfig } from "./map-themes";
import type { Tile } from "./types";

export interface TerrainPatchResult {
  floorNormalKeys: string[];
  floorVariationIndices: Uint8Array;
  floorDecorIndices: Uint8Array;
  tileSpriteKeys: string[][];
}

export function generateTerrainPatches(
  tiles: readonly Tile[][],
  width: number,
  height: number,
  theme: MapThemeConfig,
  rng: RunRNG,
  biomeVariantBias: number = 0.12
): TerrainPatchResult {
  const totalCells = width * height;
  const floorVariationIndices = new Uint8Array(totalCells);
  const floorDecorIndices = new Uint8Array(totalCells);
  const tileSpriteKeys: string[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => "")
  );

  const floorCells: Array<{ x: number; y: number; idx: number; isNearWall: boolean }> = [];
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ] as const;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (tiles[y][x] === "floor") {
        const idx = y * width + x;
        const isNearWall = dirs.some(([dx, dy]) => {
          const nx = x + dx;
          const ny = y + dy;
          return nx < 0 || nx >= width || ny < 0 || ny >= height || tiles[ny][nx] === "wall";
        });
        floorCells.push({ x, y, idx, isNearWall });
      }
    }
  }

  if (floorCells.length === 0) {
    return {
      floorNormalKeys: theme.tiles.floorNormal.map((_, i) => `theme_${theme.id}_floor_${i}`),
      floorVariationIndices,
      floorDecorIndices,
      tileSpriteKeys,
    };
  }

  // 1. Rare Decorative Accents (2% - 3% strictly near walls/borders)
  const nearWallCells = floorCells.filter((c) => c.isNearWall);
  const decorTargetCount = Math.min(4, Math.max(1, Math.floor(floorCells.length * 0.025)));
  const shuffledNearWall = [...nearWallCells].sort(() => rng.next() - 0.5);

  for (let i = 0; i < Math.min(decorTargetCount, shuffledNearWall.length); i++) {
    floorDecorIndices[shuffledNearWall[i].idx] = 1;
  }

  // 2. Coherent Variation Patches (10% - 15% in continuous contiguous 2-4 tile clusters)
  const availableForVariation = floorCells.filter((c) => !floorDecorIndices[c.idx]);
  const numClusters = Math.max(1, Math.floor(availableForVariation.length / 35));
  const clusterSeeds = [...availableForVariation].sort(() => rng.next() - 0.5).slice(0, numClusters);

  for (const seed of clusterSeeds) {
    floorVariationIndices[seed.idx] = 1;
    // Grow patch to 2-3 adjacent floor cells to guarantee spatial continuity (NO confetti!)
    let grown = 0;
    for (const [dx, dy] of dirs) {
      if (grown >= 3) break;
      const nx = seed.x + dx;
      const ny = seed.y + dy;
      if (nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1 && tiles[ny][nx] === "floor") {
        const nIdx = ny * width + nx;
        if (!floorDecorIndices[nIdx] && rng.chance(0.7)) {
          floorVariationIndices[nIdx] = 1;
          grown++;
        }
      }
    }
  }

  // 3. Resolve Sprite Keys with Deterministic Repetition Cooldown
  const normalCount = Math.max(1, theme.tiles.floorNormal.length);
  const varCount = Math.max(1, theme.tiles.floorVariation.length);
  const decorCount = Math.max(1, theme.tiles.floorDecor.length);

  for (const cell of floorCells) {
    const { x, y, idx } = cell;
    if (floorDecorIndices[idx]) {
      const dIdx = Math.floor(rng.next() * decorCount) % decorCount;
      tileSpriteKeys[y][x] = `theme_${theme.id}_floor_decor_${dIdx}`;
    } else if (floorVariationIndices[idx]) {
      const vIdx = Math.floor(rng.next() * varCount) % varCount;
      tileSpriteKeys[y][x] = `theme_${theme.id}_floor_var_${vIdx}`;
    } else {
      // Dominant base floor
      const nIdx = Math.floor(rng.next() * normalCount) % normalCount;
      tileSpriteKeys[y][x] = `theme_${theme.id}_floor_${nIdx}`;
    }
  }

  return {
    floorNormalKeys: theme.tiles.floorNormal.map((_, i) => `theme_${theme.id}_floor_${i}`),
    floorVariationIndices,
    floorDecorIndices,
    tileSpriteKeys,
  };
}
