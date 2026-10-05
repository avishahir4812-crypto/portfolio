"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import { languages, profile, softSkills } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import { EASE, Reveal } from "./motion-primitives";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-24">
      <SectionHeading
        index="01"
        tag="About Me"
        title="Engineer by craft."
        description="A junior profile on paper, a senior engineer's discipline in practice — planned, architected and polished before it ever ships."
      />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* portrait / workspace visual */}
        <div className="lg:col-span-5">
          <motion.figure
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: EASE }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-paper-2"
          >
            <Image
              src="/images/about-workspace.jpg"
              alt="Avish Boricha's minimal development workspace"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.figure>
          <Reveal delay={0.2}>
            <figcaption className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-ink-3">
              <span className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-accent" />
                The studio — Ahmedabad
              </span>
              <span>fig. 01</span>
            </figcaption>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 rounded-[2px] bg-ink p-7 text-paper">
              <p className="font-display text-xl italic leading-snug md:text-2xl">
                “Clean code is a habit. Great products are a promise.”
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/50">
                — Avish Boricha
              </p>
            </div>
          </Reveal>
        </div>

        {/* copy */}
        <div className="flex flex-col gap-7 lg:col-span-7">
          {profile.about.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.12}>
              <p className="text-base leading-[1.85] text-ink-2 md:text-lg">
                {p}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <div className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
              {/* languages */}
              <div>
                <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-3">
                  Languages I speak
                </h3>
                <ul className="divide-y divide-line">
                  {languages.map((l) => (
                    <li
                      key={l.name}
                      className="group flex items-center justify-between py-3"
                      data-cursor="hover"
                    >
                      <span className="font-medium transition-transform duration-300 group-hover:translate-x-1.5">
                        {l.name}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3">
                        {l.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* soft skills */}
              <div>
                <h3 className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-3">
                  How I work
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {softSkills.map((s) => (
                    <span
                      key={s}
                      data-cursor="hover"
                      className="rounded-full border border-line px-4 py-2 text-[13px] text-ink-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href="/resume"
                  target="_blank"
                  data-cursor="hover"
                  className="group mt-8 inline-flex items-center gap-2 border-b border-ink pb-1 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors hover:border-accent hover:text-accent"
                >
                  View printable résumé
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
