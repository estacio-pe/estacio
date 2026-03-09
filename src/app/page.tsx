"use client";

import {
  ChartBarIcon,
  ClockIcon,
  GearIcon,
  HouseIcon,
  ScissorsIcon,
  ShoppingBagIcon,
  SignOutIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Spoiler } from "spoiled";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockTransactions, summaryStats, type Transaction } from "@/lib/mock";

const PAGE_SIZE = 10;

const navItems = [
  { label: "Inicio", icon: HouseIcon, active: true },
  { label: "Empleados", icon: UsersIcon, active: false },
  { label: "Servicios", icon: ScissorsIcon, active: false },
  { label: "Productos", icon: ShoppingBagIcon, active: false },
  { label: "Reportes", icon: ChartBarIcon, active: false },
  { label: "Historial", icon: ClockIcon, active: false },
];

const paymentBadge: Record<Transaction["pago"], string> = {
  Efectivo:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  Tarjeta: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  Yape: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
};

const typeBadge: Record<Transaction["tipo"], string> = {
  Servicio:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  Producto: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400",
  Gasto: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400",
};

export default function Home() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(mockTransactions.length / PAGE_SIZE);
  const pageData = mockTransactions.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <SidebarProvider open>
      <Sidebar collapsible="none" className="sticky top-0 h-svh border-r">
        <SidebarHeader className="px-4 py-5">
          <div className="flex items-center gap-2">
            <ScissorsIcon className="size-5 text-primary" weight="bold" />
            <span className="text-sm font-semibold tracking-tight">
              Estacio
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menú</SidebarGroupLabel>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton isActive={item.active}>
                      <Icon />
                      {item.label}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <GearIcon />
                Configuración
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <SignOutIcon />
                Cerrar sesión
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <div className="flex flex-col gap-6 p-6">
          <div className="flex justify-end">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Exportar
              </Button>
              <Button size="sm">Nuevo</Button>
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
                <p className="text-2xl font-semibold select-none">
                  <Spoiler>S/ {summaryStats.gastos.toFixed(2)}</Spoiler>
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
                <p className="text-2xl font-semibold select-none">
                  <Spoiler>S/ {summaryStats.ventaTarjeta.toFixed(2)}</Spoiler>
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
                <p className="text-2xl font-semibold select-none">
                  <Spoiler>S/ {summaryStats.ventaProductos.toFixed(2)}</Spoiler>
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
                      <span
                        className={`rounded px-1.5 py-0.5 text-xs font-medium`}
                      >
                        {row.tipo}
                      </span>
                    </TableCell>
                    <TableCell>{row.descripcion}</TableCell>
                    <TableCell>{row.empleado}</TableCell>
                    <TableCell>
                      <span
                        className={`rounded px-1.5 py-0.5 text-xs font-medium`}
                      >
                        {row.pago}
                      </span>
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
                Página {page} de {totalPages} — {mockTransactions.length}{" "}
                registros
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Button
                      key={`page-${p}`}
                      variant={p === page ? "default" : "outline"}
                      size="xs"
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Button>
                  ),
                )}
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
      </SidebarInset>
    </SidebarProvider>
  );
}
