"use client";

import { Building2, Plus } from "lucide-react";
import { experience } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./motion-primitives";

export default function Experience() {
  return (
    <section id="experience" className="bg-ink text-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-24">
        <SectionHeading
          dark
          index="06"
          tag="Professional Experience"
          title="Where I've worked."
          description="Real products, real deadlines, real users — not tutorial clones."
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* company block */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="sticky top-28">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/20">
                    <Building2 className="h-5 w-5 text-accent" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-paper/50">
                      {experience.type}
                    </p>
                    <p className="font-medium">{experience.company}</p>
                  </div>
                </div>
                <h3 className="mt-8 font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
                  {experience.role}
                  <span className="text-accent">.</span>
                </h3>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/50">
                  {experience.place}
                </p>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-paper/65">
                  {experience.summary}
                </p>

                {/* tools used */}
                <div className="mt-8 flex flex-wrap items-center gap-2.5">
                  {experience.tools.map((t) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={t}
                      src={`https://skillicons.dev/icons?i=${t}&theme=dark`}
                      alt={`${t} logo`}
                      width={36}
                      height={36}
                      loading="lazy"
                      className="h-9 w-9 rounded-[8px] opacity-80 transition-all duration-300 hover:-translate-y-1 hover:opacity-100"
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* bullets + shipped work */}
          <div className="lg:col-span-7">
            <ul className="space-y-0 border-t border-paper/15">
              {experience.bullets.map((b, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <li
                    data-cursor="hover"
                    className="group flex items-start gap-5 border-b border-paper/15 py-6"
                  >
                    <Plus className="mt-1 h-4 w-4 shrink-0 text-accent transition-transform duration-300 group-hover:rotate-90" />
                    <p className="text-[15px] leading-relaxed text-paper/80 transition-transform duration-300 group-hover:translate-x-2 md:text-base">
                      {b}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.2}>
              <p className="mb-5 mt-10 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/50">
                Shipped during the internship
              </p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
              {experience.shipped.map((s, i) => (
                <Reveal key={s.name} delay={0.25 + i * 0.08}>
                  <div
                    data-cursor="hover"
                    className="group h-full rounded-[2px] border border-paper/15 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent"
                  >
                    <p className="font-mono text-[10px] tracking-[0.3em] text-accent">
                      0{i + 1}
                    </p>
                    <h4 className="mt-4 font-display text-xl font-medium leading-tight">
                      {s.name}
                    </h4>
                    <p className="mt-2 text-[13px] leading-relaxed text-paper/55">
                      {s.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
