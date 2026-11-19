
from fastapi import (
    FastAPI, UploadFile, File, HTTPException,
    Form, Depends
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from pathlib import Path
from typing import Optional
import uuid
import json

from app.config import UPLOAD_DIR
from app.database import (
    create_tables, get_db, User, DetectionHistory
)
from app.auth import (
    hash_password, verify_password,
    create_access_token, get_current_user
)
from services.image_service import validate_image
from services.prediction_service import predict_disease
from services.voice_service import get_assistant_reply


app = FastAPI(
    title="Crop Disease Detector API",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")


@app.on_event("startup")
def startup():
    create_tables()


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@app.get("/")
def home():
    return {"message": "Crop Disease Detector API is running!"}


@app.get("/api/health")
def health_check():
    return {"status": "healthy"}


@app.post("/api/auth/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    name = data.name.strip()
    email = str(data.email).lower().strip()

    if not name:
        raise HTTPException(status_code=400, detail="Enter your name.")

    if len(data.password) < 8:
        raise HTTPException(
            status_code=400,
            detail="Password must contain at least 8 characters."
        )

    existing = db.query(User).filter(User.email == email).first()

    if existing:
        raise HTTPException(
            status_code=409,
            detail="An account with this email already exists."
        )

    user = User(
        name=name,
        email=email,
        password_hash=hash_password(data.password)
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(user.id)

    return {
        "success": True,
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }


@app.post("/api/auth/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    email = str(data.email).lower().strip()

    user = db.query(User).filter(User.email == email).first()

    if not user or not verify_password(
        data.password, user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password."
        )

    return {
        "success": True,
        "token": create_access_token(user.id),
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }


@app.get("/api/auth/me")
def current_user(user: User = Depends(get_current_user)):
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }


@app.post("/api/predict")
async def detect_disease(
    file: UploadFile = File(...),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    contents = await validate_image(file)

    extension = Path(file.filename or "leaf.jpg").suffix.lower()
    if extension not in [".jpg", ".jpeg", ".png", ".webp"]:
        extension = ".jpg"

    filename = f"{uuid.uuid4().hex}{extension}"
    image_path = UPLOAD_DIR / filename

    try:
        image_path.write_bytes(contents)

        result = predict_disease(str(image_path))

        record = DetectionHistory(
            user_id=user.id,
            disease=result.get("disease", "Unknown"),
            confidence=float(result.get("confidence", 0)),
            image_filename=filename,
            recommendations=json.dumps(
                result.get("recommendations", []),
                ensure_ascii=False
            )
        )

        db.add(record)
        db.commit()
        db.refresh(record)

        return {
            "success": True,
            "filename": filename,
            "history_id": record.id,
            "result": result
        }

    except Exception as error:
        db.rollback()
        if image_path.exists():
            image_path.unlink()

        print("Prediction error:", repr(error))
        raise HTTPException(
            status_code=500,
            detail=f"Image processing failed: {str(error)}"
        )


@app.get("/api/history")
def get_history(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    records = (
        db.query(DetectionHistory)
        .filter(DetectionHistory.user_id == user.id)
        .order_by(DetectionHistory.created_at.desc())
        .all()
    )

    return {
        "success": True,
        "history": [
            {
                "id": item.id,
                "disease": item.disease,
                "confidence": item.confidence,
                "image_url": f"/uploads/{item.image_filename}",
                "recommendations": json.loads(item.recommendations or "[]"),
                "created_at": item.created_at.isoformat()
            }
            for item in records
        ]
    }


@app.delete("/api/history/{record_id}")
def delete_history(
    record_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    record = (
        db.query(DetectionHistory)
        .filter(
            DetectionHistory.id == record_id,
            DetectionHistory.user_id == user.id
        )
        .first()
    )

    if not record:
        raise HTTPException(status_code=404, detail="History record not found.")

    image_path = UPLOAD_DIR / record.image_filename

    db.delete(record)
    db.commit()

    if image_path.exists():
        image_path.unlink()

    return {"success": True, "message": "History record deleted."}


@app.post("/api/assistant")
async def assistant(
    message: str = Form(...),
    language: str = Form("en"),
    file: UploadFile = File(...),
    user: User = Depends(get_current_user)
):
    try:
        contents = await validate_image(file)
        mime_type = file.content_type or "image/jpeg"

        reply = await get_assistant_reply(
            message=message,
            language=language,
            image_bytes=contents,
            image_type=mime_type
        )

        return {
            "success": True,
            "reply": reply,
            "language": language
        }

    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))

    except Exception as error:
        print("Gemini assistant error:", repr(error))
        raise HTTPException(
            status_code=503,
            detail="AI assistant is temporarily unavailable. Please try again."
        )
