"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Bot,
  Send,
  Sparkles,
  User,
  Ticket,
  PlusCircle,
  HelpCircle,
  ShieldCheck,
  RotateCcw,
  BookOpen,
  ArrowRight,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  category?: string;
  sources?: string[];
  suggestedAction?: string;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "assistant",
      text: "Bonjour, je suis mAIntenance Assistant, le copilot intelligent d'assistance informatique ISPM. Décrivez votre problème ou posez votre question et je vous aiderai à l'analyser et le résoudre.",
      timestamp: "09:00",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const cannedPrompts = [
    "Mon ordinateur ne se connecte plus au réseau Wi-Fi de l'ISPM",
    "J'ai oublié mon mot de passe Active Directory M365",
    "L'imprimante HP du hall affiche une erreur de spooler",
    "Je pense que mon poste a été compromis par un fichier suspect",
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Simulate AI response based on query content
    setTimeout(() => {
      let replyText =
        "J'ai analysé votre demande. Voici les recommandations fondées sur la base de connaissances ISPM :";
      let category = "Support Général";
      let sources = ["KB-NET-01"];
      let suggestedAction = "Créer un ticket automatique";

      if (query.toLowerCase().includes("réseau") || query.toLowerCase().includes("wi-fi")) {
        category = "Réseau & connectivité";
        sources = ["KB-NET-01"];
        replyText =
          "D'après la fiche **KB-NET-01** (Guide de dépannage réseau ISPM), une déconnexion Wi-Fi provient généralement d'un bail DHCP expiré ou du blocage du port d'accès.\n\n**Étapes recommandées** :\n1. Exécuter `ipconfig /flushdns` dans la console.\n2. Vérifier si vous obtenez une IP en `10.20.x.x`.\n3. Redémarrer la carte réseau Wi-Fi.";
      } else if (query.toLowerCase().includes("mot de passe")) {
        category = "Comptes & authentification";
        sources = ["KB-AUTH-02"];
        replyText =
          "Selon la politique de sécurité **KB-AUTH-02**, la réinitialisation de mot de passe requiert une confirmation d'identité humaine.\n\nJe peux initier la demande de réinitialisation sécurisée pour votre compte Active Directory.";
      } else if (query.toLowerCase().includes("imprimante") || query.toLowerCase().includes("spooler")) {
        category = "Imprimantes";
        sources = ["KB-PRN-04"];
        replyText =
          "D'après **KB-PRN-04**, les travaux bloqués dans le spooler requièrent la réinitialisation du service Spouleur d'impression Windows (`net stop spooler`).";
      } else if (query.toLowerCase().includes("compromis") || query.toLowerCase().includes("antivirus")) {
        category = "Cybersécurité";
        sources = ["KB-SEC-01"];
        replyText =
          "[ALERTE SÉCURITÉ] Si vous suspectez une compromission, veuillez déconnecter immédiatement votre câble réseau et ne pas saisir d'identifiants administrateur. La cellule RSSI a été notifiée.";
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        category,
        sources,
        suggestedAction,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 overflow-hidden">
      {/* Left History & Suggestions Sidebar */}
      <div className="w-full md:w-72 shrink-0 space-y-4 flex flex-col">
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
            <Sparkles className="w-4 h-4" />
            <span>Assistant IA Copilot (RAG Local)</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Assistant conversationnel connecté à la base de connaissances et aux outils IT ISPM.
          </p>

          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setMessages([
                {
                  id: "1",
                  sender: "assistant",
                  text: "Bonjour, je suis mAIntenance Assistant. Décrivez votre problème informatique et je vous aiderai à l'analyser.",
                  timestamp: "09:00",
                },
              ])
            }
            className="w-full text-xs gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Nouvelle Conversation
          </Button>
        </div>

        {/* Canned Suggestions */}
        <div className="flex-1 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3 overflow-y-auto">
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Suggestions fréquentes
          </h4>
          <div className="space-y-2">
            {cannedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="w-full p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-indigo-500/10 hover:border-indigo-400/30 text-left text-xs text-slate-700 dark:text-slate-300 transition-all line-clamp-2"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Conversation Panel */}
      <div className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col overflow-hidden shadow-sm">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Session Copilot Active
              </h3>
              <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Moteur RAG ISPM en ligne
              </span>
            </div>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white text-xs font-bold ${
                  msg.sender === "user"
                    ? "bg-slate-700"
                    : "bg-gradient-to-tr from-indigo-600 to-purple-600"
                }`}
              >
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-xl p-4 rounded-2xl text-xs space-y-2 ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200/50 dark:border-slate-700/50"
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      Source RAG : {msg.sources.join(", ")}
                    </span>
                    {msg.category && (
                      <span className="px-1.5 py-0.5 rounded bg-indigo-500/10">
                        {msg.category}
                      </span>
                    )}
                  </div>
                )}

                {msg.suggestedAction && (
                  <div className="pt-2">
                    <Link href="/tickets/new">
                      <Button size="sm" className="bg-indigo-600 text-white text-[11px] font-bold h-7 gap-1">
                        <Ticket className="w-3 h-3" />
                        Convertir en Ticket IT
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <Bot className="w-4 h-4 text-indigo-500 animate-spin" />
              mAIntenance Copilot recherche dans la base de connaissances...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Posez votre question ou décrivez la panne..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs gap-1.5 px-5"
            >
              <Send className="w-4 h-4" />
              Envoyer
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
