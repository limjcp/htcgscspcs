import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Public routes that don't require authentication
  if (
    nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/api/auth") ||
    nextUrl.pathname === "/htc-new-seal.png"
  ) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login page
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/api/auth/signin", nextUrl));
  }

  // Role-based redirects
  if (nextUrl.pathname === "/") {
    const userRole = req.auth?.user?.role;
    if (Array.isArray(userRole)) {
      if (userRole.includes("admin")) {
        return NextResponse.redirect(new URL("/admin-dashboard", nextUrl));
      } else if (userRole.includes("staff")) {
        return NextResponse.redirect(new URL("/staff-dashboard", nextUrl));
      } else if (userRole.includes("signatory")) {
        return NextResponse.redirect(new URL("/signatory-dashboard", nextUrl));
      } else if (userRole.includes("student")) {
        return NextResponse.redirect(new URL("/student-dashboard", nextUrl));
      }
    }
  }

  if (
    nextUrl.pathname.startsWith("/admin") &&
    !req.auth?.user?.role?.includes("admin")
  ) {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }

  if (
    nextUrl.pathname.startsWith("/staff") &&
    !req.auth?.user?.role?.includes("staff")
  ) {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }

  if (
    nextUrl.pathname.startsWith("/signatory") &&
    !req.auth?.user?.role?.includes("signatory")
  ) {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }

  if (
    nextUrl.pathname.startsWith("/student") &&
    !req.auth?.user?.role?.includes("student")
  ) {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
