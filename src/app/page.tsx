"use client";

import {
  ArrowDownIcon,
  HouseIcon,
  PlusIcon,
  ScissorsIcon,
  TagIcon,
} from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { Spoiler } from "spoiled";
import { PageHeader } from "@/components/page-header";
import { RootLayout } from "@/components/root-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  mockTransactions,
  type PaymentMethod,
  type Transaction,
} from "@/lib/mock";
import { mockEmpleados, mockEmpleadosSelect } from "@/lib/mock-empleados";
import {
  mockServiciosCatalogo,
  mockServiciosCatalogoSelect,
} from "@/lib/mock-servicios";

const PAGE_SIZE = 10;

const paymentClass: Record<PaymentMethod, string> = {
  Efectivo: "border-chart-2/40 bg-chart-2/15 text-chart-2",
  Tarjeta: "border-chart-1/40 bg-chart-1/15 text-chart-1",
  Yape: "border-chart-3/40 bg-chart-3/15 text-chart-3",
};

const typeClass: Record<Transaction["tipo"], string> = {
  Servicio: "border-chart-4/40 bg-chart-4/15 text-chart-4",
  Producto: "border-chart-5/40 bg-chart-5/15 text-chart-5",
  Gasto: "border-destructive/30 bg-destructive/10 text-destructive",
};

const paymentOptions = [
  { value: "Efectivo", label: "Efectivo" },
  { value: "Tarjeta", label: "Tarjeta" },
  { value: "Yape", label: "Yape" },
];

interface ServicioForm {
  ticket: string;
  empleadoId: string;
  servicioId: string;
  metodoPago: string;
  monto: string;
}

const emptyForm: ServicioForm = {
  ticket: "",
  empleadoId: "",
  servicioId: "",
  metodoPago: "",
  monto: "",
};

export default function Home() {
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);
  const stats = useMemo(
    () => ({
      gastos: transactions
        .filter((t) => t.tipo === "Gasto")
        .reduce((sum, t) => sum + t.monto, 0),
      ventaTarjeta: transactions
        .filter((t) => t.tipo !== "Gasto" && t.pago === "Tarjeta")
        .reduce((sum, t) => sum + t.monto, 0),
      ventaProductos: transactions
        .filter((t) => t.tipo === "Producto")
        .reduce((sum, t) => sum + t.monto, 0),
    }),
    [transactions],
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<ServicioForm>(emptyForm);

  const totalPages = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE));
  const pageData = transactions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const selectedServicio = mockServiciosCatalogo.find(
    (s) => s.id === form.servicioId,
  );

  function handleServicioChange(id: string) {
    const servicio = mockServiciosCatalogo.find((s) => s.id === id);
    setForm((f) => ({
      ...f,
      servicioId: id,
      monto: servicio ? String(servicio.precio) : "",
    }));
  }

  function handleOpenChange(open: boolean) {
    setDialogOpen(open);
    if (!open) setForm(emptyForm);
  }

  function handleSubmit() {
    if (
      !form.ticket ||
      !form.empleadoId ||
      !form.servicioId ||
      !form.metodoPago
    )
      return;

    const empleado = mockEmpleados.find((e) => e.id === form.empleadoId);
    const monto = Number(form.monto) || selectedServicio?.precio || 0;
    const now = new Date();
    const hora = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newTransaction: Transaction = {
      id: `t-${Date.now()}`,
      hora,
      tipo: "Servicio",
      descripcion: selectedServicio?.nombre ?? "",
      empleado: empleado?.nombre.split(" ")[0] ?? "",
      pago: form.metodoPago as PaymentMethod,
      monto,
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setPage(1);
    handleOpenChange(false);
  }

  const isFormValid =
    form.ticket !== "" &&
    form.empleadoId !== "" &&
    form.servicioId !== "" &&
    form.metodoPago !== "";

  return (
    <RootLayout>
      <div className="flex flex-col gap-6 p-4 sm:p-6">
        <PageHeader
          title="Inicio"
          icon={<HouseIcon />}
          action={
            <>
              <Button
                variant="outline"
                size="sm"
                className="h-10 px-3 sm:h-7 sm:px-2.5"
              >
                Exportar
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button size="sm" className="h-10 px-3 sm:h-7 sm:px-2.5" />
                  }
                >
                  <PlusIcon weight="bold" />
                  Nuevo
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-48">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Registrar</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                      <ScissorsIcon />
                      Servicio
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <ArrowDownIcon />
                      Gasto
                      <span className="ml-auto text-xs text-muted-foreground">
                        Próximamente
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <TagIcon />
                      Producto
                      <span className="ml-auto text-xs text-muted-foreground">
                        Próximamente
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Gastos del día"
            value={
              <span className="select-none">
                <Spoiler>S/ {stats.gastos.toFixed(2)}</Spoiler>
              </span>
            }
          />
          <StatCard
            label="Venta con tarjeta"
            value={
              <span className="select-none">
                <Spoiler>S/ {stats.ventaTarjeta.toFixed(2)}</Spoiler>
              </span>
            }
          />
          <StatCard
            label="Venta de productos"
            value={
              <span className="select-none">
                <Spoiler>S/ {stats.ventaProductos.toFixed(2)}</Spoiler>
              </span>
            }
          />
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hora</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Empleado</TableHead>
                <TableHead>Pago</TableHead>
                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No hay movimientos registrados.
                  </TableCell>
                </TableRow>
              ) : (
                pageData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="tabular-nums">{row.hora}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={typeClass[row.tipo]}>
                        {row.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-36 truncate sm:max-w-none">
                      {row.descripcion}
                    </TableCell>
                    <TableCell>{row.empleado}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={paymentClass[row.pago]}
                      >
                        {row.pago}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      S/ {row.monto.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Página {page} de {totalPages} — {transactions.length} registros
            </p>
            <div className="flex flex-wrap gap-1 sm:flex-nowrap">
              <Button
                variant="outline"
                size="xs"
                className="h-10 min-w-10 px-3 sm:h-6 sm:min-w-6 sm:px-2"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Anterior
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={`page-${p}`}
                  variant={p === page ? "default" : "outline"}
                  size="xs"
                  className="h-10 min-w-10 px-3 sm:h-6 sm:min-w-6 sm:px-2"
                  aria-label={`Ir a la página ${p}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
              <Button
                variant="outline"
                size="xs"
                className="h-10 min-w-10 px-3 sm:h-6 sm:min-w-6 sm:px-2"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Registrar servicio</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 p-4">
            <Field>
              <FieldLabel htmlFor="input-ticket">Número de ticket</FieldLabel>
              <Input
                id="input-ticket"
                placeholder="ej. 0031"
                inputMode="numeric"
                value={form.ticket}
                onChange={(e) =>
                  setForm((f) => ({ ...f, ticket: e.target.value }))
                }
              />
            </Field>

            <Field>
              <FieldLabel>Personal</FieldLabel>
              <Select
                items={mockEmpleadosSelect}
                onValueChange={(value) =>
                  setForm((f) => ({ ...f, empleadoId: value as string }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={"Selecciona un empleado"} />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectGroup>
                    {mockEmpleadosSelect.map((emp) => (
                      <SelectItem key={emp.value} value={emp.value}>
                        {emp.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Servicio realizado</FieldLabel>
              <Select
                items={mockServiciosCatalogoSelect}
                onValueChange={(value) => handleServicioChange(value as string)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={"Selecciona un servicio"} />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectGroup>
                    {mockServiciosCatalogoSelect.map((servicio) => (
                      <SelectItem key={servicio.value} value={servicio.value}>
                        {servicio.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Método de pago</FieldLabel>

              <Select
                items={paymentOptions}
                onValueChange={(value) =>
                  setForm((f) => ({ ...f, metodoPago: value as string }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={"Selecciona método de pago"} />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectGroup>
                    {paymentOptions.map((metodo) => (
                      <SelectItem key={metodo.value} value={metodo.value}>
                        {metodo.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>
                Monto (S/)
                {selectedServicio && (
                  <span className="ml-1 font-normal text-muted-foreground">
                    — precio base S/ {selectedServicio.precio}
                  </span>
                )}
              </FieldLabel>
              <Input
                type="number"
                min="0"
                step="0.5"
                inputMode="decimal"
                placeholder="0.00"
                value={form.monto}
                onChange={(e) =>
                  setForm((f) => ({ ...f, monto: e.target.value }))
                }
              />
            </Field>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Cancelar
            </Button>
            <Button disabled={!isFormValid} onClick={handleSubmit}>
              Registrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RootLayout>
  );
}
