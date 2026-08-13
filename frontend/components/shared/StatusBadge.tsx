import React from "react";
import { TicketStatus } from "@/types";
import { STATUS_CONFIG } from "@/config/status";

export const StatusBadge: React.FC<{ status: TicketStatus; className?: string }> = ({
  status,
  className = "",
}) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG["Nouveau"];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  );
};
