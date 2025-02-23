"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface ConnectedAccountsProps {
  userType: "landlord" | "tenant" | "admin";
  additionalIntegrations?: string[];
}

interface Integration {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  icon: string;
}

const baseIntegrations: Integration[] = [
  {
    id: "google",
    name: "Google",
    description: "Access your Google account",
    connected: true,
    icon: "https://placehold.co/32x32/png?text=G",
  },
  {
    id: "github",
    name: "GitHub",
    description: "Connect your GitHub account",
    connected: false,
    icon: "https://placehold.co/32x32/png?text=GH",
  },
  {
    id: "apple",
    name: "Apple",
    description: "Sign in with Apple",
    connected: false,
    icon: "https://placehold.co/32x32/png?text=A",
  },
];

export function ConnectedAccounts({
  userType,
  additionalIntegrations = [],
}: ConnectedAccountsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [integrations, setIntegrations] = useState([
    ...baseIntegrations,
    ...additionalIntegrations.map((integration) => ({
      id: integration.toLowerCase().replace(/\s+/g, "-"),
      name: integration,
      description: `Connect to ${integration}`,
      connected: false,
      icon: `https://placehold.co/32x32/png?text=${integration[0]}`,
    })),
  ]);

  const handleConnect = async (integrationId: string) => {
    setIsLoading(integrationId);
    try {
      // TODO: Implement connect integration logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIntegrations((prev) =>
        prev.map((integration) =>
          integration.id === integrationId
            ? { ...integration, connected: true }
            : integration
        )
      );
    } finally {
      setIsLoading(null);
    }
  };

  const handleDisconnect = async (integrationId: string) => {
    setIsLoading(integrationId);
    try {
      // TODO: Implement disconnect integration logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIntegrations((prev) =>
        prev.map((integration) =>
          integration.id === integrationId
            ? { ...integration, connected: false }
            : integration
        )
      );
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Accounts & Integrations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="flex items-center justify-between space-x-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={integration.icon}
                alt={`${integration.name} icon`}
                className="h-8 w-8 rounded-full"
              />
              <div className="space-y-1">
                <p className="font-medium">{integration.name}</p>
                <p className="text-sm text-muted-foreground">
                  {integration.description}
                </p>
              </div>
            </div>
            <Button
              variant={integration.connected ? "outline" : "default"}
              onClick={() =>
                integration.connected
                  ? handleDisconnect(integration.id)
                  : handleConnect(integration.id)
              }
              disabled={isLoading === integration.id}
            >
              {isLoading === integration.id
                ? "Loading..."
                : integration.connected
                ? "Disconnect"
                : "Connect"}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
