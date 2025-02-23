"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Settings,
  User,
  CreditCard,
  Building,
  LogOut,
  Users,
  FileText,
  Shield,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  userType: "landlord" | "tenant" | "admin";
}

interface MenuItem {
  href: string;
  label: string;
  icon: React.ElementType;
  description?: string;
}

const getMenuItems = (userType: string): MenuItem[] => {
  const basePath = `/${userType}`;

  const commonItems = [
    {
      href: `${basePath}/profile`,
      label: "Profile",
      icon: User,
      description: "Manage your account settings",
    },
    {
      href: `${basePath}/settings`,
      label: "Settings",
      icon: Settings,
      description: "Customize your preferences",
    },
  ];

  switch (userType) {
    case "landlord":
      return [
        ...commonItems,
        {
          href: `${basePath}/properties`,
          label: "Properties",
          icon: Building,
          description: "View and manage your properties",
        },
        {
          href: `${basePath}/billing`,
          label: "Billing",
          icon: CreditCard,
          description: "Manage your subscription and billing",
        },
      ];
    case "tenant":
      return [
        ...commonItems,
        {
          href: `${basePath}/rentals`,
          label: "My Rentals",
          icon: Building,
          description: "View your rental properties",
        },
        {
          href: `${basePath}/payments`,
          label: "Payments",
          icon: CreditCard,
          description: "Manage your rent payments",
        },
      ];
    case "admin":
      return [
        ...commonItems,
        {
          href: `${basePath}/users`,
          label: "Users",
          icon: Users,
          description: "Manage platform users",
        },
        {
          href: `${basePath}/reports`,
          label: "Reports",
          icon: FileText,
          description: "View system reports and analytics",
        },
        {
          href: `${basePath}/security`,
          label: "Security",
          icon: Shield,
          description: "Monitor platform security",
        },
      ];
    default:
      return commonItems;
  }
};

export function UserMenu({ userType }: UserMenuProps) {
  const menuItems = getMenuItems(userType);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 flex items-center gap-2 rounded-full hover:bg-primary/5"
        >
          <div className="relative h-8 w-8">
            <Image
              src="https://i.pravatar.cc/32"
              alt="User avatar"
              fill
              className="rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-500" />
          </div>
          <span className="hidden md:inline-flex text-sm font-medium">
            John Doe
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 mt-2"
        align="end"
        sideOffset={5}
        alignOffset={-5}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs text-muted-foreground">doe@gmail.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItems.map((item) => (
            <DropdownMenuItem
              key={item.href}
              className="p-3 cursor-pointer transition-colors hover:bg-primary/5 focus:bg-primary/5"
              asChild
            >
              <Link href={item.href} className="flex items-start gap-3">
                <item.icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {item.label}
                  </p>
                  {item.description && (
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {item.description}
                    </p>
                  )}
                </div>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-3 cursor-pointer text-red-600 transition-colors hover:bg-red-50 focus:bg-red-50">
          <LogOut className="mr-3 h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Log out</p>
            <p className="text-xs text-red-600/70">End your current session</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
