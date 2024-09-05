import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is not set");
  }

  const token = await getToken({ req, secret });

  console.log("Token:", token);
  console.log("Request URL:", req.nextUrl.pathname);
  console.log("Cookies:", req.cookies);

  if (
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  if (!token) {
    console.log("No token found, redirecting to signin");
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  if (req.nextUrl.pathname === "/") {
    if (token.role && Array.isArray(token.role)) {
      if (token.role.includes("admin")) {
        console.log("Redirecting to admin-dashboard");
        return NextResponse.redirect(new URL("/admin-dashboard", req.url));
      }
      if (token.role.includes("staff")) {
        console.log("Redirecting to staff-dashboard");
        return NextResponse.redirect(new URL("/staff-dashboard", req.url));
      }
      if (token.role.includes("signatory")) {
        console.log("Redirecting to signatory-dashboard");
        return NextResponse.redirect(new URL("/signatory-dashboard", req.url));
      }
      if (token.role.includes("student")) {
        console.log("Redirecting to student-dashboard");
        return NextResponse.redirect(new URL("/student-dashboard", req.url));
      }
    }
  }

  const pathname = req.nextUrl.pathname;

  if (
    (pathname.startsWith("/register") ||
      pathname.startsWith("/admin-dashboard")) &&
    !token.role.includes("admin")
  ) {
    console.log("Unauthorized access to admin area, redirecting");
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (
    (pathname.startsWith("/staff-dashboard") ||
      pathname.startsWith("/staff-approve") ||
      pathname.startsWith("/staff-requirements")) &&
    !token.role.includes("staff")
  ) {
    console.log("Unauthorized access to staff area, redirecting");
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (
    (pathname.startsWith("/signatory-dashboard") ||
      pathname.startsWith("/signatory-sign")) &&
    !token.role.includes("signatory")
  ) {
    console.log("Unauthorized access to signatory area, redirecting");
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (
    (pathname.startsWith("/student-dashboard") ||
      pathname.startsWith("/student-clearance") ||
      pathname.startsWith("/student-requirements") ||
      pathname.startsWith("/student-clearance/track-clearance")) &&
    !token.role.includes("student")
  ) {
    console.log("Unauthorized access to student area, redirecting");
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|login|htc-new-seal.png|unauthorized|api).*)",
  ],
};
