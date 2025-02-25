"use client";

import { Card } from "@/components/ui/card";
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  Building2,
  Users,
  Wallet,
} from "lucide-react";

// Mock data for financial overview
const mockFinancialData = {
  totalRevenue: {
    value: 52450,
    change: 12.5,
    trend: "up",
  },
  totalExpenses: {
    value: 15680,
    change: 8.2,
    trend: "up",
  },
  netIncome: {
    value: 36770,
    change: 15.3,
    trend: "up",
  },
  occupancyRate: {
    value: 94,
    change: -2,
    trend: "down",
  },
};

export function FinancialOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Revenue */}
      <Card className="relative overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </p>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-bold">
              ${mockFinancialData.totalRevenue.value.toLocaleString()}
            </p>
            <span
              className={`ml-2 flex items-center text-sm ${
                mockFinancialData.totalRevenue.trend === "up"
                  ? "text-emerald-600"
                  : "text-destructive"
              }`}
            >
              {mockFinancialData.totalRevenue.change}%
              {mockFinancialData.totalRevenue.trend === "up" ? (
                <ArrowUp className="ml-1 h-4 w-4" />
              ) : (
                <ArrowDown className="ml-1 h-4 w-4" />
              )}
            </span>
          </div>
        </div>
      </Card>

      {/* Total Expenses */}
      <Card className="relative overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </p>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-bold">
              ${mockFinancialData.totalExpenses.value.toLocaleString()}
            </p>
            <span
              className={`ml-2 flex items-center text-sm ${
                mockFinancialData.totalExpenses.trend === "up"
                  ? "text-destructive"
                  : "text-emerald-600"
              }`}
            >
              {mockFinancialData.totalExpenses.change}%
              {mockFinancialData.totalExpenses.trend === "up" ? (
                <ArrowUp className="ml-1 h-4 w-4" />
              ) : (
                <ArrowDown className="ml-1 h-4 w-4" />
              )}
            </span>
          </div>
        </div>
      </Card>

      {/* Net Income */}
      <Card className="relative overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Net Income
            </p>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-bold">
              ${mockFinancialData.netIncome.value.toLocaleString()}
            </p>
            <span
              className={`ml-2 flex items-center text-sm ${
                mockFinancialData.netIncome.trend === "up"
                  ? "text-emerald-600"
                  : "text-destructive"
              }`}
            >
              {mockFinancialData.netIncome.change}%
              {mockFinancialData.netIncome.trend === "up" ? (
                <ArrowUp className="ml-1 h-4 w-4" />
              ) : (
                <ArrowDown className="ml-1 h-4 w-4" />
              )}
            </span>
          </div>
        </div>
      </Card>

      {/* Occupancy Rate */}
      <Card className="relative overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Occupancy Rate
            </p>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-bold">
              {mockFinancialData.occupancyRate.value}%
            </p>
            <span
              className={`ml-2 flex items-center text-sm ${
                mockFinancialData.occupancyRate.trend === "up"
                  ? "text-emerald-600"
                  : "text-destructive"
              }`}
            >
              {mockFinancialData.occupancyRate.change}%
              {mockFinancialData.occupancyRate.trend === "up" ? (
                <ArrowUp className="ml-1 h-4 w-4" />
              ) : (
                <ArrowDown className="ml-1 h-4 w-4" />
              )}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
