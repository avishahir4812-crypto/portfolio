import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { contacts } from "@/db/schema";
import { buildAutoReply, buildInquiryEmail, type ContactPayload } from "@/lib/email";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/* naive in-memory rate limit : 5 submissions / minute / IP */
const hits = new Map<string, { count: number; reset: number }>();
function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(body: Partial<ContactPayload> & { company?: string }) {
  const errors: Record<string, string> = {};
  const clean = {
    name: (body.name ?? "").trim(),
    email: (body.email ?? "").trim(),
    phone: (body.phone ?? "").trim(),
    projectType: (body.projectType ?? "").trim(),
    budget: (body.budget ?? "").trim(),
    message: (body.message ?? "").trim(),
  };
  if (clean.name.length < 2 || clean.name.length > 80)
    errors.name = "Please enter your name (2–80 characters).";
  if (!EMAIL_RE.test(clean.email)) errors.email = "Please enter a valid email.";
  if (!clean.projectType) errors.projectType = "Please select a project type.";
  if (clean.message.length < 10 || clean.message.length > 3000)
    errors.message = "Message must be 10–3000 characters.";
  return { errors, clean };
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests — please try again in a minute." },
        { status: 429 }
      );
    }

    const body = (await req.json()) as Partial<ContactPayload> & {
      company?: string;
    };

    // honeypot — silently accept to fool bots, but do nothing
    if (body.company) {
      return NextResponse.json({ ok: true });
    }

    const { errors, clean } = validate(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, error: Object.values(errors)[0], fields: errors },
        { status: 400 }
      );
    }

    const receivedAtIst = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    /* 1 ── persist to PostgreSQL (never blocks the email) */
    let stored = false;
    const db = getDb();
    if (db) {
      try {
        await db.insert(contacts).values({
          name: clean.name,
          email: clean.email,
          phone: clean.phone || null,
          projectType: clean.projectType,
          budget: clean.budget || null,
          message: clean.message,
        });
        stored = true;
      } catch (e) {
        console.error("[contact] database insert failed:", e);
      }
    }

    /* 2 ── email the inquiry as a formatted table */
    let emailed = false;
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);
        const from =
          process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
        const to = process.env.CONTACT_TO_EMAIL ?? "avishahir4812@gmail.com";

        const inquiry = buildInquiryEmail(clean, receivedAtIst);
        const result = await resend.emails.send({
          from,
          to,
          replyTo: clean.email,
          subject: inquiry.subject,
          html: inquiry.html,
          text: inquiry.text,
        });
        emailed = !result.error;

        // friendly auto-reply to the sender (best-effort)
        const auto = buildAutoReply(clean);
        resend.emails
          .send({ from, to: clean.email, subject: auto.subject, html: auto.html, text: auto.text })
          .catch(() => undefined);
      } catch (e) {
        console.error("[contact] email delivery failed:", e);
      }
    } else {
      console.warn(
        "[contact] RESEND_API_KEY not set — inquiry stored:",
        stored,
        "| from:",
        clean.email
      );
    }

    if (!stored && !emailed) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "The message couldn't be delivered right now — please email me directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, stored, emailed });
  } catch (e) {
    console.error("[contact] unexpected error:", e);
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }
}
