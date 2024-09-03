import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { SessionProvider } from "next-auth/react";
import React from "react";
import SidebarStudent from "@/components/SidebarStudent";

const inter = Inter({ subsets: ["latin"] });

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
