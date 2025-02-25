"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Check, X } from "lucide-react";

import { AuthCard } from "../../../components/auth/AuthCard";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

interface PasswordRequirement {
  text: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    text: "At least 8 characters long",
    test: (password) => password.length >= 8,
  },
  {
    text: "Contains at least one uppercase letter",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    text: "Contains at least one lowercase letter",
    test: (password) => /[a-z]/.test(password),
  },
  {
    text: "Contains at least one number",
    test: (password) => /[0-9]/.test(password),
  },
  {
    text: "Contains at least one special character",
    test: (password) => /[^A-Za-z0-9]/.test(password),
  },
];

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setStatus("error");
      setErrorMessage("Invalid or expired reset token");
      return;
    }

    if (password !== confirmPassword) {
      setStatus("error");
      setErrorMessage("Passwords do not match");
      return;
    }

    const isValid = passwordRequirements.every((req) => req.test(password));
    if (!isValid) {
      setStatus("error");
      setErrorMessage("Please meet all password requirements");
      return;
    }

    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      // TODO: Implement password reset logic
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated API call
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <AuthCard
          title="Invalid Reset Link"
          description="This password reset link is invalid or has expired."
          footer={
            <Link href="/auth/forgot-password">
              <Button className="w-full">Request New Reset Link</Button>
            </Link>
          }
        >
          <div className="text-center text-muted-foreground">
            If you're still having trouble, please contact support.
          </div>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <AuthCard
        title="Reset Your Password"
        description="Choose a new password for your account"
        footer={
          status === "success" ? (
            <Link href="/auth/login">
              <Button className="w-full">Back to Login</Button>
            </Link>
          ) : (
            <div className="text-center text-sm">
              Remember your password?{" "}
              <Link
                href="/auth/login"
                className="text-primary hover:underline underline-offset-4"
              >
                Back to login
              </Link>
            </div>
          )
        }
      >
        {status === "success" ? (
          <div className="rounded-lg bg-primary/10 p-4 text-center">
            <p className="text-sm text-primary">
              Your password has been successfully reset. You can now log in with
              your new password.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Password Requirements</Label>
              <div className="space-y-2 rounded-lg border p-4">
                {passwordRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    {requirement.test(password) ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span
                      className={
                        requirement.test(password)
                          ? "text-primary"
                          : "text-muted-foreground"
                      }
                    >
                      {requirement.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {status === "error" && (
              <div className="text-sm text-destructive">{errorMessage}</div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Resetting password..." : "Reset Password"}
            </Button>
          </form>
        )}
      </AuthCard>
    </div>
  );
}
