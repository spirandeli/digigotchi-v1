import { existsSync } from "node:fs";
import { chromium } from "playwright";

const defaultChromePath = [
  "/home/spira/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell",
  "/home/spira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome",
].find((p) => existsSync(p));

async function runVictoryQA() {
  console.log("[QA Victory] Testing full run victory and Tamagotchi reward return...");
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
    await page.getByRole("button", { name: /caminho digital/i }).click();
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: /iniciar caminho digital/i }).click();

    await page.waitForSelector("#digital-path-canvas-area canvas", { state: "visible", timeout: 8000 });
    await page.waitForTimeout(1000);

    // Open Debug panel
    await page.getByRole("button", { name: /debug/i }).click();
    await page.waitForTimeout(300);

    // Skip rooms until we reach boss and trigger victory
    for (let i = 0; i < 12; i++) {
      if (await page.locator("button:has-text('Retornar ao Tamagotchi')").isVisible()) {
        break;
      }
      const skipBtn = page.locator("button:has-text('Pular Sala')");
      if (await skipBtn.isVisible()) {
        await skipBtn.click({ force: true });
        await page.waitForTimeout(1000);
      }
    }

    // Wait for victory modal to display
    const returnBtn = page.locator("button:has-text('Retornar ao Tamagotchi')");
    await returnBtn.waitFor({ state: "visible", timeout: 15000 });
    await page.waitForTimeout(500);
    await page.screenshot({ path: "screenshots/qa-m4-09-victory-result.png" });
    console.log("[QA Victory] Victory screen captured: qa-m4-09-victory-result.png");

    // Click Return to Tamagotchi
    await returnBtn.click();
    await page.waitForTimeout(1500);

    await page.screenshot({ path: "screenshots/qa-m4-10-tamagotchi-rewarded.png" });
    console.log("[QA Victory] Returned to Tamagotchi. Screenshot: qa-m4-10-tamagotchi-rewarded.png");

  } catch (err) {
    console.error("[QA Victory] Error:", err);
    await page.screenshot({ path: "screenshots/qa-m4-victory-error.png" });
    throw err;
  } finally {
    await browser.close();
  }
}

runVictoryQA().catch((err) => {
  console.error(err);
  process.exit(1);
});
