"use client";

import { type ReactElement } from "react";
import { useState } from "react";
import { FileText, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LeaseAgreementSheet } from "@/components/units/LeaseAgreementSheet";
import { MaintenanceRequestSheet } from "@/components/units/MaintenanceRequestSheet";

// Mock data - replace with API call
const unitData = {
  number: "101",
  type: "Apartment",
  floor: "1st Floor",
  size: "1,200 sq ft",
  bedrooms: 2,
  bathrooms: 2,
  rent: 1800,
  leaseStart: "2024-01-01",
  leaseEnd: "2024-12-31",
  amenities: ["Parking", "Storage", "Balcony"],
  image:
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
};

export default function TenantUnitPage(): ReactElement {
  const [showLeaseSheet, setShowLeaseSheet] = useState(false);
  const [showMaintenanceSheet, setShowMaintenanceSheet] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Unit {unitData.number}
          </h2>
          <p className="text-muted-foreground">
            Manage your unit details and submit requests
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="aspect-video overflow-hidden rounded-lg">
            <img
              src={unitData.image}
              alt={`Unit ${unitData.number}`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{unitData.type}</Badge>
              <Badge variant="secondary">{unitData.floor}</Badge>
              <Badge variant="secondary">{unitData.size}</Badge>
              <Badge variant="secondary">{unitData.bedrooms} Bedrooms</Badge>
              <Badge variant="secondary">{unitData.bathrooms} Bathrooms</Badge>
            </div>

            <div>
              <h3 className="font-medium">Amenities</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {unitData.amenities.map((amenity) => (
                  <Badge key={amenity} variant="outline">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium">Lease Period</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {new Date(unitData.leaseStart).toLocaleDateString()} -{" "}
                {new Date(unitData.leaseEnd).toLocaleDateString()}
              </p>
            </div>

            <div>
              <h3 className="font-medium">Monthly Rent</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                ${unitData.rent.toLocaleString()}
              </p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Quick Actions</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowLeaseSheet(true)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Lease
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowMaintenanceSheet(true)}
                >
                  <Wrench className="mr-2 h-4 w-4" />
                  Report Issue
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <LeaseAgreementSheet
        open={showLeaseSheet}
        onOpenChange={setShowLeaseSheet}
      />
      <MaintenanceRequestSheet
        open={showMaintenanceSheet}
        onOpenChange={setShowMaintenanceSheet}
      />
    </div>
  );
}
