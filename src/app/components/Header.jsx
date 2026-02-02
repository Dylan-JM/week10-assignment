"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Stripe Shop
        </Link>

        <nav className="flex items-centre gap-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-gray-900 transition"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-gray-900 transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-gray-900 transition"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
