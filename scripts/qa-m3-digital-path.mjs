import { existsSync } from "node:fs";
import { chromium } from "playwright";

const defaultChromePath = [
  "/home/spira/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell",
  "/home/spira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome",
].find((p) => existsSync(p));

async function runQA() {
  console.log("[QA] Launching browser for Marco 3 verification...");
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
    console.log("[QA] Step 1: Navigating to http://127.0.0.1:8080/ ...");
    await page.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // If on start screen ("Comecar" or "Continuar")
    const startBtn = page.getByRole("button", { name: /comecar/i });
    if (await startBtn.isVisible()) {
      console.log("[QA] Clicking 'Comecar'...");
      await startBtn.click();
      await page.waitForTimeout(600);
    }

    // If on choose screen, pick Agumon and confirm
    const agumonChoice = page.getByRole("button", { name: /agumon/i }).first();
    if (await agumonChoice.isVisible()) {
      console.log("[QA] Choosing Agumon...");
      await agumonChoice.click();
      await page.waitForTimeout(300);

      const confirmChoiceBtn = page.getByRole("button", { name: /confirmar escolha/i });
      if (await confirmChoiceBtn.isVisible()) {
        console.log("[QA] Confirming Agumon choice...");
        await confirmChoiceBtn.click();
        await page.waitForTimeout(600);
      }
    }

    // Now in Tamagotchi PlayScreen
    console.log("[QA] Step 2: Locating 'Caminho Digital' button in Tamagotchi...");
    const digitalPathBtn = page.getByRole("button", { name: /caminho digital/i });
    await digitalPathBtn.waitFor({ state: "visible", timeout: 5000 });
    await digitalPathBtn.click();
    await page.waitForTimeout(600);

    // In modal briefing
    console.log("[QA] Step 3: Launching Fullscreen Digital Path...");
    const launchBtn = page.getByRole("button", { name: /iniciar caminho digital/i });
    await launchBtn.waitFor({ state: "visible", timeout: 5000 });
    await launchBtn.click();

    // Verify Fullscreen Digital Path HUD & Canvas
    console.log("[QA] Step 4: Verifying Fullscreen Digital Path...");
    await page.waitForSelector("header", { state: "visible", timeout: 8000 });
    await page.waitForSelector("canvas", { state: "visible", timeout: 8000 });
    await page.waitForTimeout(1000);

    // Screenshot 1: Fullscreen Digital Path loaded
    await page.screenshot({ path: "screenshots/qa-m3-01-digital-path-fullscreen.png" });
    console.log("[QA] Screenshot 1 saved: screenshots/qa-m3-01-digital-path-fullscreen.png");

    // Focus canvas
    await page.locator("#digital-path-canvas-area canvas").first().click();
    await page.waitForTimeout(200);

    // Step 5: Walk towards exit door with repeated keypresses
    console.log("[QA] Step 5: Walking Agumon towards exit door...");
    for (let i = 0; i < 75; i++) {
      await page.keyboard.press("KeyD");
      await page.waitForTimeout(50);
    }
    await page.waitForTimeout(1200);

    // Screenshot 2: Room 2 Combat view
    await page.screenshot({ path: "screenshots/qa-m3-02-digital-path-combat.png" });
    console.log("[QA] Screenshot 2 saved: screenshots/qa-m3-02-digital-path-combat.png");

    // Step 7: Test Attacks: J, K, L
    console.log("[QA] Step 7: Testing attacks (J, K, L)...");
    await page.keyboard.press("KeyJ"); // Attack 1
    await page.waitForTimeout(500);
    await page.keyboard.press("KeyK"); // Attack 2
    await page.waitForTimeout(600);
    await page.keyboard.press("KeyL"); // Special Attack
    await page.waitForTimeout(800);

    // Step 8: Click 'Abandonar'
    console.log("[QA] Step 8: Clicking 'Abandonar'...");
    const abandonBtn = page.getByRole("button", { name: /abandonar/i });
    await abandonBtn.click();
    await page.waitForTimeout(500);

    // Confirm abandonment
    console.log("[QA] Step 9: Confirming abandonment...");
    const confirmBtn = page.getByRole("button", { name: /confirmar saída/i });
    await confirmBtn.waitFor({ state: "visible", timeout: 3000 });
    await confirmBtn.click();
    await page.waitForTimeout(500);

    // Screenshot 3: Expedition Summary Modal
    await page.screenshot({ path: "screenshots/qa-m3-03-digital-path-summary.png" });
    console.log("[QA] Screenshot 3 saved: screenshots/qa-m3-03-digital-path-summary.png");

    // Step 10: Return to Tamagotchi Hub
    console.log("[QA] Step 10: Returning to Tamagotchi Hub...");
    const returnBtn = page.getByRole("button", { name: /retornar ao tamagotchi/i });
    await returnBtn.waitFor({ state: "visible", timeout: 3000 });
    await returnBtn.click();
    await page.waitForTimeout(1000);

    // Screenshot 4: Back in Tamagotchi Hub
    await page.screenshot({ path: "screenshots/qa-m3-04-returned-to-tamagotchi.png" });
    console.log("[QA] Screenshot 4 saved: screenshots/qa-m3-04-returned-to-tamagotchi.png");

    console.log("[QA] Fullscreen Digital Path QA completed successfully!");
    if (consoleErrors.length > 0) {
      console.warn("[QA] Console errors recorded:", consoleErrors);
    } else {
      console.log("[QA] 0 uncaught console errors recorded.");
    }
  } catch (err) {
    console.error("[QA] Error during QA run:", err);
    await page.screenshot({ path: "screenshots/qa-m3-error.png" });
    throw err;
  } finally {
    await browser.close();
  }
}

runQA().catch((err) => {
  console.error(err);
  process.exit(1);
});
