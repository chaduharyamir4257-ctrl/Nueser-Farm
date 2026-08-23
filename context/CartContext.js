"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getPromoState } from "@/lib/promo";

const CartContext = createContext(null);
const CART_KEY = "khalil_nursery_cart";
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923474254696";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Load saved cart once, on first mount in the browser
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY)) || [];
      setCart(saved);
    } catch {
      setCart([]);
    }
  }, []);

  // Persist every change automatically — this replaces every manual
  // saveCart() call the old script.js needed on every page
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const showToast = useCallback((text) => {
    setToast(text);
    setTimeout(() => setToast(null), 2600);
  }, []);

  const addToCart = useCallback((itemOrName, price, qty = 1) => {
    const item =
      typeof itemOrName === "object" && itemOrName
        ? itemOrName
        : { name: itemOrName, price };
    const promo = getPromoState(item);
    const unitPrice = promo.active ? promo.salePrice : Number(item.price || 0);
    const originalPrice = Number(item.price || 0);

    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name
            ? {
                ...i,
                qty: i.qty + qty,
                price: unitPrice,
                originalPrice,
                salePrice: promo.active ? promo.salePrice : null,
                promoLabel: promo.promoLabel,
                discountPercent: promo.discountPercent,
              }
            : i
        );
      }
      return [
        ...prev,
        {
          name: item.name,
          price: unitPrice,
          originalPrice,
          salePrice: promo.active ? promo.salePrice : null,
          promoLabel: promo.promoLabel,
          discountPercent: promo.discountPercent,
          qty,
        },
      ];
    });
    showToast(`${item.name} added to your list`);
    setPanelOpen(true);
  }, [showToast]);

  const removeFromCart = useCallback((name) => {
    setCart((prev) => prev.filter((i) => i.name !== name));
  }, []);

  const updateCartQty = useCallback((name, qty) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name
            ? { ...item, qty: Math.max(1, qty) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  }, []);

  const incrementCartQty = useCallback((name) => {
    setCart((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, qty: item.qty + 1 } : item
      )
    );
  }, []);

  const decrementCartQty = useCallback((name) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const sendToWhatsApp = useCallback(() => {
    if (cart.length === 0) return;
    let msg = "Hi! I'm interested in the following plants from Ghous Ali Nursery Farm:\n\n";
    cart.forEach((i) => {
      msg += `- ${i.name} x${i.qty}`;
      if (i.originalPrice && i.originalPrice > i.price) {
        msg += `\n  Original: Rs ${i.originalPrice.toLocaleString()}`;
        msg += `\n  Sale: Rs ${i.price.toLocaleString()}`;
        if (i.discountPercent) msg += `\n  Discount: ${i.discountPercent}%`;
      } else {
        msg += ` (Rs ${(i.price * i.qty).toLocaleString()})`;
      }
      msg += "\n";
    });
    msg += `\nTotal: Rs ${cartTotal.toLocaleString()}\n\nCould you confirm availability and delivery/pickup options?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");

    // THE FIX: the old site never cleared the list after sending —
    // this is the one line that was missing.
    clearCart();
    setPanelOpen(false);
    showToast("List sent — your cart has been cleared");
  }, [cart, cartTotal, clearCart, showToast]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateCartQty,
        incrementCartQty,
        decrementCartQty,
        clearCart,
        sendToWhatsApp,
        isPanelOpen,
        openCart: () => setPanelOpen(true),
        closeCart: () => setPanelOpen(false),
        toast,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
