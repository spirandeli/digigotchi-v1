import os, sys
from PIL import Image

def place_in_canvas(im, baseline_y=90, center_x=48, max_w=86, max_h=86):
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

print("Helper defined successfully")
