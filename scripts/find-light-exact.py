from PIL import Image

im_light = Image.open("sprite_lists_maps/ChatGPT Image 19_09_2026, 10_32_14.png").convert("RGBA")

# Let's inspect column 1 (x=16..114) down the whole image to find the exact Y bands of the graphics
# Wall row 1 (the modular top-down walls)
# We know light_band_2 was y=250..500. Let's find exactly where the wall graphic is.
# In band 2, the title "WALL TILES..." is around y=300..325.
# Let's slice y=340 to 455 for column 0 (Wall Top with banner):
crop_w_top = im_light.crop((16, 340, 114, 440))
crop_w_top.save("scratch/audit_light_w_top.png")

# Column 1 (Wall Middle):
crop_w_mid = im_light.crop((138, 340, 236, 440))
crop_w_mid.save("scratch/audit_light_w_mid.png")

# Column 2 (Wall Bottom):
crop_w_bot = im_light.crop((260, 340, 358, 440))
crop_w_bot.save("scratch/audit_light_w_bot.png")

# Column 3 (Horizontal):
crop_w_hor = im_light.crop((382, 340, 480, 440))
crop_w_hor.save("scratch/audit_light_w_hor.png")

# Column 4 (Vertical):
crop_w_vert = im_light.crop((518, 340, 560, 440))
crop_w_vert.save("scratch/audit_light_w_vert.png")

# Column 5 (Inner Corner):
crop_c_in = im_light.crop((600, 340, 698, 440))
crop_c_in.save("scratch/audit_light_c_in.png")

# Column 6 (Outer Corner):
crop_c_out = im_light.crop((725, 340, 823, 440))
crop_c_out.save("scratch/audit_light_c_out.png")

# Now Doors row (in band 3/4):
# Title "INTERACTIVE ENVIRONMENT PROPS..." is between wall alt and doors.
# Let's find the exact Y of doors:
# In band 4, doors are at the top. Let's check y=630 to 740:
crop_door_cl = im_light.crop((16, 630, 114, 730))
crop_door_cl.save("scratch/audit_light_door_cl.png")

crop_door_op = im_light.crop((138, 630, 236, 730))
crop_door_op.save("scratch/audit_light_door_op.png")

# Chests (next to doors):
crop_chest_cl = im_light.crop((504, 630, 602, 730))
crop_chest_cl.save("scratch/audit_light_chest_cl.png")

crop_chest_op = im_light.crop((627, 630, 725, 730))
crop_chest_op.save("scratch/audit_light_chest_op.png")

# Props row:
crop_crate = im_light.crop((16, 770, 114, 870))
crop_crate.save("scratch/audit_light_crate.png")

crop_barrel = im_light.crop((215, 770, 295, 870))
crop_barrel.save("scratch/audit_light_barrel.png")

crop_statue = im_light.crop((605, 760, 700, 870))
crop_statue.save("scratch/audit_light_statue.png")

crop_coil = im_light.crop((725, 760, 820, 870))
crop_coil.save("scratch/audit_light_coil.png")

crop_trap = im_light.crop((840, 770, 950, 870))
crop_trap.save("scratch/audit_light_trap.png")

# Environment / Rocks row:
crop_rock = im_light.crop((16, 900, 114, 1000))
crop_rock.save("scratch/audit_light_rock.png")

crop_crystal = im_light.crop((195, 900, 295, 1000))
crop_crystal.save("scratch/audit_light_crystal.png")

print("Audit crops generated!")
