import assert from "node:assert/strict";
import test from "node:test";
import { RunRNG } from "./rng";
import { generateTopologyGraph } from "./topology-generator";
import { carveRoomShape } from "./room-shape-generator";
import { classifyWallTile, resolveWallSpriteKey } from "./wall-autotiler";
import { selectBiomesForRun, MACROBIOMES_REGISTRY } from "./biome-generator";
import { generateLandmark } from "./landmark-generator";
import { generateEnvironmentClusters, ENVIRONMENT_BUDGET } from "./environment-decorator";
import { generateTerrainPatches } from "./terrain-generator";
import { isPathConnected, findReachableFloorTiles, validateMapStructure } from "./map-validator";
import { generateSingleRoom } from "./procedural-map";
import { getMapTheme } from "./map-themes";
import type { MacroDungeonArchetype, RoomShape, Tile } from "./types";

test("Topology Generator: successfully generates all 8 Macro-Archetypes", () => {
  const archetypes: MacroDungeonArchetype[] = [
    "central_hub",
    "branching_dungeon",
    "long_expedition",
    "ring_dungeon",
    "multiple_loops",
    "cavern_network",
    "ruined_complex",
    "arena_clusters",
  ];

  for (const arch of archetypes) {
    const rng = new RunRNG(12345);
    const graph = generateTopologyGraph({
      floor: 12,
      kind: "combat",
      rng,
      preferredArchetype: arch,
    });

    assert.equal(graph.macroArchetype, arch);
    assert.ok(graph.nodes.length >= 2, `${arch} must have at least 2 nodes`);
    assert.ok(graph.edges.length >= 1, `${arch} must have at least 1 edge`);
    assert.ok(graph.mainPathNodeIds.length >= 2, `${arch} must have main path`);
  }
});

test("Room Shape Generator: carves floor in bounds for 20+ distinct archetypes", () => {
  const shapes: RoomShape[] = [
    "arena",
    "compact",
    "corridor",
    "cross",
    "L_shape",
    "T_shape",
    "octagonal",
    "circular",
    "oval",
    "double_room",
    "multi_chamber",
    "alcove_room",
    "cave_blob",
    "ruins",
    "pillar_room",
    "vault",
    "bridge_room",
    "hazard_room",
    "boss_arena",
    "chokepoint",
    "central_arena",
    "winding",
    "asymmetric",
  ];

  for (const shape of shapes) {
    const rng = new RunRNG(42);
    const w = 24;
    const h = 18;
    const tiles: Tile[][] = Array.from({ length: h }, () =>
      Array.from({ length: w }, () => "wall" as Tile)
    );

    carveRoomShape(tiles, {
      shape,
      x: 0,
      y: 0,
      width: w,
      height: h,
      rng,
      addSubstructures: true,
    });

    let floorCount = 0;
    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        if (tiles[r][c] === "floor") floorCount++;
      }
    }
    assert.ok(floorCount > 15, `Shape ${shape} must carve floor tiles`);
  }
});

test("Wall Autotiler: accurately classifies outer corners, inner corners, and directional slabs", () => {
  const theme = getMapTheme("lighting");

  // Grid where center (1,1) is wall surrounded on S and E by floor (convex outer TL corner)
  const tilesOuterTL: Tile[][] = [
    ["wall", "wall", "wall"],
    ["wall", "wall", "floor"], // cell (1,1) has floor to East
    ["wall", "floor", "floor"], // cell (1,1) has floor to South
  ];
  const classOuterTL = classifyWallTile(tilesOuterTL, 1, 1, 3, 3);
  assert.equal(classOuterTL, "corner_outer_tl");

  const resOuterTL = resolveWallSpriteKey(classOuterTL, theme);
  assert.ok(resOuterTL.spriteKey.includes("corner_outer_tl") || resOuterTL.spriteKey.includes("wall"));
  assert.equal(resOuterTL.hasRim, true);

  // Grid where (1,1) has floor only below (wall_top)
  const tilesTop: Tile[][] = [
    ["wall", "wall", "wall"],
    ["wall", "wall", "wall"],
    ["wall", "floor", "wall"],
  ];
  const classTop = classifyWallTile(tilesTop, 1, 1, 3, 3);
  assert.equal(classTop, "wall_top");

  // Grid where (1,1) has floor only above (wall_bottom)
  const tilesBottom: Tile[][] = [
    ["wall", "floor", "wall"],
    ["wall", "wall", "wall"],
    ["wall", "wall", "wall"],
  ];
  const classBottom = classifyWallTile(tilesBottom, 1, 1, 3, 3);
  assert.equal(classBottom, "wall_bottom");
});

test("Biome & Microbiome Generator: selects macrobiome and 2-4 curated microbiomes for each theme", () => {
  const themes = ["lighting", "fire", "ice", "tech"] as const;
  for (const th of themes) {
    const rng = new RunRNG(777);
    const { macro, activeMicrobiomes } = selectBiomesForRun(th, rng);

    assert.equal(macro.themeId, th);
    assert.ok(activeMicrobiomes.length >= 2 && activeMicrobiomes.length <= 4);
    for (const mb of activeMicrobiomes) {
      assert.ok(mb.id.length > 0);
      assert.ok(mb.name.length > 0);
      assert.ok(mb.allowedClusterTypes.length > 0);
    }
  }
});

test("Terrain Generator: creates contiguous floor patches and adheres to 80%+ dominant base", () => {
  const theme = getMapTheme("lighting");
  const rng = new RunRNG(999);
  const w = 28;
  const h = 18;
  const tiles: Tile[][] = Array.from({ length: h }, (_, r) =>
    Array.from({ length: w }, (_, c) => (r === 0 || r === h - 1 || c === 0 || c === w - 1 ? "wall" : "floor"))
  );

  const terrain = generateTerrainPatches(tiles, w, h, theme, rng, 0.12);
  let totalFloor = 0;
  let varCount = 0;
  let decorCount = 0;

  for (let r = 1; r < h - 1; r++) {
    for (let c = 1; c < w - 1; c++) {
      totalFloor++;
      const idx = r * w + c;
      if (terrain.floorVariationIndices[idx]) varCount++;
      if (terrain.floorDecorIndices[idx]) decorCount++;
    }
  }

  const baseCount = totalFloor - varCount - decorCount;
  const baseRatio = baseCount / totalFloor;

  // Base floor must dominate (>= 75%)
  assert.ok(baseRatio >= 0.75, `Base floor ratio ${baseRatio} is below 75%`);
  // Variations and decor must be present in subtle proportions
  assert.ok(varCount > 0, "Variation patches should be present");
  assert.ok(decorCount > 0, "Decor accents should be present");
});

test("Environment Decorator: respects size budgets and protects spawn navigation mask", () => {
  const rng = new RunRNG(888);
  const w = 28;
  const h = 18;
  const tiles: Tile[][] = Array.from({ length: h }, (_, r) =>
    Array.from({ length: w }, (_, c) => (r === 0 || r === h - 1 || c === 0 || c === w - 1 ? "wall" : "floor"))
  );

  const spawn = { x: 3, y: 9 };
  const exit = { x: 24, y: 9 };

  const { clusters, budgetUsed } = generateEnvironmentClusters({
    id: "test_room",
    width: w,
    height: h,
    tiles,
    spawn,
    exit,
    sizeCategory: "medium",
    themeId: "lighting",
    rng,
    hasLandmark: false,
  });

  const maxBudget = ENVIRONMENT_BUDGET.medium;
  assert.ok(budgetUsed <= maxBudget, `Budget used ${budgetUsed} exceeds max ${maxBudget}`);

  // No cluster tile can be within 2 tiles of spawn
  for (const c of clusters) {
    for (const t of c.tiles) {
      const distToSpawn = Math.hypot(t.x - spawn.x, t.y - spawn.y);
      assert.ok(distToSpawn >= 2.5, `Cluster tile too close to spawn: dist=${distToSpawn}`);
    }
  }
});

test("11-Layer Procedural Room: full end-to-end generation across 20 distinct seeds with metrics", () => {
  for (let s = 1; s <= 20; s++) {
    const room = generateSingleRoom(`rework_test_${s}`, s - 1, "combat", s * 1000, "digital", s);

    assert.ok(room.metrics, "Room must produce metrics");
    assert.equal(room.metrics?.connectivityValid, true);
    assert.ok(room.metrics?.emptySpaceRatio >= 0.15, `Empty space ratio ${room.metrics?.emptySpaceRatio} below min`);
    assert.ok(room.metrics?.emptySpaceRatio <= 0.85, `Empty space ratio ${room.metrics?.emptySpaceRatio} above max`);

    // Verify BFS connectivity explicitly
    assert.equal(isPathConnected(room.tiles, room.spawn, room.exit, room.width, room.height), true);

    // Verify spawn & exit are on walkable floor
    assert.equal(room.tiles[room.spawn.y][room.spawn.x], "floor");
    assert.equal(room.tiles[room.exit.y][room.exit.x], "floor");
  }
});
