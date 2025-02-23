"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  Wallet,
  History,
  ArrowUpRight,
  Phone,
  AlertCircle,
} from "lucide-react";
import { PaymentOverview } from "@/components/payments/PaymentOverview";
import { PaymentHistory } from "@/components/payments/PaymentHistory";
import { PaymentMethodSelector } from "@/components/payments/PaymentMethodSelector";

type PaymentTab = "overview" | "make-payment" | "history";

export default function PaymentsPage() {
  const [selectedTab, setSelectedTab] = useState<PaymentTab>("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Payments</h1>
        <p className="text-sm text-muted-foreground">
          Manage your rent payments and view payment history
        </p>
      </div>

      {/* Alert for upcoming payment */}
      <Card className="flex items-center gap-4 bg-primary/5 p-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <AlertCircle className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-medium">Next Payment Due</p>
          <p className="text-sm text-muted-foreground">
            Your next rent payment of $1,200 is due in 5 days
          </p>
        </div>
        <Button
          className="shrink-0"
          onClick={() => setSelectedTab("make-payment")}
        >
          Pay Now
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </Card>

      {/* Main Content */}
      <Card>
        <Tabs
          defaultValue="overview"
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value as PaymentTab)}
        >
          <div className="border-b px-4">
            <TabsList className="w-full justify-start gap-6 rounded-none border-b-0 p-0">
              <TabsTrigger
                value="overview"
                className="relative rounded-none border-b-2 border-transparent px-2 pb-4 pt-2 font-medium data-[state=active]:border-primary"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="make-payment"
                className="relative rounded-none border-b-2 border-transparent px-2 pb-4 pt-2 font-medium data-[state=active]:border-primary"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Make Payment
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="relative rounded-none border-b-2 border-transparent px-2 pb-4 pt-2 font-medium data-[state=active]:border-primary"
              >
                <History className="mr-2 h-4 w-4" />
                Payment History
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-4">
            <PaymentOverview />
          </TabsContent>

          <TabsContent value="make-payment" className="p-4">
            <PaymentMethodSelector />
          </TabsContent>

          <TabsContent value="history" className="p-4">
            <PaymentHistory />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
