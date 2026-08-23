import fs from "fs";
import path from "path";
import MediaGalleryClient from "./MediaGalleryClient";

export const metadata = { title: "Media Gallery | Ghous Ali Nursery Farm" };

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const videoExtensions = new Set([".mp4", ".webm", ".mov"]);

function readPublicFiles(folder, extensions) {
  const absolutePath = path.join(process.cwd(), "public", folder);

  if (!fs.existsSync(absolutePath)) return [];

  return fs
    .readdirSync(absolutePath)
    .filter((file) => extensions.has(path.extname(file).toLowerCase()))
    .filter((file) => !file.toLowerCase().includes("logo"))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => `/${folder}/${file.replace(/\\/g, "/")}`);
}

export default function MediaPage() {
  const images = readPublicFiles("images", imageExtensions);
  const videos = readPublicFiles("videos", videoExtensions).slice(0, 2);

  return (
    <main className="bg-[#F7F3E8]">
      <section className="pt-16 pb-14">
        <div className="max-w-[1180px] mx-auto px-7">
          <p className="text-[12.5px] font-semibold uppercase tracking-widest text-clay-dark">
            Media
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-forest-dark">
            Nursery photos and project clips
          </h1>
          <p className="mt-4 max-w-2xl text-ink-soft leading-8">
            Tap any image to view it larger. This page is kept simple so the
            pictures do the talking.
          </p>

          <div className="mt-8">
            <MediaGalleryClient images={images.slice(0, 12)} videos={videos} />
          </div>
        </div>
      </section>
    </main>
  );
}
