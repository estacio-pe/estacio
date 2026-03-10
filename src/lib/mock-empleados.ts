export type CompensationType = "sueldo" | "porcentaje";

export interface Empleado {
  id: string;
  nombre: string;
  cargo: string;
  tipo: CompensationType;
  monto: number; // sueldo fijo en S/ o porcentaje de comisión (0–100)
  activo: boolean;
  telefono: string;
  fechaIngreso: string;
}

export const mockEmpleados: Empleado[] = [
  {
    id: "1",
    nombre: "Carlos Ríos",
    cargo: "Barbero",
    tipo: "porcentaje",
    monto: 40,
    activo: true,
    telefono: "921 456 789",
    fechaIngreso: "2022-03-15",
  },
  {
    id: "2",
    nombre: "María López",
    cargo: "Estilista",
    tipo: "porcentaje",
    monto: 45,
    activo: true,
    telefono: "934 567 890",
    fechaIngreso: "2021-08-01",
  },
  {
    id: "3",
    nombre: "Ana Pérez",
    cargo: "Estilista Senior",
    tipo: "porcentaje",
    monto: 50,
    activo: true,
    telefono: "945 678 901",
    fechaIngreso: "2020-01-10",
  },
  {
    id: "4",
    nombre: "Luis Torres",
    cargo: "Barbero",
    tipo: "sueldo",
    monto: 1800,
    activo: true,
    telefono: "956 789 012",
    fechaIngreso: "2023-05-20",
  },
  {
    id: "5",
    nombre: "Rosa Sánchez",
    cargo: "Recepcionista",
    tipo: "sueldo",
    monto: 1400,
    activo: true,
    telefono: "967 890 123",
    fechaIngreso: "2023-09-01",
  },
];
