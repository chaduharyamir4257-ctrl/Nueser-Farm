"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ImageUploader from "@/components/admin/ImageUploader";

function calculateSalePrice(price, discountPercent) {
  const base = Number(price) || 0;
  const discount = Number(discountPercent) || 0;
  if (!base || !discount) return base;
  return Math.max(0, Math.round(base * (1 - discount / 100)));
}

function toIsoOrNull(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export default function FertilizerForm({ initial }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [form, setForm] = useState({
    name: initial?.name || "",
    price: initial?.price ?? "",
    discount_percent: initial?.discount_percent ?? "",
    promo_start_at: initial?.promo_start_at ? String(initial.promo_start_at).slice(0, 16) : "",
    promo_end_at: initial?.promo_end_at ? String(initial.promo_end_at).slice(0, 16) : "",
    is_featured: initial?.is_featured ?? false,
    is_new_arrival: initial?.is_new_arrival ?? false,
    description: initial?.description || "",
    image_url: initial?.image_url || "",
    in_stock: initial?.in_stock ?? true,
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
    const payload = {
      ...form,
      price: Number(form.price) || 0,
      discount_percent: form.discount_percent ? Number(form.discount_percent) : null,
      sale_price: form.discount_percent ? calculateSalePrice(form.price, form.discount_percent) : null,
      promo_label: form.discount_percent ? "Sale" : null,
      promo_tags: [
        form.discount_percent ? "Sale" : null,
        form.is_new_arrival ? "New" : null,
        form.is_featured ? "Featured" : null,
      ].filter(Boolean),
      promo_start_at: toIsoOrNull(form.promo_start_at),
      promo_end_at: toIsoOrNull(form.promo_end_at),
      is_featured: form.is_featured,
      is_new_arrival: form.is_new_arrival,
    };
    const query = isEdit
      ? supabase.from("fertilizers").update(payload).eq("id", initial.id)
      : supabase.from("fertilizers").insert(payload);
    const { error: saveError } = await query;
    setSaving(false);
    if (saveError) { setError(saveError.message); return; }
    router.push("/administration/fertilizers");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-5">
      <div className="rounded-3xl border border-line bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-forest-dark">Name</label>
          <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm" />
        </div>

        <div className="flex flex-col gap-1.5 mt-5">
          <label className="text-[13px] font-semibold text-forest-dark">Price (Rs)</label>
          <input required type="number" min="0" value={form.price} onChange={(e) => update("price", e.target.value)} className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] max-w-[220px] shadow-sm" />
        </div>

        <div className="grid gap-5 mt-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-forest-dark">Sale price</label>
            <input
              type="number"
              min="0"
              value={calculateSalePrice(form.price, form.discount_percent)}
              readOnly
              placeholder="Auto calculated"
              className="px-4 py-3 rounded-3xl border border-line bg-stone-100 text-[14.5px] shadow-sm text-stone-600"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-forest-dark">Discount %</label>
            <input type="number" min="0" max="100" step="0.1" value={form.discount_percent} onChange={(e) => update("discount_percent", e.target.value)} placeholder="Optional" className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm" />
          </div>
        </div>

        <div className="grid gap-5 mt-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-forest-dark">Promo start</label>
            <input type="datetime-local" value={form.promo_start_at} onChange={(e) => update("promo_start_at", e.target.value)} className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-forest-dark">Promo end</label>
            <input type="datetime-local" value={form.promo_end_at} onChange={(e) => update("promo_end_at", e.target.value)} className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm" />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-5">
          <label className="flex items-center gap-2.5 text-sm font-medium text-forest-dark">
            <input type="checkbox" checked={form.is_featured} onChange={(e) => update("is_featured", e.target.checked)} className="w-4 h-4" />
            Featured
          </label>
          <label className="flex items-center gap-2.5 text-sm font-medium text-forest-dark">
            <input type="checkbox" checked={form.is_new_arrival} onChange={(e) => update("is_new_arrival", e.target.checked)} className="w-4 h-4" />
            New arrival
          </label>
        </div>

        {Number(form.discount_percent) > 0 && (
          <p className="mt-4 text-sm text-forest-dark">
            Promo tag will be <span className="font-semibold">Sale</span> while the discount is active.
          </p>
        )}

        <div className="flex flex-col gap-1.5 mt-5">
          <label className="text-[13px] font-semibold text-forest-dark">Description</label>
          <textarea value={form.description} onChange={(e) => update("description", e.target.value)} className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] min-h-[100px] shadow-sm" />
        </div>
      </div>

      <ImageUploader value={form.image_url} onChange={(url) => update("image_url", url)} />

      <label className="flex items-center gap-2.5 text-sm font-medium text-forest-dark">
        <input type="checkbox" checked={form.in_stock} onChange={(e) => update("in_stock", e.target.checked)} className="w-4 h-4 rounded border-line text-forest-dark" />
        In stock / visible on site
      </label>

      {error && <p className="text-sm text-clay-dark">{error}</p>}

      <button type="submit" disabled={saving} className="px-6 py-3.5 rounded-full text-sm font-semibold bg-forest-dark text-cream hover:bg-forest transition disabled:opacity-60 self-start">
        {saving ? "Saving…" : isEdit ? "Save changes" : "Create product"}
      </button>
    </form>
  );
}


