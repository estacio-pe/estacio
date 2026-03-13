import { ClockIcon } from "@phosphor-icons/react/dist/ssr";
import { FeaturePlaceholder } from "@/components/feature-placeholder";
import { PageHeader } from "@/components/page-header";
import { RootLayout } from "@/components/root-layout";

export default function HistorialPage() {
  return (
    <RootLayout>
      <div className="flex flex-col gap-6 p-4 sm:p-6">
        <PageHeader title="Historial" icon={<ClockIcon />} />

        <FeaturePlaceholder
          icon={<ClockIcon />}
          title="Próximamente"
          description="El historial estará disponible en una próxima versión."
        />
      </div>
    </RootLayout>
  );
}
