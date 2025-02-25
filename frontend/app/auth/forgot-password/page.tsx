"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import { AuthCard } from "../../../components/auth/AuthCard";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      // TODO: Implement password reset request logic
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <AuthCard
        title="Reset Password"
        description="Enter your email address and we'll send you a link to reset your password"
        footer={
          <div className="text-center text-sm">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:underline underline-offset-4"
            >
              Back to login
            </Link>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || status === "success"}
            />
          </div>

          {status === "error" && (
            <div className="text-sm text-destructive">{errorMessage}</div>
          )}

          {status === "success" ? (
            <div className="rounded-lg bg-primary/10 p-4 text-center">
              <p className="text-sm text-primary">
                Check your email for a link to reset your password. If it
                doesn't appear within a few minutes, check your spam folder.
              </p>
            </div>
          ) : (
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || status === "success"}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Sending reset link..." : "Send reset link"}
            </Button>
          )}
        </form>
      </AuthCard>
    </div>
  );
}
