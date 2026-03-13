import { ScissorsIcon } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/page-header";
import { RootLayout } from "@/components/root-layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  mockRendimientoEmpleados,
  mockServicioStats,
  mockServiciosCatalogo,
} from "@/lib/mock-servicios";

const totalIngresos = mockServicioStats.reduce(
  (sum, s) => sum + s.ingresosMes,
  0,
);
const totalCantidad = mockServicioStats.reduce(
  (sum, s) => sum + s.cantidadMes,
  0,
);

export default function ServiciosPage() {
  const statsPorIngreso = [...mockServicioStats].sort(
    (a, b) => b.ingresosMes - a.ingresosMes,
  );
  const rendimientoPorIngreso = [...mockRendimientoEmpleados].sort(
    (a, b) => b.ingresos - a.ingresos,
  );

  return (
    <RootLayout>
      <div className="flex flex-col gap-6 p-4 sm:p-6">
        <PageHeader title="Servicios" icon={<ScissorsIcon />} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Servicios este mes" value={totalCantidad} />
          <StatCard
            label="Ingresos este mes"
            value={`S/ ${totalIngresos.toFixed(2)}`}
          />
          <StatCard
            label="Tipos de servicio"
            value={mockServiciosCatalogo.length}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Ingresos por servicio (mes)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Servicio</TableHead>
                    <TableHead className="text-right">Cantidad</TableHead>
                    <TableHead className="text-right">Ingresos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statsPorIngreso.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="max-w-36 truncate sm:max-w-none">
                        {s.nombre}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {s.cantidadMes}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        S/ {s.ingresosMes.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-medium">
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {totalCantidad}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      S/ {totalIngresos.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rendimiento por empleado (mes)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empleado</TableHead>
                    <TableHead className="text-right">Servicios</TableHead>
                    <TableHead className="text-right">Ingresos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rendimientoPorIngreso.map((r) => (
                    <TableRow key={r.empleado}>
                      <TableCell className="max-w-36 truncate sm:max-w-none">
                        {r.empleado}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {r.cantidad}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        S/ {r.ingresos.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Catálogo de servicios</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead className="text-right">Duración</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockServiciosCatalogo.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="max-w-36 truncate sm:max-w-none">
                      {s.nombre}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{s.categoria}</Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {s.duracionMin} min
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      S/ {s.precio.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </RootLayout>
  );
}
