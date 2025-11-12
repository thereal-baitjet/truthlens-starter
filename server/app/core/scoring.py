from typing import Dict, Any

def score_claims(claim: Dict[str, Any]) -> Dict[str, Any]:
    # naive: choose confidence based on top evidence score
    top = max((e.get("score", 0) for e in claim.get("evidence", [])), default=0)
    if top > 0.75:
        conf = "high"
    elif top > 0.5:
        conf = "medium"
    else:
        conf = "low"
    claim["confidence"] = conf
    claim.setdefault("notes", "Prototype scoring; do not use for final judgments.")
    return claim
