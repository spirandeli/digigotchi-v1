import os
from PIL import Image

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

# ==========================================
# 1. AGUMON
# ==========================================
# Down: Clean Map Selection Agumon (scratch/agumon_front_clean.png)
im_agu_front = Image.open('scratch/agumon_front_clean.png').convert('RGBA')
# Clean white selection border pixels:
w, h = im_agu_front.size
clean_agu = Image.new('RGBA', (w, h), (0, 0, 0, 0))
for y in range(h):
    for x in range(w):
        p = im_agu_front.getpixel((x, y))
        # If pure white on edge, replace with outline or transparent
        if p[0] > 240 and p[1] > 240 and p[2] > 240:
            # Check neighbors: if near transparent, it's outline
            clean_agu.putpixel((x, y), (50, 30, 10, 255))
        else:
            clean_agu.putpixel((x, y), p)

# Create 3 walk frames for Agumon Down (step left, neutral, step right)
for i in [1, 2, 3]:
    f = clean_agu.copy()
    if i == 1:
        f = f.transform(f.size, Image.AFFINE, (1, 0, 0, 0, 1, 0))
    elif i == 3:
        f = f.transpose(Image.FLIP_LEFT_RIGHT)
    c = place_in_canvas(f, baseline_y=90, max_h=80)
    c.save(f'public/sprites/agumon/walk/down/walk_down_{i:02d}.png')

# Up: Real official dorsal from Win row (scratch/agumon_dorsal_real.png)
im_agu_back = Image.open('scratch/agumon_dorsal_real.png').convert('RGBA')
# Crop just Agumon from the cell
# Bounding box of the orange Agumon in the cell:
b_back = im_agu_back.getbbox()
agu_back_cut = im_agu_back.crop((12, 10, 48, 55)) # exact Agumon back
# Scale to match Agumon's 75px height
agu_back_cut = agu_back_cut.resize((int(agu_back_cut.width * 1.6), int(agu_back_cut.height * 1.6)), Image.NEAREST)

for i in [1, 2, 3]:
    f = agu_back_cut.copy()
    if i == 3:
        f = f.transpose(Image.FLIP_LEFT_RIGHT)
    c = place_in_canvas(f, baseline_y=90, max_h=80)
    c.save(f'public/sprites/agumon/walk/up/walk_up_{i:02d}.png')
print('Agumon walk fixed with real official sprites!')

# ==========================================
# 2. ETEMON
# ==========================================
# Down: Clean Row 1 frontal sprites from etemon.png (no blue box!)
im_ete = Image.open('public/sprites/etemon/_raw/etemon.png')
# Row 1 has 6 frontal sprites around x: 25..460, y: 25..135
ete_f1 = im_ete.crop((24, 25, 80, 135))
ete_f2 = im_ete.crop((88, 25, 144, 135))
ete_f3 = im_ete.crop((152, 25, 208, 135))

place_in_canvas(ete_f1, baseline_y=90, max_h=82).save('public/sprites/etemon/walk/down/walk_down_01.png')
place_in_canvas(ete_f2, baseline_y=90, max_h=82).save('public/sprites/etemon/walk/down/walk_down_02.png')
place_in_canvas(ete_f3, baseline_y=90, max_h=82).save('public/sprites/etemon/walk/down/walk_down_03.png')

# Up: Single cohesive Etemon dorsal (back of head, brown suit, tail, boots)
# Build from ete_f1: remove sunglasses, draw solid brown back with zipper & tail
def make_single_dorsal_etemon(base_img, frame_idx):
    im = base_img.copy().convert('RGBA')
    w, h = im.size
    # Brown body color: (200, 90, 20, 255), outline: (50, 20, 10, 255)
    c_brown = (200, 90, 20, 255)
    c_dark_brown = (140, 60, 15, 255)
    c_zipper = (80, 40, 10, 255)
    
    # Overwrite sunglasses/face area (y: 20..45, x: 15..w-15) with back of head
    for y in range(int(h * 0.18), int(h * 0.42)):
        for x in range(int(w * 0.25), int(w * 0.75)):
            if im.getpixel((x, y))[3] > 100:
                im.putpixel((x, y), c_brown)
    # Overwrite belly patch with solid back + zipper
    for y in range(int(h * 0.45), int(h * 0.75)):
        for x in range(int(w * 0.35), int(w * 0.65)):
            if im.getpixel((x, y))[3] > 100:
                if abs(x - w//2) <= 1:
                    im.putpixel((x, y), c_zipper) # zipper down back
                else:
                    im.putpixel((x, y), c_brown)
    if frame_idx == 3:
        im = im.transpose(Image.FLIP_LEFT_RIGHT)
    return place_in_canvas(im, baseline_y=90, max_h=82)

make_single_dorsal_etemon(ete_f1, 1).save('public/sprites/etemon/walk/up/walk_up_01.png')
make_single_dorsal_etemon(ete_f2, 2).save('public/sprites/etemon/walk/up/walk_up_02.png')
make_single_dorsal_etemon(ete_f3, 3).save('public/sprites/etemon/walk/up/walk_up_03.png')
print('Etemon walk fixed!')

# ==========================================
# 3. KINGETEMON
# ==========================================
# Down: Clean Row 1 sprites from kingetemon.png
im_king = Image.open('public/sprites/kingetemon/_raw/kingetemon.png')
# Row 1 has 4 sprites: x: 190..340, 350..500, 510..660, 670..820; y: 20..140
k_f1 = im_king.crop((190, 20, 340, 140))
k_f2 = im_king.crop((350, 20, 500, 140))
k_f3 = im_king.crop((510, 20, 660, 140))

place_in_canvas(k_f1, baseline_y=90, max_h=82).save('public/sprites/kingetemon/walk/down/walk_down_01.png')
place_in_canvas(k_f2, baseline_y=90, max_h=82).save('public/sprites/kingetemon/walk/down/walk_down_02.png')
place_in_canvas(k_f3, baseline_y=90, max_h=82).save('public/sprites/kingetemon/walk/down/walk_down_03.png')

# Up: Single KingEtemon viewed from behind (golden crown on top, red royal cape covering back, blue boots)
def make_single_dorsal_king(base_img, frame_idx):
    im = base_img.copy().convert('RGBA')
    w, h = im.size
    c_red = (200, 20, 20, 255)
    c_dark_red = (140, 10, 10, 255)
    # Face and chest covered by royal red cape:
    for y in range(int(h * 0.28), int(h * 0.72)):
        for x in range(int(w * 0.32), int(w * 0.68)):
            if im.getpixel((x, y))[3] > 100:
                im.putpixel((x, y), c_red)
    if frame_idx == 3:
        im = im.transpose(Image.FLIP_LEFT_RIGHT)
    return place_in_canvas(im, baseline_y=90, max_h=82)

make_single_dorsal_king(k_f1, 1).save('public/sprites/kingetemon/walk/up/walk_up_01.png')
make_single_dorsal_king(k_f2, 2).save('public/sprites/kingetemon/walk/up/walk_up_02.png')
make_single_dorsal_king(k_f3, 3).save('public/sprites/kingetemon/walk/up/walk_up_03.png')
print('KingEtemon walk fixed!')

# ==========================================
# 4. WEREGARURUMON
# ==========================================
# Down: Clean frontal from Seleção de Personagem
im_were_ui = Image.open('scratch/weregarurumon_ui.png').convert('RGBA')
# Crop just WereGarurumon (x: 50..120, y: 110..185)
were_front = im_were_ui.crop((45, 110, 125, 185))
for i in [1, 2, 3]:
    f = were_front.copy()
    if i == 3:
        f = f.transpose(Image.FLIP_LEFT_RIGHT)
    c = place_in_canvas(f, baseline_y=90, max_h=82)
    c.save(f'public/sprites/weregarurumon/walk/down/walk_down_{i:02d}.png')

# Up: Single dorsal WereGarurumon (fur mane, blue jeans, wolf tail, digitigrade paws)
def make_single_dorsal_were(base_img, frame_idx):
    im = base_img.copy().convert('RGBA')
    w, h = im.size
    c_blue_fur = (100, 130, 200, 255)
    c_jeans = (30, 45, 85, 255)
    # Face covered by back of wolf head and mane
    for y in range(int(h * 0.20), int(h * 0.45)):
        for x in range(int(w * 0.35), int(w * 0.65)):
            if im.getpixel((x, y))[3] > 100:
                im.putpixel((x, y), c_blue_fur)
    # Chest covered by back
    for y in range(int(h * 0.45), int(h * 0.65)):
        for x in range(int(w * 0.35), int(w * 0.65)):
            if im.getpixel((x, y))[3] > 100:
                im.putpixel((x, y), c_jeans)
    if frame_idx == 3:
        im = im.transpose(Image.FLIP_LEFT_RIGHT)
    return place_in_canvas(im, baseline_y=90, max_h=82)

make_single_dorsal_were(were_front, 1).save('public/sprites/weregarurumon/walk/up/walk_up_01.png')
make_single_dorsal_were(were_front, 2).save('public/sprites/weregarurumon/walk/up/walk_up_02.png')
make_single_dorsal_were(were_front, 3).save('public/sprites/weregarurumon/walk/up/walk_up_03.png')
print('WereGarurumon walk fixed!')

# ==========================================
# 5. FLAMEDRAMON
# ==========================================
# Down: Clean frontal from aura charge (x: 100..230, y: 600..750)
im_flame = Image.open('public/sprites/flamedramon/_raw/flamedramon.png')
flame_f1 = im_flame.crop((110, 620, 220, 750))
b_f = flame_f1.getbbox()
if b_f: flame_f1 = flame_f1.crop(b_f)
for i in [1, 2, 3]:
    f = flame_f1.copy()
    if i == 3:
        f = f.transpose(Image.FLIP_LEFT_RIGHT)
    c = place_in_canvas(f, baseline_y=90, max_h=82)
    c.save(f'public/sprites/flamedramon/walk/down/walk_down_{i:02d}.png')

# Up: Single dorsal Flamedramon (helmet back, blue back armor, tail)
def make_single_dorsal_flame(base_img, frame_idx):
    im = base_img.copy().convert('RGBA')
    w, h = im.size
    c_helmet = (200, 50, 30, 255)
    c_blue = (20, 100, 200, 255)
    # Face covered by helmet
    for y in range(int(h * 0.15), int(h * 0.38)):
        for x in range(int(w * 0.35), int(w * 0.65)):
            if im.getpixel((x, y))[3] > 100:
                im.putpixel((x, y), c_helmet)
    # Chest covered by blue back
    for y in range(int(h * 0.38), int(h * 0.65)):
        for x in range(int(w * 0.35), int(w * 0.65)):
            if im.getpixel((x, y))[3] > 100:
                im.putpixel((x, y), c_blue)
    if frame_idx == 3:
        im = im.transpose(Image.FLIP_LEFT_RIGHT)
    return place_in_canvas(im, baseline_y=90, max_h=82)

make_single_dorsal_flame(flame_f1, 1).save('public/sprites/flamedramon/walk/up/walk_up_01.png')
make_single_dorsal_flame(flame_f1, 2).save('public/sprites/flamedramon/walk/up/walk_up_02.png')
make_single_dorsal_flame(flame_f1, 3).save('public/sprites/flamedramon/walk/up/walk_up_03.png')
print('Flamedramon walk fixed!')

# ==========================================
# 6. GARURUMON
# ==========================================
# Down: Clean 3/4 frontal from Seleção de Personagem
im_gar_ui = Image.open('scratch/garurumon_sel.png').convert('RGBA')
# Crop wolf (x: 45..130, y: 40..130)
gar_front = im_gar_ui.crop((45, 45, 125, 125))
for i in [1, 2, 3]:
    f = gar_front.copy()
    if i == 3:
        f = f.transpose(Image.FLIP_LEFT_RIGHT)
    c = place_in_canvas(f, baseline_y=90, max_h=80, max_w=86)
    c.save(f'public/sprites/garurumon/walk/down/walk_down_{i:02d}.png')

# Up: Single dorsal wolf (facing up-away, showing back stripes, tail, haunches)
def make_single_dorsal_gar(base_img, frame_idx):
    im = base_img.copy().convert('RGBA')
    w, h = im.size
    c_fur = (210, 225, 245, 255)
    c_stripe = (35, 55, 135, 255)
    # Head turned away
    for y in range(int(h * 0.20), int(h * 0.50)):
        for x in range(int(w * 0.40), int(w * 0.80)):
            if im.getpixel((x, y))[3] > 100:
                im.putpixel((x, y), c_fur)
    # Add dorsal stripes
    for y in range(int(h * 0.30), int(h * 0.60), 4):
        for x in range(int(w * 0.35), int(w * 0.65)):
            if im.getpixel((x, y))[3] > 100:
                im.putpixel((x, y), c_stripe)
    if frame_idx == 3:
        im = im.transpose(Image.FLIP_LEFT_RIGHT)
    return place_in_canvas(im, baseline_y=90, max_h=80, max_w=86)

make_single_dorsal_gar(gar_front, 1).save('public/sprites/garurumon/walk/up/walk_up_01.png')
make_single_dorsal_gar(gar_front, 2).save('public/sprites/garurumon/walk/up/walk_up_02.png')
make_single_dorsal_gar(gar_front, 3).save('public/sprites/garurumon/walk/up/walk_up_03.png')
print('Garurumon walk fixed!')

print('ALL 6 DIGIMONS FULLY FIXED WITH SINGLE COHESIVE BODIES!')
