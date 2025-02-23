"use client";

import Link from "next/link";
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
  ChevronLeft,
  Menu,
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
  const basePath = `/${userType}`;
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

  return (
    <>
      <div className="flex h-16 items-center justify-between border-b border-primary/10 px-4">
        <Link href={`/${userType}`} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
            <Building className="h-5 w-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-semibold">RentEase</span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-primary/5"
          onClick={onToggleCollapse}
        >
          {isCollapsed ? (
            <Menu className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-4">
          <div className="space-y-1">
            {mainLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Button
                  key={link.href}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2 transition-all duration-200 ease-in-out",
                    "hover:bg-primary/5 hover:-translate-y-0.5",
                    "active:scale-95 active:bg-primary/10",
                    isActive &&
                      "bg-gradient-to-r from-primary/10 to-primary/5 border-r-2 border-primary",
                    isCollapsed && "px-3"
                  )}
                  asChild
                >
                  <Link href={link.href}>
                    <link.icon className="h-5 w-5" />
                    {!isCollapsed && link.title}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </ScrollArea>
      <div className="border-t border-primary/10 p-3">
        <div className="space-y-1">
          {bottomLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Button
                key={link.href}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 transition-all duration-200 ease-in-out",
                  "hover:bg-primary/5 hover:-translate-y-0.5",
                  "active:scale-95 active:bg-primary/10",
                  isActive &&
                    "bg-gradient-to-r from-primary/10 to-primary/5 border-r-2 border-primary",
                  isCollapsed && "px-3"
                )}
                asChild
              >
                <Link href={link.href}>
                  <link.icon className="h-5 w-5" />
                  {!isCollapsed && link.title}
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
}
