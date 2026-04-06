"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiShoppingBag, FiPlus, FiArrowUpRight } from "react-icons/fi";

export default function DashboardContent() {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState("weekly");

  const statsCards = [
    {
      title: "TOTAL PRODUCTS",
      value: "1,248",
      change: "+12% this month",
      path: "/products",
      icon: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1775231652/Total%20Products.png"
    },
    {
      title: "PRODUCT SAVED",
      value: "8,912",
      change: "+5.2% this week",
      path: "/product-saved",
      icon: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1775231652/Product%20Saved.png"
    },
    {
      title: "TOTAL ORDERS",
      value: "452",
      change: "+24% vs last period",
      path: "/orders",
      icon: "https://res.cloudinary.com/dlzxiy0tl/image/upload/v1775231652/Total%20Orders.png"
    },
  ];

  const graphData = {
    weekly: [
      { label: "MON", val: 30, color: "bg-[#ece7df]" },
      { label: "TUE", val: 50, color: "bg-[#ece7df]" },
      { label: "WED", val: 40, color: "bg-[#ece7df]" },
      { label: "THU", val: 80, color: "bg-[#faecd0]", active: true },
      { label: "FRI", val: 45, color: "bg-[#ece7df]" },
      { label: "SAT", val: 60, color: "bg-[#ece7df]" },
      { label: "SUN", val: 95, color: "bg-[#661626]" }
    ],
    monthly: [
      { label: "W1", val: 70, color: "bg-[#ece7df]" },
      { label: "W2", val: 50, color: "bg-[#ece7df]" },
      { label: "W3", val: 95, color: "bg-[#661626]" },
      { label: "W4", val: 60, color: "bg-[#ece7df]" }
    ]
  };

  return (
    <div className="space-y-5 pb-12 px-2 md:px-0 mt-1 font-inter">

      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-[28px] md:text-[24px] font-extrabold text-[#4A000E] tracking-tight font-manrope">Atelier Overview</h2>
          <p className="text-[#564242] mt-0.5 font-medium text-[14px] md:text-[16px] font-inter">Welcome back. The concierge is ready for your direction.</p>
        </div>
        <div className="flex flex-wrap items-center gap-[14px]">
          <button onClick={() => router.push("/orders")} className="flex items-center justify-center h-[48px] gap-[10px] px-[28px] outline-none rounded-full border border-[#dfc9c3] bg-transparent text-[#4A000E] font-inter font-extrabold text-[15px] hover:bg-[#FDF8F4] transition-all tracking-[0.02em]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="8" width="14" height="14" rx="2" ry="2"></rect>
              <path d="M8 8V6a4 4 0 0 1 8 0v2"></path>
            </svg>
            View Orders
          </button>
          <button className="flex items-center justify-center h-[48px] gap-[10px] px-[28px] outline-none rounded-full bg-[#5C1728] text-white font-extrabold font-inter text-[15px] hover:bg-[#4D0A15] transition-all shadow-[0_12px_24px_rgba(92,23,40,.3)] tracking-[0.02em]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Product
          </button>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((card, i) => (
          <div
            key={i}
            onClick={() => router.push(card.path)}
            className="bg-white p-6 rounded-[24px] w-full h-[150px] relative overflow-hidden cursor-pointer transition-all hover:shadow-md group shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border-none flex flex-col justify-center"
          >
            <p className="text-[13px] font-semibold font-inter text-[#564242] tracking-[0.1em] mb-2 uppercase relative z-10">{card.title}</p>
            <h3 className="text-[36px] font-extrabold text-[#4A000E] mb-2 tracking-tight leading-none relative z-10 font-manrope   ">{card.value}</h3>
            <div className="flex items-center gap-1 text-[12px] font-[700] text-[#7d7943] relative z-10 font-inter">
              <FiArrowUpRight className="w-4 h-4 stroke-[2.5]" /> {card.change}
            </div>

            <div className="absolute right-6 top-6 pointer-events-none z-0">
              <img src={card.icon} alt={card.title} className="w-[50px] h-[50px] object-contain opacity-[0.15]" />
            </div>
          </div>
        ))}

        {/* Dark Revenue Card */}
        <div className="bg-[#5c1322] p-6 rounded-[24px] text-white relative overflow-hidden group shadow-[0px_4px_20px_rgba(0,0,0,0.08)] border-none w-full h-[150px] flex flex-col justify-center">
          <div className="relative z-10">
            <p className="text-[12px] font-semibold font-inter tracking-[0.1em] mb-2 uppercase text-[#FFE088] font-inter">TOTAL REVENUE</p>
            <h3 className="text-[36px] font-extrabold font-manrope mb-2 tracking-tight leading-none text-[#FFFFFF]">$142.8k</h3>
            <p className="text-[12px] font-semibold font-inter text-[#FFE088] flex items-center gap-1.5 ">
              <span className="text-[14px]">✨</span> Top performing year
            </p>
          </div>

          <div className="absolute right-6 top-1 pointer-events-none z-0">
            <img src="https://res.cloudinary.com/dlzxiy0tl/image/upload/v1775231653/Total%20Revenue.png" alt="TOTAL REVENUE" className="w-[60px] h-[60px] object-contain opacity-[0.15]" />
          </div>
        </div>
      </div>

      {/* 3. CHART & REVENUE STREAMS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-6 mt-4">
        {/* Order Trajectory */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[24px] flex flex-col min-h-[420px] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] relative border-none">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2 z-10 relative">
            <div>
              <h4 className="text-[20px] font-manrope font-bold text-[#4A000E] ">Order Trajectory</h4>
              <p className="text-[#564242] mt-1.5 text-[14px] font-right font-inter">Performance metrics across curated collections</p>
            </div>
            <div className="flex bg-[#f5edea] p-1 rounded-[16px] border border-[#ede3e3]">
              <button
                onClick={() => setTimeframe("weekly")}
                className={`px-6 py-1.5 text-[11px] font-[800] tracking-wide rounded-[16px] transition-all ${timeframe === "weekly" ? "bg-white text-[#5c1728] shadow-sm" : "text-[#9b8b8b] font-inter"}`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeframe("monthly")}
                className={`px-6 py-1.5 text-[11px] font-[800] tracking-wide rounded-[16px] transition-all ${timeframe === "monthly" ? "bg-white text-[#5c1728] shadow-sm" : "text-[#9b8b8b] font-inter"}`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="flex-1 w-full flex items-end justify-between gap-0 mt-[60px] relative z-0">
            {graphData[timeframe].map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative group">
                {item.active && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#4e0b19] text-white text-[10px] font-bold py-[3px] px-3 rounded-full z-10 flex items-center justify-center font-inter tracking-wider">
                    28k
                  </div>
                )}
                <div
                  className={`w-full ${item.color} rounded-t-[8px] transition-all duration-700`}
                  style={{ height: `${item.val}%` }}
                />
                <div className="absolute -bottom-9 w-full flex justify-center pb-2">
                  <span className="text-[10px] font-[800] text-[#7a5a64] uppercase tracking-[0.1em] font-inter">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Streams */}
        <div className="bg-[#f8f2eb] p-8 rounded-[24px] flex flex-col shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border-none relative h-[420px]">
          <h4 className="text-[20px] font-[800] text-[#5c1728] font-inter">Revenue Streams</h4>
          <p className="text-[13px] text-[#8c7b7b] mt-1.5 mb-10 font-[500] font-inter">Allocation by bespoke category</p>

          <div className="space-y-7 flex-1 relative z-10">
            {[
              { n: 'Tailored Apparel', v: 64, c: '#661626' },
              { n: 'Leather Goods', v: 22, c: '#ddb54e' },
              { n: 'Accessories', v: 14, c: '#8d8181' }
            ].map((s, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-[13px] font-[800] text-[#5c1728] mb-2 font-inter">
                  <span>{s.n}</span><span>{s.v}%</span>
                </div>
                <div className="h-[10px] w-full bg-white rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${s.v}%`, backgroundColor: s.c }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#e6ded8] w-[85%] mx-auto flex justify-center pb-2 relative z-10 group cursor-pointer hover:opacity-70 transition-all">
            <span className="text-[#5c1728] font-[800] text-[13px] font-inter">Download Financial Digest</span>
          </div>
        </div>
      </div>
    </div>
  );
}
