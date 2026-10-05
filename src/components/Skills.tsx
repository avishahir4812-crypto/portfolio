"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Braces, Database, KeyRound, Waypoints } from "lucide-react";
import { useState } from "react";
import { skillFilters, skills, type Skill } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import { EASE, Reveal } from "./motion-primitives";

const FALLBACK_ICONS = [Braces, KeyRound, Database, Waypoints];

/** These skills run in production right now — marked with an accent dot. */
const PRODUCTION = new Set([
  "Python",
  "JavaScript",
  "TypeScript",
  "SQL",
  "React.js",
  "Next.js",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Django",
  "Django REST Framework",
  "FastAPI",
  "REST APIs",
  "MySQL",
  "PostgreSQL",
  "Git",
  "GitHub",
  "Postman",
  "Vercel",
]);

function SkillGlyph({ skill }: { skill: Skill }) {
  if (skill.icon) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`https://skillicons.dev/icons?i=${skill.icon}&theme=light`}
        alt={`${skill.name} logo`}
        width={34}
        height={34}
        loading="lazy"
        className="h-[34px] w-[34px] rounded-[8px]"
      />
    );
  }
  const Icon =
    FALLBACK_ICONS[
      skill.name.length % FALLBACK_ICONS.length
    ];
  return (
    <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[8px] border border-line bg-paper-2">
      <Icon className="h-[18px] w-[18px] text-ink-2" />
    </span>
  );
}

export default function Skills() {
  const [filter, setFilter] = useState<(typeof skillFilters)[number]>("All");
  const visible =
    filter === "All" ? skills : skills.filter((s) => s.category === filter);

  return (
    <section id="skills" className="border-y border-line bg-paper-2/60">
      <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-24">
        <SectionHeading
          index="03"
          tag="Tech Arsenal"
          title="Tools of the trade."
          description="32 technologies — 19 of them running in production right now (see the accent dots). Filter by discipline; every logo is the official one."
        />

        {/* filter tabs */}
        <Reveal>
          <div className="mb-8 flex flex-wrap items-center gap-2">
            {skillFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-cursor="hover"
                className={`relative rounded-full px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  filter === f ? "text-paper" : "text-ink-2 hover:text-ink"
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="skill-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            ))}
            <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.25em] text-ink-3 md:block">
              {visible.length} tools / {skills.length} total
            </span>
          </div>
        </Reveal>

        {/* grid */}
        <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {visible.map((skill, i) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -12 }}
                transition={{ duration: 0.45, delay: i * 0.015, ease: EASE }}
                data-cursor="hover"
                className="group flex items-center gap-3.5 rounded-[2px] border border-line bg-paper px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_14px_30px_-14px_rgba(18,17,15,0.25)] md:px-5"
              >
                <SkillGlyph skill={skill} />
                <div className="min-w-0">
                  <p className="truncate text-[13.5px] font-medium leading-tight">
                    {skill.name}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-3 transition-colors group-hover:text-accent">
                    <span
                      className={`h-1 w-1 shrink-0 rounded-full ${
                        PRODUCTION.has(skill.name) ? "bg-accent" : "bg-ink-3/50"
                      }`}
                    />
                    {skill.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-3">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              in production use — 19
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-ink-3/50" />
              working knowledge — 13
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-ink-3">
            …and the discipline to master whatever the next project demands
          </p>
        </Reveal>
      </div>
    </section>
  );
}
