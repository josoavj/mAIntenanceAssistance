"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_USERS } from "@/data/users";
import { Users, Search, ExternalLink, Mail, Building } from "lucide-react";

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const filteredUsers = MOCK_USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-500" />
          Annuaire des Utilisateurs & Personnel ISPM
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Liste des enseignants, chercheurs, administratifs et comptes utilisateurs enregistrés.
        </p>
      </div>

      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, email, département..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
                  {user.id}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    user.status === "Actif"
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-300"
                      : "bg-rose-500/10 text-rose-600 border-rose-300"
                  }`}
                >
                  {user.status}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {user.name}
                </h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
                  {user.role}
                </p>
              </div>

              <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{user.department}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-semibold">
                {user.ticketCount} ticket(s) ouvert(s)
              </span>

              <Link
                href={`/users/${user.id}`}
                className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline text-xs"
              >
                Fiche utilisateur
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
