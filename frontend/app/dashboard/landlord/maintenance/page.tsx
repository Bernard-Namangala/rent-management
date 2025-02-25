"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Wrench,
  Building2,
} from "lucide-react";
import { MaintenanceList } from "@/components/maintenance/MaintenanceList";
import { MaintenanceSheet } from "@/components/maintenance/MaintenanceSheet";
import { MaintenanceFilters } from "@/components/maintenance/MaintenanceFilters";

type MaintenanceCategory =
  | "all"
  | "pending"
  | "in-progress"
  | "completed"
  | "urgent";

const categories = [
  { id: "all", label: "All Requests", icon: Wrench },
  { id: "pending", label: "Pending", icon: Clock },
  { id: "in-progress", label: "In Progress", icon: Building2 },
  { id: "completed", label: "Completed", icon: CheckCircle2 },
  { id: "urgent", label: "Urgent", icon: AlertTriangle },
] as const;

export default function MaintenancePage() {
  const [selectedCategory, setSelectedCategory] =
    useState<MaintenanceCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isMaintenanceSheetOpen, setIsMaintenanceSheetOpen] = useState(false);

  const handleAddRequest = () => {
    setIsMaintenanceSheetOpen(true);
  };

  const handleSubmitRequest = async (request: any) => {
    // TODO: Implement request submission logic
    console.log("Request submitted:", request);
    setIsMaintenanceSheetOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Maintenance</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track maintenance requests
          </p>
        </div>
        <Button onClick={handleAddRequest}>
          <Plus className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      {/* Requests */}
      <Card>
        <div className="border-b border-muted p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search and Filter */}
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search requests..."
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
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 border-t pt-4">
              <MaintenanceFilters />
            </div>
          )}
        </div>

        <Tabs
          defaultValue="all"
          onValueChange={(value) =>
            setSelectedCategory(value as MaintenanceCategory)
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

          {/* Request List */}
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="p-0">
              <MaintenanceList
                category={selectedCategory}
                searchQuery={searchQuery}
              />
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      <MaintenanceSheet
        open={isMaintenanceSheetOpen}
        onOpenChange={setIsMaintenanceSheetOpen}
        onSubmit={handleSubmitRequest}
      />
    </div>
  );
}
