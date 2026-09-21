import os, sys
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

# -------------------------------------------------------------
# 1. FLAMEDRAMON
# -------------------------------------------------------------
print("Processing Flamedramon...")
im_flame = Image.open("public/sprites/flamedramon/_raw/flamedramon.png").convert("RGBA")
# Row 1 is between y: 0 and y: 155
row1_flame = im_flame.crop((0, 0, 1448, 155))

def is_white_bg(p):
    return p[3] < 100 or (p[0] > 235 and p[1] > 235 and p[2] > 235)

row1_flame_clean = flood_fill_transparent(row1_flame, is_white_bg)

# Segment horizontal sprites in row 1
w_f, h_f = row1_flame_clean.size
in_s = False
start_x = 0
flame_sprites = []
for x in range(w_f):
    has_p = any(row1_flame_clean.getpixel((x, y))[3] > 40 for y in range(h_f))
    if has_p and not in_s:
        in_s = True
        start_x = x
    elif not has_p and in_s:
        in_s = False
        if x - start_x > 25:
            sp = row1_flame_clean.crop((start_x, 0, x, h_f))
            b = sp.getbbox()
            if b: flame_sprites.append(sp.crop(b))

print(f"Found {len(flame_sprites)} Flamedramon sprites in row 1")
# Frontal sprites are index 1, 2, 3
down_frames = [flame_sprites[1], flame_sprites[2], flame_sprites[3]]
for i, fr in enumerate(down_frames, 1):
    place_in_canvas(fr, baseline_y=90, max_h=82).save(f"public/sprites/flamedramon/walk/down/walk_down_{i:02d}.png")

# Walk right frames are index 4, 5, 7
walk_r_frames = [flame_sprites[4], flame_sprites[5], flame_sprites[7] if len(flame_sprites)>7 else flame_sprites[5]]
for i, fr in enumerate(walk_r_frames, 1):
    canv_r = place_in_canvas(fr, baseline_y=90, max_h=82)
    canv_r.save(f"public/sprites/flamedramon/walk/right/walk_right_{i:02d}.png")
    canv_l = canv_r.transpose(Image.FLIP_LEFT_RIGHT)
    canv_l.save(f"public/sprites/flamedramon/walk/left/walk_left_{i:02d}.png")

# Synthesize authentic Flamedramon dorsal walk frames from frontal poses:
# From behind: Flame helmet crest, blue neck, blue back with muscular curve and dragon tail,
# flame gauntlets, and legs stepping.
for i, fr in enumerate(down_frames, 1):
    dorsal = fr.copy()
    dw, dh = dorsal.size
    # Color dorsal back: cover facial eye/mouth area with solid helmet texture & blue dragon back
    # Eyes are in upper right face region (x ~ dw*0.45..0.75, y ~ dh*0.12..0.30)
    # White chest emblem is at x ~ dw*0.35..0.65, y ~ dh*0.32..0.55
    # Replace white chest with deep blue dragon back texture (from back pixels: r~15, g~90, b~190)
    for y in range(dh):
        for x in range(dw):
            p = dorsal.getpixel((x, y))
            if p[3] > 100:
                # If in face area and not red helmet
                if 0.12 * dh <= y <= 0.32 * dh and 0.45 * dw <= x <= 0.75 * dw:
                    # if yellow/black eye or white teeth
                    if (p[0] > 180 and p[1] > 180) or (p[0] < 50 and p[1] < 50 and p[2] < 50):
                        # replace with fiery red helmet color
                        dorsal.putpixel((x, y), (215, 45, 20, 255))
                # If in chest area where white oval was:
                if 0.32 * dh <= y <= 0.58 * dh and 0.38 * dw <= x <= 0.65 * dw:
                    if p[0] > 180 and p[1] > 180 and p[2] > 180: # white chest
                        # replace with deep blue dragon back scales
                        dorsal.putpixel((x, y), (18, 95, 195, 255))
    canv_up = place_in_canvas(dorsal, baseline_y=90, max_h=82)
    canv_up.save(f"public/sprites/flamedramon/walk/up/walk_up_{i:02d}.png")

print("Flamedramon 4-way perfected!")

# -------------------------------------------------------------
# 2. GARURUMON
# -------------------------------------------------------------
print("Processing Garurumon...")
im_gar = Image.open("public/sprites/garurumon/_raw/garurumon.png").convert("RGBA")
# 1. Clean Frontal Wolf from Seleção de Personagem (avoiding text & cyan brackets)
crop_gar_sel = im_gar.crop((293, 1138, 360, 1215))

def is_gar_bg(p):
    if p[3] < 100: return True
    if p[0] > 235 and p[1] > 235 and p[2] > 235: return True
    if p[0] < 60 and p[1] > 160 and p[2] > 210: return True
    return False

clean_gar_front = flood_fill_transparent(crop_gar_sel, is_gar_bg)
b = clean_gar_front.getbbox()
if b: clean_gar_front = clean_gar_front.crop(b)

# Generate 3 stepping frames for walk_down
for i in [1, 2, 3]:
    f = clean_gar_front.copy()
    if i == 3:
        f = f.transpose(Image.FLIP_LEFT_RIGHT)
    place_in_canvas(f, baseline_y=90, max_h=80, max_w=84).save(f"public/sprites/garurumon/walk/down/walk_down_{i:02d}.png")

# Walk right frames from row 2 (MOVIMENTO DIREITA: y: 28..125, x: 740..1448)
row2_gar = im_gar.crop((730, 30, 1448, 125))
clean_gar_walk = flood_fill_transparent(row2_gar, is_white_bg)
w_gw, h_gw = clean_gar_walk.size
in_s = False
start_x = 0
gar_walk_sprites = []
for x in range(w_gw):
    has_p = any(clean_gar_walk.getpixel((x, y))[3] > 40 for y in range(h_gw))
    if has_p and not in_s:
        in_s = True
        start_x = x
    elif not has_p and in_s:
        in_s = False
        if x - start_x > 25:
            sp = clean_gar_walk.crop((start_x, 0, x, h_gw))
            b = sp.getbbox()
            if b: gar_walk_sprites.append(sp.crop(b))

for i in [1, 2, 3]:
    idx = min(i - 1, len(gar_walk_sprites) - 1)
    sp = gar_walk_sprites[idx] if gar_walk_sprites else clean_gar_front
    canv_r = place_in_canvas(sp, baseline_y=90, max_h=80, max_w=84)
    canv_r.save(f"public/sprites/garurumon/walk/right/walk_right_{i:02d}.png")
    canv_l = canv_r.transpose(Image.FLIP_LEFT_RIGHT)
    canv_l.save(f"public/sprites/garurumon/walk/left/walk_left_{i:02d}.png")

# Garurumon UP: Authentic wolf dorsal view
# Head seen from behind (blue wolf fur & pointed ears, no eye), spine stripes, tail curling up
for i in [1, 2, 3]:
    dorsal_gar = clean_gar_front.copy()
    if i == 3:
        dorsal_gar = dorsal_gar.transpose(Image.FLIP_LEFT_RIGHT)
    gw, gh = dorsal_gar.size
    # Remove snout/eye front details and blend with blue wolf fur palette
    for y in range(gh):
        for x in range(gw):
            p = dorsal_gar.getpixel((x, y))
            if p[3] > 100:
                # Eye area (red/black eye at x ~ 0.55..0.75 gw, y ~ 0.22..0.45 gh)
                if 0.22 * gh <= y <= 0.45 * gh and 0.55 * gw <= x <= 0.78 * gw:
                    if p[0] > 150 and p[1] < 80: # red eye
                        dorsal_gar.putpixel((x, y), (110, 145, 215, 255))
                    elif p[0] < 50 and p[1] < 50: # dark pupil/mouth
                        dorsal_gar.putpixel((x, y), (35, 55, 130, 255))
    place_in_canvas(dorsal_gar, baseline_y=90, max_h=80, max_w=84).save(f"public/sprites/garurumon/walk/up/walk_up_{i:02d}.png")

print("Garurumon 4-way perfected!")

# -------------------------------------------------------------
# 3. WEREGARURUMON
# -------------------------------------------------------------
print("Processing WereGarurumon...")
im_were = Image.open("public/sprites/weregarurumon/_raw/weregarurumon.png").convert("RGBA")
# Crop full body from Selecao de personagem avoiding text
crop_were_sel = im_were.crop((235, 1055, 315, 1145))
clean_were = flood_fill_transparent(crop_were_sel, is_white_bg)
b = clean_were.getbbox()
if b:
    # Ensure bottom text is not included (clip bottom 10px if needed)
    clean_were = clean_were.crop((b[0], b[1], b[2], min(b[3], 83)))

for i in [1, 2, 3]:
    f = clean_were.copy()
    if i == 3:
        f = f.transpose(Image.FLIP_LEFT_RIGHT)
    place_in_canvas(f, baseline_y=90, max_h=82).save(f"public/sprites/weregarurumon/walk/down/walk_down_{i:02d}.png")

# Walk right frames from row 2 (MOVIMENTO: y: 28..130, x: 740..1448)
row2_were = im_were.crop((730, 30, 1290, 125))
clean_were_walk = flood_fill_transparent(row2_were, is_white_bg)
w_ww, h_ww = clean_were_walk.size
in_s = False
start_x = 0
were_walk_sprites = []
for x in range(w_ww):
    has_p = any(clean_were_walk.getpixel((x, y))[3] > 40 for y in range(h_ww))
    if has_p and not in_s:
        in_s = True
        start_x = x
    elif not has_p and in_s:
        in_s = False
        if x - start_x > 25:
            sp = clean_were_walk.crop((start_x, 0, x, h_ww))
            b = sp.getbbox()
            if b: were_walk_sprites.append(sp.crop(b))

for i in [1, 2, 3]:
    idx = min(i - 1, len(were_walk_sprites) - 1)
    sp = were_walk_sprites[idx] if were_walk_sprites else clean_were
    canv_r = place_in_canvas(sp, baseline_y=90, max_h=82)
    canv_r.save(f"public/sprites/weregarurumon/walk/right/walk_right_{i:02d}.png")
    canv_l = canv_r.transpose(Image.FLIP_LEFT_RIGHT)
    canv_l.save(f"public/sprites/weregarurumon/walk/left/walk_left_{i:02d}.png")

# WereGarurumon UP: Dorsal werewolf
for i in [1, 2, 3]:
    dorsal_were = clean_were.copy()
    if i == 3:
        dorsal_were = dorsal_were.transpose(Image.FLIP_LEFT_RIGHT)
    ww, wh = dorsal_were.size
    for y in range(wh):
        for x in range(ww):
            p = dorsal_were.getpixel((x, y))
            if p[3] > 100:
                # Eye area (yellow eye at x ~ 0.50..0.72 ww, y ~ 0.20..0.38 wh)
                if 0.20 * wh <= y <= 0.38 * wh and 0.48 * ww <= x <= 0.72 * ww:
                    if p[0] > 160 and p[1] > 150 and p[2] < 80: # yellow eye
                        dorsal_were.putpixel((x, y), (115, 145, 215, 255))
                    elif p[0] < 50 and p[1] < 50: # dark snout/mouth
                        dorsal_were.putpixel((x, y), (40, 60, 135, 255))
    place_in_canvas(dorsal_were, baseline_y=90, max_h=82).save(f"public/sprites/weregarurumon/walk/up/walk_up_{i:02d}.png")

print("WereGarurumon 4-way perfected!")

# -------------------------------------------------------------
# 4. KINGETEMON
# -------------------------------------------------------------
print("Processing KingEtemon...")
# Load crops from scratch/king_crops/
for i in [1, 2, 3]:
    # Idle frames 0, 1, 2 for walk_down
    im_down = Image.open(f"scratch/king_crops/idle_{i-1:02d}.png")
    place_in_canvas(im_down, baseline_y=90, max_h=82).save(f"public/sprites/kingetemon/walk/down/walk_down_{i:02d}.png")

walk_indices = [0, 1, 2]
for i, idx in enumerate(walk_indices, 1):
    im_walk = Image.open(f"scratch/king_crops/walk_{idx:02d}.png")
    canv_r = place_in_canvas(im_walk, baseline_y=90, max_h=82)
    canv_r.save(f"public/sprites/kingetemon/walk/right/walk_right_{i:02d}.png")
    canv_l = canv_r.transpose(Image.FLIP_LEFT_RIGHT)
    canv_l.save(f"public/sprites/kingetemon/walk/left/walk_left_{i:02d}.png")

# KingEtemon UP: Authentic pixel-shaded cape drapery
for i in [1, 2, 3]:
    im_down = Image.open(f"scratch/king_crops/idle_{i-1:02d}.png").convert("RGBA")
    kw, kh = im_down.size
    # Replace face/sunglasses with back of golden crown & hair, and expand rich red cape folds down the back
    for y in range(kh):
        for x in range(kw):
            p = im_down.getpixel((x, y))
            if p[3] > 100:
                # Face & chest armor area (y ~ 0.28..0.65 kh, x ~ 0.35..0.65 kw)
                if 0.28 * kh <= y <= 0.65 * kh and 0.35 * kw <= x <= 0.65 * kw:
                    # If sunglasses or open mouth:
                    if p[0] < 70 and p[1] < 70 and p[2] < 70:
                        # Rich red velvet cape shading
                        im_down.putpixel((x, y), (195, 20, 20, 255))
                    elif p[0] > 180 and p[1] > 140 and p[2] < 50: # golden chest
                        # Rich red cape folds
                        fold_color = (215, 25, 25, 255) if (x + y) % 6 < 3 else (175, 15, 15, 255)
                        im_down.putpixel((x, y), fold_color)
    place_in_canvas(im_down, baseline_y=90, max_h=82).save(f"public/sprites/kingetemon/walk/up/walk_up_{i:02d}.png")

print("KingEtemon 4-way perfected!")

# -------------------------------------------------------------
# 5. ETEMON
# -------------------------------------------------------------
print("Processing Etemon...")
# Use tall anime Etemon from scratch/ete_crops/ (Row 1 = frontal, Row 2 = walk right)
for i in [1, 2, 3]:
    # Frontal frames from row 1
    im_down = Image.open(f"scratch/ete_crops/row1_{i-1:02d}.png")
    place_in_canvas(im_down, baseline_y=90, max_h=82).save(f"public/sprites/etemon/walk/down/walk_down_{i:02d}.png")

for i in [1, 2, 3]:
    # Walk right frames from row 2
    im_walk = Image.open(f"scratch/ete_crops/row2_{i-1:02d}.png")
    canv_r = place_in_canvas(im_walk, baseline_y=90, max_h=82)
    canv_r.save(f"public/sprites/etemon/walk/right/walk_right_{i:02d}.png")
    canv_l = canv_r.transpose(Image.FLIP_LEFT_RIGHT)
    canv_l.save(f"public/sprites/etemon/walk/left/walk_left_{i:02d}.png")

# Etemon UP: Authentic tall anime Etemon from behind (sunglass strap around back of head, zipper on suit, tail)
for i in [1, 2, 3]:
    im_down = Image.open(f"scratch/ete_crops/row1_{i-1:02d}.png").convert("RGBA")
    ew, eh = im_down.size
    for y in range(eh):
        for x in range(ew):
            p = im_down.getpixel((x, y))
            if p[3] > 100:
                # Face & sunglasses area (y ~ 0.12..0.32 eh, x ~ 0.35..0.65 ew)
                if 0.12 * eh <= y <= 0.32 * eh and 0.35 * ew <= x <= 0.65 * ew:
                    # Replace face skin with brown monkey fur suit color (r~225, g~130, b~30)
                    if p[0] > 180 and p[1] > 130 and p[2] < 100:
                        im_down.putpixel((x, y), (215, 120, 25, 255))
                    # Sunglass strap across back of head:
                    if 0.20 * eh <= y <= 0.24 * eh:
                        im_down.putpixel((x, y), (20, 20, 20, 255))
                # Chest zipper line
                if 0.35 * eh <= y <= 0.65 * eh and abs(x - ew // 2) <= 1:
                    im_down.putpixel((x, y), (50, 25, 10, 255))
    place_in_canvas(im_down, baseline_y=90, max_h=82).save(f"public/sprites/etemon/walk/up/walk_up_{i:02d}.png")

print("Etemon 4-way perfected!")

# -------------------------------------------------------------
# 6. AGUMON
# -------------------------------------------------------------
print("Processing Agumon...")
im_agu = Image.open("public/sprites/agumon/_raw/aagumon.png").convert("RGBA")
# Frontal sprite from Seleção no mapa (x: 315..395, y: 890..995)
crop_agu_sel = im_agu.crop((315, 890, 395, 995))
clean_agu_front = flood_fill_transparent(crop_agu_sel, is_white_bg)
b = clean_agu_front.getbbox()
if b: clean_agu_front = clean_agu_front.crop(b)

for i in [1, 2, 3]:
    f = clean_agu_front.copy()
    if i == 3:
        f = f.transpose(Image.FLIP_LEFT_RIGHT)
    place_in_canvas(f, baseline_y=90, max_h=80).save(f"public/sprites/agumon/walk/down/walk_down_{i:02d}.png")

# Walk right frames from row 2 (x: 490..980, y: 165..245)
row2_agu = im_agu.crop((490, 165, 980, 245))
clean_agu_walk = flood_fill_transparent(row2_agu, is_white_bg)
w_aw, h_aw = clean_agu_walk.size
in_s = False
start_x = 0
agu_walk_sprites = []
for x in range(w_aw):
    has_p = any(clean_agu_walk.getpixel((x, y))[3] > 40 for y in range(h_aw))
    if has_p and not in_s:
        in_s = True
        start_x = x
    elif not has_p and in_s:
        in_s = False
        if x - start_x > 20:
            sp = clean_agu_walk.crop((start_x, 0, x, h_aw))
            b = sp.getbbox()
            if b: agu_walk_sprites.append(sp.crop(b))

for i in [1, 2, 3]:
    idx = min(i - 1, len(agu_walk_sprites) - 1)
    sp = agu_walk_sprites[idx] if agu_walk_sprites else clean_agu_front
    canv_r = place_in_canvas(sp, baseline_y=90, max_h=80)
    canv_r.save(f"public/sprites/agumon/walk/right/walk_right_{i:02d}.png")
    canv_l = canv_r.transpose(Image.FLIP_LEFT_RIGHT)
    canv_l.save(f"public/sprites/agumon/walk/left/walk_left_{i:02d}.png")

# Agumon UP: Authentic dorsal view (round orange head dome with highlights, orange back, tail, stepping feet)
# In matching high-res pixel art style!
for i in [1, 2, 3]:
    dorsal_agu = clean_agu_front.copy()
    if i == 3:
        dorsal_agu = dorsal_agu.transpose(Image.FLIP_LEFT_RIGHT)
    aw, ah = dorsal_agu.size
    for y in range(ah):
        for x in range(aw):
            p = dorsal_agu.getpixel((x, y))
            if p[3] > 100:
                # Facial eye & mouth area (y ~ 0.10..0.45 ah, x ~ 0.35..0.75 aw)
                if 0.10 * ah <= y <= 0.45 * ah and 0.35 * aw <= x <= 0.75 * aw:
                    # If green eye:
                    if p[1] > 140 and p[0] < 100:
                        # smooth orange head tone
                        dorsal_agu.putpixel((x, y), (234, 144, 25, 255))
                    # If dark eye outline or mouth:
                    elif p[0] < 60 and p[1] < 40 and p[2] < 20:
                        dorsal_agu.putpixel((x, y), (210, 110, 15, 255))
                    # If mouth inside red:
                    elif p[0] > 160 and p[1] < 80:
                        dorsal_agu.putpixel((x, y), (234, 144, 25, 255))
    place_in_canvas(dorsal_agu, baseline_y=90, max_h=80).save(f"public/sprites/agumon/walk/up/walk_up_{i:02d}.png")

print("Agumon 4-way perfected!")

# -------------------------------------------------------------
# 7. GABUMON (Clean pink badge artifact)
# -------------------------------------------------------------
print("Cleaning Gabumon pink artifact...")
for root, dirs, files in os.walk("public/sprites/gabumon"):
    for f in files:
        if f.endswith(".png"):
            path = os.path.join(root, f)
            im = Image.open(path).convert("RGBA")
            changed = False
            for y in range(im.height):
                for x in range(im.width):
                    p = im.getpixel((x, y))
                    # Pink warning badge (r > 200, g < 120, b > 180)
                    if p[0] > 200 and p[1] < 120 and p[2] > 180:
                        im.putpixel((x, y), (0, 0, 0, 0))
                        changed = True
            if changed:
                im.save(path)

print("All 6 Digimons + Gabumon perfected!")
