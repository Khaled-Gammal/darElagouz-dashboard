"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { cn } from "@/lib/utils";

function NavLink({ data }) {
  const pathname = usePathname();

  function FilterBath() {
    return pathname.split("/")[1];
  }

  function isActive(active) {
    if (active === FilterBath()) {
      return true;
    }
    return false;
  }

  function isParentActive(parent) {
    console.log(parent);
    if (parent && parent?.includes(FilterBath())) {
      return true;
    }
    return false;
  }

  if (data.children && data?.children?.length > 0) {
    console.log(data.active);
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-0 px-0 py-0 flex flex-row ">
        <div
              className={
                isActive(data?.active)
                  ? "w-[6px] bg-primary  rounded-tr-md rounded-br-md h-[60px]"
                  : ""
              }
            ></div>
            <div className="w-full ">
          <AccordionTrigger
            className={cn(`p-0 m-0 ml-4  my-2 rounded-[10px]  hover:no-underline h-[46px] hover:bg-primary hover:text-white ${isActive(data?.active)?"bg-primary text-white " :
              " text-base font-normal  flex items-center "}`
            )}
          >
            
            <p
              className={`h-[46px] text-gray-400 text-base font-normal w-full flex items-center gap-1 rounded-[10px] pl-[17.5px]  ${
                isActive(data?.active)
                  ? " bg-primary text-white"
                  : "hover:bg-primary hover:text-white"
              }   `}
            >
              {data?.icon}
              {data?.title}
            </p>
          </AccordionTrigger>
          <AccordionContent>
            {data?.children.map((item) => (
              console.log(item.active),
              <Link key={item?.title} href={item?.path}>
                <SidebarMenuButton
                  className={`text-gray-400 hover:text-primary  ml-4 pl-8 text-center flex ${
                    isParentActive(item?.active)
                      ? " text-primary"
                      : "hover:text-primary"
                  }`}
                >
                  <div class="lick-shape">
                    <div class="line"></div>
                    <div class="curve"></div>
                  </div>

                  {item?.title}
                </SidebarMenuButton>
              </Link>
            ))}
          </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
    );
  } else {
    return (
      data?.path && (
        <Link key={data?.path} href={data?.path} className="no-underline">
          <SidebarMenuItem
            className={`flex items-center text-base gap-4 group ${
              isActive(data?.active) &&
              " rounded-[10px] h-[60px] "
            }`}
          >
            <div
              className={
                isActive(data.active) ?
                "w-[6px] bg-primary rounded-tr-[10px] rounded-br-[10px] h-full":"w-[6px] hover:bg-primary h-full"
              }
            ></div>
            <SidebarMenuButton
              className={`h-[46px] flex gap-[10px] text-base font-normal  pl-[17.5px] text-gray-500  ${
                isActive(data?.active)
                  ? " bg-primary text-[#fff] rounded-[10px] "
                  : "hover:bg-primary hover:text-[#fff] hover:rounded-[10px] "
              }`}
            >
              {data?.icon} {data?.title}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Link>
      )
    );
  }
}

export default NavLink;
