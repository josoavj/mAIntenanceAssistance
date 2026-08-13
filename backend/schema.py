from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from pydantic import BaseModel, Field

class TicketInput(BaseModel):
    ticket_id: str = Field(default_factory=lambda: f"TCK-{uuid.uuid4().hex[:6].upper()}")
    description: str
    utilisateur_id: Optional[str] = None

class TicketClassification(BaseModel):
    categorie: Literal[
        "Comptes et authentification",
        "Réseau et connectivité",
        "Matériel informatique",
        "Logiciels et applications",
        "Imprimantes et périphériques",
        "Droits d'accès",
        "Cybersécurité",
        "Autre ou indéterminé"
    ] = Field(description="La catégorie de l'incident[span_0](start_span)[span_0](end_span)")
    priorite: Literal["Basse", "Moyenne", "Haute", "Critique"] = Field(description="Niveau de priorité[span_1](start_span)[span_1](end_span)")
    equipe: str = Field(description="L'équipe assignée au traitement[span_2](start_span)[span_2](end_span)")
    confiance: float = Field(description="Score de confiance entre 0.0 et 1.0[span_3](start_span)[span_3](end_span)")
    informations_manquantes: List[str] = Field(default=[], description="Liste des infos à demander si incomplet[span_4](start_span)[span_4](end_span)")
    resume: str = Field(description="Résumé court en une phrase")

class DiagnosticRAGOutput(BaseModel):
    resume_probleme: str = Field(description="Résumé court du problème")
    categorie: str = Field(description="Catégorie identifiée")
    priorite: str = Field(description="Niveau de priorité[cite: 1]")
    equipe: str = Field(description="Équipe destinataire[cite: 1]")
    confiance: float = Field(description="Score de confiance entre 0.0 et 1.0[cite: 1]")
    sources: List[str] = Field(description="IDs des documents consultés (ex: KB-NET-04)[cite: 1]")
    diagnostic: str = Field(description="Explication ou étapes de résolution proposées[cite: 1]")
    decision_finale: Literal["resolution", "demande_information", "escalade"] = Field(
        description="Décision finale prise par l'assistant[cite: 1]"
    )
    reponse_utilisateur: str = Field(
        description="Message complet destiné à l'utilisateur, incluant la citation explicite des sources entre crochets[cite: 1]"
    )