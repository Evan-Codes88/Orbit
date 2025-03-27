import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-[#1E1D2D]">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-[#2A293A] flex items-center
             justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-[#E9A5F1]" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-[#E9A5F1]">Welcome to Orbit!</h2>
        <p className="text-[#E9A5F1]">
            Select a conversation to launch your chat mission!
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
