"use client";

import React, { useState } from "react";
import Link from "next/link";
import { KNOWLEDGE_DOCS } from "@/data/knowledge.generated";
import { TICKET_CATEGORIES } from "@/config/categories";
import { BookOpen, Search, Sparkles, Tag, ExternalLink, ShieldCheck } from "lucide-react";

export default function KnowledgePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredDocs = KNOWLEDGE_DOCS.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.id.toLowerCase().includes(search.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === "all" || doc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-500" />
          Base de Connaissances RAG & Fiches Techniques ISPM
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Base documentaire vectorisée consultée automatiquement par l'agent IA pour diagnostiquer les incidents.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher une procédure, un mot-clé (spooler, wifi, IP...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">Toutes les catégories</option>
            {TICKET_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between space-y-4 hover:border-purple-500/50 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-purple-600 dark:text-purple-400">
                  {doc.id}
                </span>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {doc.type}
                  </span>

                  {doc.usedByAI && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Indexé RAG
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-2">
                {doc.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                {doc.content.replace(/#/g, "").replace(/\*\*/g, "")}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                {doc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 dark:text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/knowledge/${doc.id}`}
                className="inline-flex items-center gap-1 font-bold text-purple-600 dark:text-purple-400 hover:underline shrink-0 text-xs"
              >
                Consulter
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
