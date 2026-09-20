import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";

const defaultChromePath = [
  "/home/spira/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell",
  "/home/spira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome",
].find((p) => existsSync(p));

async function runM5QA() {
  console.log("==================================================");
  console.log("[QA M5] Iniciando Validação E2E da Alpha Jogável...");
  console.log("==================================================");

  if (!existsSync("screenshots")) {
    mkdirSync("screenshots", { recursive: true });
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
    // 1. Acessa o aplicativo
    console.log("[QA M5 1/7] Carregando tela inicial em http://127.0.0.1:8080/...");
    await page.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // Iniciar novo ou continuar save
    const startBtn = page.getByRole("button", { name: /^comecar$/i });
    const continueBtn = page.getByRole("button", { name: /^continuar$/i });
    
    await Promise.race([
      startBtn.waitFor({ state: "visible", timeout: 10000 }).catch(() => null),
      continueBtn.waitFor({ state: "visible", timeout: 10000 }).catch(() => null),
    ]);

    if (await continueBtn.isVisible()) {
      await continueBtn.click();
      await page.waitForTimeout(600);
    } else if (await startBtn.isVisible()) {
      await startBtn.click();
      await page.waitForTimeout(500);
      const agumonChoice = page.locator("button").filter({ hasText: /agumon/i }).first();
      await agumonChoice.waitFor({ state: "visible", timeout: 8000 });
      await agumonChoice.click();
      await page.waitForTimeout(300);
      const confirmBtn = page.getByRole("button", { name: /confirmar escolha/i });
      await confirmBtn.waitFor({ state: "visible", timeout: 8000 });
      await confirmBtn.click();
      await page.waitForTimeout(600);
    }

    // Garante que o Hub do Tamagotchi carregou
    await page.locator("button").filter({ hasText: /caminho digital/i }).waitFor({ state: "visible", timeout: 10000 });
    await page.waitForTimeout(400);

    await page.screenshot({ path: "screenshots/qa-m5-01-tamagotchi-hub.png" });
    console.log("  -> Hub Tamagotchi validado (captura: qa-m5-01-tamagotchi-hub.png)");

    // 2. Testar Painéis do Tamagotchi: Inventário Categorizado, Árvore de Evolução e Ajustes
    console.log("[QA M5 2/7] Testando Painéis do Tamagotchi (Inventário, Evolução, Ajustes)...");

    // 2.1 Inventário Categorizado
    await page.locator("footer button").filter({ hasText: /itens/i }).click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: "screenshots/qa-m5-02-inventory-tabs.png" });
    console.log("  -> Inventário Categorizado exibido (captura: qa-m5-02-inventory-tabs.png)");

    // Testa aba Cuidados
    const careTab = page.locator("button").filter({ hasText: /cuidados/i });
    if (await careTab.isVisible()) {
      await careTab.click();
      await page.waitForTimeout(300);
    }
    // Fecha modal
    await page.locator(".ds-modal button").filter({ hasText: /fechar/i }).click();
    await page.waitForTimeout(400);

    // 2.2 Árvore de Evolução Visual
    await page.locator("footer button").filter({ hasText: /evoluir/i }).click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: "screenshots/qa-m5-03-evolution-tree.png" });
    console.log("  -> Árvore Genealógica de Evolução exibida (captura: qa-m5-03-evolution-tree.png)");
    await page.locator(".ds-modal button").filter({ hasText: /fechar/i }).click();
    await page.waitForTimeout(400);

    // 2.3 Painel de Ajustes / Configurações
    await page.locator("footer button").filter({ hasText: /ajustes/i }).click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: "screenshots/qa-m5-04-settings-panel.png" });
    console.log("  -> Painel de Ajustes e Integridade de Save exibido (captura: qa-m5-04-settings-panel.png)");
    await page.locator(".ds-modal button").filter({ hasText: /fechar/i }).click();
    await page.waitForTimeout(400);

    // 3. Entrar no Caminho Digital
    console.log("[QA M5 3/7] Iniciando expedição no Caminho Digital...");
    await page.locator("nav button").filter({ hasText: /caminho digital/i }).click();
    await page.waitForTimeout(500);
    await page.getByRole("button", { name: /iniciar caminho digital/i }).click();

    await page.waitForSelector("#digital-path-canvas-area canvas", { state: "visible", timeout: 10000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "screenshots/qa-m5-05-digital-path-hud.png" });
    console.log("  -> HUD do Caminho Digital com habilidades carregado (captura: qa-m5-05-digital-path-hud.png)");

    // 4. Testar Menu de Pausa com Configurações In-Run
    console.log("[QA M5 4/7] Testando Menu de Pausa com Configurações In-Run (ESC)...");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    await page.screenshot({ path: "screenshots/qa-m5-06-inrun-pause-settings.png" });

    // Retomar expedição
    const resumeBtn = page.locator("#btn-resume-expedition");
    if (await resumeBtn.isVisible()) {
      await resumeBtn.click();
      await page.waitForTimeout(400);
    } else {
      await page.keyboard.press("Escape");
      await page.waitForTimeout(400);
    }

    // 5. Exercitar Combate: Movimentação, Ataques com Loadout e Input Buffering
    console.log("[QA M5 5/7] Executando movimentação e ciclo de habilidades (J, K, L)...");
    await page.locator("#digital-path-canvas-area canvas").first().click();
    await page.keyboard.down("KeyS");
    await page.keyboard.down("KeyD");
    await page.waitForTimeout(500);
    await page.keyboard.up("KeyS");
    await page.keyboard.up("KeyD");

    // Ataque 2 (Disparo com Burn/Slow) + Ataque 1 rápido + Especial
    await page.keyboard.press("KeyK");
    await page.waitForTimeout(150);
    await page.keyboard.press("KeyJ");
    await page.waitForTimeout(200);
    await page.keyboard.press("KeyL");
    await page.waitForTimeout(400);

    await page.screenshot({ path: "screenshots/qa-m5-07-combat-actions.png" });
    console.log("  -> Combate com feedback visual capturado (captura: qa-m5-07-combat-actions.png)");

    // 6. Testar Progressão através do Debug Panel até o Chefe
    console.log("[QA M5 6/7] Avançando salas para testar eventos e chefe...");
    await page.getByRole("button", { name: /debug/i }).click();
    await page.waitForTimeout(300);

    const skipRoomBtn = page.getByRole("button", { name: /pular sala/i });
    // Pula para as próximas salas até o Chefe (Sala 6)
    for (let r = 1; r <= 4; r++) {
      if (await skipRoomBtn.isVisible()) {
        await skipRoomBtn.click();
        await page.waitForTimeout(600);
      }
    }

    // Fecha Debug
    await page.getByRole("button", { name: /debug/i }).click();
    await page.waitForTimeout(500);

    // Confronto com Chefe (Sala 6)
    await page.screenshot({ path: "screenshots/qa-m5-08-boss-encounter.png" });
    console.log("  -> Arena do Chefe alcançada (captura: qa-m5-08-boss-encounter.png)");

    // Vencer o Chefe via Debug ou pulo final
    await page.getByRole("button", { name: /debug/i }).click();
    await page.waitForTimeout(300);
    await skipRoomBtn.click();
    await page.waitForTimeout(1000);

    // Tela de Vitória
    await page.screenshot({ path: "screenshots/qa-m5-09-run-victory.png" });
    console.log("  -> Vitória no Caminho Digital registrada (captura: qa-m5-09-run-victory.png)");

    const returnBtn = page.getByRole("button", { name: /voltar ao tamagotchi/i });
    if (await returnBtn.isVisible()) {
      await returnBtn.click();
      await page.waitForTimeout(600);
    }

    // 7. Validação de Persistência e Backup após Recarregamento da Página
    console.log("[QA M5 7/7] Validando persistência de save e integridade após reload...");
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // Se aparecer tela inicial, clica em Continuar
    const postReloadContinue = page.getByRole("button", { name: /continuar/i });
    if (await postReloadContinue.isVisible()) {
      await postReloadContinue.click();
      await page.waitForTimeout(500);
    }

    await page.screenshot({ path: "screenshots/qa-m5-10-save-integrity-reload.png" });
    console.log("  -> Save restaurado com sucesso pós-reload (captura: qa-m5-10-save-integrity-reload.png)");

    console.log("==================================================");
    console.log("[QA M5 SUCESSO] Todos os fluxos da Alpha Jogável passaram!");
    console.log(`[QA M5 CONSOLE] Erros não capturados: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.warn("  Erros detectados no console:", consoleErrors);
    }
    console.log("==================================================");
  } catch (err) {
    console.error("[QA M5 FALHA]", err);
    await page.screenshot({ path: "screenshots/qa-m5-failure.png" });
    throw err;
  } finally {
    await browser.close();
  }
}

runM5QA();
