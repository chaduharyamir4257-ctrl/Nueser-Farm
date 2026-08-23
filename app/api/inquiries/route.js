import { supabase } from "@/lib/supabaseClient";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, topic, message } = body || {};
    if (!name || !phone || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Insert into Supabase (falls back to sample data if supabase is not configured)
    if (supabase) {
      const { error } = await supabase.from("inquiries").insert({ name, phone, topic, message });
      if (error) {
        console.error("Supabase insert error:", error.message);
        // continue — still try to send email if configured
      }
    }

    // Optional: send notification email if SMTP vars are provided
    const smtpHost = process.env.EMAIL_SMTP_HOST;
    const smtpPort = process.env.EMAIL_SMTP_PORT;
    const smtpUser = process.env.EMAIL_SMTP_USER;
    const smtpPass = process.env.EMAIL_SMTP_PASS;
    const emailTo = process.env.EMAIL_TO;

    if (smtpHost && smtpPort && smtpUser && smtpPass && emailTo) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(smtpPort),
          secure: Number(smtpPort) === 465, // true for 465, false for other ports
          auth: { user: smtpUser, pass: smtpPass },
        });

        const html = `<p>New inquiry received:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Topic:</strong> ${topic || "-"}</li>
          <li><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</li>
        </ul>`;

        await transporter.sendMail({
          from: smtpUser,
          to: emailTo,
          subject: `New inquiry from ${name}`,
          html,
        });
      } catch (mailErr) {
        console.error("Failed to send inquiry email:", mailErr);
      }
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
