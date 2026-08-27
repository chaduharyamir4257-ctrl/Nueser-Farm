"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { samplePlants } from "@/data/sampleData";
import AdminTable from "@/components/admin/AdminTable";
import { getPromoState } from "@/lib/promo";

export default function AdminPlantsPage() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [promoFilter, setPromoFilter] = useState("all");

  async function load() {
    setLoading(true);
    if (!supabase) {
      setPlants(samplePlants);
      setLoading(false);
      return;
    }
    const { data } = await supabase.from("plants").select("*").order("created_at", { ascending: false });
    setPlants(data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(item) {
    if (!supabase) return;
    await supabase.from("plants").delete().eq("id", item.id);
    load();
  }

  const categories = useMemo(() => ["all", ...new Set(plants.map((item) => item.category).filter(Boolean))], [plants]);
  const filteredPlants = useMemo(() => {
    const query = search.trim().toLowerCase();
    return plants.filter((item) => {
      const promo = getPromoState(item);
      const matchesSearch =
        !query ||
        [item.name, item.category, item.size, item.age, item.description, item.slug]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      const matchesPromo =
        promoFilter === "all" ||
        (promoFilter === "sale" && promo.discountPercent > 0) ||
        (promoFilter === "new" && promo.badges.includes("New")) ||
        (promoFilter === "featured" && promo.badges.includes("Featured")) ||
        (promoFilter === "stock" && item.in_stock !== false) ||
        (promoFilter === "outstock" && item.in_stock === false);
      return matchesSearch && matchesCategory && matchesPromo;
    });
  }, [plants, search, categoryFilter, promoFilter]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 rounded-[28px] border border-line bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay-dark">Catalog</p>
          <h1 className="mt-2 text-2xl text-forest-dark">Plants</h1>
          <p className="text-ink-soft text-sm">{filteredPlants.length} shown of {plants.length} in catalog</p>
        </div>
        <Link href="/administration/plants/new" className="px-5 py-2.5 rounded-full text-sm font-semibold bg-forest-dark text-cream hover:bg-forest transition">
          + Add new
        </Link>
      </div>

      <div className="mb-6 grid gap-3 rounded-[24px] border border-line bg-white p-4 shadow-sm md:grid-cols-[1.3fr_0.7fr_0.7fr]">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search plants by name, category, size, age..."
          className="w-full rounded-full border border-line bg-cream-card px-4 py-3 text-sm text-forest-dark outline-none placeholder:text-ink-soft"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full rounded-full border border-line bg-white px-4 py-3 text-sm text-forest-dark outline-none"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all" ? "All categories" : category}
            </option>
          ))}
        </select>
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
          items={filteredPlants}
          basePath="/administration/plants"
          onDelete={handleDelete}
          columns={[
            { key: "name", label: "Name" },
            { key: "category", label: "Category" },
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


