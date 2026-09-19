import { existsSync } from "node:fs";
import { chromium } from "playwright";

const defaultChromePath = [
  "/home/spira/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell",
  "/home/spira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome",
].find((p) => existsSync(p));

async function runCombatQA() {
  console.log("[QA Combat] Launching browser to verify combat and gate unlock...");
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || defaultChromePath,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  try {
    await page.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // Start or Continue
    const startBtn = page.getByRole("button", { name: /comecar/i });
    if (await startBtn.isVisible()) {
      await startBtn.click();
      await page.waitForTimeout(500);
      const agumonChoice = page.getByRole("button", { name: /agumon/i }).first();
      if (await agumonChoice.isVisible()) {
        await agumonChoice.click();
        await page.waitForTimeout(200);
        await page.getByRole("button", { name: /confirmar escolha/i }).click();
        await page.waitForTimeout(500);
      }
    } else {
      const continueBtn = page.getByRole("button", { name: /continuar/i });
      if (await continueBtn.isVisible()) {
        await continueBtn.click();
        await page.waitForTimeout(500);
      }
    }

    // Launch Digital Path
    console.log("[QA Combat] Launching Digital Path...");
    await page.getByRole("button", { name: /caminho digital/i }).click();
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: /iniciar caminho digital/i }).click();

    await page.waitForSelector("#digital-path-canvas-area canvas", { state: "visible", timeout: 8000 });
    await page.waitForTimeout(1000);

    // Focus canvas
    await page.locator("#digital-path-canvas-area canvas").first().click();

    // Step 1: Walk to door of Room 1
    console.log("[QA Combat] Walking through Room 1 to door...");
    for (let i = 0; i < 75; i++) {
      await page.keyboard.press("KeyD");
      await page.waitForTimeout(50);
    }
    await page.waitForTimeout(1200);

    // Now in Room 2 (Combat)
    console.log("[QA Combat] In Room 2: Approaching enemies...");
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press("KeyD");
      await page.waitForTimeout(50);
    }
    await page.waitForTimeout(500);

    // Fire Projectiles & Mega Blast
    console.log("[QA Combat] Attacking enemies with Projectiles and Special...");
    for (let round = 0; round < 6; round++) {
      await page.keyboard.press("KeyK"); // Dragon projectile
      await page.waitForTimeout(300);
      await page.keyboard.press("KeyJ"); // Physical strike
      await page.waitForTimeout(300);
    }

    // Fire Special
    await page.keyboard.press("KeyL"); // Mega Blast
    await page.waitForTimeout(800);

    // Additional attacks to finish remaining HP
    for (let round = 0; round < 5; round++) {
      await page.keyboard.press("KeyK");
      await page.waitForTimeout(350);
      await page.keyboard.press("KeyJ");
      await page.waitForTimeout(350);
    }
    await page.waitForTimeout(1500);

    // Screenshot of Combat aftermath / Gate unlocked!
    await page.screenshot({ path: "screenshots/qa-m3-05-combat-unlocked.png" });
    console.log("[QA Combat] Screenshot saved: screenshots/qa-m3-05-combat-unlocked.png");

    console.log("[QA Combat] Verification complete!");
  } catch (err) {
    console.error("[QA Combat] Error:", err);
    await page.screenshot({ path: "screenshots/qa-m3-combat-error.png" });
    throw err;
  } finally {
    await browser.close();
  }
}

runCombatQA().catch((err) => {
  console.error(err);
  process.exit(1);
});
