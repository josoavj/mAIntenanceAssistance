"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_EQUIPMENT } from "@/data/equipment";
import { Laptop, Search, ExternalLink, HardDrive, Cpu, Wifi } from "lucide-react";

export default function EquipmentPage() {
  const [search, setSearch] = useState("");

  const filteredEquipment = MOCK_EQUIPMENT.filter(
    (eq) =>
      eq.name.toLowerCase().includes(search.toLowerCase()) ||
      eq.id.toLowerCase().includes(search.toLowerCase()) ||
      eq.assignedUserName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Laptop className="w-5 h-5 text-amber-500" />
          Inventaire des Équipements & Parc Informatique ISPM
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Suivi en temps réel de l'état des machines, serveurs, imprimantes et équipements réseau.
        </p>
      </div>

      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par équipement, modèle, nom de l'affectataire..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="p-3.5">ID Équipement</th>
                <th className="p-3.5">Nom / Modèle</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Utilisateur Affecté</th>
                <th className="p-3.5">Adresse IP / MAC</th>
                <th className="p-3.5">Statut</th>
                <th className="p-3.5 text-right">Dernière activité</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredEquipment.map((eq) => (
                <tr
                  key={eq.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="p-3.5 font-mono font-bold text-amber-600 dark:text-amber-400">
                    <Link href={`/equipment/${eq.id}`} className="hover:underline">
                      {eq.id}
                    </Link>
                  </td>
                  <td className="p-3.5">
                    <Link
                      href={`/equipment/${eq.id}`}
                      className="font-bold text-slate-900 dark:text-slate-100 hover:text-amber-500"
                    >
                      {eq.name}
                    </Link>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {eq.model} — {eq.location}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800">
                      {eq.type}
                    </span>
                  </td>
                  <td className="p-3.5 font-medium text-slate-700 dark:text-slate-300">
                    {eq.assignedUserName}
                  </td>
                  <td className="p-3.5 font-mono text-[11px] text-slate-500">
                    {eq.ipAddress}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        eq.status === "Opérationnel"
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-300"
                          : eq.status === "En panne"
                          ? "bg-rose-500/10 text-rose-600 border-rose-300"
                          : "bg-amber-500/10 text-amber-600 border-amber-300"
                      }`}
                    >
                      {eq.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right text-slate-400 text-[11px]">
                    {eq.lastActivity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
