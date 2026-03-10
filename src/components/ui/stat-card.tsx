import type * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}

export function StatCard({ label, value, valueClassName }: StatCardProps) {
  return (
    <Card className="p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn("text-2xl font-semibold", valueClassName)}>{value}</p>
    </Card>
  );
}
