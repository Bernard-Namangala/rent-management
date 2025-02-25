"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { User, Lock, Bell, Link } from "lucide-react";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { SecuritySettings } from "@/components/profile/SecuritySettings";
import { NotificationPreferences } from "@/components/profile/NotificationPreferences";
import { ConnectedAccounts } from "@/components/profile/ConnectedAccounts";

export default function TenantProfilePage() {
  const [selectedTab, setSelectedTab] = useState("personal");

  // Additional tenant-specific profile fields
  const additionalFields = [
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      type: "tel",
    },
    {
      name: "emergencyContact",
      label: "Emergency Contact",
      placeholder: "Enter emergency contact name",
    },
    {
      name: "emergencyPhone",
      label: "Emergency Contact Phone",
      placeholder: "Enter emergency contact phone",
      type: "tel",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Profile & Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Main Content */}
      <Card>
        <Tabs
          defaultValue="personal"
          value={selectedTab}
          onValueChange={setSelectedTab}
        >
          <div className="border-b px-4">
            <TabsList className="w-full justify-start gap-6 rounded-none border-b-0 p-0">
              <TabsTrigger
                value="personal"
                className="relative rounded-none border-b-2 border-transparent px-2 pb-4 pt-2 font-medium data-[state=active]:border-primary"
              >
                <User className="mr-2 h-4 w-4" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="relative rounded-none border-b-2 border-transparent px-2 pb-4 pt-2 font-medium data-[state=active]:border-primary"
              >
                <Lock className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="relative rounded-none border-b-2 border-transparent px-2 pb-4 pt-2 font-medium data-[state=active]:border-primary"
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="connected"
                className="relative rounded-none border-b-2 border-transparent px-2 pb-4 pt-2 font-medium data-[state=active]:border-primary"
              >
                <Link className="mr-2 h-4 w-4" />
                Connected Accounts
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-4">
            <TabsContent value="personal">
              <ProfileForm
                userType="tenant"
                additionalFields={additionalFields}
              />
            </TabsContent>

            <TabsContent value="security">
              <SecuritySettings
                userType="tenant"
                requiresStrongPassword={true}
                requiresMFA={false}
              />
            </TabsContent>

            <TabsContent value="notifications">
              <NotificationPreferences
                userType="tenant"
                additionalCategories={[
                  "Maintenance Updates",
                  "Rent Reminders",
                  "Building Announcements",
                  "Community Events",
                ]}
              />
            </TabsContent>

            <TabsContent value="connected">
              <ConnectedAccounts
                userType="tenant"
                additionalIntegrations={[
                  "Digital Signature",
                  "Payment Provider",
                  "Document Storage",
                ]}
              />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}
