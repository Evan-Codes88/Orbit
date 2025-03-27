import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-[#1E1D2D] border-b border-[#4C4A73] fixed w-full top-0 z-40 backdrop-blur-lg bg-opacity-80">
      <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8 h-16">
        
        {/* LEFT LOGO */}
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
          <div className="rounded-lg bg-[#E9A5F1]/10 flex items-center justify-center p-2">
            <MessageSquare className="w-5 h-5 text-[#E9A5F1]" />
          </div>
          <h1 className="text-xl font-semibold text-[#E9A5F1]">Orbit</h1>
        </Link>

        {/* RIGHT - BUTTONS */}
        <div className="flex items-center gap-4 ml-auto">
          <Link to={"/settings"} className="flex items-center gap-2 text-[#E9A5F1] hover:text-[#4C4A73] transition-colors">
            <Settings className="w-5 h-5" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link to={"/profile"} className="flex items-center gap-2 text-[#E9A5F1] hover:text-[#4C4A73] transition-colors">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button 
                className="flex items-center gap-2 text-[#E9A5F1] hover:text-[#4C4A73] transition-colors"
                onClick={logout}
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
