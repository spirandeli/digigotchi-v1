import { RunRNG } from "./rng";
import { type MapThemeConfig, type MapThemeId, pickRandomTheme, getMapTheme } from "./map-themes";
import { getBossForFloor, getMiniBossForFloor } from "../combat/bosses";

// Re-export all types from modular types file
export * from "./types";
import type {
  BiomeKind,
  ClusterType,
  DungeonConfig,
  DungeonGraph,
  DungeonMap,
  EnemyKind,
  EnemySpawn,
  EnvironmentCluster,
  EnvironmentLandmark,
  GenerationMetrics,
  MacroDungeonArchetype,
  MicrobiomeDef,
  PropSpawn,
  PropType,
  Room,
  RoomData,
  RoomEdge,
  RoomKind,
  RoomNode,
  RoomShape,
  RoomSizeCategory,
  RoomZoneType,
  RunDefinition,
  Tile,
} from "./types";

import { generateTopologyGraph } from "./topology-generator";
import { layoutDungeonGraph } from "./room-layout-generator";
import { generateTerrainPatches } from "./terrain-generator";
import { generateLandmark } from "./landmark-generator";
import { generateEnvironmentClusters } from "./environment-decorator";
import { generateEncounters, calculateEnemyCount, calculateEnemyStats } from "./encounter-generator";
import { selectBiomesForRun } from "./biome-generator";
import {
  findReachableFloorTiles,
  isPathConnected,
  pruneIsolatedFloorIslands,
  validateMapStructure,
} from "./map-validator";

export { isPathConnected, findReachableFloorTiles, calculateEnemyCount, calculateEnemyStats };

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
  irregularRoomChance: 0.5,
  obstacleDensity: 0.07,
  maxGenerationAttempts: 15,
  roomSizeCategories: {
    small: { width: 20, height: 14 },
    medium: { width: 28, height: 18 },
    large: { width: 34, height: 22 },
    arena: { width: 36, height: 24 },
  },
  environmentBudget: {
    micro: 4,
    small: 8,
    medium: 15,
    large: 25,
    arena: 35,
    huge: 35,
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

/**
 * High-level procedural map generator running the 11 conceptual layers:
 * CAMADA 1 — identidade da fase
 * CAMADA 2 — grafo/topologia
 * CAMADA 3 — geometria das salas
 * CAMADA 4 — conexões
 * CAMADA 5 — arquitetura do ambiente
 * CAMADA 6 — terreno
 * CAMADA 7 — landmarks
 * CAMADA 8 — decoração contextual
 * CAMADA 9 — gameplay
 * CAMADA 10 — polishing visual
 * CAMADA 11 — validação
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

  // Determine size category
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

  const baseDimensions = MAP_CONFIG.roomSizeCategories[sizeCategory as keyof typeof MAP_CONFIG.roomSizeCategories] || MAP_CONFIG.roomSizeCategories.medium;
  const targetWidth = customWidth ?? baseDimensions.width;
  const targetHeight = customHeight ?? baseDimensions.height;

  // CAMADA 1: Identidade da Fase (Macrobioma & Microbiomas)
  const theme = getMapTheme(themeId);
  const { macro: macroProfile, activeMicrobiomes } = selectBiomesForRun(theme.id, rng);

  const roomTitles: Record<RoomKind, string> = {
    start: "Portal de Entrada",
    combat: `${macroProfile.name} 0${index + 1}`,
    treasure: `Câmara de Suprimentos ${activeMicrobiomes[0]?.titleModifier || ""}`.trim(),
    elite: `Portão da Sentinela de Elite ${activeMicrobiomes[0]?.titleModifier || ""}`.trim(),
    event: `Terminal de Dados Antigo ${activeMicrobiomes[0]?.titleModifier || ""}`.trim(),
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

  for (let attempt = 1; attempt <= MAP_CONFIG.maxGenerationAttempts; attempt++) {
    // CAMADA 2: Grafo & Topologia
    const graph = generateTopologyGraph({
      floor,
      kind,
      rng,
    });

    // CAMADA 3 & 4 & 5: Geometria das salas, Subestruturas & Conexões
    const layout = layoutDungeonGraph(graph, rng, targetWidth, targetHeight);
    const width = layout.width;
    const height = layout.height;
    const tiles = layout.tiles;
    const spawn = layout.spawn;
    const exit = layout.exit;

    // Prune isolated inaccessible islands
    pruneIsolatedFloorIslands(tiles, spawn, width, height);

    // Initial BFS check
    const reachableTiles = findReachableFloorTiles(tiles, spawn, width, height);
    const exitReachable = reachableTiles.some((t) => t.x === exit.x && t.y === exit.y);

    if (exitReachable && reachableTiles.length >= 25) {
      // CAMADA 6: Terreno & Microbiomas
      const terrain = generateTerrainPatches(
        tiles,
        width,
        height,
        theme,
        rng,
        activeMicrobiomes[0]?.floorVariantBias ?? 0.12
      );

      // CAMADA 7: Landmarks
      const landmark = generateLandmark({
        roomKind: kind,
        themeId: theme.id,
        x: 0,
        y: 0,
        width,
        height,
        tiles,
        rng,
      });

      // CAMADA 8: Decoração Contextual & Clusters
      const { clusters, budgetUsed } = generateEnvironmentClusters({
        id,
        width,
        height,
        tiles,
        spawn,
        exit,
        sizeCategory,
        themeId: theme.id,
        rng,
        hasLandmark: Boolean(landmark),
      });

      // CAMADA 9: Gameplay & Encounters
      const { enemies, props } = generateEncounters({
        id,
        floor,
        kind,
        biome,
        sizeCategory,
        width,
        height,
        tiles,
        spawn,
        exit,
        reachableTiles,
        deadEndTile: layout.deadEndTile,
        rng,
      });

      // CAMADA 11: Validação & Quality Gate
      const validation = validateMapStructure(
        tiles,
        spawn,
        exit,
        props,
        width,
        height,
        graph.macroArchetype,
        seed,
        floor
      );

      if (validation.valid) {
        const shape = graph.nodes.find((n) => n.id === graph.startNodeId)?.shape || "arena";
        const totalTiles = width * height;
        const emptySpaceRatio = Number((reachableTiles.length / totalTiles).toFixed(2));

        const metrics: GenerationMetrics = {
          seed,
          floor,
          macroArchetype: graph.macroArchetype,
          roomCount: graph.nodes.length,
          totalFloorTiles: reachableTiles.length,
          totalWallTiles: totalTiles - reachableTiles.length,
          emptySpaceRatio,
          mainPathLength: graph.mainPathNodeIds.length,
          optionalRoomCount: graph.optionalNodeIds.length,
          deadEndCount: graph.deadEndCount,
          loopCount: graph.loopCount,
          landmarkCount: landmark ? 1 : 0,
          clusterCount: clusters.length,
          enemyCount: enemies.length,
          propCount: props.length,
          bfsReachableCount: reachableTiles.length,
          connectivityValid: true,
          generationAttempt: attempt,
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
          macroArchetype: graph.macroArchetype,
          microbiomes: activeMicrobiomes,
          metrics,
        };
      }
    }
  }

  // Safe fallback if max generation attempts exceeded
  console.warn(`[RoomGenerator] Max attempts reached for ${id}. Using safe fallback room.`);
  return createSafeFallbackRoom(id, index, kind, roomTitles[kind], biome, floor, targetWidth, targetHeight, themeId);
}

export function getBiomeForFloor(roomNumber: number): BiomeKind {
  const cycle50 = ((roomNumber - 1) % 50) + 1;
  if (cycle50 <= 10) return "digital";
  if (cycle50 <= 20) return "fire";
  if (cycle50 <= 30) return "ice";
  if (cycle50 <= 40) return "storm";
  return "dark";
}

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

export function generateProceduralDungeon(seed: number = Date.now(), config: DungeonConfig = {}): DungeonMap {
  const run = createFiniteRun(seed, 1);
  const firstRoom = run.rooms[0];

  const width = config.width ?? firstRoom.width;
  const height = config.height ?? firstRoom.height;

  const rooms: Room[] =
    firstRoom.graph && firstRoom.graph.nodes.length > 0
      ? firstRoom.graph.nodes.map((n, i) => ({
          id: n.id,
          x: n.gridX * 10,
          y: n.gridY * 8,
          width: n.width,
          height: n.height,
          kind: n.kind,
          depth: n.depth ?? i,
        }))
      : run.rooms.map((r) => ({
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