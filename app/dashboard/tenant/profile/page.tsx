"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { SecuritySettings } from "@/components/profile/SecuritySettings";
import { ConnectedAccounts } from "@/components/profile/ConnectedAccounts";
import { NotificationPreferences } from "@/components/profile/NotificationPreferences";

export default function TenantProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your tenant account settings and preferences
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
            userType="tenant"
            additionalFields={[
              {
                name: "occupation",
                label: "Occupation",
                placeholder: "Enter your occupation",
              },
              {
                name: "employerName",
                label: "Employer Name",
                placeholder: "Enter your employer's name",
              },
              {
                name: "monthlyIncome",
                label: "Monthly Income",
                placeholder: "Enter your monthly income",
                type: "number",
              },
            ]}
          />
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <SecuritySettings userType="tenant" requiresStrongPassword={true} />
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <NotificationPreferences
            userType="tenant"
            additionalCategories={[
              "Rent Reminders",
              "Maintenance Updates",
              "Property Announcements",
              "Community Events",
            ]}
          />
        </TabsContent>
        <TabsContent value="connections" className="space-y-4">
          <ConnectedAccounts
            userType="tenant"
            additionalIntegrations={[
              "Payment Services",
              "Rental Insurance",
              "Utility Services",
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
