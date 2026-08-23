"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { slugify } from "@/lib/slugify";
import ImageUploader from "@/components/admin/ImageUploader";

const categories = ["indoor", "outdoor", "succulent", "flowering"];
const sizeUnits = ["inch", "feet"];
const ageUnits = ["months", "years"];
const lightOptions = [
  { value: "", label: "Select" },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "both", label: "Both" },
];
const wateringOptions = [
  "1-2 days",
  "2-3 days",
  "3-4 days",
  "4-5 days",
  "5-6 days",
  "6-7 days",
  "7-8 days",
  "8-9 days",
  "9-10 days",
  "10-12 days",
];

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

function splitNumericValue(value = "") {
  const match = String(value).trim().match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)?$/);
  return {
    amount: match?.[1] || "",
    unit: match?.[2]?.toLowerCase() || "",
  };
}

export default function PlantForm({ initial }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const initialSize = splitNumericValue(initial?.size || "");
  const initialAge = splitNumericValue(initial?.age || "");
  const [form, setForm] = useState({
    name: initial?.name || "",
    slug: initial?.slug || "",
    category: initial?.category || "indoor",
    sizeAmount: initialSize.amount,
    sizeUnit: sizeUnits.includes(initialSize.unit) ? initialSize.unit : "inch",
    ageAmount: initialAge.amount,
    ageUnit: ageUnits.includes(initialAge.unit) ? initialAge.unit : "months",
    price: initial?.price ?? "",
    discount_percent: initial?.discount_percent ?? "",
    promo_start_at: initial?.promo_start_at ? String(initial.promo_start_at).slice(0, 16) : "",
    promo_end_at: initial?.promo_end_at ? String(initial.promo_end_at).slice(0, 16) : "",
    is_featured: initial?.is_featured ?? false,
    is_new_arrival: initial?.is_new_arrival ?? false,
    description: initial?.description || "",
    care_light: initial?.care_light || "",
    care_watering: initial?.care_watering || "",
    image_url: initial?.image_url || "",
    in_stock: initial?.in_stock ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleNameChange(value) {
    update("name", value);
    if (!isEdit) update("slug", slugify(value));
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
      name: form.name,
      slug: form.slug || slugify(form.name),
      category: form.category,
      size: form.sizeAmount ? `${form.sizeAmount} ${form.sizeUnit}`.trim() : "",
      age: form.ageAmount ? `${form.ageAmount} ${form.ageUnit}`.trim() : "",
      size_value: form.sizeAmount ? Number(form.sizeAmount) : null,
      size_unit: form.sizeAmount ? form.sizeUnit : null,
      age_value: form.ageAmount ? Number(form.ageAmount) : null,
      age_unit: form.ageAmount ? form.ageUnit : null,
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
      description: form.description,
      care_light: form.care_light,
      care_watering: form.care_watering,
      image_url: form.image_url,
      in_stock: form.in_stock,
    };

    const query = isEdit
      ? supabase.from("plants").update(payload).eq("id", initial.id)
      : supabase.from("plants").insert(payload);

    const { error: saveError } = await query;
    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }
    router.push("/administration/plants");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-forest-dark">Name</label>
          <input required value={form.name} onChange={(e) => handleNameChange(e.target.value)} className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-forest-dark">Slug (URL)</label>
          <input required value={form.slug} onChange={(e) => update("slug", slugify(e.target.value))} className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm" />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-forest-dark">Category</label>
          <select value={form.category} onChange={(e) => update("category", e.target.value)} className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm">
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-forest-dark">Size</label>
          <div className="grid grid-cols-[minmax(0,1fr)_110px] gap-2.5">
            <input
              type="number"
              min="0"
              step="0.1"
              value={form.sizeAmount}
              onChange={(e) => update("sizeAmount", e.target.value)}
              placeholder="e.g. 12"
              className="w-full px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm"
            />
            <select
              value={form.sizeUnit}
              onChange={(e) => update("sizeUnit", e.target.value)}
              className="w-full px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm"
            >
              {sizeUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-forest-dark">Age</label>
          <div className="grid grid-cols-[minmax(0,1fr)_110px] gap-2.5">
            <input
              type="number"
              min="0"
              step="0.1"
              value={form.ageAmount}
              onChange={(e) => update("ageAmount", e.target.value)}
              placeholder="e.g. 2"
              className="w-full px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm"
            />
            <select
              value={form.ageUnit}
              onChange={(e) => update("ageUnit", e.target.value)}
              className="w-full px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm"
            >
              {ageUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-forest-dark">Price (Rs)</label>
        <input required type="number" min="0" value={form.price} onChange={(e) => update("price", e.target.value)} className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] max-w-[200px] shadow-sm" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
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
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={form.discount_percent}
            onChange={(e) => update("discount_percent", e.target.value)}
            placeholder="Optional"
            className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-forest-dark">Promo start</label>
          <input
            type="datetime-local"
            value={form.promo_start_at}
            onChange={(e) => update("promo_start_at", e.target.value)}
            className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-forest-dark">Promo end</label>
          <input
            type="datetime-local"
            value={form.promo_end_at}
            onChange={(e) => update("promo_end_at", e.target.value)}
            className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
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
        <p className="text-sm text-forest-dark">
          Promo tag will be <span className="font-semibold">Sale</span> while the discount is active.
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-forest-dark">Description</label>
        <textarea value={form.description} onChange={(e) => update("description", e.target.value)} className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] min-h-[90px] shadow-sm" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-forest-dark">Light needs</label>
          <select
            value={form.care_light}
            onChange={(e) => update("care_light", e.target.value)}
            className="px-4 py-3 rounded-xl border border-line bg-white text-[14.5px] shadow-sm"
          >
            {lightOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-semibold text-forest-dark">Watering</label>
          <select
            value={form.care_watering}
            onChange={(e) => update("care_watering", e.target.value)}
            className="px-4 py-3 rounded-xl border border-line bg-white text-[14.5px] shadow-sm"
          >
            <option value="">Select</option>
            {wateringOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ImageUploader value={form.image_url} onChange={(url) => update("image_url", url)} />

      <label className="flex items-center gap-2.5 text-sm font-medium text-forest-dark">
        <input type="checkbox" checked={form.in_stock} onChange={(e) => update("in_stock", e.target.checked)} className="w-4 h-4" />
        In stock / visible on site
      </label>

      {error && <p className="text-sm text-clay-dark">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="px-6 py-3.5 rounded-full text-sm font-semibold bg-forest-dark text-cream hover:bg-forest transition disabled:opacity-60">
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create plant"}
        </button>
      </div>
    </form>
  );
}


