import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  const salt = process.env.AUTH_SALT;

  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is not set");
  }

  if (!salt) {
    throw new Error("AUTH_SALT environment variable is not set");
  }

  const token = await getToken({ req, secret, salt });

  if (token) {
    // Check if the user is a student
    if (token.studentId) {
      // Redirect to the student dashboard
      return NextResponse.redirect(new URL("/student-dashboard", req.url));
    }
  }

  // Continue with the request if no redirection is needed
  return NextResponse.next();
}
