"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/plants", label: "Plants" },
  { href: "/fertilizers", label: "Fertilizers" },
  { href: "/services", label: "Landscaping" },
  { href: "/media", label: "Media" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [logoMissing, setLogoMissing] = useState(false);
  const { cartCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-line">
      <div className="max-w-[1180px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Ghous Ali Nursery Farm home">
          <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
            {!logoMissing ? (
              <img
                src="/images/logo.jpeg"
                alt="Ghous Ali Nursery Farm logo"
                className="h-full w-full object-contain p-1"
                onError={() => setLogoMissing(true)}
              />
            ) : (
              <span className="font-serif text-lg font-semibold text-forest-dark">
                GA
              </span>
            )}
          </span>
          <span className="hidden xl:block leading-tight">
            <span className="block font-serif text-[19px] font-semibold text-forest-dark">
              Ghous Ali Nursery
            </span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-clay-dark">
              Farm & Landscaping
            </span>
          </span>
        </Link>

        <nav className={`gap-x-1.5 gap-y-1 lg:gap-x-2 ${navOpen ? "flex flex-col absolute top-full left-0 right-0 bg-cream border-b border-line px-7 pb-4 md:static md:flex-row md:flex-wrap md:items-center md:justify-center md:bg-transparent md:border-0 md:px-0 md:pb-0" : "hidden md:flex md:flex-1 md:flex-wrap md:items-center md:justify-center"}`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setNavOpen(false)}
              className={`text-[13.5px] font-medium px-2.5 py-3 md:py-2 whitespace-nowrap border-b md:border-b-0 border-line rounded-full transition ${
                pathname === l.href ? "bg-sage-light text-forest-dark" : "text-ink-soft hover:bg-cream-card hover:text-forest-dark"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <button
            onClick={openCart}
            aria-label="Open my list"
            className="relative w-10 h-10 rounded-full flex items-center justify-center bg-cream-card border border-line text-forest-dark hover:bg-sage-light hover:-translate-y-0.5 transition"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-[18px] h-[18px]">
              <path d="M3 6h2l2.4 12.2a2 2 0 0 0 2 1.8h8.6a2 2 0 0 0 2-1.6L21.5 9H6.2" />
              <circle cx="10" cy="21" r="1" />
              <circle cx="17" cy="21" r="1" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-clay text-white text-[10.5px] font-bold min-w-[17px] h-[17px] rounded-full flex items-center justify-center px-1">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2" onClick={() => setNavOpen((v) => !v)} aria-label="Toggle menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-6 h-6 text-forest-dark">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
