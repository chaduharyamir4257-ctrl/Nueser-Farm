import { getFertilizers } from "@/lib/getData";
import FertilizersGrid from "@/components/FertilizersGrid";

export const metadata = { title: "Fertilizers & Sprays — Ghous Ali Nursery Farm" };

export default async function FertilizersPage() {
  const items = await getFertilizers();

  return (
    <>
      <section className="pt-13 pb-11 text-center bg-gradient-to-b from-sage-light to-cream">
        <div className="max-w-[1180px] mx-auto px-7">
          <span className="text-[12.5px] font-semibold uppercase tracking-widest text-clay-dark">Care essentials</span>
          <h1 className="text-4xl mt-3">Fertilizers, sprays, medicines &amp; pots</h1>
          <p className="max-w-[520px] mx-auto mt-4 text-ink-soft">
            Everything to keep a plant thriving after it comes home — organic feed, pest control, medicines, and strong pots.
          </p>
        </div>
      </section>

      <section className="pt-12 pb-16">
        <div className="max-w-[1180px] mx-auto px-7">
          <FertilizersGrid items={items} />
        </div>
      </section>
    </>
  );
}
