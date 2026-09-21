from PIL import Image, ImageDraw, ImageFont

im = Image.open("sprite_lists_maps/ChatGPT Image 19_09_2026, 10_32_14.png").convert("RGBA")
w, h = im.size

# Cut a strip for column 0 (x=0..150, y=300..1250) and column 5 (x=500..650, y=600..1000)
def annotate_strip(crop_box, filename):
    strip = im.crop(crop_box)
    draw = ImageDraw.Draw(strip)
    x0, y0, x1, y1 = crop_box
    for y in range(0, y1 - y0, 20):
        actual_y = y0 + y
        draw.line([(0, y), (30, y)], fill=(255, 0, 0, 255), width=1)
        draw.text((32, y - 5), str(actual_y), fill=(255, 0, 0, 255))
    strip.save(filename)

annotate_strip((0, 300, 200, 1250), "scratch/strip_col0.png")
annotate_strip((500, 600, 750, 1100), "scratch/strip_col5.png")
print("Annotated strips saved!")
