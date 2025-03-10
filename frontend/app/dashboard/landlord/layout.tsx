"use client";

import { DashboardShell } from "@/components/dashboard/shell/DashboardShell";
import { ProtectedRoute } from "@/components/auth/protected/ProtectedRoute";

export default function LandlordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["LANDLORD"]}>
      <DashboardShell userType="landlord">{children}</DashboardShell>
    </ProtectedRoute>
  );
}
