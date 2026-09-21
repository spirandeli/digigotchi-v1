import type { RunRNG } from "./rng";
import type { RoomShape, Tile } from "./types";

export interface CarveRoomOptions {
  shape: RoomShape;
  x: number;
  y: number;
  width: number;
  height: number;
  rng: RunRNG;
  addSubstructures?: boolean;
}

export function carveRoomShape(tiles: Tile[][], options: CarveRoomOptions): void {
  const { shape, x, y, width, height, rng, addSubstructures = true } = options;
  const gridW = tiles[0]?.length || 0;
  const gridH = tiles.length || 0;

  const clampX = (gx: number) => Math.max(1, Math.min(gridW - 2, gx));
  const clampY = (gy: number) => Math.max(1, Math.min(gridH - 2, gy));

  const setFloor = (gx: number, gy: number) => {
    if (gy > 0 && gy < gridH - 1 && gx > 0 && gx < gridW - 1) {
      tiles[gy][gx] = "floor";
    }
  };

  const setWall = (gx: number, gy: number) => {
    if (gy >= 0 && gy < gridH && gx >= 0 && gx < gridW) {
      tiles[gy][gx] = "wall";
    }
  };

  const fillFloorRect = (rx: number, ry: number, rw: number, rh: number) => {
    for (let r = ry; r < ry + rh; r++) {
      for (let c = rx; c < rx + rw; c++) {
        setFloor(c, r);
      }
    }
  };

  // Base bounding floor for rectangular & variants
  switch (shape) {
    case "arena":
    case "rectangle":
      fillFloorRect(x + 1, y + 1, width - 2, height - 2);
      break;

    case "compact": {
      const padX = Math.max(1, Math.floor(width * 0.1));
      const padY = Math.max(1, Math.floor(height * 0.15));
      fillFloorRect(x + padX, y + padY, width - padX * 2, height - padY * 2);
      break;
    }

    case "corridor":
    case "hall": {
      const cy = y + Math.floor(height / 2);
      fillFloorRect(x + 1, cy - 2, width - 2, 5);
      // Add 2 side alcoves
      const alX1 = x + Math.floor(width * 0.3);
      const alX2 = x + Math.floor(width * 0.7);
      for (let r = y + 1; r < y + height - 1; r++) {
        for (let dx = -1; dx <= 1; dx++) {
          setFloor(alX1 + dx, r);
          setFloor(alX2 + dx, r);
        }
      }
      break;
    }

    case "cross": {
      const hStartY = y + Math.floor(height * 0.25);
      const hH = Math.max(4, Math.floor(height * 0.5));
      const vStartX = x + Math.floor(width * 0.25);
      const vW = Math.max(4, Math.floor(width * 0.5));
      fillFloorRect(x + 1, hStartY, width - 2, hH);
      fillFloorRect(vStartX, y + 1, vW, height - 2);
      break;
    }

    case "L_shape":
    case "L": {
      const splitY = y + Math.floor(height * 0.45);
      const splitX = x + Math.floor(width * 0.55);
      fillFloorRect(x + 1, splitY, width - 2, y + height - splitY - 1);
      fillFloorRect(x + 1, y + 1, splitX - x, height - 2);
      break;
    }

    case "T_shape":
    case "T": {
      const barH = Math.max(4, Math.floor(height * 0.5));
      const stemLeft = x + Math.floor(width * 0.28);
      const stemW = Math.max(4, Math.floor(width * 0.44));
      fillFloorRect(x + 1, y + 1, width - 2, barH);
      fillFloorRect(stemLeft, y + 1, stemW, height - 2);
      break;
    }

    case "octagonal":
    case "circular": {
      // Carve rectangular base, then round/chamfer corners
      fillFloorRect(x + 1, y + 1, width - 2, height - 2);
      const chamferX = Math.max(2, Math.floor(width * 0.22));
      const chamferY = Math.max(2, Math.floor(height * 0.25));
      for (let dy = 0; dy < chamferY; dy++) {
        for (let dx = 0; dx < chamferX - dy; dx++) {
          setWall(x + 1 + dx, y + 1 + dy); // Top-Left
          setWall(x + width - 2 - dx, y + 1 + dy); // Top-Right
          setWall(x + 1 + dx, y + height - 2 - dy); // Bottom-Left
          setWall(x + width - 2 - dx, y + height - 2 - dy); // Bottom-Right
        }
      }
      break;
    }

    case "oval": {
      const cx = x + width / 2;
      const cy = y + height / 2;
      const rx = (width - 3) / 2;
      const ry = (height - 3) / 2;
      for (let r = y + 1; r < y + height - 1; r++) {
        for (let c = x + 1; c < x + width - 1; c++) {
          const normX = (c - cx) / rx;
          const normY = (r - cy) / ry;
          if (normX * normX + normY * normY <= 1.0) {
            setFloor(c, r);
          }
        }
      }
      break;
    }

    case "double_room":
    case "overlapping_rectangles": {
      // Chamber 1: Left-Upper
      const w1 = Math.floor(width * 0.65);
      const h1 = Math.floor(height * 0.75);
      fillFloorRect(x + 1, y + 1, w1, h1);
      // Chamber 2: Right-Lower
      const w2 = Math.floor(width * 0.65);
      const h2 = Math.floor(height * 0.75);
      fillFloorRect(x + width - 1 - w2, y + height - 1 - h2, w2, h2);
      break;
    }

    case "multi_chamber":
    case "divided_chambers": {
      fillFloorRect(x + 1, y + 1, width - 2, height - 2);
      // Dividing wall in the center with a 3-tile portal opening
      const midX = x + Math.floor(width / 2);
      const midY = y + Math.floor(height / 2);
      for (let r = y + 1; r < y + height - 1; r++) {
        if (Math.abs(r - midY) > 2) {
          setWall(midX, r);
        }
      }
      break;
    }

    case "alcove_room": {
      fillFloorRect(x + 3, y + 2, width - 6, height - 4);
      // Add North and South alcoves
      const alcoveW = Math.max(4, Math.floor(width * 0.4));
      const alcoveLeft = x + Math.floor((width - alcoveW) / 2);
      fillFloorRect(alcoveLeft, y + 1, alcoveW, 2);
      fillFloorRect(alcoveLeft, y + height - 3, alcoveW, 2);
      break;
    }

    case "cave_blob": {
      // Cellular Automata seeded cave
      const caveW = width - 2;
      const caveH = height - 2;
      const caveGrid: boolean[][] = Array.from({ length: caveH }, () =>
        Array.from({ length: caveW }, () => rng.chance(0.58))
      );

      // 3 iterations of standard B5678/S45678 smoothing
      for (let iter = 0; iter < 3; iter++) {
        const nextGrid: boolean[][] = Array.from({ length: caveH }, () =>
          Array.from({ length: caveW }, () => false)
        );
        for (let r = 0; r < caveH; r++) {
          for (let c = 0; c < caveW; c++) {
            let neighborCount = 0;
            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                const nr = r + dr;
                const nc = c + dc;
                if (nr < 0 || nr >= caveH || nc < 0 || nc >= caveW) {
                  neighborCount++;
                } else if (caveGrid[nr][nc]) {
                  neighborCount++;
                }
              }
            }
            nextGrid[r][c] = neighborCount >= 5;
          }
        }
        for (let r = 0; r < caveH; r++) {
          for (let c = 0; c < caveW; c++) {
            caveGrid[r][c] = nextGrid[r][c];
          }
        }
      }

      for (let r = 0; r < caveH; r++) {
        for (let c = 0; c < caveW; c++) {
          if (!caveGrid[r][c]) {
            setFloor(x + 1 + c, y + 1 + r);
          }
        }
      }
      // Ensure central floor spine for connectivity
      const cy = y + Math.floor(height / 2);
      for (let c = x + 1; c < x + width - 1; c++) {
        setFloor(c, cy);
        setFloor(c, cy + 1);
      }
      break;
    }

    case "ruins": {
      fillFloorRect(x + 1, y + 1, width - 2, height - 2);
      // Broken wall fragments
      const stubX1 = x + Math.floor(width * 0.3);
      const stubX2 = x + Math.floor(width * 0.7);
      for (let dy = 0; dy < 3; dy++) {
        setWall(stubX1, y + 1 + dy);
        setWall(stubX2, y + height - 2 - dy);
      }
      break;
    }

    case "pillar_room":
    case "pillars_arena":
    case "open": {
      fillFloorRect(x + 1, y + 1, width - 2, height - 2);
      // Grid of 4 symmetrical tactical pillars
      const px1 = x + Math.floor(width * 0.28);
      const px2 = x + Math.floor(width * 0.72) - 1;
      const py1 = y + Math.floor(height * 0.3);
      const py2 = y + Math.floor(height * 0.7) - 1;
      for (const py of [py1, py2]) {
        for (const px of [px1, px2]) {
          setWall(px, py);
          setWall(px + 1, py);
          setWall(px, py + 1);
          setWall(px + 1, py + 1);
        }
      }
      break;
    }

    case "vault": {
      fillFloorRect(x + 2, y + 2, width - 4, height - 4);
      // Two guardian columns flanking the back alcove
      const cx = x + Math.floor(width / 2);
      setWall(cx - 3, y + 3);
      setWall(cx + 3, y + 3);
      break;
    }

    case "bridge_room": {
      // Wide central bridge over side chasms
      const bridgeH = Math.max(4, Math.floor(height * 0.45));
      const bridgeY = y + Math.floor((height - bridgeH) / 2);
      fillFloorRect(x + 1, bridgeY, width - 2, bridgeH);
      break;
    }

    case "hazard_room": {
      fillFloorRect(x + 1, y + 1, width - 2, height - 2);
      // Center island with hazard ring
      const cx = x + Math.floor(width / 2);
      const cy = y + Math.floor(height / 2);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          setFloor(cx + dx, cy + dy);
        }
      }
      break;
    }

    case "boss_arena": {
      fillFloorRect(x + 1, y + 1, width - 2, height - 2);
      // Round the 4 corners of boss arena
      const chamX = Math.max(3, Math.floor(width * 0.15));
      const chamY = Math.max(3, Math.floor(height * 0.15));
      for (let dy = 0; dy < chamY; dy++) {
        for (let dx = 0; dx < chamX - dy; dx++) {
          setWall(x + 1 + dx, y + 1 + dy);
          setWall(x + width - 2 - dx, y + 1 + dy);
          setWall(x + 1 + dx, y + height - 2 - dy);
          setWall(x + width - 2 - dx, y + height - 2 - dy);
        }
      }
      // Tactical ceremonial side columns
      const colX1 = x + Math.floor(width * 0.2);
      const colX2 = x + Math.floor(width * 0.8);
      const colY1 = y + Math.floor(height * 0.3);
      const colY2 = y + Math.floor(height * 0.7);
      setWall(colX1, colY1);
      setWall(colX2, colY1);
      setWall(colX1, colY2);
      setWall(colX2, colY2);
      break;
    }

    case "chokepoint": {
      fillFloorRect(x + 1, y + 1, width - 2, height - 2);
      const midX = x + Math.floor(width / 2);
      const cy = y + Math.floor(height / 2);
      for (let r = y + 1; r < y + height - 1; r++) {
        if (Math.abs(r - cy) > 2) {
          setWall(midX, r);
          setWall(midX - 1, r);
        }
      }
      break;
    }

    case "central_arena":
    case "central_island": {
      fillFloorRect(x + 1, y + 1, width - 2, height - 2);
      const cx = x + Math.floor(width / 2);
      const cy = y + Math.floor(height / 2);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -2; dx <= 1; dx++) {
          setWall(cx + dx, cy + dy);
        }
      }
      break;
    }

    case "winding": {
      fillFloorRect(x + 1, y + 1, width - 2, height - 2);
      const midX = x + Math.floor(width / 2);
      const h3 = Math.floor(height / 3);
      for (let r = y + 1; r < y + h3 * 2; r++) setWall(Math.floor(midX * 0.85), r);
      for (let r = y + h3; r < y + height - 1; r++) setWall(Math.floor(midX * 1.15), r);
      break;
    }

    case "asymmetric":
    case "irregular":
    default: {
      fillFloorRect(x + 1, y + 1, width - 2, height - 2);
      // Asymmetric corner indentations
      for (let r = y + 1; r < y + Math.floor(height * 0.35); r++) {
        for (let c = x + 1; c < x + Math.floor(width * 0.25); c++) setWall(c, r);
      }
      for (let r = y + Math.floor(height * 0.65); r < y + height - 1; r++) {
        for (let c = x + Math.floor(width * 0.75); c < x + width - 1; c++) setWall(c, r);
      }
      break;
    }
  }

  // Layer 5: Room Substructures (Interior Pillars & Dividers for Large Rooms)
  if (addSubstructures && width >= 18 && height >= 14 && shape !== "boss_arena" && shape !== "pillar_room") {
    if (rng.chance(0.4)) {
      const midX = x + Math.floor(width / 2);
      const midY = y + Math.floor(height / 2);
      // Place 2 side cover pillars
      const offset = Math.floor(width * 0.22);
      if (tiles[midY]?.[midX - offset] === "floor" && tiles[midY]?.[midX + offset] === "floor") {
        setWall(midX - offset, midY);
        setWall(midX + offset, midY);
      }
    }
  }
}
