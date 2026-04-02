export async function GET() {
  const data = {
    metrics: [
      { label: "TOTAL PRODUCTS", value: "1,248", trend: "+12% this month" },
      { label: "PRODUCT SAVED", value: "8,912", trend: "+5.2% this week" },
      { label: "TOTAL ORDERS", value: "452", trend: "+24% vs last period" },
      {
        label: "TOTAL REVENUE",
        value: "$142.8k",
        trend: "Top performing year",
        highlight: true,
      },
    ],
    orderTrajectory: {
      points: [120, 180, 140, 220, 270, 230, 300],
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    revenueStreams: [
      { label: "Tailored Apparel", value: 64 },
      { label: "Leather Goods", value: 22 },
      { label: "Accessories", value: 14 },
    ],
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
