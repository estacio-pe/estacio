"use client";

import {
  ArrowDownIcon,
  PlusIcon,
  ScissorsIcon,
  TagIcon,
} from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { Spoiler } from "spoiled";
import { RootLayout } from "@/components/root-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Efectivo:
    "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400",
  Tarjeta:
    "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-400",
  Yape: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/40 dark:text-purple-400",
};

const typeClass: Record<Transaction["tipo"], string> = {
  Servicio:
    "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-400",
  Producto:
    "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/40 dark:text-sky-400",
  Gasto:
    "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/40 dark:text-rose-400",
};

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

  const totalPages = Math.ceil(transactions.length / PAGE_SIZE);
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
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-end">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Exportar
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger render={<Button size="sm" />}>
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
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground">
                Gastos del día
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="select-none text-2xl font-semibold">
                <Spoiler>S/ {stats.gastos.toFixed(2)}</Spoiler>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground">
                Venta con tarjeta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="select-none text-2xl font-semibold">
                <Spoiler>S/ {stats.ventaTarjeta.toFixed(2)}</Spoiler>
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground">
                Venta de productos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="select-none text-2xl font-semibold">
                <Spoiler>S/ {stats.ventaProductos.toFixed(2)}</Spoiler>
              </p>
            </CardContent>
          </Card>
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
              {pageData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="tabular-nums">{row.hora}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={typeClass[row.tipo]}>
                      {row.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.descripcion}</TableCell>
                  <TableCell>{row.empleado}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={paymentClass[row.pago]}>
                      {row.pago}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    S/ {row.monto.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-xs text-muted-foreground">
              Página {page} de {totalPages} — {transactions.length} registros
            </p>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="xs"
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
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
              <Button
                variant="outline"
                size="xs"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Modal registro de servicio */}
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
                items={[
                  { value: "Efectivo", label: "Efectivo" },
                  { value: "Tarjeta", label: "Tarjeta" },
                  { value: "Yape", label: "Yape" },
                ]}
                onValueChange={(value) =>
                  setForm((f) => ({ ...f, metodoPago: value as string }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={"Selecciona método de pago"} />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectGroup>
                    {[
                      { value: "Efectivo", label: "Efectivo" },
                      { value: "Tarjeta", label: "Tarjeta" },
                      { value: "Yape", label: "Yape" },
                    ].map((metodo) => (
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
