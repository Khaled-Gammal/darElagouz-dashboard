import React from "react";
import ChatCard from "./chat-card";
import { CheckCheck, SendHorizontal } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export default function ChatData() {
  return (
    <div className="grid grid-cols-12 gap-8 h-screen">
      <div className="md:col-span-5 col-span-12 px-4 py-6 bg-[#F7F7F7CC] rounded-[19px]">
        <h1 className="text-xl font-normal text-[#454545] py-2  border-b">
          Your Private Chat
        </h1>
        {/* Chat Card */}
        <div className="py-4 flex flex-col gap-[13px]">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className='text-primary  border-0 px-0 py-0  " '>
              <AccordionTrigger className={cn('hover:no-underline')} >Tagweed</AccordionTrigger>
              <AccordionContent>
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <ChatCard key={i} />
                  ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="md:col-span-7 col-span-12 ">
        <div className="bg-[#F7F7F7CC] rounded-[19px] px-4 py-6 flex flex-col gap-7 h-screen">
          {/* chat headeer */}
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-normal text-gray-700">
                Wesam Ali
                <span className="text-xs text-gray-400 font-normal">
                  ( Group A )
                </span>
              </h1>
              <p className="text-xs font-normal text-green ">Online</p>
            </div>
            <p className="text-sm text-primary font-normal">Tagweed</p>
          </div>
          {/* Chat Body */}
          <div className="flex flex-col gap-2 w-full">
            <p className="text-gray-400 text-[10px] text-normal text-center">
              12 Mon 2024
            </p>
            {/* message chat */}
            <div className="w-[75%] p-4 bg-gray-[#1E1E1E8C] border rounded-[16px]">
              <p className=" text-xs text-[#1E1E1E8C] font-normal leading-4 ">
                Hey ! my name is nouran and i am in group saturday and wednesday
                want to ask you if i can replace my schedule with another group
                monday
              </p>
              <p className="text-green text-[10px] text-normal flex flex-row justify-end items-center gap-1 ">
                09:00 PM
                <CheckCheck color="#29B84F" size={14} />
              </p>
            </div>
            {/* message chat */}
            <div className="flex justify-end ">
              <div className="w-[75%] p-4 bg-gray-[#1E1E1E8C] border rounded-[16px] ">
                <p className=" text-xs text-[#1E1E1E8C] font-normal leading-4 ">
                  Hey ! my name is nouran and i am in group saturday and
                  wednesday want to ask you if i can replace my schedule with
                  another group monday
                </p>
                <p className="text-green text-[10px] text-normal flex flex-row justify-end items-center gap-1 ">
                  09:00 PM
                  <CheckCheck color="#29B84F" size={14} />
                </p>
              </div>
            </div>
          </div>
          <div className="h-full flex items-end">
            {/* Chat Footer */}
            <div className="flex flex-row items-center px-2 gap-4 w-full rounded-[37px] bg-[#EAECF0B2] h-11">
              <input
                type="text"
                placeholder="Type your message here"
                className="border-none w-full bg-transparent focus:outline-none"
              />
              <SendHorizontal color="#5B5B5B" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
