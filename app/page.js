import Image from "next/image";
import Link from "next/link";
import { getPlants, getFertilizers } from "@/lib/getData";
import PlantCard from "@/components/PlantCard";
import HomeHighlights from "@/components/HomeHighlights";
import HeroCarousel from "@/components/HeroCarousel";

export default async function HomePage() {
  const [plantItems, fertilizerItems] = await Promise.all([
    getPlants(),
    getFertilizers(),
  ]);
  const plants = plantItems.slice(0, 4);
  const fertilizers = fertilizerItems.slice(0, 3);

  return (
    <>
      <HeroCarousel />

      <section className="py-16 bg-[#EEF4E7]">
        <div className="max-w-[1180px] mx-auto px-7">
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="rounded-[28px] border border-line bg-white/95 p-8 shadow-sm">
              <p className="text-[13px] uppercase tracking-[0.24em] text-clay-dark mb-3">
                Years of experience
              </p>
              <strong className="text-4xl font-serif text-forest-dark">
                20+
              </strong>
              <p className="mt-4 text-sm text-ink-soft">
                Third-generation family care for your garden, rooted in trust.
              </p>
            </div>
            <div className="rounded-[28px] border border-line bg-white/95 p-8 shadow-sm">
              <p className="text-[13px] uppercase tracking-[0.24em] text-clay-dark mb-3">
                Plant categories
              </p>
              <strong className="text-4xl font-serif text-forest-dark">
                120+
              </strong>
              <p className="mt-4 text-sm text-ink-soft">
                Indoor, outdoor, flowering, succulents, pots, and care supplies.
              </p>
            </div>
            <div className="rounded-[28px] border border-line bg-white/95 p-8 shadow-sm">
              <p className="text-[13px] uppercase tracking-[0.24em] text-clay-dark mb-3">
                Market trust
              </p>
              <strong className="text-4xl font-serif text-forest-dark">
                500+
              </strong>
              <p className="mt-4 text-sm text-ink-soft">
                Repeat customers who rely on our quality and delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-16 pb-20 bg-[#FFFDF7]">
        <div className="max-w-[1180px] mx-auto px-7 text-center mb-10">
          <span className="text-[12.5px] font-semibold uppercase tracking-widest text-clay-dark">
            Why customers choose us
          </span>
          <h2 className="text-3xl mt-3">
            Trusted experience, wide plant variety, and strong local market
            reputation.
          </h2>
        </div>
        <HomeHighlights />
      </section>

      <section className="py-16 bg-[#F3F7EF]">
        <div className="max-w-[1180px] mx-auto px-7 flex items-end justify-between mb-8">
          <div>
            <span className="text-[12.5px] font-semibold uppercase tracking-widest text-clay-dark">
              This week&apos;s picks
            </span>
            <h2 className="text-2xl mt-1">Featured plants</h2>
          </div>
          <Link
            href="/plants"
            className="text-sm font-semibold px-4 py-2 rounded-full bg-cream-card border border-line hover:bg-white transition"
          >
            View full catalog →
          </Link>
        </div>
        <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-2 md:grid-cols-4 gap-5">
          {plants.map((p) => (
            <PlantCard key={p.id} plant={p} />
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#F8EFE4]">
        <div className="max-w-[1180px] mx-auto px-7 flex flex-col gap-6 items-start justify-between md:flex-row md:items-end mb-8">
          <div>
            <span className="text-[12.5px] font-semibold uppercase tracking-widest text-clay-dark">
              Keep them thriving
            </span>
            <h2 className="text-2xl mt-1">Fertilizers &amp; plant care</h2>
          </div>
          <Link
            href="/fertilizers"
            className="text-sm font-semibold px-4 py-2 rounded-full bg-cream-card border border-line hover:bg-white transition"
          >
            Shop fertilizers →
          </Link>
        </div>
        <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-3 gap-5">
          {fertilizers.map((f) => (
            <div key={f.id} className="bg-cream-card border border-line rounded-[20px] overflow-hidden shadow-sm">
              <div className="relative h-52">
                <Image src={f.image_url || "/images/Spraying_fertilizer.webp"} alt={f.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg mb-2 text-forest-dark">{f.name}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(f.discount_percent ? ["Sale"] : []).concat(f.is_new_arrival ? ["New"] : []).concat(f.is_featured ? ["Featured"] : []).map((badge) => (
                    <span
                      key={badge}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                        badge === "Sale" ? "bg-clay text-white" : "bg-sage-light text-forest-dark"
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-ink-soft mb-4">{f.description}</p>
                <div className="flex items-center justify-between gap-4">
                  {Number(f.discount_percent) > 0 ? (
                    <div className="flex flex-col">
                      <span className="text-xs text-ink-soft line-through">Rs {Number(f.price || 0).toLocaleString()}</span>
                      <span className="font-serif text-clay-dark font-semibold">
                        Rs {Math.max(0, Math.round(Number(f.price || 0) - (Number(f.price || 0) * Number(f.discount_percent || 0)) / 100)).toLocaleString()}
                      </span>
                    </div>
                  ) : (
                    <span className="font-serif text-clay-dark font-semibold">Rs {Number(f.price || 0).toLocaleString()}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
