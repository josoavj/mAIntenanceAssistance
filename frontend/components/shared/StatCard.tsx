"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CountUp } from "./CountUp";

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  iconBg?: string;
  suffix?: string;
  prefix?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  change,
  changeType = "positive",
  icon: Icon,
  iconBg = "bg-indigo-500/10 text-indigo-400",
  suffix = "",
  prefix = "",
}) => {
  const numericVal = typeof value === "number" ? value : parseFloat(value.toString().replace(/[^0-9.]/g, ""));
  const isNumeric = !isNaN(numericVal);

  return (
    <Card className="relative overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <div className={`p-2.5 rounded-xl ${iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            {isNumeric ? (
              <CountUp end={numericVal} prefix={prefix} suffix={suffix || (typeof value === "string" && value.includes("%") ? "%" : typeof value === "string" && value.includes("$") ? "$" : "")} />
            ) : (
              value
            )}
          </h3>
          {change && (
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                changeType === "positive"
                  ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  : changeType === "negative"
                  ? "bg-rose-500/10 text-rose-500"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              {change}
            </span>
          )}
        </div>

        {description && (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
