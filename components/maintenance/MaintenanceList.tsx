"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  MoreVertical,
  Wrench,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "urgent";
  property: string;
  tenant: {
    name: string;
    avatar: string;
  };
  date: string;
  priority: "low" | "medium" | "high";
  category: string;
}

interface MaintenanceListProps {
  category: string;
  searchQuery: string;
}

// Mock data - replace with real data from API
const mockRequests: MaintenanceRequest[] = [
  {
    id: "1",
    title: "Broken AC Unit",
    description: "The AC unit in living room is not cooling properly",
    status: "urgent",
    property: "Sunset Apartments #204",
    tenant: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/40?img=1",
    },
    date: "2024-02-23",
    priority: "high",
    category: "HVAC",
  },
  {
    id: "2",
    title: "Leaking Faucet",
    description: "Kitchen sink faucet is dripping constantly",
    status: "in-progress",
    property: "Downtown Lofts #102",
    tenant: {
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/40?img=2",
    },
    date: "2024-02-22",
    priority: "medium",
    category: "Plumbing",
  },
  {
    id: "3",
    title: "Light Fixture Replacement",
    description: "Bathroom light fixture needs replacement",
    status: "pending",
    property: "Park View Heights #305",
    tenant: {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/40?img=3",
    },
    date: "2024-02-21",
    priority: "low",
    category: "Electrical",
  },
];

const getStatusIcon = (status: MaintenanceRequest["status"]) => {
  switch (status) {
    case "urgent":
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    case "in-progress":
      return <Wrench className="h-4 w-4 text-amber-500" />;
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />;
  }
};

const getStatusColor = (status: MaintenanceRequest["status"]) => {
  switch (status) {
    case "urgent":
      return "text-destructive border-destructive";
    case "completed":
      return "text-emerald-500 border-emerald-500";
    case "in-progress":
      return "text-amber-500 border-amber-500";
    default:
      return "text-muted-foreground border-muted-foreground";
  }
};

export function MaintenanceList({
  category,
  searchQuery,
}: MaintenanceListProps) {
  // Filter requests based on category and search query
  const filteredRequests = mockRequests.filter((request) => {
    const matchesCategory = category === "all" || request.status === category;
    const matchesSearch =
      searchQuery === "" ||
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.tenant.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (filteredRequests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Wrench className="h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-medium">No requests found</h3>
        <p className="text-sm text-muted-foreground">
          No maintenance requests match your search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {filteredRequests.map((request) => (
        <div
          key={request.id}
          className="flex items-start gap-4 p-4 hover:bg-muted/50"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={request.tenant.avatar}
              alt={request.tenant.name}
            />
            <AvatarFallback>
              {request.tenant.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-medium leading-none">{request.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {request.property}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={getStatusColor(request.status)}
                >
                  <span className="flex items-center gap-1">
                    {getStatusIcon(request.status)}
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1).replace("-", " ")}
                  </span>
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Update Status</DropdownMenuItem>
                    <DropdownMenuItem>Assign Contractor</DropdownMenuItem>
                    <DropdownMenuItem>Add Note</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <p className="text-sm">{request.description}</p>

            <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
              <span>Reported by {request.tenant.name}</span>
              <span>•</span>
              <span>{request.date}</span>
              <span>•</span>
              <span>{request.category}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
