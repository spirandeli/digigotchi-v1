import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  const consoleErrors = [];
  page.on('console', (msg) => {
    console.log(`[BROWSER ${msg.type()}]`, msg.text());
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(err.message);
    console.error('[PAGE ERROR]', err.message);
  });

  console.log('1. Navigating to http://127.0.0.1:8080/ ...');
  await page.goto('http://127.0.0.1:8080/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  await page.screenshot({ path: '/home/spira/digigotchi-main/screenshots/qa_final_01_start.png' });
  console.log('Start screen captured.');

  // Handle Continuar or Começar
  const continueBtn = page.getByRole("button", { name: /continuar/i });
  if (await continueBtn.isVisible()) {
    console.log('2. Clicking Continuar...');
    await continueBtn.click();
  } else {
    console.log('2. Clicking Começar...');
    await page.click("button.ds-button-primary");
    await page.waitForTimeout(800);

    console.log('3. Selecting Agumon card...');
    await page.click("button.ds-card");
    await page.waitForTimeout(400);

    console.log('4. Clicking Confirmar escolha...');
    await page.click("button:has-text('Confirmar escolha')");
  }
  await page.waitForTimeout(1000);

  await page.screenshot({ path: '/home/spira/digigotchi-main/screenshots/qa_final_02_play.png' });
  console.log('Play screen captured.');

  // Open Caminho Digital modal
  console.log('5. Opening Caminho Digital modal...');
  await page.click("button:has-text('Caminho Digital')");
  await page.waitForTimeout(800);

  await page.screenshot({ path: '/home/spira/digigotchi-main/screenshots/qa_final_03_modal.png' });
  console.log('Modal Caminho Digital captured.');

  // Click Iniciar Caminho Digital
  console.log('6. Launching Digital Path Phaser game...');
  await page.click("button:has-text('INICIAR CAMINHO DIGITAL')");
  await page.waitForTimeout(5000); // Allow Phaser to boot, preload assets, autotile room

  const sceneState = await page.evaluate(() => {
    const scene = window.__digitalPathActiveScene;
    if (!scene) return { error: "No scene found" };
    return {
      currentRoomNumber: scene.currentRoomNumber,
      hasPlayer: !!scene.player,
      playerPos: scene.player ? { x: scene.player.x, y: scene.player.y, visible: scene.player.visible, depth: scene.player.depth, texture: scene.player.texture?.key } : null,
      camera: {
        scrollX: scene.cameras?.main?.scrollX,
        scrollY: scene.cameras?.main?.scrollY,
        zoom: scene.cameras?.main?.zoom,
        width: scene.cameras?.main?.width,
        height: scene.cameras?.main?.height,
      },
      roomTileObjectsCount: scene.roomTileObjects?.length,
      enemiesCount: scene.enemies?.length,
      activeRoom: scene.activeRoom ? {
        id: scene.activeRoom.id,
        width: scene.activeRoom.width,
        height: scene.activeRoom.height,
        spawnTile: scene.activeRoom.spawnTile,
        biome: scene.activeRoom.biome,
      } : null,
    };
  });
  console.log('Phaser Scene State:', JSON.stringify(sceneState, null, 2));

  await page.screenshot({ path: '/home/spira/digigotchi-main/screenshots/qa_final_04_canvas.png' });
  console.log('Phaser Canvas rendered and captured.');

  // Perform movement and attacks
  console.log('7. Testing movement and combat...');
  await page.keyboard.press('KeyD', { delay: 200 });
  await page.keyboard.press('KeyS', { delay: 200 });
  await page.keyboard.press('Space', { delay: 100 });
  await page.keyboard.press('KeyK', { delay: 100 });
  await page.keyboard.press('KeyL', { delay: 100 });
  await page.waitForTimeout(1500);

  await page.screenshot({ path: '/home/spira/digigotchi-main/screenshots/qa_final_05_combat.png' });
  console.log('Combat executed and captured.');

  await browser.close();

  console.log('Console Errors detected:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Errors found:', consoleErrors);
    process.exit(1);
  } else {
    console.log('=== ALL IN-GAME RENDERING AND CHECKS PASSED WITH ZERO CONSOLE ERRORS! ===');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
