import ContactForm from "./ContactForm";

const contactLinks = [
  {
    label: "Location",
    value: "Gehlan phatak Multan Road N5 Punjab Pakistan, Pattoki, Pakistan, 55300",
  },
  {
    label: "Second branch",
    value: "Ghous Ali Nursery Farm, Bilal Switchgear Engineering, 11km Raiwind Rd, Chamru Pur Kot Bagh, Lahore.",
  },
  {
    label: "Email",
    value: "ghousalinursery@gmail.com",
  },
  {
    label: "Instagram",
    value: "@ghousalinursery",
  },
  {
    label: "TikTok",
    value: "@ghousalinursery",
  },
];

export default function ContactPage() {
  const primaryMapUrl =
    "https://www.google.com/maps?q=Gehlan+phatak+Multan+Road+N5+Punjab+Pakistan,+Pattoki,+Pakistan,+55300&output=embed";
  const secondaryMapUrl =
    "https://maps.app.goo.gl/sGW3MZTttTBhAyXj7";

  return (
    <main className="bg-cream">
      <section className="border-b border-line bg-[#F6F3E8]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-clay-dark">
            Contact
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl text-forest-dark sm:text-5xl">
            Visit the nursery or send us a message.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
            Reach both branches, ask for plant availability, or send us your project details and we will guide you from there.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {contactLinks.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-line bg-white p-5 shadow-sm"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-clay-dark">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-forest-dark">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
              <div className="overflow-hidden rounded-[24px] border border-line bg-white shadow-sm">
                <iframe
                  title="Ghous Ali Nursery Farm - Pattoki branch"
                  src={primaryMapUrl}
                  className="h-[340px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="flex flex-col justify-between rounded-[24px] border border-line bg-white p-5 shadow-sm">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-clay-dark">
                    Second branch
                  </p>
                  <h2 className="mt-2 font-serif text-2xl text-forest-dark">
                    Lahore branch
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">
                    Ghous Ali Nursery Farm, Bilal Switchgear Engineering, 11km Raiwind Rd, Chamru Pur Kot Bagh, Lahore.
                  </p>
                </div>

                <a
                  href={secondaryMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-forest-dark px-5 py-3 text-sm font-semibold text-cream transition hover:bg-forest"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-line bg-white p-6 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-clay-dark">
              Send a message
            </p>
            <h2 className="mt-3 font-serif text-3xl text-forest-dark">
              Inquiry form
            </h2>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
              Tell us what you need, and we will respond with product, pricing, or landscaping guidance.
            </p>

            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
