"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const pageSize = 10;

function formatDate(value) {
  if (!value) return "No date";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function initials(name = "Customer") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "C";
}

export default function AdminInquiriesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const visibleItems = useMemo(
    () => items.slice(start, start + pageSize),
    [items, start],
  );

  async function load() {
    setLoading(true);
    if (!supabase) {
      setItems([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function markRead(item) {
    if (!supabase) return;
    if (item.read) return;
    await supabase.from("inquiries").update({ read: true }).eq("id", item.id);
    load();
  }

  async function handleDelete(item) {
    if (!confirm(`Delete message from ${item.name}? This can't be undone.`)) return;
    if (!supabase) return;
    await supabase.from("inquiries").delete().eq("id", item.id);
    load();
  }

  return (
    <div>
      <div className="mb-6 rounded-[28px] border border-line bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay-dark">Inbox</p>
          <h1 className="mt-2 text-2xl text-forest-dark">Inquiries</h1>
          <p className="text-ink-soft text-sm">Latest messages from the contact form, newest first.</p>
        </div>
      </div>

      {loading ? (
        <p className="text-ink-soft text-sm">Loading…</p>
      ) : (
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-sage bg-white p-12 text-center shadow-sm">
              <h3 className="text-xl text-forest-dark">No inquiries yet</h3>
              <p className="mt-2 text-sm text-ink-soft">
                New contact form messages will appear here.
              </p>
            </div>
          ) : (
            <div className="rounded-[28px] border border-line bg-white shadow-sm">
              <div className="flex flex-col gap-2 border-b border-line bg-cream-card px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-forest-dark">{items.length} total inquiries</p>
                  <p className="text-xs text-ink-soft">
                    Showing {start + 1}-{Math.min(start + pageSize, items.length)} of {items.length}
                  </p>
                </div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-dark">
                  10 per page
                </div>
              </div>

              <div className="grid gap-4 p-5">
                {visibleItems.map((it) => (
                  <article
                    key={it.id}
                    className={`rounded-[24px] border p-5 shadow-sm transition ${
                      it.read
                        ? "border-line bg-white"
                        : "border-sage bg-[#F8FBF5] ring-1 ring-sage-light"
                    }`}
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start gap-4">
                          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${
                            it.read ? "bg-cream-card text-forest-dark" : "bg-forest-dark text-cream"
                          }`}>
                            {initials(it.name)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-base font-semibold text-forest-dark">
                                {it.name || "Website visitor"}
                              </h3>
                              {!it.read && (
                                <span className="rounded-full bg-clay px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                                  New
                                </span>
                              )}
                              {it.topic && (
                                <span className="rounded-full bg-sage-light px-2.5 py-1 text-[11px] font-semibold text-forest-dark">
                                  {it.topic}
                                </span>
                              )}
                            </div>
                            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-ink-soft">
                              {it.phone && <span>Phone: {it.phone}</span>}
                              <span>{formatDate(it.created_at)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 rounded-2xl border border-line bg-white px-4 py-3">
                          <p className="whitespace-pre-line text-sm leading-7 text-forest-dark">
                            {it.message || "No message provided."}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-row gap-2 lg:flex-col">
                        {!it.read && (
                          <button
                            onClick={() => markRead(it)}
                            className="rounded-full bg-forest-dark px-4 py-2 text-sm font-semibold text-cream transition hover:bg-forest"
                          >
                            Mark read
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(it)}
                          className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-clay transition hover:bg-cream"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex flex-col gap-3 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-ink-soft">Page {currentPage} of {totalPages}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setPage((value) => Math.max(1, value - 1))}
                      disabled={currentPage === 1}
                      className="rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-forest-dark transition hover:bg-cream-card disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        className={`h-9 min-w-9 rounded-full px-3 text-xs font-semibold transition ${
                          pageNumber === currentPage
                            ? "bg-forest-dark text-cream"
                            : "border border-line bg-white text-forest-dark hover:bg-cream-card"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                      disabled={currentPage === totalPages}
                      className="rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-forest-dark transition hover:bg-cream-card disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
