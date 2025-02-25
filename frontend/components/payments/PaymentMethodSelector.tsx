"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  Phone,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type PaymentMethod = "stripe" | "mobile-money";
type MobileMoneyProvider = "airtel" | "mtn";

interface PaymentMethodOption {
  id: PaymentMethod;
  title: string;
  icon: React.ElementType;
  description: string;
}

const paymentMethods: PaymentMethodOption[] = [
  {
    id: "stripe",
    title: "Card Payment",
    icon: CreditCard,
    description: "Pay with credit or debit card via Stripe",
  },
  {
    id: "mobile-money",
    title: "Mobile Money",
    icon: Phone,
    description: "Pay using Airtel Money or MTN Mobile Money",
  },
];

export function PaymentMethodSelector() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("stripe");
  const [mobileProvider, setMobileProvider] =
    useState<MobileMoneyProvider>("airtel");
  const [isLoading, setIsLoading] = useState(false);
  const [isSplitPayment, setIsSplitPayment] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [splitAmount, setSplitAmount] = useState<number>(0);
  const totalAmount = 1200; // This would come from props or context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement payment processing logic
    if (selectedMethod === "stripe") {
      // Handle Stripe payment
      console.log("Processing Stripe payment...");
    } else if (selectedMethod === "mobile-money") {
      // Handle mobile money payment
      console.log("Processing mobile money payment...", {
        provider: mobileProvider,
        phoneNumber: "",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment amount summary */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Payment Amount</h3>
            <p className="text-sm text-muted-foreground">Rent for July 2024</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">$1,200.00</p>
            <p className="text-sm text-muted-foreground">Due in 5 days</p>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            type="button"
            className={cn(
              "w-full rounded-lg border-2 p-4 text-left transition-colors hover:bg-muted/50",
              selectedMethod === method.id
                ? "border-primary bg-primary/5"
                : "border-muted"
            )}
            onClick={() => setSelectedMethod(method.id)}
          >
            <div className="flex items-center gap-4">
              <method.icon className="h-6 w-6" />
              <div className="flex-1">
                <p className="font-medium">{method.title}</p>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Payment Options */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Split Payment Option */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Split Payment</Label>
              <p className="text-sm text-muted-foreground">
                Divide your payment into multiple parts
              </p>
            </div>
            <Switch
              checked={isSplitPayment}
              onCheckedChange={setIsSplitPayment}
            />
          </div>

          {isSplitPayment && (
            <div className="space-y-2">
              <Label>Split Amount</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={splitAmount || ""}
                  onChange={(e) => setSplitAmount(Number(e.target.value))}
                  className="flex-1"
                />
                <div className="text-sm text-muted-foreground">
                  Remaining: ${totalAmount - splitAmount}
                </div>
              </div>
            </div>
          )}

          {/* Recurring Payment Option */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Recurring Payment</Label>
              <p className="text-sm text-muted-foreground">
                Set up automatic monthly payments
              </p>
            </div>
            <Switch checked={isRecurring} onCheckedChange={setIsRecurring} />
          </div>
        </CardContent>
      </Card>

      {/* Mobile Money Provider Selection */}
      {selectedMethod === "mobile-money" && (
        <Card>
          <CardHeader>
            <CardTitle>Select Provider</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button
                type="button"
                variant={mobileProvider === "airtel" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setMobileProvider("airtel")}
              >
                <Phone className="mr-2 h-4 w-4" />
                Airtel Money
              </Button>
              <Button
                type="button"
                variant={mobileProvider === "mtn" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setMobileProvider("mtn")}
              >
                <Phone className="mr-2 h-4 w-4" />
                MTN Mobile Money
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Rent Amount</span>
            <span className="font-medium">${totalAmount}</span>
          </div>
          {isSplitPayment && splitAmount > 0 && (
            <>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Split Payment</span>
                <span>${splitAmount}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Remaining Amount</span>
                <span>${totalAmount - splitAmount}</span>
              </div>
            </>
          )}
          <Separator />
          <div className="flex items-center justify-between font-medium">
            <span>Total Due Now</span>
            <span>${isSplitPayment ? splitAmount : totalAmount}</span>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" disabled={isLoading} onClick={handleSubmit}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading
          ? "Processing..."
          : `Pay ${isSplitPayment ? `$${splitAmount}` : `$${totalAmount}`}`}
      </Button>
    </div>
  );
}
