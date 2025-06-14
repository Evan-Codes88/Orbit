import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-2 sm:p-4 w-full bg-[#1E1D2D] border-t border-[#2A293A]">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-[#8A86C1]"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#2A293A] text-[#E0E0E0] hover:text-[#F5F5F5] transition-colors flex items-center justify-center"
              type="button"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2 sm:gap-3">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full bg-[#2A293A] text-[#E0E0E0] border border-[#8A86C1] rounded-lg px-2 sm:px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#8A86C1]"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Image file input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
            aria-label="Upload image"
          />

          {/* Image button */}
          <button
            type="button"
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#2A293A] text-[#8A86C1] hover:bg-[#3B3A4E] hover:text-[#F5F5F5] transition-colors"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Add image"
          >
            <Image size={20} className="sm:size-6" />
          </button>
        </div>

        {/* Send message button */}
        <button
          type="submit"
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#8A86C1] text-[#1E1D2D] hover:bg-[#A29FD6] transition-colors disabled:opacity-50"
          disabled={!text.trim() && !imagePreview}
          aria-label="Send message"
        >
          <Send size={20} className="sm:size-6" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
