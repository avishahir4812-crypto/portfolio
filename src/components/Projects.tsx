"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { profile, projects } from "@/lib/site";
import { GithubIcon } from "./BrandIcons";
import SectionHeading from "./SectionHeading";
import { EASE, Reveal } from "./motion-primitives";

/** 
 * PROFESSIONAL MOCKUP GENERATOR (DeltaDesk Style)
 * Yeh function ek data-URI SVG banata hai jo bilkul aapke 
 * screenshot (DeltaDesk) jaisa dikhta hai.
 */
function buildMockupSVG(title: string, domain: string, index: string | number): string {
  const d = domain || "project.live";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
    <rect width="1600" height="1000" fill="#f3f0e9"/>
    <!-- Large Background Index -->
    <text x="800" y="650" font-family="Georgia, serif" font-size="700" text-anchor="middle" fill="none" stroke="#17140f" stroke-opacity="0.06" stroke-width="2">${index}</text>
    
    <!-- Browser Chrome -->
    <rect x="0" y="0" width="1600" height="60" fill="#e9e5da"/>
    <circle cx="40" cy="30" r="8" fill="#ff4d00"/>
    <circle cx="70" cy="30" r="8" fill="#17140f" opacity="0.1"/>
    <circle cx="100" cy="30" r="8" fill="#17140f" opacity="0.1"/>
    <rect x="150" y="15" width="500" height="30" rx="15" fill="#ffffff" opacity="0.5"/>
    <text x="170" y="36" font-family="monospace" font-size="16" fill="#8d887c">https://${d}</text>
    
    <!-- Content Mockup -->
    <text x="100" y="740" font-family="Georgia, serif" font-size="120" font-weight="bold" fill="#17140f">${title}</text>
    <rect x="100" y="780" width="180" height="12" fill="#ff4d00"/>
    <text x="100" y="860" font-family="monospace" font-size="24" letter-spacing="4" fill="#8d887c">LIVE PREVIEW — ${d}</text>
    
    <!-- Abstract UI Elements (Right Side) -->
    <rect x="950" y="200" width="500" height="350" rx="4" fill="#ffffff" stroke="#17140f" stroke-opacity="0.08"/>
    <rect x="980" y="240" width="280" height="20" fill="#17140f" opacity="0.7"/>
    <rect x="980" y="280" width="400" height="8" fill="#17140f" opacity="0.1"/>
    <rect x="980" y="300" width="350" height="8" fill="#17140f" opacity="0.1"/>
    <rect x="980" y="360" width="140" height="40" fill="#ff4d00"/>
    <circle cx="1300" cy="750" r="300" fill="none" stroke="#17140f" stroke-opacity="0.05" stroke-width="1.5"/>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function ProjectImage({ p, priority }: { p: (typeof projects)[number]; priority?: boolean }) {
  // Check if image exists in data
  const hasImage = !!p.image && (typeof p.image === 'string' ? p.image.length > 0 : true);
  const [error, setError] = useState(!hasImage);

  const domain = (p.live || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  const imgCls = "object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]";

  if (error) {
    return (
      <img 
        src={buildMockupSVG(p.title, domain, p.index)} 
        alt={p.title} 
        className={`absolute inset-0 h-full w-full ${imgCls}`}
      />
    );
  }

  return (
    <Image
      src={p.image!}
      alt={p.title}
      fill
      priority={priority}
      sizes="(max-width: 1024px) 100vw, 58vw"
      onError={() => setError(true)}
      className={imgCls}
    />
  );
}

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
            <article key={p.index} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
              {/* Image Section — Ab har project mein professional mockup aayega */}
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
                className={`group relative block overflow-hidden rounded-[2px] bg-paper-2 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <ProjectImage p={p} priority={i === 0} />
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-paper/25 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full" />
                </div>
                
                {/* Overlay Details */}
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-paper/90 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.22em] backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Live — {domainOnly(p.live)}
                </div>
                <span className="pointer-events-none absolute -bottom-1 right-2 font-display text-[7rem] font-medium leading-none text-outline opacity-60 md:text-[9rem]">
                  {p.index}
                </span>
              </motion.a>

              {/* Content Section */}
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
                    {p.title}<span className="text-accent">.</span>
                  </h3>
                </Reveal>
                <Reveal delay={0.26}>
                  <p className="mt-5 text-[15px] leading-relaxed text-ink-2">{p.description}</p>
                </Reveal>
                <Reveal delay={0.34}>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <span key={t} className="border border-line px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-2">
                        {t}
                      </span>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={0.42}>
                  <div className="mt-8 flex items-center gap-6">
                    <a href={p.live} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 border-b-2 border-ink pb-1 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:border-accent hover:text-accent">
                      Visit Live Site
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </a>
                    <a href={profile.github} target="_blank" rel="noreferrer" className="text-ink-2 transition-all hover:-translate-y-1 hover:text-ink">
                      <GithubIcon className="h-5 w-5" />
                    </a>
                  </div>
                </Reveal>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function domainOnly(url: string) {
  return url.replace("https://", "").replace(/\/$/, "");
}
