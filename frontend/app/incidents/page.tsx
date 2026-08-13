"use client";

import React from "react";
import Link from "next/link";
import { MOCK_INCIDENTS } from "@/data/incidents";
import { AlertTriangle, Clock, Users, ExternalLink, ShieldAlert } from "lucide-react";

export default function IncidentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-500" />
          Gestion des Incidents Système Majeurs & Pannes
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Suivi des pannes d'infrastructures affectant simultanément plusieurs utilisateurs ou bâtiments.
        </p>
      </div>

      <div className="space-y-4">
        {MOCK_INCIDENTS.map((inc) => (
          <div
            key={inc.id}
            className={`p-6 rounded-2xl border ${
              inc.severity === "Critique"
                ? "border-rose-500/40 bg-rose-500/5 dark:bg-slate-900"
                : "border-amber-500/40 bg-amber-500/5 dark:bg-slate-900"
            } shadow-sm space-y-4`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-xs text-rose-500">
                  {inc.id}
                </span>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-rose-500/20 text-rose-700 dark:text-rose-300">
                  {inc.severity}
                </span>
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {inc.status}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Début: {inc.startTime}
                </span>
                <span>•</span>
                <span className="font-semibold text-indigo-500">Équipe: {inc.assignedTeam}</span>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {inc.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {inc.description}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 flex items-center justify-between text-xs">
              <span className="font-semibold text-rose-600 dark:text-rose-400">
                Impact: {inc.impact}
              </span>
              <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-indigo-500" />
                {inc.affectedUsers} utilisateurs affectés
              </span>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">
                Tickets rattachés : {inc.linkedTickets.join(", ")}
              </span>

              <Link
                href={`/incidents/${inc.id}`}
                className="inline-flex items-center gap-1 font-bold text-rose-600 dark:text-rose-400 hover:underline text-xs"
              >
                Détail de l'incident
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
