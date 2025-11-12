from fastapi import APIRouter
from pydantic import BaseModel
from app.core import retriever, scoring, spin

router = APIRouter()

class VerifyIn(BaseModel):
    url: str
    selection: str | None = None
    language: str = "en"
    max_claims: int = 3

@router.post("/verify")
def verify(payload: VerifyIn):
    claims = retriever.extract_claims(payload.url, payload.selection, payload.max_claims)
    enriched = [retriever.evidence(c) for c in claims]
    scored = [scoring.score_claims(e) for e in enriched]
    spin_flags = spin.detect_spin(payload.url, payload.selection)
    return {"url": payload.url, "claims": scored, "spin_flags": spin_flags}
