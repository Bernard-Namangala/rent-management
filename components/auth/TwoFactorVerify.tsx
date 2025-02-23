"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface TwoFactorVerifyProps {
  onVerify: (code: string, isBackupCode?: boolean) => Promise<void>;
  onCancel: () => void;
}

export function TwoFactorVerify({ onVerify, onCancel }: TwoFactorVerifyProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUsingBackupCode, setIsUsingBackupCode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isUsingBackupCode) {
      if (code.length !== 10) {
        setError("Backup code must be 10 characters");
        return;
      }
    } else {
      if (code.length !== 6) {
        setError("Code must be 6 digits");
        return;
      }

      if (!/^\d+$/.test(code)) {
        setError("Code must contain only numbers");
        return;
      }
    }

    setIsLoading(true);
    try {
      await onVerify(code, isUsingBackupCode);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Invalid code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Two-Factor Authentication
        </h2>
        <p className="text-sm text-muted-foreground">
          {isUsingBackupCode
            ? "Enter a backup code from your list of saved codes"
            : "Enter the verification code from your authenticator app"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code">
            {isUsingBackupCode ? "Backup Code" : "Verification Code"}
          </Label>
          <Input
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={
              isUsingBackupCode ? "Enter backup code" : "Enter 6-digit code"
            }
            maxLength={isUsingBackupCode ? 10 : 6}
            disabled={isLoading}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsUsingBackupCode(!isUsingBackupCode)}
          >
            {isUsingBackupCode
              ? "Use authenticator code"
              : "Use backup code instead"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
