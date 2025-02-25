"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Pencil,
  Trash,
  Users,
  Bed,
  Bath,
  Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Property {
  id: string;
  name: string;
  address: string;
  type: string;
  status: "occupied" | "vacant" | "maintenance";
  price: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  tenants?: number;
}

interface PropertyListProps {
  category: string;
  searchQuery: string;
  onEdit: (property: Property) => void;
  onDelete: (property: Property) => void;
}

type SortField = "name" | "status" | "price" | "size";
type SortOrder = "asc" | "desc";

// Mock data - replace with real data from API
const mockProperties: Property[] = [
  {
    id: "1",
    name: "Sunset Apartments #101",
    address: "123 Main St, New York, NY 10001",
    type: "apartments",
    status: "occupied",
    price: 2500,
    bedrooms: 2,
    bathrooms: 2,
    size: 1200,
    tenants: 2,
  },
  {
    id: "2",
    name: "Downtown Loft #304",
    address: "456 Park Ave, New York, NY 10002",
    type: "apartments",
    status: "vacant",
    price: 3200,
    bedrooms: 1,
    bathrooms: 1,
    size: 950,
  },
  {
    id: "3",
    name: "Harbor View House",
    address: "789 Ocean Dr, Miami, FL 33101",
    type: "houses",
    status: "maintenance",
    price: 4500,
    bedrooms: 4,
    bathrooms: 3,
    size: 2800,
  },
  {
    id: "4",
    name: "Tech Hub Office Space",
    address: "321 Innovation Way, San Francisco, CA 94101",
    type: "commercial",
    status: "occupied",
    price: 8500,
    bedrooms: 0,
    bathrooms: 2,
    size: 3500,
    tenants: 1,
  },
  {
    id: "5",
    name: "Skyline Apartments #505",
    address: "567 Heights Rd, Chicago, IL 60601",
    type: "apartments",
    status: "vacant",
    price: 2800,
    bedrooms: 2,
    bathrooms: 2,
    size: 1100,
  },
  {
    id: "6",
    name: "Garden Villa Estate",
    address: "890 Palm Ave, Los Angeles, CA 90001",
    type: "houses",
    status: "occupied",
    price: 5500,
    bedrooms: 5,
    bathrooms: 4,
    size: 3200,
    tenants: 4,
  },
  {
    id: "7",
    name: "Retail Space Downtown",
    address: "234 Market St, Seattle, WA 98101",
    type: "commercial",
    status: "vacant",
    price: 6000,
    bedrooms: 0,
    bathrooms: 2,
    size: 2500,
  },
  {
    id: "8",
    name: "Modern Studio Lofts",
    address: "432 Artist Row, Portland, OR 97201",
    type: "apartments",
    status: "occupied",
    price: 1800,
    bedrooms: 1,
    bathrooms: 1,
    size: 800,
    tenants: 1,
  },
];

const getStatusColor = (status: Property["status"]) => {
  switch (status) {
    case "occupied":
      return "bg-emerald-500";
    case "vacant":
      return "bg-amber-500";
    case "maintenance":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export function PropertyList({
  category,
  searchQuery,
  onEdit,
  onDelete,
}: PropertyListProps) {
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
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  const sortProperties = (properties: Property[]) => {
    return [...properties].sort((a, b) => {
      const modifier = sortOrder === "asc" ? 1 : -1;
      switch (sortField) {
        case "name":
          return a.name.localeCompare(b.name) * modifier;
        case "status":
          return a.status.localeCompare(b.status) * modifier;
        case "price":
          return (a.price - b.price) * modifier;
        case "size":
          return (a.size - b.size) * modifier;
        default:
          return 0;
      }
    });
  };

  const filteredProperties = mockProperties.filter((property) => {
    if (category !== "all" && property.type !== category) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        property.name.toLowerCase().includes(query) ||
        property.address.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const sortedProperties = sortProperties(filteredProperties);

  if (sortedProperties.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center">
        <div className="rounded-full bg-muted p-3">
          <Square className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-semibold">No properties found</h3>
        <p className="text-sm text-muted-foreground">
          {searchQuery
            ? "Try adjusting your search query"
            : "Add some properties to get started"}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="w-[300px] cursor-pointer"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                Property
                {getSortIcon("name")}
              </div>
            </TableHead>
            <TableHead
              className="w-[100px] cursor-pointer"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center">
                Status
                {getSortIcon("status")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer text-right"
              onClick={() => handleSort("price")}
            >
              <div className="flex items-center justify-end">
                Price
                {getSortIcon("price")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer text-right"
              onClick={() => handleSort("size")}
            >
              <div className="flex items-center justify-end">
                Size
                {getSortIcon("size")}
              </div>
            </TableHead>
            <TableHead className="w-[100px]">Details</TableHead>
            <TableHead className="w-[70px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProperties.map((property) => (
            <TableRow key={property.id}>
              <TableCell>
                <div className="font-medium">{property.name}</div>
                <div className="text-sm text-muted-foreground">
                  {property.address}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      getStatusColor(property.status)
                    )}
                  />
                  <span className="capitalize">{property.status}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                ${property.price.toLocaleString()}/mo
              </TableCell>
              <TableCell className="text-right">
                {property.size.toLocaleString()} sq ft
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="-mr-2 h-8 w-8 hover:bg-transparent"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(property)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => onDelete(property)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
