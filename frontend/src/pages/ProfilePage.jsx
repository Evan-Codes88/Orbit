import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
  
    reader.readAsDataURL(file);
  
    reader.onload = async () => {
      try {
        const base64Image = reader.result;
        setSelectedImg(base64Image);
        await updateProfile({ profilePic: base64Image });
      } catch {
        setUploadError("Failed to upload image. Please try again.");
      }
    };
  
    reader.onerror = () => {
      setUploadError("Failed to upload image. Please try again.");
    };
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1E1D2D] p-4">
      <section className="w-full max-w-2xl bg-[#2A293A] rounded-xl p-6 space-y-6">
        <header className="text-center">
          <h1 className="text-2xl font-semibold text-[#BB86FC]">Profile</h1>
          <p className="mt-2 text-[#BB86FC]">Your profile information</p>
        </header>

        {/* Avatar Upload Section */}
        <section className="flex flex-col items-center gap-4">
          <figure className="relative">
            <img
              src={selectedImg || authUser.profilePic || "public/avatar.png"}
              alt="Profile"
              className="size-32 rounded-full object-cover border-4 border-[#3E3C4B]"
            />
            <label
              htmlFor="avatar-upload"
              className={`
                absolute bottom-0 right-0 
                bg-[#3E3C4B] hover:scale-105
                p-2 rounded-full cursor-pointer 
                transition-all duration-200
                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
              `}
              aria-label="Upload profile picture"
            >
              <Camera className="w-5 h-5 text-[#BB86FC]" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
                aria-label="Select image to upload"
              />
            </label>
          </figure>
          <p className="text-sm text-zinc-400">
            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
          </p>
          {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
        </section>

        {/* User Info Section */}
        <section className="space-y-6">
          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <User className="w-4 h-4 text-[#BB86FC]" />
              Full Name
            </div>
            <p className="px-4 py-2.5 bg-[#2A293A] rounded-lg border-[#3E3C4B] text-[#BB86FC]">
              {authUser?.fullName || "N/A"}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#BB86FC]" />
              Email Address
            </div>
            <p className="px-4 py-2.5 bg-[#2A293A] rounded-lg border-[#3E3C4B] text-[#BB86FC]">
              {authUser?.email || "N/A"}
            </p>
          </div>
        </section>

        {/* Account Information Section */}
        <section className="bg-[#2A293A] rounded-xl p-6">
          <h2 className="text-lg font-medium text-[#BB86FC] mb-4">Account Information</h2>
          <div className="space-y-3 text-sm text-[#BB86FC]">
            <div className="flex items-center justify-between py-2 border-b border-[#3E3C4B]">
              <span>Member Since</span>
              <span>{authUser.createdAt ? authUser.createdAt.split("T")[0] : "N/A"}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default ProfilePage;
