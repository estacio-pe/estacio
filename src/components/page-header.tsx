import type * as React from "react";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  icon,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        {icon && (
          <span className="text-muted-foreground [&>svg]:size-5">{icon}</span>
        )}

        <div className="min-w-0">
          <h1 className="text-sm font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      {action && (
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
          {action}
        </div>
      )}
    </div>
  );
}
