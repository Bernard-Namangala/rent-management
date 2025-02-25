"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface TenantFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenant?: Tenant;
  onSubmit: (tenant: Tenant) => Promise<void>;
}

interface Tenant {
  id?: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: "active" | "pending" | "former";
  moveInDate: string;
  property: string;
  rentAmount: number;
  lastPayment?: string;
  leaseEnd: string;
}

const defaultTenant: Tenant = {
  name: "",
  email: "",
  phone: "",
  status: "pending",
  moveInDate: "",
  property: "",
  rentAmount: 0,
  leaseEnd: "",
};

const properties = [
  "Sunset Apartments #205",
  "Downtown Lofts #304",
  "Park View Heights #102",
  "River Gardens #405",
];

export function TenantFormDialog({
  open,
  onOpenChange,
  tenant,
  onSubmit,
}: TenantFormDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Tenant>(defaultTenant);

  // Reset form when dialog opens/closes or tenant changes
  useEffect(() => {
    if (open) {
      setFormData(tenant || defaultTenant);
    }
  }, [open, tenant]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving tenant:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof Tenant, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="h-full overflow-y-auto sm:max-w-[540px]">
        <div className="flex h-full flex-col">
          <SheetHeader>
            <SheetTitle>{tenant ? "Edit Tenant" : "Add New Tenant"}</SheetTitle>
          </SheetHeader>

          <form
            onSubmit={handleSubmit}
            className="flex flex-1 flex-col space-y-6"
          >
            <div className="flex-1 space-y-6 overflow-y-auto py-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Lease Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Lease Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="property">Property</Label>
                    <Select
                      value={formData.property}
                      onValueChange={(value) =>
                        handleInputChange("property", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                      <SelectContent>
                        {properties.map((property) => (
                          <SelectItem key={property} value={property}>
                            {property}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "active" | "pending" | "former") =>
                        handleInputChange("status", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="former">Former</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="rentAmount">Monthly Rent</Label>
                    <Input
                      id="rentAmount"
                      type="number"
                      min="0"
                      step="100"
                      value={formData.rentAmount}
                      onChange={(e) =>
                        handleInputChange("rentAmount", Number(e.target.value))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="moveInDate">Move-in Date</Label>
                    <Input
                      id="moveInDate"
                      type="date"
                      value={formData.moveInDate}
                      onChange={(e) =>
                        handleInputChange("moveInDate", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="leaseEnd">Lease End Date</Label>
                    <Input
                      id="leaseEnd"
                      type="date"
                      value={formData.leaseEnd}
                      onChange={(e) =>
                        handleInputChange("leaseEnd", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t px-6 py-6">
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {tenant ? "Update Tenant" : "Add Tenant"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
