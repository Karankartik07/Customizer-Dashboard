"use client";

import React, { useEffect, useState } from "react";

export default function ProductSavedPage() {
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSaved() {
      try {
        const res = await fetch("/api/product-saved");
        if (!res.ok) throw new Error("Failed to fetch saved products");
        const data = await res.json();
        setSavedItems(data.saved);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSaved();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-[#6f1f3f]">Product Saved</h1>
      <p className="text-sm text-[#6f4f5f]">
        Track and manage saved items and user wishlists.
      </p>

      {loading && <p>Loading saved items...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <ul className="space-y-2 text-sm text-[#5b3a4f]">
            {savedItems.map((item) => (
              <li key={item.id} className="rounded-lg border px-4 py-3">
                <strong>{item.name}</strong>
                <span className="block text-xs text-[#8a6478]">
                  Saved on {item.savedAt}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
