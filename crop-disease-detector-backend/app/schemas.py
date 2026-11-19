from pydantic import BaseModel


class AssistantRequest(BaseModel):
    message: str
    language: str = "en"


class AssistantResponse(BaseModel):
    reply: str
    language: str