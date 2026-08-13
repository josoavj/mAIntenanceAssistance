// Miroir exact de DiagnosticRAGOutput (backend/schema.py).
// Toute divergence ici doit être répercutée dans lib/api/mappers.ts.

export type BackendDecision = "resolution" | "demande_information" | "escalade";

export interface DiagnosticRAGOutput {
  resume_probleme: string;
  categorie: string;
  priorite: string;
  equipe: string;
  confiance: number;
  sources: string[];
  decision_finale: BackendDecision;
  reponse_utilisateur: string;
  diagnostic: string | null;
}

export interface TicketInput {
  ticket_id: string;
  description: string;
}
