import { unstable_cache } from "next/cache";
import { supabase } from "./supabaseClient";
import { samplePlants, sampleFertilizers, sampleServices } from "@/data/sampleData";

async function fetchPlants() {
  if (!supabase) return samplePlants;
  const { data, error } = await supabase
    .from("plants")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data || data.length === 0) return samplePlants.filter((p) => p.in_stock !== false);
  return data.filter((p) => p.in_stock !== false);
}

async function fetchPlantBySlug(slug) {
  if (!supabase) return samplePlants.find((p) => p.slug === slug) || null;
  const { data, error } = await supabase
    .from("plants")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return samplePlants.find((p) => p.slug === slug) || null;
  return data;
}

async function fetchFertilizers() {
  if (!supabase) return sampleFertilizers;
  const { data, error } = await supabase
    .from("fertilizers")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data || data.length === 0) return sampleFertilizers.filter((p) => p.in_stock !== false);
  return data.filter((p) => p.in_stock !== false);
}

async function fetchPlantsPage(page = 1, pageSize = 10) {
  if (!supabase) {
    const visible = samplePlants.filter((p) => p.in_stock !== false);
    const start = (page - 1) * pageSize;
    return {
      items: visible.slice(start, start + pageSize),
      total: visible.length,
    };
  }
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;
  const { data, count, error } = await supabase
    .from("plants")
    .select("*", { count: "exact" })
    .eq("in_stock", true)
    .order("created_at", { ascending: false })
    .range(start, end);
  if (error) return fetchPlantsPage(page, pageSize);
  return { items: data || [], total: count || 0 };
}

async function fetchFertilizersPage(page = 1, pageSize = 10) {
  if (!supabase) {
    const visible = sampleFertilizers.filter((p) => p.in_stock !== false);
    const start = (page - 1) * pageSize;
    return {
      items: visible.slice(start, start + pageSize),
      total: visible.length,
    };
  }
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;
  const { data, count, error } = await supabase
    .from("fertilizers")
    .select("*", { count: "exact" })
    .eq("in_stock", true)
    .order("created_at", { ascending: false })
    .range(start, end);
  if (error) return fetchFertilizersPage(page, pageSize);
  return { items: data || [], total: count || 0 };
}

async function fetchServices() {
  if (!supabase) return sampleServices;
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data || data.length === 0) return sampleServices;
  return data;
}

export const getPlants = unstable_cache(fetchPlants, ["plants"], {
  revalidate: 10,
  tags: ["plants"],
});

export const getPlantBySlug = unstable_cache(
  fetchPlantBySlug,
  ["plant-by-slug"],
  {
    revalidate: 10,
    tags: ["plants"],
  },
);

export const getFertilizers = unstable_cache(fetchFertilizers, ["fertilizers"], {
  revalidate: 10,
  tags: ["fertilizers"],
});

export const getPlantsPage = fetchPlantsPage;
export const getFertilizersPage = fetchFertilizersPage;

export const getServices = unstable_cache(fetchServices, ["services"], {
  revalidate: 10,
  tags: ["services"],
});
