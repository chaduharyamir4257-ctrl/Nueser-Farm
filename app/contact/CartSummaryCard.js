"use client";

import { useCart } from "@/context/CartContext";

export default function CartSummaryCard() {
  const { cart, cartTotal, sendToWhatsApp } = useCart();

  return (
    <div className="bg-cream-card border border-line rounded-[20px] p-6">
      <h3 className="text-lg mb-2">Your current list</h3>
      <p className="text-sm text-ink-soft mb-4">Add plants from the catalog, then send it straight to us here.</p>

      <div className="max-h-[220px] overflow-y-auto">
        {cart.length === 0 ? (
          <div className="text-center py-8 text-ink-soft text-sm">Your list is empty.</div>
        ) : (
          cart.map((item) => (
            <div key={item.name} className="flex justify-between py-2.5 border-b border-line text-sm">
              <span>{item.name} × {item.qty}</span>
              <strong>Rs {(item.price * item.qty).toLocaleString()}</strong>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between text-[15px] font-semibold mt-3.5 mb-3.5">
        <span>Total</span>
        <span>Rs {cartTotal.toLocaleString()}</span>
      </div>

      <button
        onClick={sendToWhatsApp}
        disabled={cart.length === 0}
        className="w-full py-3.5 rounded-full text-sm font-semibold bg-clay text-white hover:bg-clay-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send list on WhatsApp
      </button>
    </div>
  );
}
