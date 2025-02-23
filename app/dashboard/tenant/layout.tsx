"use client";

import { DashboardShell } from "@/components/dashboard/shell/DashboardShell";

export default function TenantDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell userType="tenant">{children}</DashboardShell>;
}
