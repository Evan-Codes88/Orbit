import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-16 sm:w-20 lg:w-72 border-r border-[#4C4A73] flex flex-col transition-all duration-200 bg-[#1E1D2D]">
      {/* Top section */}
      <div className="border-b border-[#4C4A73] w-full px-2 sm:px-4 py-3 sm:py-5">
        <div className="flex items-center gap-2">
          <Users className="size-5 sm:size-6 text-[#E9A5F1]" />
          <span className="font-medium hidden lg:block text-[#E9A5F1]">Contacts</span>
        </div>

        {/* Online filter toggle - hidden on small screens */}
        <div className="mt-3 hidden lg:flex items-center gap-2 text-[#E9A5F1]">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-2 sm:py-3 px-1 sm:px-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-2 sm:p-3 flex items-center gap-3
              hover:bg-[#4C4A73] transition-colors
              ${selectedUser?._id === user._id ? "bg-[#4C4A73] ring-1 ring-[#4C4A73]" : ""}
            `}
          >
            {/* Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="w-10 h-10 sm:size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-2.5 sm:size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>

            {/* Only show name on large screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate text-[#E9A5F1]">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {/* Fallback message */}
        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4 text-sm">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
