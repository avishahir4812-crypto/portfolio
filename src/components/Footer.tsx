"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, profile, socials } from "@/lib/site";
import { Magnetic } from "./motion-primitives";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="relative border-t border-line bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 pb-8 pt-12 md:px-12 md:pt-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl font-medium tracking-tight">
              AB<span className="text-accent">.</span>
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-2">
              {profile.role} crafting premium products with Python, Django,
              FastAPI &amp; React — from Ahmedabad, for the world.
            </p>
            <div className="mt-7 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              {profile.availability}
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-3">
              Sitemap
            </p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    data-cursor="hover"
                    className="link-sweep text-sm text-ink-2 transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-3">
              Elsewhere
            </p>
            <ul className="space-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    data-cursor="hover"
                    className="link-sweep text-sm text-ink-2 transition-colors hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start justify-between gap-8 md:col-span-2 md:items-end">
            <div className="text-left md:text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-3">
                Local time — IST
              </p>
              <p className="mt-2 font-display text-2xl italic tabular-nums">
                {time || "--:--:--"}
              </p>
            </div>
            <Magnetic strength={0.35}>
              <a
                href="#top"
                data-cursor="hover"
                aria-label="Back to top"
                className="flex h-14 w-14 items-center justify-center rounded-full border border-line transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-paper"
              >
                <ArrowUp className="h-5 w-5" />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* giant watermark */}
        <div className="pointer-events-none mt-10 select-none overflow-hidden md:mt-14" aria-hidden>
          <p className="text-outline whitespace-nowrap text-center font-display text-[13.5vw] font-semibold leading-[0.8] tracking-tight">
            AVISH BORICHA
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 font-mono text-[9px] uppercase tracking-[0.25em] text-ink-3 md:flex-row md:text-[10px]">
          <span>© 2026 Avish Boricha — All rights reserved</span>
          <span>Next.js · Tailwind · PostgreSQL · Powered by chai</span>
        </div>
      </div>
    </footer>
  );
}
