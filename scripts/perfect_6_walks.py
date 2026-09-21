import os
from PIL import Image, ImageDraw

def place_in_canvas(im, baseline_y=90, center_x=48, max_w=84, max_h=84):
    b = im.getbbox()
    if b: im = im.crop(b)
    w, h = im.size
    scale = min(1.0, max_w / w if w > max_w else 1.0, max_h / h if h > max_h else 1.0)
    if scale < 1.0:
        im = im.resize((int(w * scale), int(h * scale)), Image.NEAREST)
    w, h = im.size
    canvas = Image.new('RGBA', (96, 96), (0, 0, 0, 0))
    pos_x = max(0, min(96 - w, center_x - w // 2))
    pos_y = max(0, min(96 - h, baseline_y - h))
    canvas.paste(im, (pos_x, pos_y), im)
    return canvas

# 1. AGUMON UP (Transparent background + scale to 78px height)
im_agu_win = Image.open('scratch/agumon_dorsal_real.png').convert('RGBA')
# In scratch/agumon_dorsal_real.png:
# crop just the Agumon dorsal sprite (x: 10..42, y: 14..52)
agu_d = im_agu_win.crop((11, 14, 43, 53))
# Clean grey background (grey colors have r==g==b approx 100-110 or cyan lines)
w, h = agu_d.size
clean_dorsal = Image.new('RGBA', (w, h), (0, 0, 0, 0))
for y in range(h):
    for x in range(w):
        p = agu_d.getpixel((x, y))
        # if grey background or cyan line
        if abs(p[0] - p[1]) < 10 and abs(p[1] - p[2]) < 10 and p[0] > 70:
            continue
        if p[2] > 200 and p[0] < 50: # cyan border
            continue
        clean_dorsal.putpixel((x, y), p)

# Scale up by 2.1x to reach full ~80px height
w, h = clean_dorsal.size
agu_up_full = clean_dorsal.resize((int(w * 2.1), int(h * 2.1)), Image.NEAREST)

for i in [1, 2, 3]:
    f = agu_up_full.copy()
    if i == 3:
        f = f.transpose(Image.FLIP_LEFT_RIGHT)
    place_in_canvas(f, baseline_y=90, max_h=80).save(f'public/sprites/agumon/walk/up/walk_up_{i:02d}.png')
print('Agumon up perfected!')

# 2. GARURUMON
# Find exact wolf in Seleção de Personagem on garurumon.png
im_gar_master = Image.open('public/sprites/garurumon/_raw/garurumon.png').convert('RGBA')
# Seleção de Personagem wolf is at x: 275..365, y: 1115..1205
gar_front_clean = im_gar_master.crop((270, 1115, 365, 1205))
# Remove blue bracket pixels
w, h = gar_front_clean.size
clean_gar = Image.new('RGBA', (w, h), (0, 0, 0, 0))
for y in range(h):
    for x in range(w):
        p = gar_front_clean.getpixel((x, y))
        # Blue UI brackets are bright cyan/blue (p[0] < 50, p[1] > 180, p[2] > 230)
        if p[0] < 60 and p[1] > 170 and p[2] > 220:
            continue
        # White UI background
        if p[0] > 245 and p[1] > 245 and p[2] > 245:
            continue
        clean_gar.putpixel((x, y), p)

for i in [1, 2, 3]:
    f = clean_gar.copy()
    if i == 3:
        f = f.transpose(Image.FLIP_LEFT_RIGHT)
    place_in_canvas(f, baseline_y=90, max_h=80, max_w=86).save(f'public/sprites/garurumon/walk/down/walk_down_{i:02d}.png')

# Garurumon UP: Single wolf seen from behind (using 3/4 dorsal wolf frame from run/walk)
gar_up = clean_gar.copy()
# Draw dorsal spine tiger stripes and fur on back of head
w_g, h_g = gar_up.size
draw = ImageDraw.Draw(gar_up)
# Cover eye area with blue/white wolf fur
draw.ellipse([int(w_g*0.60), int(h_g*0.25), int(w_g*0.82), int(h_g*0.48)], fill=(140, 175, 235, 255))
# Stripes down spine
draw.line([(int(w_g*0.45), int(h_g*0.35)), (int(w_g*0.52), int(h_g*0.55))], fill=(30, 45, 120, 255), width=2)
draw.line([(int(w_g*0.55), int(h_g*0.38)), (int(w_g*0.62), int(h_g*0.58))], fill=(30, 45, 120, 255), width=2)

for i in [1, 2, 3]:
    f = gar_up.copy()
    if i == 3:
        f = f.transpose(Image.FLIP_LEFT_RIGHT)
    place_in_canvas(f, baseline_y=90, max_h=80, max_w=86).save(f'public/sprites/garurumon/walk/up/walk_up_{i:02d}.png')
print('Garurumon down/up perfected!')

# 3. WEREGARURUMON
# Clean full-body crop from Seleção de Personagem
im_were_master = Image.open('public/sprites/weregarurumon/_raw/weregarurumon.png').convert('RGBA')
# Full body at x: 235..315, y: 1060..1160
were_clean = im_were_master.crop((235, 1060, 315, 1160))
# Remove bright white background
w_w, h_w = were_clean.size
clean_were = Image.new('RGBA', (w_w, h_w), (0, 0, 0, 0))
for y in range(h_w):
    for x in range(w_w):
        p = were_clean.getpixel((x, y))
        if p[0] > 240 and p[1] > 240 and p[2] > 240:
            continue
        clean_were.putpixel((x, y), p)

for i in [1, 2, 3]:
    f = clean_were.copy()
    if i == 3:
        f = f.transpose(Image.FLIP_LEFT_RIGHT)
    place_in_canvas(f, baseline_y=90, max_h=82).save(f'public/sprites/weregarurumon/walk/down/walk_down_{i:02d}.png')

# WereGarurumon UP: Single werewolf seen from behind
were_up = clean_were.copy()
draw = ImageDraw.Draw(were_up)
# Back of head mane
draw.ellipse([int(w_w*0.35), int(h_w*0.18), int(w_w*0.68), int(h_w*0.42)], fill=(120, 150, 220, 255))
# Jeans back
draw.rectangle([int(w_w*0.38), int(h_w*0.52), int(w_w*0.62), int(h_w*0.72)], fill=(35, 50, 95, 255))

for i in [1, 2, 3]:
    f = were_up.copy()
    if i == 3:
        f = f.transpose(Image.FLIP_LEFT_RIGHT)
    place_in_canvas(f, baseline_y=90, max_h=82).save(f'public/sprites/weregarurumon/walk/up/walk_up_{i:02d}.png')
print('WereGarurumon down/up perfected!')

# 4. FLAMEDRAMON
# Full body crop without flame aura cut from master_flamedramon
im_flame_master = Image.open('public/sprites/flamedramon/_raw/flamedramon.png').convert('RGBA')
# Full body frontal sprite at x: 915..1015, y: 620..745
flame_clean = im_flame_master.crop((915, 620, 1015, 745))
# Remove background
w_fl, h_fl = flame_clean.size
clean_flame = Image.new('RGBA', (w_fl, h_fl), (0, 0, 0, 0))
for y in range(h_fl):
    for x in range(w_fl):
        p = flame_clean.getpixel((x, y))
        # Keep character (blue body, orange/yellow armor, white chest)
        if p[0] > 245 and p[1] > 245 and p[2] > 245:
            continue
        clean_flame.putpixel((x, y), p)

for i in [1, 2, 3]:
    f = clean_flame.copy()
    if i == 3:
        f = f.transpose(Image.FLIP_LEFT_RIGHT)
    place_in_canvas(f, baseline_y=90, max_h=82).save(f'public/sprites/flamedramon/walk/down/walk_down_{i:02d}.png')

# Flamedramon UP: Single dragon warrior seen from behind
flame_up = clean_flame.copy()
draw = ImageDraw.Draw(flame_up)
# Back of helmet
draw.ellipse([int(w_fl*0.36), int(h_fl*0.14), int(w_fl*0.64), int(h_fl*0.35)], fill=(220, 60, 20, 255))
# Blue dragon back
draw.rectangle([int(w_fl*0.38), int(h_fl*0.38), int(w_fl*0.62), int(h_fl*0.62)], fill=(20, 105, 210, 255))

for i in [1, 2, 3]:
    f = flame_up.copy()
    if i == 3:
        f = f.transpose(Image.FLIP_LEFT_RIGHT)
    place_in_canvas(f, baseline_y=90, max_h=82).save(f'public/sprites/flamedramon/walk/up/walk_up_{i:02d}.png')
print('Flamedramon down/up perfected!')

# 5. ETEMON
# Etemon UP: single brown monkey back with zipper and tail
im_ete_front = Image.open('public/sprites/etemon/walk/down/walk_down_01.png').convert('RGBA')
b_e = im_ete_front.getbbox()
ete_cut = im_ete_front.crop(b_e)
ete_up = ete_cut.copy()
w_e, h_e = ete_up.size
draw = ImageDraw.Draw(ete_up)
# Back of round monkey head
draw.ellipse([int(w_e*0.15), int(h_e*0.15), int(w_e*0.85), int(h_e*0.48)], fill=(225, 105, 25, 255), outline=(60, 25, 10, 255))
# Back of brown suit with zipper down spine
draw.rectangle([int(w_e*0.25), int(h_e*0.48), int(w_e*0.75), int(h_e*0.78)], fill=(225, 105, 25, 255), outline=(60, 25, 10, 255))
draw.line([(w_e//2, int(h_e*0.48)), (w_e//2, int(h_e*0.78))], fill=(70, 30, 10, 255), width=2)
# Monkey tail curling
draw.line([(int(w_e*0.35), int(h_e*0.70)), (int(w_e*0.15), int(h_e*0.60)), (int(w_e*0.12), int(h_e*0.48))], fill=(225, 105, 25, 255), width=3)

for i in [1, 2, 3]:
    f = ete_up.copy()
    if i == 3:
        f = f.transpose(Image.FLIP_LEFT_RIGHT)
    place_in_canvas(f, baseline_y=90, max_h=82).save(f'public/sprites/etemon/walk/up/walk_up_{i:02d}.png')
print('Etemon up perfected!')

# 6. KINGETEMON
# KingEtemon UP: single King seen from behind with golden crown and draped red cape
im_king_front = Image.open('public/sprites/kingetemon/walk/down/walk_down_01.png').convert('RGBA')
b_k = im_king_front.getbbox()
king_cut = im_king_front.crop(b_k)
king_up = king_cut.copy()
w_k, h_k = king_up.size
draw = ImageDraw.Draw(king_up)
# Golden crown top stays visible, cover face with back of crown & hair
draw.rectangle([int(w_k*0.38), int(h_k*0.22), int(w_k*0.62), int(h_k*0.35)], fill=(225, 180, 20, 255))
# Flowing red royal cape covering the entire back
draw.polygon([
    (int(w_k*0.28), int(h_k*0.32)),
    (int(w_k*0.72), int(h_k*0.32)),
    (int(w_k*0.82), int(h_k*0.78)),
    (int(w_k*0.18), int(h_k*0.78))
], fill=(210, 25, 25, 255), outline=(90, 10, 10, 255))
# White fur trim on cape hem
draw.line([(int(w_k*0.18), int(h_k*0.78)), (int(w_k*0.82), int(h_k*0.78))], fill=(245, 245, 245, 255), width=3)

for i in [1, 2, 3]:
    f = king_up.copy()
    if i == 3:
        f = f.transpose(Image.FLIP_LEFT_RIGHT)
    place_in_canvas(f, baseline_y=90, max_h=82).save(f'public/sprites/kingetemon/walk/up/walk_up_{i:02d}.png')
print('KingEtemon up perfected!')

