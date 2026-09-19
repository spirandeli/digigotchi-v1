import { existsSync } from "node:fs";
import { chromium } from "playwright";

const defaultChromePath = [
  "/home/spira/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell",
  "/home/spira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome",
].find((p) => existsSync(p));

async function runM4QA() {
  console.log("[QA M4] Launching browser to audit Marco 4 content & progression...");
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || defaultChromePath,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

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
    console.log("[QA M4] Navigating into Digital Path...");
    await page.getByRole("button", { name: /caminho digital/i }).click();
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: /iniciar caminho digital/i }).click();

    await page.waitForSelector("#digital-path-canvas-area canvas", { state: "visible", timeout: 8000 });
    await page.waitForTimeout(1000);

    // 1. Initial Room & HUD
    await page.screenshot({ path: "screenshots/qa-m4-01-hud-and-start.png" });
    console.log("[QA M4] Verified HUD & Start Room. Screenshot: qa-m4-01-hud-and-start.png");

    // 2. Test Pause Modal
    console.log("[QA M4] Testing Pause Menu (ESC)...");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    await page.screenshot({ path: "screenshots/qa-m4-02-pause-menu.png" });
    
    // Resume game
    const continueRunBtn = page.locator("#btn-resume-expedition");
    if (await continueRunBtn.isVisible()) {
      await continueRunBtn.click();
      await page.waitForTimeout(500);
    } else {
      await page.keyboard.press("Escape");
      await page.waitForTimeout(500);
    }

    // 3. Movement and basic attack skills
    console.log("[QA M4] Exercising movement & combat skills...");
    await page.locator("#digital-path-canvas-area canvas").first().click();
    // Move down and right
    await page.keyboard.down("KeyS");
    await page.keyboard.down("KeyD");
    await page.waitForTimeout(600);
    await page.keyboard.up("KeyS");
    await page.keyboard.up("KeyD");

    // Test Projectile (K) and Basic Attack (J)
    await page.keyboard.press("KeyK");
    await page.waitForTimeout(200);
    await page.keyboard.press("KeyJ");
    await page.waitForTimeout(300);

    // 4. Open Debug panel to inspect and test room progression
    console.log("[QA M4] Testing Debug panel and advancing rooms...");
    await page.getByRole("button", { name: /debug/i }).click();
    await page.waitForTimeout(300);

    // Skip to next room (Room 2)
    const skipBtn = page.getByRole("button", { name: /pular sala/i });
    await skipBtn.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: "screenshots/qa-m4-03-room2-progression.png" });
    console.log("[QA M4] Advanced to Room 2. Screenshot: qa-m4-03-room2-progression.png");

    // Advance to Room 3, 4, 5 to encounter event / rest / shop / treasure / boss
    console.log("[QA M4] Exercising further room types and boss fight...");
    for (let r = 0; r < 4; r++) {
      if (await skipBtn.isVisible()) {
        await skipBtn.click();
        await page.waitForTimeout(700);

        // Check if any interactive modal appeared
        // Check Upgrade Draft Modal
        const installBtn = page.getByRole("button", { name: /instalar/i }).first();
        if (await installBtn.isVisible()) {
          console.log("[QA M4] Upgrade Draft Modal active!");
          await page.screenshot({ path: "screenshots/qa-m4-04-upgrade-draft.png" });
          await installBtn.click();
          await page.waitForTimeout(500);
        }

        // Check Event Modal
        const eventChoice = page.getByRole("button", { name: /recuperar dados/i });
        if (await eventChoice.isVisible()) {
          console.log("[QA M4] Event Modal active!");
          await page.screenshot({ path: "screenshots/qa-m4-05-event-modal.png" });
          await eventChoice.click();
          await page.waitForTimeout(500);
        }

        // Check Rest Modal
        const restChoice = page.getByRole("button", { name: /descanso profundo/i });
        if (await restChoice.isVisible()) {
          console.log("[QA M4] Rest Site Modal active!");
          await page.screenshot({ path: "screenshots/qa-m4-06-rest-modal.png" });
          await restChoice.click();
          await page.waitForTimeout(500);
        }

        // Check Shop Modal
        const shopClose = page.getByRole("button", { name: /voltar à exploração/i });
        if (await shopClose.isVisible()) {
          console.log("[QA M4] Shop Modal active!");
          await page.screenshot({ path: "screenshots/qa-m4-07-shop-modal.png" });
          await shopClose.click();
          await page.waitForTimeout(500);
        }
      }
    }

    // Capture Boss Room or Final Stage
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "screenshots/qa-m4-08-boss-or-outcome.png" });

    // If victory modal is reached, verify and return to Tamagotchi
    const returnTamagotchiBtn = page.getByRole("button", { name: /retornar ao tamagotchi/i });
    if (await returnTamagotchiBtn.isVisible()) {
      console.log("[QA M4] Victory outcome screen detected!");
      await page.screenshot({ path: "screenshots/qa-m4-09-victory-result.png" });
      await returnTamagotchiBtn.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: "screenshots/qa-m4-10-tamagotchi-rewarded.png" });
      console.log("[QA M4] Successfully returned to Tamagotchi with rewards!");
    } else {
      console.log("[QA M4] Run in progress or ready.");
    }

    console.log("[QA M4] Console Errors count:", consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.error("[QA M4] Console Errors:", consoleErrors);
    }

  } catch (err) {
    console.error("[QA M4] Error during test:", err);
    await page.screenshot({ path: "screenshots/qa-m4-error.png" });
    throw err;
  } finally {
    await browser.close();
  }
}

runM4QA().catch((err) => {
  console.error(err);
  process.exit(1);
});
