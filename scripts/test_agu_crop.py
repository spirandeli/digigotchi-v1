import os
from PIL import Image

def flood_fill_transparent(im):
    im = im.convert("RGBA")
    w, h = im.size
    # We do BFS from borders for pixels that are white or near white
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
        # if transparent
        if p[3] < 100: return True
        # if white or very light gray
        if p[0] > 235 and p[1] > 235 and p[2] > 235: return True
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

im = Image.open("public/sprites/agumon/_raw/aagumon.png")
# Let us crop Selecao no mapa: in row 11 (y: 830..940, x: 200..300)
crop_sel = im.crop((200, 830, 270, 930))
clean_sel = flood_fill_transparent(crop_sel)
b = clean_sel.getbbox()
if b: clean_sel = clean_sel.crop(b)
os.makedirs("scratch", exist_ok=True)
clean_sel.save("scratch/agu_sel_clean.png")

# Also crop Row 2 Movimentacao direita (y: 160..250, x: 490..1000)
crop_walk = im.crop((490, 160, 1000, 250))
clean_walk = flood_fill_transparent(crop_walk)
clean_walk.save("scratch/agu_walk_clean.png")

print(f"Agumon sel size: {clean_sel.size}, walk size: {clean_walk.size}")
