"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/app/data/products";
import Image from "next/image";
import Link from "next/link";

export default function Success() {
  const params = useSearchParams();
  const productId = params.get("productId");

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <main className="min-h-screen flex items-centre justify-centre">
        <p className="text-xl">Loading…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful
        </h1>

        <p className="text-lg text-gray-700 mb-6">Thank you for your order.</p>

        <div className="border rounded-lg p-4 mb-6">
          <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-xl font-semibold">{product.name}</p>
          <p className="text-gray-600">£{(product.price / 100).toFixed(2)}</p>
          <p className="text-gray-600">Quantity: 1</p>
        </div>

        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
        >
          Return to Shop
        </Link>
      </div>
    </main>
  );
}
