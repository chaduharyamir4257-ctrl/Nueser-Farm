"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ImageUploader from "@/components/admin/ImageUploader";

export default function ServiceForm({ initial }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [form, setForm] = useState({
    title: initial?.title || "",
    category: initial?.category || "",
    description: initial?.description || "",
    image_url: initial?.image_url || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!supabase) {
      setError("Supabase isn't connected — add your project keys to .env.local first.");
      return;
    }
    setSaving(true);
    const query = isEdit
      ? supabase.from("services").update(form).eq("id", initial.id)
      : supabase.from("services").insert(form);
    const { error: saveError } = await query;
    setSaving(false);
    if (saveError) { setError(saveError.message); return; }
    router.push("/administration/services");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-5">
      <div className="rounded-3xl border border-line bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-forest-dark">Title</label>
          <input required value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="e.g. Full landscape design" className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm" />
        </div>

        <div className="flex flex-col gap-1.5 mt-5">
          <label className="text-[13px] font-semibold text-forest-dark">Category / size label</label>
          <input value={form.category} onChange={(e) => update("category", e.target.value)} placeholder="e.g. Residential · 1200 sq ft" className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm" />
        </div>

        <div className="flex flex-col gap-1.5 mt-5">
          <label className="text-[13px] font-semibold text-forest-dark">Description</label>
          <textarea value={form.description} onChange={(e) => update("description", e.target.value)} className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] min-h-[100px] shadow-sm" />
        </div>
      </div>

      <ImageUploader value={form.image_url} onChange={(url) => update("image_url", url)} />

      {error && <p className="text-sm text-clay-dark">{error}</p>}

      <button type="submit" disabled={saving} className="px-6 py-3.5 rounded-full text-sm font-semibold bg-forest-dark text-cream hover:bg-forest transition disabled:opacity-60 self-start">
        {saving ? "Saving…" : isEdit ? "Save changes" : "Create service"}
      </button>
    </form>
  );
}


