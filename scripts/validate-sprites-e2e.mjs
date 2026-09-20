import { chromium } from 'playwright';

async function run() {
  console.log('=== STARTING SPRITE VALIDATION E2E ===');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const failedUrls = [];
  const consoleErrors = [];

  page.on('response', (res) => {
    if (res.status() >= 400 && res.url().includes('/sprites/')) {
      failedUrls.push({ url: res.url(), status: res.status() });
      console.error(`[404 SPRITE ERROR] ${res.status()} - ${res.url()}`);
    }
  });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.error(`[CONSOLE ERROR] ${msg.text()}`);
    }
  });

  try {
    // 1. Load app
    console.log('Navigating to http://127.0.0.1:8080/ ...');
    await page.goto('http://127.0.0.1:8080/', { waitUntil: 'networkidle' });
    // If on start screen, click Comecar
    const comecarBtn = page.locator('button:has-text("Comecar")');
    if (await comecarBtn.isVisible()) {
      console.log('Clicking Comecar...');
      await comecarBtn.click();
      await page.waitForTimeout(800);
    }

    // If on choose screen, select Agumon and confirm
    const agumonCard = page.locator('button:has(h2:has-text("Agumon"))');
    if (await agumonCard.isVisible()) {
      console.log('Selecting Agumon card...');
      await agumonCard.click();
      await page.waitForTimeout(400);

      const confirmBtn = page.locator('button:has-text("Confirmar escolha")');
      await confirmBtn.click();
      await page.waitForTimeout(1000);
    }

    // Check PetSprite in Tamagotchi
    const petImg = page.locator('img.pixel').first();
    await petImg.waitFor({ state: 'visible', timeout: 5000 });
    const initialSrc = await petImg.getAttribute('src');
    console.log(`Tamagotchi active sprite src: ${initialSrc}`);

    if (!initialSrc || !initialSrc.includes('/sprites/')) {
      throw new Error(`Expected sprite from /sprites/, got: ${initialSrc}`);
    }

    await page.screenshot({ path: 'screenshots/tamagotchi-verified.png' });
    console.log('Saved Tamagotchi screenshot to screenshots/tamagotchi-verified.png');

    // Test actions in Tamagotchi
    console.log('Testing Tamagotchi action: Comer...');
    const feedBtn = page.locator('button:has-text("Comer")');
    if (await feedBtn.isVisible()) {
      await feedBtn.click();
      await page.waitForTimeout(1200);
    }

    console.log('Testing Tamagotchi action: Banho...');
    const cleanBtn = page.locator('button:has-text("Banho")');
    if (await cleanBtn.isVisible()) {
      await cleanBtn.click();
      await page.waitForTimeout(1200);
    }

    console.log('Testing Tamagotchi action: Brincar...');
    const playBtn = page.locator('button:has-text("Brincar")');
    if (await playBtn.isVisible()) {
      await playBtn.click();
      await page.waitForTimeout(1200);
    }

    // 2. Test Caminho Digital with Agumon
    console.log('Entering Caminho Digital panel with Agumon...');
    const caminhoTab = page.locator('button:has-text("Caminho Digital")').first();
    await caminhoTab.click();
    await page.waitForTimeout(800);

    const startRunBtn = page.locator('button:has-text("INICIAR CAMINHO DIGITAL")');
    await startRunBtn.click();

    // Wait for Phaser canvas
    const canvas = page.locator('canvas').first();
    await canvas.waitFor({ state: 'visible', timeout: 10000 });
    console.log('Phaser canvas mounted successfully.');
    await page.waitForTimeout(2000);

    // Test movement
    console.log('Testing movement in Roguelike...');
    await page.keyboard.down('KeyD');
    await page.waitForTimeout(500);
    await page.keyboard.up('KeyD');
    await page.keyboard.down('KeyW');
    await page.waitForTimeout(500);
    await page.keyboard.up('KeyW');

    // Test attacks
    console.log('Testing attacks...');
    await page.keyboard.press('KeyJ'); // Basic 1
    await page.waitForTimeout(300);
    await page.keyboard.press('KeyK'); // Basic 2
    await page.waitForTimeout(300);
    await page.keyboard.press('KeyL'); // Special
    await page.waitForTimeout(500);

    // Exit run or return to hub
    console.log('Exiting run via Abandonar/Sair...');
    const abandonBtn = page.locator('button:has-text("Abandonar Expedição"), button:has-text("Voltar"), button:has-text("Sair")').first();
    if (await abandonBtn.isVisible()) {
      await abandonBtn.click();
      await page.waitForTimeout(500);
    }
    // 3. Switch pet to Veemon and test
    console.log('Testing partner Veemon...');
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.goto('http://127.0.0.1:8080/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    const comecarVeemon = page.locator('button:has-text("Comecar")');
    if (await comecarVeemon.isVisible()) {
      await comecarVeemon.click();
      await page.waitForTimeout(500);
    }

    const veemonCard = page.locator('button:has(h2:has-text("Veemon"))');
    await veemonCard.click();
    await page.waitForTimeout(400);

    await page.locator('button:has-text("Confirmar escolha")').click();
    await page.waitForTimeout(1000);

    const veemonImg = page.locator('img.pixel').first();
    const veemonSrc = await veemonImg.getAttribute('src');
    console.log(`Veemon Tamagotchi active sprite src: ${veemonSrc}`);

    if (!veemonSrc || !veemonSrc.includes('/sprites/veemon/')) {
      throw new Error(`Expected Veemon sprite from /sprites/veemon/, got: ${veemonSrc}`);
    }

    // Enter Caminho Digital with Veemon
    console.log('Entering Caminho Digital with Veemon...');
    const veemonCaminhoTab = page.locator('button:has-text("Caminho Digital")').first();
    await veemonCaminhoTab.click();
    await page.waitForTimeout(800);

    const startVeemonRun = page.locator('button:has-text("INICIAR CAMINHO DIGITAL")');
    await startVeemonRun.click();

    const veemonCanvas = page.locator('canvas').first();
    await veemonCanvas.waitFor({ state: 'visible', timeout: 10000 });
    console.log('Veemon Phaser canvas mounted.');
    await page.waitForTimeout(2000);

    // Test Veemon 4 directions & attacks
    await page.keyboard.press('KeyD');
    await page.waitForTimeout(200);
    await page.keyboard.press('KeyJ');
    await page.waitForTimeout(200);
    await page.keyboard.press('KeyK');
    await page.waitForTimeout(200);
    await page.keyboard.press('KeyL');
    await page.waitForTimeout(500);

    // Take verification screenshot
    await page.screenshot({ path: 'screenshots/sprite-unified-verification.png' });
    console.log('Saved screenshot to screenshots/sprite-unified-verification.png');

    console.log('\n--- VERIFICATION SUMMARY ---');
    console.log(`Failed sprite URLs (404s): ${failedUrls.length}`);
    console.log(`Console errors: ${consoleErrors.length}`);

    if (failedUrls.length > 0) {
      console.error('FAILED: Found 404 sprite URLs:', failedUrls);
      process.exit(1);
    }
    if (consoleErrors.length > 0) {
      console.error('FAILED: Found console errors:', consoleErrors);
      process.exit(1);
    }

    console.log('SUCCESS: All sprite requests passed with 200, zero console errors!');
  } catch (err) {
    console.error('Test threw error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
