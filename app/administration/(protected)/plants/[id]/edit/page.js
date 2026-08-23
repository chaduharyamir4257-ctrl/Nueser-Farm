"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import PlantForm from "@/components/admin/PlantForm";

export default function EditPlantPage({ params }) {
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase.from("plants").select("*").eq("id", params.id).single();
      setPlant(data);
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) return <p className="text-ink-soft text-sm">Loading…</p>;
  if (!plant) return <p className="text-clay-dark text-sm">Plant not found.</p>;

  return (
    <div>
      <h1 className="text-2xl mb-6">Edit {plant.name}</h1>
      <PlantForm initial={plant} />
    </div>
  );
}


