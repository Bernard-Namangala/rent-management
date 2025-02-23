"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./UserMenu";
import { Notifications } from "./Notifications";
import { Search } from "./Search";

interface HeaderProps {
  userType: "landlord" | "tenant" | "admin";
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export function Header({
  userType,
  isSidebarCollapsed,
  onToggleSidebar,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-primary/10 bg-gradient-to-r from-background/80 to-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-primary/5"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Search />
        </div>
        <div className="flex items-center gap-2">
          <Notifications userType={userType} />
          <UserMenu userType={userType} />
        </div>
      </div>
    </header>
  );
}
