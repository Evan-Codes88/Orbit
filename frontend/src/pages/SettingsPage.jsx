import { useState, useEffect } from "react";

const SettingsPage = () => {
  const [fontSize, setFontSize] = useState(localStorage.getItem("fontSize") || "medium");

  // Apply font size to the body when it's changed
  useEffect(() => {
    document.body.style.fontSize = fontSize;
    localStorage.setItem("fontSize", fontSize); // Save the font size preference
  }, [fontSize]);

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  return (
    <div className="settings-page flex justify-center items-center h-screen bg-[#1E1D2D]">
      <div className="p-6 bg-[#2A293A] shadow-lg rounded-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center">Settings</h1>

        <div className="mt-4">
          <h2 className="text-lg">Font Size</h2>
          <select
            value={fontSize}
            onChange={handleFontSizeChange}
            className="p-2 border rounded w-full"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div className="mt-4">
          <p className="text-sm text-zinc-400 text-center">
            Your selected font size will be applied to the page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
