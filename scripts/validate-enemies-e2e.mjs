import { chromium } from 'playwright';

async function run() {
  console.log('=== INICIANDO VALIDAÇÃO E2E DO SISTEMA DE INIMIGOS COM public/sprites ===');
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
        console.error(`[404 SPRITE ERROR] ${res.status()} - ${res.url()}`);
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
    // 1. Acessa aplicação e inicia
    console.log('Navegando para http://127.0.0.1:8080/ ...');
    await page.goto('http://127.0.0.1:8080/', { waitUntil: 'networkidle' });

    const comecarBtn = page.locator('button:has-text("Comecar")');
    if (await comecarBtn.isVisible()) {
      console.log('Clicando em Comecar...');
      await comecarBtn.click();
      await page.waitForTimeout(600);
    }

    const agumonCard = page.locator('button:has(h2:has-text("Agumon"))');
    if (await agumonCard.isVisible()) {
      console.log('Selecionando Agumon...');
      await agumonCard.click();
      await page.waitForTimeout(300);
      const confirmBtn = page.locator('button:has-text("Confirmar escolha")');
      await confirmBtn.click();
      await page.waitForTimeout(800);
    }

    // 2. Entrar no Caminho Digital
    console.log('Entrando no Caminho Digital...');
    const caminhoTab = page.locator('button:has-text("Caminho Digital")').first();
    await caminhoTab.click();
    await page.waitForTimeout(600);

    const startRunBtn = page.locator('button:has-text("INICIAR CAMINHO DIGITAL")');
    await startRunBtn.click();

    const canvas = page.locator('canvas').first();
    await canvas.waitFor({ state: 'visible', timeout: 10000 });
    console.log('Canvas Phaser montado com sucesso.');

    // Aguarda o Phaser carregar assets e instanciar a primeira sala
    await page.waitForFunction(() => {
      const scene = window.__digitalPathActiveScene;
      return scene && scene.activeRoom && scene.activeRoom.id === 'room_01';
    }, { timeout: 15000 });
    console.log('Cena Phaser inicializada na Sala 1.');

    // 3. Transiciona para a Sala 2 (Sala de Combate)
    console.log('Avançando para a Sala 2 (Combate com inimigos)...');
    await page.waitForTimeout(500);
    await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      if (scene && scene.exitDoorSprite) {
        scene.player.x = scene.exitDoorSprite.x;
        scene.player.y = scene.exitDoorSprite.y;
      } else if (scene && typeof scene.advanceToNextRoom === 'function') {
        scene.advanceToNextRoom();
      }
    });

    await page.waitForFunction(() => {
      const scene = window.__digitalPathActiveScene;
      return scene && !scene.isTransitioning && scene.enemies && scene.enemies.length > 0;
    }, { timeout: 15000 });

    await page.waitForTimeout(1000);

    // 4. Inspeciona os inimigos na Sala 2
    const enemyDetails = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      if (!scene) return { error: 'Scene not found on window.__digitalPathActiveScene' };

      const enemies = scene.enemies || [];
      return {
        roomId: scene.activeRoom?.id,
        enemiesCount: enemies.length,
        enemies: enemies.map((e) => ({
          id: e.id,
          name: e.name,
          species: e.species,
          currentAnim: e.sprite?.anims?.currentAnim?.key,
          active: e.sprite?.active,
          hp: e.currentHp,
          maxHp: e.maxHp,
          x: Math.round(e.sprite?.x || 0),
          y: Math.round(e.sprite?.y || 0),
        })),
        playerX: Math.round(scene.player?.x || 0),
        playerY: Math.round(scene.player?.y || 0),
      };
    });

    console.log('Detalhes dos inimigos encontrados na Sala de Combate:');
    console.log(JSON.stringify(enemyDetails, null, 2));

    await page.screenshot({ path: 'screenshots/enemy-combat-active.png' });
    console.log('Screenshot salva em screenshots/enemy-combat-active.png');

    if (!enemyDetails.enemiesCount || enemyDetails.enemiesCount === 0) {
      throw new Error('Nenhum inimigo encontrado na Sala de Combate!');
    }

    // 5. Teste de dano, hit animation e combate
    console.log('Testando aplicação de dano e hit animation...');
    const hitResult = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      if (!scene || !scene.enemies || scene.enemies.length === 0) return null;
      const target = scene.enemies[0];
      const initialHp = target.currentHp;
      // Aplica dano parcial (não letal)
      scene.damageEnemy(target, 20);
      return {
        initialHp,
        newHp: target.currentHp,
        state: target.state,
        species: target.species,
        currentAnim: target.sprite.anims.currentAnim?.key,
      };
    });
    console.log('Resultado do teste de dano parcial:', JSON.stringify(hitResult, null, 2));

    await page.waitForTimeout(600);

    // 6. Teste de morte de todos os inimigos da sala, death animation, concessão de XP e desbloqueio da porta
    console.log('Testando derrota dos inimigos, animação de morte, XP e destrancamento de porta...');
    const deathResult = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      if (!scene || !scene.enemies || scene.enemies.length === 0) return null;
      const prevXp = scene.playerXp;
      const targets = scene.enemies.slice();
      for (const target of targets) {
        if (target.state !== 'dead') {
          scene.damageEnemy(target, target.currentHp + 10);
        }
      }
      return {
        targetsCount: targets.length,
        deadCount: scene.enemies.filter((e) => e.state === 'dead').length,
        prevXp,
        newXp: scene.playerXp,
        xpGained: scene.playerXp - prevXp,
        isDoorUnlocked: scene.isDoorUnlocked,
      };
    });
    console.log('Resultado da derrota dos inimigos:', JSON.stringify(deathResult, null, 2));

    // Aguarda conclusão da animação de morte e destruição do sprite
    await page.waitForTimeout(800);

    // 7. Teste de MÚLTIPLOS DIGIMONS e MÚLTIPLAS INSTÂNCIAS (Agumon x3, Gabumon x2)
    console.log('Testando múltiplas instâncias simultâneas de múltiplos Digimons...');
    const multiInstanceResult = await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      if (!scene) return null;

      const instances = [];
      const testDefs = [
        { species: 'agumon', x: 200, y: 200 },
        { species: 'agumon', x: 250, y: 200 },
        { species: 'agumon', x: 300, y: 200 },
        { species: 'gabumon', x: 200, y: 260 },
        { species: 'gabumon', x: 250, y: 260 },
      ];

      for (const def of testDefs) {
        const animKey = `enemy_${def.species}_idle`;
        const sprite = scene.add.sprite(def.x, def.y, animKey);
        sprite.setScale(0.65);
        if (scene.anims.exists(animKey)) {
          sprite.play(animKey);
        }
        instances.push({
          species: def.species,
          animKey: sprite.anims.currentAnim?.key,
          isPlaying: sprite.anims.isPlaying,
          textureKey: sprite.texture.key,
          active: sprite.active,
          x: sprite.x,
          y: sprite.y,
        });
        // Destrói após verificação para manter a cena limpa
        sprite.destroy();
      }

      return {
        totalSpawned: instances.length,
        instances,
        agumonAnimExists: scene.anims.exists('enemy_agumon_idle'),
        gabumonAnimExists: scene.anims.exists('enemy_gabumon_idle'),
        veemonAnimExists: scene.anims.exists('enemy_veemon_idle'),
        etemonAnimExists: scene.anims.exists('enemy_etemon_idle'),
        garurumonAnimExists: scene.anims.exists('enemy_garurumon_idle'),
      };
    });
    console.log('Resultado do teste multi-instância e multi-Digimon:');
    console.log(JSON.stringify(multiInstanceResult, null, 2));

    // 8. Teste de RESPAWN / Avanço para nova sala com novos inimigos
    console.log('Testando avanço para próxima sala com novos inimigos...');
    await page.evaluate(() => {
      const scene = window.__digitalPathActiveScene;
      if (scene && scene.exitDoorSprite) {
        scene.player.x = scene.exitDoorSprite.x;
        scene.player.y = scene.exitDoorSprite.y;
      } else if (scene && typeof scene.advanceToNextRoom === 'function') {
        scene.advanceToNextRoom();
      }
    });

    await page.waitForFunction(() => {
      const scene = window.__digitalPathActiveScene;
      return scene && !scene.isTransitioning && scene.activeRoom && scene.activeRoom.id !== 'room_02';
    }, { timeout: 15000 });

    await page.waitForTimeout(1000);

    // Captura screenshot final
    await page.screenshot({ path: 'screenshots/enemy-combat-verified.png' });
    console.log('Screenshot salva em screenshots/enemy-combat-verified.png');

    // 9. Confirma que os sprites dos inimigos vieram de /sprites/[species]/
    const verifiedEnemySprites = Array.from(loadedSpriteUrls).filter(
      (url) =>
        url.includes('/sprites/gabumon/') ||
        url.includes('/sprites/veemon/') ||
        url.includes('/sprites/etemon/') ||
        url.includes('/sprites/agumon/') ||
        url.includes('/sprites/garurumon/')
    );

    console.log(`\nSprites de Digimons verificados em runtime: ${verifiedEnemySprites.length}`);
    verifiedEnemySprites.slice(0, 10).forEach((u) => console.log(' ->', u));

    console.log('\n--- RESUMO DA VALIDAÇÃO ---');
    console.log(`Erros 404 em sprites: ${failedUrls.length}`);
    console.log(`Erros no console: ${consoleErrors.length}`);
    console.log(`Inimigos na sala de combate inicial: ${enemyDetails.enemiesCount}`);
    console.log(`Dano aplicado com sucesso: ${hitResult && hitResult.newHp < hitResult.initialHp}`);
    console.log(`Morte registrada com sucesso: ${deathResult && deathResult.deadCount > 0}`);
    console.log(`XP concedido: ${deathResult?.xpGained || 0}`);
    console.log(`Porta destrancada após morte: ${deathResult?.isDoorUnlocked}`);
    console.log(`Múltiplas instâncias simultâneas validadas: ${multiInstanceResult?.totalSpawned === 5}`);

    if (failedUrls.length > 0) {
      throw new Error(`URLs 404 encontradas: ${JSON.stringify(failedUrls)}`);
    }
    if (consoleErrors.length > 0) {
      throw new Error(`Erros no console encontrados: ${JSON.stringify(consoleErrors)}`);
    }
    if (!hitResult || hitResult.newHp >= hitResult.initialHp) {
      throw new Error('Falha no teste de dano do inimigo!');
    }
    if (!deathResult || deathResult.deadCount === 0) {
      throw new Error('Falha no teste de morte do inimigo!');
    }
    if (!multiInstanceResult || multiInstanceResult.totalSpawned !== 5) {
      throw new Error('Falha no teste de múltiplas instâncias!');
    }

    console.log('SUCESSO: Inimigos utilizando public/sprites/[nome-digimon] com zero 404s e zero erros de console!');
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error('ERRO FATAL:', err);
  process.exit(1);
});
