from PIL import Image

im_light = Image.open("sprite_lists_maps/ChatGPT Image 19_09_2026, 10_32_14.png").convert("RGBA")

# Let's inspect wall_top (x=15..115) from y=330 to 470
# and door (x=14..105) from y=740 to 890
# and chest (x=509..595) from y=770 to 890
# and crate (x=15..85) from y=940 to 1050

test_crops = {
    "light_wall_365_465": im_light.crop((15, 368, 115, 465)),
    "light_wall_spiked_368": im_light.crop((138, 368, 238, 465)),
    "light_wall_down_368": im_light.crop((382, 368, 482, 465)),
    "light_door_cl_785": im_light.crop((14, 785, 105, 880)),
    "light_door_op_785": im_light.crop((135, 785, 230, 880)),
    "light_chest_cl_815": im_light.crop((509, 815, 595, 880)),
    "light_chest_op_800": im_light.crop((630, 800, 720, 880)),
    "light_crate_980": im_light.crop((15, 980, 85, 1045)),
    "light_barrel_980": im_light.crop((220, 980, 289, 1045)),
    "light_statue_980": im_light.crop((610, 980, 685, 1045)),
    "light_trap_980": im_light.crop((840, 980, 940, 1045)),
    "light_crystal_1115": im_light.crop((195, 1115, 285, 1175)),
    "light_rock_1115": im_light.crop((15, 1115, 95, 1175))
}

for name, crop in test_crops.items():
    crop.save(f"scratch/{name}.png")

print("Saved test crops in scratch!")
