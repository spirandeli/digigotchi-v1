import { chromium } from "playwright";

async function run() {
  console.log("=== TESTANDO DIGIMON COM ESTRUTURA VAZIA / PENDENTE ===");
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

  try {
    // 1. Limpar storage e abrir app
    await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
    await page.evaluate(() => localStorage.clear());
    await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });

    // Iniciar e escolher Gabumon (parceiro cuja estrutura existe mas sprites estão em preparação)
    const comecarBtn = page.locator('button:has-text("Comecar")');
    if (await comecarBtn.isVisible()) {
      await comecarBtn.click();
      await page.waitForTimeout(500);
    }

    const gabumonCard = page.locator('button:has(h2:has-text("Gabumon"))');
    await gabumonCard.click();
    await page.waitForTimeout(300);

    await page.locator('button:has-text("Confirmar escolha")').click();
    await page.waitForTimeout(1000);

    // Tamagotchi do Gabumon funciona
    const petImg = page.locator("img.pixel").first();
    await petImg.waitFor({ state: "visible", timeout: 5000 });
    const gabumonSrc = await petImg.getAttribute("src");
    console.log(`Gabumon Tamagotchi sprite src: ${gabumonSrc}`);

    // Clicar na aba Caminho Digital
    console.log("Abrindo painel do Caminho Digital com Gabumon...");
    const caminhoActionBtn = page.locator('button:has-text("Caminho Digital")');
    await caminhoActionBtn.click();
    await page.waitForTimeout(800);

    // Verificar se o painel detectou com segurança que os sprites estão em preparação
    const noticeText = page.locator('text=Os sprites deste Digimon ainda estão em preparação');
    await noticeText.waitFor({ state: "visible", timeout: 5000 });
    console.log("Painel de proteção ativa exibido com sucesso: Digimon não povoado bloqueia início sem erro.");

    await page.screenshot({ path: "screenshots/unready-digimon-safeguard.png" });
    console.log("Screenshot salva em screenshots/unready-digimon-safeguard.png");

    console.log("\n--- RESULTADO DO TESTE ---");
    console.log(`Erros 404: ${failedUrls.length}`);
    console.log(`Erros de console: ${consoleErrors.length}`);

    if (failedUrls.length > 0 || consoleErrors.length > 0) {
      throw new Error("Teste falhou com erros no console ou 404s.");
    }

    console.log("TESTE CONCLUÍDO COM SUCESSO: Digimon com estrutura pendente é tratado de forma 100% segura!");
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error("FALHA:", err);
  process.exit(1);
});
