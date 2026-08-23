import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/lib/getData";

export const metadata = { title: "Landscape & Garden Design — Ghous Ali Nursery Farm" };

export default async function ServicesPage() {
  const services = (await getServices()).slice(0, 5);

  return (
    <>
      <section className="pt-13 pb-11 text-center bg-gradient-to-b from-sage-light to-cream">
        <div className="max-w-[1180px] mx-auto px-7">
          <span className="text-[12.5px] font-semibold uppercase tracking-widest text-clay-dark">Landscaping services</span>
          <h1 className="text-4xl mt-3">Green spaces planned and maintained properly</h1>
          <p className="max-w-[560px] mx-auto mt-4 text-ink-soft">
            We help with home gardens, lawns, office planting, commercial spaces,
            seasonal flowers, and plant care. We also maintain existing lawns and
            green areas and give them a cleaner, modern look that matches your space.
          </p>
        </div>
      </section>

      <section className="pt-12 pb-14 bg-[#FFFDF7]">
        <div className="max-w-[1180px] mx-auto px-7">
          <span className="text-[12.5px] font-semibold uppercase tracking-widest text-clay-dark">How it works</span>
          <h2 className="text-3xl mt-2 mb-7">A simple process for every project</h2>
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              ["1. Share your space", "Send photos, measurements, and tell us what kind of look you want."],
              ["2. Get simple guidance", "We suggest suitable plants, layout, and care ideas for your budget."],
              ["3. Refresh and maintain", "We can start a new design or improve the green area you already have."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-[20px] border border-line bg-white p-7 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">{title}</h3>
                <p className="text-ink-soft text-sm leading-6">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#EEF4E7]">
        <div className="max-w-[1180px] mx-auto px-7 grid gap-5 md:grid-cols-3">
          {[
            "Garden design for homes and offices",
            "Maintenance for lawns and existing green areas",
            "Simple plant layouts based on customer demand",
          ].map((text) => (
            <div key={text} className="rounded-[24px] border border-line bg-white p-6 shadow-sm">
              <p className="text-[12px] uppercase tracking-[0.2em] text-clay-dark mb-2">Service note</p>
              <p className="text-forest-dark font-medium leading-7">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#EEF4E7]">
        <div className="max-w-[1180px] mx-auto px-7">
          <div className="mb-8">
            <span className="text-[12.5px] font-semibold uppercase tracking-widest text-clay-dark">What we do</span>
            <h2 className="mt-2 text-3xl text-forest-dark">Landscaping support for different spaces</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.id} className="overflow-hidden rounded-[28px] border border-line bg-white shadow-sm">
                <div className="relative h-[280px] w-full">
                  <Image
                    src={s.image_url}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[12px] uppercase tracking-[0.22em] text-clay-dark">{s.category}</span>
                  <h3 className="mt-3 text-xl font-semibold text-forest-dark">{s.title}</h3>
                  <p className="mt-3 text-sm text-ink-soft leading-6">{s.description}</p>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <Link href="/contact" className="rounded-full bg-clay px-4 py-2 text-sm font-semibold text-white hover:bg-clay-dark transition">
                      Request quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#F7F3E8]">
        <div className="max-w-[1180px] mx-auto px-7 rounded-[28px] border border-line bg-white p-8 shadow-sm">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl text-forest-dark">Need help choosing the right plants?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-soft">
                Send us your garden, lawn, office, or farm photos. We will guide
                you with plants that suit your space, sunlight, and budget.
              </p>
            </div>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-forest-dark px-6 py-3 text-sm font-semibold text-white hover:bg-forest transition">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
