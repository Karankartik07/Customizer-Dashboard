"use client";

import React, { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Package, 
  Bookmark, 
  ShoppingCart, 
  Users, 
  LogOut, 
  Search, 
  Bell, 
  Plus, 
  Download 
} from "lucide-react";

export default function Page() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/dashboard");
        if (!res.ok) throw new Error("Dashboard API error");
        const data = await res.json();
        setDashboard(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, []);

  if (error) return <div className="p-10 text-red-600 font-bold">Error: {error}</div>;
  if (!dashboard) return <div className="h-screen flex items-center justify-center text-[#5D1717] font-medium animate-pulse">Initializing Atelier...</div>;

  return (
    <div className="p-8">
  {/* 1. DASHBOARD HEADER & ACTIONS */}
  <section className="mb-10">
    <div className="flex justify-between items-end mb-8">
      <div>
        <h2 className="text-3xl font-bold text-[#5D1717] tracking-tight">Atelier Overview</h2>
        <p className="text-stone-500 text-sm mt-1">Welcome back. The concierge is ready for your direction.</p>
      </div>
      <div className="flex space-x-4">
        <button className="px-6 py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-700 shadow-sm hover:bg-stone-50">View Orders</button>
        <button className="px-6 py-2.5 bg-[#5D1717] text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#5d171733] hover:bg-[#4a1212]">
          <Plus size={18} /> Add Product
        </button>
      </div>
    </div>

    {/* 2. METRIC CARDS (Dynamic from your state) */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {dashboard.metrics.map((card) => (
        <article
          key={card.label}
          className={`rounded-[2.5rem] p-7 shadow-sm border border-stone-100 transition-transform hover:scale-[1.02] ${
            card.highlight ? "bg-[#5D1717] text-white" : "bg-white text-stone-800"
          }`}
        >
          <div className="flex justify-between items-start mb-6">
            <p className={`text-[10px] font-bold uppercase tracking-[0.15em] ${card.highlight ? "text-stone-300" : "text-stone-400"}`}>
              {card.label}
            </p>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.highlight ? "bg-white/10" : "bg-stone-50"}`}>
              <Package size={16} className={card.highlight ? "text-white" : "text-[#5D1717]"} />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-1 tracking-tight">{card.value}</h2>
          <p className={`text-[10px] font-bold ${card.highlight ? "text-stone-300" : "text-stone-400"}`}>
            <span className={card.highlight ? "text-white" : "text-emerald-600"}>▲ {card.trend}</span> vs last period
          </p>
        </article>
      ))}
    </div>
  </section>

  {/* 3. CHARTS ROW */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    
    {/* ORDER TRAJECTORY BAR CHART */}
    <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-sm">
       <div className="flex justify-between items-start mb-12">
         <div>
            <h3 className="text-xl font-bold text-[#5D1717]">Order Trajectory</h3>
            <p className="text-xs text-stone-400 mt-1 uppercase font-bold tracking-widest">Performance metrics across curated collections</p>
         </div>
         <div className="flex bg-stone-100 p-1.5 rounded-xl text-[10px] font-bold">
           <button className="px-4 py-2 bg-white rounded-lg shadow-sm text-[#5D1717]">Weekly</button>
           <button className="px-4 py-2 text-stone-400">Monthly</button>
         </div>
       </div>

       <div className="flex items-end justify-between h-56 px-4 gap-2">
         {dashboard.orderTrajectory.labels.map((label, index) => {
           const heightValue = dashboard.orderTrajectory.points[index];
           const isHighest = heightValue >= Math.max(...dashboard.orderTrajectory.points);
           return (
             <div key={label} className="flex-1 flex flex-col items-center group">
               <div 
                 style={{ height: `${heightValue}%` }}
                 className={`w-full max-w-[50px] rounded-t-sm transition-all duration-500 relative ${
                   isHighest ? 'bg-[#5D1717]' : 'bg-[#F2EBE4]'
                 }`}
               >
                  {isHighest && (
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#5D1717] text-white text-[10px] px-2 py-1 rounded-md font-bold">
                       {heightValue}k
                     </div>
                  )}
               </div>
               <span className="mt-4 text-[10px] font-extrabold text-stone-400 uppercase tracking-tighter">{label}</span>
             </div>
           );
         })}
       </div>
    </div>

    {/* REVENUE STREAMS PROGRESS BARS */}
    <div className="bg-white p-10 rounded-[2.5rem] border border-stone-100 flex flex-col">
      <h3 className="text-xl font-bold text-[#5D1717]">Revenue Streams</h3>
      <p className="text-[10px] text-stone-400 mt-1 uppercase font-bold tracking-widest mb-10">Allocation by bespoke category</p>
      
      <div className="space-y-8 flex-1">
        {dashboard.revenueStreams.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-xs font-bold text-stone-800 mb-2 uppercase tracking-tighter">
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-stone-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#5D1717]"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <button className="mt-10 flex items-center justify-center gap-2 text-[#5D1717] text-xs font-bold border-t border-stone-50 pt-8 hover:opacity-70 transition-opacity">
        <Download size={14} /> Download Financial Digest
      </button>
    </div>
  </div>
</div>
  );
}