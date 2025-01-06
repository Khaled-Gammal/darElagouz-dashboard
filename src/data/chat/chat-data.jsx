'use client';
import React, { useEffect, useRef, useState } from "react";
import ChatCard from "./chat-card";
import { CheckCheck, SendHorizontal } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { getCookie } from "cookies-next";



export default function ChatData() {
  // const token=getCookie('token')
 const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2MjI5NDE5LCJpYXQiOjE3MzYxNDMwMTksImp0aSI6Ijk4Y2E2ZDU2ZWIzNTQ5MTA5M2MyZmRlOGY3MGM3MWZhIiwidXNlcl9pZCI6Nn0.aeiY6Mv7Uu-bJXVy-JEe0gGq8ruTv5A0Eg7gIMqlMok'
  const socketUrl=`wss://translogistics-bfgee.ondigitalocean.app/ws/chat/?token=${token}`
  const { sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket} = useWebSocket(socketUrl,{
    onOpen: () => console.log('opened'),
    onClose: () => console.log('closed'),
    onError: (error) => console.error('error:', error),
    onMessage: (e) => {
      console.log('message:', e.data);
      const message = JSON.parse(e.data);
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
     
    },
    onReconnectStop: () => console.log('reconnect stopped'),
    shouldReconnect: (closeEvent) => true,
  });
  const refMessage = useRef();
  const [newMessage, setNewMessage] = useState('');
  const [messages,setMessages]=useState([
    {
      id:1,
      message:'Hey ! my name is nouran and i am in group saturday and wednesday',
      type:'received',
    },
    {
      id:2,
      message:'want to ask you if i can replace my schedule with another group monday',
      type:'sent',
    },
    {
      id:3,
      message:'Hey ! my name is nouran and i am in group saturday and wednesday',
      type:'received',
    },
    {
      id:4,
      message:'want to ask you if i can replace my schedule with another group monday',
      type:'sent',
    },
    {
      id:5,
      message:'Hey ! my name is nouran and i am in group saturday and wednesday',
      type:"received"
    },
    {
      id:6,
      message:'want to ask you if i can replace my schedule with another group monday',
      type:'sent',
    },
  ])

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, {id: messages.length + 1, message: newMessage, type: 'sent' }]);
    }
    if(readyState===ReadyState.OPEN){
      const messagePayload = {
        message: newMessage,
        type: "chat_message",
        receiver_id: 4,
        room_id: 2,
        attachment: null,
        audio_message: null,
      };
      sendJsonMessage(messagePayload);
      // getWebSocket().send(JSON.stringify(messagePayload));
    }
   
setNewMessage('');
  };

  // Handle Enter key press after write mesaage
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  };

  useEffect(() => {
    const socket= getWebSocket();
    console.log('socket',socket);
    if (refMessage.current) {
      refMessage.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, readyState, newMessage]);

  return (
    <div className="grid grid-cols-12 gap-8 h-screen">
      <div className="md:col-span-5 col-span-12 px-4 py-6 bg-[#F7F7F7CC] rounded-[19px] dark:bg-[#1C1C1C33] border dark:border-[#2E2E2E]">
        <h1 className="text-xl font-normal text-gray-700 dark:text-gray-400  py-2  border-b">
          Your Private Chat
        </h1>
        {/* Chat Card */}
        <div className="py-4 flex flex-col gap-[13px]">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className='text-primary dark:text-gold  border-0 px-0 py-0  " '>
              <AccordionTrigger className={cn('hover:no-underline')} >Tagweed</AccordionTrigger>
              <AccordionContent className="cursor-pointer">
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
        <div className="bg-[#F7F7F7CC] dark:bg-[#1C1C1C33] rounded-[19px] px-4 py-6 flex flex-col gap-7 h-screen border dark:border-[#2E2E2E]">
          {/* chat headeer */}
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-normal text-gray-700 dark:text-gray-400">
                Wesam Ali
                <span className="text-xs text-gray-400 font-normal">
                  ( Group A )
                </span>
              </h1>
              <p className="text-xs font-normal text-green ">Online</p>
            </div>
            <p className="text-sm text-primary dark:text-gold font-normal">Tagweed</p>
          </div>
          {/* Chat Body */}
          <div className="flex flex-col gap-[18px] w-full overflow-auto h-full">
            <p className="text-gray-400 text-[10px] text-normal text-center">
              12 Mon 2024
            </p>
            {/* message chat */}
            {messages.map((message,index)=>(
              <div 
              ref={index === messages.length - 1 ? refMessage : null}
              key={message.id} className={cn('flex',message.type==='sent'?'justify-end':'justify-start')}>
              <div className={cn("w-[75%] p-4 flex flex-col gap-1 bg-gray-[#1E1E1E8C] border rounded-[16px]",message.type==="sent"?"border-gray-700 text-gray-700 dark:text-gray-600":"text-[#1E1E1E8C] dark:text-[#B4C0AE] dark:border-[#014447]")}>
                <p className=" text-xs  font-normal leading-4 ">
                  {message.message}
                </p>
                <p className="text-green text-[10px] text-normal flex flex-row justify-end items-center gap-1 ">
                  09:00 PM
                  <CheckCheck color="#29B84F" size={14} />
                </p>
              </div>
            </div>
            ))}
            
           
          </div>
          <div className=" flex items-end">
            {/* Chat Footer */}
            <div className="flex flex-row items-center px-2 gap-4 w-full rounded-[37px] bg-[#EAECF0B2] dark:bg-[#2E2E2E] h-11">
              <input
                type="text"
                placeholder="Type your message here"
                className="border-none w-full bg-transparent  focus:outline-none px-2"
                value={newMessage}  // here is the problem
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <SendHorizontal color="#5B5B5B" onClick={handleSendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
