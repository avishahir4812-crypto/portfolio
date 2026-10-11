"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { profile, projects } from "@/lib/site";
import { GithubIcon } from "./BrandIcons";
import SectionHeading from "./SectionHeading";
import { EASE, Reveal } from "./motion-primitives";

/*
   DUAL-LAYER IMAGE SYSTEM
   Layer 1 (bottom): Professional SVG mockup — hamesha visible, instantly
   Layer 2 (top):    Real screenshot — load hone par cover karega, 404 par hat jayega
   Result: Har project mein DeltaDesk wala dabba dikhega. Khali space KABHI nahi.
*/

function buildMockupSVG(
  title: string,
  domain: string,
  index: string | number
): string {
  const d = domain || "project.live";
  const safeTitle = String(title).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const safeDomain = String(d).replace(/&/g, "&amp;").replace(/</g, "&lt;");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
  <rect width="1600" height="1000" fill="#e9e5da"/>
  <text x="800" y="620" font-family="Georgia,serif" font-size="600" text-anchor="middle" fill="none" stroke="#17140f" stroke-opacity="0.06" stroke-width="2">${index}</text>
  <rect width="1600" height="60" fill="#f3f0e9"/>
  <circle cx="40" cy="30" r="8" fill="#ff4d00"/>
  <circle cx="68" cy="30" r="8" fill="#17140f" opacity="0.12"/>
  <circle cx="96" cy="30" r="8" fill="#17140f" opacity="0.12"/>
  <rect x="140" y="14" width="480" height="32" rx="16" fill="#fff" opacity="0.5" stroke="#17140f" stroke-opacity="0.12"/>
  <text x="164" y="36" font-family="ui-monospace,monospace" font-size="15" fill="#8d887c">https://${safeDomain}</text>
  <text x="880" y="42" font-family="ui-monospace,monospace" font-size="16" letter-spacing="4" fill="#8d887c">P/${index} — PREVIEW</text>
  <rect x="880" y="160" width="580" height="360" rx="6" fill="#f3f0e9" stroke="#17140f" stroke-opacity="0.1"/>
  <rect x="916" y="200" width="280" height="18" fill="#17140f" opacity="0.75"/>
  <rect x="916" y="236" width="400" height="8" fill="#17140f" opacity="0.15"/>
  <rect x="916" y="256" width="340" height="8" fill="#17140f" opacity="0.15"/>
  <rect x="916" y="300" width="140" height="42" rx="2" fill="#ff4d00"/>
  <rect x="916" y="390" width="508" height="1" fill="#17140f" opacity="0.12"/>
  <rect x="916" y="424" width="508" height="1" fill="#17140f" opacity="0.12"/>
  <rect x="916" y="458" width="508" height="1" fill="#17140f" opacity="0.12"/>
  <text x="100" y="780" font-family="Georgia,serif" font-size="100" font-weight="bold" fill="#17140f">${safeTitle}</text>
  <rect x="100" y="810" width="180" height="10" fill="#ff4d00"/>
  <text x="100" y="890" font-family="ui-monospace,monospace" font-size="22" letter-spacing="5" fill="#8d887c">LIVE PREVIEW — ${safeDomain}</text>
  <circle cx="1300" cy="760" r="280" fill="none" stroke="#17140f" stroke-opacity="0.05" stroke-width="1.5"/>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function ProjectImage({
  p,
  priority,
}: {
  p: (typeof projects)[number];
  priority?: boolean;
}) {
  const hasImage = typeof p.image === "string" && p.image.trim().length > 0;
  const [imgError, setImgError] = useState(false);

  const domain = (p.live || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  const cls =
    "object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]";

  return (
    <>
      {/* LAYER 1: Mockup — hamesha render, hamesha visible */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={buildMockupSVG(p.title, domain, p.index)}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full ${cls}`}
      />

      {/* LAYER 2: Real screenshot — sirf tab render jab path valid + no error */}
      {hasImage && !imgError && (
        <Image
          src={p.image}
          alt={`${p.title} — live website preview`}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 58vw"
          onError={() => setImgError(true)}
          className={`relative z-10 ${cls}`}
        />
      )}
    </>
  );
}

export default function Projects() {
  return (
    <section
      id="work"
      className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-24"
    >
      <SectionHeading
        index="01"
        tag="Selected Work 2024 — 2026"
        title="Selected work."
        description="Every project below is deployed and live — open them, resize them, inspect the network tab. They hold up."
      />

      <div className="space-y-16 md:space-y-24">
        {projects.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={`${p.index}-${p.title}`}
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
            >
              {/* ─── IMAGE BOX ─── */}
              <motion.a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                data-cursor
                data-cursor-text="Visit"
                aria-label={`Visit ${p.title} live site`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: EASE }}
                className={`group relative block overflow-hidden rounded-[2px] bg-paper-2 lg:col-span-7 ${
                  flip ? "lg:order-2" : ""
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <ProjectImage p={p} priority={i < 2} />
                  {/* sweep sheen */}
                  <div className="pointer-events-none absolute inset-0 z-20 -translate-x-full bg-gradient-to-r from-transparent via-paper/25 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full" />
                </div>
                {/* live badge */}
                <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full bg-paper/90 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.22em] backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Live —{" "}
                  {p.live.replace("https://", "").replace(/\/$/, "")}
                </div>
                {/* index watermark */}
                <span className="pointer-events-none absolute -bottom-1 right-2 z-20 font-display text-[7rem] font-medium leading-none text-outline opacity-60 md:text-[9rem]">
                  {p.index}
                </span>
              </motion.a>

              {/* ─── CONTENT ─── */}
              <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                <Reveal delay={0.1}>
                  <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-3">
                    <span className="text-accent">P/{p.index}</span>
                    <span className="h-px w-10 bg-line" />
                    <span>{p.category}</span>
                    <span className="h-px w-10 bg-line" />
                    <span>{p.year}</span>
                  </div>
                </Reveal>
                <Reveal delay={0.18}>
                  <h3 className="mt-5 font-display text-4xl font-medium tracking-tight md:text-5xl">
                    {p.title}
                    <span className="text-accent">.</span>
                  </h3>
                </Reveal>
                <Reveal delay={0.26}>
                  <p className="mt-5 text-[15px] leading-relaxed text-ink-2">
                    {p.description}
                  </p>
                </Reveal>
                <Reveal delay={0.34}>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="border border-line px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-2 transition-colors duration-300 hover:border-accent hover:text-accent"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={0.42}>
                  <div className="mt-8 flex items-center gap-6">
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="hover"
                      className="group inline-flex items-center gap-2 border-b-2 border-ink pb-1 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-accent hover:text-accent"
                    >
                      Visit Live Site
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </a>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="hover"
                      aria-label={`${p.title} source code on GitHub`}
                      className="text-ink-2 transition-all duration-300 hover:-translate-y-1 hover:text-ink"
                    >
                      <GithubIcon className="h-5 w-5" />
                    </a>
                  </div>
                </Reveal>
              </div>
            </article>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-line pt-10 text-center">
          <p className="font-display text-2xl italic text-ink-2 md:text-3xl">
            Plus the internal builds — AQI Calculator, Map Clustering
            engine & a food-ordering platform.
          </p>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent"
          >
            Browse the full archive on GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
