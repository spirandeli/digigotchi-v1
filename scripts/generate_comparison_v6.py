import os
from PIL import Image, ImageDraw, ImageFont

digimons = [
    "agumon", "veemon", "gabumon", "garurumon", "geogreymon",
    "wargreymon", "weregarurumon", "xvmon", "flamedramon",
    "etemon", "metaletemon", "kingetemon"
]

row_h = 110
col_w = 110
label_w = 140
img_w = label_w + 3 * col_w
img_h = len(digimons) * row_h + 40

out = Image.new("RGBA", (img_w, img_h), (24, 25, 30, 255))
draw = ImageDraw.Draw(out)

# Headers
headers = ["right_01", "down_01", "up_01"]
for c, h in enumerate(headers):
    x = label_w + c * col_w + 20
    draw.text((x, 10), h, fill=(200, 200, 200, 255))

for r, d in enumerate(digimons):
    y = 40 + r * row_h
    draw.text((15, y + 45), d, fill=(220, 220, 220, 255))
    
    paths = [
        f"public/sprites/{d}/walk/right/walk_right_01.png",
        f"public/sprites/{d}/walk/down/walk_down_01.png",
        f"public/sprites/{d}/walk/up/walk_up_01.png",
    ]
    for c, p in enumerate(paths):
        x = label_w + c * col_w
        if os.path.exists(p):
            im = Image.open(p)
            # Center on cell
            # cell is 110x100
            # im is 96x96
            ox = x + (col_w - im.width) // 2
            oy = y + (row_h - im.height) // 2
            out.paste(im, (ox, oy), im)
        else:
            draw.text((x + 20, y + 45), "MISSING", fill=(255, 80, 80, 255))

dest = "/home/spira/.gemini/antigravity-ide/brain/f4d8b0ac-1454-4664-b375-3c69aed5de0e/all_walk_comparison_v6.png"
out.save(dest)
print(f"Saved {dest}")
