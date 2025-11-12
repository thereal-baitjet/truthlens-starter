from fastapi import FastAPI
from app.routers.verify import router as verify_router

app = FastAPI(title="TruthLens API")
app.include_router(verify_router)

@app.get("/healthz")
def healthz():
    return {"ok": True}
