import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const themes = [
  {
    id: 1,
    theme: "Yellow Themed 📄",
    color: "yellow",
    description: "Download as :",
    formats: "PDF, EXCEL & CSV",
    link: "/form",
    imageUrl: "/InvoiceThemes/Yellow.png",
    caption: "Yellow is the color of sunshine, hope, and creativity. Perfect for your bright ideas!",
    profileImage: "https://png.pngtree.com/png-clipart/20230914/original/pngtree-water-balloon-clipart-yellow-oil-drop-character-cartoon-vector-png-image_12151436.png",
    username: "@yellow_themed",
  },
  {
    id: 2,
    theme: "Red Themed 📄",
    color: "red",
    description: "Download as :",
    formats: "PDF, EXCEL & CSV",
    link: "/form",
    imageUrl: "/InvoiceThemes/Red.png",
    caption: "Red is bold and passionate, making a powerful statement wherever it's used.",
    profileImage: "https://thumbs.dreamstime.com/b/vector-illustration-smiling-blood-drop-cartoon-flat-minimalist-style-vector-illustration-smiling-blood-drop-326097634.jpg",
    username: "@red_themed",
  },
  {
    id: 3,
    theme: "Blue Themed 📄",
    color: "blue",
    description: "Download as :",
    formats: "PDF, EXCEL & CSV",
    link: "/form",
    imageUrl: "/InvoiceThemes/Blue.png",
    caption: "Blue represents calm and trust, ideal for professional and peaceful settings.",
    profileImage: "https://img.freepik.com/premium-vector/happy-blue-water-drop-cartoon-character-waving-greeting_20412-4078.jpg",
    username: "@blue_themed",
  },
  {
    id: 4,
    theme: "Green Themed 📄",
    color: "green",
    description: "Download as :",
    formats: "PDF, EXCEL & CSV",
    link: "/form",
    imageUrl: "/InvoiceThemes/Green.png",
    caption: "Green symbolizes growth, harmony, and nature. Bring freshness to your content.",
    profileImage: "https://img.lovepik.com/png/20231115/green-color-clipart-cartoon-green-water-drop-doodle-character-aps_597121_wh860.png",
    username: "@green_themed",
  },
  {
    id: 5,
    theme: "Purple Themed 📄",
    color: "purple",
    description: "Download as :",
    formats: "PDF, EXCEL & CSV",
    link: "/form",
    imageUrl: "/InvoiceThemes/Purple.png",
    caption: "Purple exudes luxury, creativity, and sophistication.",
    profileImage: "https://png.pngtree.com/png-vector/20230728/ourmid/pngtree-yahoo-clipart-cute-purple-colored-water-drop-character-cartoon-vector-png-image_6827278.png",
    username: "@purple_theme",
  },
  {
    id: 6,
    theme: "Pink Themed 📄",
    color: "pink",
    description: "Download as :",
    formats: "PDF, EXCEL & CSV",
    link: "/form",
    imageUrl: "/InvoiceThemes/Pink.png",
    caption: "Pink is fun, playful, and warm, perfect for inviting environments.",
    profileImage: "https://png.pngtree.com/png-clipart/20230913/original/pngtree-pink-cloud-clipart-vector-png-image_11083104.png",
    username: "@pink_themed",
  },
  {
    id: 7,
    theme: "Orange Themed 📄",
    color: "orange",
    description: "Download as :",
    formats: "PDF, EXCEL & CSV",
    link: "/form",
    imageUrl: "/InvoiceThemes/Orange.png",
    caption: "Orange blends energy, excitement, and warmth, creating a vibrant feel.",
    profileImage: "https://png.pngtree.com/png-clipart/20230913/original/pngtree-sweating-clipart-small-orange-drop-cartoon-vector-png-image_11069339.png",
    username: "@orange_themed",
  },
];

export default function ThemesElement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(null);
  const navigate = useNavigate();

  const openModal = (theme) => {
    setSelectedTheme(theme);
    setSelectedImage(theme.imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
    setSelectedTheme(null);
  };

  const handleGetStarted = (theme) => {
    navigate("/form", { state: { color: theme.color } });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {themes.map((theme) => (
        <div
          key={theme.id}
          className={`flex flex-col bg-${theme.color}-500 rounded-3xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl`}
        >
          <div className="px-4 py-6 sm:px-6 sm:py-8 md:p-10 text-left">
            <h2 className="font-semibold tracking-tighter text-white text-5xl lg:text-4xl opacity-90 transition duration-300">
              {theme.theme}
            </h2>
            <p className="mt-4 sm:mt-8 text-sm text-gray-100 opacity-80 transition duration-300">
              {theme.description}
            </p>
            <p className="mt-2">
              <span className="text-2xl sm:text-3xl font-light tracking-tight text-white">
                {theme.formats}
              </span>
            </p>
          </div>
          <div className="flex flex-col px-4 sm:px-6 pb-6 sm:pb-8 space-y-4">
            <button
              aria-describedby="tier-starter"
              className="w-full px-4 py-2 text-center text-black bg-white border-2 border-white rounded-full inline-flex justify-center items-center duration-200 hover:bg-transparent hover:text-white focus:outline-none focus-visible:ring-white text-sm transition-transform transform hover:scale-105"
              onClick={() => handleGetStarted(theme)}
            >
              Get Started
            </button>
            <button
              className="w-full px-4 py-2 text-center text-black bg-white border-2 border-white rounded-full inline-flex justify-center items-center duration-200 hover:bg-transparent hover:text-white focus:outline-none focus-visible:ring-white text-sm transition-transform transform hover:scale-105"
              onClick={() => openModal(theme)}
            >
              Preview
            </button>
          </div>
        </div>
      ))}

      {/* Minimalistic Modal */}
      {isModalOpen && selectedTheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ease-in-out">
          <div className="relative w-full max-w-3xl flex bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Left Side - Image Preview */}
            <div className="w-1/2">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Side - Information */}
            <div className="w-1/2 p-6 flex flex-col justify-start">
  {/* User Info */}
  <div className="flex items-center space-x-4 mb-4">
    <img
      src={selectedTheme.profileImage}
      alt="User"
      className="w-10 h-10 rounded-full object-cover"
    />
    <span className="font-semibold text-lg">{selectedTheme.username}</span>
  </div>

  {/* Post Caption */}
  <div className="flex flex-col space-y-2 mb-4">
    <p className="text-sm text-gray-800">{selectedTheme.caption}</p>
  </div>

  {/* Action Button */}
  <div className="mt-4">
    <button
      className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition-colors duration-300"
      onClick={closeModal}
    >
      Close Preview
    </button>
  </div>
</div>
          </div>
        </div>
      )}
    </div>
  );
}
