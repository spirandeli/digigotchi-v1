from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageEnhance
import math
import shutil
import hashlib
import numpy as np
import cv2

ROOT = Path(__file__).resolve().parents[1]
ANIMATED = ROOT / 'public' / 'sprites' / 'animated'
KEYFRAMES = ROOT / 'public' / 'sprites' / 'keyframes'
FX_ROOT = ROOT / 'public' / 'fx'
CANVAS = 96

SPECIES = [
    'agumon', 'geogreymon', 'wargreymon', 'etemon', 'metaletemon',
    'gabumon', 'garurumon', 'weregarurumon', 'veemon', 'flamedramon', 'xvmon'
]

BASE_ACTIONS = ['idle', 'eat', 'play', 'sleep', 'wake', 'clean', 'heal', 'evolve']
COUNTS = {
    'idle': 10,
    'eat': 10,
    'play': 12,
    'sleep': 6,
    'wake': 8,
    'clean': 10,
    'heal': 10,
    'evolve': 14,
}

ATTACKS = {
    'agumon': ('attack-pepper-breath', 'fire'),
    'geogreymon': ('attack-mega-flame', 'fire'),
    'wargreymon': ('attack-terra-force', 'energy'),
    'etemon': ('attack-love-serenade', 'sound'),
    'metaletemon': ('attack-banana-slip', 'banana'),
    'gabumon': ('attack-blue-blaster', 'bluefire'),
    'garurumon': ('attack-howling-blaster', 'bluefire'),
    'weregarurumon': ('attack-wolf-claw', 'claw'),
    'veemon': ('attack-vee-headbutt', 'dash'),
    'flamedramon': ('attack-fire-rocket', 'rocket'),
    'xvmon': ('attack-vee-laser', 'laser'),
}

GROUPS = {
    'fire': {'agumon', 'geogreymon', 'wargreymon', 'flamedramon'},
    'music': {'etemon', 'metaletemon'},
    'wolf': {'gabumon', 'garurumon', 'weregarurumon'},
    'dragon': {'veemon', 'xvmon'},
}


def group(species: str) -> str:
    for key, values in GROUPS.items():
        if species in values:
            return key
    return 'other'


def ensure_keyframes() -> None:
    if KEYFRAMES.exists() and any(KEYFRAMES.iterdir()):
        return
    if KEYFRAMES.exists():
        shutil.rmtree(KEYFRAMES)
    shutil.copytree(ANIMATED, KEYFRAMES)


def load_frames(species: str, action: str) -> list[Image.Image]:
    folder = KEYFRAMES / species / action
    if not folder.exists():
        return []
    return [Image.open(p).convert('RGBA') for p in sorted(folder.glob('*.png'))]


def cleanup(frame: Image.Image) -> Image.Image:
    arr = np.array(frame.convert('RGBA'))
    alpha = arr[:, :, 3]
    if not np.any(alpha > 0):
        return Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))

    mask = (alpha > 8).astype(np.uint8)
    # Dilate only for component detection so small gaps between limbs/body remain attached,
    # while distant sheet artifacts are discarded. The original pixels are preserved.
    connected = cv2.dilate(mask, np.ones((3, 3), np.uint8), iterations=1)
    n, labels, stats, _ = cv2.connectedComponentsWithStats(connected, 8)
    if n > 1:
        main_idx = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
        keep = (labels == main_idx) & (mask > 0)
        arr[~keep, 3] = 0

    im = Image.fromarray(arr, mode='RGBA')
    bbox = im.getchannel('A').getbbox()
    if not bbox:
        return Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))
    crop = im.crop(bbox)
    # Preserve pixel-art sharpness and leave margin.
    scale = min(86 / crop.width, 86 / crop.height, 1.55)
    nw, nh = max(1, round(crop.width * scale)), max(1, round(crop.height * scale))
    crop = crop.resize((nw, nh), Image.Resampling.NEAREST)
    canvas = Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))
    canvas.alpha_composite(crop, ((CANVAS - nw) // 2, CANVAS - nh - 5))
    return canvas


def colorize_wolf(frame: Image.Image, species: str) -> Image.Image:
    if species not in {'garurumon', 'weregarurumon'}:
        return frame
    im = frame.copy()
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0 or max(r, g, b) - min(r, g, b) > 22:
                continue
            lum = (r + g + b) // 3
            if lum < 36:
                continue
            rx, ry = x / w, y / h
            if species == 'garurumon':
                if lum > 210: c = (235, 245, 255)
                elif lum > 160: c = (174, 205, 248)
                elif lum > 100: c = (95, 128, 214)
                else: c = (52, 69, 153)
                if ry > 0.72 and (rx < 0.3 or rx > 0.7): c = (194, 55, 105)
                if 0.47 < rx < 0.72 and 0.36 < ry < 0.61 and lum > 85: c = (192, 45, 54)
            else:
                if lum > 215: c = (238, 242, 255)
                elif lum > 165: c = (178, 193, 234)
                elif lum > 100: c = (108, 128, 198)
                else: c = (62, 75, 142)
                if ry > 0.53 and 0.2 < rx < 0.88 and lum > 64: c = (47, 76, 130)
                if ((rx < 0.31 and 0.12 < ry < 0.56) or (rx > 0.7 and 0.1 < ry < 0.5)) and lum > 75:
                    c = (151, 108, 70)
                if 0.40 < rx < 0.72 and 0.24 < ry < 0.48 and lum > 80: c = (190, 47, 55)
            px[x, y] = (*c, a)
    return im


def enhance_palette(frame: Image.Image, species: str) -> Image.Image:
    frame = colorize_wolf(frame, species)
    if species in {'garurumon', 'weregarurumon'}:
        return frame
    factor = 1.10
    if group(species) == 'fire': factor = 1.16
    elif group(species) == 'dragon': factor = 1.13
    return ImageEnhance.Sharpness(ImageEnhance.Color(frame).enhance(factor)).enhance(1.07)


def transform(frame: Image.Image, *, dx=0.0, dy=0.0, scale_x=1.0, scale_y=1.0, rotate=0.0, head_dx=0.0, head_dy=0.0) -> Image.Image:
    base = cleanup(frame)
    # Move upper third independently a couple pixels for actual pose variation.
    if abs(head_dx) > 0.1 or abs(head_dy) > 0.1:
        arr = np.array(base)
        alpha = arr[:, :, 3]
        bbox = Image.fromarray(alpha, mode='L').getbbox()
        if bbox:
            x0, y0, x1, y1 = bbox
            cut = y0 + max(8, int((y1 - y0) * 0.42))
            upper = base.crop((x0, y0, x1, cut))
            body = base.copy()
            # Clear upper region and paste shifted upper body.
            clear = Image.new('RGBA', (x1 - x0, cut - y0), (0, 0, 0, 0))
            body.paste(clear, (x0, y0))
            body.alpha_composite(upper, (x0 + int(round(head_dx)), y0 + int(round(head_dy))))
            base = body

    bbox = base.getchannel('A').getbbox()
    if not bbox:
        return base
    crop = base.crop(bbox)
    nw = max(1, int(round(crop.width * scale_x)))
    nh = max(1, int(round(crop.height * scale_y)))
    crop = crop.resize((nw, nh), Image.Resampling.NEAREST)
    if abs(rotate) > 0.01:
        crop = crop.rotate(rotate, resample=Image.Resampling.NEAREST, expand=True)
    out = Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))
    x = (CANVAS - crop.width) // 2 + int(round(dx))
    y = CANVAS - crop.height - 5 + int(round(dy))
    out.alpha_composite(crop, (x, y))
    return out


def select_frame(frames: list[Image.Image], t: float) -> Image.Image:
    if not frames:
        return Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))
    if len(frames) == 1:
        return frames[0].copy()
    idx = min(len(frames) - 1, max(0, int(round(t * (len(frames) - 1)))))
    return frames[idx].copy()


def source_for(species: str, action: str) -> list[Image.Image]:
    preferred = {
        'idle': ['idle'],
        'eat': ['eat', 'idle'],
        'play': ['play', 'evolve', 'idle'],
        'sleep': ['sleep', 'idle'],
        'wake': ['wake', 'sleep', 'idle'],
        'clean': ['clean', 'play', 'idle'],
        'heal': ['heal', 'clean', 'idle'],
        'evolve': ['evolve', 'play', 'idle'],
        'attack': ['play', 'evolve', 'wake', 'idle'],
    }[action]
    collected: list[Image.Image] = []
    for src in preferred:
        f = load_frames(species, src)
        if f:
            collected.extend(f)
            if action == 'sleep':
                break
        if len(collected) >= 4:
            break
    return [enhance_palette(cleanup(f), species) for f in collected]


def draw_shadow(im: Image.Image, width=46, opacity=38) -> Image.Image:
    out = Image.new('RGBA', im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(out)
    d.ellipse((48 - width // 2, 84, 48 + width // 2, 92), fill=(0, 0, 0, opacity))
    out.alpha_composite(im)
    return out


def draw_food(out: Image.Image, x: int, y: int, species: str, bite=False):
    d = ImageDraw.Draw(out)
    g = group(species)
    if g == 'music':
        d.polygon([(x, y+5), (x+7, y), (x+16, y+7), (x+12, y+16), (x+5, y+16), (x, y+10)], fill=(250,220,72,245), outline=(150,103,24,255))
    elif g == 'wolf':
        d.rounded_rectangle((x,y+3,x+16,y+13),radius=3,fill=(177,87,52,245),outline=(90,39,25,255))
        d.rectangle((x+13,y+10,x+17,y+18),fill=(239,231,208,250),outline=(178,171,160,255))
    else:
        d.rounded_rectangle((x,y+3,x+17,y+13),radius=4,fill=(179,88,59,245),outline=(93,37,25,255))
        d.ellipse((x+12,y+5,x+16,y+9),fill=(246,239,220,250))
    if bite:
        d.ellipse((x+12,y+1,x+19,y+8),fill=(0,0,0,0))


def overlay_action(frame: Image.Image, action: str, idx: int, count: int, species: str) -> Image.Image:
    t = idx / max(1, count - 1)
    out = frame.copy()
    d = ImageDraw.Draw(out)
    if action == 'eat':
        # Item approaches, bite occurs, item retreats/disappears.
        phase = min(1.0, t * 1.8) if t < 0.65 else max(0.0, 1.0 - (t - 0.65) * 2.8)
        x = int(8 + phase * 42)
        y = int(54 - math.sin(min(1, phase) * math.pi) * 9)
        if idx < count - 2:
            draw_food(out, x, y, species, bite=t > 0.52)
        if 0.45 < t < 0.82:
            d.arc((54,34,72,53), 300, 40, fill=(255,255,255,220), width=2)
    elif action == 'play':
        x = int(10 + t * 75)
        y = int(58 - math.sin(t * math.pi) * 31)
        r = 6
        if group(species) == 'music':
            d.ellipse((x-r,y-r,x+r,y+r), fill=(178,211,255,245), outline=(255,255,255,255))
            if idx % 3 == 0: d.text((x+5,y-16),'♪',fill=(255,240,125,240))
        elif group(species) == 'fire':
            d.ellipse((x-r,y-r,x+r,y+r), fill=(255,177,53,245), outline=(255,242,180,255))
            d.polygon([(x,y-10),(x+5,y-1),(x+1,y+8),(x-3,y+3),(x-7,y+11),(x-6,y)],fill=(255,91,40,225))
        else:
            d.ellipse((x-r,y-r,x+r,y+r), fill=(225,78,98,245), outline=(255,236,180,255))
            d.line((x-r+2,y,x+r-2,y),fill=(255,255,255,230),width=1)
            d.line((x,y-r+2,x,y+r-2),fill=(255,255,255,230),width=1)
    elif action == 'sleep':
        active = 1 + (idx % 3)
        for z in range(active):
            x, y = 68 + z*6, 30 - z*9
            d.text((x,y),'Z',fill=(194,222,255,225))
    elif action == 'wake':
        if idx < count - 2:
            cx, cy = 76, 18
            r = 4 + (idx % 2)
            d.ellipse((cx-r,cy-r,cx+r,cy+r), fill=(255,222,86,220), outline=(255,247,190,245))
            for ang in range(0,360,90):
                a=math.radians(ang)
                d.line((cx+math.cos(a)*(r+2),cy+math.sin(a)*(r+2),cx+math.cos(a)*(r+7),cy+math.sin(a)*(r+7)), fill=(255,239,135,230), width=2)
    elif action == 'clean':
        for j in range(6):
            x = 14 + (j*13 + idx*3) % 68
            y = 22 + (j*11 - idx*4) % 52
            s = 4 + j % 3
            d.ellipse((x,y,x+s,y+s),fill=(210,245,255,135),outline=(255,255,255,210))
        if 0.25 < t < 0.75:
            for j in range(4):
                x = 25 + j*15
                y = 62 + int(math.sin((t+j)*math.tau)*4)
                d.line((x,y,x+4,y-9),fill=(94,196,255,180),width=2)
    elif action == 'heal':
        for j in range(5):
            a = t*math.tau + j*math.tau/5
            x = 48 + math.cos(a)*27
            y = 43 + math.sin(a)*20
            col=(116,255,154,205)
            d.rounded_rectangle((x-4,y-1,x+4,y+1),radius=1,fill=col)
            d.rounded_rectangle((x-1,y-4,x+1,y+4),radius=1,fill=col)
    elif action == 'evolve':
        pulse = math.sin(t * math.pi * 4)
        for rr, col in [(25,(75,208,255,80)),(34,(190,90,255,65)),(42,(255,231,118,50))]:
            r=max(4,int(rr+pulse*3))
            d.ellipse((48-r,48-r,48+r,48+r),outline=col,width=2)
        for j in range(10):
            a=t*math.tau*1.5+j*math.tau/10
            r=31+5*math.sin(t*math.pi+j)
            x=48+math.cos(a)*r; y=48+math.sin(a)*r
            d.ellipse((x-2,y-2,x+2,y+2),fill=(255,255,255,220))
        if abs(t-0.57)<0.08:
            flash=Image.new('RGBA',out.size,(0,0,0,0))
            fd=ImageDraw.Draw(flash)
            for rr, aa in [(42,24),(34,34),(26,48),(18,68)]:
                fd.ellipse((48-rr,48-rr,48+rr,48+rr),fill=(255,255,255,aa))
            out.alpha_composite(flash)
    return out


def build_base_action(species: str, action: str) -> list[Image.Image]:
    count = COUNTS[action]
    src = source_for(species, action)
    if not src:
        return []
    frames: list[Image.Image] = []
    for idx in range(count):
        t = idx / max(1, count - 1)
        # Use genuine source poses as keyframes, but create in-between timing/motion.
        eased = 0.5 - 0.5 * math.cos(t * math.pi)
        base = src[idx % len(src)].copy() if action == 'idle' else select_frame(src, eased)
        cyc = math.sin(t * math.tau)
        if action == 'idle':
            sx = 1.0 + 0.022 * math.sin(t * math.tau)
            sy = 1.0 - 0.016 * math.sin(t * math.tau)
            micro_x = (-1, 0, 1, 1, 0, -1, -1, 0, 1, 0)[idx % 10]
            micro_y = (0, -1, -1, 0, 1, 1, 0, -1, 0, 1)[idx % 10]
            cur = transform(base, dx=micro_x, dy=micro_y-1.5*cyc, scale_x=sx, scale_y=sy, head_dx=1.2*cyc+micro_x, head_dy=-1.1*cyc)
        elif action == 'eat':
            lean = math.sin(min(1.0, t*1.45) * math.pi)
            cur = transform(base, dx=2.5*lean + (idx % 2), dy=1.8*lean, rotate=-2.4*lean, head_dx=2.8*lean + ((idx % 3)-1), head_dy=2.2*lean)
        elif action == 'play':
            hop = math.sin(t * math.pi * 2)
            cur = transform(base, dx=3.5*cyc, dy=-7*abs(math.sin(t*math.pi*2)), rotate=2.0*cyc, head_dx=1.4*cyc, head_dy=-1.1*hop)
        elif action == 'sleep':
            breath = math.sin(t * math.tau)
            cur = transform(base, dy=1.0*breath, scale_x=1.0+0.018*breath, scale_y=1.0-0.012*breath, head_dy=0.8*breath)
        elif action == 'wake':
            rise = 1.0 - math.cos(t*math.pi)
            cur = transform(base, dy=3-4*rise, scale_y=0.96+0.05*rise, rotate=-1.5*math.sin(t*math.pi), head_dy=-2.0*math.sin(t*math.pi))
        elif action == 'clean':
            wiggle=math.sin(t*math.pi*4)
            cur=transform(base,dx=2.4*wiggle,rotate=2.0*wiggle,head_dx=-1.5*wiggle,head_dy=-0.8*abs(wiggle))
        elif action == 'heal':
            recovery = 0.5 - 0.5*math.cos(t*math.pi)
            cur=transform(base,dy=3*(1-recovery)-1*recovery,scale_y=0.97+0.04*recovery,head_dy=2*(1-recovery)-1*recovery)
        else: # evolve
            pulse=math.sin(t*math.pi*3)
            cur=transform(base,dy=-3*abs(math.sin(t*math.pi)),scale_x=1+0.035*pulse,scale_y=1+0.035*pulse,rotate=1.5*math.sin(t*math.tau),head_dy=-1.5*abs(pulse))
        cur = overlay_action(cur, action, idx, count, species)
        cur = draw_shadow(cur, 48 if species in {'garurumon','weregarurumon'} else 44)
        frames.append(cur)
    return frames


def draw_fireball(d: ImageDraw.ImageDraw, x: float, y: float, radius: int, blue=False):
    if blue:
        outer=(76,155,255,210); inner=(210,244,255,245); core=(255,255,255,250)
    else:
        outer=(255,76,30,220); inner=(255,174,43,245); core=(255,245,190,250)
    d.ellipse((x-radius,y-radius,x+radius,y+radius), fill=outer)
    d.ellipse((x-radius*0.65,y-radius*0.65,x+radius*0.65,y+radius*0.65), fill=inner)
    d.ellipse((x-radius*0.27,y-radius*0.27,x+radius*0.27,y+radius*0.27), fill=core)
    for k in range(3):
        d.polygon([(x-radius-k*4,y-k*2),(x-radius-8-k*4,y+2+k),(x-radius-k*3,y+radius//2)], fill=outer)


def attack_fx(frame: Image.Image, species: str, style: str, idx: int, count: int) -> Image.Image:
    t = idx / max(1, count-1)
    out=frame.copy(); d=ImageDraw.Draw(out)
    # Impact starts after anticipation/charge.
    if style in {'fire','bluefire'}:
        if t > 0.28:
            p=min(1,(t-0.28)/0.5)
            x=57+p*35; y=43-4*math.sin(p*math.pi)
            draw_fireball(d,x,y,5+int(3*math.sin(p*math.pi)),blue=style=='bluefire')
            if t>0.72:
                for j in range(5):
                    xx=78+j*4; yy=39+(j%3)*4
                    d.line((xx,yy,xx+7,yy-2),fill=(210,240,255,180) if style=='bluefire' else (255,183,72,185),width=2)
    elif style == 'energy':
        if t < 0.58:
            r=max(2,int(3+22*(t/0.58)))
            cx,cy=48,19
            for rr,col in [(r+5,(117,204,255,80)),(r,(255,219,89,210)),(max(2,r-5),(255,255,230,245))]:
                d.ellipse((cx-rr,cy-rr,cx+rr,cy+rr),fill=col)
        else:
            p=(t-0.58)/0.42; x=48+p*44; y=27+p*12
            r=13
            d.ellipse((x-r,y-r,x+r,y+r),fill=(255,218,72,225),outline=(255,255,235,255),width=2)
    elif style == 'sound':
        if t>0.24:
            p=(t-0.24)/0.76
            for j in range(3):
                r=int(8+p*18+j*6)
                d.arc((55-r,42-r,55+r,42+r),300,60,fill=(255,220-j*30,115+j*35,210-j*30),width=2)
            if idx%2==0: d.text((70,21),'♪',fill=(255,239,124,245))
    elif style == 'banana':
        if t>0.24:
            p=min(1,(t-0.24)/0.62); x=54+p*40; y=50-math.sin(p*math.pi)*25
            d.arc((x-7,y-9,x+7,y+9),20,170,fill=(255,224,57,255),width=4)
            d.rectangle((x+4,y-5,x+7,y-2),fill=(115,74,34,255))
    elif style == 'claw':
        if 0.34<t<0.84:
            p=(t-0.34)/0.5
            x=52+p*38
            for j in range(3):
                d.arc((x-20,y:=25+j*9,x+20,y+30),250,75,fill=(194,235,255,235),width=3)
    elif style == 'dash':
        if t>0.3:
            for j in range(4):
                x=12+j*9-int((t-0.3)*12)
                y=32+j*11
                d.line((x,y,x+16,y),fill=(205,234,255,150),width=2)
            if t>0.72:
                d.ellipse((79,35,94,55),outline=(255,242,160,225),width=3)
    elif style == 'rocket':
        if t>0.3:
            for j in range(5):
                x=21-j*5; y=54+j%2*3
                d.polygon([(x,y),(x-10,y-5),(x-7,y+4)],fill=(255,75,30,200))
                d.polygon([(x+2,y),(x-5,y-3),(x-2,y+2)],fill=(255,211,72,235))
            if t>0.72: d.ellipse((78,34,94,55),outline=(255,235,130,230),width=3)
    elif style == 'laser':
        if t<0.5:
            a=min(255,int(80+t*340))
            d.line((43,40,55,52),fill=(130,224,255,a),width=3)
            d.line((55,40,43,52),fill=(130,224,255,a),width=3)
        else:
            width=2+int((t-0.5)*8)
            d.polygon([(55,43),(94,43-width),(94,49+width),(55,49)],fill=(130,224,255,210))
            d.line((57,46,94,46),fill=(255,255,255,250),width=2)
    return out


def build_attack(species: str) -> tuple[str, list[Image.Image]]:
    action, style = ATTACKS[species]
    count=12
    src=source_for(species,'attack')
    frames=[]
    for idx in range(count):
        t=idx/(count-1)
        # 0-2 anticipation, 3-7 execution, 8 impact/follow, 9-11 recovery.
        if t < 0.24:
            p=t/0.24
            base=select_frame(src,min(0.18,p*0.2))
            cur=transform(base,dx=-3*p,dy=2*p,scale_x=1+0.02*p,scale_y=1-0.025*p,rotate=-2*p,head_dx=-2*p,head_dy=1.5*p)
        elif t < 0.70:
            p=(t-0.24)/0.46
            base=select_frame(src,0.2+0.65*p)
            dash=9*p if style in {'dash','rocket','claw'} else 2.5*p
            cur=transform(base,dx=dash,dy=-3*math.sin(p*math.pi),scale_x=1+0.04*math.sin(p*math.pi),scale_y=1-0.02*math.sin(p*math.pi),rotate=3*math.sin(p*math.pi),head_dx=2.5*p,head_dy=-1.5*math.sin(p*math.pi))
        else:
            p=(t-0.70)/0.30
            base=select_frame(src,max(0,0.85-0.85*p))
            cur=transform(base,dx=(8 if style in {'dash','rocket','claw'} else 2)*(1-p) + (idx % 2),dy=2*math.sin(p*math.pi),rotate=2*(1-p),head_dx=1.5*(1-p)+((idx%3)-1))
        cur=attack_fx(cur,species,style,idx,count)
        cur=draw_shadow(cur,48 if species in {'garurumon','weregarurumon'} else 44)
        frames.append(cur)
    return action, frames


def save_frames(species: str, action: str, frames: list[Image.Image]):
    folder=ANIMATED/species/action
    if folder.exists(): shutil.rmtree(folder)
    folder.mkdir(parents=True,exist_ok=True)
    for i,frame in enumerate(frames):
        frame.save(folder/f'{i:02d}.png', optimize=True)


def build_fx_assets():
    if FX_ROOT.exists(): shutil.rmtree(FX_ROOT)
    kinds=['fire','blue-fire','claw','energy','sound-wave','speed','laser','banana']
    for kind in kinds:
        folder=FX_ROOT/kind; folder.mkdir(parents=True,exist_ok=True)
        for i in range(6):
            im=Image.new('RGBA',(96,96),(0,0,0,0)); d=ImageDraw.Draw(im); t=i/5
            if kind in {'fire','blue-fire'}:
                draw_fireball(d,20+t*55,48,5+int(3*math.sin(t*math.pi)),blue=kind=='blue-fire')
            elif kind=='claw':
                for j in range(3): d.arc((24+i*5,18+j*12,74+i*3,58+j*12),240,65,fill=(210,240,255,230),width=3)
            elif kind=='energy':
                r=5+i*5; d.ellipse((48-r,48-r,48+r,48+r),fill=(255,220,80,220),outline=(255,255,255,250),width=2)
            elif kind=='sound-wave':
                for j in range(3):
                    r=9+i*3+j*7; d.arc((48-r,48-r,48+r,48+r),300,60,fill=(255,210,120,200),width=2)
            elif kind=='speed':
                for j in range(5): d.line((10,24+j*12,40+i*7,24+j*12),fill=(210,236,255,170),width=2)
            elif kind=='laser':
                d.polygon([(18,44),(18+i*12,43-i//2),(18+i*12,51+i//2),(18,50)],fill=(130,224,255,215))
            elif kind=='banana':
                x=20+i*10; y=52-int(math.sin(t*math.pi)*22); d.arc((x-8,y-10,x+8,y+10),20,170,fill=(255,224,57,255),width=4)
            im.save(folder/f'{i:02d}.png', optimize=True)


def main():
    ensure_keyframes()
    # Rebuild final output from pristine keyframes.
    if ANIMATED.exists(): shutil.rmtree(ANIMATED)
    ANIMATED.mkdir(parents=True,exist_ok=True)
    build_fx_assets()
    for species in SPECIES:
        for action in BASE_ACTIONS:
            frames=build_base_action(species,action)
            save_frames(species,action,frames)
        attack_action, attack_frames=build_attack(species)
        save_frames(species,attack_action,attack_frames)
    print('Sprite pipeline complete')
    for species in SPECIES:
        summary=[]
        for folder in sorted((ANIMATED/species).iterdir()):
            summary.append(f'{folder.name}:{len(list(folder.glob("*.png")))}')
        print(species, ', '.join(summary))


if __name__=='__main__':
    main()
