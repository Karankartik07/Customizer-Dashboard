"use client";

import React, { useEffect, useState } from "react";

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

  if (error) {
    return <div className="text-red-600">Error loading dashboard: {error}</div>;
  }

  if (!dashboard) {
    return <div className="text-[#6f1f3f]">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboard.metrics.map((card) => (
          <article
            key={card.label}
            className={`rounded-2xl border p-5 shadow-sm ${card.highlight ? "bg-[#681f32] text-white" : "bg-white"}`}
          >
            <p className="text-xs tracking-widest text-[#7b4f60]">
              {card.label}
            </p>
            <h2
              className={`mt-2 text-4xl font-bold ${card.highlight ? "text-white" : "text-[#651824]"}`}
            >
              {card.value}
            </h2>
            <p
              className={`mt-1 text-sm font-semibold ${card.highlight ? "text-[#f7d6e2]" : "text-[#77616f]"}`}
            >
              {card.trend}
            </p>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-bold text-[#6f1f3f]">
            Order Trajectory
          </h3>
          <p className="mt-2 text-sm text-[#6f4f5f]">
            Performance metrics across curated collections
          </p>
          <div className="mt-6 h-52 rounded-xl bg-gradient-to-r from-[#f3e8e9] to-[#fff6f5] p-4">
            <ul className="flex h-full items-center justify-between text-xs text-[#7f5e6b]">
              {dashboard.orderTrajectory.labels.map((label, index) => (
                <li key={label} className="flex-1 text-center">
                  {label}: {dashboard.orderTrajectory.points[index]}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-bold text-[#6f1f3f]">Revenue Streams</h3>
          <p className="mt-2 text-sm text-[#6f4f5f]">
            Allocation by bespoke category
          </p>
          {dashboard.revenueStreams.map((item) => (
            <div key={item.label} className="mt-4">
              <div className="flex justify-between text-sm font-semibold text-[#5a3744]">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-[#f4dce0]">
                <div
                  className="h-2 rounded-full bg-[#7f1f3d]"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
