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
  const brandMaroon = "#6D0F1F";
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
    <div className="min-h-screen pt-1 px-10 pb-10 relative" style={{ backgroundColor: brandCream }}>
      {/* 1. Top Header Section */}
      <header className="mb-5">
        <nav className="text-[10px] font-bold tracking-[0.2em] text-gray-400 mb-1 uppercase">
          PRODUCTS  &gt;  <span className="text-[#6D0F1F]">SUB-VARIANTS</span>
        </nav>

        <div className="flex justify-between items-center">
          <h1 className="text-[24px] font-extrabold text-[#4A000E] font-manrope m-0" >
            Customize Data for: Blue Pattern Ceramic Pot
          </h1>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 border border-[#DDC0C0]/40 bg-white rounded-[12px] text-[14px] font-bold font-inter hover:bg-gray-50 transition-all text-[#6D0F1F]">
              <MdFileUpload size={18} /> Export CSV
            </button>
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] text-white text-[14px] font-bold font-inter hover:opacity-90 transition-all shadow-[0_8px_20px_rgba(74,29,29,.25)]"
              style={{ backgroundColor: brandMaroon }}
            >
              <MdAdd size={20} /> New Sub-Variant
            </button>
          </div>
        </div>
      </header>

      {/* 2. Table Container */}
      <div className="bg-white rounded-[1.5rem] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#FDF8F4]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF3ED]">
              <th className="px-8 py-7 text-[11px] font-extrabold tracking-[0.15em] text-[#A8A29E] uppercase">Tittle</th>
              <th className="px-6 py-7 text-[11px] font-extrabold tracking-[0.15em] text-[#A8A29E] uppercase">Image</th>
              <th className="px-6 py-7 text-[11px] font-extrabold tracking-[0.15em] text-[#A8A29E] uppercase">Variant Detail</th>
              <th className="px-6 py-7 text-[11px] font-extrabold tracking-[0.15em] text-[#A8A29E] uppercase">Price</th>
              <th className="px-6 py-7 text-[11px] font-extrabold tracking-[0.15em] text-[#A8A29E] uppercase text-center">Preview Image</th>
              <th className="px-8 py-7 text-[11px] font-extrabold tracking-[0.15em] text-[#A8A29E] uppercase text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subVariants.map((item, index) => (
              <tr key={index} className="hover:bg-[#FDF8F4]/40 transition-colors border-b border-[#FDF8F4]">
                <td className="px-8 py-6 text-[13px] text-[#A8A29E] font-medium">{item.title}</td>
                <td className="px-6 py-6">
                  <div className="w-[52px] h-[52px] rounded-[14px] bg-[#FDF8F4] overflow-hidden border border-[#E8E0D8]">
                    <img src={item.image} alt="variant" className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-6">
                  <p className="text-[16px] font-semibold text-[#4A000E] font-inter mb-1.5 w-[140px] leading-snug tracking-tight pr-4">{item.name}</p>
                  <p className="text-[11px] text-[#A8A29E] font-inter font-medium">{item.detail}</p>
                </td>
                <td className="px-6 py-6">
                  <p className="text-[16px] font-semibold text-[#4A000E] font-inter mb-1.5">{item.price}</p>
                  <p className="text-[10px] font-bold text-[#A8A29E] tracking-tight uppercase">{item.wholesale}</p>
                </td>
                <td className="px-6 py-6">
                  <div className="flex justify-center -space-x-3">
                    <img src={item.preview} alt="preview" className="w-[36px] h-[36px] rounded-full border-[2.5px] border-white shadow-sm bg-gray-100" />
                    <img src={item.preview} alt="preview" className="w-[36px] h-[36px] rounded-full border-[2.5px] border-white shadow-sm bg-[#564242]" />
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex justify-center items-center gap-[18px]">
                    <MdOutlineEdit className="text-[#6D0F1F] hover:text-[#4A000E] cursor-pointer" size={18} />

                    {/* Middle Icon Click - Opens Modal */}
                    <MdOutlineLayers
                      className="text-[#6D0F1F] hover:text-[#4A000E] cursor-pointer"
                      size={18}
                      onClick={() => setIsModalOpen(true)}
                    />

                    <MdOutlineDeleteOutline className="text-[#6D0F1F] hover:text-[#4A000E] cursor-pointer" size={18} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 3. Pagination Footer */}
        <div className="px-8 py-6 flex justify-between items-center bg-white border-t border-[#FDF8F4]">
          <p className="text-[12px] font-medium text-[#A8A29E]">
            Showing <span className="font-bold text-[#6D0F1F]">1-10</span> of 48 variants
          </p>
          <div className="flex items-center gap-3">
            <button className="w-[34px] h-[34px] flex items-center justify-center rounded-lg border border-[#E8E0D8] text-[#A8A29E] hover:bg-[#FAF3ED] text-xs transition-colors shadow-sm">{"<"}</button>
            <button className="w-[34px] h-[34px] flex items-center justify-center rounded-lg bg-[#4A000E] text-white text-xs font-bold shadow-md">1</button>
            <button className="w-[34px] h-[34px] flex items-center justify-center rounded-lg text-[#564242] hover:bg-[#FAF3ED] font-bold text-xs transition-colors">2</button>
            <button className="w-[34px] h-[34px] flex items-center justify-center rounded-lg text-[#564242] hover:bg-[#FAF3ED] font-bold text-xs transition-colors">3</button>
            <button className="w-[34px] h-[34px] flex items-center justify-center rounded-lg border border-[#E8E0D8] text-[#A8A29E] hover:bg-[#FAF3ED] text-xs transition-colors shadow-sm">{">"}</button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex text-left items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 sm:p-6">
          <div className="bg-white w-full max-w-3xl rounded-[2rem] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col font-inter">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-[#FDF8F4]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#FAF3ED] text-[#4A000E]">
                  <MdSettings size={22} />
                </div>
                <h2 className="text-[20px] font-bold text-[#4A000E] font-manrope m-0">
                  Manage Subvariants
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 transition-colors p-2"
              >
                <MdClose size={24} />
              </button>
            </div>

            <div className="px-6 md:px-8 pt-6 pb-2 max-h-[70vh] overflow-y-auto">
              {/* Input Section */}
              <div className="mb-6">
                <h3 className="text-[18px] font-bold text-[#4A000E] font-manrope mb-1">
                  Add New Subcategory
                </h3>
                <p className="text-[14px] font-regular font-inter text-[#564242] mb-4">
                  Expand your inventory architecture with precision.
                </p>

                <div className="flex flex-col md:flex-row items-end gap-4">
                  <div className="w-full md:flex-1">
                    <label className="block text-[12px] font-semibold  font-inter text-[#564242] tracking-widest uppercase mb-2">
                      Category *
                    </label>
                    <input
                      type="text"
                      placeholder="Category name"
                      className="w-full py-3.5 px-4 bg-[#FAF3ED] rounded-[10px] text-[16px] font-inter outline-none text-[#A09F9E] placeholder:text-[#A8A29E] border-none font-medium"
                    />
                  </div>
                  <div className="w-full md:flex-1">
                    <label className="block text-[12px] font-semibold  font-inter text-[#564242] tracking-widest uppercase mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Italian Wool"
                      className="w-full py-3.5 px-4 bg-[#FAF3ED] rounded-[10px] text-[16px] font-inter outline-none text-[#A09F9E] placeholder:text-[#A8A29E] border-none font-medium"
                    />
                  </div>
                  <button className="w-full md:w-auto bg-[#24B5B5] text-white font-bold py-3.5 px-6 rounded-[10px] text-[13px] flex items-center justify-center hover:bg-[#1E9B9B] transition-all whitespace-nowrap shadow-sm shadow-[#24B5B5]/20">
                    <span className="text-[24px]  font-inter font-semibold mr-1 leading-none mt-[-2px]">+</span> Add Subcategory
                  </button>
                </div>
              </div>

              {/* Subcategories List */}
              <div className="mb-2">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-[18px] font-bold text-[#4A000E] font-manrope whitespace-nowrap m-0">
                    Subcategories (3)
                  </h3>
                  <div className="flex-1 h-[1px] bg-[#FDF8F4]"></div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-[2.5fr_1.5fr_1fr_1fr] bg-[#FAF3ED] py-3 px-6 rounded-[12px] mb-2 items-center">
                    <div className="text-[12px] font-semibold font-inter  text-[#564242] tracking-[0.1em] uppercase pl-2">Name</div>
                    <div className="text-[12px] font-se mibold font-inter text-[#564242] tracking-[0.1em] uppercase text-left">Category</div>
                    <div className="text-[12px] font-semibold font-inter text-[#564242] tracking-[0.1em] uppercase text-left">Status</div>
                    <div className="text-[12px] font-semibold font-inter text-[#564242] tracking-[0.1em] uppercase text-center pr-2">Actions</div>
                  </div>

                  <div className="flex flex-col w-full">
                    {modalCategories.map((item, idx) => (
                      <div key={idx} className={`grid grid-cols-[2.5fr_1.5fr_1fr_1fr] gap-4 items-center py-3.5 px-6 hover:bg-[#FDF8F4]/40 transition-colors ${idx !== modalCategories.length - 1 ? 'border-b border-[#FDF8F4]' : ''}`}>
                        <span className="text-[16px] font-semibold text-[#1E1B17] font-inter pl-2">{item.name}</span>
                        <div className="flex justify-start">
                          <span className="text-[11px] font-bold text-[#A8A29E] bg-[#FDF8F4] px-3.5 py-1.5 rounded-[10px] whitespace-nowrap">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex justify-start pl-1">
                          <div className={`w-[44px] h-[24px] rounded-full relative ${item.status ? 'bg-[#D6B445]' : 'bg-[#E8E0D8]'} cursor-pointer hover:opacity-90 transition-opacity`}>
                            <div className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-all shadow-sm ${item.status ? 'right-[2px]' : 'left-[2px]'}`} />
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-[18px]">
                          <MdOutlineEdit className="text-[#4A000E] hover:opacity-75 cursor-pointer" size={31} />
                          <MdOutlineDeleteOutline className="text-[#4A000E] hover:opacity-75 cursor-pointer" size={31} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile View */}
                <div className="md:hidden space-y-4">
                  {modalCategories.map((item, idx) => (
                    <div key={idx} className="p-5 bg-white border border-[#FDF8F4] rounded-[16px] shadow-sm flex flex-col gap-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[16px] font-semibold text-[#1E1B17] font-inter block mb-2">{item.name}</span>
                          <span className="inline-block text-[11px] font-bold text-[#A8A29E] bg-[#FDF8F4] px-3.5 py-1.5 rounded-[10px]">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-[14px] bg-[#FAF3ED]/40 p-2.5 rounded-xl">
                          <MdOutlineEdit className="text-[#4A000E] cursor-pointer" size={34} />
                          <MdOutlineDeleteOutline className="text-[#4A000E] cursor-pointer" size={34} />
                        </div>
                      </div>
                      <div className="pt-3 border-t border-[#FDF8F4] flex justify-between items-center">
                        <span className="text-[10px] font-extrabold text-[#8C827A] uppercase tracking-widest">Status</span>
                        <div className={`w-[44px] h-[24px] rounded-full relative ${item.status ? 'bg-[#D6B445]' : 'bg-[#E8E0D8]'} cursor-pointer`}>
                          <div className={`absolute top-[2px] w-[20px] h-[20px] bg-white rounded-full transition-all ${item.status ? 'right-[2px]' : 'left-[2px]'}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#FAF3ED] px-6 md:px-8 py-4 rounded-b-[2rem] flex justify-end items-center gap-6 mt-auto">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[13px] font-extrabold text-[#8C827A] hover:text-[#564242] transition-colors font-inter"
              >
                Cancel
              </button>
              <button
                className="bg-[#4A000E] text-white px-8 py-3 rounded-[12px] text-[13px] font-bold shadow-[0_8px_20px_rgba(74,0,14,.15)] hover:bg-[#3A000A] transition-all font-inter"
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