from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SPRITES = ROOT / "public" / "sprites" / "animated"
CANVAS = 192
MARGIN = 12


def main() -> None:
    converted = 0
    for path in SPRITES.rglob("*.png"):
        with Image.open(path) as source:
            source = source.convert("RGBA")
            if source.size == (CANVAS, CANVAS):
                continue
            bbox = source.getchannel("A").getbbox()
            if not bbox:
                Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0)).save(path, optimize=True)
                converted += 1
                continue
            subject = source.crop(bbox)
            scale = min((CANVAS - MARGIN * 2) / subject.width, (CANVAS - MARGIN * 2) / subject.height)
            width = max(1, round(subject.width * scale))
            height = max(1, round(subject.height * scale))
            subject = subject.resize((width, height), Image.Resampling.NEAREST)
            canvas = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
            canvas.alpha_composite(subject, ((CANVAS - width) // 2, CANVAS - height - MARGIN))
            canvas.save(path, optimize=True)
            converted += 1
    print(f"Upscaled {converted} sprite frames to 192x192")


if __name__ == "__main__":
    main()