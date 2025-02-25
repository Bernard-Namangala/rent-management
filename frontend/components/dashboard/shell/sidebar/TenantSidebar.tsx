"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  Wrench,
  FileText,
  MessageSquare,
  Settings,
  Building2,
  PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarLink {
  title: string;
  href: string;
  icon: React.ElementType;
}

interface TenantSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const links: SidebarLink[] = [
  {
    title: "Overview",
    href: "/dashboard/tenant",
    icon: LayoutDashboard,
  },
  {
    title: "Payments",
    href: "/dashboard/tenant/payments",
    icon: Wallet,
  },
  {
    title: "Maintenance",
    href: "/dashboard/tenant/maintenance",
    icon: Wrench,
  },
  {
    title: "Documents",
    href: "/dashboard/tenant/documents",
    icon: FileText,
  },
  {
    title: "Messages",
    href: "/dashboard/tenant/messages",
    icon: MessageSquare,
  },
  {
    title: "My Unit",
    href: "/dashboard/tenant/unit",
    icon: Building2,
  },
];

const bottomLinks: SidebarLink[] = [
  {
    title: "Settings",
    href: "/dashboard/tenant/settings",
    icon: Settings,
  },
];

export function TenantSidebar({
  isCollapsed,
  onToggleCollapse,
}: TenantSidebarProps) {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/dashboard/tenant") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <div className="flex h-16 items-center justify-between px-2">
        {!isCollapsed && (
          <div className="flex items-center gap-2 px-2">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
            <span className="font-semibold">RentEase</span>
          </div>
        )}
        <Button
          variant="ghost"
          size={isCollapsed ? "icon" : "default"}
          className={cn(
            "flex h-9 items-center hover:bg-primary/5",
            isCollapsed ? "aspect-square w-full justify-center" : "justify-end"
          )}
          onClick={onToggleCollapse}
        >
          <PanelLeft
            className={cn(
              "h-4 w-4 transition-transform",
              isCollapsed && "rotate-180"
            )}
          />
        </Button>
      </div>
      <ScrollArea className="flex-1 overflow-auto">
        <nav className="flex flex-col gap-2 p-2">
          {links.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Button
                key={link.href}
                variant="ghost"
                size={isCollapsed ? "icon" : "default"}
                className={cn(
                  "relative flex w-full items-center gap-2 transition-all hover:-translate-y-0.5",
                  isCollapsed
                    ? "justify-center aspect-square"
                    : "justify-start",
                  active
                    ? "bg-primary/10 text-primary hover:bg-primary/15"
                    : "hover:bg-primary/5",
                  active &&
                    !isCollapsed &&
                    "after:absolute after:right-2 after:top-1/2 after:h-2 after:w-2 after:-translate-y-1/2 after:rounded-full after:bg-primary"
                )}
                asChild
              >
                <a href={link.href}>
                  <link.icon className="h-4 w-4" />
                  {!isCollapsed && <span>{link.title}</span>}
                </a>
              </Button>
            );
          })}
        </nav>
      </ScrollArea>
      <nav className="flex flex-col gap-2 border-t p-2">
        {bottomLinks.map((link) => {
          const active = isLinkActive(link.href);
          return (
            <Button
              key={link.href}
              variant="ghost"
              size={isCollapsed ? "icon" : "default"}
              className={cn(
                "relative flex w-full items-center gap-2 transition-all hover:-translate-y-0.5",
                isCollapsed ? "justify-center aspect-square" : "justify-start",
                active
                  ? "bg-primary/10 text-primary hover:bg-primary/15"
                  : "hover:bg-primary/5",
                active &&
                  !isCollapsed &&
                  "after:absolute after:right-2 after:top-1/2 after:h-2 after:w-2 after:-translate-y-1/2 after:rounded-full after:bg-primary"
              )}
              asChild
            >
              <a href={link.href}>
                <link.icon className="h-4 w-4" />
                {!isCollapsed && <span>{link.title}</span>}
              </a>
            </Button>
          );
        })}
      </nav>
    </>
  );
}
