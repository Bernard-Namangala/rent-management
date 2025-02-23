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
  Calendar,
  Users,
  AlertCircle,
  Download,
  PenLine,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { DocumentSignDialog } from "@/components/documents/DocumentSignDialog";
import { DocumentUploadDialog } from "@/components/documents/DocumentUploadDialog";
import { toast } from "sonner";

type ViewMode = "grid" | "list";
type DocumentCategory = "all" | "lease" | "policies" | "insurance" | "forms";

const categories = [
  { id: "all", label: "All Documents", icon: FileText },
  { id: "lease", label: "Lease", icon: File },
  { id: "policies", label: "Building Policies", icon: File },
  { id: "insurance", label: "Insurance", icon: File },
  { id: "forms", label: "Forms", icon: File },
] as const;

// Mock lease data
const leaseInfo = {
  status: "Active",
  startDate: "2023-09-01",
  endDate: "2024-08-31",
  monthlyRent: 1500,
  securityDeposit: 2250,
  occupants: ["John Doe", "Jane Doe"],
  terms: [
    "Rent due on the 1st of each month",
    "60-day notice required for move-out",
    "No pets allowed without prior approval",
    "Utilities not included in rent",
  ],
};

// Mock documents data
const documents = [
  {
    id: "1",
    name: "Current Lease Agreement",
    category: "lease",
    date: "2023-09-01",
    size: "2.5 MB",
    requiresSignature: true,
    signed: false,
  },
  {
    id: "2",
    name: "Building Rules and Regulations",
    category: "policies",
    date: "2023-09-01",
    size: "1.2 MB",
    requiresSignature: false,
    signed: false,
  },
  {
    id: "3",
    name: "Renter's Insurance Policy",
    category: "insurance",
    date: "2023-09-01",
    size: "850 KB",
    requiresSignature: true,
    signed: true,
  },
  {
    id: "4",
    name: "Move-in Inspection Form",
    category: "forms",
    date: "2023-09-01",
    size: "500 KB",
    requiresSignature: true,
    signed: false,
  },
  {
    id: "5",
    name: "Maintenance Request Form",
    category: "forms",
    date: "2023-09-01",
    size: "300 KB",
    requiresSignature: false,
    signed: false,
  },
];

export default function TenantDocumentsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedCategory, setSelectedCategory] =
    useState<DocumentCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isSignDialogOpen, setIsSignDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const filteredDocuments = documents.filter((doc) => {
    if (selectedCategory !== "all" && doc.category !== selectedCategory) {
      return false;
    }
    if (searchQuery) {
      return doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const handleUpload = async (
    file: File,
    category: string,
    description: string
  ) => {
    // TODO: Implement actual file upload logic
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Document uploaded successfully");
  };

  const handleSign = async () => {
    // TODO: Implement actual document signing logic
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Document signed successfully");
  };

  const handleDownload = (documentId: string) => {
    // TODO: Implement actual document download logic
    toast.success("Document download started");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Documents</h1>
          <p className="text-sm text-muted-foreground">
            View and manage your lease and other important documents
          </p>
        </div>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Lease Information Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Lease Information</h2>
          <Badge
            variant={leaseInfo.status === "Active" ? "default" : "secondary"}
          >
            {leaseInfo.status}
          </Badge>
        </div>

        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Lease Period
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {leaseInfo.startDate} to {leaseInfo.endDate}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Monthly Rent
              </h3>
              <p className="mt-1">${leaseInfo.monthlyRent.toLocaleString()}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Security Deposit
              </h3>
              <p className="mt-1">
                ${leaseInfo.securityDeposit.toLocaleString()}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Occupants
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{leaseInfo.occupants.join(", ")}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Key Terms
            </h3>
            <ul className="mt-2 space-y-2">
              {leaseInfo.terms.map((term, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertCircle className="mt-1 h-3 w-3 shrink-0 text-muted-foreground" />
                  <span className="text-sm">{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Documents Section */}
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

        <Tabs defaultValue="all" className="p-4">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon className="mr-2 h-4 w-4" />
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <ScrollArea className="h-[400px] px-1">
            <div className="mt-4 grid gap-4">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-3">
                    <File className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Added {doc.date} • {doc.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.requiresSignature && !doc.signed && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedDocument({ id: doc.id, name: doc.name });
                          setIsSignDialogOpen(true);
                        }}
                      >
                        <PenLine className="mr-2 h-4 w-4" />
                        Sign
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(doc.id)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Tabs>
      </Card>

      {/* Document Upload Dialog */}
      <DocumentUploadDialog
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        onUpload={handleUpload}
      />

      {/* Document Sign Dialog */}
      {selectedDocument && (
        <DocumentSignDialog
          open={isSignDialogOpen}
          onOpenChange={setIsSignDialogOpen}
          documentName={selectedDocument.name}
          onSign={handleSign}
        />
      )}
    </div>
  );
}
