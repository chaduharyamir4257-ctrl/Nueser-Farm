"use client";

import { useCart } from "@/context/CartContext";

export default function AddButton({ item }) {
  const { addToCart } = useCart();
  return (
    <button
      onClick={() => addToCart(item, item.price, 1)}
      className="text-sm font-semibold px-4 py-2 rounded-full bg-clay text-white hover:bg-clay-dark transition"
    >
      Add to list
    </button>
  );
}
