import React from "react";
import Link from "next/link";
import { KnowledgeDocument } from "@/types";
import { BookOpen, ExternalLink, ShieldCheck } from "lucide-react";

export const SourceCard: React.FC<{ docs: KnowledgeDocument[] }> = ({ docs }) => {
  if (!docs || docs.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
        <BookOpen className="w-4 h-4 text-purple-500" />
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Sources Documentaires Consultées (RAG Vectoriel ISPM)
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {docs.map((doc) => (
          <div
            key={doc.id}
            className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 transition-all flex flex-col justify-between gap-3 text-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                  {doc.id}
                </span>
                {doc.relevance && (
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 font-semibold text-[10px]">
                    Pertinence: {doc.relevance}%
                  </span>
                )}
              </div>

              <h5 className="font-bold text-slate-900 dark:text-slate-100 mt-1 line-clamp-1">
                {doc.title}
              </h5>

              <p className="text-slate-500 dark:text-slate-400 mt-1 text-[11px] line-clamp-2">
                {doc.content.replace(/#/g, "")}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
              <span className="text-[10px] text-slate-400">Auteur: {doc.author || "ISPM KB"}</span>
              <Link
                href={`/knowledge/${doc.id}`}
                className="inline-flex items-center gap-1 font-semibold text-purple-600 dark:text-purple-400 hover:underline text-[11px]"
              >
                Voir le document
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
