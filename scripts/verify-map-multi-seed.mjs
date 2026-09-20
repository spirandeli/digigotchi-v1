import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";

const defaultChromePath = [
  "/home/spira/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell",
  "/home/spira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome",
].find((p) => existsSync(p));

const SEEDS = [101, 202, 303, 404, 505];

async function runMultiSeedAudit() {
  console.log("=== INICIANDO VALIDAÇÃO DE 5 SEEDS DO CAMINHO DIGITAL ===");
  mkdirSync("screenshots/seeds", { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || defaultChromePath,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const results = [];

  try {
    for (const seed of SEEDS) {
      console.log(`\n--- Testando Seed ${seed} ---`);
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();

      await page.addInitScript((s) => {
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
          inventory: { carne_digital: 2 },
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
      }, seed);

      await page.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(800);

      const continueBtn = page.getByRole("button", { name: "Continuar" });
      await continueBtn.waitFor({ state: "visible", timeout: 8000 });
      await continueBtn.click();
      await page.waitForTimeout(600);

      const dpBtn = page.getByRole("button", { name: /caminho digital/i });
      await dpBtn.waitFor({ state: "visible", timeout: 8000 });
      await dpBtn.click();
      await page.waitForTimeout(400);

      const launchBtn = page.getByRole("button", { name: /iniciar caminho digital/i });
      await launchBtn.waitFor({ state: "visible", timeout: 6000 });
      await launchBtn.click();

      await page.waitForFunction(() => {
        const scene = window.__digitalPathActiveScene;
        return !!scene && !!scene.player && scene.player.active;
      }, { timeout: 15000 });
      await page.waitForTimeout(600);

      const audit = await page.evaluate(() => {
        const scene = window.__digitalPathActiveScene;
        const textures = scene.roomTileObjects.map((t) => t.texture?.key).filter(Boolean);
        const floorBase = textures.filter((k) => k.includes("floor_0")).length;
        const floorVar = textures.filter((k) => k.includes("floor_var")).length;
        const floorDecor = textures.filter((k) => k.includes("floor_decor")).length;
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
          enemies: scene.enemies?.length || 0,
        };
      });

      console.log(`[Seed ${seed}] Auditoria de Tiles:`, audit);
      await page.screenshot({ path: `screenshots/seeds/seed_${seed}.png` });

      results.push({ seed, ...audit });
      await context.close();
    }

    console.log("\n==========================================");
    console.log("✅ RESULTADOS DE TODAS AS 5 SEEDS:");
    console.table(results);
    console.log("==========================================\n");

  } finally {
    await browser.close();
  }
}

runMultiSeedAudit().catch((err) => {
  console.error("❌ ERRO NO AUDIT MULTI-SEED:", err);
  process.exit(1);
});
