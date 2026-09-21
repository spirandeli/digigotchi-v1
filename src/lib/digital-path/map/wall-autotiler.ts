import type { MapThemeConfig } from "./map-themes";
import type { Tile } from "./types";

export type WallClassification =
  | "corner_outer_tl"
  | "corner_outer_tr"
  | "corner_outer_bl"
  | "corner_outer_br"
  | "corner_inner_tl"
  | "corner_inner_tr"
  | "corner_inner_bl"
  | "corner_inner_br"
  | "wall_top"
  | "wall_bottom"
  | "wall_left"
  | "wall_right"
  | "wall_horizontal"
  | "wall_vertical"
  | "wall_solid";

export interface ResolvedWallTile {
  x: number;
  y: number;
  classification: WallClassification;
  spriteKey: string;
  hasRim: boolean;
  isOuterBorder: boolean;
}

export function classifyWallTile(
  tiles: readonly Tile[][],
  x: number,
  y: number,
  width: number,
  height: number
): WallClassification {
  const isFloor = (r: number, c: number): boolean => {
    if (r < 0 || r >= height || c < 0 || c >= width) return false;
    return tiles[r]?.[c] === "floor";
  };

  const fN = isFloor(y - 1, x);
  const fS = isFloor(y + 1, x);
  const fW = isFloor(y, x - 1);
  const fE = isFloor(y, x + 1);

  const fNW = isFloor(y - 1, x - 1);
  const fNE = isFloor(y - 1, x + 1);
  const fSW = isFloor(y + 1, x - 1);
  const fSE = isFloor(y + 1, x + 1);

  // 1. Convex Outer Corners (wall corner surrounded on 2 adjacent orthogonal sides by floor)
  if (fS && fE) return "corner_outer_tl";
  if (fS && fW) return "corner_outer_tr";
  if (fN && fE) return "corner_outer_bl";
  if (fN && fW) return "corner_outer_br";

  // 2. Concave Inner Corners (wall corner where orthogonal neighbors are walls but diagonal is floor)
  if (!fS && !fE && fSE) return "corner_inner_tl";
  if (!fS && !fW && fSW) return "corner_inner_tr";
  if (!fN && !fE && fNE) return "corner_inner_bl";
  if (!fN && !fW && fNW) return "corner_inner_br";

  // 3. Orthogonal Border Slabs
  if (fS && !fW && !fE) return "wall_top";
  if (fN && !fW && !fE) return "wall_bottom";
  if (fE && !fN && !fS) return "wall_left";
  if (fW && !fN && !fS) return "wall_right";

  // 4. Fallback linear spans
  if (fS || fN) return "wall_horizontal";
  if (fE || fW) return "wall_vertical";

  // 5. Deep interior / unexposed solid
  return "wall_solid";
}

export function resolveWallSpriteKey(
  classification: WallClassification,
  theme: MapThemeConfig
): { spriteKey: string; hasRim: boolean } {
  const themeId = theme.id;
  const corners = theme.tiles.corners;
  const walls = theme.tiles.walls;

  let spriteKey = `theme_${themeId}_wall_v_0`;
  let hasRim = false;

  switch (classification) {
    case "corner_outer_tl":
      spriteKey = corners.outerTopLeft ? `theme_${themeId}_corner_outer_tl` : `theme_${themeId}_wall_h_0`;
      hasRim = true;
      break;
    case "corner_outer_tr":
      spriteKey = corners.outerTopRight ? `theme_${themeId}_corner_outer_tr` : `theme_${themeId}_wall_h_0`;
      hasRim = true;
      break;
    case "corner_outer_bl":
      spriteKey = corners.outerBottomLeft ? `theme_${themeId}_corner_outer_bl` : `theme_${themeId}_wall_h_0`;
      break;
    case "corner_outer_br":
      spriteKey = corners.outerBottomRight ? `theme_${themeId}_corner_outer_br` : `theme_${themeId}_wall_h_0`;
      break;

    case "corner_inner_tl":
      spriteKey = corners.innerTopLeft ? `theme_${themeId}_corner_inner_tl` : `theme_${themeId}_wall_h_0`;
      break;
    case "corner_inner_tr":
      spriteKey = corners.innerTopRight ? `theme_${themeId}_corner_inner_tr` : `theme_${themeId}_wall_h_0`;
      break;
    case "corner_inner_bl":
      spriteKey = corners.innerBottomLeft ? `theme_${themeId}_corner_inner_bl` : `theme_${themeId}_wall_h_0`;
      break;
    case "corner_inner_br":
      spriteKey = corners.innerBottomRight ? `theme_${themeId}_corner_inner_br` : `theme_${themeId}_wall_h_0`;
      break;

    case "wall_top":
      spriteKey = walls.top.length > 0 ? `theme_${themeId}_wall_top_0` : `theme_${themeId}_wall_h_0`;
      hasRim = true;
      break;
    case "wall_bottom":
      spriteKey = walls.bottom.length > 0 ? `theme_${themeId}_wall_bottom_0` : `theme_${themeId}_wall_h_0`;
      break;
    case "wall_left":
      spriteKey = walls.left.length > 0 ? `theme_${themeId}_wall_left_0` : `theme_${themeId}_wall_v_0`;
      break;
    case "wall_right":
      spriteKey = walls.right.length > 0 ? `theme_${themeId}_wall_right_0` : `theme_${themeId}_wall_v_0`;
      break;

    case "wall_horizontal":
      spriteKey = walls.horizontal.length > 0 ? `theme_${themeId}_wall_h_0` : `theme_${themeId}_wall_top_0`;
      hasRim = true;
      break;
    case "wall_vertical":
    case "wall_solid":
    default:
      spriteKey = walls.vertical.length > 0 ? `theme_${themeId}_wall_v_0` : `theme_${themeId}_wall_h_0`;
      break;
  }

  return { spriteKey, hasRim };
}
