"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Upload,
  LayoutGrid,
  List,
  Filter,
  FileText,
  File,
  Wrench,
  Wallet,
} from "lucide-react";
import { DocumentGrid } from "@/components/documents/DocumentGrid";
import { DocumentList } from "@/components/documents/DocumentList";
import { DocumentUploadDialog } from "@/components/documents/DocumentUploadDialog";

type ViewMode = "grid" | "list";
type DocumentCategory =
  | "all"
  | "leases"
  | "contracts"
  | "maintenance"
  | "financial";

const categories = [
  { id: "all", label: "All Documents", icon: FileText },
  { id: "leases", label: "Leases", icon: File },
  { id: "contracts", label: "Contracts", icon: File },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "financial", label: "Financial", icon: Wallet },
] as const;

export default function DocumentsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedCategory, setSelectedCategory] =
    useState<DocumentCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Documents</h1>
          <p className="text-sm text-muted-foreground">
            Manage and organize your documents
          </p>
        </div>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
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
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon">
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
        </div>

        <Tabs
          defaultValue="all"
          onValueChange={(value) =>
            setSelectedCategory(value as DocumentCategory)
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

          {/* Document Views */}
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="p-4">
              {viewMode === "grid" ? (
                <DocumentGrid
                  category={selectedCategory}
                  searchQuery={searchQuery}
                />
              ) : (
                <DocumentList
                  category={selectedCategory}
                  searchQuery={searchQuery}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      <DocumentUploadDialog
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
      />
    </div>
  );
}
