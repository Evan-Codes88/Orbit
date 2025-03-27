import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="border-b border-[#2A293A] w-full p-3 bg-[#1E1D2D]">
      <div className="flex items-center justify-between text-[#E0E0E0]">
        {/* User Info Section */}
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full overflow-hidden border border-[#8A86C1]">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User Info */}
          <div className="text-sm">
            <h3 className="font-medium text-[#F5F5F5] truncate">{selectedUser.fullName}</h3>
            <p className={`text-xs ${onlineUsers.includes(selectedUser._id) ? "text-green-500" : "text-[#9FA0B2]"}`}>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button 
          onClick={() => setSelectedUser(null)} 
          className="p-2 rounded-full hover:bg-[#2A293A] transition-colors"
        >
          <X className="size-6 text-[#8A86C1] hover:text-[#F5F5F5] transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
