"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTickets } from "@/context/TicketContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TICKET_CATEGORIES } from "@/config/categories";
import { MOCK_USERS } from "@/data/users";
import { MOCK_EQUIPMENT } from "@/data/equipment";
import { TicketCategory } from "@/types";
import {
  Ticket,
  Send,
  Loader2,
  Paperclip,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function NewTicketPage() {
  const router = useRouter();
  const { addTicket } = useTickets();

  const [loading, setLoading] = useState(false);
  const [createdTicketId, setCreatedTicketId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userId: "USR-101",
    equipmentId: "EQ-PC-042",
    appOrService: "",
    category: "Matériel" as TicketCategory,
    symptoms: "",
    onset: "Aujourd'hui",
    impact: "Normal",
    attemptedFixes: "",
    hasAttachment: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const selectedUser = MOCK_USERS.find((u) => u.id === formData.userId);
      const selectedEquip = MOCK_EQUIPMENT.find((eq) => eq.id === formData.equipmentId);

      const created = addTicket({
        title: formData.title,
        description: formData.description,
        userId: formData.userId,
        userName: selectedUser ? selectedUser.name : "Dr. Rakotoarisoa Jean",
        userEmail: selectedUser ? selectedUser.email : "j.rakotoarisoa@ispm.mg",
        userDepartment: selectedUser ? selectedUser.department : "Enseignement & Recherche",
        equipmentId: formData.equipmentId,
        equipmentName: selectedEquip ? selectedEquip.name : "Matériel ISPM",
        appOrService: formData.appOrService,
        category: formData.category,
        symptoms: formData.symptoms,
        onset: formData.onset,
        impact: formData.impact,
        attemptedFixes: formData.attemptedFixes,
        hasAttachment: formData.hasAttachment,
      });

      setLoading(false);
      setCreatedTicketId(created.id);

      setTimeout(() => {
        router.push(`/tickets/${created.id}`);
      }, 1200);
    }, 800);
  };

  if (createdTicketId) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card className="border-slate-800 bg-slate-900 text-center p-8 space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">
            Ticket {createdTicketId} créé et analysé par le Copilot IA !
          </h3>
          <p className="text-xs text-slate-300">
            L'agent autonome a classifié vos déclarations, interrogé la base RAG local et généré le diagnostic préliminaire.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-indigo-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            Ouverture de la fiche du ticket {createdTicketId}...
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Form Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-slate-100 flex items-center gap-2">
          <Ticket className="w-5 h-5 text-indigo-400" />
          Nouveau Ticket de Support Informatique
        </h2>
        <p className="text-xs text-slate-400">
          Remplissez les informations ci-dessous. Le moteur IA ISPM classifiera et qualifiera automatiquement votre demande.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-slate-800 bg-slate-900 p-6 space-y-5 shadow-sm">
          {/* Main Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Titre du ticket *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Mon imprimante réseau ne répond plus depuis ce matin"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-800 bg-slate-950 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Utilisateur Demandeur
                </label>
                <select
                  value={formData.userId}
                  onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-800 bg-slate-950 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {MOCK_USERS.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Équipement Concerné
                </label>
                <select
                  value={formData.equipmentId}
                  onChange={(e) => setFormData({ ...formData, equipmentId: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-800 bg-slate-950 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {MOCK_EQUIPMENT.map((eq) => (
                    <option key={eq.id} value={eq.id}>
                      {eq.name} ({eq.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Description détaillée du problème *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Décrivez précisément ce qui se produit, les éventuels messages d'erreur et les circonstances..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-800 bg-slate-950 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* AI Extracted Fields Assistance */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Champs de Précision pour Diagnostic Rapide
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Application / Service impacté
                </label>
                <input
                  type="text"
                  placeholder="Ex: Active Directory, Outlook, Spooler, VPN..."
                  value={formData.appOrService}
                  onChange={(e) => setFormData({ ...formData, appOrService: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-800 bg-slate-950 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Catégorie pressentie
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as TicketCategory })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-800 bg-slate-950 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {TICKET_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Moment d'apparition
                </label>
                <input
                  type="text"
                  placeholder="Ex: Ce matin à 08h, Après la mise à jour..."
                  value={formData.onset}
                  onChange={(e) => setFormData({ ...formData, onset: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-800 bg-slate-950 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Impact sur l'activité
                </label>
                <select
                  value={formData.impact}
                  onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-800 bg-slate-950 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Bloquant Général">Bloquant Général (Bâtiment / Service)</option>
                  <option value="Bloquant Personnel">Bloquant Personnel (Ne peut plus travailler)</option>
                  <option value="Normal">Gênant mais contournable</option>
                  <option value="Mineur">Mineur / Demande d'information</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Manipulations déjà effectuées
              </label>
              <input
                type="text"
                placeholder="Ex: Redémarrage du PC, débranchement du câble RJ45..."
                value={formData.attemptedFixes}
                onChange={(e) => setFormData({ ...formData, attemptedFixes: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-800 bg-slate-950 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Simulated Attachment */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-dashed border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Paperclip className="w-4 h-4 text-indigo-400" />
                <span>Pièce jointe (capture d'écran ou fichier log)</span>
              </div>
              <Button type="button" variant="outline" size="sm" className="text-xs border-slate-700">
                Ajouter un fichier
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Traitement IA en cours...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Soumettre le ticket
                </>
              )}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
