"use client";

import { useState } from "react";
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
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  category: string;
  lastModified: string;
}

interface DocumentListProps {
  category: string;
  searchQuery: string;
}

type SortField = "name" | "type" | "size" | "lastModified";
type SortOrder = "asc" | "desc";

// Mock data - replace with real data from API
const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Lease Agreement - Unit 101",
    type: "pdf",
    size: "2.5 MB",
    category: "leases",
    lastModified: "2024-03-15",
  },
  {
    id: "2",
    name: "Property Insurance Policy",
    type: "pdf",
    size: "1.8 MB",
    category: "contracts",
    lastModified: "2024-03-14",
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

export function DocumentList({ category, searchQuery }: DocumentListProps) {
  const [sortField, setSortField] = useState<SortField>("lastModified");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  const sortDocuments = (docs: Document[]) => {
    return [...docs].sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;
      switch (sortField) {
        case "name":
          return multiplier * a.name.localeCompare(b.name);
        case "type":
          return multiplier * a.type.localeCompare(b.type);
        case "size":
          return multiplier * (parseFloat(a.size) - parseFloat(b.size));
        case "lastModified":
          return (
            multiplier *
            (new Date(a.lastModified).getTime() -
              new Date(b.lastModified).getTime())
          );
        default:
          return 0;
      }
    });
  };

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesCategory = category === "all" || doc.category === category;
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedDocuments = sortDocuments(filteredDocuments);

  if (sortedDocuments.length === 0) {
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            className="w-[50%] cursor-pointer"
            onClick={() => handleSort("name")}
          >
            <div className="flex items-center">
              Name
              {getSortIcon("name")}
            </div>
          </TableHead>
          <TableHead
            className="cursor-pointer"
            onClick={() => handleSort("type")}
          >
            <div className="flex items-center">
              Type
              {getSortIcon("type")}
            </div>
          </TableHead>
          <TableHead
            className="cursor-pointer"
            onClick={() => handleSort("size")}
          >
            <div className="flex items-center">
              Size
              {getSortIcon("size")}
            </div>
          </TableHead>
          <TableHead
            className="cursor-pointer"
            onClick={() => handleSort("lastModified")}
          >
            <div className="flex items-center">
              Last Modified
              {getSortIcon("lastModified")}
            </div>
          </TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedDocuments.map((document) => {
          const FileIcon = getFileIcon(document.type);
          return (
            <TableRow key={document.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FileIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{document.name}</span>
                </div>
              </TableCell>
              <TableCell className="uppercase">{document.type}</TableCell>
              <TableCell>{document.size}</TableCell>
              <TableCell>
                {new Date(document.lastModified).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => console.log("Preview", document.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => console.log("Download", document.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
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
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
