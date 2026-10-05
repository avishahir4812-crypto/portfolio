import type { ReactNode } from "react";
import { Reveal, SplitChars } from "./motion-primitives";

export default function SectionHeading({
  index,
  tag,
  title,
  description,
  className = "",
  dark = false,
}: {
  index: string;
  tag: string;
  title: string;
  description?: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={`mb-10 md:mb-14 ${className}`}>
      <Reveal y={20}>
        <div
          className={`mb-6 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] md:text-[11px] ${
            dark ? "text-paper/60" : "text-ink-2"
          }`}
        >
          <span className="text-accent">( {index} )</span>
          <span className={`h-px flex-1 ${dark ? "bg-paper/20" : "bg-line"}`} />
          <span>{tag}</span>
        </div>
      </Reveal>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SplitChars
          as="h2"
          text={title}
          className="max-w-4xl font-display text-[11.5vw] font-medium leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-7xl lg:text-[5.2rem]"
        />
        {description && (
          <Reveal delay={0.25} className="max-w-sm">
            <p
              className={`text-sm leading-relaxed md:text-[15px] ${
                dark ? "text-paper/60" : "text-ink-2"
              }`}
            >
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
