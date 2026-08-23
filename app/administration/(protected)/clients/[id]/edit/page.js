"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ClientForm from "@/components/admin/ClientForm";

export default function EditClientPage({ params }) {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase.from("clients").select("*").eq("id", params.id).single();
      setClient(data);
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) return <p className="text-ink-soft text-sm">Loading…</p>;
  if (!client) return <p className="text-clay-dark text-sm">Client not found.</p>;

  return (
    <div>
      <h1 className="text-2xl mb-6">Edit {client.name}</h1>
      <ClientForm initial={client} />
    </div>
  );
}

