import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.error('[BROWSER ERROR]', msg.text());
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

  // Click Começar button
  console.log('2. Clicking Começar...');
  await page.click("button.ds-button-primary");
  await page.waitForTimeout(800);

  // Choose First Digimon line (Agumon)
  console.log('3. Selecting Agumon card...');
  await page.click("button.ds-card");
  await page.waitForTimeout(400);

  // Click Confirmar escolha
  console.log('4. Clicking Confirmar escolha...');
  await page.click("button:has-text('Confirmar escolha')");
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
  await page.waitForTimeout(4500); // Allow Phaser to boot, preload assets, autotile room

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
