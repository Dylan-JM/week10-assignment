import Image from "next/image";

export default function ProductCard({ product }) {
  const handlePay = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,

        returnUrl: "/success",
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div className="max-w-xs rounded-xl overflow-hidden shadow-md bg-white p-4 flex flex-col items-center gap-3">
      <Image
        src={product.image}
        alt={product.name || "Product"}
        width={300}
        height={300}
        className="rounded-lg object-cover"
      />

      <p className="text-lg font-semibold text-gray-800">{product.name}</p>

      <p className="text-gray-600 text-md">£{product.price / 100}</p>

      <button
        onClick={handlePay}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
      >
        Pay
      </button>
    </div>
  );
}
