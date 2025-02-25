"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  UserPlus,
  LayoutGrid,
  List,
  Filter,
  Users,
  Home,
  Clock,
  AlertCircle,
} from "lucide-react";
import { TenantGrid } from "@/components/tenants/TenantGrid";
import { TenantList } from "@/components/tenants/TenantList";
import { TenantFormDialog } from "@/components/tenants/TenantFormDialog";
import { TenantFilters } from "@/components/tenants/TenantFilters";

type ViewMode = "grid" | "list";
type TenantCategory = "all" | "active" | "pending" | "former";

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

const categories = [
  { id: "all", label: "All Tenants", icon: Users },
  { id: "active", label: "Active", icon: Home },
  { id: "pending", label: "Pending", icon: Clock },
  { id: "former", label: "Former", icon: AlertCircle },
] as const;

export default function TenantsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedCategory, setSelectedCategory] =
    useState<TenantCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | undefined>();

  const handleAddTenant = () => {
    setSelectedTenant(undefined);
    setIsFormOpen(true);
  };

  const handleEditTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setIsFormOpen(true);
  };

  const handleViewDetails = (tenant: Tenant) => {
    // TODO: Implement view details
    console.log("View details:", tenant);
  };

  const handleSubmitTenant = async (tenant: Tenant) => {
    // TODO: Implement API call to save tenant
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
    console.log("Saving tenant:", tenant);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tenants</h1>
          <p className="text-sm text-muted-foreground">
            Manage and organize your tenants
          </p>
        </div>
        <Button onClick={handleAddTenant}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Tenant
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
                  placeholder="Search tenants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
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
              <TenantFilters />
            </div>
          )}
        </div>

        <Tabs
          defaultValue="all"
          onValueChange={(value) =>
            setSelectedCategory(value as TenantCategory)
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

          {/* Tenant Views */}
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="p-4">
              {viewMode === "grid" ? (
                <TenantGrid
                  category={selectedCategory}
                  searchQuery={searchQuery}
                  onEdit={handleEditTenant}
                  onViewDetails={handleViewDetails}
                />
              ) : (
                <TenantList
                  category={selectedCategory}
                  searchQuery={searchQuery}
                  onEdit={handleEditTenant}
                  onViewDetails={handleViewDetails}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      <TenantFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        tenant={selectedTenant}
        onSubmit={handleSubmitTenant}
      />
    </div>
  );
}
