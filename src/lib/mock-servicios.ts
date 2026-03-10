export type CategoriaServicio =
  | "Corte"
  | "Color"
  | "Tratamiento"
  | "Barba"
  | "Peinado"
  | "Depilación";

export interface ServicioCatalogo {
  id: string;
  nombre: string;
  precio: number;
  duracionMin: number;
  categoria: CategoriaServicio;
}

export interface ServicioStat {
  id: string;
  nombre: string;
  cantidadMes: number;
  ingresosMes: number;
  precioPromedio: number;
}

export interface RendimientoEmpleado {
  empleado: string;
  cantidad: number;
  ingresos: number;
}

export const mockServiciosCatalogo: ServicioCatalogo[] = [
  {
    id: "s1",
    nombre: "Corte de cabello",
    precio: 25,
    duracionMin: 30,
    categoria: "Corte",
  },
  {
    id: "s2",
    nombre: "Corte infantil",
    precio: 18,
    duracionMin: 20,
    categoria: "Corte",
  },
  {
    id: "s3",
    nombre: "Corte + lavado",
    precio: 35,
    duracionMin: 45,
    categoria: "Corte",
  },
  {
    id: "s4",
    nombre: "Corte + lavado + secado",
    precio: 45,
    duracionMin: 60,
    categoria: "Corte",
  },
  {
    id: "s5",
    nombre: "Corte fade",
    precio: 30,
    duracionMin: 40,
    categoria: "Corte",
  },
  {
    id: "s6",
    nombre: "Barba y bigote",
    precio: 15,
    duracionMin: 20,
    categoria: "Barba",
  },
  {
    id: "s7",
    nombre: "Corte + barba",
    precio: 30,
    duracionMin: 50,
    categoria: "Barba",
  },
  {
    id: "s8",
    nombre: "Tinte completo",
    precio: 120,
    duracionMin: 120,
    categoria: "Color",
  },
  {
    id: "s9",
    nombre: "Coloración parcial",
    precio: 75,
    duracionMin: 90,
    categoria: "Color",
  },
  {
    id: "s10",
    nombre: "Mechas californianas",
    precio: 140,
    duracionMin: 150,
    categoria: "Color",
  },
  {
    id: "s11",
    nombre: "Alisado brasileño",
    precio: 180,
    duracionMin: 180,
    categoria: "Tratamiento",
  },
  {
    id: "s12",
    nombre: "Alaciado permanente",
    precio: 160,
    duracionMin: 180,
    categoria: "Tratamiento",
  },
  {
    id: "s13",
    nombre: "Tratamiento con keratina",
    precio: 200,
    duracionMin: 180,
    categoria: "Tratamiento",
  },
  {
    id: "s14",
    nombre: "Hidratación capilar",
    precio: 55,
    duracionMin: 60,
    categoria: "Tratamiento",
  },
  {
    id: "s15",
    nombre: "Peinado para evento",
    precio: 60,
    duracionMin: 60,
    categoria: "Peinado",
  },
  {
    id: "s16",
    nombre: "Recogido para boda",
    precio: 90,
    duracionMin: 90,
    categoria: "Peinado",
  },
  {
    id: "s17",
    nombre: "Depilación de cejas",
    precio: 12,
    duracionMin: 15,
    categoria: "Depilación",
  },
];

export const mockServicioStats: ServicioStat[] = [
  {
    id: "s13",
    nombre: "Tratamiento con keratina",
    cantidadMes: 12,
    ingresosMes: 2400,
    precioPromedio: 200,
  },
  {
    id: "s10",
    nombre: "Mechas californianas",
    cantidadMes: 14,
    ingresosMes: 1960,
    precioPromedio: 140,
  },
  {
    id: "s8",
    nombre: "Tinte completo",
    cantidadMes: 18,
    ingresosMes: 2160,
    precioPromedio: 120,
  },
  {
    id: "s11",
    nombre: "Alisado brasileño",
    cantidadMes: 10,
    ingresosMes: 1800,
    precioPromedio: 180,
  },
  {
    id: "s1",
    nombre: "Corte de cabello",
    cantidadMes: 48,
    ingresosMes: 1200,
    precioPromedio: 25,
  },
  {
    id: "s5",
    nombre: "Corte fade",
    cantidadMes: 32,
    ingresosMes: 960,
    precioPromedio: 30,
  },
  {
    id: "s9",
    nombre: "Coloración parcial",
    cantidadMes: 16,
    ingresosMes: 1200,
    precioPromedio: 75,
  },
  {
    id: "s7",
    nombre: "Corte + barba",
    cantidadMes: 24,
    ingresosMes: 720,
    precioPromedio: 30,
  },
  {
    id: "s15",
    nombre: "Peinado para evento",
    cantidadMes: 8,
    ingresosMes: 480,
    precioPromedio: 60,
  },
  {
    id: "s17",
    nombre: "Depilación de cejas",
    cantidadMes: 22,
    ingresosMes: 264,
    precioPromedio: 12,
  },
];

export const mockRendimientoEmpleados: RendimientoEmpleado[] = [
  { empleado: "Ana Pérez", cantidad: 68, ingresos: 5240 },
  { empleado: "María López", cantidad: 74, ingresos: 4185 },
  { empleado: "Carlos Ríos", cantidad: 86, ingresos: 2430 },
  { empleado: "Luis Torres", cantidad: 52, ingresos: 1560 },
];
