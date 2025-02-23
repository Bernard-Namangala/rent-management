"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  CreditCard,
  FileText,
  Github,
  Mail,
  Link2,
  Loader2,
  Unlink,
} from "lucide-react";

interface ConnectedAccount {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
  isLoading?: boolean;
}

interface ConnectedAccountsProps {
  userType: "tenant" | "landlord";
  additionalIntegrations?: string[];
}

export function ConnectedAccounts({
  userType,
  additionalIntegrations = [],
}: ConnectedAccountsProps) {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([
    {
      id: "google",
      name: "Google",
      description: "Access your Google Drive for document storage",
      icon: <Mail className="h-5 w-5" />,
      isConnected: true,
    },
    {
      id: "github",
      name: "GitHub",
      description: "Connect your GitHub account for single sign-on",
      icon: <Github className="h-5 w-5" />,
      isConnected: false,
    },
    {
      id: "payment",
      name: "Payment Provider",
      description: "Connect your preferred payment method",
      icon: <CreditCard className="h-5 w-5" />,
      isConnected: true,
    },
    {
      id: "signature",
      name: "Digital Signature",
      description: "Set up digital signature for documents",
      icon: <FileText className="h-5 w-5" />,
      isConnected: false,
    },
  ]);

  const handleConnect = async (accountId: string) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === accountId ? { ...acc, isLoading: true } : acc
      )
    );

    try {
      // TODO: Implement connection logic
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === accountId
            ? { ...acc, isConnected: true, isLoading: false }
            : acc
        )
      );

      toast.success(`Successfully connected ${accountId}`);
    } catch (error) {
      console.error(`Error connecting ${accountId}:`, error);
      toast.error(`Failed to connect ${accountId}`);

      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === accountId ? { ...acc, isLoading: false } : acc
        )
      );
    }
  };

  const handleDisconnect = async (accountId: string) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === accountId ? { ...acc, isLoading: true } : acc
      )
    );

    try {
      // TODO: Implement disconnection logic
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === accountId
            ? { ...acc, isConnected: false, isLoading: false }
            : acc
        )
      );

      toast.success(`Successfully disconnected ${accountId}`);
    } catch (error) {
      console.error(`Error disconnecting ${accountId}:`, error);
      toast.error(`Failed to disconnect ${accountId}`);

      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === accountId ? { ...acc, isLoading: false } : acc
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      {accounts.map((account) => (
        <Card key={account.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="rounded-lg bg-muted p-2">{account.icon}</div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {account.name}
                    {account.isConnected && (
                      <Badge variant="outline" className="ml-2">
                        Connected
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{account.description}</CardDescription>
                </div>
              </div>
              <Button
                variant={account.isConnected ? "outline" : "default"}
                size="sm"
                onClick={() =>
                  account.isConnected
                    ? handleDisconnect(account.id)
                    : handleConnect(account.id)
                }
                disabled={account.isLoading}
              >
                {account.isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : account.isConnected ? (
                  <>
                    <Unlink className="mr-2 h-4 w-4" />
                    Disconnect
                  </>
                ) : (
                  <>
                    <Link2 className="mr-2 h-4 w-4" />
                    Connect
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
