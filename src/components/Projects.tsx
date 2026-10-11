"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { profile, projects } from "@/lib/site";
import { GithubIcon } from "./BrandIcons";
import SectionHeading from "./SectionHeading";
import { EASE, Reveal } from "./motion-primitives";

/* ————————————————————————————————————————————————————————————————
   IMAGE GUARANTEE SYSTEM
   1. Pehle real screenshot try hota hai:  p.image  →  /public path
   2. File missing / 404 / empty hui toh onError automatically ek
      designed inline-SVG "browser mockup" dikha deta hai (neeche
      code mein hi bana hai — koi file nahi chahiye).
      Broken image icon KABHI nahi dikhega.
   Real screenshots ke liye: /public/images/projects/ mein jpgs
   rakho, exact wahi filenames jo lib/site.ts mein likhi hain. Bas.
———————————————————————————————————————————————————————————————— */

type ProjectLike = {
  index: string;
  title: string;
  live: string;
  image: string | StaticImageData;
};

type ProjectFull = ProjectLike & {
  category: string;
  year: string;
  description: string;
  stack: string[];
};

/* ————————————————————————————————————————————————————————————————
   ★ ADDED PROJECT — FUELFLEET (P/01)
   Naya project seedha ISI file mein hardcode kar diya gaya hai:
   • Hamesha list mein SABSE PEHLE dikhega
   • Baaki projects (@/lib/site se aane wale) automatically
     02, 03, 04… renumber ho jayenge — lib/site.ts ko touch karne
     ki zaroorat NAHI hai
   • Agar baad mein FuelFleet ko lib/site.ts mein bhi add kar doge,
     toh duplicate nahi aayega (title se auto-filter ho jata hai)
   Bas `live` mein apni REAL FuelFleet link daal do.
   Screenshot: public/images/projects/fuelfleet.jpg
   (missing hui toh aapka apna mockup fallback sambhal lega)
———————————————————————————————————————————————————————————————— */
const FUEL_FLEET: ProjectFull = {
  index: "01",
  title: "FuelFleet",
  live: "https://app-rosy-eight-13.vercel.app/",
  image: "/images/projects/fuelfleet.jpg",
  category: "Fleet SaaS · Fuel Intelligence",
  year: "2026",
  description:
    "Vehicle & fuel management SaaS for commercial fleets. Every fill-up is photo-verified — drivers snap before/after dashboard photos (plus an optional pump-meter shot) right at the pump, while the app validates the maths and odometer instantly and raises automatic fraud flags. Owners watch every vehicle on clean month-wise spend & litre graphs, and the entire fleet — owners and drivers — talks in one secure group chat with @mentions. Trilingual by design: English, हिन्दी and ગુજરાતી.",
  stack: [
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Photo Verification",
    "Realtime Chat",
    "EN · HI · GU i18n",
  ],
};

/** Theme-matched browser mockup — data-URI SVG. Na network, na file. */
function buildMockupURI(p: Pick<ProjectLike, "index" | "title" | "live">): string {
  const domain = p.live.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
  <rect width="1600" height="1000" fill="#e9e5da"/>
  <circle cx="1330" cy="760" r="330" fill="none" stroke="#17140f" stroke-opacity="0.12" stroke-width="2"/>
  <rect x="0" y="0" width="1600" height="76" fill="#f3f0e9"/>
  <circle cx="52" cy="38" r="10" fill="#ff4d00"/>
  <circle cx="86" cy="38" r="10" fill="#17140f" opacity="0.22"/>
  <circle cx="120" cy="38" r="10" fill="#17140f" opacity="0.22"/>
  <rect x="180" y="19" width="620" height="38" rx="19" fill="#ffffff" opacity="0.65" stroke="#17140f" stroke-opacity="0.15"/>
  <text x="212" y="44" font-family="monospace" font-size="21" fill="#55524a">https://${domain}</text>
  <text x="880" y="48" font-family="monospace" font-size="20" letter-spacing="4" fill="#8d887c">P/${p.index} — PREVIEW</text>
  <rect x="880" y="150" width="620" height="380" rx="6" fill="#f3f0e9" stroke="#17140f" stroke-opacity="0.14"/>
  <rect x="916" y="186" width="300" height="16" fill="#17140f" opacity="0.85"/>
  <rect x="916" y="222" width="420" height="9" fill="#17140f" opacity="0.25"/>
  <rect x="916" y="244" width="380" height="9" fill="#17140f" opacity="0.25"/>
  <rect x="916" y="290" width="150" height="44" fill="#ff4d00"/>
  <rect x="916" y="392" width="548" height="1.5" fill="#17140f" opacity="0.2"/>
  <rect x="916" y="428" width="548" height="1.5" fill="#17140f" opacity="0.2"/>
  <rect x="916" y="464" width="548" height="1.5" fill="#17140f" opacity="0.2"/>
  <text x="90" y="620" font-family="Georgia, serif" font-size="400" fill="none" stroke="#17140f" stroke-opacity="0.16" stroke-width="3">${p.index}</text>
  <text x="96" y="800" font-family="Georgia, serif" font-size="92" fill="#17140f">${p.title}</text>
  <rect x="98" y="838" width="200" height="10" fill="#ff4d00"/>
  <text x="98" y="912" font-family="monospace" font-size="25" letter-spacing="6" fill="#8d887c">LIVE PREVIEW — ${domain}</text>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * DUAL-LAYER GUARANTEE — image box KABHI blank/empty nahi rehta:
 * 1. Pehle data-URI mockup turant render hota hai (base layer — na
 *    network, na file, na onLoad ka wait).
 * 2. Real screenshot (/public) load hote hi uske UPAR fade-in ho jata
 *    hai; 404 / missing hui toh onError se wo layer hat jati hai aur
 *    neeche ka mockup as-is dikhta rehta hai.
 */
function ProjectImage({
  project,
  priority,
}: {
  project: ProjectLike;
  priority?: boolean;
}) {
  const hasSrc =
    typeof project.image !== "string" || project.image.trim().length > 0;
  const [failed, setFailed] = useState(!hasSrc);
  const [loaded, setLoaded] = useState(false);

  const motionClasses =
    "object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]";

  return (
    <>
      {/* base layer — hamesha visible placeholder */}
      {/* eslint-disable-next-line @next/next/no-img-element -- data-URI fallback, optimization not needed */}
      <img
        src={buildMockupURI(project)}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full ${motionClasses}`}
      />
      {/* real screenshot — load hone par mockup ko cover karta hai */}
      {!failed && (
        <Image
          src={project.image}
          alt={`${project.title} — live website preview`}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 58vw"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`${motionClasses} ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </>
  );
}

export default function Projects() {
  // FuelFleet hamesha pehle; baaki lib/site wale auto-renumber (02, 03…).
  // Agar FuelFleet lib/site mein bhi pada ho, duplicate nahi aata.
  const list: ProjectFull[] = [
    FUEL_FLEET,
    ...projects.filter((p) => p.title !== FUEL_FLEET.title),
  ].map((p, i) => ({ ...p, index: String(i + 1).padStart(2, "0") }));

  return (
    <section id="work" className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-24">
      <SectionHeading
        index="05"
        tag="Selected Work 2024 — 2026"
        title="Selected work."
        description="Every project below is deployed and live — open them, resize them, inspect the network tab. They hold up."
      />

      <div className="space-y-16 md:space-y-24">
        {list.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={`${p.index}-${p.title}`}
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
            >
              {/* image — guaranteed: real file, else auto mockup */}
              <motion.a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                data-cursor
                data-cursor-text="Visit"
                aria-label={`Visit ${p.title} live site`}
                initial={{ clipPath: "inset(0 0 100% 0)", y: 40 }}
                whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 1, ease: EASE }}
                className={`group relative block overflow-hidden rounded-[2px] bg-paper-2 lg:col-span-7 ${
                  flip ? "lg:order-2" : ""
                }`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <ProjectImage project={p} priority={i === 0} />
                  {/* sweep sheen */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-paper/25 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full" />
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
