# schema.py
from pydantic import BaseModel, Field
from typing import List, Literal, Optional

class TicketInput(BaseModel):
    ticket_id: str = Field(default="TCK-101", description="ID unique du ticket")
    description: str = Field(description="Description détaillée du problème")

class DiagnosticRAGOutput(BaseModel):
    resume_probleme: str = Field(description="Résumé très court du problème")
    categorie: str = Field(description="Catégorie ITIL")
    priorite: str = Field(description="Niveau de priorité")
    equipe: str = Field(description="Équipe destinataire")
    confiance: float = Field(description="Score de confiance entre 0.0 et 1.0")
    sources: List[str] = Field(description="IDs des fiches KB consultées")
    decision_finale: Literal["resolution", "demande_information", "escalade"] = Field(
        description="Décision finale"
    )
    reponse_utilisateur: str = Field(description="Réponse à transmettre")
    diagnostic: Optional[str] = Field(
        default=None, 
        description="Explication technique interne (optionnelle)"
    )