"use client";

import { useMemo, useState } from "react";

export default function PaginatedGrid({ items, pageSize = 10, renderItem }) {
  const [page, setPage] = useState(1);
  const maxPage = Math.max(1, Math.ceil(items.length / pageSize));

  const visibleItems = useMemo(() => {
    const end = page * pageSize;
    return items.slice(0, end);
  }, [items, page, pageSize]);

  return (
    <>
      {renderItem(visibleItems)}
      {page < maxPage && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setPage((current) => Math.min(maxPage, current + 1))}
            className="rounded-full bg-forest-dark px-6 py-3 text-sm font-semibold text-cream hover:bg-forest transition"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
}
