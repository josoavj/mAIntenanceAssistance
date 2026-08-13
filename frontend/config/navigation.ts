import {
  LayoutDashboard,
  Ticket,
  Bot,
  BookOpen,
  Laptop,
  Users,
  AlertTriangle,
  Activity,
  ShieldAlert,
  Settings,
  PlusCircle,
  Home,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    title: "Accueil",
    href: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tickets",
    href: "/tickets",
    icon: Ticket,
    badge: "14",
  },
  {
    title: "Nouveau Ticket",
    href: "/tickets/new",
    icon: PlusCircle,
  },
  {
    title: "Assistant IA Copilot",
    href: "/assistant",
    icon: Bot,
    badge: "IA",
    badgeVariant: "bg-purple-500/20 text-purple-600 dark:text-purple-300",
  },
  {
    title: "Base de Connaissances",
    href: "/knowledge",
    icon: BookOpen,
  },
  {
    title: "Équipements",
    href: "/equipment",
    icon: Laptop,
  },
  {
    title: "Utilisateurs",
    href: "/users",
    icon: Users,
  },
  {
    title: "Incidents Actifs",
    href: "/incidents",
    icon: AlertTriangle,
    badge: "2",
    badgeVariant: "bg-red-500/20 text-red-600 dark:text-red-300",
  },
  {
    title: "Observabilité",
    href: "/observability",
    icon: Activity,
  },
  {
    title: "Sécurité & Guardrails",
    href: "/security",
    icon: ShieldAlert,
    badge: "Attention",
    badgeVariant: "bg-amber-500/20 text-amber-600 dark:text-amber-300",
  },
  {
    title: "Paramètres",
    href: "/settings",
    icon: Settings,
  },
];
