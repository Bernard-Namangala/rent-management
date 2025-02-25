"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Mail,
  Phone,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

interface TenantListProps {
  category: string;
  searchQuery: string;
  onEdit: (tenant: Tenant) => void;
  onViewDetails: (tenant: Tenant) => void;
}

type SortField = "name" | "status" | "property" | "rentAmount" | "leaseEnd";
type SortOrder = "asc" | "desc";

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

export function TenantList({
  category,
  searchQuery,
  onEdit,
  onViewDetails,
}: TenantListProps) {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  // Filter and sort tenants
  const filteredTenants = mockTenants
    .filter((tenant) => {
      const matchesCategory = category === "all" || tenant.status === category;
      const matchesSearch = tenant.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const modifier = sortOrder === "asc" ? 1 : -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * modifier;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * modifier;
      }

      return 0;
    });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tenant</TableHead>
          <TableHead>
            <Button
              variant="ghost"
              className="h-8 px-2 hover:bg-transparent"
              onClick={() => handleSort("status")}
            >
              <span>Status</span>
              {getSortIcon("status")}
            </Button>
          </TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>
            <Button
              variant="ghost"
              className="h-8 px-2 hover:bg-transparent"
              onClick={() => handleSort("property")}
            >
              <span>Property</span>
              {getSortIcon("property")}
            </Button>
          </TableHead>
          <TableHead>
            <Button
              variant="ghost"
              className="h-8 px-2 hover:bg-transparent"
              onClick={() => handleSort("rentAmount")}
            >
              <span>Rent</span>
              {getSortIcon("rentAmount")}
            </Button>
          </TableHead>
          <TableHead>
            <Button
              variant="ghost"
              className="h-8 px-2 hover:bg-transparent"
              onClick={() => handleSort("leaseEnd")}
            >
              <span>Lease End</span>
              {getSortIcon("leaseEnd")}
            </Button>
          </TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTenants.map((tenant) => (
          <TableRow key={tenant.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10">
                  <Image
                    src={tenant.avatar}
                    alt={tenant.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{tenant.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Move in: {tenant.moveInDate}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                className={cn("capitalize", getStatusColor(tenant.status))}
              >
                {tenant.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-sm">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span className="truncate">{tenant.email}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span>{tenant.phone}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Home className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{tenant.property}</span>
              </div>
            </TableCell>
            <TableCell>${tenant.rentAmount.toLocaleString()}</TableCell>
            <TableCell>{tenant.leaseEnd}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
