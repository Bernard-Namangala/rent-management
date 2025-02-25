"use client";

import { MoreVertical, Bed, Bath, Ruler, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Unit {
  id: string;
  number: string;
  type: string;
  floor: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  rent: number;
  status: "occupied" | "vacant" | "maintenance";
  tenant?: string;
  leaseEnd?: string;
  amenities: string[];
  images: string[];
}

interface UnitListProps {
  category: string;
  searchQuery: string;
}

// Mock data - replace with real data from API
const mockUnits: Unit[] = [
  {
    id: "1",
    number: "101",
    type: "1 Bedroom",
    floor: 1,
    size: 750,
    bedrooms: 1,
    bathrooms: 1,
    rent: 1200,
    status: "occupied",
    tenant: "John Doe",
    leaseEnd: "2024-12-31",
    amenities: ["Balcony", "Dishwasher", "Central AC"],
    images: ["https://placehold.co/600x400/png?text=Unit+101"],
  },
  {
    id: "2",
    number: "102",
    type: "2 Bedroom",
    floor: 1,
    size: 1000,
    bedrooms: 2,
    bathrooms: 2,
    rent: 1800,
    status: "vacant",
    amenities: ["Balcony", "Dishwasher", "Central AC", "Walk-in Closet"],
    images: ["https://placehold.co/600x400/png?text=Unit+102"],
  },
  {
    id: "3",
    number: "201",
    type: "Studio",
    floor: 2,
    size: 500,
    bedrooms: 0,
    bathrooms: 1,
    rent: 900,
    status: "maintenance",
    amenities: ["Central AC"],
    images: ["https://placehold.co/600x400/png?text=Unit+201"],
  },
];

const getStatusColor = (status: Unit["status"]) => {
  switch (status) {
    case "occupied":
      return "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20";
    case "vacant":
      return "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20";
    case "maintenance":
      return "bg-yellow-500/10 text-yellow-500 dark:bg-yellow-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 dark:bg-gray-500/20";
  }
};

export function UnitList({ category, searchQuery }: UnitListProps) {
  // Filter units based on category and search query
  const filteredUnits = mockUnits.filter((unit) => {
    const matchesCategory = category === "all" || unit.status === category;
    const matchesSearch = unit.number
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Unit</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Beds/Baths</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tenant</TableHead>
            <TableHead>Rent</TableHead>
            <TableHead>Lease End</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUnits.map((unit) => (
            <TableRow key={unit.id}>
              <TableCell className="font-medium">{unit.number}</TableCell>
              <TableCell>{unit.type}</TableCell>
              <TableCell>{unit.size} sq ft</TableCell>
              <TableCell>
                {unit.bedrooms} bed, {unit.bathrooms} bath
              </TableCell>
              <TableCell>
                <Badge
                  className={getStatusColor(unit.status)}
                  variant="secondary"
                >
                  {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{unit.tenant || "No Tenant"}</TableCell>
              <TableCell>${unit.rent}</TableCell>
              <TableCell>{unit.leaseEnd || "N/A"}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Unit</DropdownMenuItem>
                    <DropdownMenuItem>Schedule Maintenance</DropdownMenuItem>
                    {unit.status === "vacant" && (
                      <DropdownMenuItem>List for Rent</DropdownMenuItem>
                    )}
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
