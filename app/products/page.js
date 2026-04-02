"use client";

import React, { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-[#6f1f3f]">Products</h1>
      <p className="text-sm text-[#6f4f5f]">
        Manage inventory, descriptions, and pricing.
      </p>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-[#7f5e6f]">
                <th className="py-2">ID</th>
                <th className="py-2">Name</th>
                <th className="py-2">Status</th>
                <th className="py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="py-2">{product.id}</td>
                  <td className="py-2">{product.name}</td>
                  <td className="py-2">{product.status}</td>
                  <td className="py-2">{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
