"use client";

import { ArrowLeft, Printer } from "lucide-react";

export default function PrintControls() {
  return (
    <div className="no-print mx-auto flex max-w-[880px] items-center justify-between px-6 py-6">
      <a
        href="/"
        className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-2 transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to portfolio
      </a>
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-accent"
      >
        <Printer className="h-4 w-4" />
        Print / Save as PDF
      </button>
    </div>
  );
}
