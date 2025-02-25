"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({
  children,
  allowedRoles = [],
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        router.push("/auth/login");
        return;
      }

      // If authenticated but not authorized for this role
      if (
        user &&
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role)
      ) {
        // Redirect to the appropriate dashboard based on user role
        router.push(`/dashboard/${user.role.toLowerCase()}`);
        return;
      }
    }
  }, [isLoading, isAuthenticated, user, router, allowedRoles]);

  // Show nothing while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated or not authorized, don't render children
  if (
    !isAuthenticated ||
    (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role))
  ) {
    return null;
  }

  // If authenticated and authorized, render children
  return <>{children}</>;
}
