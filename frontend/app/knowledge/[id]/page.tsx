"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KNOWLEDGE_DOCS } from "@/data/knowledge.generated";
import { ArrowLeft, BookOpen, Sparkles, Tag, Clock, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function KnowledgeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const doc = KNOWLEDGE_DOCS.find((d) => d.id === id);
  if (!doc) notFound();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/knowledge"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour à la base de connaissances
      </Link>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-sm text-purple-600 dark:text-purple-400">
              {doc.id}
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs uppercase font-bold bg-purple-500/10 text-purple-600 dark:text-purple-300">
              {doc.type}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            Dernière màj: {doc.updatedAt}
          </div>
        </div>

        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
          {doc.title}
        </h1>

        {/* Source Used By AI Banner */}
        {doc.usedByAI && (
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-900 dark:text-purple-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="font-bold">Source utilisée par le Copilot RAG ISPM</span>
            </div>
            <span className="text-[11px] text-purple-700 dark:text-purple-300 font-semibold">
              Indexé dans le Vector Store Local
            </span>
          </div>
        )}

        {/* Document Content */}
        <div className="prose dark:prose-invert max-w-none text-xs leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300 pt-2">
          {doc.content}
        </div>

        {/* Metadata & Tags */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-slate-400" />
            <div className="flex items-center gap-1.5 flex-wrap">
              {doc.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-medium text-[11px]"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <span className="text-slate-400 text-[11px]">Rédigé par: {doc.author}</span>
        </div>
      </div>
    </div>
  );
}
