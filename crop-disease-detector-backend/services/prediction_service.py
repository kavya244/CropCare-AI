
from transformers import pipeline

MODEL_NAME = "neghani/plantvillage-mobilenetv2"

classifier = None


def get_classifier():
    global classifier

    if classifier is None:
        print("Loading Plant Disease AI model...")

        classifier = pipeline(
            "image-classification",
            model=MODEL_NAME,
            device=-1
        )

        print("AI model loaded successfully!")

    return classifier


def predict_disease(image_path: str):
    model = get_classifier()

    predictions = model(image_path, top_k=3)

    if not predictions:
        raise ValueError("No prediction returned by the model.")

    best = predictions[0]

    label = best["label"]
    confidence = float(best["score"]) * 100

    disease_name = label.replace("___", " - ").replace("_", " ")

    healthy = "healthy" in label.lower()

    if healthy:
        message = "The model predicts a healthy leaf."
    else:
        message = (
            "Possible crop disease detected. "
            "Please confirm with an agricultural expert."
        )

    return {
        "disease": disease_name,
        "confidence": round(confidence, 2),
        "status": "success",
        "message": message,
        "recommendations": [
            "Inspect the entire plant for symptoms.",
            "Take clear pictures of affected leaves.",
            "Monitor nearby plants.",
            "Consult an agricultural expert before treatment."
        ],
        "alternatives": [
            {
                "disease": item["label"],
                "confidence": round(float(item["score"]) * 100, 2)
            }
            for item in predictions
        ]
    }
