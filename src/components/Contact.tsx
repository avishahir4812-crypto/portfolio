"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Clock3,
  Database,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { budgetRanges, socials, profile, projectTypes } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import { EASE, Magnetic, Reveal } from "./motion-primitives";

type Status = "idle" | "sending" | "success" | "error";

const inputCls =
  "w-full border-b border-line bg-transparent py-3 text-[15px] outline-none transition-colors duration-300 placeholder:text-ink-3 focus:border-accent";
const labelCls =
  "mb-1 block font-mono text-[10px] uppercase tracking-[0.25em] text-ink-3";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      projectType: String(fd.get("projectType") || ""),
      budget: String(fd.get("budget") || ""),
      message: String(fd.get("message") || ""),
      company: String(fd.get("company") || ""), // honeypot
    };

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Could not send the message."
      );
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="blueprint border-t border-line">
      <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-24">
        <SectionHeading
          index="08"
          tag="Contact — Let's Talk"
          title="Let's build."
          description="Have a project, a role, or just a hard problem? The form lands straight in my inbox — formatted, timestamped, and impossible to miss."
        />

        <div className="grid gap-12 lg:grid-cols-12">
          {/* form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-[2px] border border-line bg-paper-2/60 px-8 text-center"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-ink"
                  >
                    <CheckCircle2 className="h-9 w-9 text-accent" />
                  </motion.span>
                  <h3 className="mt-8 font-display text-4xl font-medium tracking-tight">
                    Message received<span className="text-accent">.</span>
                  </h3>
                  <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-2">
                    It&apos;s in my inbox and archived in the database. I usually
                    reply within <strong className="text-ink">24 hours</strong> —
                    check your spam folder just in case.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    data-cursor="hover"
                    className="link-sweep mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-accent"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={false}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                  className="grid gap-x-8 gap-y-8 sm:grid-cols-2"
                >
                  {/* honeypot — bots only */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
                  />

                  <Reveal className="sm:col-span-1">
                    <label className={labelCls} htmlFor="name">
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      minLength={2}
                      maxLength={80}
                      placeholder="Priya Sharma"
                      className={inputCls}
                    />
                  </Reveal>

                  <Reveal delay={0.05} className="sm:col-span-1">
                    <label className={labelCls} htmlFor="email">
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className={inputCls}
                    />
                  </Reveal>

                  <Reveal delay={0.1} className="sm:col-span-1">
                    <label className={labelCls} htmlFor="phone">
                      Phone / WhatsApp
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 ••••• •••••"
                      className={inputCls}
                    />
                  </Reveal>

                  <Reveal delay={0.15} className="sm:col-span-1">
                    <label className={labelCls} htmlFor="projectType">
                      Project Type <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        defaultValue=""
                        className={`${inputCls} appearance-none pr-8`}
                        data-cursor="hover"
                      >
                        <option value="" disabled>
                          Select one…
                        </option>
                        {projectTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
                    </div>
                  </Reveal>

                  <Reveal delay={0.2} className="sm:col-span-2">
                    <label className={labelCls} htmlFor="budget">
                      Budget Range
                    </label>
                    <div className="relative">
                      <select
                        id="budget"
                        name="budget"
                        defaultValue=""
                        className={`${inputCls} appearance-none pr-8`}
                        data-cursor="hover"
                      >
                        <option value="">Not disclosed</option>
                        {budgetRanges.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
                    </div>
                  </Reveal>

                  <Reveal delay={0.25} className="sm:col-span-2">
                    <label className={labelCls} htmlFor="message">
                      Project Details <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      minLength={10}
                      maxLength={3000}
                      rows={5}
                      placeholder="Tell me about the product, the timeline, and what 'done' looks like for you…"
                      className={`${inputCls} resize-none`}
                    />
                  </Reveal>

                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-[2px] border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent-deep sm:col-span-2"
                    >
                      {errorMsg} — you can also email me directly at{" "}
                      {profile.email}
                    </motion.p>
                  )}

                  <Reveal delay={0.3} className="sm:col-span-2">
                    <Magnetic strength={0.2}>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        data-cursor="hover"
                        className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-paper transition-all duration-300 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {status === "sending" ? (
                          <>
                            Sending
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </>
                        )}
                      </button>
                    </Magnetic>
                    <span className="ml-5 align-middle font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
                      avg. reply — under 24h
                    </span>
                  </Reveal>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* info panel */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="rounded-[2px] bg-ink p-8 text-paper md:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/50">
                  Direct lines
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  data-cursor="hover"
                  className="group mt-6 flex items-center justify-between gap-4 border-b border-paper/15 pb-5"
                >
                  <span className="break-all font-display text-xl italic md:text-2xl">
                    {profile.email}
                  </span>
                  <Mail className="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
                <a
                  href={`tel:${profile.phoneHref}`}
                  data-cursor="hover"
                  className="group mt-5 flex items-center justify-between gap-4 border-b border-paper/15 pb-5"
                >
                  <span className="font-display text-xl italic md:text-2xl">
                    {profile.phone}
                  </span>
                  <Phone className="h-5 w-5 shrink-0 text-accent" />
                </a>
                <div className="mt-5 flex items-center justify-between gap-4 border-b border-paper/15 pb-5">
                  <span className="font-display text-xl italic md:text-2xl">
                    Ahmedabad, IN
                  </span>
                  <MapPin className="h-5 w-5 shrink-0 text-accent" />
                </div>

                <div className="mt-8 space-y-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      data-cursor="hover"
                      className="group flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-paper"
                    >
                      <span>{s.label}</span>
                      <span className="text-paper/40 transition-colors group-hover:text-accent">
                        {s.handle}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="flex items-start gap-3 rounded-[2px] border border-line p-5">
                  <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <p className="text-[13px] leading-relaxed text-ink-2">
                    Timezone {profile.timezone} — flexible for calls across IST,
                    EST &amp; CET.
                  </p>
                </div>
                <div className="flex items-start gap-3 rounded-[2px] border border-line p-5">
                  <Database className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <p className="text-[13px] leading-relaxed text-ink-2">
                    Every inquiry is emailed as a formatted table and archived in
                    PostgreSQL.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
