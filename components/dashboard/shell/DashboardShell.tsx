"use client";

import { type ReactNode, useState } from "react";
import { Header } from "./header/Header";
import { Sidebar } from "./sidebar/Sidebar";
import { cn } from "@/lib/utils";

export interface DashboardShellProps {
  children: ReactNode;
  userType: "landlord" | "tenant" | "admin";
}

export function DashboardShell({ children, userType }: DashboardShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div
        className={cn(
          "fixed inset-y-0 z-20 flex flex-col bg-card transition-all duration-300 ease-in-out",
          "border-r border-primary/10 shadow-[0_0_15px_rgba(124,58,237,0.1)]",
          isSidebarCollapsed ? "w-[80px]" : "w-[280px]"
        )}
      >
        <Sidebar
          userType={userType}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
      </div>
      <div
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          isSidebarCollapsed ? "ml-[80px]" : "ml-[280px]"
        )}
      >
        <Header
          userType={userType}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <main className="container flex-1 space-y-8 p-8">{children}</main>
      </div>
    </div>
  );
}
