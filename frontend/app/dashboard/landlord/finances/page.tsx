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
  ArrowUp,
  ArrowDown,
  Download,
  Calendar,
  DollarSign,
  ArrowUpRight,
  Building2,
  FileText,
  Wallet,
} from "lucide-react";
import { FinancialOverview } from "@/components/finances/FinancialOverview";
import { TransactionList } from "@/components/finances/TransactionList";
import { PaymentSheet } from "@/components/finances/PaymentSheet";
import { FinanceFilters } from "@/components/finances/FinanceFilters";

type TransactionCategory = "all" | "income" | "expenses" | "maintenance";

const categories = [
  { id: "all", label: "All Transactions", icon: Wallet },
  { id: "income", label: "Income", icon: ArrowUp },
  { id: "expenses", label: "Expenses", icon: ArrowDown },
  { id: "maintenance", label: "Maintenance", icon: Building2 },
] as const;

export default function FinancesPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<TransactionCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isPaymentSheetOpen, setIsPaymentSheetOpen] = useState(false);

  const handleAddPayment = () => {
    setIsPaymentSheetOpen(true);
  };

  const handleSubmitPayment = async (payment: any) => {
    // TODO: Implement payment submission logic
    console.log("Payment submitted:", payment);
    setIsPaymentSheetOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Finances</h1>
          <p className="text-sm text-muted-foreground">
            Track income, expenses, and financial performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleAddPayment}>
            <Plus className="mr-2 h-4 w-4" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <FinancialOverview />

      {/* Transactions */}
      <Card>
        <div className="border-b border-muted p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search and Filter */}
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
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

            {/* Date Range */}
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Last 30 Days
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 border-t pt-4">
              <FinanceFilters />
            </div>
          )}
        </div>

        <Tabs
          defaultValue="all"
          onValueChange={(value) =>
            setSelectedCategory(value as TransactionCategory)
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

          {/* Transaction List */}
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="p-0">
              <TransactionList
                category={selectedCategory}
                searchQuery={searchQuery}
              />
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      <PaymentSheet
        open={isPaymentSheetOpen}
        onOpenChange={setIsPaymentSheetOpen}
        onSubmit={handleSubmitPayment}
      />
    </div>
  );
}
