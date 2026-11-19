
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise RuntimeError(
        "GEMINI_API_KEY is missing. Add it to backend/.env"
    )

client = genai.Client(api_key=API_KEY)


async def get_assistant_reply(
    message: str,
    language: str,
    image_bytes: bytes,
    image_type: str = "image/jpeg"
):
    allowed_types = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ]

    if image_type not in allowed_types:
        raise ValueError(
            "Please upload a JPG, PNG, or WEBP image."
        )

    if not image_bytes:
        raise ValueError("No image was received.")

    # Select the response language
    selected_language = language.strip().lower()

    if selected_language in ["kn", "kannada"]:
        language_instruction = """
        ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಕನ್ನಡ ಭಾಷೆಯಲ್ಲಿ ನೀಡಿ.

        ಮುಖ್ಯ ಸೂಚನೆಗಳು:
        1. ಸರಳವಾದ ಕನ್ನಡ ಪದಗಳನ್ನು ಬಳಸಿ.
        2. ರೈತರಿಗೆ ಸುಲಭವಾಗಿ ಅರ್ಥವಾಗುವ ರೀತಿಯಲ್ಲಿ ವಿವರಿಸಿ.
        3. ಇಂಗ್ಲಿಷ್ ವಾಕ್ಯಗಳನ್ನು ಬಳಸಬೇಡಿ.
        4. ರೋಗದ ಹೆಸರು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಇದ್ದರೆ ಅದರ ಕನ್ನಡ ವಿವರಣೆಯನ್ನೂ ನೀಡಿ.
        5. ಸಲಹೆಗಳನ್ನು ಕನ್ನಡದಲ್ಲಿ ನೀಡಿ.
        6. ಉತ್ತರವನ್ನು ಸ್ಪಷ್ಟವಾದ ವಿಭಾಗಗಳಾಗಿ ವಿಂಗಡಿಸಿ.
        7. ಬಳಕೆದಾರರು ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿದ ಪ್ರಶ್ನೆಗೆ ಕನ್ನಡದಲ್ಲೇ ಉತ್ತರಿಸಿ.
        """
    else:
        language_instruction = """
        Respond entirely in English.
        Use simple language that farmers can understand.
        Give clear and practical explanations.
        """

    prompt = f"""
You are CropCare AI, an agricultural crop disease assistant.

The user has uploaded a plant or crop image.

USER QUESTION:
{message}

LANGUAGE INSTRUCTIONS:
{language_instruction}

IMAGE ANALYSIS INSTRUCTIONS:

1. Carefully inspect the uploaded image.
2. Identify the visible plant and leaf symptoms.
3. Look for yellow spots, brown spots, holes,
   wilting, fungal growth, discoloration and damage.
4. Explain the possible disease or pest if identifiable.
5. Explain why those symptoms may indicate that condition.
6. Suggest practical prevention methods.
7. Give safe treatment guidance where appropriate.
8. If the image is unclear, ask for a clearer photograph.
9. Never claim a diagnosis is 100 percent certain.
10. Do not invent symptoms that are not visible.
11. If the image does not contain a plant, explain that.

IMPORTANT:
- Answer the user's actual question.
- Do not give the same generic response to every question.
- Use the uploaded image as the main context.
- Avoid unnecessary technical words.
- Do not recommend pesticides without appropriate safety
  and label-use guidance.

Format your answer with:
- Plant condition
- Visible symptoms
- Possible disease
- Recommended actions
- Prevention tips
"""

    image_part = types.Part.from_bytes(
        data=image_bytes,
        mime_type=image_type
    )

    try:
        response = await client.aio.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=[
                prompt,
                image_part
            ]
        )

        if not response.text:
            raise RuntimeError(
                "Gemini returned an empty response."
            )

        return response.text.strip()

    except Exception as error:
        print("Gemini API error:", repr(error))
        raise RuntimeError(
            "AI assistant is temporarily unavailable. "
            "Please try again."
        ) from error
