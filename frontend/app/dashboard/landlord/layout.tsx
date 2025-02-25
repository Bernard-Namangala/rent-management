"use client";

import { DashboardShell } from "@/components/dashboard/shell/DashboardShell";

export default function LandlordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell userType="landlord">{children}</DashboardShell>;
}
