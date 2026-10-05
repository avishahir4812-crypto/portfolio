"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { profile, projects } from "@/lib/site";
import { GithubIcon } from "./BrandIcons";
import SectionHeading from "./SectionHeading";
import { EASE, Reveal } from "./motion-primitives";

export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-24">
      <SectionHeading
        index="05"
        tag="Selected Work 2024 — 2026"
        title="Selected work."
        description="Every project below is deployed and live — open them, resize them, inspect the network tab. They hold up."
      />

      <div className="space-y-16 md:space-y-24">
        {projects.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={p.index}
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
            >
              {/* image */}
              <motion.a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                data-cursor
                data-cursor-text="Visit"
                initial={{ clipPath: "inset(0 0 100% 0)", y: 40 }}
                whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 1, ease: EASE }}
                className={`group relative block overflow-hidden rounded-[2px] bg-paper-2 lg:col-span-7 ${
                  flip ? "lg:order-2" : ""
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={`${p.title} — live website preview`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  {/* sweep sheen */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-paper/25 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full" />
                </div>
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-paper/90 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.22em] backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Live — {p.live.replace("https://", "").replace(/\/$/, "")}
                </div>
                <span className="pointer-events-none absolute -bottom-1 right-2 font-display text-[7rem] font-medium leading-none text-outline opacity-60 md:text-[9rem]">
                  {p.index}
                </span>
              </motion.a>

              {/* content */}
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
                        className="border border-line px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-2"
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
            Plus the internal builds — AQI Calculator, Map Clustering engine & a food-ordering platform.
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
