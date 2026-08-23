import Link from "next/link";
import Image from "next/image";

function IconLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D7C27A]/40 bg-[#F3D57A] text-forest-dark shadow-[0_6px_18px_rgba(0,0,0,0.18)] transition hover:bg-[#FFE08C] hover:scale-105"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-cream/75 pt-14 pb-6">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-9 pb-10">
          <div>
            <div className="flex items-center gap-3 font-serif text-xl text-cream mb-3.5">
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-cream/15 bg-white/95 shadow-sm">
                <Image src="/images/logo.jpeg" alt="Ghous Ali Nursery Farm logo" width={48} height={48} className="h-full w-full object-contain p-1" />
              </span>
              <span>Ghous Ali Nursery Farm</span>
            </div>
            <p className="text-[13.5px] max-w-[260px]">Plants, pots, fertilizers, and garden design for Lahore and nearby areas.</p>
            <div className="mt-5 flex gap-3">
              <IconLink href="https://www.facebook.com/people/Ghous-Ali-Nursery-Farm-and-Landscaping/61580311775447/?locale=fi_FI" label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M13.5 22v-8h2.7l.4-3h-3.1V8.9c0-.9.2-1.4 1.4-1.4H16.7V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.2H8v3h2.6v8h2.9Z"/></svg>
              </IconLink>
              <IconLink href="https://www.instagram.com/ghous_ali_nursery_farm/" label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2Zm0 2A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2Zm5-3.1a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z"/></svg>
              </IconLink>
              <IconLink href="https://www.tiktok.com/@fruitplants425?_r=1&_t=ZS-98lk1YU8VKX----tiktok" label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M16.5 3c.5 1.8 1.6 3.1 3.5 3.4v2.7c-1.1 0-2.1-.3-3-.8v5.8a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v3a2.9 2.9 0 1 0 2.1 2.8V3h2.4Z"/></svg>
              </IconLink>
              <IconLink href="mailto:chaduhary.amir4257@gmail.com" label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/></svg>
              </IconLink>
            </div>
          </div>
          <div>
            <h4 className="text-cream font-serif text-base mb-4">Explore</h4>
            <Link href="/plants" className="block text-[13.5px] mb-2.5 hover:text-gold transition">All plants</Link>
            <Link href="/fertilizers" className="block text-[13.5px] mb-2.5 hover:text-gold transition">Fertilizers &amp; sprays</Link>
            <Link href="/services" className="block text-[13.5px] mb-2.5 hover:text-gold transition">Landscape design</Link>
          </div>
          <div>
            <h4 className="text-cream font-serif text-base mb-4">Company</h4>
            <Link href="/contact" className="block text-[13.5px] mb-2.5 hover:text-gold transition">Contact us</Link>
            <Link href="/contact" className="block text-[13.5px] mb-2.5 hover:text-gold transition">Visit the nursery</Link>
            <Link href="/contact" className="block text-[13.5px] mb-2.5 hover:text-gold transition">Order inquiries</Link>
          </div>
          <div>
            <h4 className="text-cream font-serif text-base mb-4">Say hello</h4>
            <Link href="/contact" className="block text-[13.5px] mb-2.5 hover:text-gold transition">Contact form</Link>
            <p className="text-[13.5px]">Use the icons to reach us on the channels you prefer.</p>
          </div>
        </div>
        <div className="border-t border-cream/15 pt-5 flex flex-wrap justify-between gap-2.5 text-[12.5px]">
          <span>© {new Date().getFullYear()} Ghous Ali Nursery Farm. All rights reserved.</span>
          <span>Made with care, one plant at a time.</span>
        </div>
      </div>
    </footer>
  );
}
