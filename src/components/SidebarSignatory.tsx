// src/components/Layout.tsx
"use client";
import React, { useState } from "react";
import { Sidebar, useSidebar, Overlay, SidebarState } from "@rewind-ui/core";
import Image from "next/image";
import { Button } from "@rewind-ui/core";
import {
  CheckCheck,
  LayoutDashboard,
  ListChecks,
  NotebookPen,
  Settings,
  Signature,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

const AuthButton = dynamic(() => import("@/components/AuthButton.client"), {
  ssr: false,
});

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession();
  const userName = session?.user?.firstName || "Guest";
  const greetings = session?.user?.greeting || "Welcome to HTCGSC";
  const [expanded, setExpanded] = useState<boolean>(true);
  const [mobile, setMobile] = useState<boolean>(false);
  const sidebar = useSidebar();

  return (
    <div className="relative flex flex-row w-full h-screen overflow-hidden bg-black">
      <Sidebar
        shadow="xl"
        onToggle={(state: SidebarState) => {
          setExpanded(state.expanded);
          setMobile(state.mobile);
        }}
        className="fixed h-full bg-green-950"
      >
        <Sidebar.Head>
          <Sidebar.Head.Logo>
            <a
              href="https://htcgsc.edu.ph/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/htc-new-seal.png"
                width={48}
                height={48}
                alt="Rewind-UI"
              />
            </a>
          </Sidebar.Head.Logo>
          <Sidebar.Head.Title>HTCGENSAN</Sidebar.Head.Title>
          <Sidebar.Head.Toggle />
        </Sidebar.Head>

        <Sidebar.Nav>
          <Sidebar.Nav.Section>
            {/* <Sidebar.Nav.Section.Item
              icon={<LayoutDashboard />}
              label="Dashboard"
              href="/signatory-dashboard"
            /> */}
            <Sidebar.Nav.Section.Item
              icon={<Signature />}
              label="Sign"
              href="/signatory-sign"
            />

            <Sidebar.Nav.Section.Item
              icon={<ListChecks />}
              label="Requirements"
              href="/signatory-requirements"
            />

            <Sidebar.Nav.Section.Item
              icon={<Settings />}
              label="Settings"
              href="/signatory-settings"
            />
          </Sidebar.Nav.Section>
        </Sidebar.Nav>

        <Sidebar.Footer>
          <div className="flex flex-col justify-center items-center text-sm">
            <AuthButton />
          </div>
        </Sidebar.Footer>
      </Sidebar>

      <main
        className={`transition-all transform duration-100 text-slate-700 flex w-full flex-col items-center ${
          expanded ? "md:ml-64" : "md:ml-20"
        }`}
      >
        {mobile && (
          <Overlay
            blur="none"
            onClick={() => {
              sidebar.toggleMobile();
            }}
            className="md:hidden z-40"
          />
        )}
        <header className="flex flex-row sticky top-0 px-8 items-center bg-green-950 border-b border-b-gray-100 w-full shadow-sm min-h-[4rem]">
          <span className={"text-white"}>{greetings}</span>

          <Button
            onClick={() => {
              sidebar.toggleMobile();
            }}
            size="sm"
            color="white"
            icon
            className="ml-auto flex md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M448 96c0-17.7-14.3-32-32-32H32C14.3 64 0 78.3 0 96s14.3 32 32 32H416c17.7 0 32-14.3 32-32zm0 320c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z" />
              <path
                className="opacity-50"
                d="M0 256c0-17.7 14.3-32 32-32H416c17.7 0 32-14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"
              />
            </svg>
          </Button>
        </header>

        <div className="flex-grow overflow-auto w-full p-8 bg-white">
          {children}
        </div>

        <div className="flex sticky bottom-0 items-center bg-green-950 w-full min-h-[4rem] px-8">
          <span className={"text-white"}></span>
        </div>
      </main>
    </div>
  );
};

export default Layout;
