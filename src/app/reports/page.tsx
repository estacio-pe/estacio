import { ChartBarIcon } from "@phosphor-icons/react/dist/ssr";
import { RootLayout } from "@/components/root-layout";
import { Card, CardContent } from "@/components/ui/card";

export default function ReportesPage() {
  return (
    <RootLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center gap-2">
          <ChartBarIcon className="size-5 text-muted-foreground" />
          <h1 className="text-sm font-semibold">Reportes</h1>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-24 text-center">
            <ChartBarIcon className="mb-4 size-10 text-muted-foreground/30" />
            <p className="text-sm font-medium">Próximamente</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Los reportes estarán disponibles en una próxima versión.
            </p>
          </CardContent>
        </Card>
      </div>
    </RootLayout>
  );
}
