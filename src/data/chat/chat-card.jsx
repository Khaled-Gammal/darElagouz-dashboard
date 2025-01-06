import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import girl from "../../assets/images/Ellipse.png"
export default function ChatCard() {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-2">
        <Avatar>
          <AvatarImage src={"https://github.com/shadcn.png"}  alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="col-span-10 py-2">
        <div className="flex flex-row gap-6 ">
        <h2 className="text-xs font-normal text-gray-700 dark:text-[#B4C0AE] leading-4 ">Shadab</h2>
        <p className="text-xs text-gray-400 dark:text-[#808080] font-normal">Group A</p>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-200 font-normal">I will start working on it tonight too</p>
    </div>
    </div>
  );
}
