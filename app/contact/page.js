import ContactForm from "./ContactForm";

const contactLinks = [
  {
    label: "Location",
    value: "Gehlan phatak Multan Road N5 Punjab Pakistan, Pattoki, Pakistan, 55300",
    icon: "location",
  },
  {
    label: "Second branch",
    value: "Ghous Ali Nursery Farm, Bilal Switchgear Engineering, 11km Raiwind Rd, Chamru Pur Kot Bagh, Lahore.",
    icon: "location",
  },
  {
    label: "Email",
    value: "ghousalinursery@gmail.com",
    icon: "email",
  },
  {
    label: "Phones",
    value: "+92 347 4254696\n+92 300 299 2213",
    icon: "phone",
  },
  {
    label: "Instagram",
    value: "@ghousalinursery",
    icon: "instagram",
  },
  {
    label: "TikTok",
    value: "@ghousalinursery",
    icon: "tiktok",
  },
  {
    label: "Facebook",
    value: "Ghous Ali Nursery",
    icon: "facebook",
  },
];

function SocialIcon({ type }) {
  const base = "h-5 w-5";
  if (type === "location") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={base} aria-hidden="true">
        <path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }
  if (type === "phone") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={base} aria-hidden="true">
        <path d="M6.5 3.5h3l1.5 5-2 1.5a16 16 0 0 0 5 5l1.5-2 5 1.5v3A3.5 3.5 0 0 1 17.5 22C9.5 22 2 14.5 2 6.5A3.5 3.5 0 0 1 5.5 3h1Z" />
      </svg>
    );
  }
  if (type === "email") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={base} aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }
  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={base} aria-hidden="true">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.51 5.51 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5ZM18 6a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 18 6Z" />
      </svg>
    );
  }
  if (type === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={base} aria-hidden="true">
        <path d="M14 2v11.2a4.8 4.8 0 1 1-4-4.72V4.3a8.8 8.8 0 1 0 6 8.4V8.2a7.2 7.2 0 0 0 4 1.3V5.5a3.8 3.8 0 0 1-4-3.5Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={base} aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

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
                  <div className="flex items-start gap-3">
                    {item.icon ? (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-dark text-cream">
                        <SocialIcon type={item.icon} />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-light text-forest-dark text-sm font-semibold">
                        <SocialIcon type={item.icon} />
                      </div>
                    )}
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-clay-dark">
                        {item.label}
                      </p>
                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-forest-dark">
                        {item.value}
                      </p>
                    </div>
                  </div>
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
