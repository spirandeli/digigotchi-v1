import type { RunRNG } from "./rng";
import type { EnvironmentLandmark, RoomKind, Tile } from "./types";

export interface LandmarkPlacementOptions {
  roomKind: RoomKind;
  themeId: "lighting" | "fire" | "ice" | "tech";
  x: number;
  y: number;
  width: number;
  height: number;
  tiles: readonly Tile[][];
  rng: RunRNG;
}

export const THEME_LANDMARKS: Record<
  string,
  Array<{ name: string; category: string; width: number; height: number }>
> = {
  lighting: [
    { name: "Bobina de Alta Tensão", category: "energy", width: 2, height: 2 },
    { name: "Reator de Tempestade", category: "structure", width: 2, height: 2 },
    { name: "Terminal de Descarga", category: "tech", width: 2, height: 2 },
  ],
  fire: [
    { name: "Altar do Fogo Primordial", category: "structure", width: 2, height: 2 },
    { name: "Monólito de Obsidiana", category: "crystal", width: 2, height: 2 },
    { name: "Fornalha de Dados Incandescente", category: "hazard", width: 2, height: 2 },
  ],
  ice: [
    { name: "Monólito Glacial", category: "crystal", width: 2, height: 2 },
    { name: "Pilar de Gelo Prismático", category: "structure", width: 2, height: 2 },
    { name: "Vórtice Congelado", category: "hazard", width: 2, height: 2 },
  ],
  tech: [
    { name: "Núcleo Central de Dados", category: "tech", width: 2, height: 2 },
    { name: "Monólito Holográfico", category: "energy", width: 2, height: 2 },
    { name: "Reator Quântico", category: "structure", width: 2, height: 2 },
  ],
};

export function generateLandmark(options: LandmarkPlacementOptions): EnvironmentLandmark | undefined {
  const { roomKind, themeId, width, height, tiles, rng } = options;

  // Decide if this room qualifies for a landmark (Boss, Miniboss, Event, Hub, or large combat room)
  const isEligible =
    roomKind === "boss" ||
    roomKind === "miniboss" ||
    roomKind === "event" ||
    (width >= 20 && height >= 14 && rng.chance(0.65));

  if (!isEligible) return undefined;

  const pool = THEME_LANDMARKS[themeId] || THEME_LANDMARKS.lighting;
  const chosen = rng.pick(pool);

  // Position landmark in the upper focal third or center of the room
  const focalX = Math.floor(width / 2) - Math.floor(chosen.width / 2);
  const focalY = roomKind === "boss" ? Math.max(3, Math.floor(height * 0.22)) : Math.floor(height / 2) - 1;

  // Verify that the landmark area has walkable floor
  let hasValidFloor = true;
  for (let dy = 0; dy < chosen.height; dy++) {
    for (let dx = 0; dx < chosen.width; dx++) {
      if (tiles[focalY + dy]?.[focalX + dx] !== "floor") {
        hasValidFloor = false;
        break;
      }
    }
    if (!hasValidFloor) break;
  }

  if (!hasValidFloor) {
    // Fallback: search for first 2x2 floor patch near center
    return undefined;
  }

  // Compose satellite features (e.g. flanking accent pillars or crystals)
  const satellites: Array<{ x: number; y: number; type: string }> = [];
  const flankLeft = focalX - 3;
  const flankRight = focalX + chosen.width + 2;
  const flankY = focalY + 1;

  if (flankLeft > 1 && tiles[flankY]?.[flankLeft] === "floor") {
    satellites.push({ x: flankLeft, y: flankY, type: "flank_left" });
  }
  if (flankRight < width - 2 && tiles[flankY]?.[flankRight] === "floor") {
    satellites.push({ x: flankRight, y: flankY, type: "flank_right" });
  }

  return {
    id: `landmark_${themeId}_${Date.now()}_${rng.int(100, 999)}`,
    name: chosen.name,
    tileX: focalX,
    tileY: focalY,
    size: { width: chosen.width, height: chosen.height },
    category: chosen.category,
    satelliteTiles: satellites,
  };
}
