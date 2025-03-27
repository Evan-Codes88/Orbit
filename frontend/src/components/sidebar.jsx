import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import SidebarSkeleton from "./skeletons/SidebarSkeleton.jsx";
import { Users } from "lucide-react";


const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers()
  }, [getUsers])

  if(isUsersLoading) return <SidebarSkeleton />
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-[#2A293A] flex flex-col transition-all duration-200 bg-[#1E1D2D]">
        <div className="border-b border-[#2A293A] w-full p-5 bg-[#1E1D2D]">
            <div className="flex items-center gap-2 text-[#E0E0E0]">
                <Users className="size-6 text-[#8A86C1]" />
                <span className="font-medium hidden lg:block">Contacts</span>
            </div>
                {/* TODO: Online toggle filter */}
            </div>

            <div className="overflow-y-auto w-full py-3 bg-[#1E1D2D] text-[#E0E0E0]">
            {users.map((user) => (
                <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`
                    w-full p-3 flex items-center gap-3
                    hover:bg-[#2A293A] transition-colors
                    ${selectedUser?._id === user._id ? "bg-[#2A293A] ring-1 ring-[#444258]" : ""}
                `}
                >
                <div className="relative mx-auto lg:mx-0">
                    <img
                        src={user.profilePic || "/avatar.png"}
                        alt={user.name}
                        className="size-12 object-cover rounded-full"
                    />
                    {onlineUsers.includes(user._id) && (
                    <span
                        className="absolute bottom-0 right-0 size-3 bg-green-500 
                        rounded-full ring-2 ring-[#12111F]"
                    />
                    )}
                </div>

                {/* User info - only visible on larger screens */}
                <div className="hidden lg:block text-left min-w-0">
                    <div className="font-medium truncate text-[#F5F5F5]">{user.fullName}</div>
                    <div className="text-sm text-[#9FA0B2]">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                    </div>
                </div>
                </button>
            ))}
        </div>
    </aside>
  )
}

export default Sidebar;