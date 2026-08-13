"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTickets } from "@/context/TicketContext";
import { TICKET_CATEGORIES } from "@/config/categories";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PriorityBadge } from "@/components/shared/PriorityBadge";
import { ConfidenceScore } from "@/components/shared/ConfidenceScore";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { CATEGORY_COLORS } from "@/config/categories";
import {
  Ticket as TicketIcon,
  Search,
  PlusCircle,
} from "lucide-react";

export default function TicketsPage() {
  const { tickets } = useTickets();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket.id.toLowerCase().includes(search.toLowerCase()) ||
      ticket.userName.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || ticket.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || ticket.status === selectedStatus;
    const matchesPriority =
      selectedPriority === "all" || ticket.priority === selectedPriority;

    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* Header & New Ticket Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
            <TicketIcon className="w-5 h-5 text-indigo-400" />
            Gestion des Tickets IT & Traitement IA
          </h2>
          <p className="text-xs text-slate-400">
            Consultation, recherche et filtrage des demandes prises en charge par l'assistant copilot.
          </p>
        </div>

        <Link href="/tickets/new">
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs gap-2">
            <PlusCircle className="w-4 h-4" />
            Créer un ticket
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par ID, titre, nom..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-800 bg-slate-950 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-800 bg-slate-950 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Toutes les catégories</option>
            {TICKET_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-800 bg-slate-950 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="Nouveau">Nouveau</option>
            <option value="Analyse">Analyse IA</option>
            <option value="En attente d'information">En attente d'info</option>
            <option value="En cours">En cours</option>
            <option value="Résolu">Résolu</option>
            <option value="Escaladé">Escaladé</option>
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-800 bg-slate-950 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Toutes les priorités</option>
            <option value="Critique">Critique</option>
            <option value="Haute">Haute</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Faible">Faible</option>
          </select>
        </div>
      </div>

      {/* Tickets Table */}
      {filteredTickets.length === 0 ? (
        <EmptyState
          title="Aucun ticket trouvé"
          description="Aucun ticket ne correspond aux filtres de recherche sélectionnés."
          actionText="Réinitialiser les filtres"
          onAction={() => {
            setSearch("");
            setSelectedCategory("all");
            setSelectedStatus("all");
            setSelectedPriority("all");
          }}
        />
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="p-3.5">ID Ticket</th>
                  <th className="p-3.5">Sujet & Demandeur</th>
                  <th className="p-3.5">Catégorie</th>
                  <th className="p-3.5">Priorité</th>
                  <th className="p-3.5">Statut</th>
                  <th className="p-3.5">Équipe Assignée</th>
                  <th className="p-3.5">Confiance IA</th>
                  <th className="p-3.5 text-right">Créé le</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredTickets.map((t) => (
                  <tr
                    key={t.id}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-3.5 font-mono font-bold text-indigo-400 whitespace-nowrap">
                      <Link href={`/tickets/${t.id}`} className="hover:underline">
                        {t.id}
                      </Link>
                    </td>
                    <td className="p-3.5 max-w-sm">
                      <Link
                        href={`/tickets/${t.id}`}
                        className="font-bold text-slate-100 hover:text-indigo-400 transition-colors line-clamp-1"
                      >
                        {t.title}
                      </Link>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {t.userName} ({t.userDepartment})
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-semibold whitespace-nowrap ${CATEGORY_COLORS[t.category]}`}>
                        {t.category}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <PriorityBadge priority={t.priority} />
                    </td>
                    <td className="p-3.5">
                      <StatusBadge status={t.status} />
                    </td>
                    <td className="p-3.5 text-slate-300 font-medium">
                      {t.assignedTeam}
                    </td>
                    <td className="p-3.5">
                      <ConfidenceScore score={t.aiAnalysis.confidence} showLabel={false} />
                    </td>
                    <td className="p-3.5 text-right text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {t.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
