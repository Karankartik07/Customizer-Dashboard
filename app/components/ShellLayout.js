"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Search, Bell, X, Menu, LayoutDashboard, 
  Package, Bookmark, ShoppingBag, Users 
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Products", href: "/products", icon: Package },
  { label: "Product Saved", href: "/product-saved", icon: Bookmark },
  { label: "Orders", href: "/orders", icon: ShoppingBag },
  { label: "User Management", href: "/users", icon: Users },
];

export default function ShellLayout({ children }) {
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const filteredNav = useMemo(
    () => navItems.filter((item) => item.label.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  return (
    /* h-screen and overflow-hidden on this parent container 
       locks the main window so it doesn't scroll as a whole. */
    <div className="h-screen w-full flex bg-[#FFF8F1] overflow-hidden relative font-sans">
      
      {/* SIDEBAR - Slides from left */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-[#f1d6d6] transition-transform duration-300 ease-in-out flex flex-col
        lg:relative lg:translate-x-0 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo Section - flex-shrink-0 keeps it from squishing */}
        <div className="p-8 mb-4 flex justify-between items-center flex-shrink-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#5c1728]">ATELIER ADMIN</h1>
            <p className="text-[10px] font-bold text-[#7a5a64] uppercase mt-1 tracking-widest">Luxury Concierge</p>
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="lg:hidden p-1 text-[#5c1728]">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Nav links - overflow-y-auto allows the sidebar to scroll if items exceed height */}
        <nav className="flex-1 overflow-y-auto">
          {filteredNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`relative flex items-center gap-3 px-8 py-4 text-sm font-semibold transition-all
                  ${isActive ? "bg-[#fdf3f3] text-[#5c1728]" : "text-[#7a5a64] hover:bg-[#faf5f5]"}
                `}
              >
                <Icon className="w-5 h-5" />
                {item.label}
                {isActive && <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#5c1728]" />}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Backdrop */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* RIGHT SIDE CONTAINER - Vertical Flexbox for Header + Main */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        
        {/* HEADER - Stays fixed at the top of the content area */}
        <header className="flex-shrink-0 h-20 flex items-center justify-between bg-white px-8 border-b border-[#fdf3f3] z-30">
          
          {/* SEARCH BAR */}
          <div className="flex items-center gap-3 w-full max-w-lg">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aa96a3]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders, products or artisans..."
                className="w-full rounded-xl border-none bg-[#fdf8f4] pl-10 pr-10 py-2.5 text-sm placeholder:text-[#aa96a3] focus:outline-none focus:ring-1 focus:ring-[#c67e93]"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aa96a3]">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Notifications | Divider | Profile Section */}
          <div className="flex items-center gap-6">
            <button className="relative text-[#7a5a64] p-1">
              <Bell className="w-6 h-6 stroke-[1.5]" />
              <span className="absolute top-1 right-1.5 w-2.5 h-2.5 bg-[#b33a3a] rounded-full border-2 border-white"></span>
            </button>

            <div className="h-10 w-[1px] bg-[#e9d8d8] mx-2" />

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:flex flex-col justify-center">
                <h3 className="xl:text-lg text-s font-bold text-[#5c1728] leading-none mb-1">
                  Julian Beaumont
                </h3>
                <p className="text-[10px] font-bold text-[#7a5a64] uppercase tracking-[0.15em] leading-none">
                  Master Curator
                </p>
              </div>

              <div className="h-12 w-12 rounded-full border border-[#d1d9cc] overflow-hidden flex-shrink-0 bg-[#e3e8de] flex items-center justify-center">
                <img 
                  src="https://res.cloudinary.com/daup99ghe/image/upload/q_auto/f_auto/v1775193397/Admin_Avatar_bfklij.png" 
                  alt="Julian Beaumont" 
                  className="w-full h-full object-cover"
                />
              </div>

              <button 
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 border border-[#f1d6d6] rounded-lg text-[#5c1728] ml-2"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT - This is the only part that scrolls */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
}