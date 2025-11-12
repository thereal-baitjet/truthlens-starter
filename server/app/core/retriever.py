# Stubs to be replaced with real retrieval over allowlisted sources
from typing import Dict, Any, List

def extract_claims(url: str, selection: str | None, k: int) -> List[Dict[str, Any]]:
    base = selection or "Example claim extracted from article."
    return [{"text": base, "spans": [[10, 25]]}]

def evidence(claim: Dict[str, Any]) -> Dict[str, Any]:
    claim["evidence"] = [
        {"url": "https://apnews.com/", "stance": "support", "score": 0.82},
        {"url": "https://www.reuters.com/", "stance": "neutral", "score": 0.58},
    ]
    return claim
