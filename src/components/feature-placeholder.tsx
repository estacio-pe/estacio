import type * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeaturePlaceholderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeaturePlaceholder({
  icon,
  title,
  description,
  className,
}: FeaturePlaceholderProps) {
  return (
    <Card className={cn(className)}>
      <CardContent className="flex flex-col items-center justify-center py-20 text-center sm:py-24">
        <div className="mb-4 text-muted-foreground/30 [&>svg]:size-10">
          {icon}
        </div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 max-w-sm text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
