"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AdminTable from "@/components/admin/AdminTable";

export default function AdminClientsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    if (!supabase) {
      setItems([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(item) {
    if (!confirm(`Delete client ${item.name}? This can't be undone.`)) return;
    if (!supabase) return;
    await supabase.from("clients").delete().eq("id", item.id);
    load();
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 rounded-[28px] border border-line bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay-dark">Relationships</p>
          <h1 className="mt-2 text-2xl text-forest-dark">Clients</h1>
          <p className="text-ink-soft text-sm">Trusted clients and leads saved for follow up.</p>
        </div>
        <Link href="/administration/clients/new" className="px-5 py-2.5 rounded-full text-sm font-semibold bg-forest-dark text-cream hover:bg-forest transition">
          + Add new
        </Link>
      </div>

      {loading ? (
        <p className="text-ink-soft text-sm">Loading…</p>
      ) : (
        <AdminTable
          items={items}
          basePath="/administration/clients"
          onDelete={handleDelete}
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            { key: "reference", label: "Reference" },
          ]}
        />
      )}
    </div>
  );
}

