#!/usr/bin/env python3
"""Create reproducible, non-destructive Agumon runtime candidates.

The source files are individual transparent crops recovered from the visual
reference board in ``rougue-like-character-sprites/agumon``.  The mapping below
was established by opening the reference board and each selected PNG; numeric
filenames are deliberately *not* used as an action classifier.

This utility never changes an original ``sprite_*.png``.  It writes padded,
nearest-neighbour PNG copies only when invoked with ``--write`` and refuses to
overwrite a destination unless ``--replace`` is explicit.
"""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "rougue-like-character-sprites" / "agumon"
# The source includes a visually confirmed death pose 84px wide.  96px is the
# smallest common transparent canvas that leaves every reviewed pose intact.
CHARACTER_CANVAS = (96, 96)
EFFECT_CANVAS = (96, 96)
REVIEW_PATH = ROOT / "screenshots" / "sprite-review" / "agumon-m1-second-review.png"

# Ordered by the observed left-to-right frame progression in aagumon.png.
# Values are source *indices*, not a filename-derived semantic decision.
SEQUENCES: dict[str, list[int]] = {
    "idle": [27, 25, 28, 23, 26, 29, 30, 31, 24],
    "walk/left": [103, 98, 88, 82, 87, 99, 84, 78, 79, 93, 89],
    "walk/right": [59, 64, 60, 51, 65, 56, 54, 55, 43, 57],
    "attacks/basic_1": [95, 96, 68, 92, 107, 111],
    "attacks/basic_2": [110, 102, 90, 80],
    "hit": [36],
    "death": [34],
    "victory": [35],
    "heal": [115, 118, 108, 85, 50],
    "projectiles/dragon": [104],
    # sprite_0033 contains two independently usable effect cells, so it stays
    # out of the final sequence until each cell is separately cropped/reviewed.
    "effects/mega-blast": [39, 38],
}


def source_path(index: int) -> Path:
    return SOURCE_ROOT / f"sprite_{index:04d}.png"


def destination_path(group: str, position: int) -> Path:
    stem = group.replace("/", "_").replace("-", "_")
    return SOURCE_ROOT / group / f"{stem}_{position:02d}.png"


def remove_idle_artifacts(frame: Image.Image) -> Image.Image:
    """Remove only proven detached single-pixel/noise components from idle."""
    alpha = frame.getchannel("A")
    width, height = frame.size
    visited: set[tuple[int, int]] = set()
    remove: list[tuple[int, int]] = []
    for y in range(height):
        for x in range(width):
            if (x, y) in visited or alpha.getpixel((x, y)) <= 8:
                continue
            stack = [(x, y)]
            visited.add((x, y))
            component: list[tuple[int, int]] = []
            while stack:
                current_x, current_y = stack.pop()
                component.append((current_x, current_y))
                for next_y in range(max(0, current_y - 1), min(height, current_y + 2)):
                    for next_x in range(max(0, current_x - 1), min(width, current_x + 2)):
                        if (next_x, next_y) not in visited and alpha.getpixel((next_x, next_y)) > 8:
                            visited.add((next_x, next_y))
                            stack.append((next_x, next_y))
            if len(component) <= 14:
                remove.extend(component)
    if not remove:
        return frame
    cleaned = frame.copy()
    for x, y in remove:
        cleaned.putpixel((x, y), (0, 0, 0, 0))
    return cleaned


def normalise(source: Path, group: str) -> Image.Image:
    """Pad a transparent frame without cropping or resizing the artwork."""
    with Image.open(source) as image:
        frame = image.convert("RGBA")
    if group == "idle":
        frame = remove_idle_artifacts(frame)
    alpha_box = frame.getchannel("A").getbbox()
    if alpha_box is None:
        raise ValueError(f"transparent/empty source: {source.relative_to(ROOT)}")
    canvas_size = EFFECT_CANVAS if group.startswith(("effects/", "projectiles/")) else CHARACTER_CANVAS
    if frame.width > canvas_size[0] or frame.height > canvas_size[1]:
        raise ValueError(f"frame exceeds target canvas: {source.relative_to(ROOT)} {frame.size}")
    canvas = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
    canvas.alpha_composite(frame, ((canvas_size[0] - frame.width) // 2, canvas_size[1] - frame.height))
    return canvas


def write_review_sheet() -> None:
    """Render the exact organised copies for the mandatory second visual pass."""
    row_height = 124
    label_width = 172
    width = label_width + max(len(indices) for indices in SEQUENCES.values()) * 96
    height = len(SEQUENCES) * row_height
    sheet = Image.new("RGBA", (width, height), (30, 38, 49, 255))
    draw = ImageDraw.Draw(sheet)
    for row, (group, indices) in enumerate(SEQUENCES.items()):
        y = row * row_height
        draw.rectangle((0, y, width, y + row_height - 2), fill=(40, 51, 66, 255))
        draw.text((12, y + 14), group, fill=(238, 244, 250, 255))
        draw.text((12, y + 34), f"{len(indices)} frames", fill=(159, 179, 200, 255))
        for position in range(1, len(indices) + 1):
            frame = Image.open(destination_path(group, position)).convert("RGBA")
            sheet.alpha_composite(frame, (label_width + (position - 1) * 96, y + 26))
            draw.text((label_width + (position - 1) * 96 + 4, y + 6), f"{position:02d}", fill=(159, 179, 200, 255))
    REVIEW_PATH.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(REVIEW_PATH, optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--write", action="store_true", help="create the organised copies")
    parser.add_argument("--replace", action="store_true", help="allow replacing existing generated copies")
    args = parser.parse_args()

    planned = 0
    for group, indices in SEQUENCES.items():
        for position, index in enumerate(indices, start=1):
            source = source_path(index)
            destination = destination_path(group, position)
            if not source.is_file():
                raise FileNotFoundError(source)
            # Validate alpha and canvas fit even in dry-run mode.
            normalise(source, group)
            state = "create"
            if destination.exists():
                state = "replace" if args.replace else "keep"
            print(f"{state:7} {source.relative_to(ROOT)} -> {destination.relative_to(ROOT)}")
            if args.write and (args.replace or not destination.exists()):
                destination.parent.mkdir(parents=True, exist_ok=True)
                normalise(source, group).save(destination, optimize=True)
            planned += 1

    print(f"Agumon organisation plan: {planned} visually reviewed frames; write={args.write}")
    if args.write:
        write_review_sheet()
        print(f"Second-review sheet: {REVIEW_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
