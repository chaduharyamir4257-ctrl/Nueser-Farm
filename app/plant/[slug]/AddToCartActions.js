"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice, getPromoState } from "@/lib/promo";

export default function AddToCartActions({ plant }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const promo = getPromoState(plant);

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-[13.5px] font-semibold">Quantity</span>
        <div className="flex items-center border border-line rounded-full overflow-hidden">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 bg-cream-card">−</button>
          <span className="w-9 text-center font-semibold">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} className="w-9 h-9 bg-cream-card">+</button>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => addToCart(plant, plant.price, qty)}
          className="px-6 py-3.5 rounded-full text-sm font-semibold bg-forest-dark text-cream hover:bg-forest transition"
        >
          Add to my list
        </button>
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923474254696"}?text=${encodeURIComponent(
            `Hi! I want to order ${plant.name}.\n` +
              `Quantity: ${qty}\n` +
              (promo.active
                ? `Original price: ${formatPrice(promo.originalPrice)}\nSale price: ${formatPrice(promo.salePrice)}\nDiscount: ${promo.discountPercent}%\n`
                : `Price: ${formatPrice(plant.price)}\n`) +
              `\nPlease confirm availability.`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3.5 rounded-full text-sm font-semibold border border-forest-dark text-forest-dark hover:bg-forest-dark hover:text-cream transition"
        >
          Ask on WhatsApp
        </a>
      </div>
    </>
  );
}
