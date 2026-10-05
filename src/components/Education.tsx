"use client";

import { ArrowUpRight } from "lucide-react";
import { education } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./motion-primitives";

export default function Education() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-24">
      <SectionHeading
        index="07"
        tag="Education & Training"
        title="The foundation."
        description="A 96% board score, an 8.95 CGPA in progress, and an industry certification — consistency is the pattern."
      />

      <div className="border-t border-line">
        {education.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.06} y={24}>
            <div
              data-cursor="hover"
              className="group grid grid-cols-12 items-center gap-4 border-b border-line py-6 transition-colors duration-300 hover:bg-paper-2/70 md:py-8"
            >
              <span className="col-span-2 pl-2 font-mono text-[11px] tracking-[0.25em] text-ink-3 transition-colors group-hover:text-accent md:col-span-1">
                0{i + 1}
              </span>
              <div className="col-span-10 md:col-span-5">
                <h3 className="font-display text-2xl font-medium leading-tight tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
                  {e.title}
                </h3>
                <p className="mt-1.5 text-[13px] text-ink-2">{e.school}</p>
              </div>
              <div className="col-span-6 pl-2 md:col-span-3 md:pl-0">
                <p className="font-display text-xl italic text-accent md:text-2xl">
                  {e.score}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-3">
                  {e.scoreLabel}
                </p>
              </div>
              <div className="col-span-6 flex items-center justify-between pr-2 md:col-span-3 md:justify-end md:gap-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-2">
                  {e.period}
                </span>
                <ArrowUpRight className="h-5 w-5 -translate-x-2 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
