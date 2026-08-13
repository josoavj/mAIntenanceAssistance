"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAV_ITEMS } from "@/config/navigation";
import { Logo } from "@/components/shared/Logo";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onMobileClose,
}) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-[#090d16]/95 backdrop-blur-sm text-slate-300 border-r border-slate-800/60 flex flex-col transition-all duration-300 ease-in-out ${
          collapsed ? "w-20" : "w-64"
        } ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <Logo collapsed={collapsed} />

          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            title={collapsed ? "Agrandir le menu" : "Réduire le menu"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items List */}
        <div
          data-lenis-prevent
          className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800"
        >
          {MAIN_NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 font-semibold"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                }`}
                title={collapsed ? item.title : undefined}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                  }`}
                />

                {!collapsed && <span className="truncate">{item.title}</span>}

                {/* Badge if present */}
                {item.badge && (
                  <span
                    className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.badgeVariant
                        ? item.badgeVariant
                        : isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-800 text-slate-300"
                    } ${collapsed ? "absolute top-1 right-1 px-1 py-0 text-[8px]" : ""}`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer / ISPM AI Copilot Status */}
        <div className="p-3 border-t border-slate-800 shrink-0">
          {!collapsed ? (
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border border-indigo-500/30 text-xs space-y-2">
              <div className="flex items-center justify-between text-indigo-300">
                <span className="font-bold flex items-center gap-1.5">
                  {/* <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> */}
                  Moteur RAG ISPM
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                LLM & RAG Vectoriel local prêt pour raccordement backend.
              </p>
            </div>
          ) : (
            <div className="flex justify-center p-1">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" title="Moteur IA Actif" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
