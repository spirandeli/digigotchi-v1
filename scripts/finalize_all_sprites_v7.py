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

def flood_fill_transparent(im, is_bg_func):
    im = im.convert("RGBA")
    w, h = im.size
    visited = set()
    queue = []
    for x in range(w):
        queue.append((x, 0))
        queue.append((x, h - 1))
    for y in range(h):
        queue.append((0, y))
        queue.append((w - 1, y))
    
    res = im.copy()
    for sx, sy in queue:
        if (sx, sy) not in visited and is_bg_func(im.getpixel((sx, sy))):
            visited.add((sx, sy))
            q = [(sx, sy)]
            while q:
                cx, cy = q.pop()
                res.putpixel((cx, cy), (0, 0, 0, 0))
                for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in visited:
                        if is_bg_func(im.getpixel((nx, ny))):
                            visited.add((nx, ny))
                            q.append((nx, ny))
    return res

def is_white_bg(p):
    return p[3] < 100 or (p[0] > 235 and p[1] > 235 and p[2] > 235)

def segment_horizontal_sprites(row_im, min_w=25, min_gap=15):
    w, h = row_im.size
    in_s = False
    start_x = 0
    res = []
    for x in range(w):
        col_has = any(row_im.getpixel((x, y))[3] > 40 for y in range(h))
        if col_has and not in_s:
            in_s = True
            start_x = x
        elif not col_has and in_s:
            in_s = False
            if x - start_x >= min_w:
                crop = row_im.crop((start_x, 0, x, h))
                b = crop.getbbox()
                if b: res.append(crop.crop(b))
    return res

# -------------------------------------------------------------
# 1. GABUMON - Clean pink warning artifact completely
# -------------------------------------------------------------
print("Cleaning Gabumon...")
for root, dirs, files in os.walk("public/sprites/gabumon"):
    for f in files:
        if f.endswith(".png"):
            p = os.path.join(root, f)
            im = Image.open(p).convert("RGBA")
            changed = False
            for y in range(im.height):
                for x in range(im.width):
                    pix = im.getpixel((x, y))
                    if pix[3] > 0 and pix[0] > 190 and pix[1] < 60 and pix[2] > 140:
                        im.putpixel((x, y), (0, 0, 0, 0))
                        changed = True
            if changed:
                im.save(p)

# -------------------------------------------------------------
# 2. AGUMON - Exact walk right from row 2
# -------------------------------------------------------------
print("Finalizing Agumon...")
im_agu = Image.open("public/sprites/agumon/_raw/aagumon.png").convert("RGBA")
# Movimentação direita: x: 780..1530, y: 190..265
row2_agu = flood_fill_transparent(im_agu.crop((780, 190, 1530, 265)), is_white_bg)
agu_walk_sprites = segment_horizontal_sprites(row2_agu, min_w=25)
print(f"Found {len(agu_walk_sprites)} Agumon walk right frames")

for i in [1, 2, 3]:
    idx = min(i - 1, len(agu_walk_sprites) - 1)
    sp = agu_walk_sprites[idx]
    canv_r = place_in_canvas(sp, baseline_y=90, max_h=80)
    canv_r.save(f"public/sprites/agumon/walk/right/walk_right_{i:02d}.png")
    canv_l = canv_r.transpose(Image.FLIP_LEFT_RIGHT)
    canv_l.save(f"public/sprites/agumon/walk/left/walk_left_{i:02d}.png")

# -------------------------------------------------------------
# 3. GARURUMON - Segment individual wolf running frames from row 3
# -------------------------------------------------------------
print("Finalizing Garurumon...")
im_gar = Image.open("public/sprites/garurumon/_raw/garurumon.png").convert("RGBA")
# Row 3 Corrida direita is at y: 180..270, x: 650..1240
row3_gar = flood_fill_transparent(im_gar.crop((650, 180, 1240, 270)), is_white_bg)
gar_run_sprites = segment_horizontal_sprites(row3_gar, min_w=35)
print(f"Found {len(gar_run_sprites)} Garurumon running frames")

for i in [1, 2, 3]:
    idx = min((i - 1) * 2, len(gar_run_sprites) - 1)
    sp = gar_run_sprites[idx]
    canv_r = place_in_canvas(sp, baseline_y=90, max_h=80, max_w=84)
    canv_r.save(f"public/sprites/garurumon/walk/right/walk_right_{i:02d}.png")
    canv_l = canv_r.transpose(Image.FLIP_LEFT_RIGHT)
    canv_l.save(f"public/sprites/garurumon/walk/left/walk_left_{i:02d}.png")

# -------------------------------------------------------------
# 4. WEREGARURUMON - Segment individual werewolf walk frames
# -------------------------------------------------------------
print("Finalizing WereGarurumon...")
im_were = Image.open("public/sprites/weregarurumon/_raw/weregarurumon.png").convert("RGBA")
# Row 2 Movimento direita is at y: 35..125, x: 740..1290
row2_were = flood_fill_transparent(im_were.crop((740, 35, 1290, 125)), is_white_bg)
were_walk_sprites = segment_horizontal_sprites(row2_were, min_w=25)
print(f"Found {len(were_walk_sprites)} WereGarurumon walk frames")

for i in [1, 2, 3]:
    idx = min((i - 1) * 2, len(were_walk_sprites) - 1)
    sp = were_walk_sprites[idx]
    canv_r = place_in_canvas(sp, baseline_y=90, max_h=82)
    canv_r.save(f"public/sprites/weregarurumon/walk/right/walk_right_{i:02d}.png")
    canv_l = canv_r.transpose(Image.FLIP_LEFT_RIGHT)
    canv_l.save(f"public/sprites/weregarurumon/walk/left/walk_left_{i:02d}.png")

# -------------------------------------------------------------
# 5. ETEMON - Scale up tall anime Etemon to Champion size (~82px)
# -------------------------------------------------------------
print("Finalizing Etemon scale...")
for action in ["walk/down", "walk/up", "walk/right", "walk/left"]:
    for i in [1, 2, 3]:
        p = f"public/sprites/etemon/{action}/walk_{action.split('/')[-1]}_{i:02d}.png"
        im = Image.open(p)
        b = im.getbbox()
        if b:
            cr = im.crop(b)
            # scale up by 1.35x to reach full Champion scale
            cw = int(cr.width * 1.35)
            ch = int(cr.height * 1.35)
            cr_up = cr.resize((cw, ch), Image.NEAREST)
            place_in_canvas(cr_up, baseline_y=90, max_h=82).save(p)

# -------------------------------------------------------------
# 6. FLAMEDRAMON - Refine dorsal view
# -------------------------------------------------------------
print("Finalizing Flamedramon dorsal...")
for i in [1, 2, 3]:
    im_up = Image.open(f"public/sprites/flamedramon/walk/down/walk_down_{i:02d}.png").convert("RGBA")
    b = im_up.getbbox()
    dorsal = im_up.crop(b)
    dw, dh = dorsal.size
    for y in range(dh):
        for x in range(dw):
            p = dorsal.getpixel((x, y))
            if p[3] > 100:
                # Top helmet area - replace frontal horn / eyes with back of dragon helmet
                if y <= 0.35 * dh and 0.40 * dw <= x <= 0.85 * dw:
                    if p[0] > 180 and p[1] > 180: # eye highlight / horn
                        dorsal.putpixel((x, y), (210, 40, 20, 255))
                    elif p[0] < 50 and p[1] < 50 and p[2] < 50: # eye outline
                        dorsal.putpixel((x, y), (140, 25, 15, 255))
                # Chest white emblem -> blue dragon scales
                if 0.35 * dh <= y <= 0.60 * dh and 0.35 * dw <= x <= 0.70 * dw:
                    if p[0] > 180 and p[1] > 180 and p[2] > 180:
                        dorsal.putpixel((x, y), (18, 95, 195, 255))
    place_in_canvas(dorsal, baseline_y=90, max_h=82).save(f"public/sprites/flamedramon/walk/up/walk_up_{i:02d}.png")

print("All refinements complete!")
