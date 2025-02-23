"use client";

import { type ReactElement } from "react";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaintenanceList } from "@/components/maintenance/MaintenanceList";
import { MaintenanceSheet } from "@/components/maintenance/MaintenanceSheet";
import { MaintenanceFilters } from "@/components/maintenance/MaintenanceFilters";

interface MaintenanceRequest {
  title: string;
  description: string;
  priority: string;
  category: string;
  images?: File[];
}

export default function TenantMaintenancePage(): ReactElement {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [isNewRequestOpen, setIsNewRequestOpen] = useState<boolean>(false);

  const handleSubmitRequest = async (
    request: MaintenanceRequest
  ): Promise<void> => {
    // TODO: Implement request submission
    console.log("Submitting request:", request);
    setIsNewRequestOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Maintenance Requests</h1>
            <p className="text-sm text-muted-foreground">
              Submit and track your maintenance requests
            </p>
          </div>
          <Button onClick={() => setIsNewRequestOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search requests..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            Filters
          </Button>
        </div>

        {isFiltersOpen && (
          <div className="rounded-lg border bg-card p-4">
            <MaintenanceFilters />
          </div>
        )}
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <MaintenanceList category="all" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <MaintenanceList category="pending" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="in-progress" className="mt-4">
          <MaintenanceList category="in-progress" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <MaintenanceList category="completed" searchQuery={searchQuery} />
        </TabsContent>
        <TabsContent value="urgent" className="mt-4">
          <MaintenanceList category="urgent" searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>

      <MaintenanceSheet
        open={isNewRequestOpen}
        onOpenChange={setIsNewRequestOpen}
        onSubmit={handleSubmitRequest}
      />
    </div>
  );
}
