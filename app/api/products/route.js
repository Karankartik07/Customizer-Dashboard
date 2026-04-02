export async function GET() {
  const data = {
    products: [
      {
        id: 1,
        name: "Bespoke Leather Jacket",
        status: "Active",
        price: "$520",
      },
      {
        id: 2,
        name: "Savile Row Suit",
        status: "Out of Stock",
        price: "$1,200",
      },
      { id: 3, name: "Custom Tailored Shirt", status: "Active", price: "$180" },
    ],
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
