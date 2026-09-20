import { chromium } from 'playwright';
import path from 'path';

const BASE = 'http://172.27.140.162:8080';
const SHOT = (name) => `/home/spira/digigotchi-main/screenshots/${name}.png`;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push(e.message));

const click = async (selector, label, timeout = 6000) => {
  try {
    const el = page.locator(selector).first();
    await el.waitFor({ timeout });
    await el.click();
    console.log(`✓ Clicked: ${label}`);
    await page.waitForTimeout(1500);
    return true;
  } catch(e) {
    console.log(`✗ Not found: ${label} — ${e.message.split('\n')[0]}`);
    return false;
  }
};

const snap = async (name) => {
  await page.screenshot({ path: SHOT(name), fullPage: false });
  console.log(`📸 ${name}`);
};

// ─── Step 1: Landing ───────────────────────────────────────────────
await page.goto(BASE, { waitUntil: 'networkidle', timeout: 20000 });
await page.waitForTimeout(2000);
await snap('s01_landing');

// ─── Step 2: Click "Comecar" ───────────────────────────────────────
await click('button:has-text("Comecar"), button:has-text("Começar")', 'Comecar');
await snap('s02_after_comecar');

// ─── Step 3: Choose first available Digimon line ───────────────────
// Line selection cards
const lineClicked = await click('[data-testid*="line"], .line-card, button:has-text("Agumon"), button:has-text("Gabumon"), button:has-text("Patamon"), button:has-text("Tentomon")', 'DigiLine', 5000);
if (!lineClicked) {
  // Try clicking any selectable card
  await click('button, [role="button"]', 'first button', 3000);
}
await snap('s03_line_select');

// Look for confirm button after selection
await click('button:has-text("Confirmar"), button:has-text("Escolher"), button:has-text("OK"), button:has-text("Selecionar")', 'Confirm line', 4000);
await snap('s04_after_confirm');

// ─── Step 4: Wait for Tamagotchi main screen ──────────────────────
await page.waitForTimeout(2000);
await snap('s05_tamagotchi_main');

// List all button texts on screen
const allBtns = await page.locator('button').allTextContents();
console.log('Buttons visible:', JSON.stringify(allBtns));

// ─── Step 5: Click Caminho Digital ───────────────────────────────
const entered = await click(
  'button:has-text("Caminho"), button:has-text("Digital"), button:has-text("Treino"), button[title*="Caminho"], [aria-label*="Caminho"]',
  'Caminho Digital',
  5000
);
await snap('s06_caminho_attempt');
await page.waitForTimeout(2000);
await snap('s07_after_caminho');

// ─── Step 6: Start the run ────────────────────────────────────────
await click('button:has-text("Entrar"), button:has-text("Iniciar"), button:has-text("Jogar"), button:has-text("Run")', 'Start run', 5000);
await page.waitForTimeout(5000);
await snap('s08_dungeon');
await page.waitForTimeout(2000);
await snap('s08b_dungeon_delay');

// Check canvas
const hasCanvas = await page.locator('canvas').count() > 0;
console.log('Has canvas:', hasCanvas);

if (errors.length > 0) {
  console.log('ERRORS:', errors.join('\n'));
} else {
  console.log('No console errors ✓');
}

await browser.close();
console.log('Done');
