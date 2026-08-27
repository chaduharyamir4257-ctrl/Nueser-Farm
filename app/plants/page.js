import { getPlantsPage } from "@/lib/getData";
import PlantsGrid from "./PlantsGrid";

export const metadata = { title: "Browse Plants — Ghous Ali Nursery Farm" };

export default async function PlantsPage() {
  const { items, total } = await getPlantsPage(1, 10);

  return (
    <>
      <section className="pt-13 pb-11 text-center bg-gradient-to-b from-sage-light to-cream">
        <div className="max-w-[1180px] mx-auto px-7">
          <span className="text-[12.5px] font-semibold uppercase tracking-widest text-clay-dark">120+ varieties</span>
          <h1 className="text-4xl mt-3">Every plant, one shelf away</h1>
          <p className="max-w-[520px] mx-auto mt-4 text-ink-soft">
            Filter by type, check size and price, and build your list — send it to us on WhatsApp when you&apos;re ready.
          </p>
        </div>
      </section>
      <section className="pt-12 pb-16">
        <div className="max-w-[1180px] mx-auto px-7">
          <PlantsGrid initialPlants={items} total={total} />
        </div>
      </section>
    </>
  );
}
