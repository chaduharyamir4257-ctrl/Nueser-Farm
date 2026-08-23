"use client";

import { useCart } from "@/context/CartContext";

export default function Toast() {
  const { toast } = useCart();

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-forest-dark text-cream px-5.5 py-3 rounded-full text-sm font-medium flex items-center gap-2.5 z-[80] transition-all ${
        toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gold">
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <span>{toast}</span>
    </div>
  );
}
