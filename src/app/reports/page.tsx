import { ChartBarIcon } from "@phosphor-icons/react/dist/ssr";
import { FeaturePlaceholder } from "@/components/feature-placeholder";
import { PageHeader } from "@/components/page-header";
import { RootLayout } from "@/components/root-layout";

export default function ReportesPage() {
  return (
    <RootLayout>
      <div className="flex flex-col gap-6 p-4 sm:p-6">
        <PageHeader title="Reportes" icon={<ChartBarIcon />} />

        <FeaturePlaceholder
          icon={<ChartBarIcon />}
          title="Próximamente"
          description="Los reportes estarán disponibles en una próxima versión."
        />
      </div>
    </RootLayout>
  );
}
