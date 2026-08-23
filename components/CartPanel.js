"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPanel() {
  const {
    cart,
    cartTotal,
    isPanelOpen,
    closeCart,
    removeFromCart,
    incrementCartQty,
    decrementCartQty,
    sendToWhatsApp,
  } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 bg-forest-dark/40 z-[70] transition-opacity ${isPanelOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeCart}
      />
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[380px] max-w-[90vw] bg-cream z-[71] flex flex-col shadow-[-20px_0_40px_-20px_rgba(18,35,24,0.4)] transition-transform duration-300 ${
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-line">
          <h3 className="text-lg font-serif">My list</h3>
          <button onClick={closeCart} aria-label="Close" className="text-ink-soft">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[22px] h-[22px]">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 px-2 text-ink-soft text-sm">
              Your list is empty.<br />Browse plants and tap &quot;Add to my list&quot;.
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.name} className="flex items-start gap-3 py-3.5 border-b border-line">
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-line bg-white shrink-0">
                  {item.image_url ? (
                    <Image src={item.image_url} alt={item.name} fill sizes="56px" className="object-cover" />
                  ) : null}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold mb-0.5">{item.name}</h4>
                      <span className="text-xs text-ink-soft">
                        Rs {item.price.toLocaleString()} each
                      </span>
                    </div>
                    <strong className="text-sm whitespace-nowrap">Rs {(item.price * item.qty).toLocaleString()}</strong>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center rounded-full border border-line bg-white overflow-hidden">
                      <button
                        onClick={() => decrementCartQty(item.name)}
                        className="h-8 w-8 flex items-center justify-center text-forest-dark hover:bg-cream-card"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span className="h-8 min-w-10 px-3 flex items-center justify-center text-sm font-semibold text-forest-dark border-x border-line">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => incrementCartQty(item.name)}
                        className="h-8 w-8 flex items-center justify-center text-forest-dark hover:bg-cream-card"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <button onClick={() => removeFromCart(item.name)} className="text-xs font-semibold text-clay underline">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-6 pt-5 pb-6 border-t border-line">
          <div className="flex justify-between text-[15px] font-semibold mb-4">
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
      </aside>
    </>
  );
}
