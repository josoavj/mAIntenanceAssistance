import {
  AIAction,
  AIAnalysis,
  ExtractedInfo,
  TicketCategory,
  TicketPriority,
  TicketStatus,
  TicketTeam,
} from "@/types";
import { KNOWLEDGE_DOCS } from "@/data/knowledge.generated";
import { BackendDecision, DiagnosticRAGOutput } from "./types";

const KNOWN_DOC_IDS = new Set(KNOWLEDGE_DOCS.map((d) => d.id));

const CITATION = /\[\s*sources?\s*:[^\]]*\]/gi;

// reponse_utilisateur arrive tantôt en liste à puces, tantôt en un seul paragraphe.
// On privilégie le découpage par ligne, et on retombe sur les phrases sinon.
function splitIntoItems(text: string): string[] {
  const clean = text.replace(CITATION, " ").replace(/[ \t]+/g, " ");

  const lines = clean
    .split(/\r?\n/)
    .map((l) => l.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, "").trim())
    .filter(Boolean);

  if (lines.length > 1) return lines;

  return clean
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1);
}

// Le backend et le front n'utilisent pas les mêmes libellés (« et » vs « & »,
// « Basse » vs « Faible »…). Le LLM pouvant dériver, on normalise avant de comparer
// et on retombe sur une valeur sûre plutôt que de casser le rendu.
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

const CATEGORIES: Record<string, TicketCategory> = {
  "comptes et authentification": "Comptes & authentification",
  "reseau et connectivite": "Réseau & connectivité",
  "materiel informatique": "Matériel",
  "logiciels et applications": "Logiciels & applications",
  "imprimantes et peripheriques": "Imprimantes",
  "droits d'acces": "Droits d'accès",
  cybersecurite: "Cybersécurité",
  "autre ou indetermine": "Autre",
};

const PRIORITIES: Record<string, TicketPriority> = {
  basse: "Faible",
  moyenne: "Moyenne",
  haute: "Haute",
  critique: "Critique",
};

const TEAMS: Record<string, TicketTeam> = {
  "support n1": "Support Utilisateurs",
  reseau: "Réseau",
  securite: "Sécurité",
  systemes: "Niveau 2 / Systèmes",
  infrastructures: "Infrastructure",
};

const ACTIONS: Record<BackendDecision, AIAction> = {
  resolution: "resolution",
  demande_information: "information",
  escalade: "escalation",
};

export const mapCategory = (v: string, fallback: TicketCategory): TicketCategory =>
  CATEGORIES[normalize(v)] ?? fallback;

export const mapPriority = (v: string): TicketPriority =>
  PRIORITIES[normalize(v)] ?? "Moyenne";

export const mapTeam = (v: string): TicketTeam =>
  TEAMS[normalize(v)] ?? "Support Utilisateurs";

export const mapAction = (v: BackendDecision): AIAction => ACTIONS[v] ?? "escalation";

export const statusForAction = (action: AIAction): TicketStatus =>
  action === "information" ? "En attente d'information" : action === "escalation" ? "Escaladé" : "En cours";

// L'API ne renvoie pas de risques : on les dérive de la priorité et de la décision
// pour que la fiche reste lisible sans inventer d'information technique.
function risksFor(priority: TicketPriority, action: AIAction): string[] {
  const risks: string[] = [];

  if (priority === "Critique") risks.push("Interruption de service majeure — impact multi-utilisateurs possible");
  else if (priority === "Haute") risks.push("Activité du demandeur fortement dégradée");
  else if (priority === "Moyenne") risks.push("Gêne opérationnelle, contournement possible");

  if (action === "escalation") risks.push("Nécessite une intervention de niveau 2 : délai de résolution allongé");
  if (action === "information") risks.push("Diagnostic incomplet tant que le demandeur n'a pas répondu");

  return risks;
}

export function toAIAnalysis(
  res: DiagnosticRAGOutput,
  fallbackCategory: TicketCategory,
  extractedInfo: ExtractedInfo
): AIAnalysis {
  const action = mapAction(res.decision_finale);
  const priority = mapPriority(res.priorite);
  const confidence = Math.round(Math.min(Math.max(res.confiance, 0), 1) * 100);
  const items = splitIntoItems(res.reponse_utilisateur);

  // Le LLM cite parfois des fiches inexistantes (ex. KB-PRN-02) : sans ce filtre,
  // l'UI afficherait une source morte pointant vers un 404.
  const sources = res.sources.filter((id) => KNOWN_DOC_IDS.has(id));

  return {
    category: mapCategory(res.categorie, fallbackCategory),
    priority,
    team: mapTeam(res.equipe),
    confidence,
    reasoning: res.resume_probleme,
    extractedInfo,
    missingInformation: action === "information" ? items : [],
    // reponse_utilisateur est le seul texte adressé au demandeur : selon la décision
    // de l'agent, il se lit comme des questions de clarification ou comme des étapes.
    questionsToAsk: action === "information" ? items : [],
    diagnosis: res.diagnostic ?? res.resume_probleme,
    userResponse: res.reponse_utilisateur.replace(CITATION, "").trim(),
    risks: risksFor(priority, action),
    action,
    resolutionSteps: action === "information" ? [] : items,
    sources,
    humanValidationRequired: action === "escalation" || confidence < 50,
    validationReason:
      action === "escalation"
        ? "Escalade décidée par l'agent : validation humaine requise."
        : confidence < 50
          ? `Confiance faible (${confidence} %) : validation humaine requise.`
          : undefined,
  };
}
