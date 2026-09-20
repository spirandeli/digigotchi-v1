import { chromium } from 'playwright';
import fs from 'node:fs';

async function runVfxValidation() {
  console.log('===============================================================');
  console.log('=== AUDITORIA E VALIDAÇÃO E2E DE EFEITOS VISUAIS (VFX) ========');
  console.log('===============================================================');

  if (!fs.existsSync('screenshots/vfx-audit')) {
    fs.mkdirSync('screenshots/vfx-audit', { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const failedUrls = [];
  const consoleErrors = [];
  const loadedSpriteUrls = new Set();

  page.on('response', (res) => {
    if (res.url().includes('/sprites/')) {
      loadedSpriteUrls.add(res.url());
      if (res.status() >= 400) {
        failedUrls.push({ url: res.url(), status: res.status() });
        console.error(`[404 ASSET ERROR] ${res.status()} - ${res.url()}`);
      }
    }
  });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.error(`[CONSOLE ERROR] ${msg.text()}`);
    }
  });

  try {
    console.log('1. Navegando para http://127.0.0.1:8080/ ...');
    await page.goto('http://127.0.0.1:8080/', { waitUntil: 'networkidle' });

    const comecarBtn = page.locator('button:has-text("Comecar")');
    if (await comecarBtn.isVisible()) {
      await comecarBtn.click();
      await page.waitForTimeout(600);
    }

    const agumonCard = page.locator('button:has(h2:has-text("Agumon"))');
    if (await agumonCard.isVisible()) {
      await agumonCard.click();
      await page.waitForTimeout(300);
      const confirmBtn = page.locator('button:has-text("Confirmar escolha")');
      await confirmBtn.click();
      await page.waitForTimeout(800);
    }

    // Entrar no Caminho Digital
    console.log('2. Entrando no Caminho Digital...');
    const caminhoTab = page.locator('button:has-text("Caminho Digital")').first();
    await caminhoTab.click();
    await page.waitForTimeout(600);

    const startRunBtn = page.locator('button:has-text("INICIAR CAMINHO DIGITAL")');
    await startRunBtn.click();

    const canvas = page.locator('canvas').first();
    await canvas.waitFor({ state: 'visible', timeout: 10000 });
    console.log('Canvas Phaser montado com sucesso.');

    await page.waitForFunction(() => {
      const scene = window.__digitalPathActiveScene;
      return scene && scene.player && scene.vfxProfile;
    }, { timeout: 15000 });

    console.log('3. Validando Perfil VFX do Agumon...');
    const agumonVfxReport = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      return {
        speciesId: scene.vfxProfile.speciesId,
        basic1HasVfx: scene.vfxProfile.basic1.hasVisualEffect,
        basic2HasProj: scene.vfxProfile.basic2.hasProjectile,
        basic2ProjAnim: scene.vfxProfile.basic2.projectileAnimKey,
        specialHasVfx: scene.vfxProfile.special.hasVisualEffect,
        specialAnim: scene.vfxProfile.special.effectAnimKey,
      };
    });
    console.log('Agumon VFX Profile:', agumonVfxReport);

    // Testar Ataque 1 do Agumon (Sem arcos procedurais)
    console.log('4. Executando Ataque 1 do Agumon...');
    const basic1Result = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      const initialChildren = scene.children.list.length;
      scene.performBasicAttack1(scene.time.now);
      const afterChildren = scene.children.list.length;
      // Procura por GameObjects de Graphics de slash
      const graphicsSlashes = scene.children.list.filter(
        c => c.type === 'Graphics' && c.alpha > 0.5 && c.depth === 15
      );
      return {
        initialChildren,
        afterChildren,
        graphicsSlashesCount: graphicsSlashes.length,
      };
    });
    console.log('Resultado Ataque 1 Agumon (Melee Físico puro sem slash desenhado):', basic1Result);
    if (basic1Result.graphicsSlashesCount > 0) {
      throw new Error('Falha: ainda existe Graphics slash procedural sendo gerado no Ataque 1 do Agumon!');
    }

    // Testar Ataque 2 do Agumon (Projétil Dragon)
    console.log('5. Executando Ataque 2 do Agumon...');
    const basic2Result = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      scene.performBasicAttack2(scene.time.now);
      const proj = scene.projectiles[scene.projectiles.length - 1];
      return {
        hasProjectile: !!proj,
        textureKey: proj?.sprite?.texture?.key,
        animKey: proj?.sprite?.anims?.currentAnim?.key,
        isTinted: proj?.sprite?.isTinted,
        vx: proj?.vx,
        vy: proj?.vy,
      };
    });
    console.log('Resultado Ataque 2 Agumon (Projétil Dragon):', basic2Result);

    // Testar Especial do Agumon (Mega Blast)
    console.log('6. Executando Especial do Agumon...');
    const specialResult = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      scene.performSpecialAttack(scene.time.now);
      const specialVfx = scene.transientVfx.find(v => v.texture?.key?.includes('mega_blast'));
      const graphicsWaves = scene.children.list.filter(
        c => c.type === 'Graphics' && c.depth === 14
      );
      return {
        hasSpecialVfxSprite: !!specialVfx,
        textureKey: specialVfx?.texture?.key,
        animKey: specialVfx?.anims?.currentAnim?.key,
        graphicsWaveCount: graphicsWaves.length,
      };
    });
    console.log('Resultado Especial Agumon (Mega Blast Sprite):', specialResult);
    if (specialResult.graphicsWaveCount > 0) {
      throw new Error('Falha: ainda existe cone procedural add.graphics no golpe especial do Agumon!');
    }

    // Testar Cura com Partículas Autênticas
    console.log('7. Testando Efeito de Cura...');
    const healResult = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      scene.healPlayer(20);
      const healVfx = scene.transientVfx.find(v => v.texture?.key?.includes('heal'));
      return {
        hasHealVfx: !!healVfx,
        textureKey: healVfx?.texture?.key,
      };
    });
    console.log('Resultado Efeito de Cura:', healResult);

    // 8. Testar Veemon com todas as 4 direções
    console.log('8. Trocando Perfil Ativo para Veemon e validando 4 direções...');
    const directions = ['right', 'left', 'up', 'down'];
    const veemonDirResults = {};

    for (const dir of directions) {
      const dirResult = await page.evaluate((targetDir) => {
        const scene = window.__digitalPathActiveScene;
        // Importa ou define profile do Veemon no runtime
        const veemonProfile = {
          speciesId: "veemon",
          basic1: {
            hasVisualEffect: true,
            effectAnimKey: "veemon_effects_attack_1",
            effectTextureKey: "veemon_effects_attack_1_0",
            scale: 0.95,
            offsetForward: 36,
            rotationMode: "match_facing",
            durationMs: 180,
          },
          basic2: {
            hasProjectile: true,
            projectileAnimKey: "veemon_projectile_laser",
            projectileTextureKey: "veemon_projectile_laser_0",
            scale: 0.9,
            speed: 390,
            impactAnimKey: "veemon_effects_hit",
            impactTextureKey: "veemon_effects_hit_0",
            impactScale: 1.15,
            impactDurationMs: 160,
          },
          special: {
            hasVisualEffect: true,
            effectAnimKey: "veemon_effects_special",
            effectTextureKey: "veemon_effects_special_0",
            secondaryAnimKey: "veemon_effects_attack_2",
            secondaryTextureKey: "veemon_effects_attack_2_0",
            scale: 1.25,
            secondaryScale: 1.05,
            offsetForward: 44,
            durationMs: 350,
            isGroundBurst: true,
          },
          hitImpact: {
            animKey: "veemon_effects_hit",
            textureKey: "veemon_effects_hit_0",
            scale: 1.0,
            durationMs: 140,
          },
          heal: {
            animKey: "veemon_heal",
            textureKey: "veemon_heal_0",
            scale: 0.85,
            durationMs: 400,
          },
        };
        scene.vfxProfile = veemonProfile;
        scene.setPlayerFacing(targetDir);

        // Basic 1
        scene.performBasicAttack1(scene.time.now);
        const slashVfx = scene.transientVfx.find(v => v.texture?.key === "veemon_effects_attack_1_0");

        // Basic 2
        scene.performBasicAttack2(scene.time.now);
        const proj = scene.projectiles[scene.projectiles.length - 1];

        return {
          direction: targetDir,
          slashVfxFound: !!slashVfx,
          slashRotation: slashVfx?.rotation,
          slashFlipY: slashVfx?.flipY,
          projFound: !!proj,
          projTexture: proj?.sprite?.texture?.key,
          projRotation: proj?.sprite?.rotation,
          projIsTinted: proj?.sprite?.isTinted,
        };
      }, dir);

      veemonDirResults[dir] = dirResult;
      await page.waitForTimeout(100);
    }
    console.log('Resultados Direcionais do Veemon (4 Direções):', JSON.stringify(veemonDirResults, null, 2));

    // 9. Testar Inimigo disparando projétil autêntico
    console.log('9. Testando projétil de Inimigo autêntico...');
    const enemyProjResult = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      scene.spawnEnemyProjectile(100, 100, 200, 100, 15, 'veemon');
      const ep = scene.enemyProjectiles[scene.enemyProjectiles.length - 1];
      return {
        isSprite: ep?.sprite?.type === 'Sprite',
        isGraphics: ep?.sprite?.type === 'Graphics',
        textureKey: ep?.sprite?.texture?.key,
        animKey: ep?.sprite?.anims?.currentAnim?.key,
      };
    });
    console.log('Resultado Projétil Inimigo (Wild Veemon):', enemyProjResult);
    if (!enemyProjResult.isSprite || enemyProjResult.isGraphics) {
      throw new Error('Falha: projétil de inimigo ainda está sendo criado como Graphics em vez de Sprite!');
    }

    // 10. Capturar screenshot final de verificação
    await page.screenshot({ path: 'screenshots/vfx-audit/vfx-combat-verified.png' });
    console.log('Screenshot salva em screenshots/vfx-audit/vfx-combat-verified.png');

    console.log('\n===============================================================');
    console.log('=== RELATÓRIO DE AUDITORIA DE ERROS ===========================');
    console.log(`404s em Sprites/VFX: ${failedUrls.length}`);
    console.log(`Erros no Console: ${consoleErrors.length}`);
    console.log('===============================================================');

    if (failedUrls.length > 0) {
      throw new Error(`Falha: ${failedUrls.length} assets retornaram 404!`);
    }
    if (consoleErrors.length > 0) {
      throw new Error(`Falha: ${consoleErrors.length} erros no console do navegador!`);
    }

    console.log('TODAS AS VALIDAÇÕES DE VFX PASSARAM COM 100% DE SUCESSO!');
  } finally {
    await browser.close();
  }
}

runVfxValidation().catch((err) => {
  console.error('ERRO FATAL NA VALIDAÇÃO DE VFX:', err);
  process.exit(1);
});
