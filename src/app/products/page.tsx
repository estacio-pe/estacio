"use client";

import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { RootLayout } from "@/components/root-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center gap-2">
          <ShoppingBagIcon className="size-5 text-muted-foreground" />
          <h1 className="text-sm font-semibold">Productos</h1>
        </div>

        {stockBajoList.length > 0 && (
          <div className="flex items-start gap-3 border border-amber-500/30 bg-amber-500/10 p-4">
            <WarningIcon
              className="mt-0.5 size-4 shrink-0 text-amber-500"
              weight="fill"
            />
            <div>
              <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
                Stock bajo en {stockBajoList.length} producto
                {stockBajoList.length > 1 ? "s" : ""}
              </p>
              <ul className="mt-1 list-disc pl-4 text-xs text-amber-600/80 dark:text-amber-400/80">
                {stockBajoList.map((p) => (
                  <li key={p.id}>
                    {p.nombre} — {p.stock} {p.unidad} (mín. {p.stockMinimo})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total productos" value={productos.length} />
          <StatCard
            label="Stock bajo"
            value={stockBajoList.length}
            valueClassName="text-amber-500"
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
              {productos.map((prod) => {
                const stockBajo = prod.stock <= prod.stockMinimo;
                return (
                  <TableRow key={prod.id}>
                    <TableCell className="font-medium">{prod.nombre}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{prod.categoria}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
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
                        <Badge variant="secondary">OK</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="outline"
                          size="icon-xs"
                          disabled={prod.stock === 0}
                          onClick={() => updateStock(prod.id, -1)}
                        >
                          <MinusIcon />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon-xs"
                          onClick={() => updateStock(prod.id, 1)}
                        >
                          <PlusIcon />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>
    </RootLayout>
  );
}
