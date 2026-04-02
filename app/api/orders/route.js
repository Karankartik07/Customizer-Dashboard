export async function GET() {
  const data = {
    orders: [
      { id: 101, customer: "Sophia Reed", status: "Shipped", total: "$3,100" },
      {
        id: 102,
        customer: "Luca Moretti",
        status: "Processing",
        total: "$740",
      },
      {
        id: 103,
        customer: "Amara Patel",
        status: "Delivered",
        total: "$1,210",
      },
    ],
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
