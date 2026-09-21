import os
from PIL import Image

def flood_fill_transparent(im):
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
    
    def is_bg(x, y):
        p = im.getpixel((x, y))
        if p[3] < 100: return True
        # white background
        if p[0] > 235 and p[1] > 235 and p[2] > 235: return True
        # cyan bracket pixels on borders
        if p[0] < 60 and p[1] > 160 and p[2] > 210: return True
        return False

    res = im.copy()
    for sx, sy in queue:
        if (sx, sy) not in visited and is_bg(sx, sy):
            visited.add((sx, sy))
            q = [(sx, sy)]
            while q:
                cx, cy = q.pop()
                res.putpixel((cx, cy), (0, 0, 0, 0))
                for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in visited:
                        if is_bg(nx, ny):
                            visited.add((nx, ny))
                            q.append((nx, ny))
    return res

im = Image.open("public/sprites/garurumon/_raw/garurumon.png")
crop = im.crop((290, 1135, 365, 1220))
clean = flood_fill_transparent(crop)
b = clean.getbbox()
if b: clean = clean.crop(b)
clean.save("scratch/gar_clean_sel.png")
print("Gar clean sel size:", clean.size)
