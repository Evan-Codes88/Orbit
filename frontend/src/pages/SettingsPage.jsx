import { useState, useEffect } from "react";

const SettingsPage = () => {
  const [fontSize, setFontSize] = useState(localStorage.getItem("fontSize") || "medium");
  const [fontFamily, setFontFamily] = useState(localStorage.getItem("fontFamily") || "sans-serif");

  // Apply font size and font family to the body when either is changed
  useEffect(() => {
    document.body.style.fontSize = fontSize;
    document.body.style.fontFamily = fontFamily;
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("fontFamily", fontFamily);
  }, [fontSize, fontFamily]);

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleFontFamilyChange = (e) => {
    setFontFamily(e.target.value);
  };

  return (
    <div className="settings-page flex justify-center items-center h-screen bg-[#1E1D2D]">
      <div className="p-6 bg-[#2A293A] shadow-lg rounded-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center">Settings</h1>

        {/* Font Size Selection */}
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

        {/* Font Family Selection */}
        <div className="mt-4">
          <h2 className="text-lg">Font Family</h2>
          <select
            value={fontFamily}
            onChange={handleFontFamilyChange}
            className="p-2 border rounded w-full"
          >
            <option value="sans-serif">Sans-serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="Courier New">Courier New</option>
            <option value="Fira Code">Fira Code</option>
          </select>
        </div>

        <div className="mt-4">
          <p className="text-sm text-zinc-400 text-center">
            Your selected font size and font family will be applied to the page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
