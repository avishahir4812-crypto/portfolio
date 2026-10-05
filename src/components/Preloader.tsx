"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "./motion-primitives";

const letters = "AVISH".split("");

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";
    let raf = 0;
    const start = performance.now();
    const DURATION = 1050;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setDone(true);
        document.documentElement.classList.remove("lenis-stopped");
        document.body.style.overflow = "";
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-8 md:px-12"
      initial={{ y: 0 }}
      animate={done ? { y: "-100%" } : {}}
      transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
      onAnimationComplete={() => done && setGone(true)}
    >
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-paper/50">
        <span>Portfolio — MMXXVI</span>
        <span>Ahmedabad, IN</span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <h1 className="font-display text-[16vw] leading-[0.85] tracking-tight text-paper md:text-[11vw]">
          {letters.map((l, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom"
            >
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + i * 0.07,
                  ease: EASE,
                }}
              >
                {l}
                {i === letters.length - 1 && (
                  <span className="text-accent">.</span>
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="text-right">
          <div className="font-display text-[13vw] leading-none text-accent md:text-[9vw]">
            {count}
            <span className="text-paper/40 text-[0.4em] align-top">%</span>
          </div>
          <div className="mt-2 h-px w-28 bg-paper/20 md:w-44">
            <div
              className="h-px bg-accent transition-[width] duration-100"
              style={{ width: `${count}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-paper/50">
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Compiling excellence
        </span>
        <span>python · django · react</span>
      </div>
    </motion.div>
  );
}
