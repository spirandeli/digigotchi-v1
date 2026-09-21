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

def clean_white(crop):
    cw, ch = crop.size
    clean = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    for cy in range(ch):
        for cx in range(cw):
            p = crop.getpixel((cx, cy))
            if p[3] > 40 and not (p[0] > 238 and p[1] > 238 and p[2] > 238):
                clean.putpixel((cx, cy), p)
    b = clean.getbbox()
    return clean.crop(b) if b else clean

def segment_horizontal_sprites(row_im, min_w=25):
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

# 1. Agumon - start at x=735 to include full tail & snout
im_agu = Image.open("public/sprites/agumon/_raw/aagumon.png").convert("RGBA")
r2_agu = clean_white(im_agu.crop((735, 185, 1530, 265)))
# Segment sprites
w_aw, h_aw = r2_agu.size
in_s = False
start_x = 0
agu_walk = []
for x in range(w_aw):
    col_has = any(r2_agu.getpixel((x, y))[3] > 40 for y in range(h_aw))
    if col_has and not in_s:
        in_s = True
        start_x = x
    elif not col_has and in_s:
        in_s = False
        if x - start_x > 25:
            agu_walk.append(r2_agu.crop((start_x, 0, x, h_aw)))

print(f"Agumon clean walk frames: {len(agu_walk)}")
for i in [1, 2, 3]:
    idx = min(i - 1, len(agu_walk) - 1)
    sp = agu_walk[idx]
    canv_r = place_in_canvas(sp, baseline_y=90, max_h=80)
    canv_r.save(f"public/sprites/agumon/walk/right/walk_right_{i:02d}.png")
    canv_l = canv_r.transpose(Image.FLIP_LEFT_RIGHT)
    canv_l.save(f"public/sprites/agumon/walk/left/walk_left_{i:02d}.png")

# 2. WereGarurumon - crop y: 52..125 to completely avoid header text
im_were = Image.open("public/sprites/weregarurumon/_raw/weregarurumon.png").convert("RGBA")
r2_were = clean_white(im_were.crop((740, 52, 1290, 125)))
w_ww, h_ww = r2_were.size
in_s = False
start_x = 0
were_walk = []
for x in range(w_ww):
    col_has = any(r2_were.getpixel((x, y))[3] > 40 for y in range(h_ww))
    if col_has and not in_s:
        in_s = True
        start_x = x
    elif not col_has and in_s:
        in_s = False
        if x - start_x > 25:
            were_walk.append(r2_were.crop((start_x, 0, x, h_ww)))

print(f"WereGarurumon clean walk frames: {len(were_walk)}")
for i in [1, 2, 3]:
    idx = min((i - 1) * 2, len(were_walk) - 1)
    sp = were_walk[idx]
    canv_r = place_in_canvas(sp, baseline_y=90, max_h=82)
    canv_r.save(f"public/sprites/weregarurumon/walk/right/walk_right_{i:02d}.png")
    canv_l = canv_r.transpose(Image.FLIP_LEFT_RIGHT)
    canv_l.save(f"public/sprites/weregarurumon/walk/left/walk_left_{i:02d}.png")

print("Fixed Agumon and WereGarurumon walk right!")
