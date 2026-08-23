import Image from "next/image";

const highlights = [
  {
    title: "20+ years of nursery experience",
    description: "A trusted local nursery serving Lahore with healthy plants, reliable delivery, and careful care.",
    image: "/images/banner.jpeg",
  },
  {
    title: "120+ plant categories",
    description: "Indoor, outdoor, flowering, succulents, and specialty plants for every home and garden.",
    image: "/images/20.jpg",
  },
  {
    title: "Trusted by our clients",
    description: "Strong local market trust and repeat customers who choose us for quality and service.",
    image: "/images/21.jpg",
  },
];

export default function HomeHighlights() {
  return (
    <div className="max-w-[1180px] mx-auto px-7">
      <div className="grid gap-8 lg:grid-cols-3">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-[2rem] overflow-hidden border border-line bg-white shadow-sm">
            <div className="relative h-52">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-forest-dark">{item.title}</h3>
              <p className="mt-3 text-sm text-ink-soft leading-7">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
