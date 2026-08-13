"use client";

import React, { use } from "react";
import Link from "next/link";
import { MOCK_INCIDENTS } from "@/data/incidents";
import { MOCK_TICKETS } from "@/data/tickets";
import { ArrowLeft, AlertTriangle, Users, Clock, Ticket } from "lucide-react";

export default function IncidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const inc = MOCK_INCIDENTS.find((i) => i.id === id) || MOCK_INCIDENTS[0];
  const linked = MOCK_TICKETS.filter((t) => inc.linkedTickets.includes(t.id));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/incidents"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux incidents
      </Link>

      <div className="rounded-2xl border border-rose-500/30 bg-white dark:bg-slate-900 p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-sm text-rose-500">
              {inc.id}
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-rose-500/20 text-rose-700 dark:text-rose-300">
              {inc.severity}
            </span>
          </div>

          <span className="text-xs text-slate-400">Début: {inc.startTime}</span>
        </div>

        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
          {inc.title}
        </h1>

        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          {inc.description}
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 dark:text-slate-100">Équipe Responsable:</span>
            <span className="text-indigo-500 font-semibold">{inc.assignedTeam}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 dark:text-slate-100">Impact Déclaré:</span>
            <span className="text-rose-500 font-semibold">{inc.impact}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 dark:text-slate-100">Utilisateurs affectés:</span>
            <span className="font-bold">{inc.affectedUsers} personnes</span>
          </div>
        </div>

        {/* Linked Tickets */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Ticket className="w-4 h-4 text-indigo-500" />
            Tickets Rattachés à cet Incident ({linked.length})
          </h3>

          <div className="space-y-2">
            {linked.map((t) => (
              <Link key={t.id} href={`/tickets/${t.id}`} className="block">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 flex items-center justify-between text-xs transition-colors">
                  <span className="font-bold text-indigo-500 font-mono">{t.id}</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{t.title}</span>
                  <span className="text-slate-400">{t.status}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
