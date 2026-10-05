"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { profile, roles, stats } from "@/lib/site";
import { CountUp, EASE, Magnetic, SplitChars } from "./motion-primitives";

const DELAY = 1.85; // let the preloader finish first

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-flex h-[1.4em] min-w-[260px] overflow-hidden align-bottom sm:min-w-[340px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[i]}
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-110%" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute left-0 whitespace-nowrap text-accent"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="blueprint relative flex min-h-screen flex-col justify-between overflow-hidden pt-24 md:pt-28"
    >
      {/* soft accent glow */}
      <div className="pointer-events-none absolute -right-40 top-24 h-[520px] w-[520px] rounded-full bg-accent/[0.07] blur-3xl" />

      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* ── Left: typography ─────────────────────────────── */}
          <motion.div style={{ opacity: fade }} className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: DELAY, duration: 0.7, ease: EASE }}
              className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-2 md:text-[11px]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              {profile.availability} — {profile.location}
            </motion.p>

            <h1 className="font-display font-medium leading-[0.88] tracking-[-0.03em]">
              <SplitChars
                text={profile.firstName}
                delay={DELAY}
                className="block text-[17.5vw] sm:text-[15vw] lg:text-[8.6rem] xl:text-[9.6rem]"
              />
              <span className="flex items-baseline gap-4 md:gap-6">
                <SplitChars
                  text={profile.lastName}
                  delay={DELAY + 0.18}
                  className="block text-[17.5vw] sm:text-[15vw] lg:text-[8.6rem] xl:text-[9.6rem]"
                />
                <motion.span
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: DELAY + 0.9, duration: 0.6, ease: EASE }}
                  className="font-display text-[5vw] italic text-accent sm:text-4xl lg:text-5xl"
                >
                  ©26
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: DELAY + 0.55, duration: 0.8, ease: EASE }}
              className="mt-8 flex flex-wrap items-baseline gap-x-2 font-mono text-[13px] uppercase tracking-[0.14em] text-ink-2 md:text-sm"
            >
              <span className="text-ink">$ whoami →</span> <RoleRotator />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: DELAY + 0.7, duration: 0.8, ease: EASE }}
              className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-2 md:text-base"
            >
              {profile.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: DELAY + 0.85, duration: 0.8, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={0.25}>
                <a
                  href="#work"
                  data-cursor="hover"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:bg-accent"
                >
                  View Selected Work
                  <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="#contact"
                  data-cursor="hover"
                  className="group inline-flex items-center gap-2 rounded-full border border-ink/25 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:border-accent hover:text-accent"
                >
                  Get in Touch
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Magnetic>
              <div className="ml-2 flex items-center gap-1">
                {[
                  { icon: GithubIcon, href: profile.github, label: "GitHub", external: true },
                  { icon: LinkedinIcon, href: profile.linkedin, label: "LinkedIn", external: true },
                  { icon: Mail, href: `mailto:${profile.email}`, label: "Email", external: false },
                ].map(({ icon: Icon, href, label, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={label}
                    data-cursor="hover"
                    className="flex h-11 w-11 items-center justify-center rounded-full text-ink-2 transition-all duration-300 hover:-translate-y-1 hover:text-accent"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: visual ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: DELAY + 0.6, duration: 1, ease: EASE }}
            className="relative lg:col-span-5"
          >
            <div className="relative ml-auto aspect-[4/5] w-full max-w-[460px]">
              <div className="absolute -inset-0 translate-x-4 translate-y-4 rounded-[2px] border border-ink/15" />
              <div className="relative h-full w-full overflow-hidden rounded-[2px] bg-paper-2">
                <motion.div style={{ y: imgY }} className="absolute inset-[-10%]">
                  <Image
                    src="/images/hero-abstract.jpg"
                    alt="Abstract sculptural ribbon — Avish Boricha portfolio"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>

              {/* rotating badge */}
              <div className="absolute -bottom-8 -left-8 h-28 w-28 md:-left-12 md:h-36 md:w-36">
                <div className="relative h-full w-full rounded-full bg-ink shadow-xl">
                  <svg
                    viewBox="0 0 100 100"
                    className="animate-spin-slow absolute inset-0 h-full w-full"
                  >
                    <defs>
                      <path
                        id="circ"
                        d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                      />
                    </defs>
                    <text className="fill-paper font-mono text-[8.2px] uppercase tracking-[0.24em]">
                      <textPath href="#circ">
                        python · django · react · fastapi ·
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ArrowDown className="h-5 w-5 text-accent" />
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 text-right font-mono text-[10px] uppercase tracking-[0.25em] text-ink-3">
              {profile.coordinates}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Stats strip ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: DELAY + 1, duration: 0.9, ease: EASE }}
        className="mt-10 border-t border-line"
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 px-6 md:grid-cols-4 md:px-12">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-1 border-line py-7 md:py-9 ${
                i !== 0 ? "border-l pl-6 md:pl-10" : ""
              } ${i === 2 ? "border-l-0 pl-0 md:border-l md:pl-10" : ""} ${
                i >= 2 ? "border-t md:border-t-0" : ""
              }`}
            >
              <span className="font-display text-4xl font-medium tracking-tight md:text-5xl">
                <CountUp
                  value={s.value}
                  decimals={s.decimals ?? 0}
                  suffix={s.suffix}
                />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
