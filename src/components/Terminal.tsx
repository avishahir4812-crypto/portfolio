"use client";

import { useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { profile, projects } from "@/lib/site";
import { Reveal } from "./motion-primitives";

type Line = {
  id: number;
  kind: "cmd" | "out" | "ok" | "err" | "sys";
  text: string;
};

const INTRO: Omit<Line, "id">[] = [
  { kind: "sys", text: "Last login: just now — from your browser" },
  { kind: "sys", text: "Welcome to avish-shell v2.6 (ttys000)" },
  { kind: "sys", text: "Type 'help' — or tap a command below" },
];

const COMMANDS: Record<string, () => string[] | Promise<string[]>> = {
  help: () => [
    "available commands:",
    "  whoami        who's behind this site",
    "  about         the short version",
    "  skills        the full arsenal",
    "  projects      live, deployed work",
    "  experience    where I've worked",
    "  education     the foundation",
    "  socials       github - linkedin - email",
    "  contact       reach me directly",
    "  ping          real request -> /api/health (live)",
    "  hire          the shortcut to my inbox",
    "  clear         wipe the terminal",
  ],
  whoami: () => [
    "Avish Boricha — Python Full Stack Developer",
    "production exp: Quantum Technology · 8.95 CGPA · open to work — 2026",
  ],
  about: () => [
    "Products, not pages — production React frontends on",
    "Django / FastAPI backends, owned from schema to deploy.",
  ],
  skills: () => [
    "Languages   Python · TypeScript · JavaScript · PHP · SQL",
    "Frontend    React.js · Next.js · Tailwind · Bootstrap · Vite",
    "Backend     Django · DRF · FastAPI · Node.js · Express · JWT/OAuth",
    "Databases   MySQL · PostgreSQL · MongoDB · SQLAlchemy",
    "Tools       Git · GitHub · Docker · Postman · Figma · Vercel · Linux",
  ],
  projects: () => [
    ...projects.map(
      (p, i) =>
        `${String(i + 1).padStart(2, "0")}  ${p.title.padEnd(24, " ")}${p.live}`
    ),
    "",
    "all five are live — click a URL.",
  ],
  experience: () => [
    "Quantum Technology, Gandhinagar — Python Full Stack Developer Intern",
    "> shipped: AQI Calculator · Map Clustering System · Food Web App",
    "> stack:   Django REST APIs · React.js · MySQL · Git/GitHub · Postman",
  ],
  education: () => [
    "BCA — Kadi University (2023–26) .......... CGPA 8.95 / 10",
    "HSC — GSEB Board ......................... 96%",
    "Python Full Stack — TOPS Technologies .... pursuing",
  ],
  socials: () => [
    `github    ${profile.github}`,
    `linkedin  ${profile.linkedin}`,
    `email     ${profile.email}`,
  ],
  contact: () => [
    `email     ${profile.email}`,
    `phone     ${profile.phone}`,
    "location  Ahmedabad, Gujarat (GMT +5:30)",
    "form      scroll to #contact — replies in < 24h",
  ],
  ping: async () => {
    const start = performance.now();
    try {
      const res = await fetch("/api/health");
      const ms = Math.round(performance.now() - start);
      const data = (await res.json()) as {
        service?: string;
        database?: string;
        timestamp?: string;
      };
      return [
        `GET /api/health .......... ${res.status} OK  (${ms}ms, real request)`,
        `service .................. ${data.service ?? "unknown"}`,
        `postgres ................. ${data.database ?? "unknown"}`,
        `timestamp ................ ${data.timestamp ?? "unknown"}`,
      ];
    } catch {
      return ["GET /api/health .......... FAILED — server unreachable"];
    }
  },
  hire: () => [
    "opening the direct line…",
    "email  avishahir4812@gmail.com",
    "phone  +91 94296 80396",
    "note   recruiters get priority replies :)",
  ],
  ls: () => ["projects/  skills/  experience.md  contact.txt  resume.pdf"],
  sudo: () => [
    "avish is not in the sudoers file. This incident will be reported. (kidding)",
  ],
  exit: () => ["there is no exit. only scroll."],
};

const URL_RE = /(https?:\/\/[^\s]+)/g;

function LineText({ text }: { text: string }) {
  const parts = text.split(URL_RE);
  return (
    <>
      {parts.map((part, i) =>
        URL_RE.test(part) ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noreferrer"
            className="text-sky-300 underline decoration-sky-300/40 underline-offset-2 transition-colors hover:text-sky-200"
          >
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function Prompt() {
  return (
    <span className="shrink-0 select-none">
      <span className="text-accent">avish</span>
      <span className="text-paper/40">@</span>
      <span className="text-emerald-300">portfolio</span>
      <span className="text-paper/40"> ~ %</span>
    </span>
  );
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const QUICK = ["help", "whoami", "skills", "projects", "ping", "contact", "clear"];

export default function Terminal() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);
  const inView = useInView(wrapRef, { once: true, margin: "-120px" });

  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const push = useCallback((items: Omit<Line, "id">[]) => {
    setLines((prev) => [
      ...prev,
      ...items.map((l) => ({ ...l, id: idRef.current++ })),
    ]);
  }, []);

  /* boot banner */
  useEffect(() => {
    push(INTRO);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* auto-scroll the feed */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, input]);

  const exec = useCallback(
    async (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      if (!cmd || busy) return;
      setBusy(true);
      if (cmd === "clear") {
        idRef.current = 3;
        setLines([{ id: 3, kind: "sys", text: "terminal cleared — 'help' lists commands" }]);
        idRef.current = 4;
        setBusy(false);
        return;
      }
      push([{ kind: "cmd", text: cmd }]);
      const handler = COMMANDS[cmd];
      if (!handler) {
        push([{ kind: "err", text: `command not found: ${cmd} — try 'help'` }]);
      } else {
        try {
          const out = await handler();
          const kind: Line["kind"] = cmd === "ping" ? "ok" : "out";
          push(out.map((text) => ({ kind, text })));
        } catch {
          push([{ kind: "err", text: "something broke on my end — ironic, I know" }]);
        }
      }
      setBusy(false);
    },
    [busy, push]
  );

  /* typing demo the first time it scrolls into view */
  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    (async () => {
      setBusy(true);
      await sleep(700);
      for (const ch of "whoami") {
        if (cancelled) return;
        setInput((prev) => prev + ch);
        await sleep(90);
      }
      await sleep(450);
      if (cancelled) return;
      setInput("");
      push([{ kind: "cmd", text: "whoami" }]);
      const demoOut = await COMMANDS.whoami();
      push(demoOut.map((text) => ({ kind: "out" as const, text })));
      await sleep(500);
      push([{ kind: "sys", text: "your turn —" }]);
      setBusy(false);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = input;
    setInput("");
    exec(value);
  }

  function focusInput(e: React.MouseEvent) {
    if ((e.target as HTMLElement).closest("a")) return;
    inputRef.current?.focus();
  }

  return (
    <section className="border-y border-line bg-paper-2/50">
      <div
        ref={wrapRef}
        className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-20"
      >
        <Reveal y={18}>
          <div className="mb-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-2 md:text-[11px]">
            <span className="text-accent">( interlude )</span>
            <span className="h-px flex-1 bg-line" />
            <span>for the curious — this actually runs</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-ink/25 shadow-[0_40px_90px_-35px_rgba(18,17,15,0.5)]"
            onClick={focusInput}
            data-cursor="hover"
          >
            {/* window chrome */}
            <div className="flex items-center gap-3 border-b border-paper/10 bg-[#1a1916] px-4 py-3">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
              </span>
              <p className="flex-1 truncate text-center font-mono text-[10px] tracking-[0.18em] text-paper/40">
                avish@portfolio — zsh — live
              </p>
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
            </div>

            {/* terminal body */}
            <div
              ref={scrollRef}
              className="h-[340px] space-y-1.5 overflow-y-auto bg-ink p-4 font-mono text-[11.5px] leading-relaxed sm:h-[380px] sm:p-5 sm:text-[13px] md:h-[400px]"
            >
              {lines.map((line) => (
                <div key={line.id} className="whitespace-pre-wrap break-words">
                  {line.kind === "cmd" ? (
                    <span className="flex items-baseline gap-2">
                      <Prompt />
                      <span className="text-paper">{line.text}</span>
                    </span>
                  ) : line.kind === "err" ? (
                    <span className="text-rose-300">{line.text}</span>
                  ) : line.kind === "ok" ? (
                    <span className="text-emerald-300">
                      {line.kind === "ok" && <LineText text={line.text} />}
                    </span>
                  ) : line.kind === "sys" ? (
                    <span className="text-paper/35">{line.text}</span>
                  ) : (
                    <span className="text-paper/85">
                      <LineText text={line.text} />
                    </span>
                  )}
                </div>
              ))}

              {/* input row */}
              <form
                onSubmit={onSubmit}
                className="flex items-center gap-2 pt-1"
              >
                <Prompt />
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={busy}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  aria-label="Terminal input — type a command"
                  placeholder={busy ? "" : "type a command…"}
                  className="w-full flex-1 bg-transparent text-paper outline-none placeholder:text-paper/25 disabled:opacity-60"
                  style={{ caretColor: "var(--color-accent)" }}
                />
                <button
                  type="submit"
                  aria-label="Run command"
                  className="text-paper/30 transition-colors hover:text-accent"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </Reveal>

        {/* quick commands — great on touch devices */}
        <Reveal delay={0.15}>
          <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-2">
            <span className="mr-1 font-mono text-[9px] uppercase tracking-[0.25em] text-ink-3">
              quick run →
            </span>
            {QUICK.map((c) => (
              <button
                key={c}
                onClick={() => exec(c)}
                disabled={busy}
                data-cursor="hover"
                className="rounded-full border border-line bg-paper px-4 py-2 font-mono text-[10px] tracking-[0.15em] text-ink-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent disabled:opacity-40"
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
