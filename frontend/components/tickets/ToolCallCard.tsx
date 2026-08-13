import React from "react";
import { ToolCall } from "@/types";
import { Wrench, CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";

export const ToolCallCard: React.FC<{ toolCalls: ToolCall[] }> = ({ toolCalls }) => {
  if (!toolCalls || toolCalls.length === 0) {
    return (
      <div className="p-4 text-xs text-slate-500 border border-dashed rounded-xl text-center">
        Aucun outil n'a encore été invoqué pour ce ticket.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
        <Wrench className="w-4 h-4 text-amber-500" />
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Outils IT Invoqués par l'Agent Autonomous Copilot
        </h4>
      </div>

      <div className="space-y-3">
        {toolCalls.map((tc) => {
          let statusIcon = <CheckCircle className="w-4 h-4 text-emerald-500" />;
          let statusBg = "border-emerald-200 bg-emerald-50/40 dark:bg-emerald-950/20 dark:border-emerald-900/50";

          if (tc.status === "warning") {
            statusIcon = <AlertTriangle className="w-4 h-4 text-amber-500" />;
            statusBg = "border-amber-200 bg-amber-50/40 dark:bg-amber-950/20 dark:border-amber-900/50";
          } else if (tc.status === "error") {
            statusIcon = <XCircle className="w-4 h-4 text-rose-500" />;
            statusBg = "border-rose-200 bg-rose-50/40 dark:bg-rose-950/20 dark:border-rose-900/50";
          }

          return (
            <div
              key={tc.id}
              className={`p-3.5 rounded-xl border text-xs space-y-2 transition-all ${statusBg}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {statusIcon}
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                    {tc.toolName}()
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{tc.timestamp}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1">
                <div>
                  <span className="text-slate-400 font-semibold uppercase">Paramètres:</span>
                  <pre className="mt-0.5 p-1.5 rounded bg-slate-900 text-slate-200 overflow-x-auto font-mono">
                    {JSON.stringify(tc.params, null, 2)}
                  </pre>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase">Résultat retourné:</span>
                  <pre className="mt-0.5 p-1.5 rounded bg-slate-900 text-emerald-300 overflow-x-auto font-mono">
                    {typeof tc.result === "string"
                      ? tc.result
                      : JSON.stringify(tc.result, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
