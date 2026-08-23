"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { samplePlants, sampleFertilizers } from "@/data/sampleData";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ plants: null, fertilizers: null, clients: null, inquiries: null });

  useEffect(() => {
    async function load() {
      if (!supabase) {
        setCounts({
          plants: samplePlants.length,
          fertilizers: sampleFertilizers.length,
          clients: 0,
          inquiries: 0,
        });
        return;
      }
      const [p, f, c, i] = await Promise.all([
        supabase.from("plants").select("id", { count: "exact", head: true }),
        supabase.from("fertilizers").select("id", { count: "exact", head: true }),
        supabase.from("clients").select("id", { count: "exact", head: true }),
        supabase.from("inquiries").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        plants: p.count ?? 0,
        fertilizers: f.count ?? 0,
        clients: c.count ?? 0,
        inquiries: i.count ?? 0,
      });
    }
    load();
  }, []);

  const cards = [
    { label: "Plants", count: counts.plants, href: "/administration/plants", text: "Catalog items visible to customers" },
    { label: "Fertilizers & Pots", count: counts.fertilizers, href: "/administration/fertilizers", text: "Care products and accessories" },
    { label: "Clients", count: counts.clients, href: "/administration/clients", text: "Saved customers and leads" },
    { label: "Inquiries", count: counts.inquiries, href: "/administration/inquiries", text: "Messages from the website" },
  ];

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-[32px] border border-line bg-white shadow-sm">
        <div className="bg-gradient-to-r from-forest-dark to-emerald-800 p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100/80">Control center</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Welcome back</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50/90">
            Manage plants, fertilizers, pots, clients, and customer inquiries for Ghous Ali Nursery Farm.
          </p>
        </div>
      </div>

      {!supabase && (
        <div className="rounded-3xl border border-orange-200 bg-orange-50 px-6 py-5 text-sm text-orange-900 shadow-sm">
          Supabase isn&apos;t connected yet — you&apos;re viewing sample data. Add your project keys to <code className="font-mono text-xs">.env.local</code> to manage the real catalog.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="rounded-[28px] border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-light text-sm font-bold text-forest-dark">
              {c.label[0]}
            </div>
            <div className="text-4xl font-serif text-forest-dark mb-2">{c.count ?? "..."}</div>
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-clay-dark">{c.label}</div>
            <p className="mt-3 text-sm leading-6 text-ink-soft">{c.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

