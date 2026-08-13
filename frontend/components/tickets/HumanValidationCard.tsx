"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldAlert, UserCheck, Lock, CheckCircle2 } from "lucide-react";

export interface HumanValidationCardProps {
  reason?: string;
  ticketId: string;
  onValidated?: () => void;
}

export const HumanValidationCard: React.FC<HumanValidationCardProps> = ({
  reason = "Action sensible détectée : validation par un technicien ou administrateur requise.",
  ticketId,
  onValidated,
}) => {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleValidation = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setValidated(true);
      if (onValidated) onValidated();
    }, 600);
  };

  if (validated) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-900 dark:text-emerald-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
          <div>
            <h4 className="font-bold text-sm">Validation Humaine Accordée</h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              L'action a été autorisée et signée par l'administrateur en session.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-amber-500/40 bg-amber-500/10 p-5 text-slate-900 dark:text-slate-100 space-y-3">
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200">
              Validation Humaine Requise (Guardrail Active)
            </h4>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-800 dark:text-amber-200 uppercase">
              Contrôle de Sécurité
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">{reason}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
        <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <Lock className="w-3 h-3" />
          Protocole de sécurité ISPM - AI Engineering
        </span>
        <Button
          size="sm"
          onClick={handleValidation}
          disabled={loading}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
        >
          <UserCheck className="w-4 h-4 mr-1.5" />
          {loading ? "Validation en cours..." : "Valider l'action humaine"}
        </Button>
      </div>
    </div>
  );
};
