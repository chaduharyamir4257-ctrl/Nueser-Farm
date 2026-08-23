"use client";

import { useState } from "react";
import Image from "next/image";

export default function MediaGalleryClient({ images, videos }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <button
            key={image}
            onClick={() => setSelected({ type: "image", src: image })}
            className="group overflow-hidden rounded-[24px] border border-line bg-white shadow-sm text-left"
          >
            <div className="relative aspect-[4/3]">
              <Image src={image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition group-hover:scale-[1.03]" />
            </div>
          </button>
        ))}
      </div>

      {videos.length > 0 && (
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {videos.map((video) => (
            <div key={video} className="overflow-hidden rounded-[24px] border border-line bg-white shadow-sm">
              <video src={video} controls preload="metadata" className="aspect-video w-full bg-black object-cover" />
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[24px] bg-black shadow-2xl"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-forest-dark"
            >
              Close
            </button>
            <Image src={selected.src} alt="" width={1600} height={1100} className="h-auto w-full object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
