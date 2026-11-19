from PIL import Image, UnidentifiedImageError
from pathlib import Path
from app.config import ALLOWED_EXTENSIONS, MAX_FILE_SIZE
from fastapi import HTTPException, UploadFile
import io


async def validate_image(file: UploadFile):
    extension = Path(file.filename or "").suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Please upload a JPG, JPEG, PNG, or WEBP image."
        )

    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Image size must be less than 10 MB."
        )

    try:
        image = Image.open(io.BytesIO(contents))
        image.verify()
    except (UnidentifiedImageError, OSError):
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is not a valid image."
        )

    await file.seek(0)
    return contents