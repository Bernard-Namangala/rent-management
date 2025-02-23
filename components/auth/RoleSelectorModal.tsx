"use client";

import * as React from "react";
import { Building2, Home, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import type { UserRole } from "@/types/auth";

interface RoleSelectorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoleSelect?: (role: UserRole) => void;
}

const roles = [
  {
    id: "LANDLORD",
    title: "Landlord",
    icon: Building2,
    description:
      "Property owners who want to manage their properties and tenants",
    features: [
      "Add and manage multiple properties",
      "Screen and manage tenants",
      "Collect rent and track payments",
      "Handle maintenance requests",
      "Generate financial reports",
      "Schedule property inspections",
      "Create lease agreements",
      "Organize community events",
    ],
  },
  {
    id: "TENANT",
    title: "Tenant",
    icon: Home,
    description:
      "Individuals looking to rent and manage their rental experience",
    features: [
      "Browse and apply for properties",
      "Pay rent online",
      "Submit maintenance requests",
      "Access rental history",
      "Split rent with roommates",
      "Sign lease agreements",
      "Purchase renter's insurance",
      "Communicate with landlords",
    ],
  },
];

export function RoleSelectorModal({
  open,
  onOpenChange,
  onRoleSelect,
}: RoleSelectorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Which role suits me?</DialogTitle>
          <DialogDescription>
            Choose the role that best matches your needs on RentEase
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="grid gap-6 py-4">
            {roles.map((role) => (
              <div
                key={role.id}
                className="group relative rounded-lg border p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <role.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold leading-none tracking-tight">
                      {role.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {role.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium leading-none">
                    Features:
                  </h4>
                  <ul className="grid gap-2 text-sm text-muted-foreground">
                    {role.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <span className="mr-2 h-1 w-1 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  className="absolute right-4 top-4"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onRoleSelect?.(role.id as UserRole);
                    onOpenChange(false);
                  }}
                >
                  Select
                  <span className="sr-only">Select {role.title} role</span>
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
