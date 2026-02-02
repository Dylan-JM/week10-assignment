"use client";

import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

import TextAnimation from "./components/EnterAnimation";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
      <TextAnimation>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </TextAnimation>
    </main>
  );
}
