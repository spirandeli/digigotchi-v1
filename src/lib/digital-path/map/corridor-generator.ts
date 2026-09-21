import type { RunRNG } from "./rng";
import type { CorridorType, Tile } from "./types";

export interface CarveCorridorOptions {
  type?: CorridorType;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width?: number;
  rng: RunRNG;
}

export function carveCorridor(tiles: Tile[][], options: CarveCorridorOptions): void {
  const { x1, y1, x2, y2, rng } = options;
  const gridW = tiles[0]?.length || 0;
  const gridH = tiles.length || 0;
  const corridorWidth = Math.max(1, Math.min(4, options.width ?? 2));
  const half = Math.floor(corridorWidth / 2);
  const type: CorridorType = options.type || "straight";

  const setFloor = (x: number, y: number) => {
    if (x > 0 && x < gridW - 1 && y > 0 && y < gridH - 1) {
      tiles[y][x] = "floor";
    }
  };

  const setWall = (x: number, y: number) => {
    if (x > 0 && x < gridW - 1 && y > 0 && y < gridH - 1) {
      tiles[y][x] = "wall";
    }
  };

  const carveSegmentH = (fromX: number, toX: number, atY: number, cWidth: number) => {
    const minX = Math.min(fromX, toX);
    const maxX = Math.max(fromX, toX);
    const hHalf = Math.floor(cWidth / 2);
    for (let cx = minX; cx <= maxX; cx++) {
      for (let dy = -hHalf; dy <= hHalf; dy++) {
        setFloor(cx, atY + dy);
      }
    }
  };

  const carveSegmentV = (fromY: number, toY: number, atX: number, cWidth: number) => {
    const minY = Math.min(fromY, toY);
    const maxY = Math.max(fromY, toY);
    const hHalf = Math.floor(cWidth / 2);
    for (let cy = minY; cy <= maxY; cy++) {
      for (let dx = -hHalf; dx <= hHalf; dx++) {
        setFloor(atX + dx, cy);
      }
    }
  };

  switch (type) {
    case "straight":
    case "wide": {
      // Standard L-shaped or direct connection between (x1, y1) and (x2, y2)
      if (rng.chance(0.5)) {
        carveSegmentH(x1, x2, y1, corridorWidth);
        carveSegmentV(y1, y2, x2, corridorWidth);
      } else {
        carveSegmentV(y1, y2, x1, corridorWidth);
        carveSegmentH(x1, x2, y2, corridorWidth);
      }
      break;
    }

    case "L_turn": {
      // Direct L-turn via corner
      const cornerX = x2;
      const cornerY = y1;
      carveSegmentH(x1, cornerX, cornerY, corridorWidth);
      carveSegmentV(cornerY, y2, cornerX, corridorWidth);
      break;
    }

    case "Z_turn": {
      // 3-segment Z-turn with midpoint dogleg
      const midX = Math.floor((x1 + x2) / 2);
      carveSegmentH(x1, midX, y1, corridorWidth);
      carveSegmentV(y1, y2, midX, corridorWidth);
      carveSegmentH(midX, x2, y2, corridorWidth);
      break;
    }

    case "pillared": {
      // Wide corridor with architectural support columns every 4 tiles
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      carveSegmentH(x1, x2, y1, Math.max(3, corridorWidth));
      carveSegmentV(y1, y2, x2, Math.max(3, corridorWidth));
      // Place pillars if long enough
      if (Math.abs(maxX - minX) > 8) {
        for (let px = minX + 3; px < maxX - 3; px += 4) {
          if (tiles[y1 - 1]?.[px] === "floor" && tiles[y1 + 1]?.[px] === "floor") {
            setWall(px, y1 - 1);
            setWall(px, y1 + 1);
          }
        }
      }
      break;
    }

    case "chokepoint": {
      // Corridor narrows down to 1-tile wide in the middle for a tense passage
      const midX = Math.floor((x1 + x2) / 2);
      carveSegmentH(x1, midX - 1, y1, 2);
      carveSegmentH(midX - 1, midX + 1, y1, 1); // 1-tile choke
      carveSegmentH(midX + 1, x2, y1, 2);
      carveSegmentV(y1, y2, x2, 2);
      break;
    }

    case "broken": {
      // Ruined corridor with uneven edges
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      for (let cx = minX; cx <= maxX; cx++) {
        setFloor(cx, y1);
        if (rng.chance(0.7)) setFloor(cx, y1 - 1);
        if (rng.chance(0.7)) setFloor(cx, y1 + 1);
      }
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      for (let cy = minY; cy <= maxY; cy++) {
        setFloor(x2, cy);
        if (rng.chance(0.7)) setFloor(x2 - 1, cy);
        if (rng.chance(0.7)) setFloor(x2 + 1, cy);
      }
      break;
    }
  }
}
