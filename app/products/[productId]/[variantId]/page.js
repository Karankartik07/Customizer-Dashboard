"use client";
import React, { useState } from "react";
import { 
  MdOutlineEdit, 
  MdOutlineDeleteOutline, 
  MdOutlineLayers, 
  MdAdd, 
  MdFileUpload,
  MdClose,
  MdSettings
} from "react-icons/md";

export default function SubVariantPage({ params }) {
  const brandMaroon = "#4A1D1D";
  const brandCream = "#FFF8F1";

  // 1. Add state for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data matching your Figma screenshot
  const subVariants = Array(6).fill({
    title: "1 Flower",
    image: "https://via.placeholder.com/50", 
    name: "Crimson Satin Twist",
    detail: "Double-brushed satin...",
    price: "$420.00",
    wholesale: "WHOLESALE: $210",
    preview: "https://via.placeholder.com/40", 
  });

  // Mock data for the categories inside the modal
  const modalCategories = [
    { name: "Merino Wool Blend", category: "Tailored Suiting", status: true },
    { name: "Mulberry Silk", category: "Fine Silks", status: true },
    { name: "Veau Graine Leather", category: "Leather Goods", status: false },
  ];

  return (
    <div className="min-h-screen p-10 relative" style={{ backgroundColor: brandCream }}>
      {/* 1. Top Header Section */}
      <header className="mb-8">
        <nav className="text-[10px] font-bold tracking-[0.2em] text-gray-400 mb-3 uppercase">
          PRODUCTS  &gt;  SUB-VARIANTS
        </nav>
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold" style={{ color: brandMaroon }}>
            Customize Data for: Blue Pattern Ceramic Pot
          </h1>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all">
              <MdFileUpload size={18} /> Export CSV
            </button>
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-all"
              style={{ backgroundColor: brandMaroon }}
            >
              <MdAdd size={20} /> New Sub-Variant
            </button>
          </div>
        </div>
      </header>

      {/* 2. Table Container */}
      <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="p-6 text-[10px] font-black tracking-widest text-gray-400 uppercase">Title</th>
              <th className="p-6 text-[10px] font-black tracking-widest text-gray-400 uppercase">Image</th>
              <th className="p-6 text-[10px] font-black tracking-widest text-gray-400 uppercase">Variant Detail</th>
              <th className="p-6 text-[10px] font-black tracking-widest text-gray-400 uppercase">Price</th>
              <th className="p-6 text-[10px] font-black tracking-widest text-gray-400 uppercase text-center">Preview Image</th>
              <th className="p-6 text-[10px] font-black tracking-widest text-gray-400 uppercase text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {subVariants.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-6 text-xs text-gray-400 font-medium">{item.title}</td>
                <td className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
                    <img src={item.image} alt="variant" className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="p-6">
                  <p className="text-sm font-bold text-gray-900 mb-0.5">{item.name}</p>
                  <p className="text-[10px] text-gray-400">{item.detail}</p>
                </td>
                <td className="p-6">
                  <p className="text-sm font-black text-gray-900 mb-0.5">{item.price}</p>
                  <p className="text-[9px] font-bold text-gray-300 tracking-tighter uppercase">{item.wholesale}</p>
                </td>
                <td className="p-6">
                  <div className="flex justify-center">
                    <img src={item.preview} alt="preview" className="w-10 h-10 rounded-full border border-gray-100" />
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex justify-center items-center gap-4">
                    <MdOutlineEdit className="text-gray-400 hover:text-gray-800 cursor-pointer" size={18} />
                    
                    {/* Middle Icon Click - Opens Modal */}
                    <MdOutlineLayers 
                      className="text-gray-400 hover:text-gray-800 cursor-pointer" 
                      size={18} 
                      onClick={() => setIsModalOpen(true)}
                    />
                    
                    <MdOutlineDeleteOutline className="text-red-300 hover:text-red-500 cursor-pointer" size={20} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 3. Pagination Footer */}
        <div className="p-6 flex justify-between items-center bg-white border-t border-gray-50">
          <p className="text-[10px] font-bold text-gray-400">
            Showing <span className="text-gray-900">1-10</span> of 48 variants
          </p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 text-xs">{"<"}</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#4A1D1D] text-white text-xs font-bold shadow-md">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 text-xs">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 text-xs">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 text-xs">{">"}</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex text-left items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 sm:p-6">
          <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl p-6 md:p-10 relative animate-in fade-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-6 right-6 md:top-8 md:right-8 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <MdClose size={24} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-[#FAF3ED] text-[#4A1D1D]">
                <MdSettings size={22} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold" style={{ color: brandMaroon }}>
                Manage Subvariants
              </h2>
            </div>

            {/* Input Section */}
            <div className="mb-10">
              <p className="text-sm font-bold mb-2 uppercase tracking-widest text-[#4A1D1D]">
                Add New Subcategory
              </p>
              <p className="text-xs text-gray-500 mb-5">
                Expand your inventory architecture with precision.
              </p>
              
              <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
                <div className="w-full md:flex-1">
                  <label className="block text-[10px] font-black text-gray-500 tracking-widest uppercase mb-2">
                    Category *
                  </label>
                  <input 
                    type="text" 
                    placeholder="Category name" 
                    className="w-full p-3.5 bg-[#FAF3ED]/40 border border-[#F1D6D6]/50 rounded-xl text-sm outline-none focus:border-[#4A1D1D]/50 transition-colors placeholder:text-gray-400" 
                  />
                </div>
                <div className="w-full md:flex-1">
                  <label className="block text-[10px] font-black text-gray-500 tracking-widest uppercase mb-2">
                    Name *
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Italian Wool" 
                    className="w-full p-3.5 bg-[#FAF3ED]/40 border border-[#F1D6D6]/50 rounded-xl text-sm outline-none focus:border-[#4A1D1D]/50 transition-colors placeholder:text-gray-400" 
                  />
                </div>
                <button className="w-full md:w-auto bg-[#24B5B5] text-white font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[#1E9B9B] transition-all whitespace-nowrap shadow-sm">
                  <MdAdd size={20} /> Add Subcategory
                </button>
              </div>
            </div>

            {/* Subcategories List */}
            <div>
              <p className="text-sm font-bold mb-5 uppercase tracking-widest text-[#4A1D1D]">
                Subcategories (3)
              </p>

              {/* Desktop View */}
              <div className="hidden md:block">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 bg-[#FAF3ED]/70 p-4 rounded-2xl mb-2 items-center">
                  <div className="text-[11px] font-bold text-[#4A1D1D]/70 tracking-widest uppercase pl-4">Name</div>
                  <div className="text-[11px] font-bold text-[#4A1D1D]/70 tracking-widest uppercase text-center">Category</div>
                  <div className="text-[11px] font-bold text-[#4A1D1D]/70 tracking-widest uppercase text-center">Status</div>
                  <div className="text-[11px] font-bold text-[#4A1D1D]/70 tracking-widest uppercase text-center">Actions</div>
                </div>

                <div className="space-y-1">
                  {modalCategories.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center p-4 hover:bg-gray-50/50 rounded-2xl transition-colors border border-transparent hover:border-gray-100">
                      <span className="text-sm font-bold text-gray-800 pl-4">{item.name}</span>
                      <div className="flex justify-center">
                        <span className="text-[11px] font-bold text-gray-600 bg-[#FAF3ED] px-4 py-1.5 rounded-full tracking-wide">
                          {item.category}
                        </span>
                      </div>
                      <div className="flex justify-center">
                        <div className={`w-10 h-5 rounded-full relative ${item.status ? 'bg-[#D4A017]' : 'bg-gray-200'} cursor-pointer hover:opacity-90 transition-opacity`}>
                          <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${item.status ? 'right-0.5' : 'left-0.5'}`} />
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-4">
                        <MdOutlineEdit className="text-[#4A1D1D]/60 hover:text-[#4A1D1D] cursor-pointer transition-colors" size={18} />
                        <MdOutlineDeleteOutline className="text-[#4A1D1D]/60 hover:text-red-500 cursor-pointer transition-colors" size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile View */}
              <div className="md:hidden space-y-4">
                {modalCategories.map((item, idx) => (
                  <div key={idx} className="p-5 bg-white border border-[#FAF3ED] sm:shadow-sm shadow-md rounded-2xl flex flex-col gap-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#FAF3ED]"></div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-sm font-bold text-gray-800 block mb-2">{item.name}</span>
                        <span className="inline-block text-[10px] font-bold text-gray-600 bg-[#FAF3ED] px-3 py-1 rounded-full tracking-wide">
                          {item.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-[#FAF3ED]/30 p-2 rounded-xl">
                        <MdOutlineEdit className="text-[#4A1D1D]/60 hover:text-[#4A1D1D] cursor-pointer p-1" size={24} />
                        <div className="w-[1px] h-4 bg-gray-200"></div>
                        <MdOutlineDeleteOutline className="text-[#4A1D1D]/60 hover:text-red-500 cursor-pointer p-1" size={24} />
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Status</span>
                      <div className={`w-10 h-5 rounded-full relative ${item.status ? 'bg-[#D4A017]' : 'bg-gray-200'} cursor-pointer`}>
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${item.status ? 'right-0.5' : 'left-0.5'}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 flex justify-end items-center gap-3">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="px-6 py-3 rounded-xl text-sm font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button 
                className="px-8 py-3 rounded-xl text-white text-sm font-bold shadow-lg shadow-[#4A1D1D]/10 hover:opacity-90 transition-all active:scale-95" 
                style={{ backgroundColor: brandMaroon }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}