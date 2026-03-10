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
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
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

const navItems = [
  { label: "Inicio", icon: HouseIcon, href: "/" },
  { label: "Empleados", icon: UsersIcon, href: "/employees" },
  { label: "Servicios", icon: ScissorsIcon, href: "/services" },
  { label: "Productos", icon: ShoppingBagIcon, href: "/products" },
  { label: "Reportes", icon: ChartBarIcon, href: "/reports" },
  { label: "Historial", icon: ClockIcon, href: "/history" },
];

export function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={isActive}
                      render={<Link href={item.href} />}
                    >
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

      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
