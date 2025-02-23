"use client";

import { ArrowUp, ArrowDown, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Transaction {
  id: string;
  type: "income" | "expense" | "maintenance";
  description: string;
  amount: number;
  date: string;
  property: string;
  category: string;
  status: "completed" | "pending" | "failed";
  tenant?: {
    name: string;
    avatar: string;
  };
}

interface TransactionListProps {
  category: "all" | "income" | "expenses" | "maintenance";
  searchQuery: string;
}

// Mock transactions data
const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "income",
    description: "Monthly Rent Payment",
    amount: 2500,
    date: "2024-03-15",
    property: "Modern Downtown Apartment",
    category: "Rent",
    status: "completed",
    tenant: {
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    },
  },
  {
    id: "2",
    type: "expense",
    description: "Property Insurance",
    amount: 450,
    date: "2024-03-14",
    property: "Modern Downtown Apartment",
    category: "Insurance",
    status: "completed",
  },
  {
    id: "3",
    type: "maintenance",
    description: "Plumbing Repair",
    amount: 350,
    date: "2024-03-13",
    property: "Luxury Waterfront Condo",
    category: "Repairs",
    status: "completed",
  },
  {
    id: "4",
    type: "income",
    description: "Monthly Rent Payment",
    amount: 3200,
    date: "2024-03-12",
    property: "Luxury Waterfront Condo",
    category: "Rent",
    status: "completed",
    tenant: {
      name: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    },
  },
  {
    id: "5",
    type: "expense",
    description: "Property Tax",
    amount: 1200,
    date: "2024-03-11",
    property: "Spacious Family Home",
    category: "Taxes",
    status: "pending",
  },
];

const getTransactionIcon = (type: Transaction["type"]) => {
  switch (type) {
    case "income":
      return <ArrowUp className="h-4 w-4 text-emerald-500" />;
    case "expense":
      return <ArrowDown className="h-4 w-4 text-destructive" />;
    case "maintenance":
      return <Building2 className="h-4 w-4 text-orange-500" />;
  }
};

const getStatusColor = (status: Transaction["status"]) => {
  switch (status) {
    case "completed":
      return "bg-emerald-100 text-emerald-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "failed":
      return "bg-red-100 text-red-700";
  }
};

export function TransactionList({
  category,
  searchQuery,
}: TransactionListProps) {
  // Filter transactions based on category and search query
  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesCategory =
      category === "all" ||
      (category === "expenses" && transaction.type === "expense") ||
      transaction.type === category;

    const matchesSearch = searchQuery
      ? transaction.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        transaction.property
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        transaction.category
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (transaction.tenant?.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ??
          false)
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="divide-y">
      {filteredTransactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/50"
        >
          {/* Transaction Icon and Description */}
          <div className="flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              {getTransactionIcon(transaction.type)}
            </div>
            <div>
              <p className="font-medium">{transaction.description}</p>
              <p className="text-sm text-muted-foreground">
                {transaction.property}
              </p>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="flex items-center gap-4">
            {/* Tenant Avatar (if exists) */}
            {transaction.tenant && (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={transaction.tenant.avatar}
                    alt={transaction.tenant.name}
                  />
                  <AvatarFallback>
                    {transaction.tenant.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  {transaction.tenant.name}
                </span>
              </div>
            )}

            {/* Category */}
            <span className="text-sm text-muted-foreground">
              {transaction.category}
            </span>

            {/* Status */}
            <Badge
              variant="secondary"
              className={`capitalize ${getStatusColor(transaction.status)}`}
            >
              {transaction.status}
            </Badge>

            {/* Amount */}
            <p
              className={`text-right font-medium ${
                transaction.type === "income"
                  ? "text-emerald-600"
                  : "text-destructive"
              }`}
            >
              {transaction.type === "income" ? "+" : "-"}$
              {transaction.amount.toLocaleString()}
            </p>

            {/* Date */}
            <p className="w-24 text-right text-sm text-muted-foreground">
              {new Date(transaction.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
