"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiBox, FiBookmark, FiShoppingBag, FiPlus, FiDownload, FiTrendingUp } from "react-icons/fi";
import { HiOutlineLightBulb } from "react-icons/hi"; 

export default function DashboardContent() {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState("weekly");

  const colors = {
    maroon: "#5c1728",
    maroonLight: "#fdf3f3",
    peach: "#f4ebe8",
    goldBg: "#FFE08866",
    goldBorder: "#FFE088",
    textMaroon: "#5c1728",
    textGrey: "#7a5a64",
    green: "#1a8a3d"
  };

  const statsCards = [
    { 
      title: "TOTAL PRODUCTS", 
      value: "1,248", 
      change: "+12% this month", 
      path: "/products",
      // Increased icon size here
      icon: <FiBox className="w-16 h-16" /> 
    },
    { 
      title: "PRODUCT SAVED", 
      value: "8,912", 
      change: "+5.2% this week", 
      path: "/product-saved",
      icon: <FiBookmark className="w-16 h-16" /> 
    },
    { 
      title: "TOTAL ORDERS", 
      value: "452", 
      change: "+24% vs last period", 
      path: "/orders",
      icon: <FiShoppingBag className="w-16 h-16" /> 
    },
  ];

  const graphData = {
    weekly: [
      { label: "MON", val: 40, color: "bg-[#f4ebe8]" },
      { label: "TUE", val: 60, color: "bg-[#f4ebe8]" },
      { label: "WED", val: 45, color: "bg-[#f4ebe8]" },
      { label: "THU", val: 90, color: "bg-[#FFE08866] border border-[#FFE088]", active: true },
      { label: "FRI", val: 65, color: "bg-[#f4ebe8]" },
      { label: "SAT", val: 55, color: "bg-[#f4ebe8]" },
      { label: "SUN", val: 100, color: "bg-[#5c1728]" }
    ],
    monthly: [
      { label: "W1", val: 70, color: "bg-[#f4ebe8]" },
      { label: "W2", val: 50, color: "bg-[#f4ebe8]" },
      { label: "W3", val: 95, color: "bg-[#5c1728]" },
      { label: "W4", val: 60, color: "bg-[#f4ebe8]" }
    ]
  };

  return (
    <div className="space-y-6 md:space-y-10 pb-10 px-2 sm:px-0">
      
      {/* 1. HEADER - Improved Responsiveness */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-[#5c1728] tracking-tight break-words">Atelier Overview</h2>
          <p className="text-black mt-2 font-[400] text-2xl md:text-base">Welcome back. The concierge is ready for your direction.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <button onClick={() => router.push("/orders")} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-2xl border border-[#f1d6d6] bg-white text-[#5c1728] font-bold text-xs md:text-sm hover:bg-[#faf5f5] transition-all"><FiShoppingBag /> View Orders</button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-7 py-3 rounded-2xl bg-[#5c1728] text-white font-bold text-xs md:text-sm hover:opacity-90 transition-all"><FiPlus /> Add Product</button>
        </div>
      </div>

{/* 2. STATS GRID */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
  {statsCards.map((card, i) => (
    <div 
      key={i} 
      onClick={() => router.push(card.path)}
      className="bg-white p-6 md:p-8 rounded-[32px] border border-[#fdf3f3] relative overflow-hidden cursor-pointer transition-all group"
    >
      <p className="text-[10px] md:text-[11px] font-bold text-[#7a5a64] tracking-[0.15em] mb-4 uppercase">{card.title}</p>
      <h3 className="text-3xl md:text-4xl font-bold text-[#2d0a12] mb-3">{card.value}</h3>
      <div className="flex items-center gap-1 text-[11px] md:text-[12px] font-bold text-[#1a8a3d]">
          <FiTrendingUp className="w-3 h-3" /> {card.change}
      </div>
      
      <div className="absolute right-5 -top-10 translate-y-1/2 text-[#7a5a64] opacity-[0.05] group-hover:opacity-10 transition-opacity">
          {React.cloneElement(card.icon, { className: "w-24 h-24" })}
      </div>
    </div>
  ))}

  {/* Dark Revenue Card */}
  <div className="bg-[#5c1728] p-6 md:p-8 rounded-[32px] text-white relative overflow-hidden group">
    <div className="relative z-10">
      <p className="text-[10px] md:text-[11px] font-bold opacity-60 tracking-[0.15em] mb-4 uppercase">TOTAL REVENUE</p>
      <h3 className="text-3xl md:text-4xl font-bold mb-3">$142.8k</h3>
      <p className="text-[11px] md:text-xs font-medium opacity-80 italic flex items-center gap-2">
        <HiOutlineLightBulb /> Top performing year
      </p>
    </div>
    
    <div className="absolute -right-7 -bottom-6 text-white opacity-10 rotate-12 transition-transform group-hover:scale-110">
       <FiShoppingBag size={160} />
    </div>
  </div>
</div>
   
      {/* 3. CHART & REVENUE STREAMS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-[#fdf3f3] flex flex-col min-h-[400px] md:min-h-[500px]">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 md:mb-12">
            <h4 className="text-xl md:text-2xl font-bold text-[#5c1728]">Order Trajectory</h4>
            <div className="flex bg-[#fdf8f4] p-1 rounded-full border border-[#f1d6d6] self-end sm:self-auto">
              <button onClick={() => setTimeframe("weekly")} className={`px-4 md:px-6 py-2 text-[10px] md:text-xs font-bold rounded-full transition-all ${timeframe === "weekly" ? "bg-white text-[#5c1728] shadow-sm" : "text-[#7a5a64]"}`}>Weekly</button>
              <button onClick={() => setTimeframe("monthly")} className={`px-4 md:px-6 py-2 text-[10px] md:text-xs font-bold rounded-full transition-all ${timeframe === "monthly" ? "bg-white text-[#5c1728] shadow-sm" : "text-[#7a5a64]"}`}>Monthly</button>
            </div>
          </div>

          <div className="h-48 md:h-72 w-full flex items-end justify-between gap-0 mt-auto border-b border-[#f4ebe8] pb-2">
            {graphData[timeframe].map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative group">
                {item.active && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2d0a12] text-white text-[9px] md:text-[10px] font-bold py-1 px-2 md:py-1.5 md:px-3 rounded-xl z-10">
                    28k
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#2d0a12]" />
                  </div>
                )}
                <div 
                  className={`w-full ${item.color} rounded-t-lg md:rounded-t-2xl transition-all duration-700`}
                  style={{ height: `${item.val}%` }}
                />
                <span className="text-[8px] md:text-[10px] font-bold text-[#7a5a64] mt-4 uppercase tracking-tighter">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#f9f3eb] p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-[#fdf3f3] flex flex-col">
          <h4 className="text-xl md:text-2xl font-bold text-[#5c1728]">Revenue Streams</h4>
          <p className="text-xs md:text-sm text-[#7a5a64] mt-1 mb-6 md:mb-10 font-medium">Allocation by bespoke category</p>
          <div className="space-y-6 md:space-y-8 flex-1">
            {[ 
              { n: 'Tailored Apparel', v: 64, c: '#5c1728' }, 
              { n: 'Leather Goods', v: 22, c: '#e9c349' }, 
              { n: 'Accessories', v: 14, c: '#8c7a7a' } 
            ].map((s, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-[10px] md:text-xs font-extrabold text-[#5c1728] mb-3 uppercase tracking-widest">
                  <span>{s.n}</span><span>{s.v}%</span>
                </div>
                <div className="h-2 w-full bg-[#fdf8f4] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${s.v}%`, backgroundColor: s.c }} />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 md:mt-10 flex items-center justify-center gap-3 text-[#5c1728] font-extrabold text-[10px] md:text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-all">
            <FiDownload /> Download Financial Digest
          </button>
        </div>
      </div>
    </div>
  );
}