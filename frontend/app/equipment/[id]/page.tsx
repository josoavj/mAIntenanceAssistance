"use client";

import React, { use } from "react";
import Link from "next/link";
import { MOCK_EQUIPMENT } from "@/data/equipment";
import { MOCK_TICKETS } from "@/data/tickets";
import { ArrowLeft, Laptop, Cpu, Wifi, MapPin, Clock, Ticket } from "lucide-react";

export default function EquipmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const eq = MOCK_EQUIPMENT.find((e) => e.id === id) || MOCK_EQUIPMENT[0];
  const linkedTickets = MOCK_TICKETS.filter((t) => t.equipmentId === eq.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/equipment"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux équipements
      </Link>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-sm text-amber-600 dark:text-amber-400">
              {eq.id}
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs uppercase font-bold bg-slate-100 dark:bg-slate-800">
              {eq.type}
            </span>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              eq.status === "Opérationnel"
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-300"
                : "bg-rose-500/10 text-rose-600 border-rose-300"
            }`}
          >
            {eq.status}
          </span>
        </div>

        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
          {eq.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 font-semibold">Modèle</span>
            <p className="font-bold text-slate-900 dark:text-slate-100">{eq.model}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 font-semibold">Affecté à</span>
            <p className="font-bold text-slate-900 dark:text-slate-100">{eq.assignedUserName}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 font-semibold">Localisation</span>
            <p className="font-bold text-slate-900 dark:text-slate-100">{eq.location}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 font-semibold">Adresse IP</span>
            <p className="font-mono font-bold text-indigo-500">{eq.ipAddress || "Non attribuée"}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 font-semibold">Adresse MAC</span>
            <p className="font-mono font-bold text-slate-700 dark:text-slate-300">{eq.macAddress || "Non disponible"}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 font-semibold">Dernière Activité</span>
            <p className="font-bold text-slate-900 dark:text-slate-100">{eq.lastActivity}</p>
          </div>
        </div>

        {/* Linked Tickets */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Ticket className="w-4 h-4 text-amber-500" />
            Historique des Tickets Rattachés à cet Équipement ({linkedTickets.length})
          </h3>

          {linkedTickets.length === 0 ? (
            <p className="text-xs text-slate-400 italic">Aucun incident récent n'a été ouvert pour cette machine.</p>
          ) : (
            <div className="space-y-2">
              {linkedTickets.map((t) => (
                <div key={t.id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-500 font-mono">{t.id}</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{t.title}</span>
                  <span className="text-slate-400">{t.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
