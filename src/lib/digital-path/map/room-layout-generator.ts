import type { RunRNG } from "./rng";
import type { DungeonGraph, RoomNode, Tile } from "./types";
import { carveRoomShape } from "./room-shape-generator";
import { carveCorridor } from "./corridor-generator";

export interface LayoutResult {
  width: number;
  height: number;
  tiles: Tile[][];
  spawn: { x: number; y: number };
  exit: { x: number; y: number };
  roomBounds: Map<string, { x: number; y: number; width: number; height: number }>;
  deadEndTile?: { x: number; y: number };
}

export function layoutDungeonGraph(
  graph: DungeonGraph,
  rng: RunRNG,
  targetWidth?: number,
  targetHeight?: number
): LayoutResult {
  const nodes = graph.nodes;
  const edges = graph.edges;

  // Determine grid bounding dimensions based on node grid coordinates
  const minGridX = Math.min(...nodes.map((n) => n.gridX));
  const maxGridX = Math.max(...nodes.map((n) => n.gridX));
  const minGridY = Math.min(...nodes.map((n) => n.gridY));
  const maxGridY = Math.max(...nodes.map((n) => n.gridY));

  const totalCols = Math.max(1, maxGridX - minGridX + 1);
  const totalRows = Math.max(1, maxGridY - minGridY + 1);

  // If targetWidth/targetHeight are supplied, strictly respect them!
  const padding = 1;
  const mapW = targetWidth ?? Math.max(28, totalCols * 14 + padding * 2);
  const mapH = targetHeight ?? Math.max(18, totalRows * 12 + padding * 2);

  const tiles: Tile[][] = Array.from({ length: mapH }, () =>
    Array.from({ length: mapW }, () => "wall" as Tile)
  );

  const roomBounds = new Map<string, { x: number; y: number; width: number; height: number }>();
  const roomCenters = new Map<string, { x: number; y: number }>();

  const availableW = mapW - padding * 2;
  const availableH = mapH - padding * 2;
  const cellW = Math.max(7, Math.floor(availableW / totalCols));
  const cellH = Math.max(6, Math.floor(availableH / totalRows));

  // 1. Position and Carve each Room
  for (const node of nodes) {
    const col = node.gridX - minGridX;
    const row = node.gridY - minGridY;

    let rW: number;
    let rH: number;

    if (nodes.length === 1 || node.kind === "boss") {
      // Single major room/arena expands across the available canvas
      rW = Math.max(8, mapW - 2);
      rH = Math.max(6, mapH - 2);
    } else {
      rW = Math.max(7, Math.min(cellW, Math.floor(availableW * 0.5)));
      rH = Math.max(6, Math.min(cellH, Math.floor(availableH * 0.5)));
    }

    const originX = padding + col * cellW + Math.floor((cellW - rW) / 2);
    const originY = padding + row * cellH + Math.floor((cellH - rH) / 2);

    const boundedX = Math.max(1, Math.min(mapW - rW - 1, originX));
    const boundedY = Math.max(1, Math.min(mapH - rH - 1, originY));

    roomBounds.set(node.id, { x: boundedX, y: boundedY, width: rW, height: rH });
    roomCenters.set(node.id, {
      x: boundedX + Math.floor(rW / 2),
      y: boundedY + Math.floor(rH / 2),
    });

    carveRoomShape(tiles, {
      shape: node.shape,
      x: boundedX,
      y: boundedY,
      width: rW,
      height: rH,
      rng,
      addSubstructures: node.isMainPath && rW >= 12 && rH >= 10,
    });
  }

  // 2. Carve Corridors for each Edge
  for (const edge of edges) {
    const fromCenter = roomCenters.get(edge.from);
    const toCenter = roomCenters.get(edge.to);
    if (!fromCenter || !toCenter) continue;

    carveCorridor(tiles, {
      type: edge.corridorType,
      x1: fromCenter.x,
      y1: fromCenter.y,
      x2: toCenter.x,
      y2: toCenter.y,
      width: Math.min(2, edge.width),
      rng,
    });
  }

  // 3. Establish Spawn and Exit Points
  const startCenter = roomCenters.get(graph.startNodeId) || { x: 3, y: Math.floor(mapH / 2) };
  const exitCenter = roomCenters.get(graph.exitNodeId) || { x: mapW - 4, y: Math.floor(mapH / 2) };

  const startBounds = roomBounds.get(graph.startNodeId);
  const exitBounds = roomBounds.get(graph.exitNodeId);

  const spawn = {
    x: startBounds ? startBounds.x + 2 : startCenter.x,
    y: startBounds ? startBounds.y + Math.floor(startBounds.height / 2) : startCenter.y,
  };

  const exit = {
    x: exitBounds ? exitBounds.x + exitBounds.width - 3 : exitCenter.x,
    y: exitBounds ? exitBounds.y + Math.floor(exitBounds.height / 2) : exitCenter.y,
  };

  // Guarantee floor on spawn and exit + 3x3 surrounding clearance
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const sx = spawn.x + dx;
      const sy = spawn.y + dy;
      if (sx > 0 && sx < mapW - 1 && sy > 0 && sy < mapH - 1) tiles[sy][sx] = "floor";

      const ex = exit.x + dx;
      const ey = exit.y + dy;
      if (ex > 0 && ex < mapW - 1 && ey > 0 && ey < mapH - 1) tiles[ey][ex] = "floor";
    }
  }

  // Dead end tile for optional rewards
  let deadEndTile: { x: number; y: number } | undefined = undefined;
  if (graph.optionalNodeIds.length > 0) {
    const optId = graph.optionalNodeIds[0];
    const optCenter = roomCenters.get(optId);
    if (optCenter) {
      deadEndTile = optCenter;
    }
  }

  return {
    width: mapW,
    height: mapH,
    tiles,
    spawn,
    exit,
    roomBounds,
    deadEndTile,
  };
}
