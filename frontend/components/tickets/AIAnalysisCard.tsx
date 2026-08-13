"use client";

import React from "react";
import { AIAnalysis } from "@/types";
import { ConfidenceScore } from "@/components/shared/ConfidenceScore";
import { PriorityBadge } from "@/components/shared/PriorityBadge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  HelpCircle,
  Cpu,
  Layers,
  ShieldAlert,
  MessageSquareText,
} from "lucide-react";

export interface AIAnalysisCardProps {
  analysis: AIAnalysis;
  onAskQuestions?: () => void;
}

export const AIAnalysisCard: React.FC<AIAnalysisCardProps> = ({
  analysis,
  onAskQuestions,
}) => {
  return (
    <div className="space-y-6">
      {/* Main Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-slate-100 shadow-sm border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100">Compréhension & Diagnostic IA Copilot</h3>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-slate-800 text-indigo-400 border border-slate-700">
                  RAG & Guardrail Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Analyse sémantique automatique du ticket basée sur la base de connaissances ISPM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ConfidenceScore score={analysis.confidence} />
          </div>
        </div>

        {/* Classification Metrics Grid */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-slate-800 pt-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Catégorie Détectée
            </span>
            <p className="text-sm font-semibold text-slate-100 mt-0.5">{analysis.category}</p>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Priorité IA
            </span>
            <div className="mt-0.5">
              <PriorityBadge priority={analysis.priority} />
            </div>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Équipe Recommandée
            </span>
            <p className="text-sm font-semibold text-indigo-400 mt-0.5">
              {analysis.team}
            </p>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              Décision Moteur
            </span>
            <p className="text-sm font-semibold text-slate-200 mt-0.5 capitalize">
              {analysis.action === "resolution"
                ? "Résolution directe"
                : analysis.action === "information"
                ? "Demande d'information"
                : "Escalade N2 / Technicien"}
            </p>
          </div>
        </div>
      </div>

      {/* Blocked / Prompt Injection Alert if active */}
      {analysis.isBlocked && (
        <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/40 text-rose-300 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm">Action Bloquée par le Guardrail de Sécurité</h4>
            <p className="text-xs mt-1 text-rose-200/80">{analysis.blockReason}</p>
          </div>
        </div>
      )}

      {/* Réponse rédigée par l'agent pour le demandeur */}
      {analysis.userResponse && (
        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-indigo-500/20">
            <div className="flex items-center gap-2">
              <MessageSquareText className="w-4 h-4 text-indigo-400" />
              <h4 className="text-sm font-bold text-slate-100">
                Réponse proposée au demandeur
              </h4>
            </div>
            {analysis.sources.length > 0 && (
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-300 shrink-0">
                Appuyée sur {analysis.sources.length} fiche
                {analysis.sources.length > 1 ? "s" : ""} KB
              </span>
            )}
          </div>

          <p className="text-xs leading-relaxed text-slate-200 whitespace-pre-line">
            {analysis.userResponse}
          </p>
        </div>
      )}

      {/* Extracted Entities Grid */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Layers className="w-4 h-4 text-indigo-400" />
          <h4 className="text-sm font-bold text-slate-100">
            Informations & Entités Extraites
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="font-semibold text-slate-400">Utilisateur</span>
            <p className="font-medium text-slate-100 mt-0.5">
              {analysis.extractedInfo.user || "Non identifié"}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="font-semibold text-slate-400">Équipement</span>
            <p className="font-medium text-slate-100 mt-0.5">
              {analysis.extractedInfo.equipment || "Non spécifié"}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="font-semibold text-slate-400">Service / App</span>
            <p className="font-medium text-slate-100 mt-0.5">
              {analysis.extractedInfo.app || "Non spécifié"}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 md:col-span-2">
            <span className="font-semibold text-slate-400">Symptômes identifiés</span>
            <p className="font-medium text-slate-100 mt-0.5">
              {analysis.extractedInfo.symptoms || "Non spécifiés"}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="font-semibold text-slate-400">Impact activité</span>
            <p className="font-medium text-slate-100 mt-0.5">
              {analysis.extractedInfo.impact || "Modéré"}
            </p>
          </div>
        </div>
      </div>

      {/* Missing Information Block (If any) */}
      {analysis.missingInformation.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span>Informations Manquantes Qualifiées</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={onAskQuestions}
              className="text-xs border-slate-700 text-slate-200 hover:bg-slate-800"
            >
              Poser les questions au demandeur
            </Button>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-300 pl-4 list-disc">
            {analysis.missingInformation.map((info, idx) => (
              <li key={idx}>{info}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Diagnostic & Synthesis */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <h4 className="text-sm font-bold text-slate-100">
            Diagnostic Technique Proposé
          </h4>
        </div>

        <p className="text-xs leading-relaxed text-slate-300">
          {analysis.diagnosis}
        </p>

        {/* Resolution Steps */}
        {analysis.resolutionSteps.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-800">
            <h5 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-3">
              Étapes de résolution préconisées
            </h5>
            <ol className="space-y-2 text-xs">
              {analysis.resolutionSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 text-indigo-400 font-bold text-[10px] shrink-0 border border-slate-700">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};
