import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";

const defaultChromePath = [
  "/home/spira/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell",
  "/home/spira/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome",
].find((p) => existsSync(p));

async function runTileGalleryQA() {
  console.log("=== INICIANDO QA VISUAL DA TILE GALLERY (TODOS OS TEMAS) ===");
  mkdirSync("screenshots", { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || defaultChromePath,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 1200 },
  });
  const page = await context.newPage();

  const failedRequests = [];
  page.on("requestfailed", (req) => {
    failedRequests.push(req.url());
    console.error(`[HTTP FAIL] ${req.url()}`);
  });

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  const baseUrl = process.env.TARGET_URL || "http://172.27.140.162:8080";
  console.log(`Conectando em: ${baseUrl}/tile-gallery-qa.html`);
  await page.goto(`${baseUrl}/tile-gallery-qa.html`, { waitUntil: "networkidle" });

  // Audit loaded images
  const imgStats = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll("img.tile-img"));
    const broken = [];
    const loaded = [];
    for (const img of imgs) {
      if (img.naturalWidth === 0 || img.naturalHeight === 0) {
        broken.push(img.src);
      } else {
        loaded.push({
          src: img.src,
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      }
    }
    return {
      total: imgs.length,
      loadedCount: loaded.length,
      brokenCount: broken.length,
      brokenList: broken,
      nonCanonicalCount: loaded.filter((l) => l.width !== 96 || l.height !== 96).length,
    };
  });

  console.log("Estatísticas da Tile Gallery:", imgStats);

  // Capture theme section screenshots for visual inspection
  for (const themeId of ["tech", "fire", "ice", "lighting"]) {
    const el = page.locator(`#theme-${themeId}`);
    if (await el.count()) {
      await el.screenshot({ path: `screenshots/tile_gallery_${themeId}.png` });
      console.log(`📸 Capturada screenshot: screenshots/tile_gallery_${themeId}.png`);
    }
  }

  await browser.close();

  if (imgStats.brokenCount > 0) {
    console.error("❌ ERRO: Existem imagens quebradas na Tile Gallery!", imgStats.brokenList);
    process.exit(1);
  }
  if (failedRequests.length > 0) {
    console.error("❌ ERRO: Requisições de imagem falharam!", failedRequests);
    process.exit(1);
  }

  console.log("✅ TILE GALLERY QA APROVADO COM 100% DE CARREGAMENTO!");
}

runTileGalleryQA().catch((err) => {
  console.error("Erro no Tile Gallery QA:", err);
  process.exit(1);
});
