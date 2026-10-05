"use client";

import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/site";
import { EASE, Magnetic } from "./motion-primitives";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.75, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-paper/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        {/* scroll progress */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-accent"
          style={{ scaleX: progress }}
        />
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-12">
          <a
            href="#top"
            data-cursor="hover"
            className="group flex items-baseline gap-2 font-display text-lg font-semibold tracking-tight"
          >
            AB<span className="text-accent">.</span>
            <span className="hidden font-mono text-[9px] font-normal uppercase tracking-[0.3em] text-ink-3 transition-colors group-hover:text-ink sm:inline">
              boricha
            </span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-cursor="hover"
                  className="link-sweep font-mono text-[11px] uppercase tracking-[0.22em] text-ink-2 transition-colors hover:text-ink"
                >
                  <span className="mr-1.5 text-accent">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-2 transition-colors hover:text-ink md:flex"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {profile.availability}
            </a>
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                data-cursor="hover"
                className="hidden items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors duration-300 hover:bg-accent lg:flex"
              >
                Let&apos;s Talk
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen(!open)}
              data-cursor="hover"
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors hover:bg-ink hover:text-paper lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[75] flex flex-col justify-between bg-ink px-6 pb-10 pt-28"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <ul className="space-y-2">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.6, ease: EASE }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-paper/10 py-4"
                  >
                    <span className="font-mono text-[10px] tracking-[0.3em] text-accent">
                      0{i + 1}
                    </span>
                    <span className="font-display text-5xl tracking-tight text-paper transition-transform duration-300 group-hover:translate-x-3">
                      {l.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-paper/50"
            >
              <span>{profile.email}</span>
              <span>{profile.location}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
