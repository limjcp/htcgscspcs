"use client";

import React, { useState } from "react";
import { Sidebar, useSidebar, Overlay, SidebarState } from "@rewind-ui/core";
import Image from "next/image";
import { Button } from "@rewind-ui/core";
import { LayoutDashboard, Settings, NotebookPen } from "lucide-react";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession();
  const userName = session?.user?.firstName || "Guest";
  const [expanded, setExpanded] = useState<boolean>(true);
  const [mobile, setMobile] = useState<boolean>(false);
  const sidebar = useSidebar();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const NavItem = ({ icon, label, href, children, as }: any) => {
    const active = isActive(href);
    return (
      <Sidebar.Nav.Section.Item
        icon={icon}
        label={label}
        href={href}
        as={as}
        className={active ? "bg-green-950 text-white" : ""}
      >
        {children}
      </Sidebar.Nav.Section.Item>
    );
  };
  const router = useRouter();
  const handleSignout = () => {
    router.push("/api/auth/signout");
  };

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
            <NavItem
              icon={<LayoutDashboard />}
              label="Home"
              href="/student-dashboard"
            />

            <NavItem icon={<NotebookPen />} label="Clearance" as="button">
              <Sidebar.Nav.Section className="bg-inherit" isChild>
                <NavItem
                  icon={<span className="w-1 h-1 rounded bg-green-600" />}
                  label="Track"
                  href="/student-clearance"
                />
                <NavItem
                  icon={<span className="w-1 h-1 rounded bg-green-600" />}
                  label="Requirements"
                  href="/student-requirements"
                />
              </Sidebar.Nav.Section>
            </NavItem>

            <NavItem
              icon={<Settings />}
              label="Settings"
              href="/admin-settings"
            />
          </Sidebar.Nav.Section>
        </Sidebar.Nav>

        <Sidebar.Footer>
          <div className="flex flex-col justify-center items-center text-sm">
            <Button
              className="bg-white text-black hover:bg-red-800 hover:text-white"
              onClick={handleSignout}
            >
              Sign Out
            </Button>
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
          <span className={"text-white"}>GoodHoly, {userName}!</span>

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
