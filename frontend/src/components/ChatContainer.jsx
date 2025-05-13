import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <section className="flex-1 flex flex-col overflow-auto bg-[#1E1D2D]">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </section>
    );
  }

  return (
    <section className="flex-1 flex flex-col overflow-hidden bg-[#1E1D2D] text-[#E9A5F1]">
      <ChatHeader />

      {/* Messages Area */}
      <article className="flex-1 overflow-y-auto px-2 py-4 sm:p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            {/* Avatar */}
            <figure className="chat-image avatar">
              <div className="w-8 h-8 sm:size-10 rounded-full border border-[#4C4A73]">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </figure>

            {/* Timestamp */}
            <header className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </header>

            {/* Message Bubble */}
            <div className="chat-bubble max-w-[85%] sm:max-w-[70%] flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="w-full max-w-xs sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p className="break-words">{message.text}</p>}
            </div>
          </div>
        ))}
      </article>

      {/* Message Input */}
      <footer className="p-2 sm:p-4">
        <MessageInput />
      </footer>
    </section>
  );
};

export default ChatContainer;
