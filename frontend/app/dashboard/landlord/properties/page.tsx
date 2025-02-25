"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  LayoutGrid,
  List,
  Filter,
  Building2,
  Home,
  Building,
  Hotel,
} from "lucide-react";
import { PropertyGrid } from "@/components/properties/PropertyGrid";
import { PropertyList } from "@/components/properties/PropertyList";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { PropertyFormDialog } from "@/components/properties/PropertyFormDialog";
import { DeletePropertyDialog } from "@/components/properties/DeletePropertyDialog";

type ViewMode = "grid" | "list";
type PropertyCategory = "all" | "apartments" | "houses" | "commercial";

interface Property {
  id: string;
  name: string;
  address: string;
  type: string;
  status: "occupied" | "vacant" | "maintenance";
  image?: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  tenants?: number;
}

const categories = [
  { id: "all", label: "All Properties", icon: Building2 },
  { id: "apartments", label: "Apartments", icon: Building },
  { id: "houses", label: "Houses", icon: Home },
  { id: "commercial", label: "Commercial", icon: Hotel },
] as const;

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedCategory, setSelectedCategory] =
    useState<PropertyCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setIsEditDialogOpen(true);
  };

  const handleDeleteProperty = (property: Property) => {
    setSelectedProperty(property);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProperty) return;
    // TODO: Implement delete logic
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Deleting property:", selectedProperty.id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Properties</h1>
          <p className="text-sm text-muted-foreground">
            Manage and monitor your property portfolio
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>

      <Card>
        <div className="border-b border-muted p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search and Filter */}
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-muted" : ""}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 rounded-lg border">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-none rounded-l-lg"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="mr-2 h-4 w-4" />
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className="rounded-none rounded-r-lg"
                onClick={() => setViewMode("list")}
              >
                <List className="mr-2 h-4 w-4" />
                List
              </Button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 border-t pt-4">
              <PropertyFilters />
            </div>
          )}
        </div>

        <Tabs
          defaultValue="all"
          onValueChange={(value) =>
            setSelectedCategory(value as PropertyCategory)
          }
        >
          {/* Categories */}
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="relative rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-normal text-muted-foreground data-[state=active]:border-primary data-[state=active]:text-foreground"
                >
                  <category.icon className="mr-2 h-4 w-4" />
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Property Views */}
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="p-4">
              {viewMode === "grid" ? (
                <PropertyGrid
                  category={selectedCategory}
                  searchQuery={searchQuery}
                  onEdit={handleEditProperty}
                  onDelete={handleDeleteProperty}
                />
              ) : (
                <PropertyList
                  category={selectedCategory}
                  searchQuery={searchQuery}
                  onEdit={handleEditProperty}
                  onDelete={handleDeleteProperty}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      {/* Dialogs */}
      <PropertyFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
      {selectedProperty && (
        <>
          <PropertyFormDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            property={selectedProperty}
          />
          <DeletePropertyDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            propertyName={selectedProperty.name}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </div>
  );
}
