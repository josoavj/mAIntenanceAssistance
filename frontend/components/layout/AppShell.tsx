"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { BackgroundBeams } from "@/components/ui/background-beams";

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    /**
     * Root shell — position:relative so BackgroundBeams (absolute) is
     * correctly contained. bg-[#090d16] is the base dark colour.
     * The beams layer sits fixed behind ALL content via z-0.
     */
    <div className="relative min-h-screen bg-[#090d16] text-slate-100 flex overflow-x-hidden">

      {/* ── Fixed animated background — behind everything ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundBeams />
      </div>

      {/* ── Sidebar ── */}
      {/*
        z-50 (> main column's z-10): the main column's `lg:pl-64` padding box
        overlaps the sidebar, so equal z-index would let it swallow the clicks.
      */}
      <div className="relative z-50">
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
      </div>

      {/* ── Main column ── */}
      <div
        className={`relative z-10 flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          collapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        {/*
          Header z-[60] — must beat hero's z-30 boxes + any stacking context
          from page content so it stays readable while scrolling.
        */}
        <div className="sticky top-0 z-[60]">
          <Header onMobileOpen={() => setMobileOpen(true)} />
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-slate-800 py-4 px-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>mAIntenance &amp; Assistance</strong> — Project Exam Machine Learning &amp; AI Engineering 2026
          </div>
          <div>ISPM Madagascar — Institut Supérieur Polytechnique de Madagascar</div>
        </footer>
      </div>
    </div>
  );
};
