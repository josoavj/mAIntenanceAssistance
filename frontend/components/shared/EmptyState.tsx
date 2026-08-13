import React from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Aucune donnée disponible",
  description = "Aucun élément n'a été trouvé correspondant à vos critères.",
  actionText,
  onAction,
  icon: Icon = FolderOpen,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30">
      <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} className="mt-5" size="sm">
          {actionText}
        </Button>
      )}
    </div>
  );
};
