"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building,
  Users,
  Wallet,
  Settings,
  Wrench,
  MessageSquare,
  FileText,
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

interface SidebarProps {
  userType: "landlord" | "tenant" | "admin";
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const getLinksByUserType = (userType: string): SidebarLink[] => {
  const basePath = `/dashboard/${userType}`;

  const commonLinks = [
    {
      title: "Overview",
      href: basePath,
      icon: LayoutDashboard,
    },
    {
      title: "Messages",
      href: `${basePath}/messages`,
      icon: MessageSquare,
    },
    {
      title: "Documents",
      href: `${basePath}/documents`,
      icon: FileText,
    },
  ];

  switch (userType) {
    case "landlord":
      return [
        ...commonLinks,
        {
          title: "Properties",
          href: `${basePath}/properties`,
          icon: Building,
        },
        {
          title: "Tenants",
          href: `${basePath}/tenants`,
          icon: Users,
        },
        {
          title: "Finances",
          href: `${basePath}/finances`,
          icon: Wallet,
        },
        {
          title: "Maintenance",
          href: `${basePath}/maintenance`,
          icon: Wrench,
        },
      ];
    case "tenant":
      return [
        ...commonLinks,
        {
          title: "My Rentals",
          href: `${basePath}/rentals`,
          icon: Building,
        },
        {
          title: "Payments",
          href: `${basePath}/payments`,
          icon: Wallet,
        },
        {
          title: "Maintenance",
          href: `${basePath}/maintenance`,
          icon: Wrench,
        },
      ];
    case "admin":
      return [
        ...commonLinks,
        {
          title: "Users",
          href: `${basePath}/users`,
          icon: Users,
        },
        {
          title: "Properties",
          href: `${basePath}/properties`,
          icon: Building,
        },
        {
          title: "Reports",
          href: `${basePath}/reports`,
          icon: FileText,
        },
      ];
    default:
      return commonLinks;
  }
};

const getBottomLinks = (userType: string): SidebarLink[] => {
  const basePath = `/dashboard/${userType}`;
  return [
    {
      title: "Settings",
      href: `${basePath}/settings`,
      icon: Settings,
    },
  ];
};

export function Sidebar({
  userType,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const mainLinks = getLinksByUserType(userType);
  const bottomLinks = getBottomLinks(userType);

  const isLinkActive = (href: string) => {
    if (href === `/dashboard/${userType}`) {
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
          {mainLinks.map((link) => {
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
