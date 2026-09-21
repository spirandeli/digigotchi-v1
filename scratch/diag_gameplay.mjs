import { chromium } from 'playwright';

async function diagnose() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  page.on('console', (msg) => {
    console.log(`[BROWSER ${msg.type().toUpperCase()}]`, msg.text());
  });
  page.on('pageerror', (err) => {
    console.error('[PAGE ERROR]', err);
  });

  await page.goto('http://127.0.0.1:8080/', { waitUntil: 'load' });
  await page.waitForTimeout(600);

  // Click Começar
  await page.click("button.ds-button-primary");
  await page.waitForTimeout(600);

  // Choose Agumon
  await page.click("button.ds-card");
  await page.waitForTimeout(400);
  await page.click("button:has-text('Confirmar escolha')");
  await page.waitForTimeout(800);

  // Open Caminho Digital modal
  await page.click("button:has-text('Caminho Digital')");
  await page.waitForTimeout(600);

  // Launch game
  await page.click("button:has-text('INICIAR CAMINHO DIGITAL')");
  await page.waitForTimeout(3000);

  // Inspect window state
  const state = await page.evaluate(() => {
    const scene = window.__digitalPathActiveScene;
    if (!scene) return { error: "No scene found" };
    return {
      currentRoomNumber: scene.currentRoomNumber,
      hasPlayer: !!scene.player,
      playerPos: scene.player ? { x: scene.player.x, y: scene.player.y, visible: scene.player.visible, alpha: scene.player.alpha, texture: scene.player.texture?.key } : null,
      camera: {
        scrollX: scene.cameras?.main?.scrollX,
        scrollY: scene.cameras?.main?.scrollY,
        zoom: scene.cameras?.main?.zoom,
        width: scene.cameras?.main?.width,
        height: scene.cameras?.main?.height,
        bounds: scene.cameras?.main?._bounds,
      },
      roomTileObjectsCount: scene.roomTileObjects?.length,
      activeRoom: scene.activeRoom ? {
        id: scene.activeRoom.id,
        width: scene.activeRoom.width,
        height: scene.activeRoom.height,
        spawnTile: scene.activeRoom.spawnTile,
        biome: scene.activeRoom.biome,
      } : null,
      canvas: {
        width: scene.game?.canvas?.width,
        height: scene.game?.canvas?.height,
        styleWidth: scene.game?.canvas?.style?.width,
        styleHeight: scene.game?.canvas?.style?.height,
      }
    };
  });

  console.log("=== DIAGNOSTIC STATE ===");
  console.log(JSON.stringify(state, null, 2));

  await page.screenshot({ path: '/home/spira/digigotchi-main/screenshots/diag_after_start.png' });

  await browser.close();
}

diagnose().catch(console.error);
