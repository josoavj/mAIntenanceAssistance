# Rapport Technique Synthétique — mAlntenance & Assistance

**Projet Hackathon AI Engineering & ML — ISPM**
**Du:** 13 Août 2026
**Durée:** 8 heures (8h30 à 16h30)
---
### Membres du groupe

| Nom et prénom(s) | Classe | Numéro | GitHub |
| --- | --- | --- | --- |
| RAVOAHANGY Laza Francky | ESIIA5 | 03 | [francky9](https://github.com/francky9) |
| VONJINIAINA Josoa | ESIIA5 | 07 | [josoavj](https://github.com/josoavj) |
| RAMANIRAKARISON Tolotriniaina Ishmayah | ESIIA5 | 09 | [hayam-akarin](https://github.com/hayam-akarin) |
| ANDRIAMASINORO Aina Maminirina | ESIIA5 | 12 | [AinaMaminirina18](https://github.com/AinaMaminirina18) |
| RABEMANANTSOA Fanilonombana Diana | ESIIA5 | 13 | [DianaaRabe](https://github.com/DianaaRabe) |
| RAZANAJATOVO ANDRIANIMERINA Kinasaela | ESIIA5 | 16 | [Beeckss](https://github.com/Beeckss) |
| RASOANAIVO Aro Itokiana | ESIIA5 | 20 | [RAIRas-Design](https://github.com/RAIRas-Design) |
---

### 1. Approche choisie pour analyser et router les tickets

- **Architecture de classification :** Utilisation d'un LLM performant (*Llama-3.3-70b-versatile via Groq*) guidé par du *Structured Output* (Pydantic).
- **Routage automatique :** Le modèle extrait la catégorie ITIL (`Comptes`, `Réseau`, `Cybersécurité`, etc.), attribue la priorité (`Basse` à `Critique`) et assigne directement l'équipe de support compétente (ex: `Support N1`, `Sécurité`).

### 2. Fonctionnement du système RAG (Retrieval-Augmented Generation)

- **Base de connaissances (KB) :** Corpus de fiches au format Markdown stockées dans un Vector Store (*ChromaDB*).
- **Indexation :** Conversion vectorielle du contenu des fiches lors du démarrage via le script d'ingestion.
- **Recherche sémantique :** Recherche des *top-k* documents les plus pertinents basés sur la description du ticket utilisateur.
- **Génération ancrée :** Le contexte extrait est injecté dans le prompt système de Llama 3.3. Si une solution est trouvée, la réponse est citée explicitement avec son identifiant (`[Source: KB-XXX-YY]`). Sinon, le ticket est automatiquement escaladé.

### 3. Outils accessibles à l'agent

- **Vector Database (ChromaDB) :** Recherche vectorielle sémantique sur la base KB.
- **Validateur de Schéma (Pydantic) :** Contrainte de sortie structurée JSON.
- **Engine LLM (Groq API) :** Moteur d'inférence haute vitesse à faible latence.

### 4. Stratégie d'évaluation

- **Jeu de données de test :** Évaluation sur un jeu de tickets de test (`test_h2.py`) couvrant divers scénarios (connexion, panne réseau, demande de droits).
- **Métriques d'évaluation :**
  - **Précision du routage :** Correspondance exacte de la catégorie et de l'équipe attribuée.
  - **Fidélité RAG :** Vérification de la présence explicite de la source KB dans la réponse.
  - **Confiance :** Score estimé par le modèle (entre 0.0 et 1.0).

### 5. Mécanismes de sécurité

- **Analyse d'entrée :** Validation stricte des types de données saisies via Pydantic (`TicketInput`).
- **Gestion des erreurs :** Interception des erreurs d'API LLM et renvoi de réponses dégradées maîtrisées.
- **Isolation CORS :** Contrôle des accès inter-domaines au niveau de l'API FastAPI.

### 6. Limites connues du prototype
- **Dépendance réseau/API :** Dépendance vis-à-vis du service tiers Groq API.
- **Persistance mémoire :** Vector DB actuellement configurée en local/mémoire pour la démo Hackathon (non managée dans le cloud).

### 7. Liens de l'appli

- **mAIntenance** : [Visiter mAIntenance](https://maintenanceai-six.vercel.app)
