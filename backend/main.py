import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schema import TicketInput, DiagnosticRAGOutput
from classifier import traiter_ticket
from ingest import charger_corpus_kb

# 1. Gestion du cycle de vie de l'application (Démarrage et Arrêt)
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ce bloc s'exécute automatiquement au lancement du serveur FastAPI
    print(" Démarrage du serveur ITIL Support (Groq Engine)...")
    print(" Vérification et indexation de la base de connaissances (ChromaDB)...")
    
    # Ingestion automatique des fiches Markdown pour garantir la présence des données
    try:
        charger_corpus_kb(kb_root_path="./data/corpus_kb")
        print(" Base de connaissances chargée et prête.")
    except Exception as e:
        print(f" Erreur lors du chargement de la base KB : {e}")
        
    yield  # L'application tourne et traite les requêtes
    
    print("Arrêt du serveur.")

# 2. Initialisation de l'API FastAPI
app = FastAPI(
    title="mAlntenance & Assistance API (Groq Edition)",
    description="API de tri, classification et diagnostic automatique de tickets support via RAG et Llama 3.3.",
    version="1.0.0",
    lifespan=lifespan
)

# 3. Configuration CORS (Essentielle pour la liaison avec le Frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Autorise tous les frontends (React, Streamlit, etc.)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Route de vérification de santé (Health Check)
@app.get("/")
def health_check():
    return {
        "status": "online",
        "llm_engine": "Groq (llama-3.3-70b-versatile)",
        "docs": "/docs"
    }

# 5. Endpoint principal de classification et RAG
@app.post(
    "/api/tickets/classify", 
    response_model=DiagnosticRAGOutput,
    summary="Classifier un ticket et générer une réponse RAG",
    tags=["Tickets"]
)
def classify_endpoint(ticket: TicketInput):
    try:
        # Traitement du ticket via Groq + ChromaDB dans classifier.py
        resultat = traiter_ticket(ticket)
        return resultat
    except Exception as e:
        print(f"Erreur lors du traitement : {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Erreur interne lors du traitement du ticket : {str(e)}"
        )