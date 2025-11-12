from typing import List, Dict, Any

LOADED = {"disgraced", "baseless", "slams", "bombshell", "shocking"}

def detect_spin(url: str, selection: str | None) -> List[Dict[str, Any]]:
    text = selection or ""
    flags = []
    for word in LOADED:
        if word in text.lower():
            flags.append({"type": "loaded", "quote": word, "why": "pejorative/loaded framing"})
    return flags
