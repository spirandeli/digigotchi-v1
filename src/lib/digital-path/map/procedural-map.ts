import { RunRNG } from "./rng";

export type Tile = "floor" | "wall";
export type RoomKind = "start" | "combat" | "treasure" | "elite" | "boss" | "event" | "rest" | "shop";
export type BiomeKind = "digital" | "fire" | "ice" | "storm";

export type EnemyKind = "melee" | "ranged" | "elite" | "boss" | "bug" | "beast";

export type EnemySpawn = Readonly<{
  id: string;
  name: string;
  kind: EnemyKind;
  tileX: number;
  tileY: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  xpReward: number;
  coinReward: number;
}>;

export type PropType = "chest" | "healing_node" | "monolith" | "event_terminal" | "shop_terminal" | "rest_site";

export type PropSpawn = Readonly<{
  id: string;
  type: PropType;
  tileX: number;
  tileY: number;
}>;

export type RoomData = Readonly<{
  id: string;
  index: number;
  kind: RoomKind;
  title: string;
  biome: BiomeKind;
  floor: number;
  width: number;
  height: number;
  tiles: readonly Tile[][];
  spawn: Readonly<{ x: number; y: number }>;
  exit: Readonly<{ x: number; y: number }>;
  enemies: readonly EnemySpawn[];
  props: readonly PropSpawn[];
}>;

export type RunDefinition = Readonly<{
  runId: string;
  seed: number;
  floor: number;
  totalRooms: number;
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

const MAX_ROOM_GENERATION_ATTEMPTS = 10;
const ROOM_WIDTH = 24;
const ROOM_HEIGHT = 16;

/**
 * Validates with BFS if there is an unobstructed walkable path from start to exit.
 */
export function isPathConnected(
  tiles: readonly Tile[][],
  start: { x: number; y: number },
  exit: { x: number; y: number },
  width: number = ROOM_WIDTH,
  height: number = ROOM_HEIGHT
): boolean {
  if (tiles[start.y]?.[start.x] !== "floor" || tiles[exit.y]?.[exit.x] !== "floor") {
    return false;
  }

  const queue: Array<[number, number]> = [[start.x, start.y]];
  const visited = new Set<string>([`${start.x},${start.y}`]);

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  while (queue.length > 0) {
    const [cx, cy] = queue.shift()!;
    if (cx === exit.x && cy === exit.y) {
      return true;
    }

    for (const [dx, dy] of directions) {
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
        queue.push([nx, ny]);
      }
    }
  }

  return false;
}

/**
 * Generates a fallback guaranteed safe room layout.
 */
function createSafeFallbackRoom(
  id: string,
  index: number,
  kind: RoomKind,
  title: string,
  biome: BiomeKind,
  floor: number,
  width: number = ROOM_WIDTH,
  height: number = ROOM_HEIGHT
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
    floor,
    width,
    height,
    tiles,
    spawn,
    exit,
    enemies: [],
    props: [],
  };
}

/**
 * Generates a single finite room arena with guaranteed spawn -> exit connectivity.
 */
export function generateSingleRoom(
  id: string,
  index: number,
  kind: RoomKind,
  seed: number,
  biome: BiomeKind = "digital",
  floor: number = 1,
  customWidth?: number,
  customHeight?: number
): RoomData {
  const rng = new RunRNG(seed ^ (index * 7919) ^ (floor * 3571));
  const width = customWidth ?? rng.int(22, 26);
  const height = customHeight ?? rng.int(14, 18);

  const roomTitles: Record<RoomKind, string> = {
    start: "Portal de Entrada",
    combat: `Setor de Segurança 0${index + 1}`,
    treasure: "Câmara de Suprimentos",
    elite: "Portão da Sentinela de Elite",
    event: "Terminal de Dados Antigo",
    rest: "Nó de Regeneração",
    shop: "Mercador Digital",
    boss: floor === 1 ? "Covil de Kuwagamon" : floor === 2 ? "Fenda do GeoGreymon" : "Núcleo Mecânico",
  };

  for (let attempt = 1; attempt <= MAX_ROOM_GENERATION_ATTEMPTS; attempt += 1) {
    // 1. Initialize boundaries as walls, inner as floor
    const tiles: Tile[][] = Array.from({ length: height }, (_, y) =>
      Array.from({ length: width }, (_, x) => {
        if (x === 0 || x === width - 1 || y === 0 || y === height - 1) return "wall";
        return "floor";
      })
    );

    // 2. Define spawn & exit positions
    const spawn = { x: 3, y: Math.floor(height / 2) };
    const exit = { x: width - 4, y: Math.floor(height / 2) };

    // 3. Add decorative pillars in upper or lower arena zones
    const numPillars = rng.int(1, 4);
    for (let p = 0; p < numPillars; p += 1) {
      const px = rng.int(5, width - 6);
      const isUpper = rng.chance(0.5);
      const py = isUpper ? rng.int(2, spawn.y - 2) : rng.int(spawn.y + 2, height - 3);
      if (py > 0 && py < height - 1) {
        tiles[py][px] = "wall";
        if (rng.chance(0.5) && px + 1 < width - 5) tiles[py][px + 1] = "wall";
      }
    }

    // Clear wide corridor around spawn, center lane, and exit
    for (let x = 1; x < width - 1; x += 1) {
      tiles[spawn.y][x] = "floor";
      if (spawn.y > 1) tiles[spawn.y - 1][x] = "floor";
      if (spawn.y < height - 2) tiles[spawn.y + 1][x] = "floor";
    }

    // 4. Validate BFS connectivity
    if (isPathConnected(tiles, spawn, exit, width, height)) {
      // 5. Place enemies based on room kind
      const enemies: EnemySpawn[] = [];

      if (kind === "combat") {
        const count = index <= 1 ? 2 : 3;
        for (let e = 0; e < count; e += 1) {
          const ex = rng.int(8, width - 6);
          const ey = rng.int(2, height - 3);
          if (tiles[ey][ex] === "floor" && (ex !== spawn.x || ey !== spawn.y)) {
            const isRanged = e === 1;
            enemies.push({
              id: `${id}_enemy_${e + 1}`,
              name: isRanged ? "Betamon Atirador" : "Gazimon Selvagem",
              kind: isRanged ? "ranged" : "melee",
              tileX: ex,
              tileY: ey,
              hp: 40 + index * 10 + (floor - 1) * 20,
              maxHp: 40 + index * 10 + (floor - 1) * 20,
              attack: 8 + index * 2 + (floor - 1) * 4,
              defense: 2 + (floor - 1) * 2,
              speed: isRanged ? 55 : 65,
              xpReward: 35 + floor * 10,
              coinReward: 15 + floor * 5,
            });
          }
        }
      } else if (kind === "elite") {
        enemies.push({
          id: `${id}_elite_1`,
          name: "Sentinela Blindado de Elite",
          kind: "elite",
          tileX: Math.floor(width / 2),
          tileY: Math.floor(height / 2),
          hp: 130 + (floor - 1) * 50,
          maxHp: 130 + (floor - 1) * 50,
          attack: 16 + (floor - 1) * 5,
          defense: 6 + (floor - 1) * 2,
          speed: 70,
          xpReward: 100 + floor * 30,
          coinReward: 50 + floor * 20,
        });
        enemies.push({
          id: `${id}_minion_1`,
          name: "Drone de Apoio",
          kind: "ranged",
          tileX: Math.floor(width / 2) - 4,
          tileY: Math.floor(height / 2) - 2,
          hp: 35 + (floor - 1) * 15,
          maxHp: 35 + (floor - 1) * 15,
          attack: 8 + (floor - 1) * 2,
          defense: 2,
          speed: 60,
          xpReward: 25,
          coinReward: 10,
        });
      } else if (kind === "boss") {
        const bossName = floor === 1
          ? "Kuwagamon da Fenda Digital"
          : floor === 2
          ? "GeoGreymon Flamejante"
          : "MetalGreymon Mecânico";

        enemies.push({
          id: `${id}_boss_1`,
          name: bossName,
          kind: "boss",
          tileX: Math.floor(width / 2) + 2,
          tileY: Math.floor(height / 2),
          hp: 260 + (floor - 1) * 120,
          maxHp: 260 + (floor - 1) * 120,
          attack: 20 + (floor - 1) * 6,
          defense: 8 + (floor - 1) * 3,
          speed: 80,
          xpReward: 250 + floor * 80,
          coinReward: 120 + floor * 40,
        });
      }

      // 6. Place interactive props
      const props: PropSpawn[] = [];
      if (kind === "treasure") {
        props.push({
          id: `${id}_chest_1`,
          type: "chest",
          tileX: Math.floor(width / 2),
          tileY: Math.floor(height / 2),
        });
      } else if (kind === "event") {
        props.push({
          id: `${id}_event_terminal`,
          type: "event_terminal",
          tileX: Math.floor(width / 2),
          tileY: Math.floor(height / 2),
        });
      } else if (kind === "rest") {
        props.push({
          id: `${id}_rest_site`,
          type: "rest_site",
          tileX: Math.floor(width / 2),
          tileY: Math.floor(height / 2),
        });
      } else if (kind === "shop") {
        props.push({
          id: `${id}_shop_terminal`,
          type: "shop_terminal",
          tileX: Math.floor(width / 2),
          tileY: Math.floor(height / 2),
        });
      }

      return {
        id,
        index,
        kind,
        title: roomTitles[kind],
        biome,
        floor,
        width,
        height,
        tiles,
        spawn,
        exit,
        enemies,
        props,
      };
    }
  }

  // Fallback if random placement failed MAX_ROOM_GENERATION_ATTEMPTS
  console.warn(`[RoomGenerator] Max attempts reached for ${id}. Using safe fallback room.`);
  return createSafeFallbackRoom(id, index, kind, roomTitles[kind], biome, floor, width, height);
}

/**
 * Creates a finite, complete run definition containing 6 rooms with variety based on seed and floor.
 */
export function createFiniteRun(seed: number, floorNumber: number = 1): RunDefinition {
  const rng = new RunRNG(seed ^ (floorNumber * 10007));

  // Determine biome for this floor
  const biomes: BiomeKind[] = ["digital", "fire", "storm", "ice"];
  const biome = biomes[(floorNumber - 1) % biomes.length];

  // Dynamic room composition for variety between seeds
  // Room 1: start
  // Room 2: combat
  // Room 3: combat or event
  // Room 4: treasure, rest, or shop
  // Room 5: elite
  // Room 6: boss
  const room3Kind: RoomKind = rng.chance(0.40) ? "event" : "combat";
  const room4Kind: RoomKind = rng.pick(["treasure", "rest", "shop"] as const);

  const sequence: RoomKind[] = ["start", "combat", room3Kind, room4Kind, "elite", "boss"];
  const generatedRooms = new Set<string>();
  const rooms: RoomData[] = [];

  sequence.forEach((kind, index) => {
    const id = `room_${String(index + 1).padStart(2, "0")}`;
    if (generatedRooms.has(id)) return;
    generatedRooms.add(id);

    const room = generateSingleRoom(id, index, kind, seed, biome, floorNumber);
    rooms.push(room);
  });

  return {
    runId: `run_${seed}_f${floorNumber}_${Date.now()}`,
    seed,
    floor: floorNumber,
    totalRooms: rooms.length,
    rooms,
  };
}

export function isWalkable(map: DungeonMap, x: number, y: number): boolean {
  return map.tiles[y]?.[x] === "floor";
}

export function validateDungeon(map: DungeonMap): boolean {
  return isPathConnected(map.tiles, map.start, map.exit, map.width, map.height);
}

/**
 * Legacy compatibility generator that creates a full DungeonMap wrapper.
 */
export function generateProceduralDungeon(seed: number = Date.now(), config: DungeonConfig = {}): DungeonMap {
  const run = createFiniteRun(seed, 1);
  const width = config.width ?? ROOM_WIDTH;
  const height = config.height ?? ROOM_HEIGHT;

  const firstRoom = run.rooms[0];
  const lastRoom = run.rooms[run.rooms.length - 1];

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
    exit: lastRoom.exit,
    run,
  };
}

export const generateDungeon = generateProceduralDungeon;