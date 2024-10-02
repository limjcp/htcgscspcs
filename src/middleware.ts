import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Handle public routes
  if (
    ["/login", "/htc-new-seal.png"].includes(nextUrl.pathname) ||
    nextUrl.pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the login page
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/api/auth/signin", nextUrl));
  }

  const role = req.auth?.user?.role || [];

  // Redirect logged-in users based on their role at the root "/"
  if (nextUrl.pathname === "/") {
    const roleDashboardMap: Record<
      "admin" | "staff" | "signatory" | "student",
      string
    > = {
      admin: "/admin-dashboard",
      staff: "/staff-dashboard",
      signatory: "/signatory-dashboard",
      student: "/student-dashboard",
    };

    for (const userRole of role) {
      if (roleDashboardMap[userRole as keyof typeof roleDashboardMap]) {
        return NextResponse.redirect(
          new URL(
            roleDashboardMap[userRole as keyof typeof roleDashboardMap],
            nextUrl
          )
        );
      }
    }
  }

  // Role-specific route protection
  const routeRoleMap: Record<
    "admin" | "staff" | "signatory" | "student",
    string
  > = {
    admin: "/admin",
    staff: "/staff",
    signatory: "/signatory",
    student: "/student",
  };

  for (const roleKey of Object.keys(
    routeRoleMap
  ) as (keyof typeof routeRoleMap)[]) {
    if (
      nextUrl.pathname.startsWith(routeRoleMap[roleKey]) &&
      !role.includes(roleKey)
    ) {
      return NextResponse.redirect(new URL("/unauthorized", nextUrl));
    }
  }

  return NextResponse.next();
});

// Use a simplified matcher
export const config = {
  matcher: ["/((?!_next).*)"],
};
