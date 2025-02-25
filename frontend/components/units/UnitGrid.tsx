"use client";

import Image from "next/image";
import { useState } from "react";
import { MoreVertical, Bed, Bath, Ruler, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

interface UnitGridProps {
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

export function UnitGrid({ category, searchQuery }: UnitGridProps) {
  // Filter units based on category and search query
  const filteredUnits = mockUnits.filter((unit) => {
    const matchesCategory = category === "all" || unit.status === category;
    const matchesSearch = unit.number
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredUnits.map((unit) => (
        <Card key={unit.id} className="overflow-hidden">
          <div className="relative aspect-video">
            <Image
              src={unit.images[0]}
              alt={`Unit ${unit.number}`}
              fill
              className="object-cover"
            />
          </div>
          <CardHeader className="relative">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Unit {unit.number}</CardTitle>
                <CardDescription>{unit.type}</CardDescription>
              </div>
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
            </div>
            <Badge className={getStatusColor(unit.status)} variant="secondary">
              {unit.status.charAt(0).toUpperCase() + unit.status.slice(1)}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {unit.bedrooms} {unit.bedrooms === 1 ? "Bed" : "Beds"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {unit.bathrooms} {unit.bathrooms === 1 ? "Bath" : "Baths"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{unit.size} sq ft</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{unit.tenant || "No Tenant"}</span>
              </div>
            </div>
            <div className="flex items-baseline justify-between border-t pt-4">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Rent</p>
                <p className="text-lg font-semibold">${unit.rent}</p>
              </div>
              {unit.leaseEnd && (
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Lease Ends</p>
                  <p className="text-sm">{unit.leaseEnd}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
