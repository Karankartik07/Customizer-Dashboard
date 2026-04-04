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

  const brandMaroon = "#4A1D1D"; 
  const brandCream = "#FFF8F1";

  return (
    <div className="min-h-screen p-10" style={{ backgroundColor: brandCream }}>
      {/* 1. Header / Breadcrumbs */}
      <header className="mb-12">
        <nav className="text-[10px] font-bold tracking-[0.2em] text-gray-400 mb-3">
          PRODUCTS  &gt;  THE SIGNATURE BLAZER  &gt;  <span className="text-gray-900">VARIANTS</span>
        </nav>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-3" style={{ color: brandMaroon }}>
              Customize Variants
            </h1>
            <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
              Define the primary characteristics and structural options for the Signature Blazer collection.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 bg-white rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all">
              <MdOutlineTune size={18} /> Filter
            </button>
            <button 
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-all"
              style={{ backgroundColor: brandMaroon }}
            >
              <MdAdd size={20} /> Create Variant
            </button>
          </div>
        </div>
      </header>

      {/* 2. Variants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {variants.map((item) => (
          <div key={item.id} className="bg-white rounded-[2.5rem] p-7 shadow-sm relative group">
            
            {/* Hover Actions */}
            <div className="absolute top-8 right-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <MdOutlineEdit className="text-gray-400 hover:text-gray-800 cursor-pointer" size={20} />
              <MdOutlineDeleteOutline className="text-gray-400 hover:text-red-500 cursor-pointer" size={20} />
            </div>

            {/* Product Image & Badge */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-32 h-44 bg-gray-50 rounded-2xl overflow-hidden mb-5 shadow-inner">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[9px] font-black tracking-[0.25em] px-4 py-1.5 bg-[#8B7E5D] text-white rounded-full">
                {item.badge}
              </span>
            </div>

            {/* Text Content */}
            <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.name}</h3>
            <p className="text-xs text-gray-400 mb-8 leading-loose tracking-wide">
              {item.description}
            </p>

            {/* Footer Component (Sub-variants) */}
            <div className="bg-[#FAF3ED] rounded-[2rem] p-5 flex justify-between items-center">
              <div>
                <p className="text-[9px] font-bold text-gray-400 tracking-widest mb-1">SUB-VARIANTS</p>
                <p className="text-xl font-black" style={{ color: brandMaroon }}>
                  {item.options} <span className="text-sm font-bold">Options</span>
                </p>
              </div>
              <Link 
                href={`/products/${params.productId}/${item.id}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-full text-[11px] font-bold shadow-sm hover:shadow-md transition-all"
              >
                Customize <MdArrowForward size={14} />
              </Link>
            </div>
          </div>
        ))}

        {/* 3. Empty State Card */}
        <div className="border-2 border-dashed border-gray-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center group cursor-pointer hover:border-gray-300 transition-colors">
          <div className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <MdAdd size={28} style={{ color: brandMaroon }} />
          </div>
          <p className="font-bold text-gray-400 mb-1">Add New Material Variant</p>
          <p className="text-[10px] text-gray-300 tracking-wider">Expansion slots available</p>
        </div>
      </div>
    </div>
  );
}