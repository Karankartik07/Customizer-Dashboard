"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FiBookmark, FiFilter, FiCalendar, FiDownload,
  FiMoreVertical, FiChevronLeft, FiChevronRight,
  FiEye, FiTrash2, FiStar
} from "react-icons/fi";

export default function ProductSavedPage() {
  const router = useRouter();
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    async function fetchSaved() {
      try {
        const res = await fetch("/api/product-saved");
        if (!res.ok) throw new Error("Failed to fetch saved products");
        const data = await res.json();
        setSavedItems(data.saved || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSaved();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="-mt-4 space-y-6 pb-12 px-2 sm:px-0 font-inter">

      {/* 1. HEADER & TOTAL STATS CARD */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-[30px] font-extrabold  text-[#4A000E] font-manrope">Saved Creations</h2>
          <p className="text-[16px] text-[#564242] mt-1 font-medium max-w-lg leading-relaxed">
            Manage and review the bespoke catalog of user-curated items.
          </p>
        </div>

        <div className="bg-[#6D0F1F] p-8 rounded-[15px] text-white flex items-center gap-6 min-w-[412px] h-[122px] relative overflow-hidden group">
          <div className="bg-white/10 p-4 rounded-[16px]">
            <FiBookmark size={28} className="text-white" />
          </div>
          <div className="relative z-10">
            <p className="text-[14px] font-regular opacity-60 tracking-[0.15em] font-inter uppercase mb-1">Total Saved Products</p>
            <div className="flex items-center gap-3">
              <h3 className="text-[36px] font-bold text-[#FFFFFF] font-manrope leading-none">1,284</h3>
              <span className="text-[12px] bg-white/20 font-inter text-[#FFE088] px-3 py-1 ml-25 rounded-full font-semibold">+12%</span>
            </div>
          </div>
          <FiBookmark className="absolute -right-4 -bottom-4 text-white opacity-5 w-32 h-32 rotate-12 group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* 2. TOOLBAR, FILTERS & SAVED ITEMS TABLE */}
      <div className="bg-[#FAF3ED] rounded-[32px] overflow-hidden">

        {/* TOOLBAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-8 pb-6">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2.5 px-6 py-3.5 bg-white rounded-[14px]  font-inter text-[12px] font-semibold text-[#4A000E] hover:bg-[#FDF8F4] transition-all shadow-sm">
              <FiFilter size={16} /> Filter By Type
            </button>
            <button className="flex items-center gap-2.5 px-6 py-3.5 bg-white rounded-[14px] font-inter text-[12px] font-semibold text-[#4A000E] hover:bg-[#FDF8F4] transition-all shadow-sm">
              <FiCalendar size={16} /> Date Range
            </button>
          </div>
          <button className="flex items-center gap-2.5 px-8 py-3.5 bg-[#FCD469] text-[#1E1B17] rounded-[14px] text-[13px] font-extrabold transition-all hover:bg-[#fbc531]">
            <FiDownload size={16} /> Export Archive
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto overflow-visible">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-extrabold text-[#A8A29E] uppercase tracking-[0.12em]">
                <th className="px-8 py-6">S.NO</th>
                <th className="px-4 py-6">ID</th>
                <th className="px-4 py-6 text-center">PRODUCT TYPE</th>
                <th className="px-4 py-6">STORE HASH</th>
                <th className="px-4 py-6">CREATED DATE</th>
                <th className="px-4 py-6">UPDATED DATE</th>
                <th className="px-4 py-6 text-center">STATUS</th>
                <th className="px-8 py-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-white border-t border-[#FDF8F4]">
              {loading ? (
                <tr><td colSpan="8" className="p-20 text-center text-[#4A000E] font-bold animate-pulse uppercase tracking-widest">Loading Vault...</td></tr>
              ) : savedItems.map((item, index) => (
                <tr key={item.id} className="border-b border-[#FDF8F4] hover:bg-[#FDF8F4]/40 transition-colors relative">
                  <td className="px-8 py-6 text-[15px] font-extrabold text-[#4A000E] font-manrope">
                    {(index + 1).toString().padStart(2, "0")}
                  </td>
                  <td className="px-4 py-6 text-[14px] font-medium text-[#564242]">
                    {item.id || "#BKA - 9021"}
                  </td>
                  <td className="px-4 py-6">
                    <div className="flex justify-center">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-[10px] w-fit justify-center
                        ${item.type?.includes("2D") ? "bg-[#FAF3ED]" : "bg-[#FDF3F3]"}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${item.type?.includes("2D") ? "bg-[#B38B5d]" : "bg-[#6D0F1F]"}`} />
                        <span className={`text-[10px] font-extrabold tracking-widest ${item.type?.includes("2D") ? "text-[#B38B5d]" : "text-[#6D0F1F]"}`}>
                          {item.type || "3D MODEL"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-6 text-[14px] font-medium text-[#564242]">
                    {item.hash || "sh_82v91...x2"}
                  </td>
                  <td className="px-4 py-6 text-[14px] font-medium text-[#564242]">
                    {item.date || "Oct 24, 2023"}
                  </td>
                  <td className="px-4 py-6 text-[14px] font-medium text-[#564242]">
                    {item.updatedDate || "Nov 02, 2023"}
                  </td>
                  <td className="px-4 py-6 text-center">
                    <span className="text-[10px] font-extrabold text-[#2e8b57] bg-[#e8f5e9] px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                      Active
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                      className="p-2 text-[#4A000E] transition-all hover:bg-[#FAF3ED] rounded-full"
                    >
                      <FiMoreVertical size={20} />
                    </button>

                    {activeMenu === item.id && (
                      <div ref={menuRef} className="absolute right-14 top-[50%] -translate-y-1/2 w-48 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-[16px] z-50 p-2 animate-in fade-in zoom-in duration-150">
                        <button
                          onClick={() => router.push(`/product-saved/${item.id}`)}
                          className="w-full text-left px-4 py-3 text-[13px] font-bold text-[#4A000E] hover:bg-[#FAF3ED] rounded-[10px] flex items-center gap-3 transition-colors"
                        >
                          <FiEye className="text-[#4A000E]" size={16} /> View Details
                        </button>
                        <button className="w-full text-left px-4 py-3 text-[13px] font-bold text-[#b33a3a] hover:bg-[#fdf3f3] rounded-[10px] flex items-center gap-3 transition-colors mt-1">
                          <FiTrash2 className="text-[#b33a3a]" size={16} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="bg-[#FAF3ED] px-8 py-6 flex justify-between items-center">
          <p className="text-[13px] font-medium text-[#A8A29E]">Showing 1 to 10 of 1,284 entries</p>
          <div className="flex items-center gap-1">
            <button className="p-2 text-[#A8A29E] hover:text-[#564242] transition-colors"><FiChevronLeft /></button>
            <button className="w-9 h-9 rounded-[10px] text-[13px] font-bold bg-[#4A000E] text-white shadow-sm">1</button>
            <button className="w-9 h-9 rounded-[10px] text-[13px] font-bold text-[#564242] hover:bg-white transition-colors">2</button>
            <button className="w-9 h-9 rounded-[10px] text-[13px] font-bold text-[#564242] hover:bg-white transition-colors">3</button>
            <span className="text-[#A8A29E] px-2 text-[13px]">...</span>
            <button className="w-9 h-9 rounded-[10px] text-[13px] font-bold text-[#564242] hover:bg-white transition-colors">128</button>
            <button className="p-2 text-[#564242] transition-colors"><FiChevronRight /></button>
          </div>
        </div>
      </div>

      {/* 4. FOOTER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-[#FDF8F4] p-10 rounded-[32px] border-l-[8px] border-[#A18A37] relative flex flex-col justify-center shadow-sm">
          <h4 className="text-[22px] font-extrabold text-[#4A000E] font-manrope mb-4">Curator's Note</h4>
          <p className="text-[16px] text-[#564242]  font-inter font-regular leading-loose max-w-2xl">
            "The saved products catalog reflects the current seasonal trends. We notice a 40% increase in 3D Model requests for the Bespoke Tuxedo series. Ensure high-definition assets are prioritized for these IDs."
          </p>
        </div>

        {/* AI Style Matching Card */}
        <div className="bg-[#4A000E] p-10 rounded-[32px] text-white flex flex-col justify-center group relative overflow-hidden h-[280px] shadow-lg">
          {/* Decorative Stars */}
          <div className="absolute top-8 right-8 w-[90px] h-[90px] opacity-40 mix-blend-screen overflow-hidden">
            <img
              src="https://res.cloudinary.com/daup99ghe/image/upload/q_auto/f_auto/v1775210733/Icon_6_i7a4kt.png"
              alt="Stars"
              className="w-full h-full object-contain filter"
            />
          </div>

          <div className="relative z-10 w-full">
            <div className="inline-block border-b border-white/20 pb-2 mb-4">
              <p className="text-[10px] font-extrabold opacity-60 tracking-[0.15em] uppercase">
                Upcoming Feature
              </p>
            </div>

            <h4 className="text-[26px] font-extrabold mb-3 tracking-tight font-manrope">
              AI Style Matching
            </h4>

            <p className="text-[14px] opacity-70 leading-relaxed font-medium max-w-[220px]">
              Auto-suggest accessories for saved product variants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}