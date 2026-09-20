import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";

const defaultChromePath = [
  "/home/spira/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell",
  "/home/spira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome",
].find((p) => existsSync(p));

async function runBrowserE2E() {
  console.log("=== INICIANDO QA E2E BROWSER: CAMINHO DIGITAL 50 SALAS & DEPTH ===");

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
      console.error("[Browser Error]", msg.text());
    }
  });

  try {
    console.log("[E2E] Acessando aplicação http://127.0.0.1:8080/ ...");
    await page.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // Aguardar o botão "Continuar" ou "Começar"
    const continueBtn = page.getByRole("button", { name: "Continuar" });
    const startBtn = page.getByRole("button", { name: "Comecar" });

    await page.waitForFunction(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      return btns.some((b) => b.textContent?.includes("Continuar") || b.textContent?.includes("Comecar"));
    }, { timeout: 10000 });

    if (await continueBtn.isVisible()) {
      console.log("[E2E] Clicando em 'Continuar'...");
      await continueBtn.click();
      await page.waitForTimeout(1000);
    } else {
      console.log("[E2E] Clicando em 'Comecar'...");
      await startBtn.click();
      await page.waitForTimeout(800);
      const agumonCard = page.locator("button:has-text('Agumon')").first();
      await agumonCard.waitFor({ state: "visible", timeout: 8000 });
      console.log("[E2E] Selecionando Agumon...");
      await agumonCard.click();
      await page.waitForTimeout(400);
      const confirmBtn = page.getByRole("button", { name: /confirmar escolha/i });
      await confirmBtn.waitFor({ state: "visible", timeout: 5000 });
      await confirmBtn.click();
      await page.waitForTimeout(1000);
    }

    // Entrar no Caminho Digital
    console.log("[E2E] Procurando botão do Caminho Digital...");
    const digitalPathBtn = page.getByRole("button", { name: /caminho digital/i });
    await digitalPathBtn.waitFor({ state: "visible", timeout: 10000 });
    await digitalPathBtn.click();
    await page.waitForTimeout(600);

    // Iniciar expedição
    console.log("[E2E] Clicando em 'Iniciar Caminho Digital'...");
    const launchBtn = page.getByRole("button", { name: /iniciar caminho digital/i });
    await launchBtn.waitFor({ state: "visible", timeout: 6000 });
    await launchBtn.click();

    // Aguardar Canvas e HUD
    await page.waitForSelector("canvas", { state: "visible", timeout: 15000 });

    // Aguardar Phaser inicializar a cena, criar o player e carregar a sala
    console.log("[E2E] Aguardando Phaser inicializar a cena e o player...");
    await page.waitForFunction(() => {
      const scene = window.__digitalPathActiveScene;
      return !!scene && !!scene.player && Array.isArray(scene.roomTileObjects) && scene.roomTileObjects.length > 0;
    }, { timeout: 20000 });
    await page.waitForTimeout(600);

    // Screenshot 1: Sala 1
    await page.screenshot({ path: "screenshots/qa-50rooms-01-sala-1.png" });
    console.log("[E2E] Screenshot 1 salva: screenshots/qa-50rooms-01-sala-1.png");

    // Helper para avançar sala com segurança aguardando transição
    const advanceOneRoom = async () => {
      await page.evaluate(() => {
        const scene = window.__digitalPathActiveScene;
        if (scene) {
          scene.playerHp = scene.playerMaxHp;
        }
        scene?.advanceToNextRoom();
      });
      await page.waitForFunction(() => {
        const scene = window.__digitalPathActiveScene;
        return scene && !scene.isTransitioning;
      }, { timeout: 8000 });
      await page.waitForTimeout(200);
    };

    // Verificar Renderização e Depth no Phaser
    console.log("[E2E] Validando Depth e Hierarquia de Renderização no Phaser...");
    const depths = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      if (!scene) return null;

      const playerDepth = scene.player?.depth;
      const floorTile = scene.roomTileObjects?.find((t) => t.type === "Image" && t.depth === 1);
      const wallBase = scene.roomTileObjects?.find((t) => t.depth === 2);
      const wallForeground = scene.roomTileObjects?.find((t) => t.depth === 15);
      const enemySprite = scene.enemies?.[0]?.sprite?.depth;
      const enemyHpBar = scene.enemies?.[0]?.hpBar?.depth;
      const doorDepth = scene.exitDoorSprite?.depth;

      return {
        hasScene: true,
        currentRoomNumber: scene.currentRoomNumber,
        playerDepth,
        floorDepth: floorTile?.depth ?? 1,
        wallBaseDepth: wallBase?.depth ?? 2,
        wallForegroundDepth: wallForeground?.depth,
        enemyDepth: enemySprite,
        enemyHpBarDepth: enemyHpBar,
        doorDepth,
      };
    });

    console.log("[E2E] Depths inspecionados no Canvas:", depths);
    if (!depths || depths.playerDepth !== 10) {
      throw new Error(`Falha no Depth do Player: esperado 10, obtido ${depths?.playerDepth}`);
    }
    if (depths.playerDepth <= depths.floorDepth) {
      throw new Error(`Player atrás do chão! Player depth: ${depths.playerDepth}, Chão: ${depths.floorDepth}`);
    }
    console.log("✔ Depth do player confirmado em 10 (acima do chão 1 e abaixo do foreground 15)");

    // Testar Movimentação e Ataques
    console.log("[E2E] Testando Movimentação e Ataques na Sala 1...");
    await page.keyboard.press("KeyD");
    await page.waitForTimeout(100);
    await page.keyboard.press("KeyJ"); // Ataque 1
    await page.waitForTimeout(300);
    await page.keyboard.press("KeyK"); // Ataque 2 / Projétil
    await page.waitForTimeout(300);
    await page.keyboard.press("Space"); // Dash
    await page.waitForTimeout(400);

    // Verificar HUD: Sala 1 / 50
    const hudText = await page.textContent("body");
    const hasSala1 = hudText.includes("SALA 1 / 50") || hudText.includes("SALA 1/50");
    console.log("[E2E] HUD exibe Sala 1/50:", hasSala1);
    if (!hasSala1) {
      throw new Error("HUD não exibiu 'SALA 1 / 50'");
    }

    // Avançar para Sala 5 (Baú garantido)
    console.log("[E2E] Avançando para a Sala 5 (Baú Garantido)...");
    for (let s = 1; s < 5; s++) {
      await advanceOneRoom();
    }
    await page.waitForTimeout(400);

    const room5State = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      return {
        room: scene.currentRoomNumber,
        kind: scene.activeRoom?.kind,
        hasChest: !!scene.chestSprite,
        chestDepth: scene.chestSprite?.depth,
      };
    });
    console.log("[E2E] Estado da Sala 5:", room5State);
    if (room5State.room !== 5 || !room5State.hasChest || room5State.chestDepth !== 10) {
      throw new Error("Falha no Baú Garantido da Sala 5");
    }
    await page.screenshot({ path: "screenshots/qa-50rooms-02-sala-5-bau.png" });
    console.log("[E2E] Screenshot 2 salva: screenshots/qa-50rooms-02-sala-5-bau.png");

    // Avançar para Sala 10 (Boss 1: Kuwagamon)
    console.log("[E2E] Avançando para a Sala 10 (Boss 1: Kuwagamon da Fenda)...");
    for (let s = 5; s < 10; s++) {
      await advanceOneRoom();
    }
    await page.waitForTimeout(500);

    const room10State = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      const boss = scene.enemies?.[0];
      return {
        room: scene.currentRoomNumber,
        kind: scene.activeRoom?.kind,
        bossName: boss?.name,
        bossHp: boss?.maxHp,
        bossLevel: boss?.bossDefinition?.id,
        enemyCount: scene.enemies?.length,
      };
    });
    console.log("[E2E] Estado da Sala 10 (Boss 1):", room10State);
    if (room10State.room !== 10 || room10State.kind !== "boss" || room10State.enemyCount !== 1) {
      throw new Error("Falha na Sala 10 de Boss Fight");
    }
    await page.screenshot({ path: "screenshots/qa-50rooms-03-sala-10-boss.png" });
    console.log("[E2E] Screenshot 3 salva: screenshots/qa-50rooms-03-sala-10-boss.png");

    // Avançar para Sala 20 (Boss 2: Meramon)
    console.log("[E2E] Avançando para a Sala 20 (Boss 2: Meramon Incandescente)...");
    for (let s = 10; s < 20; s++) {
      await advanceOneRoom();
    }
    await page.waitForTimeout(500);

    const room20State = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      const boss = scene.enemies?.[0];
      return {
        room: scene.currentRoomNumber,
        kind: scene.activeRoom?.kind,
        bossName: boss?.name,
        bossHp: boss?.maxHp,
      };
    });
    console.log("[E2E] Estado da Sala 20 (Boss 2):", room20State);
    if (room20State.room !== 20 || room20State.kind !== "boss") {
      throw new Error("Falha na Sala 20 de Boss Fight");
    }

    // Avançar para Sala 50 (Boss Final: BlackWarGreymon)
    console.log("[E2E] Avançando para a Sala 50 (Chefe Final)...");
    for (let s = 20; s < 50; s++) {
      await advanceOneRoom();
    }
    await page.waitForTimeout(600);

    const room50State = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      const boss = scene.enemies?.[0];
      return {
        room: scene.currentRoomNumber,
        kind: scene.activeRoom?.kind,
        bossName: boss?.name,
        bossHp: boss?.maxHp,
        enemyCount: scene.enemies?.length,
      };
    });
    console.log("[E2E] Estado da Sala 50 (Boss Final):", room50State);
    if (room50State.room !== 50 || room50State.kind !== "boss" || room50State.enemyCount !== 1) {
      throw new Error("Falha na Sala 50 de Boss Final");
    }
    await page.screenshot({ path: "screenshots/qa-50rooms-04-sala-50-final-boss.png" });
    console.log("[E2E] Screenshot 4 salva: screenshots/qa-50rooms-04-sala-50-final-boss.png");

    // Derrotar o Chefe Final da Sala 50
    console.log("[E2E] Derrotando o Chefe Final na Sala 50 para concluir a Run...");
    await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      if (scene && scene.enemies[0]) {
        scene.enemies[0].currentHp = 0;
        scene.killEnemy(scene.enemies[0]);
      }
    });

    console.log("[E2E] Aguardando animação de vitória e modal...");
    await page.waitForSelector("text=CAMINHO DIGITAL CONCLUÍDO", { timeout: 15000 });
    await page.waitForTimeout(600);

    // Screenshot 5: Vitória da Run
    await page.screenshot({ path: "screenshots/qa-50rooms-05-victory-modal.png" });
    console.log("[E2E] Screenshot 5 salva: screenshots/qa-50rooms-05-victory-modal.png");

    const victoryContent = await page.textContent("body");
    const hasVictoryText =
      victoryContent.includes("CAMINHO DIGITAL CONCLUÍDO") ||
      victoryContent.includes("50 salas");
    console.log("[E2E] Modal de Vitória exibido:", hasVictoryText);
    if (!hasVictoryText) {
      throw new Error("Modal de vitória não foi exibido após derrotar o Boss Final na Sala 50");
    }

    // Testar Morte e Reentrada
    console.log("[E2E] Testando fluxo de saída e reinício...");
    const returnBtn = page.getByRole("button", { name: /voltar ao pet|retornar/i }).first();
    if (await returnBtn.isVisible()) {
      await returnBtn.click();
      await page.waitForTimeout(1000);
    }

    // Reabrir Caminho Digital
    const reenterBtn = page.getByRole("button", { name: /caminho digital/i });
    if (await reenterBtn.isVisible()) {
      await reenterBtn.click();
      await page.waitForTimeout(600);
      const reLaunchBtn = page.getByRole("button", { name: /iniciar caminho digital/i });
      if (await reLaunchBtn.isVisible()) {
        await reLaunchBtn.click();
        await page.waitForTimeout(1000);
      }
    }

    const reenteredState = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      return {
        hasScene: !!scene,
        playerActive: !!scene?.player?.active,
        playerDepth: scene?.player?.depth,
        room: scene?.currentRoomNumber,
      };
    });
    console.log("[E2E] Estado após reentrada:", reenteredState);
    if (!reenteredState.hasScene || reenteredState.playerDepth !== 10) {
      throw new Error("Falha na reentrada do Caminho Digital após conclusão/morte");
    }

    console.log("\n=======================================================");
    console.log("✅ TESTE E2E NO BROWSER CONCLUÍDO COM 100% DE SUCESSO!");
    console.log("=======================================================");
  } catch (err) {
    console.error("\n❌ ERRO NO TESTE E2E:", err);
    await page.screenshot({ path: "screenshots/qa-50rooms-error.png" });
    throw err;
  } finally {
    await browser.close();
  }
}

runBrowserE2E();
