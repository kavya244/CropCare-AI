from PIL import Image


def resize_image(image_path: str, output_path: str):
    image = Image.open(image_path).convert("RGB")
    image.thumbnail((224, 224))
    image.save(output_path)
    return output_path