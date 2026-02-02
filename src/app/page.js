"use client";

import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Stripe Test Payment
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
