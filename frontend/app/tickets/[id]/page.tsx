"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useTickets } from "@/context/TicketContext";
import { KNOWLEDGE_DOCS } from "@/data/knowledge.generated";
import { AIAnalysisCard } from "@/components/tickets/AIAnalysisCard";
import { ToolCallCard } from "@/components/tickets/ToolCallCard";
import { SourceCard } from "@/components/tickets/SourceCard";
import { HumanValidationCard } from "@/components/tickets/HumanValidationCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { PriorityBadge } from "@/components/shared/PriorityBadge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Paperclip,
  RefreshCw,
} from "lucide-react";

export default function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getTicketById, updateTicketStatus } = useTickets();

  const ticket = getTicketById(id) || getTicketById("TK-1001");

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [askingQuestions, setAskingQuestions] = useState(false);

  if (!ticket) return notFound();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStatusChange = (newStatus: typeof ticket.status) => {
    updateTicketStatus(ticket.id, newStatus);
    showToast(`Statut mis à jour : ${newStatus}`);
  };

  // Find linked RAG sources
  const linkedSources = KNOWLEDGE_DOCS.filter((doc) =>
    ticket.aiAnalysis.sources.includes(doc.id)
  );

  return (
    <div className="space-y-6">
      {/* Toast feedback overlay */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-2xl border border-indigo-500/40 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          {toastMessage}
        </div>
      )}

      {/* Back Button & Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/tickets"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la liste des tickets
        </Link>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => showToast("Ré-analyse sémantique IA relancée avec succès.")}
            className="text-xs gap-1.5 border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Ré-analyser par l'IA
          </Button>

          <Button
            size="sm"
            onClick={() => handleStatusChange("Résolu")}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Marquer comme résolu
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleStatusChange("Escaladé")}
            className="text-xs font-bold gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Escalader N2
          </Button>
        </div>
      </div>

      {/* Main Ticket Header Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-lg font-mono font-bold text-indigo-400">
              {ticket.id}
            </span>
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Créé le {ticket.createdAt}
            </span>
            <span>•</span>
            <span className="font-semibold text-indigo-400">
              Équipe : {ticket.assignedTeam}
            </span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-slate-100">
          {ticket.title}
        </h1>

        {/* User Info Bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs pt-3 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] text-slate-300">
              {ticket.userName.substring(0, 2).toUpperCase()}
            </div>
            <span className="font-bold text-slate-100">
              {ticket.userName}
            </span>
            <span className="text-slate-400">({ticket.userEmail})</span>
          </div>

          <span className="text-slate-700">|</span>
          <span className="text-slate-400 font-medium">
            Département : {ticket.userDepartment}
          </span>

          {ticket.equipmentName && (
            <>
              <span className="text-slate-700">|</span>
              <span className="text-indigo-400 font-semibold">
                Équipement : {ticket.equipmentName}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Human Validation Card if required */}
      {ticket.aiAnalysis.humanValidationRequired && (
        <HumanValidationCard
          reason={ticket.aiAnalysis.validationReason}
          ticketId={ticket.id}
          onValidated={() => showToast("Validation humaine accordée avec succès !")}
        />
      )}

      {/* Main Grid: Description & AI Copilot Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col (1 Col): Original Ticket Declaration */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-100 pb-3 border-b border-slate-800">
              Déclaration Originale du Demandeur
            </h3>

            <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
              {ticket.description}
            </p>

            {ticket.hasAttachment && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-medium text-slate-300">
                  <Paperclip className="w-4 h-4 text-indigo-400" />
                  Capture_Ecran_Erreur.png
                </span>
                <span className="text-[10px] text-slate-400">1.2 MB</span>
              </div>
            )}
          </div>

          {/* Quick Questions Modal / Clarification Box */}
          {askingQuestions && (
            <div className="rounded-2xl border border-purple-800 bg-purple-950/30 p-5 space-y-3">
              <h4 className="text-xs font-bold text-purple-200">
                Questions de clarification envoyées à {ticket.userName}
              </h4>
              <ul className="space-y-1.5 text-xs text-purple-300 list-disc pl-4">
                {ticket.aiAnalysis.questionsToAsk.length > 0 ? (
                  ticket.aiAnalysis.questionsToAsk.map((q, idx) => <li key={idx}>{q}</li>)
                ) : (
                  <li>Merci de fournir plus de précisions sur le problème rencontré.</li>
                )}
              </ul>
              <Button
                size="sm"
                className="bg-purple-600 text-white text-xs w-full mt-2 font-bold"
                onClick={() => {
                  setAskingQuestions(false);
                  showToast("Message automatique envoyé à l'utilisateur !");
                }}
              >
                Envoyer le message de clarification
              </Button>
            </div>
          )}

          {/* Tools Called Timeline Component */}
          <ToolCallCard toolCalls={ticket.toolCalls} />
        </div>

        {/* Right Col (2 Cols): AI Copilot Analysis, RAG Sources, Resolution */}
        <div className="lg:col-span-2 space-y-6">
          <AIAnalysisCard
            analysis={ticket.aiAnalysis}
            onAskQuestions={() => setAskingQuestions(true)}
          />

          {/* RAG Sources Card */}
          <SourceCard docs={linkedSources} />
        </div>
      </div>
    </div>
  );
}
