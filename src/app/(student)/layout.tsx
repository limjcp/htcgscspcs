"use client";
import { Inter } from "next/font/google";
import { SessionProvider, useSession } from "next-auth/react";
import React from "react";
import SidebarStudent from "@/components/SidebarStudent";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// function ProtectedLayout({ children }: { children: React.ReactNode }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   React.useEffect(() => {
//     if (status === "authenticated" && !session?.user.role.includes("student")) {
//       router.push("/unauthorized"); // Redirect to an unauthorized page or any other page
//     }
//   }, [status, session, router]);

//   if (status === "loading") {
//     return <div>Loading...</div>; // Show a loading state while checking the session
//   }

//   if (status === "authenticated" && session?.user.role.includes("student")) {
//     return <>{children}</>;
//   }

//   return null; // Render nothing if the user is not a student
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <SidebarStudent>{children}</SidebarStudent>
        </SessionProvider>
      </body>
    </html>
  );
}
