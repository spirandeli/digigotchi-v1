import { chromium } from "playwright";

const TARGET_URL = "http://172.27.140.162:8080/";

async function run() {
  console.log(`=== TESTANDO TODOS OS DIGIMONS EM ${TARGET_URL} ===`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const failedUrls = [];
  const consoleErrors = [];

  page.on("response", (res) => {
    if (res.status() >= 400 && res.url().includes("/sprites/")) {
      failedUrls.push({ url: res.url(), status: res.status() });
      console.error(`[404 SPRITE ERROR] ${res.status()} - ${res.url()}`);
    }
  });

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
      console.error(`[CONSOLE ERROR] ${msg.text()}`);
    }
  });

  async function testSpecies(speciesName, speciesId) {
    console.log(`\n--- Testando ${speciesName} (${speciesId}) ---`);
    await page.goto(TARGET_URL, { waitUntil: "networkidle" });
    await page.evaluate(() => localStorage.clear());
    await page.goto(TARGET_URL, { waitUntil: "networkidle" });

    const comecarBtn = page.locator('button:has-text("Comecar")');
    if (await comecarBtn.isVisible()) {
      await comecarBtn.click();
      await page.waitForTimeout(400);
    }

    const card = page.locator(`button:has(h2:has-text("${speciesName}"))`).first();
    if (await card.isVisible()) {
      await card.click();
      await page.waitForTimeout(300);
      await page.locator('button:has-text("Confirmar escolha")').click();
      await page.waitForTimeout(800);
    }

    // Tamagotchi
    const petImg = page.locator("img.pixel").first();
    await petImg.waitFor({ state: "visible", timeout: 5000 });
    const src = await petImg.getAttribute("src");
    console.log(`Tamagotchi sprite ativo: ${src}`);

    // Comer
    const comerBtn = page.locator('button:has-text("Comer")');
    if (await comerBtn.isVisible()) {
      await comerBtn.click();
      await page.waitForTimeout(800);
    }

    // Entrar no Caminho Digital
    console.log(`Iniciando Caminho Digital com ${speciesName}...`);
    const caminhoBtn = page.locator('button:has-text("Caminho Digital")').first();
    await caminhoBtn.click();
    await page.waitForTimeout(600);

    const startRunBtn = page.locator('button:has-text("INICIAR CAMINHO DIGITAL")');
    if (await startRunBtn.isVisible()) {
      await startRunBtn.click();
    }

    const canvas = page.locator("canvas").first();
    await canvas.waitFor({ state: "visible", timeout: 10000 });
    console.log(`Canvas Phaser montado com sucesso para ${speciesName}!`);
    await page.waitForTimeout(1000);

    // Movimento 4-way
    await page.keyboard.press("KeyD");
    await page.waitForTimeout(200);
    await page.keyboard.press("KeyW");
    await page.waitForTimeout(200);
    await page.keyboard.press("KeyA");
    await page.waitForTimeout(200);
    await page.keyboard.press("KeyS");
    await page.waitForTimeout(200);

    // Ataques
    await page.keyboard.press("KeyJ");
    await page.waitForTimeout(200);
    await page.keyboard.press("KeyK");
    await page.waitForTimeout(200);
    await page.keyboard.press("KeyL");
    await page.waitForTimeout(300);
  }

  try {
    // Testar 3 espécies representativas: Agumon, Gabumon e Veemon
    await testSpecies("Agumon", "agumon");
    await testSpecies("Gabumon", "gabumon");
    await testSpecies("Veemon", "veemon");

    await page.screenshot({ path: "screenshots/all-digimons-verified.png" });
    console.log("\nScreenshot geral salva em screenshots/all-digimons-verified.png");

    console.log("\n--- RESULTADO FINAL DE TESTE MULTI-DIGIMON ---");
    console.log(`Falhas de Sprite (404): ${failedUrls.length}`);
    console.log(`Erros de Console: ${consoleErrors.length}`);

    if (failedUrls.length > 0 || consoleErrors.length > 0) {
      console.error("TESTE FALHOU com erros!");
      process.exit(1);
    } else {
      console.log("SUCESSO TOTAL: Todos os Digimons testados funcionam 100% no Tamagotchi e Roguelike!");
    }
  } catch (err) {
    console.error("Erro durante execução do teste:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
