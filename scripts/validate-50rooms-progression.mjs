import assert from "node:assert/strict";
import {
  TOTAL_ROOMS,
  BOSS_ROOMS,
  CHEST_ROOMS,
  RENDER_DEPTH,
  getRoomKind,
  getBiomeForFloor,
  generateSingleRoom,
  findValidSpawnTile,
  calculateEnemyStats,
  calculateEnemyCount,
  isPathConnected,
} from "../src/lib/digital-path/map/procedural-map.ts";
import { RunRNG } from "../src/lib/digital-path/map/rng.ts";

console.log("=== INICIANDO AUDITORIA DO CAMINHO DIGITAL: 50 SALAS, BOSSES, BAÚS E DEPTH ===");

// 1. Validação de Depth / Hierarquia Visual
console.log("\n[1/6] Validando Hierarquia de Camadas e Depth...");
assert.equal(RENDER_DEPTH.BACKGROUND, 0);
assert.equal(RENDER_DEPTH.FLOOR, 1);
assert.equal(RENDER_DEPTH.WALL_BASE, 2);
assert.equal(RENDER_DEPTH.SPAWN_RING, 4);
assert.equal(RENDER_DEPTH.ENTITIES, 10);
assert.equal(RENDER_DEPTH.ENTITIES_OVERLAY, 11);
assert.equal(RENDER_DEPTH.WALL_FOREGROUND, 15);
assert.equal(RENDER_DEPTH.PROJECTILES, 22);
assert.equal(RENDER_DEPTH.VFX, 25);
assert.equal(RENDER_DEPTH.FLOATING_TEXT, 30);
assert.equal(RENDER_DEPTH.HUD, 40);

// Player (10) deve estar estritamente acima do chão (1) e do spawn ring (4)
assert.ok(RENDER_DEPTH.ENTITIES > RENDER_DEPTH.FLOOR, "Personagem deve estar acima do chão");
assert.ok(RENDER_DEPTH.ENTITIES > RENDER_DEPTH.SPAWN_RING, "Personagem deve estar acima do efeito de chão");
assert.ok(RENDER_DEPTH.ENTITIES > RENDER_DEPTH.WALL_BASE, "Personagem deve estar acima da base da parede");

// Foreground wall rim (15) deve estar acima das entidades (10) para oclusão legítima da cabeça
assert.ok(RENDER_DEPTH.WALL_FOREGROUND > RENDER_DEPTH.ENTITIES, "Foreground deve estar acima das entidades para oclusão");

// Projéteis (22), VFX (25), Floating Text (30) e HUD (40) devem estar acima das entidades e walls
assert.ok(RENDER_DEPTH.PROJECTILES > RENDER_DEPTH.WALL_FOREGROUND, "Projéteis acima de paredes");
assert.ok(RENDER_DEPTH.VFX > RENDER_DEPTH.PROJECTILES, "VFX acima de projéteis");
assert.ok(RENDER_DEPTH.HUD > RENDER_DEPTH.FLOATING_TEXT, "HUD acima de textos flutuantes");
console.log("✔ Hierarquia de depth aprovada: Chão(1) < Player(10) < Foreground(15) < VFX(25) < HUD(40)");

// 2. Validação das 50 Salas e Bosses
console.log("\n[2/6] Validando Sequência de 50 Salas e 5 Bosses...");
assert.equal(TOTAL_ROOMS, 50, "Total de salas deve ser exatamente 50");
assert.deepEqual(Array.from(BOSS_ROOMS), [10, 20, 30, 40, 50], "Bosses nas salas 10, 20, 30, 40, 50");

for (const b of BOSS_ROOMS) {
  assert.equal(getRoomKind(b), "boss", `Sala ${b} deve ser do tipo boss`);
}
console.log("✔ 5 Bosses configurados exatamente nas salas 10, 20, 30, 40 e 50");

// 3. Validação dos 9 Baús Garantidos
console.log("\n[3/6] Validando 9 Baús Garantidos sem RNG...");
assert.equal(CHEST_ROOMS.length, 9, "Devem existir exatamente 9 baús garantidos");
assert.deepEqual(Array.from(CHEST_ROOMS), [5, 11, 15, 21, 25, 31, 35, 41, 45]);

for (const c of CHEST_ROOMS) {
  assert.equal(getRoomKind(c), "treasure", `Sala ${c} deve ser do tipo treasure`);
  assert.ok(!BOSS_ROOMS.includes(c), `Sala ${c} de baú não pode ser sala de boss`);
}
console.log("✔ 9 Baús garantidos nas salas 5, 11, 15, 21, 25, 31, 35, 41, 45 (zero sobreposição com boss)");

// 4. Validação da Progressão de Inimigos e Spawns pelas 50 Salas
console.log("\n[4/6] Validando Geração Procedural, Inimigos e Spawns nas 50 Salas...");
const seed = 987654;
for (let r = 1; r <= TOTAL_ROOMS; r++) {
  const roomSeed = (seed ^ (r * 2654435761)) >>> 0;
  const biome = getBiomeForFloor(r);
  const kind = getRoomKind(r);
  const room = generateSingleRoom(`room_${r}`, r - 1, kind, roomSeed, biome, r);

  // Conectividade
  const connected = isPathConnected(room.tiles, room.spawn, room.exit, room.width, room.height);
  assert.ok(connected, `Sala ${r} deve possuir caminho navegável do spawn até a saída`);

  // Spawn do jogador válido
  const validSpawn = findValidSpawnTile(room);
  assert.equal(room.tiles[validSpawn.y][validSpawn.x], "floor", `Spawn da Sala ${r} deve ser chão`);
  assert.ok(
    isPathConnected(room.tiles, validSpawn, room.exit, room.width, room.height),
    `Spawn validado da Sala ${r} deve estar conectado à saída`
  );

  if (kind === "boss") {
    // Sala de Chefe
    assert.equal(room.enemies.length, 1, `Sala de Boss ${r} deve conter exatamente 1 chefe`);
    const boss = room.enemies[0];
    assert.equal(boss.kind, "boss");
    assert.equal(boss.level, r, `Level do Boss na Sala ${r} deve ser ${r}`);
    assert.ok(boss.hp > 200, `HP do Boss ${r} deve ser condizente`);
    assert.ok(boss.attack > 10, `Ataque do Boss ${r} deve ser condizente`);
  } else if (kind === "treasure") {
    // Sala de Baú
    const hasChest = room.props.some((p) => p.type === "chest");
    assert.ok(hasChest, `Sala de Baú ${r} deve conter prop de baú`);
  } else {
    // Sala normal de combate
    assert.ok(room.enemies.length >= 3, `Sala ${r} deve ter no mínimo 3 inimigos`);
    if (r <= 15) {
      assert.ok(room.enemies.length <= 5, `Sala inicial ${r} deve ter no máximo 5 inimigos`);
    } else if (r <= 35) {
      assert.ok(room.enemies.length <= 7, `Sala intermediária ${r} deve ter no máximo 7 inimigos`);
    } else {
      assert.ok(room.enemies.length <= 9, `Sala final ${r} deve ter no máximo 9 inimigos`);
    }

    for (const en of room.enemies) {
      // Distância segura do spawn do jogador
      const distToSpawn = Math.hypot(en.tileX - validSpawn.x, en.tileY - validSpawn.y);
      assert.ok(
        distToSpawn >= 4.0,
        `Inimigo ${en.id} na Sala ${r} muito próximo do spawn (${distToSpawn.toFixed(1)} tiles)`
      );

      // Level do inimigo deve ser r ± 1
      assert.ok(
        en.level >= Math.max(1, r - 1) && en.level <= Math.min(50, r + 1),
        `Level do inimigo na Sala ${r} deve estar próximo de ${r}, recebido: ${en.level}`
      );
    }
  }
}
console.log("✔ Todas as 50 salas geradas com sucesso: BFS 100%, spawns seguros, contagem balanceada");

// 5. Validação da Escala Real de Atributos dos Inimigos
console.log("\n[5/6] Validando Escala Real de Atributos com o Level...");
const stats1 = calculateEnemyStats(40, 10, 2, 50, 1500, 20, 10, 1, false);
const stats10 = calculateEnemyStats(40, 10, 2, 50, 1500, 20, 10, 10, false);
const stats25 = calculateEnemyStats(40, 10, 2, 50, 1500, 20, 10, 25, false);
const stats50 = calculateEnemyStats(40, 10, 2, 50, 1500, 20, 10, 50, false);

assert.ok(stats10.hp > stats1.hp, "HP deve aumentar com o level");
assert.ok(stats10.attack > stats1.attack, "Ataque deve aumentar com o level");
assert.ok(stats25.hp > stats10.hp, "HP cresce gradualmente até a sala 25");
assert.ok(stats50.hp > stats25.hp, "HP cresce gradualmente até a sala 50");
assert.ok(stats50.xpReward > stats1.xpReward, "XP deve acompanhar o level");
assert.ok(stats50.speed <= 85, "Velocidade deve ter limite seguro");
console.log(`  Lv. 1: HP ${stats1.hp}, ATK ${stats1.attack}, DEF ${stats1.defense}, XP ${stats1.xpReward}`);
console.log(`  Lv. 10: HP ${stats10.hp}, ATK ${stats10.attack}, DEF ${stats10.defense}, XP ${stats10.xpReward}`);
console.log(`  Lv. 25: HP ${stats25.hp}, ATK ${stats25.attack}, DEF ${stats25.defense}, XP ${stats25.xpReward}`);
console.log(`  Lv. 50: HP ${stats50.hp}, ATK ${stats50.attack}, DEF ${stats50.defense}, XP ${stats50.xpReward}`);
console.log("✔ Atributos escalam de forma equilibrada e gradual");

// 6. Sala 50 e Término da Run
console.log("\n[6/6] Validando Término na Sala 50...");
const room50 = generateSingleRoom("room_50", 49, "boss", seed, getBiomeForFloor(50), 50);
assert.equal(room50.floor, 50);
assert.equal(room50.kind, "boss");
assert.equal(room50.enemies.length, 1);
assert.ok(room50.enemies[0].name.includes("BlackWarGreymon") || room50.enemies[0].name.includes("Chefe Final"));
console.log("✔ Sala 50 contém o Chefe Final e conclui a run.");

console.log("\n=======================================================");
console.log("✅ TODAS AS AUDITORIAS DO CAMINHO DIGITAL FORAM APROVADAS!");
console.log("=======================================================");
