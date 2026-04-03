"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  FiMoreHorizontal, FiDownload, FiFilter, 
  FiChevronLeft, FiChevronRight, FiX, 
  FiSettings, FiDatabase, FiImage, FiMaximize, FiCheckCircle 
} from "react-icons/fi";

export default function ProductsPage() {
  // --- STATES ---
  const [activeMenu, setActiveMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productType, setProductType] = useState("2D");
  
  // State for the modal sliders
  const [modalSettings, setModalSettings] = useState({
    aiEditor: true,
    imageEdit: true,
    textEdit: true,
    colors: false,
    clipart: false
  });

  const menuRef = useRef(null);

  // --- HANDLERS ---
  const toggleModalOption = (key) => {
    setModalSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const productImages = {
    blazer: "https://res.cloudinary.com/daup99ghe/image/upload/q_auto/f_auto/v1775201379/Background_kvxeey.png",
    trousers: "https://res.cloudinary.com/daup99ghe/image/upload/q_auto/f_auto/v1775201379/Background_kvxeey.png",
    brogues: "https://res.cloudinary.com/daup99ghe/image/upload/q_auto/f_auto/v1775201379/Background_kvxeey.png",
    pocketSquare: "https://res.cloudinary.com/daup99ghe/image/upload/q_auto/f_auto/v1775201379/Background_kvxeey.png",
  };

  const products = [
    { id: "01", name: "Midnight Velvet Blazer", sub: "BESPOKE COLLECTION", sku: "AT-MVB-2024-X", status: true, img: productImages.blazer },
    { id: "02", name: "Oxford Wool Trousers", sub: "DAILY LUXURY", sku: "AT-OWT-1888-M", status: true, img: productImages.trousers },
    { id: "03", name: "Hand-Stitched Brogues", sub: "FOOTWEAR ARTISAN", sku: "AT-HSB-4451-L", status: false, img: productImages.brogues },
    { id: "04", name: "Silk Paisley Pocket Square", sub: "ACCESSORIES", sku: "AT-PPS-0092-U", status: true, img: productImages.pocketSquare },
  ];

  return (
    <div className="space-y-6 relative min-h-screen">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#6d0f1f]">Products List</h2>
          <p className="text-sm text-[#7a5a64] mt-1 font-medium opacity-80">
            Manage and create your bespoke inventory collections.
          </p>
        </div>
        <div className="flex bg-[#fdf8f4] p-1.5 rounded-full border border-[#f1d6d6]">
          <button className="px-5 py-1.5 text-[10px] font-bold text-[#7a5a64] uppercase tracking-wider rounded-full">2D MODEL</button>
          <button className="px-5 py-1.5 text-[10px] font-bold bg-white text-[#6d0f1f] rounded-full shadow-sm border border-[#f1d6d6] uppercase tracking-wider">3D MODELS</button>
        </div>
      </div>

      {/* 2. TABLE SECTION */}
      <div className="bg-white rounded-[32px] border border-[#fdf3f3] overflow-visible shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-bold text-[#7a5a64] uppercase tracking-[0.15em] opacity-40">
                <th className="px-8 py-6">S.NO</th>
                <th className="px-4 py-6">IMAGE</th>
                <th className="px-4 py-6">PRODUCT NAME</th>
                <th className="px-4 py-6">SKU</th>
                <th className="px-4 py-6 text-center">STATUS</th>
                <th className="px-8 py-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#fdf3f3]">
              {products.map((item) => (
                <tr key={item.id} className="group hover:bg-[#fdf8f4]/30 transition-colors relative">
                  <td className="px-8 py-5 text-sm font-medium text-[#7a5a64] opacity-30">{item.id}</td>
                  <td className="px-4 py-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#f4ebe8] overflow-hidden border border-[#f1d6d6]">
                      <img src={item.img} alt="" className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-[14px] font-bold text-[#6d0f1f] leading-none">{item.name}</p>
                    <p className="text-[10px] font-bold text-[#7a5a64] mt-2 uppercase tracking-wider opacity-50">{item.sub}</p>
                  </td>
                  <td className="px-4 py-5">
                    <span className="bg-[#fdf8f4] px-2 py-1 rounded-md text-[10px] font-bold text-[#7a5a64] border border-[#f1d6d6]">
                      {item.sku}
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center justify-center gap-3">
                      <div className={`w-10 h-5 rounded-full relative transition-all duration-300 ${item.status ? 'bg-[#6d0f1f]' : 'bg-[#e5e7eb]'}`}>
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all duration-300 ${item.status ? 'right-1' : 'left-1'}`} />
                      </div>
                      <span className="text-[10px] font-bold text-[#7a5a64] uppercase tracking-widest w-12 text-left">
                        {item.status ? "Unhide" : "Hide"}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right relative">
                    <button 
                      onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                      className="p-2 text-[#7a5a64] hover:text-[#6d0f1f] transition-all"
                    >
                      <FiMoreHorizontal size={22} />
                    </button>

                    {activeMenu === item.id && (
                      <div ref={menuRef} className="absolute right-14 top-4 w-48 bg-white border border-[#f1d6d6] rounded-2xl shadow-xl z-50 py-2">
                        <button 
                          onClick={() => { setIsModalOpen(true); setActiveMenu(null); }} 
                          className="w-full text-left px-4 py-2.5 text-[11px] font-bold text-[#6d0f1f] hover:bg-[#fdf8f4] flex items-center gap-3"
                        >
                          <FiSettings /> Edit Tab Settings
                        </button>
                        <button className="w-full text-left px-4 py-2.5 text-[11px] font-bold text-[#6d0f1f] hover:bg-[#fdf8f4] flex items-center gap-3">
                          <FiDatabase /> Customize Data
                        </button>
                        <button className="w-full text-left px-4 py-2.5 text-[11px] font-bold text-[#6d0f1f] hover:bg-[#fdf8f4] flex items-center gap-3">
                          <FiImage /> Customize Image
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- 3. EDIT PRODUCT SETTINGS MODAL (FIGMA EXACT MATCH) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#5c1728]/10 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-[576px] rounded-[32px] shadow-2xl border border-[#f1d6d6] overflow-hidden p-10 relative">
            
            {/* Close Button */}
            <button onClick={() => setIsModalOpen(false)} className="absolute right-10 top-10 text-[#7a5a64] hover:text-[#6d0f1f] transition-all">
              <FiX size={24} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2.5 bg-[#fdf3f3] rounded-xl text-[#6d0f1f]">
                <FiSettings size={22} />
              </div>
              <h3 className="text-xl font-bold text-[#6d0f1f]">Edit Product Settings</h3>
            </div>

            {/* Product Type Toggle */}
            <div className="flex items-center justify-between mb-10">
              <span className="text-[10px] font-bold text-[#7a5a64] uppercase tracking-[0.2em] opacity-60">Product Type</span>
              <div className="flex bg-[#f4ebe8]/50 p-1.5 rounded-2xl border border-[#f1d6d6]/50">
                <button 
                  onClick={() => setProductType("2D")}
                  className={`px-8 py-2 text-[11px] font-extrabold rounded-xl transition-all ${productType === "2D" ? "bg-[#6d0f1f] text-white shadow-md" : "text-[#7a5a64]"}`}
                >
                  2D
                </button>
                <button 
                  onClick={() => setProductType("3D")}
                  className={`px-8 py-2 text-[11px] font-extrabold rounded-xl transition-all ${productType === "3D" ? "bg-[#6d0f1f] text-white shadow-md" : "text-[#7a5a64]"}`}
                >
                  3D
                </button>
              </div>
            </div>

            {/* Sliders List (All functional) */}
            <div className="space-y-4 mb-10">
              {[
                { label: "AI Editor", key: "aiEditor" },
                { label: "Image Edit", key: "imageEdit" },
                { label: "Text Edit", key: "textEdit" },
                { label: "Colors", key: "colors" },
                { label: "Clipart", key: "clipart" },
              ].map((opt) => (
                <div 
                  key={opt.key} 
                  onClick={() => toggleModalOption(opt.key)}
                  className="flex items-center justify-between bg-[#fdf8f4]/60 p-5 rounded-[20px] border border-[#f1d6d6]/30 cursor-pointer hover:bg-[#fdf8f4] transition-all"
                >
                  <span className={`text-xs font-extrabold tracking-wide ${modalSettings[opt.key] ? 'text-[#6d0f1f]' : 'text-[#7a5a64] opacity-50'}`}>
                    {opt.label}
                  </span>
                  {/* Modal Slider (Working) */}
                  <div className={`w-10 h-5 rounded-full relative transition-all duration-300 ${modalSettings[opt.key] ? 'bg-[#6d0f1f]' : 'bg-[#e5e7eb]'}`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${modalSettings[opt.key] ? 'right-1' : 'left-1'}`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Update Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-[#6d0f1f] text-white py-4.5 rounded-2xl font-bold text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-3 hover:bg-[#4d0a15] transition-all shadow-xl shadow-red-900/20 active:scale-[0.98]"
            >
              <FiCheckCircle size={18} /> Update Product Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}