"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { sampleFertilizers } from "@/data/sampleData";
import AdminTable from "@/components/admin/AdminTable";
import { getPromoState } from "@/lib/promo";

export default function AdminFertilizersPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [promoFilter, setPromoFilter] = useState("all");

  async function load() {
    setLoading(true);
    if (!supabase) {
      setItems(sampleFertilizers);
      setLoading(false);
      return;
    }
    const { data } = await supabase.from("fertilizers").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(item) {
    if (!supabase) return;
    await supabase.from("fertilizers").delete().eq("id", item.id);
    load();
  }

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((item) => {
      const promo = getPromoState(item);
      const matchesSearch =
        !query ||
        [item.name, item.category, item.description]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));
      const matchesPromo =
        promoFilter === "all" ||
        (promoFilter === "sale" && promo.discountPercent > 0) ||
        (promoFilter === "new" && promo.badges.includes("New")) ||
        (promoFilter === "featured" && promo.badges.includes("Featured")) ||
        (promoFilter === "stock" && item.in_stock !== false) ||
        (promoFilter === "outstock" && item.in_stock === false);
      return matchesSearch && matchesPromo;
    });
  }, [items, search, promoFilter]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 rounded-[28px] border border-line bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay-dark">Products</p>
          <h1 className="mt-2 text-2xl text-forest-dark">Fertilizers & Pots</h1>
          <p className="text-ink-soft text-sm">{filteredItems.length} shown of {items.length} products</p>
        </div>
        <Link href="/administration/fertilizers/new" className="px-5 py-2.5 rounded-full text-sm font-semibold bg-forest-dark text-cream hover:bg-forest transition">
          + Add new
        </Link>
      </div>

      <div className="mb-6 grid gap-3 rounded-[24px] border border-line bg-white p-4 shadow-sm md:grid-cols-[1fr_0.7fr]">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search fertilizers by name or description..."
          className="w-full rounded-full border border-line bg-cream-card px-4 py-3 text-sm text-forest-dark outline-none placeholder:text-ink-soft"
        />
        <select
          value={promoFilter}
          onChange={(e) => setPromoFilter(e.target.value)}
          className="w-full rounded-full border border-line bg-white px-4 py-3 text-sm text-forest-dark outline-none"
        >
          <option value="all">All promo states</option>
          <option value="sale">On sale</option>
          <option value="new">New arrival</option>
          <option value="featured">Featured</option>
          <option value="stock">In stock</option>
          <option value="outstock">Out of stock</option>
        </select>
      </div>

      {loading ? (
        <p className="text-ink-soft text-sm">Loading…</p>
      ) : (
        <AdminTable
          items={filteredItems}
          basePath="/administration/fertilizers"
          onDelete={handleDelete}
          columns={[
            { key: "name", label: "Name" },
            {
              key: "promo",
              label: "Pricing",
              render: (i) => {
                const price = Number(i.price);
                const discount = Number(i.discount_percent || 0);
                if (!price) return "-";
                const discountedPrice = discount > 0 ? Math.max(0, Math.round(price - (price * discount) / 100)) : price;
                return (
                  <div className="min-w-[170px]">
                    {discount > 0 ? (
                      <>
                        <div className="text-xs text-ink-soft line-through">Rs {price.toLocaleString()}</div>
                        <div className="font-semibold text-forest-dark">Rs {discountedPrice.toLocaleString()}</div>
                      </>
                    ) : (
                      <div className="font-semibold text-forest-dark">Rs {price.toLocaleString()}</div>
                    )}
                  </div>
                );
              },
            },
            {
              key: "discount_percent",
              label: "Discount",
              render: (i) => {
                const promo = getPromoState(i);
                return promo.discountPercent > 0 ? (
                  <span className="inline-flex rounded-full bg-sage-light px-3 py-1 text-xs font-semibold text-forest-dark">
                    {promo.discountPercent}%
                  </span>
                ) : (
                  <span className="text-xs text-ink-soft">None</span>
                );
              },
            },
            {
              key: "promo_tags",
              label: "Tags",
              render: (i) => {
                const promo = getPromoState(i);
                return promo.badges.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {promo.badges.map((badge) => (
                      <span
                        key={badge}
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                          badge === "Sale" ? "bg-clay text-white" : "bg-sage-light text-forest-dark"
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-ink-soft">None</span>
                );
              },
            },
            { key: "in_stock", label: "Stock", render: (i) => (i.in_stock === false ? "Out of stock" : "In stock") },
          ]}
        />
      )}
    </div>
  );
}


