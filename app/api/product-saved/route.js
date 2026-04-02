export async function GET() {
  const data = {
    saved: [
      { id: 1, name: "Vintage Quilted Bag", savedAt: "2026-03-24" },
      { id: 2, name: "Limited Edition Scarf", savedAt: "2026-03-29" },
    ],
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
