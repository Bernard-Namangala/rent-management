"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MaintenanceRequest {
  id: string;
  title: string;
  property: string;
  tenant: string;
  status: "pending" | "in-progress" | "completed" | "urgent";
  date: string;
  priority: "low" | "medium" | "high";
}

const mockRequests: MaintenanceRequest[] = [
  {
    id: "1",
    title: "Leaking Faucet",
    property: "123 Main St, Apt 4B",
    tenant: "John Doe",
    status: "pending",
    date: "2024-02-23",
    priority: "low",
  },
  {
    id: "2",
    title: "AC Not Working",
    property: "456 Oak Ave, Unit 2",
    tenant: "Jane Smith",
    status: "urgent",
    date: "2024-02-23",
    priority: "high",
  },
  // Add more mock data as needed
];

interface MaintenanceListProps {
  category: string;
  searchQuery: string;
}

export function MaintenanceList({
  category,
  searchQuery,
}: MaintenanceListProps) {
  const [requests] = useState<MaintenanceRequest[]>(mockRequests);

  const filteredRequests = requests.filter((request) => {
    const matchesCategory = category === "all" || request.status === category;
    const matchesSearch = searchQuery
      ? request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.tenant.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: MaintenanceRequest["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: MaintenanceRequest["priority"]) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="relative">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Tenant</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.title}</TableCell>
              <TableCell>{request.property}</TableCell>
              <TableCell>{request.tenant}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(request.priority)}>
                  {request.priority}
                </Badge>
              </TableCell>
              <TableCell>{request.date}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
