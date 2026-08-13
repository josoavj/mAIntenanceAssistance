"use client";

import React, { useState } from "react";
import { MOCK_TRACES } from "@/data/observability";
import { ObservationTrace } from "@/types";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Zap,
  Clock,
  DollarSign,
  Cpu,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Code,
  Layers,
} from "lucide-react";

export default function ObservabilityPage() {
  const [selectedTrace, setSelectedTrace] = useState<ObservationTrace | null>(
    MOCK_TRACES[0]
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-500" />
          Observabilité, Métriques & Traces Téléfériques LLM
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Supervision en temps réel de la latence, des coûts d'API, de la consommation de tokens et des exécutions d'outils.
        </p>
      </div>

      {/* Observability Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Requêtes Totales"
          value="1,420"
          description="Invocations du pipeline IA"
          change="+18% ce jour"
          icon={Activity}
          iconBg="bg-blue-500/10 text-blue-500"
        />

        <StatCard
          title="Latence Moyenne"
          value="340 ms"
          description="Temps moyen de réponse"
          change="-45ms opti RAG"
          icon={Clock}
          iconBg="bg-purple-500/10 text-purple-500"
        />

        <StatCard
          title="Tokens Consommés"
          value="184,500"
          description="Inférence LLM locale & RAG"
          change="~ 0.0002$/req"
          icon={Cpu}
          iconBg="bg-amber-500/10 text-amber-500"
        />

        <StatCard
          title="Coût Estimé"
          value="0.38 $"
          description="Simulé sur l'ensemble du projet"
          change="Budget maîtrisé"
          icon={DollarSign}
          iconBg="bg-emerald-500/10 text-emerald-500"
        />
      </div>

      {/* Traces Timeline & Trace Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline (1 Col) */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Flux des Traces d'Exécution
          </h3>

          <div className="space-y-2">
            {MOCK_TRACES.map((trace) => {
              const isSelected = selectedTrace?.id === trace.id;
              return (
                <button
                  key={trace.id}
                  onClick={() => setSelectedTrace(trace)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-500/10 dark:bg-indigo-950/40 shadow-sm"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
                      {trace.id}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {trace.timestamp}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-1">
                    {trace.action}
                  </h4>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-2">
                    <span>Latence: {trace.latencyMs} ms</span>
                    <span>Tokens: {trace.tokenCount}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Trace Inspector (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Inspecteur Détaillé de la Trace Sélectionnée
          </h3>

          {selectedTrace ? (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    Trace ID: {selectedTrace.id}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                    {selectedTrace.action}
                  </h3>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    selectedTrace.status === "success"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : selectedTrace.status === "warning"
                      ? "bg-amber-500/10 text-amber-600"
                      : "bg-rose-500/10 text-rose-600"
                  }`}
                >
                  {selectedTrace.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 font-semibold">Latence totale</span>
                  <p className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                    {selectedTrace.latencyMs} ms
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 font-semibold">Tokens Prompt + Completion</span>
                  <p className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                    {selectedTrace.tokenCount}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 font-semibold">Coût estimé</span>
                  <p className="font-bold text-emerald-500 mt-0.5">
                    ${selectedTrace.estimatedCostUSD}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Description de l'action
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed p-3 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
                  {selectedTrace.details}
                </p>
              </div>

              {selectedTrace.input && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-indigo-500" />
                    Input Prompt / Vector Payload
                  </span>
                  <pre className="p-3 rounded-xl bg-slate-900 text-slate-200 text-xs overflow-x-auto font-mono">
                    {selectedTrace.input}
                  </pre>
                </div>
              )}

              {selectedTrace.output && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-emerald-500" />
                    Output LLM Response / Result
                  </span>
                  <pre className="p-3 rounded-xl bg-slate-900 text-emerald-400 text-xs overflow-x-auto font-mono">
                    {selectedTrace.output}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400">Sélectionnez une trace pour l'inspecter.</p>
          )}
        </div>
      </div>
    </div>
  );
}
