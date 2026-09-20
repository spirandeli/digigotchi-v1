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

export interface MapThemeTiles {
  /**
   * The dominant floor tile(s). Used for ~80% of floor cells.
   * Must be visually compatible with each other (similar color/texture family).
   */
  readonly floorNormal: readonly string[];

  /**
   * Subtle floor variations for breaking repetition. Used for ~12-15% of cells.
   * Must be the same color family as floorNormal. Small cracks, moss, slight damage — ok.
   * Heavy decorative elements (circles, diamonds, symbols) are NOT ok here.
   */
  readonly floorVariation: readonly string[];

  /**
   * Rare decorative floor accents. Used for ~3-5% of cells, in small clusters.
   * May have mild thematic elements (slight glow, circuitry edge) but should NOT
   * be dominant or create strong contrast with the base floor.
   */
  readonly floorDecor: readonly string[];

  /**
   * @deprecated Use floorVariation or floorDecor instead.
   * Kept for backward compatibility only. Not used by the new renderer.
   */
  readonly floorSpecial: readonly string[];

  /**
   * @deprecated Use floorVariation instead.
   * Kept for backward compatibility only. Not used by the new renderer.
   */
  readonly floorAlternate: readonly string[];

  /**
   * @deprecated Use floorVariation instead.
   * Kept for backward compatibility only. Not used by the new renderer.
   */
  readonly floorCracked: readonly string[];

  readonly walls: MapThemeWalls;
  readonly doors: MapThemeDoors;
  readonly chests: MapThemeChests;
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
      // ─── FLOOR BASE (80%+ of cells) ───────────────────────────────────
      // Visual: blue-gray tech stone slabs — uniform, calm, readable base
      floorNormal: [
        "/sprites/maps/lighting/floor/normal/sprite_0019.png",  // blue-gray stone slabs — primary dominant base
      ],

      // ─── FLOOR VARIATION (10-12% of cells) ────────────────────────────
      // Visual: same stone family, subtle corner spark or electric crack in small clusters
      floorVariation: [
        "/sprites/maps/lighting/floor/special/sprite_0024.png",  // blue-gray stone with subtle corner spark
        "/sprites/maps/lighting/floor/cracked/sprite_0023.png",  // blue electric lightning crack on blue-gray stone
      ],

      // ─── FLOOR DECOR (2-3% of cells, rare tech accents) ──────────────
      // Visual: subtle circuit/tech pattern — thematic accent
      floorDecor: [
        "/sprites/maps/lighting/floor/alternate/sprite_0018.png",  // blue diamond circuit
      ],

      // ─── LEGACY FIELDS (not used by new renderer, kept for type compat) ─
      // sprite_0009 = circuit grid (too intense for floor variation)
      // sprite_0024 = blue circle symbol (decoration prop, NOT floor)
      floorAlternate: [
        "/sprites/maps/lighting/floor/alternate/sprite_0009.png",
        "/sprites/maps/lighting/floor/alternate/sprite_0018.png",
      ],
      floorSpecial: [
        "/sprites/maps/lighting/floor/special/sprite_0024.png",  // decorative prop
        "/sprites/maps/lighting/floor/special/sprite_0034.png",
      ],
      floorCracked: [
        "/sprites/maps/lighting/floor/cracked/sprite_0023.png",
        "/sprites/maps/lighting/floor/cracked/sprite_0025.png",
      ],

      walls: {
        // ─── WALL SPRITE GUIDE ─────────────────────────────────────────
        // sprite_0029.png = 3x3 dark stone slab grid  → HORIZONTAL surface (top/bottom border)
        // sprite_0056.png = vertical T-pillar shape    → VERTICAL surface (left/right border)
        // sprite_0032.png = 3x3 blue-dark stone slab  → compatible with horizontal
        // sprite_0012.png = 3x3 dark stone slab       → compatible with horizontal

        // HORIZONTAL: used for walls that form the N/S borders of rooms
        // (the wall tile has floor BELOW it = top border, or floor ABOVE = bottom border)
        horizontal: ["/sprites/maps/lighting/walls/horizontal/sprite_0029.png"],

        // VERTICAL: used for walls that form the E/W borders of rooms
        vertical: ["/sprites/maps/lighting/walls/vertical/sprite_0056.png"],

        // TOP: wall that sits at the top of a room (floor is SOUTH of this tile)
        // Visually this is a horizontal slab — use horizontal sprite
        top: ["/sprites/maps/lighting/walls/horizontal/sprite_0029.png"],

        // BOTTOM: wall that sits at the bottom of a room (floor is NORTH of this tile)
        // Also horizontal
        bottom: ["/sprites/maps/lighting/walls/horizontal/sprite_0029.png"],

        // LEFT: wall forming the left border (floor is to the EAST)
        // sprite_0032 visually is a stone slab — use as left border
        left: ["/sprites/maps/lighting/walls/left/sprite_0032.png"],

        // RIGHT: wall forming the right border (floor is to the WEST)
        right: ["/sprites/maps/lighting/walls/right/sprite_0012.png"],

        // SPECIAL: decorative wall accents — neon conduits, tech panels etc.
        // Used sparingly (1-2 per room max) on interior wall faces
        special: [
          "/sprites/maps/lighting/walls/special/sprite_0002.png",
          "/sprites/maps/lighting/walls/special/sprite_0003.png",
          "/sprites/maps/lighting/walls/special/sprite_0006.png",
          "/sprites/maps/lighting/walls/special/sprite_0011.png",
          "/sprites/maps/lighting/walls/special/sprite_0013.png",
          "/sprites/maps/lighting/walls/special/sprite_0015.png",
          "/sprites/maps/lighting/walls/special/sprite_0016.png",
          "/sprites/maps/lighting/walls/special/sprite_0017.png",
          "/sprites/maps/lighting/walls/special/sprite_0033.png",
          "/sprites/maps/lighting/walls/special/sprite_0035.png",
        ],
      },
      doors: {
        verticalClosed: "/sprites/maps/lighting/doors/vertical/sprite_0038.png",
        verticalOpen: "/sprites/maps/lighting/doors/vertical/sprite_0042.png",
      },
      chests: {
        closed: [
          "/sprites/maps/lighting/interactables/chest/closed/sprite_0047.png",
          "/sprites/maps/lighting/interactables/chest/closed/sprite_0048.png",
          "/sprites/maps/lighting/interactables/chest/closed/sprite_0070.png",
        ],
        open: [
          "/sprites/maps/lighting/interactables/chest/open/sprite_0044.png",
          "/sprites/maps/lighting/interactables/chest/open/sprite_0045.png",
          "/sprites/maps/lighting/interactables/chest/open/sprite_0050.png",
        ],
      },
    },
  },
  fire: {
    id: "fire",
    name: "Câmara de Magma Digital",
    basePath: "/sprites/maps/fire/",
    enabled: false, // Spritesheet not sliced yet
    biome: "fire",
    wallRimColor: 0xff4400,
    floorTint: 0xffccaa,
    tiles: {
      floorNormal: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
      floorVariation: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
      floorDecor: [],
      floorAlternate: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
      floorSpecial: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
      floorCracked: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
      walls: {
        horizontal: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
        vertical: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
        top: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
        bottom: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
        left: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
        right: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
        special: ["/sprites/maps/fire/floor/cracked/floor_cracked_01.png"],
      },
      doors: {
        verticalClosed: "/sprites/maps/lighting/doors/vertical/sprite_0038.png",
        verticalOpen: "/sprites/maps/lighting/doors/vertical/sprite_0042.png",
      },
      chests: {
        closed: ["/sprites/maps/lighting/interactables/chest/closed/sprite_0047.png"],
        open: ["/sprites/maps/lighting/interactables/chest/open/sprite_0044.png"],
      },
    },
  },
  ice: {
    id: "ice",
    name: "Glaciar de Subzero",
    basePath: "/sprites/maps/ice/",
    enabled: false, // Spritesheet not sliced yet
    biome: "ice",
    wallRimColor: 0x66ccff,
    floorTint: 0xddf0ff,
    tiles: {
      floorNormal: ["/sprites/maps/ice/floor/normal/floor_normal_01.png"],
      floorVariation: ["/sprites/maps/ice/floor/special/floor_special_01.png"],
      floorDecor: [],
      floorAlternate: ["/sprites/maps/ice/floor/special/floor_special_01.png"],
      floorSpecial: ["/sprites/maps/ice/floor/special/floor_special_01.png"],
      floorCracked: ["/sprites/maps/ice/floor/normal/floor_normal_01.png"],
      walls: {
        horizontal: ["/sprites/maps/ice/floor/normal/floor_normal_01.png"],
        vertical: ["/sprites/maps/ice/floor/normal/floor_normal_01.png"],
        top: ["/sprites/maps/ice/floor/normal/floor_normal_01.png"],
        bottom: ["/sprites/maps/ice/floor/normal/floor_normal_01.png"],
        left: ["/sprites/maps/ice/floor/normal/floor_normal_01.png"],
        right: ["/sprites/maps/ice/floor/normal/floor_normal_01.png"],
        special: ["/sprites/maps/ice/floor/special/floor_special_01.png"],
      },
      doors: {
        verticalClosed: "/sprites/maps/lighting/doors/vertical/sprite_0038.png",
        verticalOpen: "/sprites/maps/lighting/doors/vertical/sprite_0042.png",
      },
      chests: {
        closed: ["/sprites/maps/lighting/interactables/chest/closed/sprite_0047.png"],
        open: ["/sprites/maps/lighting/interactables/chest/open/sprite_0044.png"],
      },
    },
  },
  tech: {
    id: "tech",
    name: "Laboratório Cyber Core",
    basePath: "/sprites/maps/tech/",
    enabled: false, // Walls not sliced yet
    biome: "digital",
    wallRimColor: 0x39ff14,
    accentTint: 0x70ff70,
    tiles: {
      floorNormal: ["/sprites/maps/lighting/floor/normal/sprite_0005.png"],
      floorVariation: ["/sprites/maps/lighting/floor/special/sprite_0034.png"],
      floorDecor: ["/sprites/maps/lighting/floor/alternate/sprite_0018.png"],
      floorAlternate: ["/sprites/maps/lighting/floor/alternate/sprite_0009.png"],
      floorSpecial: ["/sprites/maps/lighting/floor/special/sprite_0024.png"],
      floorCracked: ["/sprites/maps/lighting/floor/cracked/sprite_0023.png"],
      walls: {
        horizontal: ["/sprites/maps/lighting/walls/horizontal/sprite_0029.png"],
        vertical: ["/sprites/maps/lighting/walls/vertical/sprite_0056.png"],
        top: ["/sprites/maps/lighting/walls/horizontal/sprite_0029.png"],
        bottom: ["/sprites/maps/lighting/walls/horizontal/sprite_0029.png"],
        left: ["/sprites/maps/lighting/walls/left/sprite_0032.png"],
        right: ["/sprites/maps/lighting/walls/right/sprite_0012.png"],
        special: ["/sprites/maps/lighting/walls/special/sprite_0002.png"],
      },
      doors: {
        verticalClosed: "/sprites/maps/lighting/doors/vertical/sprite_0038.png",
        verticalOpen: "/sprites/maps/lighting/doors/vertical/sprite_0042.png",
      },
      chests: {
        closed: ["/sprites/maps/lighting/interactables/chest/closed/sprite_0047.png"],
        open: ["/sprites/maps/lighting/interactables/chest/open/sprite_0044.png"],
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
