import { RunRNG } from "./rng";
import { type MapThemeConfig, type MapThemeId, pickRandomTheme, getMapTheme } from "./map-themes";
import { getBossForFloor, getMiniBossForFloor } from "../combat/bosses";

export type Tile = "floor" | "wall";
export type RoomKind = "start" | "combat" | "treasure" | "elite" | "boss" | "event" | "rest" | "shop" | "miniboss";
export type BiomeKind = "digital" | "fire" | "ice" | "storm" | "dark";

export type RoomShape =
  | "arena"
  | "corridor"
  | "cross"
  | "L_shape"
  | "T_shape"
  | "open"
  | "compact"
  | "multi_room"
  | "asymmetric"
  | "winding"
  | "chokepoint"
  | "central_arena"
  // Legacy aliases
  | "rectangle"
  | "L"
  | "T"
  | "U"
  | "pillars_arena"
  | "central_island"
  | "divided_chambers";

export type RoomSizeCategory = "small" | "medium" | "large" | "arena";

export type EnemyKind = "melee" | "ranged" | "elite" | "boss" | "miniboss" | "bug" | "beast";

export type EnemySpawn = Readonly<{
  id: string;
  name: string;
  kind: EnemyKind;
  digimon?: string;
  tileX: number;
  tileY: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  xpReward: number;
  coinReward: number;
  level?: number;
}>;

export type PropType = "chest" | "healing_node" | "monolith" | "event_terminal" | "shop_terminal" | "rest_site";

export type PropSpawn = Readonly<{
  id: string;
  type: PropType;
  tileX: number;
  tileY: number;
}>;

export type RoomNode = Readonly<{
  id: string;
  kind: RoomKind;
  shape: RoomShape;
  sizeCategory: RoomSizeCategory;
  x: number;
  y: number;
  width: number;
  height: number;
}>;

export type RoomEdge = Readonly<{
  from: string;
  to: string;
  width: number;
  isLoop?: boolean;
}>;

export type DungeonGraph = Readonly<{
  nodes: readonly RoomNode[];
  edges: readonly RoomEdge[];
  hasLoops: boolean;
  hasDeadEnds: boolean;
}>;

export type ClusterType = "rubble" | "crystal" | "energy" | "tech" | "hazard" | "structure";
export type RoomZoneType = "spawn_zone" | "combat_zone" | "treasure_zone" | "hazard_zone" | "landmark_zone" | "exit_zone";

export type EnvironmentCluster = Readonly<{
  id: string;
  type: ClusterType;
  zone: RoomZoneType;
  centerX: number;
  centerY: number;
  tiles: readonly { x: number; y: number; role?: string }[];
}>;

export type EnvironmentLandmark = Readonly<{
  id: string;
  name: string;
  tileX: number;
  tileY: number;
  size: { width: number; height: number };
}>;

export type RoomData = Readonly<{
  id: string;
  index: number;
  kind: RoomKind;
  title: string;
  biome: BiomeKind;
  theme?: MapThemeId;
  floor: number;
  width: number;
  height: number;
  tiles: readonly Tile[][];
  spawn: Readonly<{ x: number; y: number }>;
  exit: Readonly<{ x: number; y: number }>;
  enemies: readonly EnemySpawn[];
  props: readonly PropSpawn[];
  shape?: RoomShape;
  graph?: DungeonGraph;
  clusters?: readonly EnvironmentCluster[];
  landmark?: EnvironmentLandmark;
  emptySpaceRatio?: number;
  budgetUsed?: number;
}>;

export type RunDefinition = Readonly<{
  runId: string;
  seed: number;
  floor: number;
  totalRooms: number;
  theme: MapThemeConfig;
  rooms: readonly RoomData[];
}>;

// Legacy compatibility types
export type Room = Readonly<{
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  kind: RoomKind;
  depth: number;
}>;

export type DungeonMap = Readonly<{
  seed: number;
  width: number;
  height: number;
  tiles: readonly Tile[][];
  rooms: readonly Room[];
  start: Readonly<{ x: number; y: number }>;
  exit: Readonly<{ x: number; y: number }>;
  run: RunDefinition;
}>;

export type DungeonConfig = Readonly<{
  width?: number;
  height?: number;
  roomCount?: number;
}>;

export const MAP_CONFIG = {
  sizeMultiplier: 1.15,
  baseWidth: 24,
  baseHeight: 16,
  minRoomWidth: 20,
  maxRoomWidth: 34,
  minRoomHeight: 14,
  maxRoomHeight: 22,
  minCorridorWidth: 1,
  maxCorridorWidth: 3,
  loopChance: 0.35,
  deadEndChance: 0.25,
  irregularRoomChance: 0.50,
  obstacleDensity: 0.07,
  maxGenerationAttempts: 15,
  roomSizeCategories: {
    small: { width: 20, height: 14 },
    medium: { width: 28, height: 18 },
    large: { width: 34, height: 22 },
    arena: { width: 36, height: 24 },
  },
  environmentBudget: {
    small: 8,
    medium: 15,
    large: 25,
    arena: 35,
  },
} as const;

export const BIOME_CONFIG: Record<BiomeKind, { name: string; ambientColor: string; description: string }> = {
  digital: {
    name: "Setor Digital",
    ambientColor: "#00f0ff",
    description: "Placas de circuito e dados estáveis",
  },
  fire: {
    name: "Fenda Vulcânica",
    ambientColor: "#ff5500",
    description: "Rochas escuras e fendas de magma ativo",
  },
  ice: {
    name: "Glaciar de Dados",
    ambientColor: "#88ddff",
    description: "Cristais de gelo comprimido e dados congelados",
  },
  storm: {
    name: "Domínio da Tempestade",
    ambientColor: "#ffcc00",
    description: "Descargas elétricas e condutores de alta voltagem",
  },
  dark: {
    name: "Núcleo Mecânico Sombrio",
    ambientColor: "#aa00ff",
    description: "Setor corrompido de altíssima densidade de dados",
  },
};

export const MAX_LEVEL = 300;
export const BOSS_INTERVAL = 10;
export const MINIBOSS_INTERVAL = 10;
export const MINIBOSS_OFFSET = 5;

export const TOTAL_ROOMS = MAX_LEVEL;

export const BOSS_ROOMS = Array.from(
  { length: Math.floor(MAX_LEVEL / BOSS_INTERVAL) },
  (_, i) => (i + 1) * BOSS_INTERVAL
) as readonly number[];

export const MINIBOSS_ROOMS = Array.from(
  { length: Math.floor(MAX_LEVEL / MINIBOSS_INTERVAL) },
  (_, i) => i * MINIBOSS_INTERVAL + MINIBOSS_OFFSET
) as readonly number[];

export const CHEST_ROOMS = Array.from(
  { length: Math.floor(MAX_LEVEL / 10) },
  (_, i) => i * 10 + 3
) as readonly number[];

/**
 * Strict Depth/Layer hierarchy to ensure proper visual stacking:
 * BACKGROUND (0)
 * -> FLOOR (1)
 * -> FLOOR_DECOR (2)
 * -> FLOOR_HAZARD (3)
 * -> SPAWN_RING (4)
 * -> LOW_PROPS / PROPS_SHADOW (5-8)
 * -> ENTITIES: Player, Enemies, Bosses, Chests, Props (10)
 * -> ENTITIES_OVERLAY: Healthbars, Prompts, Badges (11)
 * -> WALL_BASE: Lower wall body behind entities (2)
 * -> WALL_FOREGROUND: Overhead rims, tall pillars that occlude heads (15)
 * -> PROJECTILES (22)
 * -> VFX: Slashes, impacts, heals, explosions (25)
 * -> FLOATING_TEXT: Damage numbers, popups (30)
 * -> HUD / UI (40)
 */
export const RENDER_DEPTH = {
  BACKGROUND: 0,
  FLOOR: 1,
  FLOOR_DECOR: 2,
  FLOOR_HAZARD: 3,
  SPAWN_RING: 4,
  LOW_PROPS: 5,
  PROPS_SHADOW: 8,
  ENTITIES: 10,
  ENTITIES_OVERLAY: 11,
  WALL_BASE: 2,
  WALL_FOREGROUND: 15,
  PROJECTILES: 22,
  VFX: 25,
  FLOATING_TEXT: 30,
  HUD: 40,
} as const;

export function getRoomKind(roomNumber: number): RoomKind {
  if (roomNumber % BOSS_INTERVAL === 0) return "boss";
  if (roomNumber % MINIBOSS_INTERVAL === MINIBOSS_OFFSET) return "miniboss";

  const mod = roomNumber % 10;
  if (mod === 7) return "elite";
  if (mod === 3) return Math.floor(roomNumber / 10) % 2 === 0 ? "treasure" : "event";
  if (mod === 8) return Math.floor(roomNumber / 10) % 2 === 0 ? "rest" : "shop";
  if (mod === 2 && roomNumber % 20 === 12) return "treasure";
  return "combat";
}

export function calculateEnemyCount(
  roomNumber: number,
  sizeCategory: RoomSizeCategory,
  rng: RunRNG
): number {
  if (roomNumber % BOSS_INTERVAL === 0) {
    return 1;
  }
  if (roomNumber % MINIBOSS_INTERVAL === MINIBOSS_OFFSET) {
    return 1;
  }

  let minCount = 3;
  let maxCount = 5;

  if (roomNumber >= 150) {
    minCount = 5;
    maxCount = 9;
  } else if (roomNumber >= 50) {
    minCount = 4;
    maxCount = 7;
  } else {
    minCount = 3;
    maxCount = 5;
  }

  if (sizeCategory === "small") {
    minCount = Math.max(2, minCount - 1);
    maxCount = Math.max(3, maxCount - 1);
  } else if (sizeCategory === "large") {
    minCount += 1;
    maxCount += 1;
  }

  return rng.int(minCount, maxCount);
}

export function calculateEnemyStats(
  baseHp: number,
  baseAtk: number,
  baseDef: number,
  baseSpeed: number,
  baseCooldown: number,
  baseXp: number,
  baseCoins: number,
  roomNumber: number,
  isBoss: boolean = false,
  isMiniBoss: boolean = false
) {
  const level = Math.max(1, Math.min(MAX_LEVEL, roomNumber));
  const hpMultiplier = isBoss ? 3.5 : isMiniBoss ? 2.2 : 1.0;
  const statScale = 1 + (level - 1) * 0.055;

  const hp = Math.round(baseHp * statScale * hpMultiplier);
  const attack = Math.round(baseAtk * (1 + (level - 1) * 0.04));
  const defense = Math.round(baseDef * (1 + (level - 1) * 0.035));
  const speed = Math.min(180, Math.round(baseSpeed * (1 + (level - 1) * 0.01)));
  const attackCooldown = Math.max(700, Math.round(baseCooldown * (1 - (level - 1) * 0.002)));
  const xpReward = Math.round(baseXp * (1 + (level - 1) * 0.08));
  const coinReward = Math.round(baseCoins * (1 + (level - 1) * 0.05));

  return {
    level,
    hp,
    maxHp: hp,
    attack,
    defense,
    speed,
    attackCooldown,
    xpReward,
    coinReward,
  };
}

export function findValidSpawnTile(room: RoomData): { x: number; y: number } {
  if (room.spawn && room.tiles[room.spawn.y]?.[room.spawn.x] === "floor") {
    return room.spawn;
  }
  for (let y = 1; y < room.height - 1; y++) {
    for (let x = 1; x < room.width - 1; x++) {
      if (room.tiles[y][x] === "floor") {
        return { x, y };
      }
    }
  }
  return { x: 1, y: 1 };
}

export function isPathConnected(
  tiles: readonly Tile[][],
  start: { x: number; y: number },
  end: { x: number; y: number },
  actualWidth: number,
  actualHeight: number
): boolean {
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

function createSafeFallbackRoom(
  id: string,
  index: number,
  kind: RoomKind,
  title: string,
  biome: BiomeKind,
  floor: number,
  width: number = MAP_CONFIG.roomSizeCategories.medium.width,
  height: number = MAP_CONFIG.roomSizeCategories.medium.height,
  themeId: MapThemeId = "lighting"
): RoomData {
  const tiles: Tile[][] = Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) =>
      x === 0 || x === width - 1 || y === 0 || y === height - 1 ? "wall" : "floor"
    )
  );

  const spawn = { x: 3, y: Math.floor(height / 2) };
  const exit = { x: width - 4, y: Math.floor(height / 2) };

  return {
    id,
    index,
    kind,
    title,
    biome,
    theme: themeId,
    floor,
    width,
    height,
    tiles,
    spawn,
    exit,
    enemies: [],
    props: [],
    shape: "arena",
    emptySpaceRatio: 0.85,
    budgetUsed: 0,
  };
}

function carveCorridor(
  tiles: Tile[][],
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  corridorWidth: number,
  maxWidth: number,
  maxHeight: number
) {
  const half = Math.floor(corridorWidth / 2);

  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  for (let x = minX; x <= maxX; x++) {
    for (let w = -half; w <= half; w++) {
      const cy = y1 + w;
      if (cy > 0 && cy < maxHeight - 1 && x > 0 && x < maxWidth - 1) {
        tiles[cy][x] = "floor";
      }
    }
  }

  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  for (let y = minY; y <= maxY; y++) {
    for (let w = -half; w <= half; w++) {
      const cx = x2 + w;
      if (cx > 0 && cx < maxWidth - 1 && y > 0 && y < maxHeight - 1) {
        tiles[y][cx] = "floor";
      }
    }
  }
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

/**
 * Generates a single procedural room/level with guaranteed spawn -> exit connectivity,
 * 12 room archetypes, microareas, semantic environment clusters, landmarks,
 * environment budget control and validated BFS reachability.
 */
export function generateSingleRoom(
  id: string,
  index: number,
  kind: RoomKind,
  seed: number,
  biome: BiomeKind = "digital",
  floor: number = 1,
  customWidth?: number,
  customHeight?: number,
  themeId: MapThemeId = "lighting"
): RoomData {
  const rng = new RunRNG(seed ^ (index * 7919) ^ (floor * 3571));

  // Determine size category and dimensions
  let sizeCategory: RoomSizeCategory = "medium";
  if (kind === "boss") {
    sizeCategory = "arena";
  } else if (kind === "miniboss") {
    sizeCategory = rng.chance(0.5) ? "large" : "arena";
  } else if (kind === "treasure" || kind === "rest") {
    sizeCategory = rng.chance(0.6) ? "small" : "medium";
  } else if (kind === "elite") {
    sizeCategory = "large";
  } else {
    sizeCategory = rng.pick(["small", "medium", "large"] as const);
  }

  const baseDimensions = MAP_CONFIG.roomSizeCategories[sizeCategory];
  const width = customWidth ?? baseDimensions.width;
  const height = customHeight ?? baseDimensions.height;

  // Decide 12 Room Archetypes
  let shape: RoomShape = "arena";
  if (kind === "boss") {
    shape = "arena";
  } else if (kind === "miniboss") {
    shape = rng.pick(["arena", "central_arena", "cross", "open"] as const);
  } else if (rng.chance(MAP_CONFIG.irregularRoomChance)) {
    shape = rng.pick([
      "arena",
      "corridor",
      "cross",
      "L_shape",
      "T_shape",
      "open",
      "compact",
      "multi_room",
      "asymmetric",
      "winding",
      "chokepoint",
      "central_arena",
    ] as const);
  } else {
    shape = "arena";
  }

  const roomTitles: Record<RoomKind, string> = {
    start: "Portal de Entrada",
    combat: `Setor de Segurança 0${index + 1}`,
    treasure: "Câmara de Suprimentos",
    elite: "Portão da Sentinela de Elite",
    event: "Terminal de Dados Antigo",
    rest: "Nó de Regeneração",
    shop: "Mercador Digital",
    miniboss: `Arena do Guardião Intermediário (Andar ${floor})`,
    boss:
      floor === 10
        ? "Covil de Kuwagamon"
        : floor === 20
        ? "Cratera do Meramon Incandescente"
        : floor === 30
        ? "Abismo de Seadramon"
        : floor === 40
        ? "Usina de MetalEtemon"
        : floor === 50
        ? "Núcleo de BlackWarGreymon (Chefe Final)"
        : `Arena do Guardião Supremo (Andar ${floor})`,
  };

  const hasLoop = rng.chance(MAP_CONFIG.loopChance);
  const hasDeadEnd = rng.chance(MAP_CONFIG.deadEndChance);

  for (let attempt = 1; attempt <= MAP_CONFIG.maxGenerationAttempts; attempt += 1) {
    // 1. Initialize all as wall
    const tiles: Tile[][] = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => "wall" as Tile)
    );

    // 2. Define spawn and exit points
    const spawn = { x: 3, y: Math.floor(height / 2) };
    const exit = { x: width - 4, y: Math.floor(height / 2) };

    // 3. Carve room based on 12 Archetypes
    if (shape === "arena" || (shape as string) === "rectangle" || kind === "boss") {
      // Spacious arena with clean open combat floor
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          tiles[y][x] = "floor";
        }
      }
    } else if (shape === "corridor") {
      // Long central corridor with tactical side alcoves
      const cy = Math.floor(height / 2);
      for (let y = cy - 2; y <= cy + 2; y++) {
        for (let x = 1; x < width - 1; x++) tiles[y][x] = "floor";
      }
      // Add 2 side alcoves
      const alcoveX1 = Math.floor(width * 0.3);
      const alcoveX2 = Math.floor(width * 0.7);
      for (let y = 1; y < height - 1; y++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (alcoveX1 + dx > 0 && alcoveX1 + dx < width - 1) tiles[y][alcoveX1 + dx] = "floor";
          if (alcoveX2 + dx > 0 && alcoveX2 + dx < width - 1) tiles[y][alcoveX2 + dx] = "floor";
        }
      }
    } else if (shape === "cross") {
      // Cross (+) shape: central horizontal + central vertical bands
      const hStartY = Math.floor(height * 0.25);
      const hEndY = Math.floor(height * 0.75);
      const vStartX = Math.floor(width * 0.25);
      const vEndX = Math.floor(width * 0.75);
      for (let y = hStartY; y < hEndY; y++) {
        for (let x = 1; x < width - 1; x++) tiles[y][x] = "floor";
      }
      for (let y = 1; y < height - 1; y++) {
        for (let x = vStartX; x < vEndX; x++) tiles[y][x] = "floor";
      }
    } else if (shape === "L_shape" || (shape as string) === "L") {
      // L shape: horizontal lower section + vertical left section
      const splitY = Math.floor(height * 0.45);
      const splitX = Math.floor(width * 0.55);
      for (let y = splitY; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) tiles[y][x] = "floor";
      }
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < splitX; x++) tiles[y][x] = "floor";
      }
    } else if (shape === "T_shape" || (shape as string) === "T") {
      // T shape: top horizontal bar + center vertical stem
      const barHeight = Math.floor(height * 0.5);
      const stemLeft = Math.floor(width * 0.25);
      const stemRight = Math.floor(width * 0.75);
      for (let y = 1; y < barHeight; y++) {
        for (let x = 1; x < width - 1; x++) tiles[y][x] = "floor";
      }
      for (let y = 1; y < height - 1; y++) {
        for (let x = stemLeft; x < stemRight; x++) tiles[y][x] = "floor";
      }
    } else if (shape === "open" || (shape as string) === "pillars_arena") {
      // Wide open room with distributed tactical pillars
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) tiles[y][x] = "floor";
      }
      const pCols = [Math.floor(width * 0.28), Math.floor(width * 0.72) - 1];
      const pRows = [Math.floor(height * 0.3), Math.floor(height * 0.7) - 1];
      for (const py of pRows) {
        for (const px of pCols) {
          for (let dy = 0; dy < 2; dy++) {
            for (let dx = 0; dx < 2; dx++) {
              if (py + dy > 1 && py + dy < height - 2 && px + dx > 1 && px + dx < width - 2) {
                tiles[py + dy][px + dx] = "wall";
              }
            }
          }
        }
      }
    } else if (shape === "compact") {
      // Tighter active arena
      const padY = Math.max(1, Math.floor(height * 0.15));
      const padX = Math.max(1, Math.floor(width * 0.1));
      for (let y = padY; y < height - padY; y++) {
        for (let x = padX; x < width - padX; x++) tiles[y][x] = "floor";
      }
    } else if (shape === "multi_room" || (shape as string) === "divided_chambers") {
      // Two chambers connected by a wide passage
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) tiles[y][x] = "floor";
      }
      const midX = Math.floor(width / 2);
      const doorY = Math.floor(height / 2);
      for (let y = 1; y < height - 1; y++) {
        if (Math.abs(y - doorY) > 1) {
          tiles[y][midX] = "wall";
        }
      }
    } else if (shape === "asymmetric") {
      // Organic irregular hall
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) tiles[y][x] = "floor";
      }
      // Indent top-left and bottom-right
      for (let y = 1; y < Math.floor(height * 0.4); y++) {
        for (let x = 1; x < Math.floor(width * 0.25); x++) tiles[y][x] = "wall";
      }
      for (let y = Math.floor(height * 0.65); y < height - 1; y++) {
        for (let x = Math.floor(width * 0.75); x < width - 1; x++) tiles[y][x] = "wall";
      }
    } else if (shape === "winding") {
      // S-curved winding hall
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) tiles[y][x] = "floor";
      }
      const midX = Math.floor(width / 2);
      const h3 = Math.floor(height / 3);
      for (let y = 1; y < h3 * 2; y++) tiles[y][Math.floor(midX * 0.7)] = "wall";
      for (let y = h3; y < height - 1; y++) tiles[y][Math.floor(midX * 1.3)] = "wall";
    } else if (shape === "chokepoint") {
      // Two wide rooms with narrow central chokepoint
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) tiles[y][x] = "floor";
      }
      const midX = Math.floor(width / 2);
      const cy = Math.floor(height / 2);
      for (let y = 1; y < height - 1; y++) {
        if (Math.abs(y - cy) > 1) {
          tiles[y][midX] = "wall";
          tiles[y][midX - 1] = "wall";
        }
      }
    } else if (shape === "central_arena" || shape === "central_island") {
      // Arena with a central obstacle structure forcing circular movement
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) tiles[y][x] = "floor";
      }
      const cx = Math.floor(width / 2);
      const cy = Math.floor(height / 2);
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -2; dx <= 1; dx++) {
          tiles[cy + dy][cx + dx] = "wall";
        }
      }
    }

    // Ensure spawn & exit are carved with surrounding safety margins
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const sx = spawn.x + dx;
        const sy = spawn.y + dy;
        if (sx > 0 && sx < width - 1 && sy > 0 && sy < height - 1) tiles[sy][sx] = "floor";

        const ex = exit.x + dx;
        const ey = exit.y + dy;
        if (ex > 0 && ex < width - 1 && ey > 0 && ey < height - 1) tiles[ey][ex] = "floor";
      }
    }

    // Connect spawn and exit if not already connected by shape
    const corridorWidth = rng.int(MAP_CONFIG.minCorridorWidth, MAP_CONFIG.maxCorridorWidth);
    if (!isPathConnected(tiles, spawn, exit, width, height)) {
      carveCorridor(tiles, spawn.x, spawn.y, exit.x, exit.y, corridorWidth, width, height);
    }

    // 4. Add Loops
    if (hasLoop && kind !== "boss" && kind !== "miniboss") {
      const loopCorridorWidth = rng.int(1, 2);
      const upperY = Math.max(2, Math.floor(height * 0.22));
      const lowerY = Math.min(height - 3, Math.floor(height * 0.78));
      const midX = Math.floor(width / 2);

      carveCorridor(tiles, spawn.x, spawn.y, midX, upperY, loopCorridorWidth, width, height);
      carveCorridor(tiles, midX, upperY, exit.x, exit.y, loopCorridorWidth, width, height);

      carveCorridor(tiles, spawn.x, spawn.y, midX, lowerY, loopCorridorWidth, width, height);
      carveCorridor(tiles, midX, lowerY, exit.x, exit.y, loopCorridorWidth, width, height);
    }

    // 5. Add Dead-End pockets / Alcoves for exploration
    let deadEndPropX = -1;
    let deadEndPropY = -1;
    if (hasDeadEnd && kind !== "boss" && kind !== "miniboss") {
      const branchX = rng.int(6, width - 8);
      const isBranchUp = rng.chance(0.5);
      const pocketY = isBranchUp ? 2 : height - 3;

      carveCorridor(tiles, branchX, spawn.y, branchX, pocketY, 2, width, height);
      for (let py = Math.max(1, pocketY - 1); py <= Math.min(height - 2, pocketY + 1); py++) {
        for (let px = Math.max(1, branchX - 1); px <= Math.min(width - 2, branchX + 1); px++) {
          tiles[py][px] = "floor";
        }
      }
      deadEndPropX = branchX;
      deadEndPropY = pocketY;
    }

    // 6. Define COMBAT_NAVIGATION_MASK
    const combatNavMask = new Set<string>();
    for (let dy = -3; dy <= 3; dy++) {
      for (let dx = -3; dx <= 3; dx++) {
        combatNavMask.add(`${spawn.x + dx},${spawn.y + dy}`);
        combatNavMask.add(`${exit.x + dx},${exit.y + dy}`);
      }
    }
    // Main route line from spawn to exit
    const midY = Math.floor(height / 2);
    for (let x = spawn.x; x <= exit.x; x++) {
      for (let dy = -1; dy <= 1; dy++) {
        combatNavMask.add(`${x},${midY + dy}`);
      }
    }

    // 7. Validate initial BFS reachability for spawn -> exit
    const reachableTiles = findReachableFloorTiles(tiles, spawn, width, height);
    const exitReachable = reachableTiles.some((t) => t.x === exit.x && t.y === exit.y);

    if (exitReachable && reachableTiles.length >= 25) {
      // 8. Environment Budget and Semantic Clusters
      const budgetMax = MAP_CONFIG.environmentBudget[sizeCategory] || 15;
      let budgetUsed = 0;
      const clusters: EnvironmentCluster[] = [];
      let landmark: EnvironmentLandmark | undefined = undefined;

      // Place Landmark in Boss, Arena, or Event rooms
      if (kind === "boss" || kind === "event" || sizeCategory === "arena") {
        const lmX = Math.floor(width / 2);
        const lmY = Math.max(2, Math.floor(height * 0.22));
        landmark = {
          id: `${id}_landmark`,
          name: kind === "boss" ? "Altar do Guardião" : "Reator de Dados",
          tileX: lmX,
          tileY: lmY,
          size: { width: 2, height: 2 },
        };
        budgetUsed += 7;
      }

      // Generate Semantic Clusters (rubble, crystal, tech, energy, hazard)
      const numClusters = Math.min(4, Math.floor((budgetMax - budgetUsed) / 3));
      const availableClusterTiles = reachableTiles.filter(
        (t) =>
          !combatNavMask.has(`${t.x},${t.y}`) &&
          Math.hypot(t.x - spawn.x, t.y - spawn.y) >= 4 &&
          Math.hypot(t.x - exit.x, t.y - exit.y) >= 4
      );

      const clusterTypes: ClusterType[] =
        themeId === "fire"
          ? ["rubble", "hazard", "structure"]
          : themeId === "ice"
          ? ["crystal", "hazard", "structure"]
          : themeId === "tech"
          ? ["tech", "energy", "structure"]
          : ["energy", "rubble", "hazard"];

      for (let c = 0; c < numClusters && availableClusterTiles.length > 0; c++) {
        const cTile = rng.pick(availableClusterTiles);
        const cType = rng.pick(clusterTypes);
        const clusterTiles = [
          { x: cTile.x, y: cTile.y, role: "center" },
          { x: cTile.x + 1, y: cTile.y, role: "accent" },
          { x: cTile.x, y: cTile.y + 1, role: "accent" },
        ].filter((t) => t.x < width - 1 && t.y < height - 1 && tiles[t.y]?.[t.x] === "floor");

        clusters.push({
          id: `${id}_cluster_${c + 1}`,
          type: cType,
          zone: cType === "hazard" ? "hazard_zone" : "combat_zone",
          centerX: cTile.x,
          centerY: cTile.y,
          tiles: clusterTiles,
        });
        budgetUsed += 3;
      }

      // Calculate emptySpaceRatio
      const totalTiles = width * height;
      const floorCount = reachableTiles.length;
      const emptySpaceRatio = Number((floorCount / totalTiles).toFixed(2));

      // 9. Place Props safely on strictly REACHABLE tiles outside combat navigation mask
      const props: PropSpawn[] = [];
      const idealCenterX = Math.floor(width / 2);
      const idealCenterY = Math.floor(height / 2);
      const sortedForProp = reachableTiles
        .filter((t) => Math.hypot(t.x - spawn.x, t.y - spawn.y) >= 4 && Math.hypot(t.x - exit.x, t.y - exit.y) >= 3)
        .sort((a, b) => Math.hypot(a.x - idealCenterX, a.y - idealCenterY) - Math.hypot(b.x - idealCenterX, b.y - idealCenterY));
      const centerPropTile = sortedForProp[0] || { x: idealCenterX, y: idealCenterY };

      if (kind === "treasure" || (floor % 10 === 3 && floor % 20 === 3)) {
        props.push({
          id: `${id}_chest_1`,
          type: "chest",
          tileX: centerPropTile.x,
          tileY: centerPropTile.y,
        });
      } else if (kind === "event") {
        props.push({
          id: `${id}_event_terminal`,
          type: "event_terminal",
          tileX: centerPropTile.x,
          tileY: centerPropTile.y,
        });
      } else if (kind === "rest") {
        props.push({
          id: `${id}_rest_site`,
          type: "rest_site",
          tileX: centerPropTile.x,
          tileY: centerPropTile.y,
        });
      } else if (kind === "shop") {
        props.push({
          id: `${id}_shop_terminal`,
          type: "shop_terminal",
          tileX: centerPropTile.x,
          tileY: centerPropTile.y,
        });
      }

      if (kind === "miniboss") {
        const mbChestTile = sortedForProp[sortedForProp.length - 1] || { x: exit.x - 2, y: exit.y };
        props.push({
          id: `${id}_miniboss_chest`,
          type: "chest",
          tileX: mbChestTile.x,
          tileY: mbChestTile.y,
        });
      }

      if (deadEndPropX > 0 && deadEndPropY > 0 && props.length === 0 && kind !== "boss" && kind !== "miniboss") {
        if (reachableTiles.some((t) => t.x === deadEndPropX && t.y === deadEndPropY)) {
          props.push({
            id: `${id}_pocket_chest`,
            type: "chest",
            tileX: deadEndPropX,
            tileY: deadEndPropY,
          });
        }
      }

      // 10. Place Enemies on strictly REACHABLE tiles
      const enemies: EnemySpawn[] = [];
      if (kind === "boss") {
        const bossDef = getBossForFloor(floor, biome);
        const bossStats = calculateEnemyStats(
          bossDef.baseHp,
          bossDef.attackDamage,
          bossDef.defense,
          bossDef.speed,
          1600,
          bossDef.xpReward,
          bossDef.coinReward,
          floor,
          true,
          false
        );

        enemies.push({
          id: `${id}_boss_1`,
          name: `${bossDef.name} Lv.${bossStats.level}`,
          kind: "boss",
          level: bossStats.level,
          tileX: Math.floor(width / 2) + 2,
          tileY: Math.floor(height / 2),
          hp: bossStats.hp,
          maxHp: bossStats.maxHp,
          attack: bossStats.attack,
          defense: bossStats.defense,
          speed: bossStats.speed,
          xpReward: bossStats.xpReward,
          coinReward: bossStats.coinReward,
        });
      } else if (kind === "miniboss") {
        const mbDef = getMiniBossForFloor(floor);
        const mbStats = calculateEnemyStats(
          mbDef.baseHp,
          mbDef.attackDamage,
          mbDef.defense,
          mbDef.speed,
          1500,
          mbDef.xpReward,
          mbDef.coinReward,
          floor,
          false,
          true
        );

        const mbTile = centerPropTile;
        enemies.push({
          id: `${id}_miniboss_1`,
          name: `${mbDef.name} Lv.${mbStats.level}`,
          digimon: mbDef.digimon,
          kind: "miniboss",
          level: mbStats.level,
          tileX: mbTile.x,
          tileY: mbTile.y,
          hp: mbStats.hp,
          maxHp: mbStats.maxHp,
          attack: mbStats.attack,
          defense: mbStats.defense,
          speed: mbStats.speed,
          xpReward: mbStats.xpReward,
          coinReward: mbStats.coinReward,
        });
      } else {
        const enemyCount = calculateEnemyCount(floor, sizeCategory, rng);
        const validEnemyTiles = reachableTiles.filter(
          (t) =>
            Math.hypot(t.x - spawn.x, t.y - spawn.y) >= 5 &&
            Math.hypot(t.x - exit.x, t.y - exit.y) >= 2.5 &&
            !props.some((p) => p.tileX === t.x && p.tileY === t.y)
        );
        const shuffled = [...validEnemyTiles].sort(() => rng.next() - 0.5);

        for (let e = 0; e < enemyCount && e < shuffled.length; e++) {
          const et = shuffled[e];
          const enemyLevel = Math.max(1, Math.min(MAX_LEVEL, floor + rng.int(-1, 1)));
          const isRanged = e % 2 === 1;
          const isElite = kind === "elite" && e === 0;
          const enemyDigimon = isElite
            ? "etemon"
            : isRanged
            ? "veemon"
            : e % 4 === 0
            ? "agumon"
            : "gabumon";
          const enemyTitle = isElite
            ? "Sentinela Blindada de Elite"
            : enemyDigimon === "agumon"
            ? "Agumon Selvagem"
            : enemyDigimon === "veemon"
            ? "Veemon Rebelde"
            : "Gabumon Selvagem";

          const baseHp = isElite ? 110 : isRanged ? 36 : 46;
          const baseAtk = isElite ? 15 : isRanged ? 10 : 8;
          const baseDef = isElite ? 6 : isRanged ? 1 : 3;
          const baseSpeed = isElite ? 65 : isRanged ? 52 : 62;
          const baseCooldown = isElite ? 1800 : isRanged ? 1900 : 1300;
          const baseXp = isElite ? 90 : isRanged ? 28 : 24;
          const baseCoins = isElite ? 50 : 12;

          const stats = calculateEnemyStats(
            baseHp,
            baseAtk,
            baseDef,
            baseSpeed,
            baseCooldown,
            baseXp,
            baseCoins,
            enemyLevel,
            false,
            false
          );

          enemies.push({
            id: `${id}_enemy_${e + 1}`,
            name: `${enemyTitle} Lv.${stats.level}`,
            digimon: enemyDigimon,
            kind: isElite ? "elite" : isRanged ? "ranged" : "melee",
            level: stats.level,
            tileX: et.x,
            tileY: et.y,
            hp: stats.hp,
            maxHp: stats.maxHp,
            attack: stats.attack,
            defense: stats.defense,
            speed: stats.speed,
            xpReward: stats.xpReward,
            coinReward: stats.coinReward,
          });
        }
      }

      // Build Graph Structure for this room
      const graph: DungeonGraph = {
        nodes: [
          {
            id: `${id}_main`,
            kind,
            shape,
            sizeCategory,
            x: 0,
            y: 0,
            width,
            height,
          },
        ],
        edges: [
          {
            from: "spawn",
            to: "exit",
            width: corridorWidth,
            isLoop: hasLoop,
          },
        ],
        hasLoops: hasLoop,
        hasDeadEnds: hasDeadEnd,
      };

      return {
        id,
        index,
        kind,
        title: roomTitles[kind],
        biome,
        theme: themeId,
        floor,
        width,
        height,
        tiles,
        spawn,
        exit,
        enemies,
        props,
        shape,
        graph,
        clusters,
        landmark,
        emptySpaceRatio,
        budgetUsed,
      };
    }
  }

  // Fallback if max attempts exceeded
  console.warn(`[RoomGenerator] Max attempts reached for ${id}. Using safe fallback room.`);
  return createSafeFallbackRoom(id, index, kind, roomTitles[kind], biome, floor, width, height, themeId);
}

/**
 * Returns the appropriate biome for a given room number, cycling smoothly through biomes across 300 levels.
 */
export function getBiomeForFloor(roomNumber: number): BiomeKind {
  const cycle50 = ((roomNumber - 1) % 50) + 1;
  if (cycle50 <= 10) return "digital";
  if (cycle50 <= 20) return "fire";
  if (cycle50 <= 30) return "ice";
  if (cycle50 <= 40) return "storm";
  return "dark";
}

/**
 * Creates a finite, complete run definition containing 50 sequential rooms.
 */
export function createFiniteRun(seed: number, startingRoom: number = 1, themeId?: string): RunDefinition {
  const currentRoom = Math.max(1, Math.min(TOTAL_ROOMS, startingRoom));
  const biome = getBiomeForFloor(currentRoom);
  const kind = getRoomKind(currentRoom);
  const theme = themeId ? getMapTheme(themeId) : pickRandomTheme(new RunRNG(seed));
  const singleRoom = generateSingleRoom(
    `room_${String(currentRoom).padStart(2, "0")}`,
    currentRoom - 1,
    kind,
    seed,
    biome,
    currentRoom,
    undefined,
    undefined,
    theme.id
  );

  return {
    runId: `run_${seed}_r${currentRoom}_${Date.now()}`,
    seed,
    floor: currentRoom,
    totalRooms: TOTAL_ROOMS,
    theme,
    rooms: [singleRoom],
  };
}

export function isWalkable(map: DungeonMap, x: number, y: number): boolean {
  return map.tiles[y]?.[x] === "floor";
}

export function validateDungeon(map: DungeonMap): boolean {
  return isPathConnected(map.tiles, map.start, map.exit, map.width, map.height);
}

/**
 * Procedural generator that creates a full DungeonMap wrapper.
 */
export function generateProceduralDungeon(seed: number = Date.now(), config: DungeonConfig = {}): DungeonMap {
  const run = createFiniteRun(seed, 1);
  const firstRoom = run.rooms[0];

  const width = config.width ?? firstRoom.width;
  const height = config.height ?? firstRoom.height;

  const rooms: Room[] = run.rooms.map((r) => ({
    id: r.id,
    x: 0,
    y: 0,
    width: r.width,
    height: r.height,
    kind: r.kind,
    depth: r.index,
  }));

  return {
    seed,
    width,
    height,
    tiles: firstRoom.tiles,
    rooms,
    start: firstRoom.spawn,
    exit: firstRoom.exit,
    run,
  };
}

export const generateDungeon = generateProceduralDungeon;