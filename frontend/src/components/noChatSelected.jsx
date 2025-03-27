import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <section
      className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-[#1E1D2D] h-full" // Ensure full height
      aria-labelledby="no-chat-title"
    >
      <div className="w-full max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-[#2A293A] flex items-center justify-center animate-bounce"
              role="img"
              aria-label="Chat icon"
            >
              <MessageSquare className="w-8 h-8 text-[#E9A5F1]" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <header>
          <h2 id="no-chat-title" className="text-2xl font-bold text-[#E9A5F1]">
            Welcome to Orbit!
          </h2>
        </header>
        <p className="text-[#E9A5F1]" aria-live="polite">
          Select a conversation to launch your chat mission!
        </p>
      </div>
    </section>
  );
};

export default NoChatSelected;
