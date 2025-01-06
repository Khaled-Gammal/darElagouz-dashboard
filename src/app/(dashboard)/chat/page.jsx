import ChatData from "@/data/chat/chat-data";


export default async function ChatPage() {
  return (
    <div className="border border-[#DDDDDD] dark:border-[#2E2E2E] rounded-[10px] w-full px-8 py-10">
      <ChatData />
    </div>
  );
}
