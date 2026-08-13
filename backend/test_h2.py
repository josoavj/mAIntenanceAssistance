# test_h2.py
from ingest import charger_corpus_kb
from classifier import traiter_ticket
from schema import TicketInput

def execution_tests_h2():
    print("=" * 60)
    print(" ÉTAPE 1 : Indexation des fichiers Markdown dans ChromaDB")
    print("=" * 60)
    
    # Ingest les fiches depuis le sous-dossier corpus_kb
    charger_corpus_kb(kb_root_path="./data/corpus_kb")

    print("\n" + "=" * 60)
    print(" ÉTAPE 2 : Exécution des tests de qualification RAG")
    print("=" * 60)

    # Jeux de tests simulant les besoins du sujet
    tickets_de_test = [
        TicketInput(
            ticket_id="TCK-AUTH-01", 
            description="J'ai oublié mon mot de passe pour me connecter à ma session Windows ce matin."
        ),
        TicketInput(
            ticket_id="TCK-NET-01", 
            description="Je n'ai plus du tout d'accès réseau ni internet depuis mon poste de travail."
        ),
        TicketInput(
            ticket_id="TCK-SEC-01", 
            description="J'ai reçu un e-mail bizarre me demandant de cliquer sur un lien pour mettre à jour mes identifiants."
        ),
        TicketInput(
            ticket_id="TCK-UNKNOWN-01", 
            description="Quelqu'un a renversé son jus de pomme sur la moquette du couloir du 3ème étage."
        )
    ]

    for ticket in tickets_de_test:
        print(f"\n [TICKET: {ticket.ticket_id}]")
        print(f"   Demande : \"{ticket.description}\"")
        
        # Traitement
        res = traiter_ticket(ticket)
        
        # Validation des résultats
        print(f"   ► Catégorie   : {res.categorie}")
        print(f"   ► Priorité    : {res.priorite}")
        print(f"   ► Équipe      : {res.equipe}")
        print(f"   ► Confiance   : {res.confiance}")
        print(f"   ► Décision    : {res.decision_finale}")
        print(f"   ► Sources (JSON): {res.sources}")
        print(f"   Réponse    : {res.reponse_utilisateur}")
        print("-" * 60)

if __name__ == "__main__":
    execution_tests_h2()
