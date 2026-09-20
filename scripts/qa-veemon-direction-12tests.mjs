import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const SCREENSHOT_DIR = path.resolve("screenshots/veemon-12directions");
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  console.log("==================================================");
  console.log("[QA DIREÇÃO VEEMON] Iniciando Teste das 12 Execuções Obrigatórias...");
  console.log("==================================================");

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" && !msg.text().includes("MODULE_LEVEL_DIRECTIVE")) {
      consoleErrors.push(msg.text());
    }
  });

  // 1. Injetar save com Veemon ativo via addInitScript
  await page.addInitScript(() => {
    const defaultPet = {
      lineId: "veemon",
      speciesId: "veemon",
      nickname: "Veemon",
      level: 12,
      experience: 430,
      hunger: 100,
      happiness: 80,
      energy: 100,
      hygiene: 100,
      health: 100,
      discipline: 50,
      coins: 200,
      inventory: { carne_digital: 2, fruta_digital: 2 },
      isSleeping: false,
      lastSimulatedAt: Date.now(),
      createdAt: Date.now(),
      evolutionStage: 0,
      digitalPath: {
        currentFloor: 1,
        highestFloor: 1,
        defeatedBosses: [],
        completed: false,
      },
    };
    localStorage.setItem("digital_pet_save_v2", JSON.stringify(defaultPet));
    localStorage.setItem("digital_pet_save_v2_backup", JSON.stringify(defaultPet));
  });

  // 2. Navegar para a aplicação
  await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle", timeout: 15000 });
  await sleep(1500);

  // Se tela inicial pedir "Continuar", clicar
  const contBtn = page.getByRole("button", { name: /continuar/i });
  if (await contBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await contBtn.click();
    await sleep(800);
  }

  // Clicar em "Caminho Digital"
  const dpBtn = page.getByRole("button", { name: /caminho digital/i });
  if (await dpBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await dpBtn.click();
    await sleep(800);
  }

  // Clicar no botão de iniciar/entrar
  const startBtn = page.getByRole("button", { name: /iniciar|começar|entrar/i });
  if (await startBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await startBtn.click();
    await sleep(1500);
  }

  // 3. Aguardar cena ativa do Phaser
  const isSceneActive = await page.waitForFunction(() => {
    return Boolean(window.__digitalPathActiveScene && window.__digitalPathActiveScene.player);
  }, { timeout: 15000 });

  if (!isSceneActive) {
    throw new Error("Phaser DigitalPathScene não inicializou a tempo.");
  }
  console.log("✓ Cena Phaser ativa com Veemon carregado com sucesso!");

  // Matriz de resultados das 12 execuções
  const results = {
    simples: {},
    projetil: {},
    especial: {},
  };

  const directions = ["right", "down", "left", "up"];

  for (const dir of directions) {
    console.log(`\n--------------------------------------------------`);
    console.log(`[TESTE] Direção: ${dir.toUpperCase()}`);
    console.log(`--------------------------------------------------`);

    // A. Orientar personagem na direção desejada (testando o estado parado/idle)
    await page.evaluate((targetDir) => {
      const scene = window.__digitalPathActiveScene;
      scene.setPlayerFacing(targetDir);
    }, dir);
    await sleep(150);

    const facingConfirmed = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      return {
        sceneFacing: scene.facingDirection,
        playerFacing: scene.player.facingDirection,
      };
    });

    if (facingConfirmed.sceneFacing !== dir || facingConfirmed.playerFacing !== dir) {
      throw new Error(`Falha ao orientar personagem para ${dir}: ${JSON.stringify(facingConfirmed)}`);
    }
    console.log(`  ✓ Personagem orientado para ${dir.toUpperCase()} (parado/idle)`);

    // B. Teste 1: Ataque Simples (Basic 1)
    await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      scene.performAttackBySlot("basic_1");
    });
    await sleep(200);

    const attack1Data = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      const ev = window.__lastAttackEvent;
      const center = scene.getPlayerCenter();
      return { ev, playerCenter: center, playerX: scene.player.x, playerY: scene.player.y };
    });

    let basic1Pass = false;
    if (attack1Data.ev && attack1Data.ev.slot === "basic_1" && attack1Data.ev.facing === dir) {
      const { originX, originY } = attack1Data.ev;
      const refX = attack1Data.ev.playerCenterX ?? attack1Data.playerCenter.x;
      const refY = attack1Data.ev.playerCenterY ?? attack1Data.playerCenter.y;
      if (dir === "right" && originX > refX) basic1Pass = true;
      if (dir === "left" && originX < refX) basic1Pass = true;
      if (dir === "up" && originY < refY) basic1Pass = true;
      if (dir === "down" && originY > refY) basic1Pass = true;
    }

    results.simples[dir] = basic1Pass ? "PASS" : "FAIL";
    console.log(`  [Simples] ${dir.toUpperCase()}: ${results.simples[dir]} (hitbox: x=${Math.round(attack1Data.ev.originX)}, y=${Math.round(attack1Data.ev.originY)})`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `01-simples-${dir}.png`) });

    // Aguardar cooldown do ataque 1
    await sleep(400);

    // C. Teste 2: Ataque Projétil (Basic 2)
    await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      scene.performAttackBySlot("basic_2");
    });
    await sleep(200);

    const attack2Data = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      const ev = window.__lastAttackEvent;
      const center = scene.getPlayerCenter();
      return { ev, playerCenter: center };
    });

    let basic2Pass = false;
    if (attack2Data.ev && attack2Data.ev.slot === "basic_2" && attack2Data.ev.facing === dir) {
      const { vx, vy, rotation } = attack2Data.ev;
      if (dir === "right" && vx > 0 && vy === 0 && Math.abs(rotation - 0) < 0.01) basic2Pass = true;
      if (dir === "left" && vx < 0 && vy === 0 && Math.abs(rotation - Math.PI) < 0.01) basic2Pass = true;
      if (dir === "up" && vx === 0 && vy < 0 && Math.abs(rotation - (-Math.PI / 2)) < 0.01) basic2Pass = true;
      if (dir === "down" && vx === 0 && vy > 0 && Math.abs(rotation - Math.PI / 2) < 0.01) basic2Pass = true;
    }

    results.projetil[dir] = basic2Pass ? "PASS" : "FAIL";
    console.log(`  [Projétil] ${dir.toUpperCase()}: ${results.projetil[dir]} (vx=${attack2Data.ev.vx}, vy=${attack2Data.ev.vy}, rot=${attack2Data.ev.rotation?.toFixed(2)})`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `02-projetil-${dir}.png`) });

    // Aguardar cooldown do ataque 2
    await sleep(600);

    // D. Teste 3: Ataque Especial (Special)
    await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      scene.performAttackBySlot("special");
    });
    await sleep(250);

    const specialData = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      const ev = window.__lastAttackEvent;
      const center = scene.getPlayerCenter();
      return { ev, playerCenter: center };
    });

    let specialPass = false;
    if (specialData.ev && specialData.ev.slot === "special" && specialData.ev.facing === dir) {
      const { originX, originY, vx, vy, rotation } = specialData.ev;
      const refX = specialData.ev.playerCenterX ?? specialData.playerCenter.x;
      const refY = specialData.ev.playerCenterY ?? specialData.playerCenter.y;
      if (dir === "right" && originX > refX && vx > 0 && vy === 0 && Math.abs(rotation - 0) < 0.01) specialPass = true;
      if (dir === "left" && originX < refX && vx < 0 && vy === 0 && Math.abs(rotation - Math.PI) < 0.01) specialPass = true;
      if (dir === "up" && originY < refY && vx === 0 && vy < 0 && Math.abs(rotation - (-Math.PI / 2)) < 0.01) specialPass = true;
      if (dir === "down" && originY > refY && vx === 0 && vy > 0 && Math.abs(rotation - Math.PI / 2) < 0.01) specialPass = true;
    }

    results.especial[dir] = specialPass ? "PASS" : "FAIL";
    console.log(`  [Especial] ${dir.toUpperCase()}: ${results.especial[dir]} (spawn: x=${Math.round(specialData.ev.originX)}, y=${Math.round(specialData.ev.originY)}, vx=${specialData.ev.vx}, vy=${specialData.ev.vy})`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, `03-especial-${dir}.png`) });

    // Resetar cooldowns para a próxima direção
    await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      scene.specialCooldownUntil = 0;
      scene.basic1CooldownUntil = 0;
      scene.basic2CooldownUntil = 0;
      scene.isPlayerAttacking = false;
    });
    await sleep(200);
  }

  console.log("\n==================================================");
  console.log("TABELA DE VALIDAÇÃO FINAL (12 EXECUÇÕES)");
  console.log("==================================================");
  console.log("| Habilidade | Right | Left | Up   | Down |");
  console.log("| ---------- | ----- | ---- | ---- | ---- |");
  console.log(`| Simples    | ${results.simples.right}  | ${results.simples.left} | ${results.simples.up} | ${results.simples.down} |`);
  console.log(`| Projétil   | ${results.projetil.right}  | ${results.projetil.left} | ${results.projetil.up} | ${results.projetil.down} |`);
  console.log(`| Especial   | ${results.especial.right}  | ${results.especial.left} | ${results.especial.up} | ${results.especial.down} |`);
  console.log("==================================================");

  const allPassed =
    Object.values(results.simples).every((v) => v === "PASS") &&
    Object.values(results.projetil).every((v) => v === "PASS") &&
    Object.values(results.especial).every((v) => v === "PASS");

  if (!allPassed) {
    throw new Error("Pelo menos uma das 12 execuções falhou!");
  }

  console.log("✓ SUCESSO ABSOLUTO: Todas as 12 execuções direcionais foram aprovadas com distinção!");
  console.log(`✓ Erros de console críticos: ${consoleErrors.length}`);
  await browser.close();
}

run().catch((err) => {
  console.error("ERRO NO TESTE DE DIREÇÕES:", err);
  process.exit(1);
});
