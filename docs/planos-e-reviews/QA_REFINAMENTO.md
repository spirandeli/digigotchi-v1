# QA — Refinamento de sprites, áudio e habilidades

Validação automática da rodada baseada no plano de refinamento.

## Resumo

- Status geral: **PASS**
- Canvas dos frames: `96x96` com transparência.
- Frames exatamente duplicados: bloqueados pelo QA.
- Áudio: `.ogg` com fallback `.mp3` para cada ação.
- Ataques: 12 frames por forma.
- Multiplicador de XP de QA: `x3`.

## Digimon por Digimon

### agumon
- QA: **PASS**
- Escala na tela: `0.90`
- Habilidade: **Pepper Breath / Baby Flame**
- Ataque exclusivo: `attack-pepper-breath`
- Som principal: `attack.ogg` + fallback `attack.mp3`
- Frames: idle:10, eat:10, play:12, sleep:6, wake:8, clean:10, heal:10, evolve:14, attack-pepper-breath:12
- Centro/chão: normalizado em canvas comum, com ajuste individual no `SPRITE_STAGE_LAYOUT`.
- Fundo: transparência validada nos quatro cantos.
- Repetição exata: nenhuma.
- Problemas restantes: nenhum bloqueador automático encontrado.

### geogreymon
- QA: **PASS**
- Escala na tela: `0.96`
- Habilidade: **Mega Flame**
- Ataque exclusivo: `attack-mega-flame`
- Som principal: `attack.ogg` + fallback `attack.mp3`
- Frames: idle:10, eat:10, play:12, sleep:6, wake:8, clean:10, heal:10, evolve:14, attack-mega-flame:12
- Centro/chão: normalizado em canvas comum, com ajuste individual no `SPRITE_STAGE_LAYOUT`.
- Fundo: transparência validada nos quatro cantos.
- Repetição exata: nenhuma.
- Problemas restantes: nenhum bloqueador automático encontrado.

### wargreymon
- QA: **PASS**
- Escala na tela: `1.07`
- Habilidade: **Terra Force / Gaia Force**
- Ataque exclusivo: `attack-terra-force`
- Som principal: `attack.ogg` + fallback `attack.mp3`
- Frames: idle:10, eat:10, play:12, sleep:6, wake:8, clean:10, heal:10, evolve:14, attack-terra-force:12
- Centro/chão: normalizado em canvas comum, com ajuste individual no `SPRITE_STAGE_LAYOUT`.
- Fundo: transparência validada nos quatro cantos.
- Repetição exata: nenhuma.
- Problemas restantes: nenhum bloqueador automático encontrado.

### etemon
- QA: **PASS**
- Escala na tela: `0.92`
- Habilidade: **Love Serenade / Concert Crush**
- Ataque exclusivo: `attack-love-serenade`
- Som principal: `attack.ogg` + fallback `attack.mp3`
- Frames: idle:10, eat:10, play:12, sleep:6, wake:8, clean:10, heal:10, evolve:14, attack-love-serenade:12
- Centro/chão: normalizado em canvas comum, com ajuste individual no `SPRITE_STAGE_LAYOUT`.
- Fundo: transparência validada nos quatro cantos.
- Repetição exata: nenhuma.
- Problemas restantes: nenhum bloqueador automático encontrado.

### metaletemon
- QA: **PASS**
- Escala na tela: `1.04`
- Habilidade: **Banana Slip**
- Ataque exclusivo: `attack-banana-slip`
- Som principal: `attack.ogg` + fallback `attack.mp3`
- Frames: idle:10, eat:10, play:12, sleep:6, wake:8, clean:10, heal:10, evolve:14, attack-banana-slip:12
- Centro/chão: normalizado em canvas comum, com ajuste individual no `SPRITE_STAGE_LAYOUT`.
- Fundo: transparência validada nos quatro cantos.
- Repetição exata: nenhuma.
- Problemas restantes: nenhum bloqueador automático encontrado.

### gabumon
- QA: **PASS**
- Escala na tela: `0.90`
- Habilidade: **Blue Blaster / Petit Fire**
- Ataque exclusivo: `attack-blue-blaster`
- Som principal: `attack.ogg` + fallback `attack.mp3`
- Frames: idle:10, eat:10, play:12, sleep:6, wake:8, clean:10, heal:10, evolve:14, attack-blue-blaster:12
- Centro/chão: normalizado em canvas comum, com ajuste individual no `SPRITE_STAGE_LAYOUT`.
- Fundo: transparência validada nos quatro cantos.
- Repetição exata: nenhuma.
- Problemas restantes: nenhum bloqueador automático encontrado.

### garurumon
- QA: **PASS**
- Escala na tela: `0.93`
- Habilidade: **Howling Blaster / Fox Fire**
- Ataque exclusivo: `attack-howling-blaster`
- Som principal: `attack.ogg` + fallback `attack.mp3`
- Frames: idle:10, eat:10, play:12, sleep:6, wake:8, clean:10, heal:10, evolve:14, attack-howling-blaster:12
- Centro/chão: normalizado em canvas comum, com ajuste individual no `SPRITE_STAGE_LAYOUT`.
- Fundo: transparência validada nos quatro cantos.
- Repetição exata: nenhuma.
- Problemas restantes: nenhum bloqueador automático encontrado.

### weregarurumon
- QA: **PASS**
- Escala na tela: `1.01`
- Habilidade: **Wolf Claw / Kaiser Nail**
- Ataque exclusivo: `attack-wolf-claw`
- Som principal: `attack.ogg` + fallback `attack.mp3`
- Frames: idle:10, eat:10, play:12, sleep:6, wake:8, clean:10, heal:10, evolve:14, attack-wolf-claw:12
- Centro/chão: normalizado em canvas comum, com ajuste individual no `SPRITE_STAGE_LAYOUT`.
- Fundo: transparência validada nos quatro cantos.
- Repetição exata: nenhuma.
- Problemas restantes: nenhum bloqueador automático encontrado.

### veemon
- QA: **PASS**
- Escala na tela: `0.90`
- Habilidade: **Vee Headbutt**
- Ataque exclusivo: `attack-vee-headbutt`
- Som principal: `attack.ogg` + fallback `attack.mp3`
- Frames: idle:10, eat:10, play:12, sleep:6, wake:8, clean:10, heal:10, evolve:14, attack-vee-headbutt:12
- Centro/chão: normalizado em canvas comum, com ajuste individual no `SPRITE_STAGE_LAYOUT`.
- Fundo: transparência validada nos quatro cantos.
- Repetição exata: nenhuma.
- Problemas restantes: nenhum bloqueador automático encontrado.

### flamedramon
- QA: **PASS**
- Escala na tela: `0.96`
- Habilidade: **Fire Rocket**
- Ataque exclusivo: `attack-fire-rocket`
- Som principal: `attack.ogg` + fallback `attack.mp3`
- Frames: idle:10, eat:10, play:12, sleep:6, wake:8, clean:10, heal:10, evolve:14, attack-fire-rocket:12
- Centro/chão: normalizado em canvas comum, com ajuste individual no `SPRITE_STAGE_LAYOUT`.
- Fundo: transparência validada nos quatro cantos.
- Repetição exata: nenhuma.
- Problemas restantes: nenhum bloqueador automático encontrado.

### xvmon
- QA: **PASS**
- Escala na tela: `0.98`
- Habilidade: **Vee-Laser / X-Laser**
- Ataque exclusivo: `attack-vee-laser`
- Som principal: `attack.ogg` + fallback `attack.mp3`
- Frames: idle:10, eat:10, play:12, sleep:6, wake:8, clean:10, heal:10, evolve:14, attack-vee-laser:12
- Centro/chão: normalizado em canvas comum, com ajuste individual no `SPRITE_STAGE_LAYOUT`.
- Fundo: transparência validada nos quatro cantos.
- Repetição exata: nenhuma.
- Problemas restantes: nenhum bloqueador automático encontrado.

## Observações de implementação

- Os sprites originais foram preservados em `public/sprites/keyframes/` e usados como keyframes.
- Novos frames intermediários aplicam antecipação, deslocamento corporal, variação de cabeça/tronco, follow-through e recovery.
- Efeitos reutilizáveis foram separados em `public/fx/`.
- Os sons são sintetizados especificamente para o projeto; não são trechos extraídos de anime/jogos.
- O treino bloqueia spam durante a animação e aplica custo de energia + XP ao executar a habilidade.
