"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";

const fetchSession = async () => {
  const response = await fetch("/api/auth/session");
  if (response.ok) {
    return response.json();
  }
  return null;
};

export function withAuth(
  WrappedComponent: React.ComponentType<any>,
  requiredRoles: string[] = []
) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        const session = await fetchSession();

        // Redirect to login if not authenticated
        if (!session) {
          router.push("/api/auth/signin");
          return;
        }

        const userRoles = session?.user?.role || [];

        // Role-based redirects for root path "/"
        if (router.pathname === "/") {
          const roleDashboardMap: Record<string, string> = {
            admin: "/admin-dashboard",
            staff: "/staff-approve",
            signatory: "/signatory-sign",
            student: "/student-clearance",
          };

          for (const role of userRoles) {
            if (roleDashboardMap[role]) {
              router.push(roleDashboardMap[role]);
              return;
            }
          }
        }

        // Role-specific route protection
        const hasRequiredRole = requiredRoles.some((role) =>
          userRoles.includes(role)
        );

        if (requiredRoles.length > 0 && !hasRequiredRole) {
          router.push("/"); // Redirect to unauthorized page if user doesn't have the required role
          return;
        }

        setIsAuthenticated(true);
        setIsLoading(false);
      };

      checkAuth();
    }, [router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null; // Render nothing if not authenticated
    }

    // Render the component only after the checks
    return <WrappedComponent {...props} />;
  };
}
