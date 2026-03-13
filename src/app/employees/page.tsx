import { UsersIcon } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/page-header";
import { RootLayout } from "@/components/root-layout";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockEmpleados } from "@/lib/mock-empleados";

export default function EmpleadosPage() {
  const porPorcentaje = mockEmpleados.filter((e) => e.tipo === "porcentaje");
  const porSueldo = mockEmpleados.filter((e) => e.tipo === "sueldo");

  return (
    <RootLayout>
      <div className="flex flex-col gap-6 p-4 sm:p-6">
        <PageHeader title="Empleados" icon={<UsersIcon />} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total empleados" value={mockEmpleados.length} />
          <StatCard label="Por porcentaje" value={porPorcentaje.length} />
          <StatCard label="Por sueldo fijo" value={porSueldo.length} />
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Compensación</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Ingreso</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEmpleados.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="max-w-36 truncate font-medium sm:max-w-none">
                    {emp.nombre}
                  </TableCell>
                  <TableCell className="max-w-28 truncate sm:max-w-none">
                    {emp.cargo}
                  </TableCell>
                  <TableCell>
                    {emp.tipo === "porcentaje" ? (
                      <div className="flex flex-col gap-0.5">
                        <Badge variant="outline" className="w-fit">
                          Porcentaje
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {emp.monto}% de comisión
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-0.5">
                        <Badge variant="secondary" className="w-fit">
                          Sueldo fijo
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          S/ {emp.monto.toFixed(2)} / mes
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{emp.telefono}</TableCell>
                  <TableCell>
                    {new Date(emp.fechaIngreso).toLocaleDateString("es-PE", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge variant={emp.activo ? "default" : "destructive"}>
                      {emp.activo ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </RootLayout>
  );
}
