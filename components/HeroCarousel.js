"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    eyebrow: "Growing customers' gardens for over 20 years",
    heading: (
      <>
        Your <em>green home</em> starts with healthy plants.
      </>
    ),
    text: "We deliver strong nursery plants, plant care supplies, and professional landscaping services across Lahore.",
    image: "/images/banner.jpeg",
    ctaPrimary: { label: "Browse plants", href: "/plants" },
    ctaSecondary: { label: "Shop fertilizers", href: "/fertilizers" },
  },
  {
    eyebrow: "Full-service landscaping",
    heading: (
      <>
        We design outdoor spaces, <em>start to finish.</em>
      </>
    ),
    text: "Lawns, garden makeovers, and full landscape design — planned and installed by our own team.",
    image: "/images/outdoor.webp",
    ctaPrimary: { label: "See our projects", href: "/services" },
    ctaSecondary: { label: "Get a quote", href: "/contact" },
  },
  {
    eyebrow: "Everything to keep them thriving",
    heading: (
      <>
        Fertilizers, sprays, and <em>expert care.</em>
      </>
    ),
    text: "Organic feed, pest control, and pots — everything your plants need after they come home.",
    image: "/images/Spraying_fertilizer.webp",
    ctaPrimary: { label: "Shop fertilizers", href: "/fertilizers" },
    ctaSecondary: { label: "Talk to us", href: "/contact" },
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      6000,
    );
    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <section className="pt-16">
      <div className="max-w-[1180px] mx-auto px-7 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">

        {/* text side — fades/slides in on change */}
        <div key={active} className="animate-[fadeSlide_0.5s_ease]">
          <span className="inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-widest text-clay-dark mb-4">
            {slide.eyebrow}
          </span>

          <h1
            className="text-[40px] md:text-[56px] leading-tight mb-6 bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(100deg, #0B3D24 0%, #1C6B3F 35%, #3FA65B 65%, #6FCF7C 100%)" }}
          >
            {slide.heading}
          </h1>

          <p className="text-[17px] text-ink-soft max-w-2xl mb-8">{slide.text}</p>

          <div className="flex flex-wrap gap-3.5 mb-6">
            <Link href={slide.ctaPrimary.href} className="px-6 py-3.5 rounded-full text-sm font-semibold bg-forest-dark text-cream hover:bg-forest hover:shadow-soft transition">
              {slide.ctaPrimary.label}
            </Link>
            <Link href={slide.ctaSecondary.href} className="px-6 py-3.5 rounded-full text-sm font-semibold border border-forest-dark text-forest-dark hover:bg-forest-dark hover:text-cream transition">
              {slide.ctaSecondary.label}
            </Link>
          </div>

          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-forest-dark" : "w-2 bg-line"}`}
              />
            ))}
          </div>
        </div>

        {/* image side — gradient frame + inset photo */}
        <div className="relative">
          <div className="absolute -inset-10 -z-10 bg-gradient-to-br from-sage-light/60 via-sage/30 to-clay/20 blur-[80px]" />

          <div className="relative w-full aspect-[4/3]">
            <div
              className="absolute inset-0 bg-gradient-to-br from-gold via-sage to-forest-dark"
              style={{ clipPath: "url(#nursery-blob)" }}
            />
            <div
              key={slide.image}
              className="absolute inset-[6px] overflow-hidden shadow-soft transform-gpu transition-transform duration-500 ease-out hover:scale-[1.02] hover:-rotate-1 animate-[fadeSlide_0.6s_ease]"
              style={{ clipPath: "url(#nursery-blob)", willChange: "transform", backfaceVisibility: "hidden" }}
            >
              <Image src={slide.image} alt="" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 560px" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/25 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="nursery-blob" clipPathUnits="objectBoundingBox">
            <path d="M0.65,0.06 C0.86,0.13 1,0.34 0.96,0.58 C0.93,0.79 0.75,0.95 0.53,0.98 C0.31,1.01 0.08,0.9 0.02,0.68 C-0.04,0.46 0.09,0.22 0.29,0.1 C0.4,0.03 0.53,0 0.65,0.06 Z" />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
}
