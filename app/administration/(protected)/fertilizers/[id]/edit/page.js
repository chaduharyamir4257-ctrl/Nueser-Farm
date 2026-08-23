"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import FertilizerForm from "@/components/admin/FertilizerForm";

export default function EditFertilizerPage({ params }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase.from("fertilizers").select("*").eq("id", params.id).single();
      setItem(data);
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) return <p className="text-ink-soft text-sm">Loading…</p>;
  if (!item) return <p className="text-clay-dark text-sm">Product not found.</p>;

  return (
    <div>
      <h1 className="text-2xl mb-6">Edit {item.name}</h1>
      <FertilizerForm initial={item} />
    </div>
  );
}

