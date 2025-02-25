"use client";

import { DashboardShell } from "@/components/dashboard/shell/DashboardShell";
import { ProtectedRoute } from "@/components/auth/protected/ProtectedRoute";
export default function TenantDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["TENANT"]}>
      <DashboardShell userType="tenant">{children}</DashboardShell>
    </ProtectedRoute>
  );
}
