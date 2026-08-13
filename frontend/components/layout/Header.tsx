"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAV_ITEMS } from "@/config/navigation";
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  User,
  ShieldCheck,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface HeaderProps {
  onMobileOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileOpen }) => {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currentNav =
    MAIN_NAV_ITEMS.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
    ) || MAIN_NAV_ITEMS[0];

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };

  return (
    <header className="h-16 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 flex items-center justify-between transition-colors">
      {/* Left side: Mobile Toggle & Page Title / Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileOpen}
          className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">mAIntenance</span>
          <span className="text-xs text-slate-400">/</span>
          <h1 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            {currentNav.title}
          </h1>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un ticket, un équipement, un utilisateur ou une fiche KB..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-200 dark:bg-slate-700 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right side: Notifications, Theme Toggle, User Profile */}
      <div className="flex items-center gap-2.5">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-4 text-xs space-y-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  Notifications récentes
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  2 nouvelles
                </span>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-slate-200">
                  <p className="font-bold text-amber-600 dark:text-amber-400">
                    Alerte Sécurité Guardrail
                  </p>
                  <p className="text-[11px] mt-0.5">
                    Ticket TK-1004 bloqué suite à une tentative d'injection.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-slate-800 dark:text-slate-200">
                  <p className="font-bold text-blue-600 dark:text-blue-400">
                    Incident Majeur Actif
                  </p>
                  <p className="text-[11px] mt-0.5">
                    Panne switch VLAN 20 Bâtiment A attribué à l'équipe Infra.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Changer de thème"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
        </button>

        <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1" />

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Admin ISPM Support
            </span>
            <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
              AI Engineer & Technicien N2
            </span>
          </div>

          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-indigo-500/20">
            IS
          </div>
        </div>
      </div>
    </header>
  );
};
