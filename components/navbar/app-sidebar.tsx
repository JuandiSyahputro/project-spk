"use client";

import { NavMain } from "@/components/navbar/nav-main";
import { NavUser } from "@/components/navbar/nav-user";
import { TeamSwitcher } from "@/components/navbar/team-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { dataNavbar } from "@/lib/constants";
import { ComponentProps } from "react";

interface UserProps {
  id?: string;
  nama: string;
  jabatan: string;
  username: string | null;
}
export function AppSidebar({ user }: ComponentProps<typeof Sidebar> & { user: UserProps }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher teams={dataNavbar.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={dataNavbar.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
