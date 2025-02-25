"use client";

import Image from "next/image";
import { MoreVertical, Mail, Phone, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: "active" | "pending" | "former";
  moveInDate: string;
  property: string;
  rentAmount: number;
  lastPayment: string;
  leaseEnd: string;
}

interface TenantGridProps {
  category: string;
  searchQuery: string;
  onEdit: (tenant: Tenant) => void;
  onViewDetails: (tenant: Tenant) => void;
}

// Mock data with Unsplash images
const mockTenants: Tenant[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 123-4567",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    status: "active",
    moveInDate: "2023-01-15",
    property: "Sunset Apartments #301",
    rentAmount: 1500,
    lastPayment: "2024-02-01",
    leaseEnd: "2024-12-31",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "(555) 234-5678",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    status: "active",
    moveInDate: "2023-03-01",
    property: "Downtown Lofts #205",
    rentAmount: 2000,
    lastPayment: "2024-02-01",
    leaseEnd: "2024-08-31",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    phone: "(555) 345-6789",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    status: "pending",
    moveInDate: "2024-03-01",
    property: "Park View Heights #102",
    rentAmount: 1800,
    lastPayment: "-",
    leaseEnd: "2025-02-28",
  },
  {
    id: "4",
    name: "David Kim",
    email: "d.kim@example.com",
    phone: "(555) 456-7890",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    status: "former",
    moveInDate: "2022-06-01",
    property: "River Gardens #405",
    rentAmount: 1600,
    lastPayment: "2023-12-01",
    leaseEnd: "2023-12-31",
  },
  {
    id: "5",
    name: "Rachel Thompson",
    email: "rachel.t@example.com",
    phone: "(555) 567-8901",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    status: "active",
    moveInDate: "2023-09-15",
    property: "Sunset Apartments #205",
    rentAmount: 1700,
    lastPayment: "2024-02-01",
    leaseEnd: "2024-09-14",
  },
  {
    id: "6",
    name: "James Wilson",
    email: "james.w@example.com",
    phone: "(555) 678-9012",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    status: "active",
    moveInDate: "2023-11-01",
    property: "Downtown Lofts #304",
    rentAmount: 2200,
    lastPayment: "2024-02-01",
    leaseEnd: "2024-10-31",
  },
];

const getStatusColor = (status: Tenant["status"]) => {
  switch (status) {
    case "active":
      return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20";
    case "pending":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
    case "former":
      return "bg-slate-500/10 text-slate-500 hover:bg-slate-500/20";
    default:
      return "";
  }
};

export function TenantGrid({
  category,
  searchQuery,
  onEdit,
  onViewDetails,
}: TenantGridProps) {
  // Filter tenants based on category and search query
  const filteredTenants = mockTenants.filter((tenant) => {
    const matchesCategory = category === "all" || tenant.status === category;
    const matchesSearch = tenant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredTenants.map((tenant) => (
        <div
          key={tenant.id}
          className="group relative overflow-hidden rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
        >
          <div className="absolute right-2 top-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onViewDetails(tenant)}>
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(tenant)}>
                  Edit Tenant
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="relative h-20 w-20">
              <Image
                src={tenant.avatar}
                alt={tenant.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="mt-4 font-semibold">{tenant.name}</h3>
            <Badge
              className={cn("mt-2 capitalize", getStatusColor(tenant.status))}
            >
              {tenant.status}
            </Badge>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Home className="h-4 w-4" />
              <span className="truncate">{tenant.property}</span>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{tenant.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{tenant.phone}</span>
            </div>
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Rent</p>
                <p className="font-medium">
                  ${tenant.rentAmount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Payment</p>
                <p className="font-medium">{tenant.lastPayment}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Move In</p>
                <p className="font-medium">{tenant.moveInDate}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Lease End</p>
                <p className="font-medium">{tenant.leaseEnd}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
