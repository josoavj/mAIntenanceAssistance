"use client";

import React from "react";
import Link from "next/link";
import { MOCK_SECURITY_EVENTS } from "@/data/security";
import { StatCard } from "@/components/shared/StatCard";
import { HumanValidationCard } from "@/components/tickets/HumanValidationCard";
import { Button } from "@/components/ui/button";
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  UserCheck,
  AlertTriangle,
  FileWarning,
  Eye,
} from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          Sécurité, Guardrails LLM & Garde-Fous ISPM
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Supervision des attaques par injection, des garde-fous de sécurité et des actions nécessitant une confirmation humaine.
        </p>
      </div>

      {/* Security Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Injections Détectées"
          value="1"
          description="Prompt injection bloqué par Guardrail"
          change="Attaque TK-1004 neutralisée"
          changeType="negative"
          icon={ShieldAlert}
          iconBg="bg-rose-500/10 text-rose-500"
        />

        <StatCard
          title="Actions Bloquées"
          value="3"
          description="Invocations d'outils refusées sans droits"
          change="0 fuite de privilèges"
          icon={Lock}
          iconBg="bg-amber-500/10 text-amber-500"
        />

        <StatCard
          title="Validations Humaines"
          value="2"
          description="Opérations sensibles en attente"
          change="Conforme politique AD"
          icon={UserCheck}
          iconBg="bg-blue-500/10 text-blue-500"
        />

        <StatCard
          title="Score de Sécurité Guardrail"
          value="100 %"
          description="Filtrage strict actif"
          change="100% conformité"
          icon={ShieldCheck}
          iconBg="bg-emerald-500/10 text-emerald-500"
        />
      </div>

      {/* Human Validation Queue Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-amber-500" />
          Actions Sensibles en Attente de Validation Humaine
        </h3>

        <div className="space-y-4">
          <HumanValidationCard
            reason="Ticket TK-1004 : Tentative d'injection d'instructions directes 'Ignore previous rules'. Seul le RSSI peut valider ou purger la session."
            ticketId="TK-1004"
          />

          <HumanValidationCard
            reason="Ticket TK-1003 : Demande de réinitialisation de mot de passe Active Directory et déverrouillage de compte sensible Finance. Confirmation humaine préalable requise."
            ticketId="TK-1003"
          />
        </div>
      </div>

      {/* Security Logs & Events Table */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <FileWarning className="w-4 h-4 text-rose-500" />
          Journal des Événements de Sécurité & Attaques Bloquées
        </h3>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold">
                <tr>
                  <th className="p-3.5">ID Événement</th>
                  <th className="p-3.5">Horodatage</th>
                  <th className="p-3.5">Type d'événement</th>
                  <th className="p-3.5">Gravité</th>
                  <th className="p-3.5">Utilisateur / Origine</th>
                  <th className="p-3.5">Statut Guardrail</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {MOCK_SECURITY_EVENTS.map((evt) => (
                  <tr
                    key={evt.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-3.5 font-mono font-bold text-amber-600 dark:text-amber-400">
                      {evt.id}
                    </td>
                    <td className="p-3.5 text-slate-400 font-mono text-[11px]">
                      {evt.timestamp}
                    </td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">
                      {evt.eventType}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          evt.severity === "Élevée"
                            ? "bg-rose-500/10 text-rose-600"
                            : "bg-amber-500/10 text-amber-600"
                        }`}
                      >
                        {evt.severity}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">
                      {evt.user}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300">
                        {evt.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      {evt.ticketId && (
                        <Link
                          href={`/tickets/${evt.ticketId}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-indigo-500 hover:underline"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Voir ticket
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
