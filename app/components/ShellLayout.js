"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Product Saved", href: "/product-saved" },
  { label: "Orders", href: "/orders" },
  { label: "User Management", href: "/users" },
];

export default function ShellLayout({ children }) {
  const [search, setSearch] = useState("");

  const filteredNav = useMemo(
    () =>
      navItems.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  return (
    <div className="min-h-screen flex">
      <aside className="w-72 bg-white border-r border-[#f1d6d6] p-5 flex flex-col">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#5c1728]">
            ATELIER ADMIN
          </h1>
          <p className="text-xs text-[#7a5a64] uppercase mt-1">
            Luxury Concierge
          </p>
        </div>
        <nav className="space-y-2">
          {filteredNav.length ? (
            filteredNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#58112a] hover:bg-[#f9e6e9]"
              >
                {item.label}
              </Link>
            ))
          ) : (
            <p className="text-sm text-[#8c6a7d]">No routes found</p>
          )}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between border-b border-[#f1d6d6] bg-white p-4">
          <div className="flex items-center gap-3 w-full max-w-lg">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search orders, products or artisans..."
                className="w-full rounded-xl border border-[#e9d8d8] bg-[#fff] px-4 py-2 text-sm placeholder:text-[#aa96a3] focus:outline-none focus:ring-2 focus:ring-[#c67e93]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-lg border border-[#d9bac4] px-3 py-1 text-sm font-bold text-[#6c3f4e] hover:bg-[#f7e2e8]">
              View Orders
            </button>
            <button className="rounded-xl bg-[#7f1f3d] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6f1a35]">
              + Add Product
            </button>
            <div className="flex items-center gap-2 rounded-full border border-[#f1d6d6] bg-[#fff] px-3 py-2">
              <div className="h-8 w-8 rounded-full bg-[#dfb2bf]" />
              <div>
                <p className="text-sm font-semibold text-[#4c2a36]">
                  Julian Beaumont
                </p>
                <p className="text-xs text-[#a3808f]">Master Curator</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
