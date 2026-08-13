import React from "react";

export const ConfidenceScore: React.FC<{ score: number; showLabel?: boolean }> = ({
  score,
  showLabel = true,
}) => {
  let color = "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-300 dark:border-emerald-800";
  let barColor = "bg-emerald-500";

  if (score < 60) {
    color = "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-300 dark:border-rose-800";
    barColor = "bg-rose-500";
  } else if (score < 80) {
    color = "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-300 dark:border-amber-800";
    barColor = "bg-amber-500";
  }

  return (
    <div className="inline-flex items-center gap-2">
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${color}`}>
        {score}%
      </span>
      <div className="w-16 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
        <div className={`h-full ${barColor} transition-all duration-500`} style={{ width: `${score}%` }} />
      </div>
      {showLabel && (
        <span className="text-[11px] text-slate-500 dark:text-slate-400">confiance IA</span>
      )}
    </div>
  );
};
