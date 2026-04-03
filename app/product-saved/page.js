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
    <div className="space-y-8 pb-10 px-2 sm:px-0">
      
      {/* 1. HEADER & TOTAL STATS CARD */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-[#6d0f1f]">Saved Creations</h2>
          <p className="text-sm text-[#7a5a64] mt-1 font-medium">
            Manage and review the bespoke catalog of user-curated items.
          </p>
        </div>

        <div className="bg-[#6d0f1f] p-6 rounded-[24px] text-white flex items-center gap-6 shadow-xl shadow-red-900/20 min-w-[300px] relative overflow-hidden group">
          <div className="bg-white/10 p-4 rounded-2xl">
            <FiBookmark size={28} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] font-bold opacity-60 tracking-[0.2em] uppercase">Total Saved Products</p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-3xl font-bold">1,284</h3>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">+12%</span>
            </div>
          </div>
          <FiBookmark className="absolute -right-4 -bottom-4 text-white opacity-5 w-24 h-24 rotate-12 group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* 2. TOOLBAR & FILTERS */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-2">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2 bg-white border border-[#e9d8d8] rounded-xl text-[10px] font-bold text-[#7a5a64] uppercase tracking-wider hover:bg-[#fdf8f4] transition-all">
            <FiFilter /> Filter By Type
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-white border border-[#e9d8d8] rounded-xl text-[10px] font-bold text-[#7a5a64] uppercase tracking-wider hover:bg-[#fdf8f4] transition-all">
            <FiCalendar /> Date Range
          </button>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-[#fcd469] text-[#6d0f1f] rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-sm hover:bg-[#fbc531] transition-all">
          <FiDownload /> Export Archive
        </button>
      </div>

      {/* 3. SAVED ITEMS TABLE */}
      <div className="bg-white rounded-[32px] border border-[#f5ecec] overflow-hidden shadow-sm">
        <div className="overflow-x-auto overflow-visible">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-bold text-[#b5a2a8] uppercase tracking-[0.15em] border-b border-[#f5ecec]">
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
            <tbody className="divide-y divide-[#f5ecec]">
              {loading ? (
                <tr><td colSpan="8" className="p-20 text-center text-[#6d0f1f] font-bold animate-pulse uppercase tracking-[0.3em]">Loading Vault...</td></tr>
              ) : savedItems.map((item, index) => (
                <tr key={item.id} className="group hover:bg-[#fffcf9] transition-colors relative">
                  <td className="px-8 py-6 text-[13px] font-bold text-[#6d0f1f] opacity-20">
                    {(index + 1).toString().padStart(2, "0")}
                  </td>
                  <td className="px-4 py-6 text-[11px] font-bold text-[#7a5a64] tracking-tight leading-relaxed">
                    {item.id || "#BKA - 9831"}
                  </td>
                  <td className="px-4 py-6">
                    <div className="flex justify-center">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border shadow-sm w-[95px] justify-center
                        ${item.type?.includes("2D") ? "bg-[#f9f3eb] border-[#e9d8d8]" : "bg-[#fdf3f3] border-[#f1d6d6]"}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${item.type?.includes("2D") ? "bg-[#b38b5d]" : "bg-[#6d0f1f] shadow-[0_0_8px_#6d0f1f]"}`} />
                        <span className={`text-[8px] font-black tracking-tighter ${item.type?.includes("2D") ? "text-[#b38b5d]" : "text-[#6d0f1f]"}`}>
                          {item.type || "3D MODEL"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-6 text-[10px] font-medium text-[#7a5a64] opacity-70">
                    {item.hash || "sh_82v91...x2"}
                  </td>
                  <td className="px-4 py-6 text-[10px] font-bold text-[#7a5a64]">
                    {item.date || "Oct 24, 2023"}
                  </td>
                  <td className="px-4 py-6 text-[10px] font-bold text-[#7a5a64]">
                    {item.updatedDate || "Nov 02, 2023"}
                  </td>
                  <td className="px-4 py-6 text-center">
                    <span className="text-[8px] font-black text-[#2e8b57] bg-[#e8f5e9] px-3 py-1 rounded-full uppercase tracking-widest">
                      Active
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right relative">
                    <button 
                      onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                      className="p-2 text-[#7a5a64] hover:text-[#6d0f1f] transition-all"
                    >
                      <FiMoreVertical size={18} />
                    </button>

                    {activeMenu === item.id && (
                      <div ref={menuRef} className="absolute right-14 top-4 w-44 bg-white border border-[#f1d6d6] rounded-2xl shadow-2xl z-50 py-3 animate-in fade-in zoom-in duration-150">
                        <button 
                          onClick={() => router.push(`/product-saved/${item.id}`)}
                          className="w-full text-left px-5 py-2 text-[10px] font-bold text-[#6d0f1f] hover:bg-[#fdf8f4] flex items-center gap-3 uppercase tracking-tighter"
                        >
                          <FiEye className="text-[#6d0f1f]" /> View Details
                        </button>
                        <button className="w-full text-left px-5 py-2 text-[10px] font-bold text-[#b33a3a] hover:bg-[#fff5f5] flex items-center gap-3 uppercase tracking-tighter">
                          <FiTrash2 className="text-[#b33a3a]" /> Delete
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
        <div className="p-8 border-t border-[#f5ecec] flex justify-between items-center bg-[#fffcf9]/30">
          <p className="text-[10px] font-bold text-[#7a5a64] uppercase tracking-widest opacity-40">Showing 1 to 10 of 1,284 entries</p>
          <div className="flex items-center gap-1">
            <button className="p-2 text-[#7a5a64]"><FiChevronLeft /></button>
            <button className="w-8 h-8 rounded-full text-[10px] font-bold bg-[#6d0f1f] text-white shadow-lg">1</button>
            <button className="w-8 h-8 rounded-full text-[10px] font-bold text-[#7a5a64] hover:bg-[#fdf8f4]">2</button>
            <button className="w-8 h-8 rounded-full text-[10px] font-bold text-[#7a5a64] hover:bg-[#fdf8f4]">3</button>
            <span className="text-[#7a5a64] px-2 text-xs opacity-30">...</span>
            <button className="w-8 h-8 rounded-full text-[10px] font-bold text-[#7a5a64] hover:bg-[#fdf8f4]">128</button>
            <button className="p-2 text-[#7a5a64]"><FiChevronRight /></button>
          </div>
        </div>
      </div>

      {/* 4. FOOTER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#fdf8f4] p-8 rounded-[32px] border border-[#f1d6d6] relative overflow-hidden flex flex-col justify-center">
          <h4 className="text-xl font-bold text-[#6d0f1f] mb-4">Curator's Note</h4>
          <p className="text-sm text-[#7a5a64] font-medium  leading-relaxed max-w-2xl">
            "The saved products catalog reflects the current seasonal trends. We notice a 40% increase in 3D Model requests for the Bespoke Tuxedo series. Ensure high-definition assets are prioritized for these IDs."
          </p>
        </div>

        {/* AI Style Matching Card */}
        <div className="bg-[#6d0f1f] p-8 rounded-[32px] text-white flex flex-col justify-between group relative overflow-hidden h-[260px]">
          {/* Decorative Stars */}
          <div className="absolute top-4 right-4 w-[87px] h-[87px] opacity-20 group-hover:opacity-40 transition-opacity">
            <img 
              src="https://res.cloudinary.com/daup99ghe/image/upload/q_auto/f_auto/v1775210733/Icon_6_i7a4kt.png" 
              alt="Stars" 
              className="w-full h-full object-contain"
            />
          </div>

          <div className="relative mt-8 z-10">
            <div className="inline-block border-b border-white/30 pb-1 mb-4">
              <p className="text-[10px] font-bold opacity-60 tracking-[0.2em] uppercase">
                Upcoming Feature
              </p>
            </div>
            
            <h4 className="text-2xl font-bold mb-3 tracking-tight">
              AI Style Matching
            </h4>
            
            <p className="text-xs opacity-70 leading-relaxed font-medium max-w-[200px]">
              Auto-suggest accessories for saved product variants.
            </p>
          </div>

          {/* Progress Bar Indicator */}
          <div className="mt-auto relative z-10">
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#fcd469] rounded-full transition-all duration-1000" 
                style={{ width: '65%' }} 
              />
            </div>
          </div>

          {/* Background Glow */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-500" />
        </div>
      </div>
    </div>
  );
}