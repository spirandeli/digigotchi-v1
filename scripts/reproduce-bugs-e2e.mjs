import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";

const defaultChromePath = [
  "/home/spira/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell",
  "/home/spira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome",
].find((p) => existsSync(p));

async function testSecondRunAndPhantomDamage() {
  console.log("=== TESTANDO BUG DE SEGUNDA RUN E DANO FANTASMA ===");

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

  page.on("console", (msg) => {
    console.log(`[Browser Console ${msg.type()}]`, msg.text());
  });

  try {
    console.log("[1] Acessando aplicação...");
    await page.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    const continueBtn = page.getByRole("button", { name: "Continuar" });
    await continueBtn.waitFor({ state: "visible", timeout: 10000 });
    console.log("[1] Clicando em 'Continuar'...");
    await continueBtn.click();
    await page.waitForTimeout(1000);

    // ==========================================
    // RUN 1
    // ==========================================
    console.log("\n--- INICIANDO RUN 1 ---");
    const dpBtn = page.getByRole("button", { name: /caminho digital/i });
    await dpBtn.waitFor({ state: "visible", timeout: 8000 });
    await dpBtn.click();
    await page.waitForTimeout(500);

    const launchBtn = page.getByRole("button", { name: /iniciar caminho digital/i });
    await launchBtn.waitFor({ state: "visible", timeout: 6000 });
    await launchBtn.click();

    // Aguardar Phaser iniciar e player existir
    await page.waitForFunction(() => {
      const scene = window.__digitalPathActiveScene;
      return !!scene && !!scene.player;
    }, { timeout: 15000 });
    await page.waitForTimeout(800);

    // Testar movimento na Run 1
    const p1PosBefore = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      return { x: scene.player.x, y: scene.player.y };
    });
    console.log("[Run 1] Posição inicial:", p1PosBefore);

    await page.keyboard.press("KeyD");
    await page.keyboard.down("KeyD");
    await page.waitForTimeout(400);
    await page.keyboard.up("KeyD");

    const p1PosAfter = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      return { x: scene.player.x, y: scene.player.y };
    });
    console.log("[Run 1] Posição após andar para direita (D):", p1PosAfter);
    const movedRun1 = p1PosAfter.x > p1PosBefore.x + 5;
    console.log("[Run 1] Player se moveu?", movedRun1);

    // Testar Dano Fantasma: ficar parado 3 segundos e verificar se HP mudou
    const initialHp = await page.evaluate(() => window.__digitalPathActiveScene?.playerHp);
    console.log(`[Run 1] HP parado na entrada: ${initialHp}`);
    await page.waitForTimeout(3000);
    const hpAfter3s = await page.evaluate(() => window.__digitalPathActiveScene?.playerHp);
    console.log(`[Run 1] HP após 3 segundos sem inimigos próximos: ${hpAfter3s}`);
    const phantomDamageRun1 = hpAfter3s < initialHp;
    if (phantomDamageRun1) {
      console.warn("⚠️ ALERTA: DANO FANTASMA DETECTADO NA RUN 1!");
    } else {
      console.log("✔ Sem dano fantasma na Run 1.");
    }

    // Abandonar / Sair da Run 1
    console.log("\n[Run 1] Clicando em 'Abandonar'...");
    const abandonBtn = page.getByRole("button", { name: /abandonar/i }).first();
    await abandonBtn.click();
    await page.waitForTimeout(400);

    const confirmAbandonBtn = page.getByRole("button", { name: /confirmar saída|abandonar run/i }).first();
    if (await confirmAbandonBtn.isVisible()) {
      await confirmAbandonBtn.click();
      await page.waitForTimeout(500);
    }

    const finalConfirmBtn = page.getByRole("button", { name: /confirmar saída/i });
    if (await finalConfirmBtn.isVisible()) {
      await finalConfirmBtn.click();
      await page.waitForTimeout(500);
    }

    const returnBtn = page.getByRole("button", { name: /retornar ao tamagotchi/i });
    await returnBtn.waitFor({ state: "visible", timeout: 8000 });
    console.log("[Run 1] Clicando em 'Retornar ao Tamagotchi'...");
    await returnBtn.click();
    await page.waitForTimeout(1000);

    // ==========================================
    // RUN 2
    // ==========================================
    console.log("\n--- INICIANDO RUN 2 ---");
    const dpBtn2 = page.getByRole("button", { name: /caminho digital/i });
    await dpBtn2.waitFor({ state: "visible", timeout: 8000 });
    await dpBtn2.click();
    await page.waitForTimeout(500);

    const launchBtn2 = page.getByRole("button", { name: /iniciar caminho digital/i });
    await launchBtn2.waitFor({ state: "visible", timeout: 6000 });
    await launchBtn2.click();

    // Aguardar Phaser iniciar e player existir na Run 2
    await page.waitForFunction(() => {
      const scene = window.__digitalPathActiveScene;
      return !!scene && !!scene.player;
    }, { timeout: 15000 });
    await page.waitForTimeout(800);

    const run2State = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      return {
        room: scene.currentRoomNumber,
        isPaused: scene.isPaused,
        isFinished: scene.isFinished,
        isTransitioning: scene.isTransitioning,
        isHitstopped: scene.isHitstopped,
        isPlayerAttacking: scene.isPlayerAttacking,
        keysDefined: !!scene.keys,
        dKeyEnabled: scene.keys?.D?.enabled,
        dKeyIsDown: scene.keys?.D?.isDown,
        playerActive: scene.player?.active,
        playerVisible: scene.player?.visible,
        playerX: scene.player?.x,
        playerY: scene.player?.y,
      };
    });
    console.log("[Run 2] Estado interno da cena:", run2State);

    const p2PosBefore = { x: run2State.playerX, y: run2State.playerY };
    console.log("[Run 2] Posição inicial:", p2PosBefore);

    console.log("[Run 2] Pressionando 'D' para mover para a direita...");
    await page.keyboard.down("KeyD");
    await page.waitForTimeout(400);
    await page.keyboard.up("KeyD");

    const p2PosAfter = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      return { x: scene.player.x, y: scene.player.y };
    });
    console.log("[Run 2] Posição após andar (D):", p2PosAfter);
    const movedRun2 = p2PosAfter.x > p2PosBefore.x + 5;
    console.log("[Run 2] Player se moveu?", movedRun2);

    if (!movedRun2) {
      console.error("❌ BUG REPRODUZIDO: Player NÃO se move na Run 2!");
      const diag = await page.evaluate(() => {
        const scene = window.__digitalPathActiveScene;
        return {
          keyboardInputPluginEnabled: scene.input?.keyboard?.enabled,
          keyboardActive: scene.input?.keyboard?.isActive(),
          gameHasFocus: document.hasFocus(),
          activeElement: document.activeElement?.tagName,
        };
      });
      console.error("[Run 2] Diagnóstico:", diag);
    } else {
      console.log("✔ Sucesso: Player se moveu perfeitamente na Run 2!");
    }

  } catch (err) {
    console.error("Erro durante o teste:", err);
  } finally {
    await browser.close();
  }
}

testSecondRunAndPhantomDamage();
