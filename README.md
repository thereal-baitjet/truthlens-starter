# TruthLens
*A browser extension for source-backed news context.*

See README in canvas; this repo matches the scaffold described there.

## Quickstart

### Extension
```bash
cd extension
npm i
npm run dev
# Load extension/dist as unpacked in Chrome/Edge
```

### Server
```bash
cd server
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
