"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MoreVertical,
  Download,
  Pencil,
  Trash,
  Eye,
  FileText,
  File,
  Image as ImageIcon,
  FileSpreadsheet,
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

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  category: string;
  lastModified: string;
  thumbnail?: string;
}

interface DocumentGridProps {
  category: string;
  searchQuery: string;
}

// Mock data - replace with real data from API
const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Lease Agreement - Unit 101",
    type: "pdf",
    size: "2.5 MB",
    category: "leases",
    lastModified: "2024-03-15",
    thumbnail: "https://placehold.co/300x400/png?text=PDF",
  },
  {
    id: "2",
    name: "Property Insurance Policy",
    type: "pdf",
    size: "1.8 MB",
    category: "contracts",
    lastModified: "2024-03-14",
    thumbnail: "https://placehold.co/300x400/png?text=PDF",
  },
  {
    id: "3",
    name: "Maintenance Report - Q1 2024",
    type: "xlsx",
    size: "985 KB",
    category: "maintenance",
    lastModified: "2024-03-13",
  },
  {
    id: "4",
    name: "Property Photos",
    type: "jpg",
    size: "4.2 MB",
    category: "maintenance",
    lastModified: "2024-03-12",
    thumbnail: "https://placehold.co/300x400/png?text=IMG",
  },
  {
    id: "5",
    name: "Financial Statement 2024",
    type: "xlsx",
    size: "1.2 MB",
    category: "financial",
    lastModified: "2024-03-11",
  },
];

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "pdf":
      return File;
    case "jpg":
    case "jpeg":
    case "png":
      return ImageIcon;
    case "xlsx":
    case "csv":
      return FileSpreadsheet;
    default:
      return FileText;
  }
};

export function DocumentGrid({ category, searchQuery }: DocumentGridProps) {
  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesCategory = category === "all" || doc.category === category;
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredDocuments.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center">
        <FileText className="h-8 w-8 text-muted-foreground" />
        <h3 className="font-semibold">No documents found</h3>
        <p className="text-sm text-muted-foreground">
          {searchQuery
            ? "Try adjusting your search query"
            : "Upload some documents to get started"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredDocuments.map((document) => {
        const FileIcon = getFileIcon(document.type);
        return (
          <div
            key={document.id}
            className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
          >
            {/* Preview */}
            <div className="aspect-[3/4] w-full bg-muted">
              {document.thumbnail ? (
                <Image
                  src={document.thumbnail}
                  alt={document.name}
                  width={300}
                  height={400}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <FileIcon className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Quick Actions Overlay */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8"
                onClick={() => console.log("Preview", document.id)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8"
                onClick={() => console.log("Download", document.id)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>

            {/* Info */}
            <div className="space-y-1 p-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="truncate font-medium leading-none">
                  {document.name}
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="-mr-2 h-8 w-8 hover:bg-transparent"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{document.type.toUpperCase()}</span>
                <span>•</span>
                <span>{document.size}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
