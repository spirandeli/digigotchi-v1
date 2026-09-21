import os
from PIL import Image

im = Image.open("public/sprites/etemon/spritesheets/etemon.png").convert("RGBA")
# Background color in spritesheets/etemon.png is the blue color (approx r: 0..40, g: 130..180, b: 230..255)
bg_sample = im.getpixel((0, 0))
print("Etemon sheet bg color:", bg_sample)

def clean_blue_bg(crop):
    cw, ch = crop.size
    clean = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    for y in range(ch):
        for x in range(cw):
            p = crop.getpixel((x, y))
            # if blue bg (diff from bg_sample < 30)
            if abs(p[0] - bg_sample[0]) < 25 and abs(p[1] - bg_sample[1]) < 25 and abs(p[2] - bg_sample[2]) < 25:
                continue
            clean.putpixel((x, y), p)
    b = clean.getbbox()
    return clean.crop(b) if b else clean

# Row 1 is between y: 15 and y: 75
# Row 2 is between y: 75 and y: 135
row1 = im.crop((0, 15, 829, 75))
row2 = im.crop((0, 75, 829, 135))

# Segment along x
def segment(row_im):
    w, h = row_im.size
    in_s = False
    start_x = 0
    res = []
    for x in range(w):
        col_has = any(row_im.getpixel((x, y)) != bg_sample for y in range(h))
        if col_has and not in_s:
            in_s = True
            start_x = x
        elif not col_has and in_s:
            in_s = False
            if x - start_x > 15:
                c = clean_blue_bg(row_im.crop((start_x, 0, x, h)))
                if c.width > 10 and c.height > 20:
                    res.append(c)
    return res

os.makedirs("scratch/ete_crops", exist_ok=True)
ete_r1 = segment(row1)
ete_r2 = segment(row2)

print(f"Etemon row 1: {len(ete_r1)} frames")
for i, f in enumerate(ete_r1):
    f.save(f"scratch/ete_crops/row1_{i:02d}.png")
    print(f"  r1_{i}: {f.size}")

print(f"Etemon row 2: {len(ete_r2)} frames")
for i, f in enumerate(ete_r2):
    f.save(f"scratch/ete_crops/row2_{i:02d}.png")
    print(f"  r2_{i}: {f.size}")

