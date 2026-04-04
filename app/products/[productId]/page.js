"use client";
import React from "react";
import {
  MdOutlineTune,
  MdAdd,
  MdOutlineEdit,
  MdOutlineDeleteOutline,
  MdArrowForward
} from "react-icons/md";
import Link from "next/link";

export default function CustomizeVariants({ params }) {
  // Data structure matching your Figma cards
  const variants = [
    {
      id: "1",
      name: "Midnight Navy Wool",
      description: "Italian Super 150s virgin wool with a subtle twill weave. The...",
      badge: "CORE",
      options: 12,
      image: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1738228308/midnight-navy_qj7z1a.jpg",
    },
    {
      id: "2",
      name: "Herringbone Charcoal",
      description: "Heavyweight British tweed with a classic herringbone pattern. Ide...",
      badge: "LIMITED",
      options: 8,
      image: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1738228308/herringbone_z2a1p9.jpg",
    },
    {
      id: "3",
      name: "Camel Pure Cashmere",
      description: "Unmatched softness and warmth. Sourced from the inner Mongoli...",
      badge: "PREMIUM",
      options: 5,
      image: "https://res.cloudinary.com/dd9tagtiw/image/upload/v1738228308/camel-cashmere_m3v1r0.jpg",
    }
  ];

  return (
    <div className="min-h-screen px-10 pt-0 pb-10 bg-[#FFF8F1]">
      {/* 1. Header / Breadcrumbs */}
      <header className="mb-12">
        <nav className="text-[11px] font-bold font-inter tracking-[0.18em] text-[#A8A29E] mb-2.5 uppercase">
          PRODUCTS  <span className="mx-2 opacity-50">&gt;</span>  THE SIGNATURE BLAZER  <span className="mx-2 opacity-50">&gt;</span>  <span className="text-[#4A000E]">VARIANTS</span>
        </nav>

        <h1 className="text-[36px] font-manrope font-extrabold mb-1 text-[#4A000E] tracking-tight">
          Customize Variants
        </h1>

        <div className="flex justify-between items-center">
          <p className="text-[#564242] text-[16px] max-w-xl font-regular   font-inter m-0">
            Define the primary characteristics and structural options for the Signature Blazer collection.
          </p>

          <div className="flex gap-[14px]">
            <button className="flex items-center justify-center gap-[8px] px-[24px] h-[50px] border border-[#DDC0C0]/30 bg-transparent rounded-[12px] text-[15px] text-[#4A000E] font-bold font-inter hover:bg-[#FFF] transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="6" y1="12" x2="18" y2="12"></line>
                <line x1="10" y1="18" x2="14" y2="18"></line>
              </svg> Filter
            </button>
            <button
              className="flex items-center justify-center gap-[8px] px-[24px] h-[50px] rounded-[12px] bg-gradient-to-r from-[#6D0F1F] to-[#4A000E] text-white text-[15px] font-bold shadow-[0_12px_24px_rgba(109,15,31,.25)] hover:opacity-90 transition-all font-inter"
            >
              <span className="text-[20px] leading-none mb-[2px] font-normal">+</span> Create Variant
            </button>
          </div>    
        </div>
      </header>

      {/* 2. Variants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px]">
        {variants.map((item) => (
          <div key={item.id} className="bg-white rounded-[24px] p-5 shadow-sm relative group">

            {/* Image & Actions Row */}
            <div className="flex items-start justify-between mb-4">
              {/* Product Image with Badge overlay */}
              <div className="relative w-[120px] h-[140px] bg-[#F5F0EB] rounded-[16px] overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <span className="absolute bottom-2 left-2 text-[8px] font-black tracking-[0.2em] px-3 py-1 bg-[#6B5E45] text-white rounded-full">
                  {item.badge}
                </span>
              </div>
              {/* Action Icons */}
              <div className="flex gap-2 pt-1">
                <MdOutlineEdit className="text-[#A8A29E] hover:text-gray-800 cursor-pointer" size={32} />
                <MdOutlineDeleteOutline className="text-[#A8A29E] hover:text-red-500 cursor-pointer" size={32} />
              </div>
            </div>

            {/* Text Content */}
            <h3 className="text-[20px] font-bold mb-1 text-[#1E1B17] font-manrope tracking-tight">{item.name}</h3>
            <p className="text-[14px] text-[#564242] font-inter mb-5 leading-relaxed font-inter">
              {item.description}
            </p>

            {/* Footer Component (Sub-variants) */}
            <div className="bg-[#FAF3ED] rounded-[18px] px-5 py-4 flex justify-between items-center">
              <div>
                <p className="text-[8px] font-bold text-[#A8A29E] tracking-[0.2em] mb-0.5 uppercase">SUB-</p>
                <p className="text-[8px] font-bold text-[#A8A29E] tracking-[0.2em] mb-0.5 uppercase">VARIANTS</p>
                <p className="text-[22px] font-extrabold text-[#4A1D1D] leading-tight font-manrope">
                  {item.options} <span className="text-[13px] font-bold gap-8"></span>
                  <p className="text-[18px] font-bold">Options</p>
                </p>
              </div>
              <Link
                href={`/products/${params.productId}/${item.id}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E8E0D8] rounded-full   text-[11px] font-bold text-[#4A1D1D] shadow-sm hover:shadow-md transition-all font-inter"
              >
                Customize <MdArrowForward size={14} />
              </Link>
            </div>
          </div>
        ))}

        {/* 3. Empty State Card */}
        <div className="border-2 border-dashed border-[#E0D5CC] rounded-[24px] flex flex-col items-center justify-center p-10 text-center group cursor-pointer hover:border-[#C5B8AD] transition-colors">
          <div className="w-12 h-12 bg-[#F5F0EB] rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MdAdd size={24} className="text-[#4A1D1D]" />
          </div>
          <p className="text-[15px] font-bold text-[#4A1D1D] mb-1 font-manrope">Add New Material Variant</p>
          <p className="text-[11px] text-[#A8A29E] tracking-wider font-inter">Expansion slots available</p>
        </div>
      </div>
    </div>
  );
}