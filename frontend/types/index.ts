export type TicketCategory =
  | "Comptes & authentification"
  | "Réseau & connectivité"
  | "Matériel"
  | "Logiciels & applications"
  | "Imprimantes"
  | "Droits d'accès"
  | "Cybersécurité"
  | "Autre";

export type TicketPriority = "Critique" | "Haute" | "Moyenne" | "Faible";

export type TicketStatus =
  | "Nouveau"
  | "Analyse"
  | "En attente d'information"
  | "En cours"
  | "Résolu"
  | "Escaladé";

export type TicketTeam =
  | "Infrastructure"
  | "Sécurité"
  | "Support Utilisateurs"
  | "Applications"
  | "Réseau"
  | "Niveau 2 / Systèmes";

export type AIAction = "resolution" | "information" | "escalation";

export interface ToolCall {
  id: string;
  toolName: string;
  status: "success" | "warning" | "error" | "pending";
  timestamp: string;
  params: Record<string, unknown>;
  result: Record<string, unknown> | string;
}

export interface ExtractedInfo {
  user?: string;
  equipment?: string;
  app?: string;
  symptoms?: string;
  onset?: string;
  impact?: string;
  attemptedFixes?: string;
}

export interface AIAnalysis {
  category: TicketCategory;
  priority: TicketPriority;
  team: TicketTeam;
  confidence: number; // 0 - 100
  reasoning: string;
  extractedInfo: ExtractedInfo;
  missingInformation: string[];
  questionsToAsk: string[];
  diagnosis: string;
  risks: string[];
  action: AIAction;
  resolutionSteps: string[];
  sources: string[]; // Document IDs
  humanValidationRequired: boolean;
  validationReason?: string;
  isBlocked?: boolean;
  blockReason?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  userId: string;
  userName: string;
  userEmail: string;
  userDepartment: string;
  equipmentId?: string;
  equipmentName?: string;
  appOrService?: string;
  symptoms?: string;
  onset?: string;
  impact?: string;
  attemptedFixes?: string;
  hasAttachment?: boolean;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  assignedTeam: TicketTeam;
  createdAt: string;
  updatedAt: string;
  aiAnalysis: AIAnalysis;
  toolCalls: ToolCall[];
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: TicketCategory;
  type:
    | "procédure"
    | "fiche technique"
    | "règle de sécurité"
    | "solution issue d'un ancien ticket"
    | "procédure d'escalade";
  content: string;
  relevance?: number;
  updatedAt: string;
  tags: string[];
  usedByAI?: boolean;
  author?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  equipmentIds: string[];
  ticketCount: number;
  status: "Actif" | "Inactif" | "Suspendu";
  avatar?: string;
}

export interface Equipment {
  id: string;
  name: string;
  type:
    | "PC Desktop"
    | "Laptop"
    | "Imprimante"
    | "Serveur"
    | "Routeur"
    | "Switch"
    | "Smartphone";
  model: string;
  assignedUserId: string;
  assignedUserName: string;
  status: "Opérationnel" | "En panne" | "En maintenance" | "Remplacé";
  lastActivity: string;
  ipAddress?: string;
  macAddress?: string;
  location?: string;
}

export interface Incident {
  id: string;
  title: string;
  severity: "Critique" | "Majeure" | "Mineure";
  status: "En cours" | "Investigation" | "Résolu" | "Surveillance";
  impact: string;
  affectedUsers: number;
  startTime: string;
  assignedTeam: TicketTeam;
  description: string;
  linkedTickets: string[];
}

export interface ObservationTrace {
  id: string;
  ticketId?: string;
  timestamp: string;
  action: string;
  details: string;
  latencyMs: number;
  tokenCount: number;
  estimatedCostUSD: number;
  status: "success" | "error" | "warning";
  input?: string;
  output?: string;
  toolName?: string;
  toolParams?: string;
  toolResult?: string;
}

export interface SecurityEvent {
  id: string;
  timestamp: string;
  eventType:
    | "Prompt Injection"
    | "Action bloquée"
    | "Validation Humaine"
    | "Accès Sensible"
    | "Données Personnelles";
  severity: "Élevée" | "Moyenne" | "Faible";
  ticketId?: string;
  user: string;
  description: string;
  status: "Bloqué" | "En attente de validation" | "Validé" | "Rejeté";
  mitigation?: string;
}
