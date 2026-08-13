from fastapi import FastAPI, HTTPException
from schema import TicketInput, DiagnosticRAGOutput
from classifier import traiter_ticket
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="mAlntenance & Assistance API")

# Configuration CORS obligatoire pour relier un frontend React/Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def health_check():
    return {"status": "ok", "message": "Service d'assistance IT prêt"}

@app.post("/api/tickets/classify", response_model=DiagnosticRAGOutput)
def classify_endpoint(ticket: TicketInput):
    try:
        resultat = traiter_ticket(ticket)
        return resultat
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)