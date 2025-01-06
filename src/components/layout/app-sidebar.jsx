"use client";
import {Plus } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import NavLink from "./navlink";
import { PageRoutes } from "./sidebar-routing";
import { Suspense } from "react";
import SidbarSkelton from "../pages/skelton/sidbar-skelton";


export function AppSidebar() {
  return (
    <Sidebar className="w-[250px]">
      <SidebarContent className="bg-background ">
        <div className="flex justify-center mb-[49.91px]">
          <Image src={logo} alt="logo" loading="lazy"/>
        </div>
        <SidebarGroup>
          <Suspense fallback={<SidbarSkelton/>}>
          <SidebarGroupContent>
            <SidebarMenu>
              {PageRoutes?.map((item) => (
                <>
                  {item?.groupName && (
                    <SidebarGroupLabel key={item} className="flex justify-between text-sm font-normal text-gray-400">
                      {item?.groupName} <Plus />
                    </SidebarGroupLabel>
                  )}

                  <NavLink data={item} key={item.title} />
                </>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          </Suspense>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
