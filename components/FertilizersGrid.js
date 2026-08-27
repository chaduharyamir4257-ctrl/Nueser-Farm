"use client";

import { useMemo, useState } from "react";
import AddButton from "@/app/fertilizers/AddButton";
import { formatPrice, getPromoState } from "@/lib/promo";

export default function FertilizersGrid({ initialItems, total }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [promoFilter, setPromoFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(initialItems || []);
  const [loadingMore, setLoadingMore] = useState(false);
  const pageSize = 10;

  const categories = useMemo(() => {
    const unique = [...new Set(items.map((item) => item.category || "General"))];
    return ["all", ...unique];
  }, [items]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((item) => {
      const promo = getPromoState(item);
      const matchesCategory = activeCategory === "all" ? true : (item.category || "General") === activeCategory;
      const matchesPromo =
        promoFilter === "all" ||
        (promoFilter === "sale" && promo.discountPercent > 0) ||
        (promoFilter === "new" && promo.badges.includes("New")) ||
        (promoFilter === "featured" && promo.badges.includes("Featured")) ||
        (promoFilter === "stock" && item.in_stock !== false) ||
        (promoFilter === "outstock" && item.in_stock === false);
      const matchesSearch =
        !query ||
        [item.name, item.category, item.description]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));
      return matchesCategory && matchesPromo && matchesSearch;
    });
  }, [activeCategory, items, search, promoFilter]);

  const visibleItems = filtered.slice(0, page * pageSize);
  const maxPage = Math.max(1, Math.ceil((total || items.length || 0) / pageSize));

  function selectCategory(category) {
    setActiveCategory(category);
    setPage(1);
  }

  async function loadMore() {
    if (loadingMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    const response = await fetch(`/api/catalog?type=fertilizers&page=${nextPage}&pageSize=${pageSize}`);
    const data = await response.json();
    setItems((current) => [...current, ...(data.items || [])]);
    setPage(nextPage);
    setLoadingMore(false);
  }

  return (
    <>
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

      <div className="flex gap-2.5 flex-wrap mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => selectCategory(category)}
            className={`px-4 py-2 rounded-full text-[13.5px] font-medium border transition ${
              activeCategory === category ? "bg-forest-dark text-cream border-forest-dark" : "bg-cream-card border-line text-ink-soft hover:border-sage"
            }`}
          >
            {category === "all" ? "All items" : category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {visibleItems.map((item) => (
          <div key={item.id} className="bg-cream-card border border-line rounded-[20px] overflow-hidden shadow-sm">
            <div className="relative aspect-[4/3]">
              <img src={item.image_url} alt={item.name} className="object-cover w-full h-full" />
              <span className="absolute left-3 top-3 rounded-full bg-cream-card/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-forest-dark">
                {item.category || "General"}
              </span>
            </div>
            <div className="p-6">
              <span className="text-[11px] uppercase tracking-[0.24em] text-clay-dark">{item.category || "General"}</span>
              <h3 className="mt-3 text-xl font-semibold text-forest-dark">{item.name}</h3>
              <p className="mt-3 text-sm text-ink-soft leading-6 min-h-[68px]">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {getPromoState(item).badges.map((badge) => (
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
              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  {getPromoState(item).active ? (
                    <>
                      <span className="text-xs text-ink-soft line-through">{formatPrice(getPromoState(item).originalPrice)}</span>
                      <span className="font-serif text-clay-dark font-semibold">{formatPrice(getPromoState(item).salePrice)}</span>
                    </>
                  ) : (
                    <span className="font-serif text-clay-dark font-semibold">{formatPrice(item.price)}</span>
                  )}
                </div>
                <AddButton item={item} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length < total && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="rounded-full bg-forest-dark px-6 py-3 text-sm font-semibold text-cream hover:bg-forest transition"
          >
            {loadingMore ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </>
  );
}
