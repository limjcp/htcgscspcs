import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { SessionProvider } from "next-auth/react";
import React from "react";

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
          <Sidebar>{children}</Sidebar>
        </SessionProvider>
      </body>
    </html>
  );
}
