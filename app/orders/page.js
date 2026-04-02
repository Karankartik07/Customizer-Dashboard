"use client";

import React, { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data.orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-[#6f1f3f]">Orders</h1>
      <p className="text-sm text-[#6f4f5f]">
        View current orders, status, and fulfillment tracking.
      </p>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-[#7f5e6f]">
                <th className="py-2">Order #</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Status</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="py-2">{order.id}</td>
                  <td className="py-2">{order.customer}</td>
                  <td className="py-2">{order.status}</td>
                  <td className="py-2">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
