import React from "react";
import { TicketPriority } from "@/types";
import { PRIORITY_CONFIG } from "@/config/status";

export const PriorityBadge: React.FC<{ priority: TicketPriority; className?: string }> = ({
  priority,
  className = "",
}) => {
  const config = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG["Faible"];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color} ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
      {config.label}
    </span>
  );
};
