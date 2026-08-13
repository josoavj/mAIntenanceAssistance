"use client";

import React, { use } from "react";
import Link from "next/link";
import { MOCK_USERS } from "@/data/users";
import { MOCK_TICKETS } from "@/data/tickets";
import { ArrowLeft, User, Mail, Building, Ticket, Laptop } from "lucide-react";

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const user = MOCK_USERS.find((u) => u.id === id) || MOCK_USERS[0];
  const userTickets = MOCK_TICKETS.filter((t) => t.userId === user.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        href="/users"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour à l'annuaire
      </Link>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-sm text-indigo-600 dark:text-indigo-400">
              {user.id}
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs uppercase font-bold bg-slate-100 dark:bg-slate-800">
              {user.role}
            </span>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              user.status === "Actif"
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-300"
                : "bg-rose-500/10 text-rose-600 border-rose-300"
            }`}
          >
            {user.status}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-xl flex items-center justify-center shadow-lg">
            {user.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {user.name}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {user.email} — {user.department}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 font-semibold">Équipements enregistrés</span>
            <p className="font-bold text-slate-900 dark:text-slate-100">
              {user.equipmentIds.length > 0 ? user.equipmentIds.join(", ") : "Aucun équipement lié"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-slate-400 font-semibold">Nombre total de tickets soumis</span>
            <p className="font-bold text-indigo-500 text-lg">{user.ticketCount}</p>
          </div>
        </div>

        {/* User Tickets History */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Ticket className="w-4 h-4 text-indigo-500" />
            Historique des Tickets de cet Utilisateur ({userTickets.length})
          </h3>

          {userTickets.length === 0 ? (
            <p className="text-xs text-slate-400 italic">Aucun ticket ouvert trouvé dans la base.</p>
          ) : (
            <div className="space-y-2">
              {userTickets.map((t) => (
                <div key={t.id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-500 font-mono">{t.id}</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100 max-w-xs truncate">{t.title}</span>
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
