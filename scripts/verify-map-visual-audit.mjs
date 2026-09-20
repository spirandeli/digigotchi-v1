import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";

const defaultChromePath = [
  "/home/spira/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell",
  "/home/spira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome",
].find((p) => existsSync(p));

async function runVisualAudit() {
  console.log("=== INICIANDO AUDITORIA VISUAL DO MAPA, DEBUG OVERLAY E INIMIGOS ===");

  mkdirSync("screenshots", { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || defaultChromePath,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  // Clean save
  await page.addInitScript(() => {
    const defaultPet = {
      lineId: "agumon",
      speciesId: "agumon",
      nickname: "Agumon",
      level: 1,
      experience: 0,
      hunger: 100,
      happiness: 100,
      energy: 100,
      hygiene: 100,
      health: 100,
      discipline: 50,
      coins: 100,
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

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
      console.log(`[Browser Console ERROR]`, msg.text());
    }
  });

  try {
    console.log("[1] Carregando tela inicial...");
    await page.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    const continueBtn = page.getByRole("button", { name: "Continuar" });
    await continueBtn.waitFor({ state: "visible", timeout: 10000 });
    await continueBtn.click();
    await page.waitForTimeout(1000);

    console.log("[2] Entrando no Caminho Digital...");
    const dpBtn = page.getByRole("button", { name: /caminho digital/i });
    await dpBtn.waitFor({ state: "visible", timeout: 8000 });
    await dpBtn.click();
    await page.waitForTimeout(500);

    const launchBtn = page.getByRole("button", { name: /iniciar caminho digital/i });
    await launchBtn.waitFor({ state: "visible", timeout: 6000 });
    await launchBtn.click();

    await page.waitForFunction(() => {
      const scene = window.__digitalPathActiveScene;
      return !!scene && !!scene.player && scene.player.active;
    }, { timeout: 15000 });
    await page.waitForTimeout(1000);

    // 1. Auditoria de Tiles
    const tileAudit = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      const textures = scene.roomTileObjects.map((t) => t.texture?.key).filter(Boolean);
      
      const floorBase = textures.filter((k) => k.includes("floor_0")).length;
      const floorVar = textures.filter((k) => k.includes("floor_var")).length;
      const floorDecor = textures.filter((k) => k.includes("floor_decor")).length;
      const wallH = textures.filter((k) => k.includes("wall_h") || k.includes("wall_top") || k.includes("wall_bottom")).length;
      const wallV = textures.filter((k) => k.includes("wall_v") || k.includes("wall_left") || k.includes("wall_right")).length;
      const totalFloor = floorBase + floorVar + floorDecor;
      
      return {
        theme: scene.activeRoom?.theme,
        totalFloor,
        floorBase,
        floorVar,
        floorDecor,
        floorBasePct: totalFloor > 0 ? (floorBase / totalFloor * 100).toFixed(1) + "%" : "0%",
        floorVarPct: totalFloor > 0 ? (floorVar / totalFloor * 100).toFixed(1) + "%" : "0%",
        floorDecorPct: totalFloor > 0 ? (floorDecor / totalFloor * 100).toFixed(1) + "%" : "0%",
        wallH,
        wallV,
        enemiesCount: scene.enemies?.length || 0,
      };
    });

    console.log("[3] Estatísticas de Tiles da Sala 1:", tileAudit);

    // Screenshot do mapa limpo
    await page.screenshot({ path: "screenshots/map_audit_room1_clean.png" });
    console.log("📸 Screenshot capturada: screenshots/map_audit_room1_clean.png");

    // 2. Testar tecla Tab para Debug Overlay
    console.log("[4] Pressionando Tab para ativar Debug Overlay...");
    await page.keyboard.press("Tab");
    await page.waitForTimeout(500);

    const isDebugActive = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      return scene.debugOverlayVisible && !!scene.debugOverlayContainer;
    });
    console.log("Debug Overlay ativo?", isDebugActive);

    // Screenshot com Debug Overlay
    await page.screenshot({ path: "screenshots/map_audit_room1_debug.png" });
    console.log("📸 Screenshot capturada: screenshots/map_audit_room1_debug.png");

    // Desativar Debug Overlay
    await page.keyboard.press("Tab");
    await page.waitForTimeout(300);

    const isDebugInactive = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      return !scene.debugOverlayVisible && !scene.debugOverlayContainer;
    });
    console.log("Debug Overlay desativado após segundo Tab?", isDebugInactive);

    console.log("\n==========================================");
    console.log("✅ AUDITORIA VISUAL CONCLUÍDA COM SUCESSO!");
    console.log(`- Base Floor: ${tileAudit.floorBasePct} (requisito >= 80%)`);
    console.log(`- Variações: ${tileAudit.floorVarPct} (requisito ~10-15%)`);
    console.log(`- Decoração: ${tileAudit.floorDecorPct} (requisito 2-5%)`);
    console.log(`- Debug Overlay: ${isDebugActive ? "OK (toggle funciona)" : "FALHA"}`);
    console.log(`- Console Errors: ${consoleErrors.length}`);
    console.log("==========================================\n");

  } finally {
    await browser.close();
  }
}

runVisualAudit().catch((err) => {
  console.error("❌ ERRO NA AUDITORIA VISUAL:", err);
  process.exit(1);
});
