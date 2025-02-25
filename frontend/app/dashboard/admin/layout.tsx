"use client";

import { DashboardShell } from "@/components/dashboard/shell/DashboardShell";
import { ProtectedRoute } from "@/components/auth/protected/ProtectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <DashboardShell userType="admin">{children}</DashboardShell>
    </ProtectedRoute>
  );
}
