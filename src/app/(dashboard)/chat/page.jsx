import ChatData from "@/data/chat/chat-data";
import ContactForm from "@/data/contact/contact";

export default async function ChatPage() {
  return (
    <div className="border border-[#DDDDDD] rounded-[10px] w-full px-8 py-10">
      <ChatData />
    </div>
  );
}
