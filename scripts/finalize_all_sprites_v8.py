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

# 1. GABUMON - Clean pink pixels
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

# 2. AGUMON - Row 2 walk right
print("Agumon walk right...")
im_agu = Image.open("public/sprites/agumon/_raw/aagumon.png").convert("RGBA")
# Walk right frames from row 2
r2_agu = im_agu.crop((780, 190, 1530, 265))
w_aw, h_aw = r2_agu.size
in_s = False
start_x = 0
agu_walk = []
for x in range(w_aw):
    col_has = any(r2_agu.getpixel((x, y))[3] > 50 and not (r2_agu.getpixel((x, y))[0] > 238 and r2_agu.getpixel((x, y))[1] > 238 and r2_agu.getpixel((x, y))[2] > 238) for y in range(h_aw))
    if col_has and not in_s:
        in_s = True
        start_x = x
    elif not col_has and in_s:
        in_s = False
        if x - start_x > 25:
            agu_walk.append(clean_white(r2_agu.crop((start_x, 0, x, h_aw))))

print(f"Agumon walk frames: {len(agu_walk)}")
for i in [1, 2, 3]:
    sp = agu_walk[i - 1]
    canv_r = place_in_canvas(sp, baseline_y=90, max_h=80)
    canv_r.save(f"public/sprites/agumon/walk/right/walk_right_{i:02d}.png")
    canv_l = canv_r.transpose(Image.FLIP_LEFT_RIGHT)
    canv_l.save(f"public/sprites/agumon/walk/left/walk_left_{i:02d}.png")

# 3. GARURUMON - Row 3 running wolves
print("Garurumon running right...")
im_gar = Image.open("public/sprites/garurumon/_raw/garurumon.png").convert("RGBA")
# Row 3 corrida direita is between y: 195 and 265, x: 640 and 1240
r3_gar = im_gar.crop((640, 195, 1240, 265))
w_gw, h_gw = r3_gar.size
in_s = False
start_x = 0
gar_run = []
for x in range(w_gw):
    col_has = any(r3_gar.getpixel((x, y))[3] > 50 and not (r3_gar.getpixel((x, y))[0] > 238 and r3_gar.getpixel((x, y))[1] > 238 and r3_gar.getpixel((x, y))[2] > 238) for y in range(h_gw))
    if col_has and not in_s:
        in_s = True
        start_x = x
    elif not col_has and in_s:
        in_s = False
        if x - start_x > 35:
            gar_run.append(clean_white(r3_gar.crop((start_x, 0, x, h_gw))))

print(f"Garurumon running frames: {len(gar_run)}")
for i in [1, 2, 3]:
    idx = min((i - 1) * 2, len(gar_run) - 1)
    sp = gar_run[idx]
    canv_r = place_in_canvas(sp, baseline_y=90, max_h=80, max_w=84)
    canv_r.save(f"public/sprites/garurumon/walk/right/walk_right_{i:02d}.png")
    canv_l = canv_r.transpose(Image.FLIP_LEFT_RIGHT)
    canv_l.save(f"public/sprites/garurumon/walk/left/walk_left_{i:02d}.png")

# 4. WEREGARURUMON - Row 2 walk right
print("WereGarurumon walk right...")
im_were = Image.open("public/sprites/weregarurumon/_raw/weregarurumon.png").convert("RGBA")
# Row 2 movimento direita is between y: 40 and 115, x: 740 and 1290
r2_were = im_were.crop((740, 40, 1290, 115))
w_ww, h_ww = r2_were.size
in_s = False
start_x = 0
were_walk = []
for x in range(w_ww):
    col_has = any(r2_were.getpixel((x, y))[3] > 50 and not (r2_were.getpixel((x, y))[0] > 238 and r2_were.getpixel((x, y))[1] > 238 and r2_were.getpixel((x, y))[2] > 238) for y in range(h_ww))
    if col_has and not in_s:
        in_s = True
        start_x = x
    elif not col_has and in_s:
        in_s = False
        if x - start_x > 25:
            were_walk.append(clean_white(r2_were.crop((start_x, 0, x, h_ww))))

print(f"WereGarurumon walk frames: {len(were_walk)}")
for i in [1, 2, 3]:
    idx = min((i - 1) * 2, len(were_walk) - 1)
    sp = were_walk[idx]
    canv_r = place_in_canvas(sp, baseline_y=90, max_h=82)
    canv_r.save(f"public/sprites/weregarurumon/walk/right/walk_right_{i:02d}.png")
    canv_l = canv_r.transpose(Image.FLIP_LEFT_RIGHT)
    canv_l.save(f"public/sprites/weregarurumon/walk/left/walk_left_{i:02d}.png")

# 5. ETEMON - Champion scale
print("Etemon scaling...")
for action in ["walk/down", "walk/up", "walk/right", "walk/left"]:
    for i in [1, 2, 3]:
        p = f"public/sprites/etemon/{action}/walk_{action.split('/')[-1]}_{i:02d}.png"
        im = Image.open(p)
        b = im.getbbox()
        if b:
            cr = im.crop(b)
            # Ensure height is ~80px
            target_h = 80
            scale = target_h / cr.height
            nw, nh = int(cr.width * scale), target_h
            cr_up = cr.resize((nw, nh), Image.NEAREST)
            place_in_canvas(cr_up, baseline_y=90, max_h=82).save(p)

print("Finished successfully!")
