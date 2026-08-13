"use client";

import React from "react";
import Link from "next/link";
import { useTickets } from "@/context/TicketContext";
import { MOCK_INCIDENTS } from "@/data/incidents";
import { MOCK_TRACES } from "@/data/observability";
import { Reveal } from "@/components/shared/Reveal";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PriorityBadge } from "@/components/shared/PriorityBadge";
import { ConfidenceScore } from "@/components/shared/ConfidenceScore";
import { Button } from "@/components/ui/button";
import { CATEGORY_COLORS } from "@/config/categories";
import { TICKET_CATEGORIES } from "@/config/categories";
import {
  Ticket,
  AlertTriangle,
  Clock,
  Zap,
  Activity,
  PlusCircle,
} from "lucide-react";

export default function DashboardPage() {
  const { tickets } = useTickets();

  const totalTickets = tickets.length;
  const urgentTickets = tickets.filter((t) => t.priority === "Critique").length;

  return (
    <div className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-100">
            Tableau de Bord Support IT & Copilot IA
          </h2>
          <p className="text-xs text-slate-400">
            Vue d'ensemble en temps réel des tickets, performances IA et alertes d'infrastructure.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/tickets/new">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs gap-2">
              <PlusCircle className="w-4 h-4" />
              Nouveau Ticket
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid with CountUp Animation */}
      <Reveal className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Tickets Ouverts"
          value={totalTickets}
          description="Total pris en charge par l'IA"
          change="+12% ce jour"
          icon={Ticket}
          iconBg="bg-indigo-500/10 text-indigo-400"
        />

        <StatCard
          title="Tickets Urgents / Critiques"
          value={urgentTickets}
          description="Requiert attention immédiate"
          change={`${urgentTickets} en alerte`}
          changeType="negative"
          icon={AlertTriangle}
          iconBg="bg-slate-800 text-rose-400"
        />

        <StatCard
          title="Taux Résolution Auto IA"
          value="74 %"
          description="Résolus sans technicien N2"
          change="+5% vs mois dernier"
          icon={Zap}
          iconBg="bg-indigo-500/10 text-indigo-400"
        />

        <StatCard
          title="Temps Moyen Résolution"
          value="14 min"
          description="RAG + Outils automatiques"
          change="-8 min économisées"
          icon={Clock}
          iconBg="bg-indigo-500/10 text-indigo-400"
        />
      </Reveal>

      {/* Active Major Incidents Banner (if any) */}
      {MOCK_INCIDENTS.length > 0 && (
        <Reveal className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">
                  {MOCK_INCIDENTS[0].title}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300">
                  {MOCK_INCIDENTS[0].severity}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {MOCK_INCIDENTS[0].impact} — {MOCK_INCIDENTS[0].affectedUsers} utilisateurs affectés.
              </p>
            </div>
          </div>

          <Link href="/incidents">
            <Button size="sm" variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800 text-xs font-bold whitespace-nowrap">
              Voir l'incident actif
            </Button>
          </Link>
        </Reveal>
      )}

      {/* Main Grid: Recent Tickets & Activity Timeline */}
      <Reveal className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tickets Table (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-indigo-400" />
              Tickets Récents de la File Active
            </h3>
            <Link
              href="/tickets"
              className="text-xs font-semibold text-indigo-400 hover:underline"
            >
              Voir la liste complète ({totalTickets})
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                  <tr>
                    <th className="p-3.5">ID</th>
                    <th className="p-3.5">Titre</th>
                    <th className="p-3.5">Catégorie</th>
                    <th className="p-3.5">Priorité</th>
                    <th className="p-3.5">Statut</th>
                    <th className="p-3.5 text-right">Confiance IA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {tickets.slice(0, 6).map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="p-3.5 font-mono font-bold text-indigo-400">
                        <Link href={`/tickets/${t.id}`} className="hover:underline">
                          {t.id}
                        </Link>
                      </td>
                      <td className="p-3.5 max-w-xs">
                        <Link
                          href={`/tickets/${t.id}`}
                          className="font-bold text-slate-100 hover:text-indigo-400 line-clamp-1"
                        >
                          {t.title}
                        </Link>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {t.userName} ({t.userDepartment})
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded border text-[10px] font-semibold ${CATEGORY_COLORS[t.category]}`}>
                          {t.category}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <PriorityBadge priority={t.priority} />
                      </td>
                      <td className="p-3.5">
                        <StatusBadge status={t.status} />
                      </td>
                      <td className="p-3.5 text-right">
                        <ConfidenceScore score={t.aiAnalysis.confidence} showLabel={false} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Activity Timeline (1 Col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              Activité Récente & Traces
            </h3>
            <Link
              href="/observability"
              className="text-xs font-semibold text-indigo-400 hover:underline"
            >
              Traces →
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm space-y-4">
            <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
              {MOCK_TRACES.map((trace) => (
                <div key={trace.id} className="relative pl-7 text-xs space-y-0.5">
                  <span className="absolute left-1.5 top-1 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-slate-900" />
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-100">
                      {trace.action}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {trace.timestamp}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] line-clamp-2">
                    {trace.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Ticket Category Distribution Grid */}
      <Reveal className="space-y-4">
        <h3 className="text-base font-bold text-slate-100">
          Répartition des Incidents par Catégorie Métier ISPM
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TICKET_CATEGORIES.map((cat) => {
            const count = tickets.filter((t) => t.category === cat).length;
            return (
              <div
                key={cat}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900 flex flex-col justify-between space-y-2 hover:border-slate-700 transition-all"
              >
                <span className="text-xs font-medium text-slate-400 line-clamp-1">
                  {cat}
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-slate-100">
                    {count}
                  </span>
                  <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                    {totalTickets > 0 ? `${Math.round((count / totalTickets) * 100)}%` : "0%"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </div>
  );
}
