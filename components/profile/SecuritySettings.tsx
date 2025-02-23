"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export interface SecuritySettingsProps {
  userType: "landlord" | "tenant" | "admin";
  requiresStrongPassword?: boolean;
  requiresMFA?: boolean;
}

export function SecuritySettings({
  userType,
  requiresStrongPassword = false,
  requiresMFA = false,
}: SecuritySettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Implement password change logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
    }
  };

  const handleMFAToggle = async (enabled: boolean) => {
    setIsLoading(true);
    try {
      // TODO: Implement MFA toggle logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMfaEnabled(enabled);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                required
              />
            </div>
            {requiresStrongPassword && (
              <div className="text-sm text-muted-foreground">
                Password must contain at least 8 characters, including
                uppercase, lowercase, numbers, and special characters.
              </div>
            )}
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Authenticator App</p>
              <p className="text-sm text-muted-foreground">
                Use an authenticator app to generate one-time codes.
              </p>
            </div>
            <Switch
              checked={mfaEnabled}
              onCheckedChange={handleMFAToggle}
              disabled={isLoading || requiresMFA}
            />
          </div>
          {requiresMFA && (
            <p className="text-sm text-muted-foreground">
              Two-factor authentication is required for {userType} accounts.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {[1, 2].map((session) => (
              <div
                key={session}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="font-medium">Chrome on Windows</p>
                  <p className="text-sm text-muted-foreground">
                    Last active: 2 hours ago
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Revoke
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
