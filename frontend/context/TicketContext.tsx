"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AIAnalysis, Ticket } from "@/types";
import { MOCK_TICKETS } from "@/data/tickets";
import { statusForAction } from "@/lib/api/mappers";

interface TicketContextType {
  tickets: Ticket[];
  addTicket: (
    newTicket: Omit<Ticket, "id" | "createdAt" | "updatedAt" | "aiAnalysis" | "toolCalls" | "status" | "priority" | "assignedTeam"> & { category: Ticket["category"] },
    analysis?: AIAnalysis
  ) => Ticket;
  getTicketById: (id: string) => Ticket | undefined;
  updateTicketStatus: (id: string, status: Ticket["status"]) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);

  // Load from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ispm_tickets");
      if (saved) {
        setTickets(JSON.parse(saved));
      }
    } catch {
      // Fallback to initial MOCK_TICKETS
    }
  }, []);

  // Save to localStorage when updated
  const saveTickets = (updated: Ticket[]) => {
    setTickets(updated);
    try {
      localStorage.setItem("ispm_tickets", JSON.stringify(updated));
    } catch {
      // Ignore storage quota errors
    }
  };

  const addTicket: TicketContextType["addTicket"] = (data, analysis) => {
    const newId = `TK-${1000 + tickets.length + 1}`;
    const now = new Date().toISOString().replace("T", " ").substring(0, 16);

    // Repli utilisé quand l'API d'analyse est injoignable (quota LLM, cold start Render).
    const mockAnalysis: AIAnalysis = {
      category: data.category,
      priority: "Moyenne",
      team: "Support Utilisateurs",
      confidence: 88,
      reasoning: "Ticket nouvellement créé par l'utilisateur. Analyse sémantique préliminaire effectuée par le Copilot IA.",
      extractedInfo: {
        user: data.userName || "Utilisateur ISPM",
        equipment: data.equipmentName || "Non spécifié",
        app: data.appOrService || "Système Général",
        symptoms: data.symptoms || data.title,
        onset: data.onset || "Ce jour",
        impact: data.impact || "Modéré",
        attemptedFixes: data.attemptedFixes || "Non renseigné",
      },
      missingInformation: [],
      questionsToAsk: [],
      diagnosis: `Compréhension automatique réalisée. Le problème concerne la catégorie ${data.category}. Plan de vérification en cours d'exécution.`,
      risks: ["Interruption d'activité modérée"],
      action: "resolution",
      resolutionSteps: [
        "Vérifier la connectivité et la configuration du service concerné.",
        "Consulter la fiche technique RAG équivalente dans la base de connaissances.",
        "Effectuer un test de bon fonctionnement avec le demandeur.",
      ],
      sources: ["KB-NET-01"],
      humanValidationRequired: false,
    };

    const aiAnalysis = analysis ?? mockAnalysis;

    const createdTicket: Ticket = {
      id: newId,
      title: data.title,
      description: data.description,
      userId: data.userId || "USR-101",
      userName: data.userName || "Dr. Rakotoarisoa Jean",
      userEmail: data.userEmail || "j.rakotoarisoa@ispm.mg",
      userDepartment: data.userDepartment || "Enseignement & Recherche",
      equipmentId: data.equipmentId,
      equipmentName: data.equipmentName,
      appOrService: data.appOrService || "Système ISPM",
      symptoms: data.symptoms || "Problème signalé via le formulaire",
      onset: data.onset || "Aujourd'hui",
      impact: data.impact || "Normal",
      attemptedFixes: data.attemptedFixes || "Aucune manipulation",
      hasAttachment: data.hasAttachment || false,
      status: analysis ? statusForAction(analysis.action) : "Nouveau",
      priority: aiAnalysis.priority,
      category: aiAnalysis.category,
      assignedTeam: aiAnalysis.team,
      createdAt: now,
      updatedAt: now,
      aiAnalysis,
      toolCalls: [
        {
          id: `TC-${Date.now()}`,
          toolName: analysis ? "rechercher_dans_kb" : "analyser_nouveau_ticket",
          status: analysis ? "success" : "warning",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          params: { ticketId: newId, query: data.description.slice(0, 120) },
          result: analysis
            ? { sources: aiAnalysis.sources, confidence: aiAnalysis.confidence }
            : { status: "API indisponible — analyse locale de repli", confidence: aiAnalysis.confidence },
        },
      ],
    };

    const nextList = [createdTicket, ...tickets];
    saveTickets(nextList);
    return createdTicket;
  };

  const getTicketById = (id: string) => {
    return tickets.find((t) => t.id === id);
  };

  const updateTicketStatus = (id: string, status: Ticket["status"]) => {
    const nextList = tickets.map((t) => (t.id === id ? { ...t, status } : t));
    saveTickets(nextList);
  };

  return (
    <TicketContext.Provider
      value={{ tickets, addTicket, getTicketById, updateTicketStatus }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const ctx = useContext(TicketContext);
  if (!ctx) throw new Error("useTickets must be used within TicketProvider");
  return ctx;
};
