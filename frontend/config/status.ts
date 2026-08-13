import { TicketPriority, TicketStatus, TicketTeam } from "@/types";

export const STATUS_CONFIG: Record<
  TicketStatus,
  { label: string; color: string; badgeVariant: string }
> = {
  Nouveau: {
    label: "Nouveau",
    color: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-800",
    badgeVariant: "sky",
  },
  Analyse: {
    label: "En cours d'analyse IA",
    color: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800 animate-pulse",
    badgeVariant: "amber",
  },
  "En attente d'information": {
    label: "Information requise",
    color: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800",
    badgeVariant: "purple",
  },
  "En cours": {
    label: "En cours de traitement",
    color: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800",
    badgeVariant: "blue",
  },
  Résolu: {
    label: "Résolu",
    color: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
    badgeVariant: "emerald",
  },
  Escaladé: {
    label: "Escaladé (Niveau 2 / Technicien)",
    color: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800",
    badgeVariant: "rose",
  },
};

export const PRIORITY_CONFIG: Record<
  TicketPriority,
  { label: string; color: string; dotColor: string }
> = {
  Critique: {
    label: "Critique",
    color: "bg-red-500/15 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800 font-semibold",
    dotColor: "bg-red-500 animate-ping",
  },
  Haute: {
    label: "Haute",
    color: "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-800",
    dotColor: "bg-orange-500",
  },
  Moyenne: {
    label: "Moyenne",
    color: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800",
    dotColor: "bg-amber-500",
  },
  Faible: {
    label: "Faible",
    color: "bg-slate-500/15 text-slate-700 dark:text-slate-400 border-slate-300 dark:border-slate-800",
    dotColor: "bg-slate-400",
  },
};

export const TEAMS_LIST: TicketTeam[] = [
  "Infrastructure",
  "Sécurité",
  "Support Utilisateurs",
  "Applications",
  "Réseau",
  "Niveau 2 / Systèmes",
];
