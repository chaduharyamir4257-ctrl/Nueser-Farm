"use client";

import { useMemo, useState } from "react";
import PlantCard from "@/components/PlantCard";
import { getPromoState } from "@/lib/promo";

const filters = [
  { key: "all", label: "All plants" },
  { key: "indoor", label: "Indoor" },
  { key: "outdoor", label: "Outdoor" },
  { key: "succulent", label: "Succulents" },
  { key: "flowering", label: "Flowering" },
];
const pageSize = 10;

export default function PlantsGrid({ initialPlants, total }) {
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");
  const [promoFilter, setPromoFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [plants, setPlants] = useState(initialPlants || []);
  const [loadingMore, setLoadingMore] = useState(false);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return plants.filter((plant) => {
      const matchesCategory = active === "all" || plant.category === active;
      const promo = getPromoState(plant);
      const matchesPromo =
        promoFilter === "all" ||
        (promoFilter === "sale" && promo.discountPercent > 0) ||
        (promoFilter === "new" && promo.badges.includes("New")) ||
        (promoFilter === "featured" && promo.badges.includes("Featured")) ||
        (promoFilter === "stock" && plant.in_stock !== false) ||
        (promoFilter === "outstock" && plant.in_stock === false);
      const matchesSearch =
        !query ||
        [plant.name, plant.category, plant.size, plant.age, plant.description, plant.slug]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));
      return matchesCategory && matchesPromo && matchesSearch;
    });
  }, [active, plants, search, promoFilter]);

  const visiblePlants = useMemo(() => filtered.slice(0, page * pageSize), [filtered, page]);
  const maxPage = Math.max(1, Math.ceil((total || plants.length || 0) / pageSize));

  async function loadMore() {
    if (loadingMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    const response = await fetch(`/api/catalog?type=plants&page=${nextPage}&pageSize=${pageSize}`);
    const data = await response.json();
    setPlants((current) => [...current, ...(data.items || [])]);
    setPage(nextPage);
    setLoadingMore(false);
  }

  return (
    <>
      <div className="mb-6 grid gap-3 rounded-[24px] border border-line bg-white p-4 shadow-sm md:grid-cols-[1fr_0.7fr]">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search plants by name, size, age..."
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
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => {
              setActive(f.key);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-full text-[13.5px] font-medium border transition ${
              active === f.key ? "bg-forest-dark text-cream border-forest-dark" : "bg-cream-card border-line text-ink-soft hover:border-sage"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {visiblePlants.map((p) => <PlantCard key={p.id} plant={p} />)}
      </div>
      {plants.length < total && (
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
