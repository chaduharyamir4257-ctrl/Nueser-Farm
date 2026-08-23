"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ClientForm({ initial }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [form, setForm] = useState({
    name: initial?.name || "",
    email: initial?.email || "",
    phone: initial?.phone || "",
    address: initial?.address || "",
    company: initial?.company || "",
    reference: initial?.reference || "",
    notes: initial?.notes || "",
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

    if (!form.name) {
      setError("Client name is required.");
      return;
    }

    setSaving(true);
    const payload = {
      ...form,
      email: form.email.trim() || null,
      phone: form.phone.trim() || null,
      address: form.address.trim() || null,
      company: form.company.trim() || null,
      reference: form.reference.trim() || null,
      notes: form.notes.trim() || null,
    };
    const query = isEdit
      ? supabase.from("clients").update(payload).eq("id", initial.id)
      : supabase.from("clients").insert(payload);
    const { error: saveError } = await query;
    setSaving(false);

    if (saveError) {
      setError(saveError.message);
      return;
    }

    router.push("/administration/clients");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-5">
      <div className="rounded-3xl border border-line bg-white p-5 shadow-sm">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-forest-dark">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-forest-dark">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="Optional"
              className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm"
            />
          </div>
        </div>

        <div className="grid gap-5 mt-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-forest-dark">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="Optional"
              className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-forest-dark">Company</label>
            <input
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              placeholder="Optional"
              className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm"
            />
          </div>
        </div>

        <div className="grid gap-5 mt-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-forest-dark">Address</label>
            <input
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-forest-dark">Reference</label>
            <input
              value={form.reference}
              onChange={(e) => update("reference", e.target.value)}
              placeholder="How this client found you"
              className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mt-5">
          <label className="text-[13px] font-semibold text-forest-dark">Notes / Details</label>
          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            className="px-4 py-3 rounded-3xl border border-line bg-white text-[14.5px] min-h-[110px] shadow-sm"
          />
        </div>
      </div>

      {error && <p className="text-sm text-clay-dark">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="px-6 py-3.5 rounded-full text-sm font-semibold bg-forest-dark text-cream hover:bg-forest transition disabled:opacity-60 self-start"
      >
        {saving ? "Saving…" : isEdit ? "Save client" : "Create client"}
      </button>
    </form>
  );
}

