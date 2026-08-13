"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, User, Bell, Shield, Sliders, Cpu, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [ragThreshold, setRagThreshold] = useState(75);
  const [guardrailActive, setGuardrailActive] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-500" />
          Paramètres du Système & Configuration IA
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Personnalisation des seuils du moteur RAG, des garde-fous de sécurité et des préférences utilisateur.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-100 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          Paramètres enregistrés avec succès.
        </div>
      )}

      <div className="space-y-6">
        {/* Section 1: Configuration IA Copilot */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Cpu className="w-4 h-4 text-indigo-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Paramètres du Moteur d'IA & RAG Local
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Modèle LLM d'inférence locale
              </label>
              <select className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                <option value="llama3-8b">Llama-3-8B-Instruct (GPU Node Local ISPM)</option>
                <option value="mistral-7b">Mistral-7B-v0.2-Instruct</option>
                <option value="qwen-14b">Qwen-14B-Chat</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Seuil de Confiance RAG Minimal (%)
                </label>
                <span className="font-mono font-bold text-indigo-500">{ragThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={ragThreshold}
                onChange={(e) => setRagThreshold(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Les fiches avec une pertinence inférieure à ce seuil ne seront pas utilisées pour le diagnostic automatique.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block">
                  Filtrage Guardrail Sécurité Actif
                </label>
                <p className="text-[11px] text-slate-400">
                  Bloque automatiquement les injections d'instructions et les demandes de privilèges super-utilisateur.
                </p>
              </div>
              <input
                type="checkbox"
                checked={guardrailActive}
                onChange={(e) => setGuardrailActive(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 rounded"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Profil & Notifications */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <User className="w-4 h-4 text-purple-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Profil Administrateur & Notifications
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nom d'affichage
              </label>
              <input
                type="text"
                defaultValue="Admin ISPM Support"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Adresse email de contact
              </label>
              <input
                type="email"
                defaultValue="support-admin@ispm.mg"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6">
            Enregistrer les modifications
          </Button>
        </div>
      </div>
    </div>
  );
}
