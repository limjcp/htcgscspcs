import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request as any,
    secret: process.env.AUTH_SECRET,
  });

  // Allow access to login, register, logo, and API routes
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/api/auth") ||
    request.nextUrl.pathname === "/htc-new-seal.png"
  ) {
    return NextResponse.next();
  }

  If there's no token, redirect to the sign-in page
  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  // Redirect users based on their roles to the appropriate dashboard
  if (request.nextUrl.pathname === "/") {
    if (token.role && Array.isArray(token.role)) {
      if (token.role.includes("admin")) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
      }
      if (token.role.includes("staff")) {
        return NextResponse.redirect(new URL("/staff-dashboard", request.url));
      }
      if (token.role.includes("signatory")) {
        return NextResponse.redirect(
          new URL("/signatory-dashboard", request.url)
        );
      }
      if (token.role.includes("student")) {
        return NextResponse.redirect(
          new URL("/student-dashboard", request.url)
        );
      }
    }
  }
  
  // Authorization checks for specific routes
  const pathname = request.nextUrl.pathname;
  
  if (
    (pathname.startsWith("/register") ||
      pathname.startsWith("/admin-dashboard")) &&
    !token.role.includes("admin")
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
  
  if (
    (pathname.startsWith("/staff-dashboard") ||
      pathname.startsWith("/staff-approve") ||
      pathname.startsWith("/staff-requirements")) &&
    !token.role.includes("staff")
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
  
  if (
    (pathname.startsWith("/signatory-dashboard") ||
      pathname.startsWith("/signatory-sign")) &&
    !token.role.includes("signatory")
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
  
  if (
    (pathname.startsWith("/student-dashboard") ||
      pathname.startsWith("/student-clearance") ||
      pathname.startsWith("/student-requirements") ||
      pathname.startsWith("/student-clearance/track-clearance")) &&
    !token.role.includes("student")
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - static files
     * - API routes
     * - login page
     * - logo file
     * - any other public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|login|htc-new-seal.png|unauthorized|api).*)",
  ],
};
