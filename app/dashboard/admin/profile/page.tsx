"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { SecuritySettings } from "@/components/profile/SecuritySettings";
import { ConnectedAccounts } from "@/components/profile/ConnectedAccounts";
import { NotificationPreferences } from "@/components/profile/NotificationPreferences";

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your administrator account settings and preferences
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
            userType="admin"
            additionalFields={[
              {
                name: "department",
                label: "Department",
                placeholder: "Enter your department",
              },
              {
                name: "role",
                label: "Admin Role",
                placeholder: "Enter your admin role",
              },
              {
                name: "employeeId",
                label: "Employee ID",
                placeholder: "Enter your employee ID",
              },
            ]}
          />
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <SecuritySettings
            userType="admin"
            requiresStrongPassword={true}
            requiresMFA={true}
          />
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <NotificationPreferences
            userType="admin"
            additionalCategories={[
              "System Alerts",
              "User Management",
              "Security Events",
              "Platform Updates",
            ]}
          />
        </TabsContent>
        <TabsContent value="connections" className="space-y-4">
          <ConnectedAccounts
            userType="admin"
            additionalIntegrations={[
              "Admin Tools",
              "Monitoring Systems",
              "Analytics Platforms",
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
