"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export interface NotificationPreferencesProps {
  userType: "landlord" | "tenant" | "admin";
  additionalCategories?: string[];
}

interface NotificationChannel {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface NotificationCategory {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const baseChannels: NotificationChannel[] = [
  {
    id: "email",
    label: "Email Notifications",
    description: "Receive notifications via email",
    enabled: true,
  },
  {
    id: "push",
    label: "Push Notifications",
    description: "Receive notifications on your devices",
    enabled: true,
  },
  {
    id: "sms",
    label: "SMS Notifications",
    description: "Receive notifications via text message",
    enabled: false,
  },
];

const baseCategories: NotificationCategory[] = [
  {
    id: "updates",
    label: "Platform Updates",
    description: "Important updates about RentEase",
    enabled: true,
  },
  {
    id: "security",
    label: "Security Alerts",
    description: "Security-related notifications",
    enabled: true,
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "News and special offers",
    enabled: false,
  },
];

export function NotificationPreferences({
  userType,
  additionalCategories = [],
}: NotificationPreferencesProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [channels, setChannels] = useState(baseChannels);
  const [categories, setCategories] = useState([
    ...baseCategories,
    ...additionalCategories.map((category) => ({
      id: category.toLowerCase().replace(/\s+/g, "-"),
      label: category,
      description: `Notifications for ${category.toLowerCase()}`,
      enabled: true,
    })),
  ]);
  const [frequency, setFrequency] = useState("realtime");

  const handleChannelToggle = (channelId: string) => {
    setChannels((prev) =>
      prev.map((channel) =>
        channel.id === channelId
          ? { ...channel, enabled: !channel.enabled }
          : channel
      )
    );
  };

  const handleCategoryToggle = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? { ...category, enabled: !category.enabled }
          : category
      )
    );
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement save preferences logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex-1 space-y-1">
                <p className="font-medium">{channel.label}</p>
                <p className="text-sm text-muted-foreground">
                  {channel.description}
                </p>
              </div>
              <Switch
                checked={channel.enabled}
                onCheckedChange={() => handleChannelToggle(channel.id)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex-1 space-y-1">
                <p className="font-medium">{category.label}</p>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>
              <Switch
                checked={category.enabled}
                onCheckedChange={() => handleCategoryToggle(category.id)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Frequency</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={frequency} onValueChange={setFrequency}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="realtime" id="realtime" />
              <Label htmlFor="realtime">Real-time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily">Daily digest</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly">Weekly summary</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}
