import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function UserPage() {
  const session = await auth();

  if (!session) {
    // Redirect unauthenticated users to login
    redirect("/api/auth/signin");
  } else {
    // Role-based redirects when accessing the root path "/"
    const roleDashboardMap: Record<string, string> = {
      admin: "/admin-dashboard",
      staff: "/staff-approve",
      signatory: "/signatory-sign",
      student: "/student-clearance",
    };

    // Check the user's roles and redirect to the appropriate dashboard
    for (const role of session.user?.role || []) {
      if (roleDashboardMap[role]) {
        redirect(roleDashboardMap[role]);
      }
    }

    // If no role matches, redirect to a default dashboard or unauthorized page
    redirect("/unauthorized");
  }

  // Render nothing, since redirection happens before any UI is shown
  return null;
}
