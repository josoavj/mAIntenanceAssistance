import { TicketCategory } from "@/types";

export const TICKET_CATEGORIES: TicketCategory[] = [
  "Comptes & authentification",
  "Réseau & connectivité",
  "Matériel",
  "Logiciels & applications",
  "Imprimantes",
  "Droits d'accès",
  "Cybersécurité",
  "Autre",
];

export const CATEGORY_COLORS: Record<TicketCategory, string> = {
  "Comptes & authentification": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  "Réseau & connectivité": "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  "Matériel": "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  "Logiciels & applications": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  "Imprimantes": "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800",
  "Droits d'accès": "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
  "Cybersécurité": "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800",
  "Autre": "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800",
};
