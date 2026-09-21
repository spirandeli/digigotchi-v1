import type { RunRNG } from "./rng";

export type MapThemeId = "lighting" | "fire" | "ice" | "tech";

export interface MapThemeWalls {
  readonly horizontal: readonly string[];
  readonly vertical: readonly string[];
  readonly top: readonly string[];
  readonly bottom: readonly string[];
  readonly left: readonly string[];
  readonly right: readonly string[];
  readonly special: readonly string[];
}

export interface MapThemeCorners {
  readonly outerTopLeft: string;
  readonly outerTopRight: string;
  readonly outerBottomLeft: string;
  readonly outerBottomRight: string;
  readonly innerTopLeft?: string;
  readonly innerTopRight?: string;
  readonly innerBottomLeft?: string;
  readonly innerBottomRight?: string;
}

export interface MapThemeDoors {
  readonly verticalClosed: string;
  readonly verticalOpen: string;
  readonly horizontalClosed?: string;
  readonly horizontalOpen?: string;
}

export interface MapThemeChests {
  readonly closed: readonly string[];
  readonly open: readonly string[];
}

export interface MapThemeDecorations {
  readonly floor: readonly string[];
  readonly medium: readonly string[];
  readonly wall: readonly string[];
}

export interface MapThemeEnvironment {
  readonly ambient: readonly string[];
  readonly rocks: readonly string[];
  readonly ruins: readonly string[];
  readonly elemental: readonly string[];
}

export interface MapThemeHazards {
  readonly floor: readonly string[];
}

export interface MapThemeLandmarks {
  readonly monolith: readonly string[];
}

export interface MapThemeTiles {
  /**
   * The dominant floor tile(s). Used for ~80-85% of floor cells.
   * Must be visually compatible with each other (similar color/texture family).
   */
  readonly floorNormal: readonly string[];

  /**
   * Subtle floor variations for breaking repetition. Used for ~10-15% of cells.
   * Must be the same color family as floorNormal. Small cracks, slight damage — ok.
   */
  readonly floorVariation: readonly string[];

  /**
   * Rare decorative floor accents. Used for ~2-4% of cells, in small clusters.
   */
  readonly floorDecor: readonly string[];

  /**
   * @deprecated Kept for backward compatibility only.
   */
  readonly floorSpecial: readonly string[];

  /**
   * @deprecated Kept for backward compatibility only.
   */
  readonly floorAlternate: readonly string[];

  /**
   * @deprecated Kept for backward compatibility only.
   */
  readonly floorCracked: readonly string[];

  readonly walls: MapThemeWalls;
  readonly corners: MapThemeCorners;
  readonly doors: MapThemeDoors;
  readonly chests: MapThemeChests;
  readonly decorations?: MapThemeDecorations;
  readonly environment?: MapThemeEnvironment;
  readonly hazards?: MapThemeHazards;
  readonly landmarks?: MapThemeLandmarks;
}

export interface MapThemeConfig {
  readonly id: MapThemeId;
  readonly name: string;
  readonly basePath: string;
  enabled: boolean;
  readonly biome: "storm" | "fire" | "ice" | "digital";
  readonly wallRimColor: number;
  readonly floorTint?: number;
  readonly accentTint?: number;
  readonly tiles: MapThemeTiles;
}

export const MAP_THEMES: Record<MapThemeId, MapThemeConfig> = {
  lighting: {
    id: "lighting",
    name: "Rede Elétrica Digital",
    basePath: "/sprites/maps/lighting/",
    enabled: true,
    biome: "storm",
    wallRimColor: 0x00f0ff,
    accentTint: 0x88ffff,
    tiles: {
      floorNormal: [
        "/sprites/maps/lighting/floor/normal/floor_normal_01.png",
        "/sprites/maps/lighting/floor/normal/floor_normal_02.png",
      ],
      floorVariation: [
        "/sprites/maps/lighting/floor/cracked/floor_cracked_01.png",
        "/sprites/maps/lighting/floor/cracked/floor_cracked_02.png",
      ],
      floorDecor: [
        "/sprites/maps/lighting/floor/alternate/floor_alternate_02.png",
        "/sprites/maps/lighting/floor/special/floor_special_01.png",
      ],
      floorAlternate: [
        "/sprites/maps/lighting/floor/alternate/floor_alternate_01.png",
        "/sprites/maps/lighting/floor/alternate/floor_alternate_02.png",
      ],
      floorSpecial: [
        "/sprites/maps/lighting/floor/special/floor_special_01.png",
        "/sprites/maps/lighting/floor/special/floor_special_02.png",
      ],
      floorCracked: [
        "/sprites/maps/lighting/floor/cracked/floor_cracked_01.png",
        "/sprites/maps/lighting/floor/cracked/floor_cracked_02.png",
      ],
      walls: {
        horizontal: ["/sprites/maps/lighting/walls/horizontal/wall_horizontal_01.png"],
        vertical: ["/sprites/maps/lighting/walls/vertical/wall_vertical_01.png"],
        top: ["/sprites/maps/lighting/walls/top/wall_top_01.png"],
        bottom: ["/sprites/maps/lighting/walls/bottom/wall_bottom_01.png"],
        left: ["/sprites/maps/lighting/walls/left/wall_left_01.png"],
        right: ["/sprites/maps/lighting/walls/right/wall_right_01.png"],
        special: [
          "/sprites/maps/lighting/walls/special/wall_special_01.png",
          "/sprites/maps/lighting/walls/special/wall_special_02.png",
          "/sprites/maps/lighting/walls/special/wall_special_03.png",
          "/sprites/maps/lighting/walls/special/wall_special_04.png",
        ],
      },
      corners: {
        outerTopLeft: "/sprites/maps/lighting/corners/outer/top_left/corner_outer_top_left.png",
        outerTopRight: "/sprites/maps/lighting/corners/outer/top_right/corner_outer_top_right.png",
        outerBottomLeft: "/sprites/maps/lighting/corners/outer/bottom_left/corner_outer_bottom_left.png",
        outerBottomRight: "/sprites/maps/lighting/corners/outer/bottom_right/corner_outer_bottom_right.png",
        innerTopLeft: "/sprites/maps/lighting/corners/inner/top_left/corner_inner_top_left.png",
        innerTopRight: "/sprites/maps/lighting/corners/inner/top_right/corner_inner_top_right.png",
        innerBottomLeft: "/sprites/maps/lighting/corners/inner/bottom_left/corner_inner_bottom_left.png",
        innerBottomRight: "/sprites/maps/lighting/corners/inner/bottom_right/corner_inner_bottom_right.png",
      },
      doors: {
        verticalClosed: "/sprites/maps/lighting/doors/vertical/closed/door_vertical_closed_01.png",
        verticalOpen: "/sprites/maps/lighting/doors/vertical/open/door_vertical_open_01.png",
      },
      chests: {
        closed: [
          "/sprites/maps/lighting/interactables/chest/closed/chest_closed_01.png",
          "/sprites/maps/lighting/interactables/chest/closed/chest_closed_02.png",
        ],
        open: [
          "/sprites/maps/lighting/interactables/chest/open/chest_open_01.png",
          "/sprites/maps/lighting/interactables/chest/open/chest_open_02.png",
        ],
      },
      decorations: {
        floor: [
          "/sprites/maps/lighting/decorations/floor/decor_floor_01.png",
          "/sprites/maps/lighting/decorations/floor/decor_floor_02.png",
        ],
        medium: [
          "/sprites/maps/lighting/decorations/medium/decor_medium_01.png",
          "/sprites/maps/lighting/decorations/medium/decor_medium_02.png",
        ],
        wall: [
          "/sprites/maps/lighting/decorations/wall/decor_wall_01.png",
          "/sprites/maps/lighting/decorations/wall/decor_wall_02.png",
        ],
      },
      environment: {
        ambient: ["/sprites/maps/lighting/environment/ambient/env_ambient_01.png"],
        rocks: ["/sprites/maps/lighting/environment/rocks/env_rocks_01.png"],
        ruins: ["/sprites/maps/lighting/environment/ruins/env_ruins_01.png"],
        elemental: ["/sprites/maps/lighting/environment/elemental/env_elemental_01.png"],
      },
      hazards: {
        floor: [
          "/sprites/maps/lighting/hazards/floor/hazard_floor_01.png",
          "/sprites/maps/lighting/hazards/floor/hazard_floor_02.png",
        ],
      },
      landmarks: {
        monolith: [
          "/sprites/maps/lighting/landmarks/landmark_01.png",
          "/sprites/maps/lighting/landmarks/landmark_02.png",
        ],
      },
    },
  },
  fire: {
    id: "fire",
    name: "Câmara de Magma Digital",
    basePath: "/sprites/maps/fire/",
    enabled: true,
    biome: "fire",
    wallRimColor: 0xff4400,
    accentTint: 0xffaa00,
    tiles: {
      floorNormal: [
        "/sprites/maps/fire/floor/normal/floor_normal_01.png",
        "/sprites/maps/fire/floor/normal/floor_normal_02.png",
      ],
      floorVariation: [
        "/sprites/maps/fire/floor/cracked/floor_cracked_01.png",
        "/sprites/maps/fire/floor/cracked/floor_cracked_02.png",
      ],
      floorDecor: [
        "/sprites/maps/fire/floor/alternate/floor_alternate_02.png",
        "/sprites/maps/fire/floor/special/floor_special_01.png",
      ],
      floorAlternate: [
        "/sprites/maps/fire/floor/alternate/floor_alternate_01.png",
        "/sprites/maps/fire/floor/alternate/floor_alternate_02.png",
      ],
      floorSpecial: [
        "/sprites/maps/fire/floor/special/floor_special_01.png",
        "/sprites/maps/fire/floor/special/floor_special_02.png",
      ],
      floorCracked: [
        "/sprites/maps/fire/floor/cracked/floor_cracked_01.png",
        "/sprites/maps/fire/floor/cracked/floor_cracked_02.png",
      ],
      walls: {
        horizontal: ["/sprites/maps/fire/walls/horizontal/wall_horizontal_01.png"],
        vertical: ["/sprites/maps/fire/walls/vertical/wall_vertical_01.png"],
        top: ["/sprites/maps/fire/walls/top/wall_top_01.png"],
        bottom: ["/sprites/maps/fire/walls/bottom/wall_bottom_01.png"],
        left: ["/sprites/maps/fire/walls/left/wall_left_01.png"],
        right: ["/sprites/maps/fire/walls/right/wall_right_01.png"],
        special: [
          "/sprites/maps/fire/walls/special/wall_special_01.png",
          "/sprites/maps/fire/walls/special/wall_special_02.png",
        ],
      },
      corners: {
        outerTopLeft: "/sprites/maps/fire/corners/outer/top_left/corner_outer_top_left.png",
        outerTopRight: "/sprites/maps/fire/corners/outer/top_right/corner_outer_top_right.png",
        outerBottomLeft: "/sprites/maps/fire/corners/outer/bottom_left/corner_outer_bottom_left.png",
        outerBottomRight: "/sprites/maps/fire/corners/outer/bottom_right/corner_outer_bottom_right.png",
        innerTopLeft: "/sprites/maps/fire/corners/inner/top_left/corner_inner_top_left.png",
        innerTopRight: "/sprites/maps/fire/corners/inner/top_right/corner_inner_top_right.png",
        innerBottomLeft: "/sprites/maps/fire/corners/inner/bottom_left/corner_inner_bottom_left.png",
        innerBottomRight: "/sprites/maps/fire/corners/inner/bottom_right/corner_inner_bottom_right.png",
      },
      doors: {
        verticalClosed: "/sprites/maps/fire/doors/vertical/closed/door_vertical_closed_01.png",
        verticalOpen: "/sprites/maps/fire/doors/vertical/open/door_vertical_open_01.png",
      },
      chests: {
        closed: ["/sprites/maps/fire/interactables/chest/closed/chest_closed_01.png"],
        open: ["/sprites/maps/fire/interactables/chest/open/chest_open_01.png"],
      },
      decorations: {
        floor: ["/sprites/maps/fire/decorations/floor/decor_floor_01.png"],
        medium: ["/sprites/maps/fire/decorations/medium/decor_medium_01.png"],
        wall: ["/sprites/maps/fire/decorations/wall/decor_wall_01.png"],
      },
      environment: {
        ambient: ["/sprites/maps/fire/environment/ambient/env_ambient_01.png"],
        rocks: ["/sprites/maps/fire/environment/rocks/env_rocks_01.png"],
        ruins: ["/sprites/maps/fire/environment/ruins/env_ruins_01.png"],
        elemental: ["/sprites/maps/fire/environment/elemental/env_elemental_01.png"],
      },
      hazards: {
        floor: ["/sprites/maps/fire/hazards/floor/hazard_floor_01.png"],
      },
      landmarks: {
        monolith: ["/sprites/maps/fire/landmarks/landmark_01.png"],
      },
    },
  },
  ice: {
    id: "ice",
    name: "Glaciar de Subzero",
    basePath: "/sprites/maps/ice/",
    enabled: true,
    biome: "ice",
    wallRimColor: 0x66ccff,
    accentTint: 0xaae4ff,
    tiles: {
      floorNormal: [
        "/sprites/maps/ice/floor/normal/floor_normal_01.png",
        "/sprites/maps/ice/floor/normal/floor_normal_02.png",
      ],
      floorVariation: [
        "/sprites/maps/ice/floor/cracked/floor_cracked_01.png",
        "/sprites/maps/ice/floor/cracked/floor_cracked_02.png",
      ],
      floorDecor: [
        "/sprites/maps/ice/floor/alternate/floor_alternate_02.png",
        "/sprites/maps/ice/floor/special/floor_special_01.png",
      ],
      floorAlternate: [
        "/sprites/maps/ice/floor/alternate/floor_alternate_01.png",
        "/sprites/maps/ice/floor/alternate/floor_alternate_02.png",
      ],
      floorSpecial: [
        "/sprites/maps/ice/floor/special/floor_special_01.png",
        "/sprites/maps/ice/floor/special/floor_special_02.png",
      ],
      floorCracked: [
        "/sprites/maps/ice/floor/cracked/floor_cracked_01.png",
        "/sprites/maps/ice/floor/cracked/floor_cracked_02.png",
      ],
      walls: {
        horizontal: ["/sprites/maps/ice/walls/horizontal/wall_horizontal_01.png"],
        vertical: ["/sprites/maps/ice/walls/vertical/wall_vertical_01.png"],
        top: ["/sprites/maps/ice/walls/top/wall_top_01.png"],
        bottom: ["/sprites/maps/ice/walls/bottom/wall_bottom_01.png"],
        left: ["/sprites/maps/ice/walls/left/wall_left_01.png"],
        right: ["/sprites/maps/ice/walls/right/wall_right_01.png"],
        special: [
          "/sprites/maps/ice/walls/special/wall_special_01.png",
          "/sprites/maps/ice/walls/special/wall_special_02.png",
        ],
      },
      corners: {
        outerTopLeft: "/sprites/maps/ice/corners/outer/top_left/corner_outer_top_left.png",
        outerTopRight: "/sprites/maps/ice/corners/outer/top_right/corner_outer_top_right.png",
        outerBottomLeft: "/sprites/maps/ice/corners/outer/bottom_left/corner_outer_bottom_left.png",
        outerBottomRight: "/sprites/maps/ice/corners/outer/bottom_right/corner_outer_bottom_right.png",
        innerTopLeft: "/sprites/maps/ice/corners/inner/top_left/corner_inner_top_left.png",
        innerTopRight: "/sprites/maps/ice/corners/inner/top_right/corner_inner_top_right.png",
        innerBottomLeft: "/sprites/maps/ice/corners/inner/bottom_left/corner_inner_bottom_left.png",
        innerBottomRight: "/sprites/maps/ice/corners/inner/bottom_right/corner_inner_bottom_right.png",
      },
      doors: {
        verticalClosed: "/sprites/maps/ice/doors/vertical/closed/door_vertical_closed_01.png",
        verticalOpen: "/sprites/maps/ice/doors/vertical/open/door_vertical_open_01.png",
      },
      chests: {
        closed: ["/sprites/maps/ice/interactables/chest/closed/chest_closed_01.png"],
        open: ["/sprites/maps/ice/interactables/chest/open/chest_open_01.png"],
      },
      decorations: {
        floor: ["/sprites/maps/ice/decorations/floor/decor_floor_01.png"],
        medium: ["/sprites/maps/ice/decorations/medium/decor_medium_01.png"],
        wall: ["/sprites/maps/ice/decorations/wall/decor_wall_01.png"],
      },
      environment: {
        ambient: ["/sprites/maps/ice/environment/ambient/env_ambient_01.png"],
        rocks: ["/sprites/maps/ice/environment/rocks/env_rocks_01.png"],
        ruins: ["/sprites/maps/ice/environment/ruins/env_ruins_01.png"],
        elemental: ["/sprites/maps/ice/environment/elemental/env_elemental_01.png"],
      },
      hazards: {
        floor: ["/sprites/maps/ice/hazards/floor/hazard_floor_01.png"],
      },
      landmarks: {
        monolith: ["/sprites/maps/ice/landmarks/landmark_01.png"],
      },
    },
  },
  tech: {
    id: "tech",
    name: "Laboratório Cyber Core",
    basePath: "/sprites/maps/tech/",
    enabled: true,
    biome: "digital",
    wallRimColor: 0x39ff14,
    accentTint: 0x70ff70,
    tiles: {
      floorNormal: [
        "/sprites/maps/tech/floor/normal/floor_normal_01.png",
        "/sprites/maps/tech/floor/normal/floor_normal_02.png",
      ],
      floorVariation: [
        "/sprites/maps/tech/floor/cracked/floor_cracked_01.png",
        "/sprites/maps/tech/floor/cracked/floor_cracked_02.png",
      ],
      floorDecor: [
        "/sprites/maps/tech/floor/alternate/floor_alternate_02.png",
        "/sprites/maps/tech/floor/special/floor_special_01.png",
      ],
      floorAlternate: [
        "/sprites/maps/tech/floor/alternate/floor_alternate_01.png",
        "/sprites/maps/tech/floor/alternate/floor_alternate_02.png",
      ],
      floorSpecial: [
        "/sprites/maps/tech/floor/special/floor_special_01.png",
        "/sprites/maps/tech/floor/special/floor_special_02.png",
      ],
      floorCracked: [
        "/sprites/maps/tech/floor/cracked/floor_cracked_01.png",
        "/sprites/maps/tech/floor/cracked/floor_cracked_02.png",
      ],
      walls: {
        horizontal: ["/sprites/maps/tech/walls/horizontal/wall_horizontal_01.png"],
        vertical: ["/sprites/maps/tech/walls/vertical/wall_vertical_01.png"],
        top: ["/sprites/maps/tech/walls/top/wall_top_01.png"],
        bottom: ["/sprites/maps/tech/walls/bottom/wall_bottom_01.png"],
        left: ["/sprites/maps/tech/walls/left/wall_left_01.png"],
        right: ["/sprites/maps/tech/walls/right/wall_right_01.png"],
        special: [
          "/sprites/maps/tech/walls/special/wall_special_01.png",
          "/sprites/maps/tech/walls/special/wall_special_02.png",
        ],
      },
      corners: {
        outerTopLeft: "/sprites/maps/tech/corners/outer/top_left/corner_outer_top_left.png",
        outerTopRight: "/sprites/maps/tech/corners/outer/top_right/corner_outer_top_right.png",
        outerBottomLeft: "/sprites/maps/tech/corners/outer/bottom_left/corner_outer_bottom_left.png",
        outerBottomRight: "/sprites/maps/tech/corners/outer/bottom_right/corner_outer_bottom_right.png",
        innerTopLeft: "/sprites/maps/tech/corners/inner/top_left/corner_inner_top_left.png",
        innerTopRight: "/sprites/maps/tech/corners/inner/top_right/corner_inner_top_right.png",
        innerBottomLeft: "/sprites/maps/tech/corners/inner/bottom_left/corner_inner_bottom_left.png",
        innerBottomRight: "/sprites/maps/tech/corners/inner/bottom_right/corner_inner_bottom_right.png",
      },
      doors: {
        verticalClosed: "/sprites/maps/tech/doors/vertical/closed/door_vertical_closed_01.png",
        verticalOpen: "/sprites/maps/tech/doors/vertical/open/door_vertical_open_01.png",
      },
      chests: {
        closed: ["/sprites/maps/tech/interactables/chest/closed/chest_closed_01.png"],
        open: ["/sprites/maps/tech/interactables/chest/open/chest_open_01.png"],
      },
      decorations: {
        floor: ["/sprites/maps/tech/decorations/floor/decor_floor_01.png"],
        medium: ["/sprites/maps/tech/decorations/medium/decor_medium_01.png"],
        wall: ["/sprites/maps/tech/decorations/wall/decor_wall_01.png"],
      },
      environment: {
        ambient: ["/sprites/maps/tech/environment/ambient/env_ambient_01.png"],
        rocks: ["/sprites/maps/tech/environment/rocks/env_rocks_01.png"],
        ruins: ["/sprites/maps/tech/environment/ruins/env_ruins_01.png"],
        elemental: ["/sprites/maps/tech/environment/elemental/env_elemental_01.png"],
      },
      hazards: {
        floor: ["/sprites/maps/tech/hazards/floor/hazard_floor_01.png"],
      },
      landmarks: {
        monolith: ["/sprites/maps/tech/landmarks/landmark_01.png"],
      },
    },
  },
};

/**
 * Returns all themes that are currently enabled and ready for selection.
 */
export function getAvailableThemes(): MapThemeConfig[] {
  return Object.values(MAP_THEMES).filter((t) => t.enabled);
}

/**
 * Normalizes theme ID, accepting aliases like "lightning" -> "lighting".
 */
export function normalizeThemeId(themeId?: string): MapThemeId {
  if (!themeId) return "lighting";
  const lower = themeId.toLowerCase().trim();
  if (lower === "lightning" || lower === "lighting") return "lighting";
  if (lower === "fire") return "fire";
  if (lower === "ice") return "ice";
  if (lower === "tech") return "tech";
  return "lighting";
}

/**
 * Returns a specific map theme config by ID, falling back to lighting if invalid.
 */
export function getMapTheme(themeId?: string): MapThemeConfig {
  const norm = normalizeThemeId(themeId);
  return MAP_THEMES[norm] || MAP_THEMES.lighting;
}

/**
 * Randomly picks one map theme among all enabled themes.
 * If none are enabled, logs a warning and falls back safely to 'lighting'.
 * Fully decoupled from Digimon species: any Digimon can get any enabled theme.
 */
export function pickRandomTheme(rng?: RunRNG | { next(): number }): MapThemeConfig {
  const available = getAvailableThemes();
  if (available.length === 0) {
    console.warn("[MapThemes] Warning: No map themes are enabled! Falling back safely to 'lighting'.");
    return MAP_THEMES.lighting;
  }

  const rand = rng ? rng.next() : Math.random();
  const index = Math.floor(rand * available.length) % available.length;
  return available[index];
}

/**
 * Helper to update theme enabled state (useful for tests or runtime toggles).
 */
export function setThemeEnabled(themeId: MapThemeId, enabled: boolean): void {
  const norm = normalizeThemeId(themeId);
  if (MAP_THEMES[norm]) {
    MAP_THEMES[norm].enabled = enabled;
  }
}
