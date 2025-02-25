"use client";

import { type ReactElement } from "react";
import { FileText, Download, Printer } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface LeaseAgreementSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeaseAgreementSheet({
  open,
  onOpenChange,
}: LeaseAgreementSheetProps): ReactElement {
  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log("Downloading lease agreement...");
  };

  const handlePrint = () => {
    // TODO: Implement print functionality
    console.log("Printing lease agreement...");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Lease Agreement
          </SheetTitle>
          <SheetDescription>
            Review your current lease agreement details
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>

          <Separator />

          <ScrollArea className="h-[600px] rounded-md border p-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">
                  Residential Lease Agreement
                </h3>
                <p className="text-sm text-muted-foreground">
                  This agreement made on January 1, 2024
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">1. Parties</h4>
                <p className="text-sm">
                  This lease agreement is between RentEase Properties (Landlord)
                  and John Doe (Tenant) for Unit 101 at 123 Main Street.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">2. Property</h4>
                <p className="text-sm">
                  The landlord agrees to rent to the tenant Unit 101, a
                  2-bedroom apartment located at 123 Main Street.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">3. Term</h4>
                <p className="text-sm">
                  The lease term begins on January 1, 2024, and ends on December
                  31, 2024, unless terminated earlier as provided in this
                  agreement.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">4. Rent</h4>
                <p className="text-sm">
                  The monthly rent is $1,800, due on the first day of each
                  month. Late payments will incur a fee of $50 after the 5th day
                  of the month.
                </p>
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
