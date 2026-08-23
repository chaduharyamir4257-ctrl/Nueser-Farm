import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlantBySlug } from "@/lib/getData";
import AddToCartActions from "./AddToCartActions";
import { formatPrice, getPromoState } from "@/lib/promo";

export default async function PlantDetailPage({ params }) {
  const plant = await getPlantBySlug(params.slug);
  if (!plant) notFound();
  const promo = getPromoState(plant);

  return (
    <>
      <section className="pt-10">
        <div className="max-w-[1180px] mx-auto px-7 text-sm text-ink-soft mb-3">
          <Link href="/plants" className="text-forest-mid font-semibold">Plants</Link> / {plant.category} / {plant.name}
        </div>
      </section>

      <section className="pt-4 pb-16">
        <div className="max-w-[1180px] mx-auto px-7 grid md:grid-cols-2 gap-14 items-start">
          <div className="relative aspect-[4/3.5] rounded-3xl overflow-hidden shadow-soft">
            <Image src={plant.image_url} alt={plant.name} fill className="object-cover" />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              {promo.badges.map((badge) => (
                <span
                  key={badge}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                    badge === "Sale" ? "bg-clay text-white" : "bg-cream-card/90 text-forest-dark"
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[12.5px] font-semibold uppercase tracking-widest text-clay-dark">
              {plant.category} · Low maintenance
            </span>
            <h1 className="text-[34px] mt-3 mb-3">{plant.name}</h1>
            <div className="mb-5">
              {promo.active ? (
                <>
                  <div className="text-sm text-ink-soft line-through">{formatPrice(promo.originalPrice)}</div>
                  <div className="font-serif text-[32px] text-clay-dark font-semibold">{formatPrice(promo.salePrice)}</div>
                </>
              ) : (
                <div className="font-serif text-[32px] text-clay-dark font-semibold">{formatPrice(plant.price)}</div>
              )}
            </div>
            <p className="text-[15px] text-ink-soft mb-6">{plant.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-cream-card border border-line rounded-2xl px-4 py-3.5">
                <span className="block text-[11.5px] uppercase tracking-wide text-ink-soft mb-1">Size</span>
                <strong className="text-[15px]">{plant.size}</strong>
              </div>
              <div className="bg-cream-card border border-line rounded-2xl px-4 py-3.5">
                <span className="block text-[11.5px] uppercase tracking-wide text-ink-soft mb-1">Age</span>
                <strong className="text-[15px]">{plant.age}</strong>
              </div>
            </div>

            <AddToCartActions plant={plant} />
          </div>
        </div>
      </section>
    </>
  );
}
