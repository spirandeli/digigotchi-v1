import type { MapThemeConfig, MapThemeId } from "./map-themes";

export type Tile = "floor" | "wall";
export type RoomKind =
  | "start"
  | "combat"
  | "treasure"
  | "elite"
  | "boss"
  | "event"
  | "rest"
  | "shop"
  | "miniboss";

export type BiomeKind = "digital" | "fire" | "ice" | "storm" | "dark";

export type MacroDungeonArchetype =
  | "central_hub"
  | "branching_dungeon"
  | "long_expedition"
  | "ring_dungeon"
  | "multiple_loops"
  | "cavern_network"
  | "ruined_complex"
  | "arena_clusters";

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
  | "octagonal"
  | "circular"
  | "oval"
  | "irregular"
  | "double_room"
  | "multi_chamber"
  | "hall"
  | "alcove_room"
  | "cave_blob"
  | "ruins"
  | "pillar_room"
  | "vault"
  | "bridge_room"
  | "hazard_room"
  | "boss_arena"
  // Legacy aliases
  | "rectangle"
  | "L"
  | "T"
  | "U"
  | "pillars_arena"
  | "central_island"
  | "divided_chambers"
  | "overlapping_rectangles";

export type RoomSizeCategory = "micro" | "small" | "medium" | "large" | "arena" | "huge";

export type CorridorType =
  | "straight"
  | "L_turn"
  | "Z_turn"
  | "wide"
  | "pillared"
  | "chokepoint"
  | "broken";

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

export type PropType =
  | "chest"
  | "healing_node"
  | "monolith"
  | "event_terminal"
  | "shop_terminal"
  | "rest_site";

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
  gridX: number;
  gridY: number;
  width: number;
  height: number;
  isMainPath: boolean;
  isOptional: boolean;
  depth: number;
  branchIndex?: number;
  microbiomeId?: string;
}>;

export type RoomEdge = Readonly<{
  from: string;
  to: string;
  corridorType: CorridorType;
  width: number;
  isLoop?: boolean;
  isMainPath?: boolean;
}>;

export type DungeonGraph = Readonly<{
  macroArchetype: MacroDungeonArchetype;
  nodes: readonly RoomNode[];
  edges: readonly RoomEdge[];
  startNodeId: string;
  exitNodeId: string;
  mainPathNodeIds: readonly string[];
  optionalNodeIds: readonly string[];
  hasLoops: boolean;
  hasDeadEnds: boolean;
  loopCount: number;
  deadEndCount: number;
}>;

export type ClusterType = "rubble" | "crystal" | "energy" | "tech" | "hazard" | "structure";
export type RoomZoneType =
  | "spawn_zone"
  | "combat_zone"
  | "treasure_zone"
  | "hazard_zone"
  | "landmark_zone"
  | "exit_zone";

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
  category?: string;
  satelliteTiles?: readonly { x: number; y: number; type: string }[];
}>;

export type MicrobiomeDef = Readonly<{
  id: string;
  name: string;
  description: string;
  floorVariantBias: number;
  hazardChance: number;
  accentColors: readonly number[];
  allowedClusterTypes: readonly ClusterType[];
  titleModifier: string;
}>;

export type GenerationMetrics = Readonly<{
  seed: number;
  floor: number;
  macroArchetype: MacroDungeonArchetype;
  roomCount: number;
  totalFloorTiles: number;
  totalWallTiles: number;
  emptySpaceRatio: number;
  mainPathLength: number;
  optionalRoomCount: number;
  deadEndCount: number;
  loopCount: number;
  landmarkCount: number;
  clusterCount: number;
  enemyCount: number;
  propCount: number;
  bfsReachableCount: number;
  connectivityValid: boolean;
  generationAttempt: number;
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
  macroArchetype?: MacroDungeonArchetype;
  microbiomes?: readonly MicrobiomeDef[];
  metrics?: GenerationMetrics;
}>;

export type RunDefinition = Readonly<{
  runId: string;
  seed: number;
  floor: number;
  totalRooms: number;
  theme: MapThemeConfig;
  rooms: readonly RoomData[];
}>;

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
  macroArchetype?: MacroDungeonArchetype;
}>;
