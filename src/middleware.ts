import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is not set");
  }

  const token = await getToken({ req, secret });

  if (
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  if (req.nextUrl.pathname === "/") {
    if (token.role && Array.isArray(token.role)) {
      if (token.role.includes("admin")) {
        return NextResponse.redirect(new URL("/admin-dashboard", req.url));
      }
      if (token.role.includes("staff")) {
        return NextResponse.redirect(new URL("/staff-dashboard", req.url));
      }
      if (token.role.includes("signatory")) {
        return NextResponse.redirect(new URL("/signatory-dashboard", req.url));
      }
      if (token.role.includes("student")) {
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
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (
    (pathname.startsWith("/staff-dashboard") ||
      pathname.startsWith("/staff-approve") ||
      pathname.startsWith("/staff-requirements")) &&
    !token.role.includes("staff")
  ) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (
    (pathname.startsWith("/signatory-dashboard") ||
      pathname.startsWith("/signatory-sign")) &&
    !token.role.includes("signatory")
  ) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (
    (pathname.startsWith("/student-dashboard") ||
      pathname.startsWith("/student-clearance") ||
      pathname.startsWith("/student-requirements") ||
      pathname.startsWith("/student-clearance/track-clearance")) &&
    !token.role.includes("student")
  ) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|login|htc-new-seal.png|unauthorized|api).*)",
  ],
};
