"use client";

import React from "react";
import Link from "next/link";
import { Boxes } from "@/components/ui/background-boxes";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Ticket,
  Bot,
  LayoutDashboard,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Activity,
  Layers,
  Wrench,
  UserCheck,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="space-y-12 py-4">

      {/* ─── Hero with Aceternity Background Boxes ─── */}
      <section
        className="relative h-[500px] overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col items-center justify-center"
        style={{ isolation: "isolate" }}
      >

        {/* Radial mask — reveals center, fades edges */}
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_30%,white_100%)] pointer-events-none" />

        {/* The animated grid */}
        <Boxes />

        {/* Content — sits above the grid via z-30 */}
        <div className="relative z-30 flex flex-col items-center text-center px-6 max-w-3xl space-y-5">

          {/* Institution badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-indigo-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            ISPM — Institut Supérieur Polytechnique de Madagascar
          </div>

          {/* Main title */}
          <h1
            className={cn(
              "text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white"
            )}
          >
            m<span className="text-indigo-400">AI</span>ntenance
            <br />
            <span className="text-slate-300 text-3xl sm:text-5xl font-bold">
              & Assistance
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl">
            L'assistant intelligent basé sur l'IA pour{" "}
            <span className="text-indigo-400 font-semibold">comprendre</span>,{" "}
            <span className="text-indigo-300 font-semibold">diagnostiquer</span>{" "}
            et{" "}
            <span className="text-white font-semibold">résoudre</span> les
            incidents informatiques.
          </p>

          {/* Fine print */}
          <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
            Conçu dans le cadre du projet AI Engineering &amp; Machine Learning
            ISPM 2026. Prise en charge automatisée des tickets, classification,
            RAG vectoriel local, utilisation d'outils IT et garde-fous de
            sécurité avec validation humaine.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold gap-2 shadow-lg shadow-indigo-900/50"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <Link href="/tickets/new">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 bg-slate-900/60 backdrop-blur-sm text-slate-100 hover:bg-slate-800 font-bold gap-2"
              >
                <Ticket className="w-4 h-4 text-indigo-400" />
                Créer un ticket
              </Button>
            </Link>

            <Link href="/assistant">
              <Button
                size="lg"
                variant="ghost"
                className="text-indigo-400 hover:bg-slate-800/60 font-bold gap-2"
              >
                <Bot className="w-4 h-4" />
                Copilot IA
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Workflow Pipeline ─── */}
      <section className="space-y-6">
        <Reveal className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl font-bold text-slate-100">
            Chaîne Fonctionnelle du Moteur d'Assistance IA
          </h2>
          <p className="text-xs text-slate-400">
            Chaque ticket traverse un pipeline intelligent observable avec
            garde-fous de sécurité.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { title: "Ticket", desc: "Soumission du besoin IT", icon: FileText },
            { title: "Compréhension", desc: "Extraction & Catégorisation", icon: Layers },
            { title: "Diagnostic", desc: "Évaluation gravité & impact", icon: Activity },
            { title: "Recherche RAG", desc: "Match fiches KB ISPM", icon: BookOpen },
            { title: "Agent & Outils", desc: "Exécution fonctions IT", icon: Wrench },
            { title: "Décision", desc: "Résolution / Escalade", icon: CheckCircle2 },
            { title: "Validation", desc: "Garde-fou humain", icon: UserCheck },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                key={item.title}
                delay={index * 80}
                className="p-4 rounded-2xl border border-slate-800 bg-slate-900 flex flex-col items-center text-center space-y-2 hover:border-slate-700"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-800 border border-slate-700">
                  <Icon className="w-4 h-4 text-indigo-400" />
                </div>
                <span className="text-xs font-bold text-slate-100">
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-400">{item.desc}</span>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ─── 4 Demo Scenarios ─── */}
      <section className="space-y-4">
        <Reveal className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              Scénarios de Démonstration Obligatoires
            </h3>
            <p className="text-xs text-slate-400">
              Accès direct aux 4 cas d'utilisation représentatifs exigés par le
              sujet d'examen.
            </p>
          </div>
          <Link
            href="/tickets"
            className="text-xs font-semibold text-indigo-400 hover:underline"
          >
            Voir tous les tickets →
          </Link>
        </Reveal>

        <Reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/tickets/TK-1001" className="group">
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 shadow-sm group-hover:border-indigo-500/50 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-indigo-400 border border-slate-700">
                  Scénario 1
                </span>
                <span className="text-xs font-mono text-slate-400">TK-1001</span>
              </div>
              <h4 className="text-sm font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-2">
                Incident courant : Impression bloquée
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2">
                Impression HP bloquée en spooler. Diagnostic RAG (KB-PRN-04) +
                Outils de réinitialisation.
              </p>
            </div>
          </Link>

          <Link href="/tickets/TK-1002" className="group">
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 shadow-sm group-hover:border-rose-500/50 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Scénario 2 — Urgent
                </span>
                <span className="text-xs font-mono text-rose-400 font-bold">
                  TK-1002
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-100 group-hover:text-rose-400 transition-colors line-clamp-2">
                Incident urgent : Panne Réseau Bâtiment A
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2">
                Coupure switch VLAN 20. Priorité Critique, raccordement à
                l'incident INC-2026-001 &amp; Escalade N2.
              </p>
            </div>
          </Link>

          <Link href="/tickets/TK-1003" className="group">
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 shadow-sm group-hover:border-indigo-500/50 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-indigo-400 border border-slate-700">
                  Scénario 3
                </span>
                <span className="text-xs font-mono text-indigo-400 font-bold">
                  TK-1003
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-2">
                Demande incomplète : "Écran bizarre"
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2">
                Description trop vague. L'IA extrait les informations manquantes
                et génère les questions de clarification.
              </p>
            </div>
          </Link>

          <Link href="/tickets/TK-1004" className="group">
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 shadow-sm group-hover:border-amber-500/50 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Scénario 4 — Sécurité
                </span>
                <span className="text-xs font-mono text-amber-400 font-bold">
                  TK-1004
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-2">
                Demande sensible : Injection SuperAdmin
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2">
                Tentative de Jailbreak / Prompt Injection. Bloqué par le
                Guardrail + Validation Humaine RSSI obligatoire.
              </p>
            </div>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
