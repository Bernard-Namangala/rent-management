"use client";

import { useState } from "react";
import { Grid2X2, List, Plus, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UnitGrid } from "@/components/units/UnitGrid";
import { UnitList } from "@/components/units/UnitList";
import { UnitFilters } from "@/components/units/UnitFilters";
import { UnitFormDialog } from "@/components/units/UnitFormDialog";

export default function UnitsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showAddUnit, setShowAddUnit] = useState(false);

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Units</h1>
          <Button onClick={() => setShowAddUnit(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Unit
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search units..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-accent" : ""}
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-accent" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList>
            <TabsTrigger value="all">All Units</TabsTrigger>
            <TabsTrigger value="occupied">Occupied</TabsTrigger>
            <TabsTrigger value="vacant">Vacant</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>
          <TabsContent value={selectedCategory} className="mt-6">
            {viewMode === "grid" ? (
              <UnitGrid category={selectedCategory} searchQuery={searchQuery} />
            ) : (
              <UnitList category={selectedCategory} searchQuery={searchQuery} />
            )}
          </TabsContent>
        </Tabs>
      </div>

      <UnitFilters open={showFilters} onClose={() => setShowFilters(false)} />
      <UnitFormDialog
        open={showAddUnit}
        onClose={() => setShowAddUnit(false)}
      />
    </div>
  );
}
