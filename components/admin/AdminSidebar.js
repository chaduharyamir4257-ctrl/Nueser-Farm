"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const links = [
  { href: "/administration", label: "Dashboard", short: "Home", exact: true },
  { href: "/administration/plants", label: "Plants", short: "Plants" },
  { href: "/administration/fertilizers", label: "Fertilizers & Pots", short: "Products" },
  { href: "/administration/clients", label: "Clients", short: "Clients" },
  { href: "/administration/inquiries", label: "Inquiries", short: "Inbox" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await supabase?.auth.signOut();
    router.replace("/administration/login");
  }

  return (
    <aside className="w-full shrink-0 border-r border-white/10 bg-gradient-to-b from-emerald-950 via-forest-dark to-[#102817] text-cream shadow-[18px_0_40px_-28px_rgba(18,35,24,0.6)] md:sticky md:top-0 md:flex md:h-screen md:w-72 md:flex-col">
      <div className="p-5 md:p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white">
            <img src="/images/logo.jpeg" alt="" className="h-full w-full object-contain p-1" />
          </div>
          <div>
            <div className="font-serif text-lg leading-tight">Ghous Ali Nursery</div>
            <div className="text-xs uppercase tracking-[0.18em] text-cream/60">Admin panel</div>
          </div>
        </div>
      </div>
      <nav className="p-3 flex gap-2 overflow-x-auto md:flex-1 md:flex-col md:overflow-visible md:p-4">
        {links.map((l) => {
          const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap px-4 py-3 rounded-2xl text-sm font-semibold transition ${
                active ? "bg-white text-forest-dark shadow-sm" : "text-cream/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="md:hidden">{l.short}</span>
              <span className="hidden md:inline">{l.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="hidden shrink-0 border-t border-white/10 px-4 py-5 md:block">
        <Link href="/" className="block rounded-2xl bg-white/10 px-4 py-3 text-sm text-cream/90 hover:bg-white/20 transition">
          Open live store
        </Link>
        <button onClick={handleLogout} className="block w-full text-left rounded-2xl bg-cream text-forest-dark px-4 py-3 mt-3 font-semibold hover:bg-white transition">
          Log out
        </button>
      </div>
    </aside>
  );
}

