import { useState, useEffect } from "react";

const SettingsPage = () => {
  const [fontSize, setFontSize] = useState(localStorage.getItem("fontSize") || "medium");
  const [fontFamily, setFontFamily] = useState(localStorage.getItem("fontFamily") || "sans-serif");

  // Apply font size and font family to the body when either is changed
  useEffect(() => {
    try {
      if (fontSize && fontFamily) {
        document.body.style.fontSize = fontSize;
        document.body.style.fontFamily = fontFamily;
        localStorage.setItem("fontSize", fontSize);
        localStorage.setItem("fontFamily", fontFamily);
      }
    } catch (error) {
      console.error("Error applying settings:", error);
    }
  }, [fontSize, fontFamily]);

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleFontFamilyChange = (e) => {
    setFontFamily(e.target.value);
  };

  return (
    <main className="settings-page flex justify-center items-center h-screen bg-[#1E1D2D]">
      <section className="p-6 bg-[#2A293A] shadow-lg rounded-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center" aria-level="1">
          Settings
        </h1>

        {/* Font Size Selection */}
        <section className="mt-4">
          <h2 className="text-lg pb-2">Font Size</h2>
          <select
            value={fontSize}
            onChange={handleFontSizeChange}
            className="p-2 border rounded w-full"
            aria-label="Select font size"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </section>

        {/* Font Family Selection */}
        <section className="mt-4">
          <h2 className="text-lg pb-2">Font Family</h2>
          <select
            value={fontFamily}
            onChange={handleFontFamilyChange}
            className="p-2 border rounded w-full"
            aria-label="Select font family"
          >
            <option value="sans-serif">Sans-serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="Courier New">Courier New</option>
            <option value="Fira Code">Fira Code</option>
          </select>
        </section>

        <section className="mt-4">
          <p className="text-sm text-zinc-400 text-center">
            Your selected font size and font family will be applied to the page.
          </p>
        </section>
      </section>
    </main>
  );
};

export default SettingsPage;
