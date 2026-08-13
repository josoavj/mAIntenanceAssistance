# classifier.py
import os
from dotenv import load_dotenv
from groq import Groq
from schema import TicketInput, DiagnosticRAGOutput
from rag_services import chercher_dans_kb

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# On s'assure d'inclure le mot "JSON" explicitement dans les consignes
SYSTEM_PROMPT = """
Tu es un expert support informatique ITIL pour l'assistant 'mAlntenance & Assistance'.
Ton rôle est d'analyser le ticket utilisateur et le CONTEXTE issu de la base de connaissances (KB)[cite: 1].

Tu dois OBLIGATOIREMENT répondre au format JSON valide respectant les consignes suivantes :
- 'resume_probleme': Résumé très court du problème.
- 'categorie': Choisis parmi 'Comptes et authentification', 'Réseau et connectivité', 'Matériel informatique', 'Logiciels et applications', 'Imprimantes et périphériques', 'Droits d'accès', 'Cybersécurité', 'Autre ou indéterminé'[cite: 1].
- 'priorite': Choisis parmi 'Basse', 'Moyenne', 'Haute', 'Critique'[cite: 1].
- 'equipe': Choisis parmi 'Support N1', 'Réseau', 'Sécurité', 'Systèmes', 'Infrastructures'[cite: 1].
- 'confiance': Nombre réel (float) entre 0.1 et 1.0 (ex: 0.95)[cite: 1].
- 'sources': Liste des ID de documents trouvés (ex: ["KB-AUTH-01"])[cite: 1].
- 'decision_finale': 'resolution' (si trouvé), 'demande_information' ou 'escalade'[cite: 1].
- 'reponse_utilisateur': Rédige la solution destinée à l'utilisateur en terminant par la citation [Source: KB-XXX-YY][cite: 1].
"""

def traiter_ticket(ticket: TicketInput) -> DiagnosticRAGOutput:
    rag_res = chercher_dans_kb(ticket.description)
    
    user_prompt = f"""
    Rédige ta réponse au format JSON pour ce ticket :

    --- TICKET UTILISATEUR ---
    ID: {ticket.ticket_id}
    Description: {ticket.description}

    --- CONTEXTE BASE DE CONNAISSANCES (KB) ---
    {rag_res['contexte']}
    """

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.1,
        # Format JSON strict pour Groq
        response_format={"type": "json_object"}
    )

    contenu_json = completion.choices[0].message.content
    res_struct = DiagnosticRAGOutput.model_validate_json(contenu_json)

    if not rag_res["trouve"]:
        res_struct.sources = []
        if res_struct.decision_finale == "resolution":
            res_struct.decision_finale = "escalade"

    return res_struct