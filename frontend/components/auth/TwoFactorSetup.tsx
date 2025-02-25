"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

interface TwoFactorSetupProps {
  onComplete: () => void;
}

export function TwoFactorSetup({ onComplete }: TwoFactorSetupProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [rememberDevice, setRememberDevice] = useState(false);

  const handleVerifyCode = async () => {
    setError("");

    if (verificationCode.length !== 6) {
      setError("Code must be 6 digits");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement actual verification logic
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStep(3);
      generateBackupCodes();
    } catch (error) {
      setError("Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };

  const generateBackupCodes = () => {
    const codes = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () =>
        Math.random().toString(36).charAt(2).toUpperCase()
      ).join("")
    );
    setBackupCodes(codes);
  };

  const downloadBackupCodes = () => {
    const text = backupCodes.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "2fa-backup-codes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Set up Two-Factor Authentication
        </h2>
        <p className="text-sm text-muted-foreground">
          Enhance your account security with 2FA
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center gap-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                step === s
                  ? "border-primary bg-primary text-primary-foreground"
                  : step > s
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted bg-muted text-muted-foreground"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-medium">1. Scan QR Code</h3>
            <div className="flex justify-center">
              <div className="relative h-48 w-48">
                <Image
                  data-testid="qr-code"
                  src="https://placehold.co/200x200/png?text=QR+Code"
                  alt="2FA QR Code"
                  fill
                  className="rounded-lg"
                />
              </div>
            </div>
            <Button onClick={() => setStep(2)} className="w-full">
              Next: Verify Code
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-medium">2. Enter Verification Code</h3>
            <div className="space-y-2">
              <Label htmlFor="code">Enter the 6-digit code from your app</Label>
              <Input
                id="code"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
                disabled={isLoading}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberDevice}
                onCheckedChange={(checked) =>
                  setRememberDevice(checked as boolean)
                }
              />
              <Label
                htmlFor="remember"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember this device
              </Label>
            </div>
            <Button
              onClick={handleVerifyCode}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-medium">3. Save Backup Codes</h3>
            <p className="text-sm text-muted-foreground">
              Save these backup codes in a secure place. You can use them to
              access your account if you lose your authentication device.
            </p>
            <div className="grid grid-cols-2 gap-2 rounded-lg border p-4">
              {backupCodes.map((code, index) => (
                <code
                  key={index}
                  data-testid="backup-code"
                  className="rounded bg-muted px-2 py-1 text-sm font-mono"
                >
                  {code}
                </code>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={downloadBackupCodes}
              className="w-full"
            >
              Download Backup Codes
            </Button>
            <Button onClick={onComplete} className="w-full">
              Complete Setup
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
