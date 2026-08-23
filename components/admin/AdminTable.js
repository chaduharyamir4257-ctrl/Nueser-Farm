"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const pageSize = 10;

export default function AdminTable({ items, basePath, columns, onDelete }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;

  const visibleItems = useMemo(
    () => items.slice(start, start + pageSize),
    [items, start]
  );

  if (items.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-sage bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-light text-forest-dark">
          +
        </div>

        <h3 className="text-xl text-forest-dark">No records yet</h3>

        <p className="mt-2 text-sm text-ink-soft">
          Click &quot;Add new&quot; to create the first record.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-line bg-cream-card px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-forest-dark">
            {items.length} total records
          </p>

          <p className="text-xs text-ink-soft">
            Showing {start + 1}-
            {Math.min(start + pageSize, items.length)} of {items.length}
          </p>
        </div>

        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-clay-dark">
          10 per page
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-white">
            <tr className="border-b border-line text-left text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              {columns.map((c) => (
                <th key={c.key} className="px-5 py-4">
                  {c.label}
                </th>
              ))}

              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleItems.map((item) => (
              <tr
                key={item.id}
                className="border-b border-line bg-white last:border-0 hover:bg-[#F8FBF5]"
              >
                {/* Columns */}
                {columns.map((c) => {
                  const value = c.render
                    ? c.render(item)
                    : item[c.key];

                  return (
                    <td
                      key={c.key}
                      className="px-5 py-4 align-top text-sm text-ink-soft"
                    >
                      {value !== null &&
                      value !== undefined &&
                      String(value).trim() !== ""
                        ? value
                        : "-"}
                    </td>
                  );
                })}

                {/* Actions */}
                <td className="whitespace-nowrap px-5 py-4 text-right">
                  <Link
                    href={`${basePath}/${item.id}/edit`}
                    className="mr-2 inline-flex rounded-full bg-forest-dark px-3.5 py-2 text-xs font-semibold text-cream transition hover:bg-forest"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => onDelete(item)}
                    className="inline-flex rounded-full border border-line bg-white px-3.5 py-2 text-xs font-semibold text-clay transition hover:bg-cream"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col gap-3 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-soft">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {/* Previous */}
            <button
              onClick={() =>
                setPage((value) => Math.max(1, value - 1))
              }
              disabled={currentPage === 1}
              className="rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-forest-dark transition hover:bg-cream-card disabled:cursor-not-allowed disabled:opacity-45"
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((pageNumber) => (
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

            {/* Next */}
            <button
              onClick={() =>
                setPage((value) =>
                  Math.min(totalPages, value + 1)
                )
              }
              disabled={currentPage === totalPages}
              className="rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-forest-dark transition hover:bg-cream-card disabled:cursor-not-allowed disabled:opacity-45"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}