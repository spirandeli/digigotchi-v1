import type { RunRNG } from "./rng";
import type {
  CorridorType,
  DungeonGraph,
  MacroDungeonArchetype,
  RoomEdge,
  RoomKind,
  RoomNode,
  RoomShape,
  RoomSizeCategory,
} from "./types";

export interface TopologyGeneratorOptions {
  floor: number;
  kind: RoomKind;
  rng: RunRNG;
  preferredArchetype?: MacroDungeonArchetype;
}

const MACRO_ARCHETYPES: readonly MacroDungeonArchetype[] = [
  "branching_dungeon",
  "central_hub",
  "long_expedition",
  "ring_dungeon",
  "multiple_loops",
  "cavern_network",
  "ruined_complex",
  "arena_clusters",
];

export function pickMacroArchetype(
  floor: number,
  kind: RoomKind,
  rng: RunRNG,
  preferred?: MacroDungeonArchetype
): MacroDungeonArchetype {
  if (preferred) return preferred;
  if (kind === "boss") return "arena_clusters";
  if (kind === "miniboss") return rng.pick(["arena_clusters", "central_hub", "ruined_complex"] as const);

  // Weights tailored by floor progression for pacing
  if (floor <= 5) {
    return rng.pick(["branching_dungeon", "central_hub", "long_expedition"] as const);
  }
  return rng.pick(MACRO_ARCHETYPES);
}

function pickShapeForKind(
  kind: RoomKind,
  sizeCategory: RoomSizeCategory,
  rng: RunRNG,
  archetype: MacroDungeonArchetype
): RoomShape {
  if (kind === "boss") return "boss_arena";
  if (kind === "miniboss") {
    return rng.pick(["arena", "central_arena", "octagonal", "pillars_arena"] as const);
  }
  if (kind === "treasure") {
    return rng.pick(["vault", "alcove_room", "compact", "circular"] as const);
  }
  if (kind === "rest" || kind === "shop") {
    return rng.pick(["compact", "alcove_room", "circular", "arena"] as const);
  }

  if (archetype === "cavern_network") {
    return rng.pick(["cave_blob", "irregular", "oval", "asymmetric"] as const);
  }
  if (archetype === "ruined_complex") {
    return rng.pick(["ruins", "multi_chamber", "open", "pillars_arena"] as const);
  }

  const shapes: RoomShape[] = [
    "arena",
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
    "octagonal",
    "circular",
    "oval",
    "multi_chamber",
    "hall",
    "alcove_room",
    "pillar_room",
  ];
  return rng.pick(shapes);
}

export function generateTopologyGraph(options: TopologyGeneratorOptions): DungeonGraph {
  const { floor, kind, rng } = options;
  const macroArchetype = pickMacroArchetype(floor, kind, rng, options.preferredArchetype);

  // Single Boss or Miniboss special rooms:
  if (kind === "boss") {
    return generateBossTopology(floor, rng);
  }
  if (kind === "miniboss") {
    return generateMiniBossTopology(floor, rng, macroArchetype);
  }

  switch (macroArchetype) {
    case "central_hub":
      return generateCentralHubTopology(floor, rng);
    case "ring_dungeon":
      return generateRingTopology(floor, rng);
    case "multiple_loops":
      return generateMultipleLoopsTopology(floor, rng);
    case "long_expedition":
      return generateLongExpeditionTopology(floor, rng);
    case "cavern_network":
      return generateCavernTopology(floor, rng);
    case "ruined_complex":
      return generateRuinedComplexTopology(floor, rng);
    case "arena_clusters":
      return generateArenaClustersTopology(floor, rng);
    case "branching_dungeon":
    default:
      return generateBranchingTopology(floor, rng);
  }
}

function generateBossTopology(floor: number, _rng: RunRNG): DungeonGraph {
  const startNode: RoomNode = {
    id: "boss_vestibule",
    kind: "start",
    shape: "hall",
    sizeCategory: "medium",
    gridX: 0,
    gridY: 1,
    width: 14,
    height: 10,
    isMainPath: true,
    isOptional: false,
    depth: 0,
  };

  const bossArena: RoomNode = {
    id: "boss_sanctum",
    kind: "boss",
    shape: "boss_arena",
    sizeCategory: "huge",
    gridX: 1,
    gridY: 1,
    width: 28,
    height: 20,
    isMainPath: true,
    isOptional: false,
    depth: 1,
  };

  const edge: RoomEdge = {
    from: startNode.id,
    to: bossArena.id,
    corridorType: "wide",
    width: 3,
    isMainPath: true,
  };

  return {
    macroArchetype: "arena_clusters",
    nodes: [startNode, bossArena],
    edges: [edge],
    startNodeId: startNode.id,
    exitNodeId: bossArena.id,
    mainPathNodeIds: [startNode.id, bossArena.id],
    optionalNodeIds: [],
    hasLoops: false,
    hasDeadEnds: false,
    loopCount: 0,
    deadEndCount: 0,
  };
}

function generateMiniBossTopology(floor: number, rng: RunRNG, archetype: MacroDungeonArchetype): DungeonGraph {
  const startNode: RoomNode = {
    id: "mb_entry",
    kind: "start",
    shape: "hall",
    sizeCategory: "small",
    gridX: 0,
    gridY: 1,
    width: 12,
    height: 10,
    isMainPath: true,
    isOptional: false,
    depth: 0,
  };

  const mbArena: RoomNode = {
    id: "mb_arena",
    kind: "miniboss",
    shape: rng.pick(["central_arena", "octagonal", "pillars_arena"] as const),
    sizeCategory: "large",
    gridX: 1,
    gridY: 1,
    width: 22,
    height: 16,
    isMainPath: true,
    isOptional: false,
    depth: 1,
  };

  const rewardNode: RoomNode = {
    id: "mb_vault",
    kind: "treasure",
    shape: "vault",
    sizeCategory: "small",
    gridX: 2,
    gridY: 1,
    width: 12,
    height: 10,
    isMainPath: true,
    isOptional: false,
    depth: 2,
  };

  const edges: RoomEdge[] = [
    { from: startNode.id, to: mbArena.id, corridorType: "straight", width: 2, isMainPath: true },
    { from: mbArena.id, to: rewardNode.id, corridorType: "straight", width: 2, isMainPath: true },
  ];

  return {
    macroArchetype: archetype,
    nodes: [startNode, mbArena, rewardNode],
    edges,
    startNodeId: startNode.id,
    exitNodeId: rewardNode.id,
    mainPathNodeIds: [startNode.id, mbArena.id, rewardNode.id],
    optionalNodeIds: [],
    hasLoops: false,
    hasDeadEnds: false,
    loopCount: 0,
    deadEndCount: 0,
  };
}

function generateBranchingTopology(floor: number, rng: RunRNG): DungeonGraph {
  const nodes: RoomNode[] = [];
  const edges: RoomEdge[] = [];

  // Main chain: 3 to 4 nodes
  const mainCount = rng.int(3, 4);
  const mainIds: string[] = [];

  for (let i = 0; i < mainCount; i++) {
    const isStart = i === 0;
    const isExit = i === mainCount - 1;
    const kind: RoomKind = isStart ? "start" : isExit ? "combat" : rng.chance(0.3) ? "elite" : "combat";
    const size: RoomSizeCategory = isStart ? "small" : isExit ? "medium" : "large";
    const id = `node_main_${i}`;
    mainIds.push(id);

    nodes.push({
      id,
      kind,
      shape: pickShapeForKind(kind, size, rng, "branching_dungeon"),
      sizeCategory: size,
      gridX: i,
      gridY: 1,
      width: size === "small" ? 12 : size === "medium" ? 16 : 20,
      height: size === "small" ? 10 : size === "medium" ? 12 : 14,
      isMainPath: true,
      isOptional: false,
      depth: i,
    });

    if (i > 0) {
      edges.push({
        from: mainIds[i - 1],
        to: id,
        corridorType: rng.pick(["straight", "wide", "L_turn"] as const),
        width: rng.int(2, 3),
        isMainPath: true,
      });
    }
  }

  // Add 1-2 optional branches
  const optionalIds: string[] = [];
  let deadEndCount = 0;
  let loopCount = 0;

  // Branch 1: Off main node 1 (Treasure or Event)
  const branch1Parent = mainIds[1] || mainIds[0];
  const b1Kind: RoomKind = rng.chance(0.6) ? "treasure" : "event";
  const b1Id = "node_branch_1";
  optionalIds.push(b1Id);
  deadEndCount++;

  nodes.push({
    id: b1Id,
    kind: b1Kind,
    shape: pickShapeForKind(b1Kind, "small", rng, "branching_dungeon"),
    sizeCategory: "small",
    gridX: 1,
    gridY: 0, // Upper branch
    width: 12,
    height: 10,
    isMainPath: false,
    isOptional: true,
    depth: 2,
    branchIndex: 1,
  });
  edges.push({
    from: branch1Parent,
    to: b1Id,
    corridorType: "L_turn",
    width: 2,
    isMainPath: false,
  });

  // Loop chance: Connect branch1 to main node 2 if exists
  if (mainIds[2] && rng.chance(0.4)) {
    edges.push({
      from: b1Id,
      to: mainIds[2],
      corridorType: "straight",
      width: 2,
      isLoop: true,
      isMainPath: false,
    });
    loopCount++;
    deadEndCount = Math.max(0, deadEndCount - 1);
  }

  // Branch 2: Off main node 2 (Rest or Combat Secret)
  if (mainIds.length >= 3 && rng.chance(0.7)) {
    const branch2Parent = mainIds[2];
    const b2Kind: RoomKind = rng.chance(0.5) ? "rest" : "treasure";
    const b2Id = "node_branch_2";
    optionalIds.push(b2Id);
    deadEndCount++;

    nodes.push({
      id: b2Id,
      kind: b2Kind,
      shape: pickShapeForKind(b2Kind, "small", rng, "branching_dungeon"),
      sizeCategory: "small",
      gridX: 2,
      gridY: 2, // Lower branch
      width: 12,
      height: 10,
      isMainPath: false,
      isOptional: true,
      depth: 3,
      branchIndex: 2,
    });
    edges.push({
      from: branch2Parent,
      to: b2Id,
      corridorType: "L_turn",
      width: 2,
      isMainPath: false,
    });
  }

  return {
    macroArchetype: "branching_dungeon",
    nodes,
    edges,
    startNodeId: mainIds[0],
    exitNodeId: mainIds[mainIds.length - 1],
    mainPathNodeIds: mainIds,
    optionalNodeIds: optionalIds,
    hasLoops: loopCount > 0,
    hasDeadEnds: deadEndCount > 0,
    loopCount,
    deadEndCount,
  };
}

function generateCentralHubTopology(floor: number, rng: RunRNG): DungeonGraph {
  const hubNode: RoomNode = {
    id: "hub_center",
    kind: "combat",
    shape: rng.pick(["circular", "octagonal", "pillars_arena", "cross"] as const),
    sizeCategory: "large",
    gridX: 1,
    gridY: 1,
    width: 20,
    height: 16,
    isMainPath: true,
    isOptional: false,
    depth: 1,
  };

  const startNode: RoomNode = {
    id: "hub_west_start",
    kind: "start",
    shape: "hall",
    sizeCategory: "small",
    gridX: 0,
    gridY: 1,
    width: 12,
    height: 10,
    isMainPath: true,
    isOptional: false,
    depth: 0,
  };

  const northWing: RoomNode = {
    id: "hub_north_treasure",
    kind: "treasure",
    shape: "vault",
    sizeCategory: "small",
    gridX: 1,
    gridY: 0,
    width: 12,
    height: 10,
    isMainPath: false,
    isOptional: true,
    depth: 2,
  };

  const southWing: RoomNode = {
    id: "hub_south_event",
    kind: rng.pick(["event", "rest", "combat"] as const),
    shape: "alcove_room",
    sizeCategory: "medium",
    gridX: 1,
    gridY: 2,
    width: 14,
    height: 12,
    isMainPath: false,
    isOptional: true,
    depth: 2,
  };

  const exitNode: RoomNode = {
    id: "hub_east_exit",
    kind: "elite",
    shape: "arena",
    sizeCategory: "medium",
    gridX: 2,
    gridY: 1,
    width: 16,
    height: 14,
    isMainPath: true,
    isOptional: false,
    depth: 2,
  };

  const edges: RoomEdge[] = [
    { from: startNode.id, to: hubNode.id, corridorType: "straight", width: 2, isMainPath: true },
    { from: hubNode.id, to: northWing.id, corridorType: "straight", width: 2, isMainPath: false },
    { from: hubNode.id, to: southWing.id, corridorType: "straight", width: 2, isMainPath: false },
    { from: hubNode.id, to: exitNode.id, corridorType: "wide", width: 3, isMainPath: true },
  ];

  let loopCount = 0;
  if (rng.chance(0.45)) {
    // Loop between south wing and exit
    edges.push({
      from: southWing.id,
      to: exitNode.id,
      corridorType: "L_turn",
      width: 2,
      isLoop: true,
      isMainPath: false,
    });
    loopCount++;
  }

  return {
    macroArchetype: "central_hub",
    nodes: [startNode, hubNode, northWing, southWing, exitNode],
    edges,
    startNodeId: startNode.id,
    exitNodeId: exitNode.id,
    mainPathNodeIds: [startNode.id, hubNode.id, exitNode.id],
    optionalNodeIds: [northWing.id, southWing.id],
    hasLoops: loopCount > 0,
    hasDeadEnds: true,
    loopCount,
    deadEndCount: loopCount > 0 ? 1 : 2,
  };
}

function generateRingTopology(floor: number, rng: RunRNG): DungeonGraph {
  // Ring topology: Start -> Upper Path -> Chamber -> Exit, and Start -> Lower Path -> Chamber -> Exit
  const startNode: RoomNode = {
    id: "ring_start",
    kind: "start",
    shape: "hall",
    sizeCategory: "small",
    gridX: 0,
    gridY: 1,
    width: 12,
    height: 10,
    isMainPath: true,
    isOptional: false,
    depth: 0,
  };

  const northNode: RoomNode = {
    id: "ring_north",
    kind: "combat",
    shape: "L_shape",
    sizeCategory: "medium",
    gridX: 1,
    gridY: 0,
    width: 16,
    height: 12,
    isMainPath: true,
    isOptional: false,
    depth: 1,
  };

  const southNode: RoomNode = {
    id: "ring_south",
    kind: rng.pick(["combat", "treasure", "event"] as const),
    shape: "T_shape",
    sizeCategory: "medium",
    gridX: 1,
    gridY: 2,
    width: 16,
    height: 12,
    isMainPath: false,
    isOptional: true,
    depth: 1,
  };

  const exitNode: RoomNode = {
    id: "ring_exit",
    kind: "elite",
    shape: "arena",
    sizeCategory: "large",
    gridX: 2,
    gridY: 1,
    width: 18,
    height: 14,
    isMainPath: true,
    isOptional: false,
    depth: 2,
  };

  const edges: RoomEdge[] = [
    { from: startNode.id, to: northNode.id, corridorType: "L_turn", width: 2, isMainPath: true },
    { from: northNode.id, to: exitNode.id, corridorType: "L_turn", width: 2, isMainPath: true },
    { from: startNode.id, to: southNode.id, corridorType: "L_turn", width: 2, isLoop: true, isMainPath: false },
    { from: southNode.id, to: exitNode.id, corridorType: "L_turn", width: 2, isLoop: true, isMainPath: false },
  ];

  return {
    macroArchetype: "ring_dungeon",
    nodes: [startNode, northNode, southNode, exitNode],
    edges,
    startNodeId: startNode.id,
    exitNodeId: exitNode.id,
    mainPathNodeIds: [startNode.id, northNode.id, exitNode.id],
    optionalNodeIds: [southNode.id],
    hasLoops: true,
    hasDeadEnds: false,
    loopCount: 1,
    deadEndCount: 0,
  };
}

function generateMultipleLoopsTopology(floor: number, rng: RunRNG): DungeonGraph {
  const start: RoomNode = {
    id: "mloop_start",
    kind: "start",
    shape: "compact",
    sizeCategory: "small",
    gridX: 0,
    gridY: 1,
    width: 12,
    height: 10,
    isMainPath: true,
    isOptional: false,
    depth: 0,
  };

  const midA: RoomNode = {
    id: "mloop_midA",
    kind: "combat",
    shape: "cross",
    sizeCategory: "medium",
    gridX: 1,
    gridY: 0,
    width: 14,
    height: 12,
    isMainPath: true,
    isOptional: false,
    depth: 1,
  };

  const midB: RoomNode = {
    id: "mloop_midB",
    kind: "combat",
    shape: "multi_chamber",
    sizeCategory: "medium",
    gridX: 1,
    gridY: 2,
    width: 14,
    height: 12,
    isMainPath: false,
    isOptional: true,
    depth: 1,
  };

  const midCenter: RoomNode = {
    id: "mloop_center",
    kind: rng.pick(["event", "treasure", "rest"] as const),
    shape: "alcove_room",
    sizeCategory: "small",
    gridX: 1,
    gridY: 1,
    width: 12,
    height: 10,
    isMainPath: true,
    isOptional: false,
    depth: 1,
  };

  const exit: RoomNode = {
    id: "mloop_exit",
    kind: "elite",
    shape: "arena",
    sizeCategory: "large",
    gridX: 2,
    gridY: 1,
    width: 18,
    height: 14,
    isMainPath: true,
    isOptional: false,
    depth: 2,
  };

  const edges: RoomEdge[] = [
    { from: start.id, to: midA.id, corridorType: "L_turn", width: 2, isMainPath: true },
    { from: start.id, to: midCenter.id, corridorType: "straight", width: 2, isMainPath: true },
    { from: start.id, to: midB.id, corridorType: "L_turn", width: 2, isLoop: true, isMainPath: false },
    { from: midA.id, to: exit.id, corridorType: "L_turn", width: 2, isMainPath: true },
    { from: midCenter.id, to: exit.id, corridorType: "straight", width: 2, isMainPath: true },
    { from: midB.id, to: exit.id, corridorType: "L_turn", width: 2, isLoop: true, isMainPath: false },
  ];

  return {
    macroArchetype: "multiple_loops",
    nodes: [start, midA, midCenter, midB, exit],
    edges,
    startNodeId: start.id,
    exitNodeId: exit.id,
    mainPathNodeIds: [start.id, midCenter.id, exit.id],
    optionalNodeIds: [midA.id, midB.id],
    hasLoops: true,
    hasDeadEnds: false,
    loopCount: 2,
    deadEndCount: 0,
  };
}

function generateLongExpeditionTopology(floor: number, rng: RunRNG): DungeonGraph {
  const nodes: RoomNode[] = [];
  const edges: RoomEdge[] = [];
  const mainIds: string[] = [];

  const count = rng.int(4, 5);
  for (let i = 0; i < count; i++) {
    const isStart = i === 0;
    const isExit = i === count - 1;
    const kind: RoomKind = isStart
      ? "start"
      : isExit
      ? "elite"
      : i % 2 === 1
      ? "combat"
      : rng.pick(["rest", "treasure", "event"] as const);
    const size: RoomSizeCategory = isStart ? "small" : isExit ? "large" : "medium";
    const id = `expedition_${i}`;
    mainIds.push(id);

    nodes.push({
      id,
      kind,
      shape: pickShapeForKind(kind, size, rng, "long_expedition"),
      sizeCategory: size,
      gridX: i,
      gridY: 1,
      width: size === "small" ? 12 : size === "medium" ? 16 : 20,
      height: size === "small" ? 10 : size === "medium" ? 12 : 14,
      isMainPath: true,
      isOptional: false,
      depth: i,
    });

    if (i > 0) {
      edges.push({
        from: mainIds[i - 1],
        to: id,
        corridorType: rng.pick(["straight", "chokepoint", "pillared"] as const),
        width: rng.int(2, 3),
        isMainPath: true,
      });
    }
  }

  // Dead-end treasure alcove off room 2
  const alcoveId = "expedition_nook";
  nodes.push({
    id: alcoveId,
    kind: "treasure",
    shape: "vault",
    sizeCategory: "micro",
    gridX: 2,
    gridY: 0,
    width: 10,
    height: 8,
    isMainPath: false,
    isOptional: true,
    depth: 3,
  });
  edges.push({
    from: mainIds[2],
    to: alcoveId,
    corridorType: "straight",
    width: 1,
    isMainPath: false,
  });

  return {
    macroArchetype: "long_expedition",
    nodes,
    edges,
    startNodeId: mainIds[0],
    exitNodeId: mainIds[mainIds.length - 1],
    mainPathNodeIds: mainIds,
    optionalNodeIds: [alcoveId],
    hasLoops: false,
    hasDeadEnds: true,
    loopCount: 0,
    deadEndCount: 1,
  };
}

function generateCavernTopology(floor: number, rng: RunRNG): DungeonGraph {
  const start: RoomNode = {
    id: "cavern_start",
    kind: "start",
    shape: "cave_blob",
    sizeCategory: "small",
    gridX: 0,
    gridY: 1,
    width: 14,
    height: 12,
    isMainPath: true,
    isOptional: false,
    depth: 0,
  };

  const cavernMain: RoomNode = {
    id: "cavern_chamber",
    kind: "combat",
    shape: "cave_blob",
    sizeCategory: "large",
    gridX: 1,
    gridY: 1,
    width: 22,
    height: 16,
    isMainPath: true,
    isOptional: false,
    depth: 1,
  };

  const crystalCave: RoomNode = {
    id: "cavern_crystals",
    kind: "treasure",
    shape: "irregular",
    sizeCategory: "small",
    gridX: 1,
    gridY: 0,
    width: 12,
    height: 10,
    isMainPath: false,
    isOptional: true,
    depth: 2,
  };

  const exitCave: RoomNode = {
    id: "cavern_exit",
    kind: "elite",
    shape: "cave_blob",
    sizeCategory: "medium",
    gridX: 2,
    gridY: 1,
    width: 16,
    height: 14,
    isMainPath: true,
    isOptional: false,
    depth: 2,
  };

  const edges: RoomEdge[] = [
    { from: start.id, to: cavernMain.id, corridorType: "broken", width: 2, isMainPath: true },
    { from: cavernMain.id, to: crystalCave.id, corridorType: "straight", width: 2, isMainPath: false },
    { from: cavernMain.id, to: exitCave.id, corridorType: "broken", width: 3, isMainPath: true },
  ];

  return {
    macroArchetype: "cavern_network",
    nodes: [start, cavernMain, crystalCave, exitCave],
    edges,
    startNodeId: start.id,
    exitNodeId: exitCave.id,
    mainPathNodeIds: [start.id, cavernMain.id, exitCave.id],
    optionalNodeIds: [crystalCave.id],
    hasLoops: false,
    hasDeadEnds: true,
    loopCount: 0,
    deadEndCount: 1,
  };
}

function generateRuinedComplexTopology(floor: number, rng: RunRNG): DungeonGraph {
  const start: RoomNode = {
    id: "ruins_start",
    kind: "start",
    shape: "hall",
    sizeCategory: "small",
    gridX: 0,
    gridY: 1,
    width: 12,
    height: 10,
    isMainPath: true,
    isOptional: false,
    depth: 0,
  };

  const ruinedHall: RoomNode = {
    id: "ruins_hall",
    kind: "combat",
    shape: "ruins",
    sizeCategory: "large",
    gridX: 1,
    gridY: 1,
    width: 22,
    height: 16,
    isMainPath: true,
    isOptional: false,
    depth: 1,
  };

  const ruinedVault: RoomNode = {
    id: "ruins_vault",
    kind: "treasure",
    shape: "vault",
    sizeCategory: "small",
    gridX: 1,
    gridY: 2,
    width: 12,
    height: 10,
    isMainPath: false,
    isOptional: true,
    depth: 2,
  };

  const exit: RoomNode = {
    id: "ruins_exit",
    kind: "elite",
    shape: "multi_chamber",
    sizeCategory: "medium",
    gridX: 2,
    gridY: 1,
    width: 18,
    height: 14,
    isMainPath: true,
    isOptional: false,
    depth: 2,
  };

  const edges: RoomEdge[] = [
    { from: start.id, to: ruinedHall.id, corridorType: "pillared", width: 2, isMainPath: true },
    { from: ruinedHall.id, to: ruinedVault.id, corridorType: "chokepoint", width: 2, isMainPath: false },
    { from: ruinedHall.id, to: exit.id, corridorType: "wide", width: 3, isMainPath: true },
  ];

  return {
    macroArchetype: "ruined_complex",
    nodes: [start, ruinedHall, ruinedVault, exit],
    edges,
    startNodeId: start.id,
    exitNodeId: exit.id,
    mainPathNodeIds: [start.id, ruinedHall.id, exit.id],
    optionalNodeIds: [ruinedVault.id],
    hasLoops: false,
    hasDeadEnds: true,
    loopCount: 0,
    deadEndCount: 1,
  };
}

function generateArenaClustersTopology(floor: number, rng: RunRNG): DungeonGraph {
  const start: RoomNode = {
    id: "arena_start",
    kind: "start",
    shape: "compact",
    sizeCategory: "small",
    gridX: 0,
    gridY: 1,
    width: 12,
    height: 10,
    isMainPath: true,
    isOptional: false,
    depth: 0,
  };

  const arena1: RoomNode = {
    id: "arena_combat_1",
    kind: "combat",
    shape: "octagonal",
    sizeCategory: "medium",
    gridX: 1,
    gridY: 1,
    width: 16,
    height: 14,
    isMainPath: true,
    isOptional: false,
    depth: 1,
  };

  const arena2: RoomNode = {
    id: "arena_combat_2",
    kind: "elite",
    shape: "circular",
    sizeCategory: "large",
    gridX: 2,
    gridY: 1,
    width: 20,
    height: 16,
    isMainPath: true,
    isOptional: false,
    depth: 2,
  };

  const bonusArena: RoomNode = {
    id: "arena_bonus",
    kind: "treasure",
    shape: "vault",
    sizeCategory: "small",
    gridX: 1,
    gridY: 0,
    width: 12,
    height: 10,
    isMainPath: false,
    isOptional: true,
    depth: 2,
  };

  const edges: RoomEdge[] = [
    { from: start.id, to: arena1.id, corridorType: "straight", width: 2, isMainPath: true },
    { from: arena1.id, to: bonusArena.id, corridorType: "straight", width: 2, isMainPath: false },
    { from: arena1.id, to: arena2.id, corridorType: "wide", width: 3, isMainPath: true },
  ];

  return {
    macroArchetype: "arena_clusters",
    nodes: [start, arena1, arena2, bonusArena],
    edges,
    startNodeId: start.id,
    exitNodeId: arena2.id,
    mainPathNodeIds: [start.id, arena1.id, arena2.id],
    optionalNodeIds: [bonusArena.id],
    hasLoops: false,
    hasDeadEnds: true,
    loopCount: 0,
    deadEndCount: 1,
  };
}
