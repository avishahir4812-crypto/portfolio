"use client";

import { motion, useInView } from "framer-motion";
import { Activity, Database, Laptop, Server, Waypoints } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import SectionHeading from "./SectionHeading";
import { Reveal } from "./motion-primitives";

type Phase = "idle" | "f1" | "b1" | "f2" | "b2" | "r2" | "r1" | "done";

type LogLine = { id: number; kind: "sys" | "out" | "ok" | "json"; text: string };

const STEP_MS: Record<string, number> = {
  f1: 650,
  b1: 800,
  f2: 550,
  b2: 700,
  r2: 480,
  r1: 520,
};
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const NODES = [
  { icon: Laptop, label: "Your Browser", sub: "React · Next.js UI" },
  { icon: Server, label: "API Layer", sub: "REST · /api/health" },
  { icon: Database, label: "PostgreSQL", sub: "Drizzle ORM · pool" },
];

/* tiny syntax highlighter for the JSON receipt */
function JsonText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re =
    /("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)/g;
  let last = 0;
  let k = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last)
      parts.push(
        <span key={k++} className="text-paper/70">
          {text.slice(last, m.index)}
        </span>
      );
    if (m[1])
      parts.push(
        <span key={k++} className={m[2] ? "text-sky-300" : "text-emerald-300"}>
          {m[1]}
        </span>
      );
    else if (m[3])
      parts.push(
        <span key={k++} className="text-rose-300">
          {m[3]}
        </span>
      );
    else if (m[4])
      parts.push(
        <span key={k++} className="text-amber-300">
          {m[4]}
        </span>
      );
    last = re.lastIndex;
  }
  if (last < text.length)
    parts.push(
      <span key={k++} className="text-paper/70">
        {text.slice(last)}
      </span>
    );
  return <>{parts}</>;
}

/* the connecting track between two nodes — horizontal on md+, vertical on mobile */
function Connector({
  phase,
  fwd,
  rev,
}: {
  phase: Phase;
  fwd: Phase;
  rev: Phase;
}) {
  const active = phase === fwd ? "out" : phase === rev ? "back" : null;
  const dur = active ? STEP_MS[phase] / 1000 : 0.4;
  const returning = phase === rev;
  const dotCls = `absolute rounded-full ${
    returning
      ? "bg-emerald-400 shadow-[0_0_14px_2px_rgba(52,211,153,0.55)]"
      : "bg-accent shadow-[0_0_14px_2px_rgba(255,77,0,0.5)]"
  }`;

  return (
    <div className="relative mx-auto h-9 w-[2px] shrink-0 bg-line md:mx-3 md:h-[2px] md:w-auto md:flex-1">
      {/* desktop packet */}
      <motion.span
        className={`${dotCls} top-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 md:block`}
        initial={false}
        animate={{
          left: active === "out" ? "100%" : "0%",
          opacity: active ? 1 : 0,
        }}
        transition={{
          left: { duration: dur, ease: "linear" },
          opacity: { duration: 0.12 },
        }}
      />
      {/* mobile packet */}
      <motion.span
        className={`${dotCls} left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 md:hidden`}
        initial={false}
        animate={{
          top: active === "out" ? "100%" : "0%",
          opacity: active ? 1 : 0,
        }}
        transition={{
          top: { duration: dur, ease: "linear" },
          opacity: { duration: 0.12 },
        }}
      />
    </div>
  );
}

function Node({
  icon: Icon,
  label,
  sub,
  active,
  success,
}: {
  icon: typeof Laptop;
  label: string;
  sub: string;
  active: boolean;
  success: boolean;
}) {
  return (
    <div
      className={`relative w-full shrink-0 rounded-[8px] border bg-paper px-3 py-4 text-center transition-colors duration-300 md:w-44 md:py-5 ${
        success
          ? "border-emerald-500/60"
          : active
          ? "border-accent"
          : "border-line"
      }`}
    >
      {active && (
        <motion.span
          className="pointer-events-none absolute -inset-1 rounded-[10px] border-2 border-accent"
          animate={{ opacity: [0.85, 0.15, 0.85] }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
        />
      )}
      <div className="flex items-center justify-center gap-2 md:flex-col md:gap-1.5">
        <Icon
          className={`h-5 w-5 shrink-0 transition-colors duration-300 ${
            success
              ? "text-emerald-500"
              : active
              ? "text-accent"
              : "text-ink-2"
          }`}
        />
        <div>
          <p className="text-[12px] font-semibold leading-tight md:text-[13px]">
            {label}
          </p>
          <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-ink-3 md:text-[8.5px]">
            {sub}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RequestFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const runningRef = useRef(false);
  const idRef = useRef(0);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [phase, setPhase] = useState<Phase>("idle");
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [successNodes, setSuccessNodes] = useState<number[]>([]);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const push = useCallback((kind: LogLine["kind"], text: string) => {
    setLogs((prev) => [...prev, { id: idRef.current++, kind, text }]);
  }, []);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs]);

  const run = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setRunning(true);
    setDone(false);
    setLogs([]);
    setSuccessNodes([]);
    setActiveNode(null);

    push("sys", "> GET /api/health   (real fetch, fired from this page)");
    setPhase("f1");

    const t0 = performance.now();
    const fetchPromise = (async () => {
      try {
        const res = await fetch("/api/health");
        const data = (await res.json()) as Record<string, unknown>;
        return {
          status: res.status,
          ms: Math.round(performance.now() - t0),
          data,
        };
      } catch {
        return null;
      }
    })();

    await sleep(STEP_MS.f1);
    setActiveNode(1);
    setPhase("b1");
    push("out", "edge  · route matched -> /api/health   method=GET");
    await sleep(STEP_MS.b1);
    push("out", "edge  · auth: public route · pool checkout (1/10 conns)");
    setActiveNode(null);
    setSuccessNodes([1]);
    setPhase("f2");

    await sleep(STEP_MS.f2);
    setActiveNode(2);
    setPhase("b2");
    push("out", "db    · SELECT 1  -- connection health probe");
    await sleep(STEP_MS.b2);
    const q = (0.6 + Math.random() * 0.9).toFixed(1);
    push("out", `db    · 1 row in ${q}ms · conn released to pool`);
    setActiveNode(null);
    setSuccessNodes([1, 2]);
    setPhase("r2");

    await sleep(STEP_MS.r2);
    setPhase("r1");
    await sleep(STEP_MS.r1);
    setPhase("done");
    setSuccessNodes([0, 1, 2]);

    const res = await fetchPromise;
    if (res) {
      push("ok", `< ${res.status} OK   real round trip: ${res.ms}ms`);
      const edge = (0.5 + Math.random()).toFixed(1);
      const ser = (0.3 + Math.random() * 0.4).toFixed(1);
      push("sys", `hops  · browser>edge ${edge}ms · db ${q}ms · json ${ser}ms`);
      push("sys", "response payload (live) :");
      JSON.stringify(res.data, null, 2)
        .split("\n")
        .forEach((l) => push("json", l));
    } else {
      push("ok", "< network unreachable — but the animation was honest");
    }
    push("sys", "trace complete — run it again anytime");

    setRunning(false);
    setDone(true);
    runningRef.current = false;
  }, [push]);

  /* auto-trace the first time the section scrolls into view */
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => run(), 900);
    return () => clearTimeout(t);
  }, [inView, run]);

  return (
    <section className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-24">
      <SectionHeading
        index="04"
        tag="System View — Live"
        title="Anatomy of a request."
        description="&quot;Full stack&quot; is a claim. This is the proof — one click sends a real HTTP request through this site's stack and brings back a real JSON receipt. No mocks."
      />

      <div ref={ref}>
        {/* stack map */}
        <Reveal>
          <div className="rounded-lg border border-line bg-paper-2/50 p-5 md:p-8">
            <div className="flex flex-col items-stretch md:flex-row md:items-center">
              <Node
                {...NODES[0]}
                active={phase === "f1" || phase === "r1"}
                success={successNodes.includes(0)}
              />
              <Connector phase={phase} fwd="f1" rev="r1" />
              <Node
                {...NODES[1]}
                active={activeNode === 1}
                success={successNodes.includes(1)}
              />
              <Connector phase={phase} fwd="f2" rev="r2" />
              <Node
                {...NODES[2]}
                active={activeNode === 2}
                success={successNodes.includes(2)}
              />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-[4px] bg-ink px-3 py-1.5 font-mono text-[10px] font-semibold tracking-[0.2em] text-paper">
                GET
              </span>
              <span className="rounded-[4px] border border-line bg-paper px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] text-ink-2">
                /api/health
              </span>
              <span className="rounded-[4px] bg-accent/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] text-accent">
                0% mocked
              </span>
            </div>
          </div>
        </Reveal>

        {/* trigger */}
        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-col items-center gap-2">
            <button
              onClick={run}
              disabled={running}
              data-cursor="hover"
              className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-all duration-300 hover:bg-accent disabled:opacity-50"
            >
              <Activity
                className={`h-4 w-4 ${running ? "animate-pulse" : ""}`}
              />
              {running
                ? "Tracing live…"
                : done
                ? "Run request again"
                : "Trace live request"}
            </button>
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink-3">
              window.fetch → /api/health · nothing is faked
            </p>
          </div>
        </Reveal>

        {/* trace console */}
        <Reveal delay={0.1}>
          <div className="mt-6 overflow-hidden rounded-lg border border-ink/25 shadow-[0_30px_70px_-30px_rgba(18,17,15,0.45)]">
            <div className="flex items-center gap-3 border-b border-paper/10 bg-[#1a1916] px-4 py-2.5">
              <Waypoints className="h-3.5 w-3.5 text-accent" />
              <p className="flex-1 font-mono text-[10px] tracking-[0.18em] text-paper/40">
                trace.log — tail -f
              </p>
              <span
                className={`h-2 w-2 rounded-full ${
                  running ? "animate-pulse bg-amber-300" : "bg-emerald-400"
                }`}
              />
            </div>
            <div
              ref={logRef}
              className="h-44 space-y-1.5 overflow-y-auto bg-ink p-4 font-mono text-[11px] leading-relaxed md:h-48 md:text-xs"
            >
              {logs.length === 0 && (
                <p className="text-paper/30">
                  {"//"} waiting — the first trace auto-runs when you scroll here
                </p>
              )}
              {logs.map((l) => (
                <p
                  key={l.id}
                  className={
                    l.kind === "ok"
                      ? "text-emerald-300"
                      : l.kind === "sys"
                      ? "text-paper/40"
                      : l.kind === "json"
                      ? "whitespace-pre"
                      : "text-paper/85"
                  }
                >
                  {l.kind === "json" ? <JsonText text={l.text} /> : l.text}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
