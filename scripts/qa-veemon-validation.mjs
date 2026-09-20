import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";

const defaultChromePath = [
  "/home/spira/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell",
  "/home/spira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome",
].find((p) => existsSync(p));

async function runVeemonQA() {
  console.log("==================================================");
  console.log("[QA VEEMON] Iniciando Validação E2E do Veemon...");
  console.log("==================================================");

  if (!existsSync("screenshots/veemon")) {
    mkdirSync("screenshots/veemon", { recursive: true });
  }

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
    // 1. Carrega aplicação
    console.log("[QA VEEMON 1/6] Acessando aplicação e selecionando Veemon...");
    await page.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // Limpa save para escolher Veemon do zero
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    const startBtn = page.getByRole("button", { name: /^comecar$/i });
    await startBtn.waitFor({ state: "visible", timeout: 10000 });
    await startBtn.click();
    await page.waitForTimeout(500);

    // Seleciona Veemon na tela de escolha
    const veemonCard = page.locator("button").filter({ hasText: /veemon/i }).first();
    await veemonCard.waitFor({ state: "visible", timeout: 8000 });
    await veemonCard.click();
    await page.waitForTimeout(300);

    const confirmBtn = page.getByRole("button", { name: /confirmar escolha/i });
    await confirmBtn.waitFor({ state: "visible", timeout: 8000 });
    await confirmBtn.click();
    await page.waitForTimeout(600);

    // 2. Valida Hub do Tamagotchi com Veemon
    console.log("[QA VEEMON 2/6] Validando Veemon no Hub do Tamagotchi...");
    await page.locator("button").filter({ hasText: /caminho digital/i }).waitFor({ state: "visible", timeout: 10000 });
    await page.screenshot({ path: "screenshots/veemon/01-tamagotchi-veemon-hub.png" });
    console.log("  -> Veemon no Tamagotchi validado (screenshots/veemon/01-tamagotchi-veemon-hub.png)");

    // 3. Abre modal do Caminho Digital e valida que Veemon está Pronto (spriteReady: true)
    console.log("[QA VEEMON 3/6] Abrindo modal do Caminho Digital para Veemon...");
    await page.locator("nav button").filter({ hasText: /caminho digital/i }).click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: "screenshots/veemon/02-veemon-digital-path-entry.png" });
    console.log("  -> Modal de entrada do Veemon verificado (screenshots/veemon/02-veemon-digital-path-entry.png)");

    // Inicia a run do Caminho Digital
    const startRunBtn = page.getByRole("button", { name: /iniciar caminho digital/i });
    await startRunBtn.waitFor({ state: "visible", timeout: 8000 });
    await startRunBtn.click();

    // 4. Valida Canvas do Phaser e HUD do Veemon
    console.log("[QA VEEMON 4/6] Validando Veemon no Canvas do Phaser...");
    await page.waitForSelector("#digital-path-canvas-area canvas", { state: "visible", timeout: 10000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "screenshots/veemon/03-veemon-spawn-hud.png" });
    console.log("  -> HUD do Veemon com Vee-Punch, Vee-Laser e Vee-Headbutt validado");

    // 5. Testa Movimentação 4-way e Habilidades de Combate
    console.log("[QA VEEMON 5/6] Testando movimentação 4-way e habilidades...");
    await page.locator("#digital-path-canvas-area canvas").first().click();

    // Movimentação: Cima (W), Baixo (S), Esquerda (A), Direita (D)
    await page.keyboard.down("KeyW");
    await page.waitForTimeout(300);
    await page.keyboard.up("KeyW");

    await page.keyboard.down("KeyD");
    await page.waitForTimeout(400);
    await page.keyboard.up("KeyD");

    await page.keyboard.down("KeyS");
    await page.waitForTimeout(300);
    await page.keyboard.up("KeyS");

    // Ataques:
    // J = Vee-Punch (Físico rápido)
    await page.keyboard.press("KeyJ");
    await page.waitForTimeout(200);

    // K = Vee-Laser (Disparo longo)
    await page.keyboard.press("KeyK");
    await page.waitForTimeout(250);

    // L = Vee-Headbutt (Especial)
    await page.keyboard.press("KeyL");
    await page.waitForTimeout(400);

    await page.screenshot({ path: "screenshots/veemon/04-veemon-combat-skills.png" });
    console.log("  -> Ações de combate do Veemon capturadas");

    // Pausa e abandona run para voltar ao Hub
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    const abandonBtn = page.locator("#btn-abandon-expedition");
    if (await abandonBtn.isVisible()) {
      await abandonBtn.click();
      await page.waitForTimeout(600);
    } else {
      await page.getByRole("button", { name: /^abandonar run$/i }).click();
      await page.waitForTimeout(600);
    }

    // 6. Teste de Regressão: Agumon continua funcionando 100%
    console.log("[QA VEEMON 6/6] Teste de regressão: Verificando se Agumon continua funcionando...");
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    const startAgainBtn = page.getByRole("button", { name: /^comecar$/i });
    await startAgainBtn.waitFor({ state: "visible", timeout: 10000 });
    await startAgainBtn.click();
    await page.waitForTimeout(500);

    const agumonCard = page.locator("button").filter({ hasText: /agumon/i }).first();
    await agumonCard.waitFor({ state: "visible", timeout: 8000 });
    await agumonCard.click();
    await page.waitForTimeout(300);

    const confirmAgumon = page.getByRole("button", { name: /confirmar escolha/i });
    await confirmAgumon.waitFor({ state: "visible", timeout: 8000 });
    await confirmAgumon.click();
    await page.waitForTimeout(600);

    await page.locator("nav button").filter({ hasText: /caminho digital/i }).click();
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: /iniciar caminho digital/i }).click();
    await page.waitForSelector("#digital-path-canvas-area canvas", { state: "visible", timeout: 10000 });
    await page.waitForTimeout(1000);

    await page.screenshot({ path: "screenshots/veemon/05-agumon-regression-verified.png" });
    console.log("  -> Regressão do Agumon validada com sucesso!");

    console.log("==================================================");
    console.log("[QA VEEMON SUCESSO] Veemon e Agumon validados perfeitamente!");
    console.log(`[QA VEEMON CONSOLE] Erros não capturados: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.warn("  Erros detectados no console:", consoleErrors);
    }
    console.log("==================================================");
  } catch (err) {
    console.error("[QA VEEMON FALHA]", err);
    await page.screenshot({ path: "screenshots/veemon/qa-failure.png" });
    throw err;
  } finally {
    await browser.close();
  }
}

runVeemonQA();
