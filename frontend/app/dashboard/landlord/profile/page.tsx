"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { SecuritySettings } from "@/components/profile/SecuritySettings";
import { ConnectedAccounts } from "@/components/profile/ConnectedAccounts";
import { NotificationPreferences } from "@/components/profile/NotificationPreferences";

export default function LandlordProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your landlord account settings and preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <ProfileForm
            userType="landlord"
            additionalFields={[
              {
                name: "company",
                label: "Company Name",
                placeholder: "Enter your company name",
              },
              {
                name: "businessNumber",
                label: "Business Registration Number",
                placeholder: "Enter your business registration number",
              },
            ]}
          />
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <SecuritySettings userType="landlord" requiresStrongPassword={true} />
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <NotificationPreferences
            userType="landlord"
            additionalCategories={[
              "Property Applications",
              "Lease Renewals",
              "Maintenance Updates",
              "Payment Confirmations",
            ]}
          />
        </TabsContent>
        <TabsContent value="connections" className="space-y-4">
          <ConnectedAccounts
            userType="landlord"
            additionalIntegrations={[
              "Property Management Software",
              "Accounting Software",
              "Document Signing Services",
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
