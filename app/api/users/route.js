export async function GET() {
  const data = {
    users: [
      { id: 1, name: "Julian Beaumont", role: "Master Curator" },
      { id: 2, name: "Avery Lane", role: "Product Manager" },
      { id: 3, name: "Nikhil Sharma", role: "Order Specialist" },
    ],
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
