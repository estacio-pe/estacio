"use client";

import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { RootLayout } from "@/components/root-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockProductos, type Producto } from "@/lib/mock-productos";

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>(mockProductos);

  const stockBajoList = productos.filter((p) => p.stock <= p.stockMinimo);
  const valorInventario = productos.reduce(
    (sum, p) => sum + p.stock * p.precio,
    0,
  );

  function updateStock(id: string, delta: number) {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p,
      ),
    );
  }

  return (
    <RootLayout>
      <div className="flex flex-col gap-6 p-4 sm:p-6">
        <PageHeader title="Productos" icon={<ShoppingBagIcon />} />

        {stockBajoList.length > 0 && (
          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="flex items-start gap-3 p-4">
              <WarningIcon
                className="mt-0.5 size-4 shrink-0 text-destructive"
                weight="fill"
              />
              <div>
                <Badge variant="destructive">Alerta de inventario</Badge>
                <p className="mt-2 text-xs font-medium text-foreground">
                  Stock bajo en {stockBajoList.length} producto
                  {stockBajoList.length > 1 ? "s" : ""}
                </p>
                <ul className="mt-1 max-h-28 list-disc overflow-auto pl-4 pr-1 text-xs text-muted-foreground">
                  {stockBajoList.map((p) => (
                    <li key={p.id}>
                      {p.nombre} — {p.stock} {p.unidad} (mín. {p.stockMinimo})
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total productos" value={productos.length} />
          <StatCard
            label="Stock bajo"
            value={stockBajoList.length}
            valueClassName="text-destructive"
          />
          <StatCard
            label="Valor del inventario"
            value={`S/ ${valorInventario.toFixed(2)}`}
          />
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead className="text-center">Stock</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="text-center">Ajustar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productos.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No hay productos registrados.
                  </TableCell>
                </TableRow>
              ) : (
                productos.map((prod) => {
                  const stockBajo = prod.stock <= prod.stockMinimo;
                  return (
                    <TableRow key={prod.id}>
                      <TableCell className="max-w-32 truncate font-medium sm:max-w-none">
                        {prod.nombre}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{prod.categoria}</Badge>
                      </TableCell>
                      <TableCell className="max-w-32 truncate text-muted-foreground sm:max-w-none">
                        {prod.proveedor}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        S/ {prod.precio.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center tabular-nums">
                        {prod.stock} {prod.unidad}
                      </TableCell>
                      <TableCell className="text-center">
                        {stockBajo ? (
                          <Badge variant="destructive">Stock bajo</Badge>
                        ) : (
                          <Badge variant="secondary">Disponible</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="outline"
                            size="icon-xs"
                            className="size-10 sm:size-6"
                            aria-label={`Reducir stock de ${prod.nombre}`}
                            disabled={prod.stock === 0}
                            onClick={() => updateStock(prod.id, -1)}
                          >
                            <MinusIcon />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon-xs"
                            className="size-10 sm:size-6"
                            aria-label={`Aumentar stock de ${prod.nombre}`}
                            onClick={() => updateStock(prod.id, 1)}
                          >
                            <PlusIcon />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </RootLayout>
  );
}
