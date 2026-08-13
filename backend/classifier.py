# classifier.py
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
from schema import TicketInput, DiagnosticRAGOutput
from rag_services import chercher_dans_kb

load_dotenv()

# Client Gemini
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """
Tu es un expert en support informatique ITIL pour l'assistant 'mAlntenance & Assistance'.
Ton rôle est d'analyser le ticket utilisateur et le CONTEXTE issu de la base de connaissances (KB).

Règles de traitement :
1. Catégorise le ticket parmi : 'Comptes et authentification', 'Réseau et connectivité', 'Matériel informatique', 'Logiciels et applications', 'Imprimantes et périphériques', 'Droits d'accès', 'Cybersécurité', 'Autre ou indéterminé'.
2. Détermine la priorité : 'Basse', 'Moyenne', 'Haute', ou 'Critique'.
3. Détermine l'équipe : 'Support N1', 'Réseau', 'Sécurité', 'Systèmes', ou 'Infrastructures'[cite: 1].
4. Si la procédure dans le CONTEXTE permet de résoudre le problème :
   - Assigne un score de 'confiance' élevé (0.8 à 1.0)[cite: 1].
   - Fixe 'decision_finale' sur 'resolution'[cite: 1].
   - Cite OBLIGATOIREMENT le ou les 'doc_id' dans 'reponse_utilisateur' sous la forme [Source: KB-XXX-YY][cite: 1].
5. Si le CONTEXTE est vide, non pertinent ou insuffisant :
   - Assigne un score de 'confiance' bas (< 0.5)[cite: 1].
   - Fixe 'decision_finale' sur 'escalade' ou 'demande_information'[cite: 1].
   - Ne cite aucune source fictive[cite: 1].
"""

def traiter_ticket(ticket: TicketInput) -> DiagnosticRAGOutput:
    # 1. Recherche RAG dans ChromaDB
    rag_res = chercher_dans_kb(ticket.description)
    
    # 2. Construction du prompt utilisateur
    user_prompt = f"""
    --- TICKET UTILISATEUR ---
    ID: {ticket.ticket_id}
    Description: {ticket.description}

    --- CONTEXTE BASE DE CONNAISSANCES (KB) ---
    {rag_res['contexte']}
    """

    # 3. Appel à Gemini avec Structured Outputs
    response = client.models.generate_content(
        model='gemini-3.6-flash',
        contents=user_prompt,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            response_mime_type="application/json",
            response_schema=DiagnosticRAGOutput,
            temperature=0.1,
        ),
    )

    # 4. Parsing Pydantic
    res_struct = DiagnosticRAGOutput.model_validate_json(response.text)

    # 5. Sécurité : Ajuster les sources si le RAG n'avait rien trouvé
    if not rag_res["trouve"]:
        res_struct.sources = []
        if res_struct.decision_finale == "resolution":
            res_struct.decision_finale = "escalade"

    return res_struct