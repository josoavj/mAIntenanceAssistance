import { Incident } from "@/types";

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: "INC-2026-001",
    title: "Perturbation Majeure Switch Bâtiment Principal (VLAN 20)",
    severity: "Critique",
    status: "En cours",
    impact: "Perte totale d'accès réseau pour 120 postes et laboratoires",
    affectedUsers: 120,
    startTime: "2026-08-13 08:00",
    assignedTeam: "Réseau",
    description:
      "Une boucle de commutation ou une défaillance physique sur le switch principal du bâtiment A provoque des tempêtes de broadcast et le blocage du trafic VLAN 20.",
    linkedTickets: ["TK-1002", "TK-1008"],
  },
  {
    id: "INC-2026-002",
    title: "Lenteur Service d'Impression Centralisé (Spooler Cluster)",
    severity: "Majeure",
    status: "Investigation",
    impact: "Les impressions mettent plus de 15 minutes à être traitées",
    affectedUsers: 45,
    startTime: "2026-08-13 08:15",
    assignedTeam: "Support Utilisateurs",
    description:
      "Accumulation de travaux corrompus dans la file d'attente du serveur d'impression virtuel.",
    linkedTickets: ["TK-1001"],
  },
];
