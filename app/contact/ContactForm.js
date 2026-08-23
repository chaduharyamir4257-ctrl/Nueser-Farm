"use client";

import { useCart } from "@/context/CartContext";

export default function ContactForm() {
  const { showToast } = useCart();

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: form.name.value?.trim(),
      phone: form.phone.value?.trim(),
      topic: form.topic.value,
      message: form.msg.value?.trim(),
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");
      showToast("Message sent — we'll review it and get back to you.");
      form.reset();
    } catch (err) {
      console.error(err);
      showToast("Sorry — there was a problem sending your message.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-4 mb-2">
        <div className="flex flex-col gap-1.5 mb-2">
          <label htmlFor="name" className="text-[13px] font-semibold text-forest-dark">Full name</label>
          <input id="name" type="text" placeholder="Your name" required className="px-4 py-3 rounded-xl border border-line bg-cream text-[14.5px]" />
        </div>
        <div className="flex flex-col gap-1.5 mb-2">
          <label htmlFor="phone" className="text-[13px] font-semibold text-forest-dark">Phone number</label>
          <input id="phone" type="tel" placeholder="03xx xxxxxxx" required className="px-4 py-3 rounded-xl border border-line bg-cream text-[14.5px]" />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1.5 mb-2">
          <label htmlFor="topic" className="text-[13px] font-semibold text-forest-dark">What can we help with?</label>
          <select id="topic" className="px-4 py-3 rounded-xl border border-line bg-cream text-[14.5px]">
            <option>Buying plants</option>
            <option>Landscape / garden design</option>
            <option>Fertilizers or supplies</option>
            <option>Something else</option>
          </select>
        </div>
        <div className="md:col-span-2 flex flex-col gap-1.5 mb-2">
          <label htmlFor="msg" className="text-[13px] font-semibold text-forest-dark">Message</label>
          <textarea id="msg" placeholder="Tell us what you're looking for..." className="px-4 py-3 rounded-xl border border-line bg-cream text-[14.5px] min-h-[110px]" />
        </div>
      </div>
      <button type="submit" className="w-full py-3.5 rounded-full text-sm font-semibold bg-forest-dark text-cream hover:bg-forest transition">
        Send message
      </button>
    </form>
  );
}
