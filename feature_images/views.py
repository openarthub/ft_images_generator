from django.shortcuts import render
from django.conf import settings

from PIL import Image
import numpy as np
import matplotlib.pyplot as plt


def ft_images_creator(request):
    params = request.GET.copy()
    item = params.get('item', '') or 'Pipe'
    metal = params.get('metal', '') or 'Gold'
    selected_model = params.get('format', '') or 'card3D'
    item_number = params.get('number', 1) or 1
    print(f'Item {item}, Metal {metal}, Model {selected_model}, Number {item_number}')

    model_folder_name = {
        "card3D": "3D_Card",
        "3d_object": "3D_Object",
        "360_video": "3D_Video",
        "2d_card_video_75": "2d_Card_Video_75"
    }.get(selected_model, "")

    item_folder_name = {
        "ring": "Anillo",
        "anillo": "Anillo",
        "pipe": "Pipa",
        "pipa": "Pipa",
        "carpeta": "Carpeta",
        "business_folder": "Carpeta",
        "folder": "Carpeta",
        "maletin": "Maletin",
        "briefcase": "Maletin",
    }.get(item.lower(), "")

    metal_folder_name = {
        "gold": "oro",
        "oro": "oro",
        "plate": "plata",
        "silver": "plata",
        "bronce": "bronce",
        "bronze": "bronce"
    }.get(metal.lower(), "")

    metal_file_name = {
        "gold": "Gold",
        "oro": "Gold",
        "plate": "Silver",
        "silver": "Silver",
        "bronce": "Bronze",
        "bronze": "Bronze"
    }.get(metal.lower(), "")

    data_context = {
        "card3D": {
            "path": f"{settings.STATIC_URL}Releasing/{item_folder_name}/{model_folder_name}/{metal_folder_name}/",
            "file_name": f"{selected_model}{item.title()}{metal_file_name}{item_number}.glb",
            "display_video": False,
            "bg_space": f"{selected_model}{item.title()}_{metal_folder_name}.jpeg",
            "camera_orbit": "25deg 90deg 0deg"
        },
        "3d_object": {
            "path": f"{settings.STATIC_URL}Releasing/{item_folder_name}/{model_folder_name}/{metal_folder_name}/",
            "file_name": f"comp{item.title()}{metal_file_name}{item_number}.glb",
            "display_video": False,
            "bg_space": f"pexels-pixabay-258045.jpeg",
            "camera_orbit": "-30deg 90deg 0deg"
        },
        "360_video": {
            "path": f"{settings.STATIC_URL}Releasing/{item_folder_name}/{model_folder_name}/{metal_folder_name}/",
            "file_name": f"{item_number}.mp4",
            "display_video": True,
            "video_attrs": "",
            "video_current_time": {
                "gold": 3,
                "oro": 3,
                "plate": 3,
                "silver": 3,
                "bronce": 3,
                "bronze": 3
            }.get(metal.lower(), 3),
            "bg_space": f"bg_{model_folder_name}.jpg",
        },
        "2d_card_video_75": {
            "path": f"{settings.STATIC_URL}Releasing/{item_folder_name}/{model_folder_name}/{metal_folder_name}/",
            "file_name": f"{item_number}.mp4",
            "display_video": True,
            "video_attrs": "",  # autoplay muted loop
            "video_current_time": {
                "gold": 2.7,
                "oro": 2.7,
                "plate": 2.7,
                "silver": 2.7,
                "bronce": 2.7,
                "bronze": 2.7
            }.get(metal.lower(), 2.7),
            "bg_space": f"bg_{model_folder_name}.jpg",
        },
    }

    return render(request, 'base.html', data_context.get(selected_model, {}))


def remove_bg(request):
    remove_bg_black()
    return render(request, 'base.html', {})


def remove_bg_black():
    base_image = Image.open(f"{settings.STATIC_ROOT}{settings.STATIC_URL}emulator/ring_3d_object_gold_1.jpg")
    base_bg = Image.open(f"{settings.STATIC_ROOT}{settings.STATIC_URL}emulator/main_bg.png")
    base_bg_rgba = base_bg.convert("RGBA")
    # Remove Black Pixels
    image = np.asarray(base_image.convert("RGBA"))
    idx = (image[..., :3] == np.array((0, 0, 0))).all(axis=-1)
    image[idx, 3] = 0
    img_no_bg = Image.fromarray(image)
    img_no_bg.save(f'{settings.STATIC_ROOT}{settings.STATIC_URL}emulator/nobg_ring_3d_object_gold_1.png')

    no_bg_img = Image.open(f'{settings.STATIC_ROOT}{settings.STATIC_URL}emulator/nobg_ring_3d_object_gold_1.png')

    # merge_image = Image.new('RGBA', (base_bg.size[0], base_bg.size[1]), (0, 0, 0, 0))
    # merge_image.paste(base_bg, (0, 0))
    base_bg_rgba.paste(no_bg_img.convert("RGBA"), (base_bg.size[0], base_bg.size[1]), no_bg_img.convert("RGBA"))
    # merge_image.save(f'{settings.STATIC_ROOT}{settings.STATIC_URL}emulator/merge_complete.png', "png")
    base_bg_rgba.save(f'{settings.STATIC_ROOT}{settings.STATIC_URL}emulator/merge_complete.png', "png")
    base_bg.close()
    base_image.close()
    no_bg_img.close()
