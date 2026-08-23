"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice, getPromoState } from "@/lib/promo";

export default function PlantCard({ plant }) {
  const { addToCart } = useCart();
  const [fav, setFav] = useState(false);
  const promo = getPromoState(plant);

  return (
    <div className="bg-cream-card border border-line rounded-[20px] overflow-hidden group">
      <div className="relative aspect-[4/3.4]">
        <Image src={plant.image_url} alt={plant.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover" />
        <span className="absolute left-3 top-3 bg-cream-card/90 text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full text-forest-dark">
          {plant.category}
        </span>
        <button
          onClick={() => setFav((v) => !v)}
          aria-label="Save to wishlist"
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-cream-card/90 flex items-center justify-center ${fav ? "text-clay" : "text-ink-soft"}`}
        >
          <svg viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9Z" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg mb-1">{plant.name}</h3>
        <div className="text-xs text-ink-soft mb-3">{plant.size} · {plant.age}</div>
        <div className="mb-3 flex flex-wrap gap-2">
          {promo.badges.map((badge) => (
            <span
              key={badge}
              className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                badge === "Sale" ? "bg-clay text-white" : "bg-sage-light text-forest-dark"
              }`}
            >
              {badge}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {promo.active ? (
              <>
                <span className="text-xs text-ink-soft line-through">{formatPrice(promo.originalPrice)}</span>
                <span className="font-serif text-clay-dark font-semibold">{formatPrice(promo.salePrice)}</span>
              </>
            ) : (
              <span className="font-serif text-clay-dark font-semibold">{formatPrice(plant.price)}</span>
            )}
          </div>
          {plant.slug ? (
            <Link href={`/plant/${plant.slug}`} className="text-sm font-semibold px-4 py-2 rounded-full bg-cream border border-line hover:bg-white transition">
              View
            </Link>
          ) : (
            <button
              onClick={() => addToCart(plant, plant.price, 1)}
              className="text-sm font-semibold px-4 py-2 rounded-full bg-cream border border-line hover:bg-white transition"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
