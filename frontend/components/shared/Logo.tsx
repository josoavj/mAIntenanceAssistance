import React from "react";
import Image from "next/image";
import Link from "next/link";
import { APP_CONFIG } from "@/config/app";

export interface LogoProps {
  collapsed?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ collapsed = false, className = "", size = "md" }) => {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  return (
    <Link href="/" className={`flex items-center gap-3 group transition-all ${className}`}>
      {/* Brand Icon SVG */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/30 transition-all ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
          <path d="M12 12 2.1 12" />
          <path d="M12 12 12 22" />
          <circle cx="12" cy="12" r="3" className="fill-white/30" />
        </svg>

        {/* Small ISPM overlay badge */}
        <div className="absolute -bottom-1 -right-1 rounded-full bg-white dark:bg-slate-900 p-0.5 shadow">
          <Image
            src={APP_CONFIG.logoPath}
            alt="ISPM"
            width={12}
            height={12}
            className="rounded-full"
          />
        </div>
      </div>

      {!collapsed && (
        <div className="flex flex-col leading-tight">
          <span className={`font-bold tracking-tight text-slate-900 dark:text-slate-100 ${textSizes[size]}`}>
            m<span className="text-indigo-600 dark:text-indigo-400">AI</span>ntenance
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            & Assistance ISPM
          </span>
        </div>
      )}
    </Link>
  );
};
