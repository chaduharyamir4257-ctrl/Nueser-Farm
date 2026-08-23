import Image from "next/image";
import Link from "next/link";

const values = [
  "Quality and healthy plants",
  "Fair and competitive pricing",
  "Honest and reliable service",
  "Practical plant-care guidance",
  "Long-term relationships with our customers",
];

export const metadata = {
  title: "About Us | Ghous Ali Nursery Farm",
  description:
    "A family-run nursery with 20+ years of experience and three generations of plant knowledge.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F7F3E8]">
      <section className="relative overflow-hidden bg-gradient-to-b from-sage-light to-cream">
        <div className="max-w-[1180px] mx-auto px-7 py-20 grid gap-12 lg:grid-cols-[0.95fr_0.8fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-[#D6B65B]">
              About us
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl font-serif text-forest-dark">
              Three Generations of Growing Green
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-ink-soft">
              For more than 20 years, our family has been dedicated to growing,
              caring for, and supplying quality plants.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 -z-10 bg-gradient-to-br from-sage-light/70 via-sage/30 to-clay/20 blur-[80px]" />
            <div className="relative w-full aspect-[4/3]">
              <div
                className="absolute inset-0 bg-gradient-to-br from-gold via-sage to-forest-dark"
                style={{ clipPath: "url(#about-nursery-blob)" }}
              />
              <div
                className="absolute inset-[6px] overflow-hidden shadow-soft"
                style={{ clipPath: "url(#about-nursery-blob)" }}
              >
                <Image
                  src="/images/banner.jpeg"
                  alt="Healthy plants at Ghous Ali Nursery Farm"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/25 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>

        <svg width="0" height="0" className="absolute">
          <defs>
            <clipPath id="about-nursery-blob" clipPathUnits="objectBoundingBox">
              <path d="M0.65,0.06 C0.86,0.13 1,0.34 0.96,0.58 C0.93,0.79 0.75,0.95 0.53,0.98 C0.31,1.01 0.08,0.9 0.02,0.68 C-0.04,0.46 0.09,0.22 0.29,0.1 C0.4,0.03 0.53,0 0.65,0.06 Z" />
            </clipPath>
          </defs>
        </svg>
      </section>

      <section className="py-20 bg-[#F7F3E8]">
        <div className="max-w-[1080px] mx-auto px-7 grid gap-10 lg:grid-cols-[0.85fr_1fr]">
          <aside className="lg:sticky lg:top-28 h-fit rounded-[24px] border border-line bg-white p-7 shadow-sm">
            <p className="text-[13px] uppercase tracking-[0.24em] text-clay-dark">
              Our roots
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <strong className="block text-4xl font-serif text-forest-dark">
                  20+
                </strong>
                <span className="text-sm text-ink-soft">Years of experience</span>
              </div>
              <div>
                <strong className="block text-4xl font-serif text-forest-dark">
                  3
                </strong>
                <span className="text-sm text-ink-soft">Generations</span>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-ink-soft">
              Traditional knowledge, hands-on experience, and one shared passion
              for plants.
            </p>
          </aside>

          <div className="space-y-8">
            <section className="rounded-[24px] border border-line bg-white p-7 sm:p-9 shadow-sm">
              <h2 className="text-3xl font-serif text-forest-dark">
                Three Generations of Growing Green
              </h2>
              <p className="mt-4 text-base leading-8 text-ink-soft">
                What began with one generation has continued through three
                generations, bringing together traditional knowledge, hands-on
                experience, and a genuine passion for plants.
              </p>
              <p className="mt-4 text-base leading-8 text-ink-soft">
                We are a family-run nursery providing a wide range of plants for
                homes, gardens, offices, farms, and commercial spaces. From
                beautiful flowering plants and indoor greenery to outdoor plants,
                trees, shrubs, and garden essentials, we aim to provide healthy
                plants at fair and competitive prices.
              </p>
            </section>

            <section className="rounded-[24px] border border-line bg-[#EEF4E7] p-7 sm:p-9 shadow-sm">
              <h2 className="text-3xl font-serif text-forest-dark">
                More Than a Nursery
              </h2>
              <p className="mt-4 text-base leading-8 text-ink-soft">
                Our work goes beyond selling plants. We help our customers create
                and maintain beautiful green spaces through our professional
                landscaping services.
              </p>
              <p className="mt-4 text-base leading-8 text-ink-soft">
                Whether you need plants for a small home garden, a large
                property, office landscaping, or a commercial project, our team
                can help you choose the right plants and create a space that
                suits your needs.
              </p>
            </section>

            <section className="rounded-[24px] border border-line bg-white p-7 sm:p-9 shadow-sm">
              <h2 className="text-3xl font-serif text-forest-dark">
                Experience You Can Trust
              </h2>
              <p className="mt-4 text-base leading-8 text-ink-soft">
                With 20+ years of experience and knowledge passed down through
                three generations, we understand what it takes to grow and care
                for plants in local conditions.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {values.map((value) => (
                  <div
                    key={value}
                    className="rounded-2xl border border-line bg-cream-card px-4 py-3 text-sm font-medium text-forest-dark"
                  >
                    {value}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[24px] bg-[#193E26] p-7 sm:p-9 text-white shadow-sm">
              <h2 className="text-3xl font-serif text-white">Our Commitment</h2>
              <p className="mt-4 text-base leading-8 text-emerald-50/90">
                Our goal is simple: to make it easier for people to bring more
                greenery into their lives.
              </p>
              <p className="mt-4 text-base leading-8 text-emerald-50/90">
                Whether you are looking for a single plant for your home or a
                complete landscaping solution for a larger property, we are here
                to help you find the right plants and turn your ideas into a
                greener, more beautiful space.
              </p>
              <p className="mt-6 text-lg font-semibold text-[#F3D57A]">
                20+ Years of Experience. 3 Generations. One Passion for Plants.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/plants"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-forest-dark hover:bg-cream transition"
                >
                  Browse plants
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  Contact us
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
