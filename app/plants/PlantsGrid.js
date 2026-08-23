"use client";

import { useMemo, useState } from "react";
import PlantCard from "@/components/PlantCard";

const filters = [
  { key: "all", label: "All plants" },
  { key: "indoor", label: "Indoor" },
  { key: "outdoor", label: "Outdoor" },
  { key: "succulent", label: "Succulents" },
  { key: "flowering", label: "Flowering" },
];
const pageSize = 10;

export default function PlantsGrid({ plants }) {
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");
  const [promoFilter, setPromoFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return plants.filter((plant) => {
      const matchesCategory = active === "all" || plant.category === active;
      const promo = {
        discount: Number(plant.discount_percent || 0),
        newArrival: Boolean(plant.is_new_arrival),
        featured: Boolean(plant.is_featured),
      };
      const matchesPromo =
        promoFilter === "all" ||
        (promoFilter === "sale" && promo.discount > 0) ||
        (promoFilter === "new" && promo.newArrival) ||
        (promoFilter === "featured" && promo.featured) ||
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
  const maxPage = Math.max(1, Math.ceil(filtered.length / pageSize));

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
      {page < maxPage && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setPage((current) => Math.min(maxPage, current + 1))}
            className="rounded-full bg-forest-dark px-6 py-3 text-sm font-semibold text-cream hover:bg-forest transition"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}
