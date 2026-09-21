import type { RunRNG } from "./rng";
import type { BiomeKind, EnemySpawn, PropSpawn, RoomKind, RoomSizeCategory, Tile } from "./types";
import { getBossForFloor, getMiniBossForFloor } from "../combat/bosses";

export interface EncounterPlacementOptions {
  id: string;
  floor: number;
  kind: RoomKind;
  biome: BiomeKind;
  sizeCategory: RoomSizeCategory;
  width: number;
  height: number;
  tiles: readonly Tile[][];
  spawn: { x: number; y: number };
  exit: { x: number; y: number };
  reachableTiles: Array<{ x: number; y: number }>;
  deadEndTile?: { x: number; y: number };
  rng: RunRNG;
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
  const level = Math.max(1, Math.min(300, roomNumber));
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

export function calculateEnemyCount(
  roomNumber: number,
  sizeCategory: RoomSizeCategory,
  rng: RunRNG
): number {
  if (roomNumber % 10 === 0) return 1; // Boss
  if (roomNumber % 10 === 5) return 1; // Miniboss

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

  if (sizeCategory === "micro" || sizeCategory === "small") {
    minCount = Math.max(2, minCount - 1);
    maxCount = Math.max(3, maxCount - 1);
  } else if (sizeCategory === "large" || sizeCategory === "arena" || sizeCategory === "huge") {
    minCount += 1;
    maxCount += 1;
  }

  return rng.int(minCount, maxCount);
}

export function generateEncounters(options: EncounterPlacementOptions): {
  enemies: EnemySpawn[];
  props: PropSpawn[];
} {
  const {
    id,
    floor,
    kind,
    biome,
    sizeCategory,
    width,
    height,
    spawn,
    exit,
    reachableTiles,
    deadEndTile,
    rng,
  } = options;

  const props: PropSpawn[] = [];
  const enemies: EnemySpawn[] = [];

  // Safe navigation mask (cannot spawn enemies or blocking props here)
  const safeMask = new Set<string>();
  const addSafeRadius = (cx: number, cy: number, rad: number) => {
    for (let dy = -rad; dy <= rad; dy++) {
      for (let dx = -rad; dx <= rad; dx++) {
        safeMask.add(`${cx + dx},${cy + dy}`);
      }
    }
  };
  addSafeRadius(spawn.x, spawn.y, 4); // Strict player spawn clearance
  addSafeRadius(exit.x, exit.y, 2); // Exit door clearance

  // 1. Place Primary Prop (Chest, Terminal, Rest, Shop)
  const idealCenterX = Math.floor(width / 2);
  const idealCenterY = Math.floor(height / 2);

  const eligiblePropTiles = reachableTiles
    .filter((t) => !safeMask.has(`${t.x},${t.y}`))
    .sort(
      (a, b) =>
        Math.hypot(a.x - idealCenterX, a.y - idealCenterY) -
        Math.hypot(b.x - idealCenterX, b.y - idealCenterY)
    );

  const primaryPropTile = eligiblePropTiles[0] || { x: idealCenterX, y: idealCenterY };

  if (kind === "treasure" || (floor % 10 === 3 && floor % 20 === 3)) {
    props.push({
      id: `${id}_chest_1`,
      type: "chest",
      tileX: primaryPropTile.x,
      tileY: primaryPropTile.y,
    });
  } else if (kind === "event") {
    props.push({
      id: `${id}_event_terminal`,
      type: "event_terminal",
      tileX: primaryPropTile.x,
      tileY: primaryPropTile.y,
    });
  } else if (kind === "rest") {
    props.push({
      id: `${id}_rest_site`,
      type: "rest_site",
      tileX: primaryPropTile.x,
      tileY: primaryPropTile.y,
    });
  } else if (kind === "shop") {
    props.push({
      id: `${id}_shop_terminal`,
      type: "shop_terminal",
      tileX: primaryPropTile.x,
      tileY: primaryPropTile.y,
    });
  }

  // Miniboss reward chest
  if (kind === "miniboss") {
    const mbChestTile = eligiblePropTiles[eligiblePropTiles.length - 1] || { x: exit.x - 2, y: exit.y };
    props.push({
      id: `${id}_miniboss_chest`,
      type: "chest",
      tileX: mbChestTile.x,
      tileY: mbChestTile.y,
    });
  }

  // Dead-End Reward: If this room has a dead end nook, reward the player!
  if (deadEndTile && props.length === 0 && kind !== "boss" && kind !== "miniboss") {
    if (reachableTiles.some((t) => t.x === deadEndTile.x && t.y === deadEndTile.y)) {
      props.push({
        id: `${id}_deadend_chest`,
        type: "chest",
        tileX: deadEndTile.x,
        tileY: deadEndTile.y,
      });
    }
  }

  // 2. Place Enemies
  if (kind === "boss") {
    const bossDef = getBossForFloor(floor, biome);
    const stats = calculateEnemyStats(
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
      name: `${bossDef.name} Lv.${stats.level}`,
      kind: "boss",
      level: stats.level,
      tileX: Math.floor(width / 2) + 2,
      tileY: Math.floor(height / 2),
      hp: stats.hp,
      maxHp: stats.maxHp,
      attack: stats.attack,
      defense: stats.defense,
      speed: stats.speed,
      xpReward: stats.xpReward,
      coinReward: stats.coinReward,
    });
  } else if (kind === "miniboss") {
    const mbDef = getMiniBossForFloor(floor);
    const stats = calculateEnemyStats(
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

    enemies.push({
      id: `${id}_miniboss_1`,
      name: `${mbDef.name} Lv.${stats.level}`,
      digimon: mbDef.digimon,
      kind: "miniboss",
      level: stats.level,
      tileX: primaryPropTile.x,
      tileY: primaryPropTile.y,
      hp: stats.hp,
      maxHp: stats.maxHp,
      attack: stats.attack,
      defense: stats.defense,
      speed: stats.speed,
      xpReward: stats.xpReward,
      coinReward: stats.coinReward,
    });
  } else if (kind === "combat" || kind === "elite") {
    const enemyCount = calculateEnemyCount(floor, sizeCategory, rng);
    const eligibleEnemyTiles = reachableTiles.filter(
      (t) =>
        !safeMask.has(`${t.x},${t.y}`) &&
        !props.some((p) => p.tileX === t.x && p.tileY === t.y)
    );

    const shuffled = [...eligibleEnemyTiles].sort(() => rng.next() - 0.5);

    // Tactical combat composition: vanguard melee + ranged artillery or elite commander
    for (let e = 0; e < enemyCount && e < shuffled.length; e++) {
      const et = shuffled[e];
      const enemyLevel = Math.max(1, Math.min(300, floor + rng.int(-1, 1)));
      const isElite = kind === "elite" && e === 0;
      const isRanged = !isElite && e % 2 === 1;

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

  return { enemies, props };
}
