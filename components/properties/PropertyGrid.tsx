"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MoreVertical,
  Pencil,
  Trash,
  Users,
  Bed,
  Bath,
  Square,
  Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  image: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  tenants?: number;
}

interface PropertyGridProps {
  category: string;
  searchQuery: string;
  onEdit: (property: Property) => void;
  onDelete: (property: Property) => void;
}

// Mock data - replace with real data from API
const mockProperties: Property[] = [
  {
    id: "1",
    name: "Sunset Apartments #101",
    address: "123 Main St, New York, NY 10001",
    type: "apartments",
    status: "occupied",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
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

export function PropertyGrid({
  category,
  searchQuery,
  onEdit,
  onDelete,
}: PropertyGridProps) {
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

  if (filteredProperties.length === 0) {
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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredProperties.map((property) => (
        <div
          key={property.id}
          className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
        >
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={property.image}
              alt={property.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      getStatusColor(property.status)
                    )}
                  />
                  <span className="text-sm font-medium text-white capitalize">
                    {property.status}
                  </span>
                </div>
                <div className="text-lg font-semibold text-white">
                  ${property.price.toLocaleString()}/mo
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-background/50 hover:bg-background/80"
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
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold">{property.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {property.address}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Square className="h-4 w-4" />
                <span>{property.size}</span>
              </div>
            </div>
            {property.tenants && (
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{property.tenants} tenants</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
