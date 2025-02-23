"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface NotificationCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  channels: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

interface NotificationPreferencesProps {
  userType: "tenant" | "landlord";
  additionalCategories?: string[];
}

export function NotificationPreferences({
  userType,
  additionalCategories = [],
}: NotificationPreferencesProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<NotificationCategory[]>([
    {
      id: "maintenance",
      title: "Maintenance Updates",
      description:
        "Get notified about maintenance request updates and scheduling",
      icon: <MessageSquare className="h-5 w-5" />,
      channels: { email: true, push: true, sms: false },
    },
    {
      id: "payments",
      title: "Payment Reminders",
      description:
        "Receive reminders about upcoming rent payments and confirmations",
      icon: <Bell className="h-5 w-5" />,
      channels: { email: true, push: true, sms: true },
    },
    {
      id: "announcements",
      title: "Building Announcements",
      description: "Stay informed about important building updates and notices",
      icon: <Mail className="h-5 w-5" />,
      channels: { email: true, push: false, sms: false },
    },
    {
      id: "community",
      title: "Community Events",
      description: "Get updates about community events and activities",
      icon: <Phone className="h-5 w-5" />,
      channels: { email: false, push: true, sms: false },
    },
  ]);

  const handleChannelToggle = (
    categoryId: string,
    channel: keyof NotificationCategory["channels"]
  ) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              channels: {
                ...cat.channels,
                [channel]: !cat.channels[channel],
              },
            }
          : cat
      )
    );
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement save preferences logic
      console.log("Saving preferences:", categories);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Notification preferences saved successfully");
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error("Failed to save notification preferences");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {category.icon}
              {category.title}
            </CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center space-x-4">
                  <Switch
                    id={`${category.id}-email`}
                    checked={category.channels.email}
                    onCheckedChange={() =>
                      handleChannelToggle(category.id, "email")
                    }
                  />
                  <Label htmlFor={`${category.id}-email`}>Email</Label>
                </div>
                <div className="flex items-center space-x-4">
                  <Switch
                    id={`${category.id}-push`}
                    checked={category.channels.push}
                    onCheckedChange={() =>
                      handleChannelToggle(category.id, "push")
                    }
                  />
                  <Label htmlFor={`${category.id}-push`}>
                    Push Notifications
                  </Label>
                </div>
                <div className="flex items-center space-x-4">
                  <Switch
                    id={`${category.id}-sms`}
                    checked={category.channels.sms}
                    onCheckedChange={() =>
                      handleChannelToggle(category.id, "sms")
                    }
                  />
                  <Label htmlFor={`${category.id}-sms`}>SMS</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end">
        <Button onClick={handleSavePreferences} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}
