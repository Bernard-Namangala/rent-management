"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  DollarSign,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface PaymentStatus {
  status: "paid" | "pending" | "overdue";
  amount: number;
  dueDate: string;
  description: string;
}

const currentPayment: PaymentStatus = {
  status: "pending",
  amount: 1200,
  dueDate: "2024-07-05",
  description: "July 2024 Rent",
};

const getStatusColor = (status: PaymentStatus["status"]) => {
  switch (status) {
    case "paid":
      return "text-green-500";
    case "pending":
      return "text-yellow-500";
    case "overdue":
      return "text-red-500";
    default:
      return "text-muted-foreground";
  }
};

const getStatusIcon = (status: PaymentStatus["status"]) => {
  switch (status) {
    case "paid":
      return CheckCircle2;
    case "pending":
      return Clock;
    case "overdue":
      return AlertTriangle;
    default:
      return Clock;
  }
};

export function PaymentOverview() {
  const [selectedMonth, setSelectedMonth] = React.useState<Date>(new Date());

  // Mock data - replace with real data from API
  const paymentStatus: PaymentStatus = {
    status: "pending",
    amount: 1200,
    dueDate: "2024-03-25",
    description: "March 2024 Rent",
  };

  const additionalCharges = [
    { id: "1", description: "Utilities", amount: 150 },
    { id: "2", description: "Parking", amount: 50 },
    { id: "3", description: "Pet Rent", amount: 30 },
  ];

  const paymentTerms = {
    dueDate: "1st of each month",
    gracePeriod: "5 days",
    lateFee: "$50 after grace period",
    acceptedMethods: ["Credit Card", "Mobile Money", "Bank Transfer"],
  };

  const paymentHistory = [
    {
      id: "1",
      date: "2024-02-01",
      baseRent: 1200,
      additionalCharges: 230,
      total: 1430,
      status: "paid",
    },
    {
      id: "2",
      date: "2024-01-01",
      baseRent: 1200,
      additionalCharges: 230,
      total: 1430,
      status: "paid",
    },
    {
      id: "3",
      date: "2023-12-01",
      baseRent: 1150,
      additionalCharges: 220,
      total: 1370,
      status: "paid",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Payment Status */}
      <Card>
        <CardHeader>
          <CardTitle>Current Payment Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Status
              </p>
              <div className="flex items-center gap-2">
                {React.createElement(getStatusIcon(paymentStatus.status), {
                  className: cn(
                    "h-4 w-4",
                    getStatusColor(paymentStatus.status)
                  ),
                })}
                <span className="font-medium">
                  {paymentStatus.status.charAt(0).toUpperCase() +
                    paymentStatus.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm font-medium text-muted-foreground">
                Amount Due
              </p>
              <p className="text-2xl font-bold">
                ${paymentStatus.amount.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Due Date
            </p>
            <p>{new Date(paymentStatus.dueDate).toLocaleDateString()}</p>
          </div>

          <Progress value={70} className="h-2" />
          <p className="text-sm text-muted-foreground">
            5 days until payment is due
          </p>
        </CardContent>
      </Card>

      {/* Additional Charges */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Charges</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {additionalCharges.map((charge) => (
            <div key={charge.id} className="flex items-center justify-between">
              <span className="text-sm">{charge.description}</span>
              <span className="font-medium">${charge.amount.toFixed(2)}</span>
            </div>
          ))}
          <Separator />
          <div className="flex items-center justify-between font-medium">
            <span>Total Additional Charges</span>
            <span>
              $
              {additionalCharges
                .reduce((sum, charge) => sum + charge.amount, 0)
                .toFixed(2)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Payment Terms */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Due Date
              </p>
              <p>{paymentTerms.dueDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Grace Period
              </p>
              <p>{paymentTerms.gracePeriod}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Late Fee
              </p>
              <p>{paymentTerms.lateFee}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Accepted Payment Methods
              </p>
              <div className="flex flex-wrap gap-2">
                {paymentTerms.acceptedMethods.map((method) => (
                  <Badge key={method} variant="secondary">
                    {method}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historical Changes */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Base Rent</TableHead>
                <TableHead>Additional</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentHistory.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    {new Date(payment.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>${payment.baseRent}</TableCell>
                  <TableCell>${payment.additionalCharges}</TableCell>
                  <TableCell className="font-medium">
                    ${payment.total}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        payment.status === "paid" ? "default" : "secondary"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
