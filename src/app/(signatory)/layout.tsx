import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import React from "react";
import SidebarSignatory from "@/components/SidebarSignatory";

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
          <SidebarSignatory>{children}</SidebarSignatory>
        </SessionProvider>
      </body>
    </html>
  );
}
