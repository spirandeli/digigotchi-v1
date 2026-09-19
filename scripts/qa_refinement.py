from pathlib import Path
from PIL import Image
import hashlib

ROOT=Path(__file__).resolve().parents[1]
SPR=ROOT/'public'/'sprites'/'animated'
AUD=ROOT/'public'/'audio'/'digimon'

EXPECTED={'idle':10,'eat':10,'play':12,'sleep':6,'wake':8,'clean':10,'heal':10,'evolve':14}
ATTACKS={
'agumon':'attack-pepper-breath','geogreymon':'attack-mega-flame','wargreymon':'attack-terra-force',
'etemon':'attack-love-serenade','metaletemon':'attack-banana-slip','gabumon':'attack-blue-blaster',
'garurumon':'attack-howling-blaster','weregarurumon':'attack-wolf-claw','veemon':'attack-vee-headbutt',
'flamedramon':'attack-fire-rocket','xvmon':'attack-vee-laser'}
SCALES={'agumon':0.90,'geogreymon':0.96,'wargreymon':1.07,'etemon':0.92,'metaletemon':1.04,'gabumon':0.90,'garurumon':0.93,'weregarurumon':1.01,'veemon':0.90,'flamedramon':0.96,'xvmon':0.98}
SKILLS={'agumon':'Pepper Breath / Baby Flame','geogreymon':'Mega Flame','wargreymon':'Terra Force / Gaia Force','etemon':'Love Serenade / Concert Crush','metaletemon':'Banana Slip','gabumon':'Blue Blaster / Petit Fire','garurumon':'Howling Blaster / Fox Fire','weregarurumon':'Wolf Claw / Kaiser Nail','veemon':'Vee Headbutt','flamedramon':'Fire Rocket','xvmon':'Vee-Laser / X-Laser'}
ACTIONS_AUDIO=['idle','feed','play','sleep','wake','clean','heal','attack','evolve']

rows=[]
all_ok=True
for species,attack in ATTACKS.items():
    errors=[]
    counts=[]
    for action,count in {**EXPECTED,attack:12}.items():
        folder=SPR/species/action
        files=sorted(folder.glob('*.png')) if folder.exists() else []
        counts.append(f'{action}:{len(files)}')
        if len(files)!=count:
            errors.append(f'{action} esperado {count}, encontrado {len(files)}')
        hashes=[]
        for f in files:
            im=Image.open(f).convert('RGBA')
            if im.size!=(96,96): errors.append(f'{action}/{f.name} tamanho {im.size}')
            hashes.append(hashlib.sha1(im.tobytes()).hexdigest())
            # Background/corners must remain transparent. Effects may reach sides but never corners.
            for xy in [(0,0),(95,0),(0,95),(95,95)]:
                if im.getpixel(xy)[3] != 0:
                    errors.append(f'{action}/{f.name} canto nao transparente')
                    break
        if len(hashes)!=len(set(hashes)):
            errors.append(f'{action} possui frame exatamente duplicado')
    for action in ACTIONS_AUDIO:
        if not (AUD/species/f'{action}.ogg').exists(): errors.append(f'audio {action}.ogg ausente')
        if not (AUD/species/f'{action}.mp3').exists(): errors.append(f'audio {action}.mp3 ausente')
    ok=not errors
    all_ok &= ok
    rows.append((species,ok,errors,counts))

report=['# QA — Refinamento de sprites, áudio e habilidades','',
'Validação automática da rodada baseada no plano de refinamento.','',
'## Resumo','',
f'- Status geral: **{"PASS" if all_ok else "REVISAR"}**',
'- Canvas dos frames: `96x96` com transparência.',
'- Frames exatamente duplicados: bloqueados pelo QA.',
'- Áudio: `.ogg` com fallback `.mp3` para cada ação.',
'- Ataques: 12 frames por forma.',
'- Multiplicador de XP de QA: `x3`.',
'',
'## Digimon por Digimon','']
for species,ok,errors,counts in rows:
    report += [f'### {species}',
               f'- QA: **{"PASS" if ok else "REVISAR"}**',
               f'- Escala na tela: `{SCALES[species]:.2f}`',
               f'- Habilidade: **{SKILLS[species]}**',
               f'- Ataque exclusivo: `{ATTACKS[species]}`',
               '- Som principal: `attack.ogg` + fallback `attack.mp3`',
               '- Frames: ' + ', '.join(counts),
               '- Centro/chão: normalizado em canvas comum, com ajuste individual no `SPRITE_STAGE_LAYOUT`.',
               '- Fundo: transparência validada nos quatro cantos.',
               '- Repetição exata: ' + ('nenhuma.' if not any('duplicado' in e for e in errors) else 'há repetição.'),
               '- Problemas restantes: ' + ('nenhum bloqueador automático encontrado.' if ok else '; '.join(errors)),
               '']
report += ['## Observações de implementação','',
'- Os sprites originais foram preservados em `public/sprites/keyframes/` e usados como keyframes.',
'- Novos frames intermediários aplicam antecipação, deslocamento corporal, variação de cabeça/tronco, follow-through e recovery.',
'- Efeitos reutilizáveis foram separados em `public/fx/`.',
'- Os sons são sintetizados especificamente para o projeto; não são trechos extraídos de anime/jogos.',
'- O treino bloqueia spam durante a animação e aplica custo de energia + XP ao executar a habilidade.',
'']
(ROOT/'docs'/'planos-e-reviews'/'QA_REFINAMENTO.md').write_text('\n'.join(report),encoding='utf-8')
print('PASS' if all_ok else 'REVISAR')
for species,ok,errors,_ in rows:
    print(species, 'PASS' if ok else 'FAIL', '; '.join(errors[:3]))
raise SystemExit(0 if all_ok else 1)
