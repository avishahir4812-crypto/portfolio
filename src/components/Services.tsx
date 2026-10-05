"use client";

import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./motion-primitives";

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-24">
      <SectionHeading
        index="02"
        tag="What I Deliver"
        title="What I deliver."
        description="Not just code — complete, production-ready slices of a product, each owned from schema to screen."
      />

      <div className="border-t border-line">
        {services.map((s, i) => (
          <Reveal key={s.index} delay={i * 0.06} y={28}>
            <div
              data-cursor="hover"
              className="group relative grid grid-cols-12 items-center gap-4 overflow-hidden border-b border-line py-8 transition-colors duration-500 md:py-10"
            >
              {/* hover ink wash */}
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100" />

              <span className="relative col-span-2 font-mono text-[11px] tracking-[0.3em] text-ink-3 transition-colors duration-500 group-hover:text-accent md:col-span-1">
                /{s.index}
              </span>

              <h3 className="relative col-span-10 font-display text-2xl font-medium leading-tight tracking-tight transition-all duration-500 group-hover:translate-x-3 group-hover:text-paper sm:text-3xl md:col-span-4 md:text-[2rem]">
                {s.title}
              </h3>

              <div className="relative col-span-10 col-start-3 md:col-span-5 md:col-start-6">
                <p className="text-sm leading-relaxed text-ink-2 transition-colors duration-500 group-hover:text-paper/70">
                  {s.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-3 transition-colors duration-500 group-hover:border-paper/25 group-hover:text-paper/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative col-span-12 flex md:col-span-2 md:justify-end">
                <ArrowUpRight className="h-7 w-7 text-ink-3 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent md:h-9 md:w-9" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
