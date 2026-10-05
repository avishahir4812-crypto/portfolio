import type { Metadata } from "next";
import { education, experience, profile, projects, skills } from "@/lib/site";
import PrintControls from "./print-controls";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Printable résumé of Avish Boricha — Python Full Stack Developer.",
};

const h2 =
  "mb-3 border-b-2 border-ink pb-1 font-mono text-[11px] uppercase tracking-[0.3em] text-ink";
const li = "flex gap-2 text-[12.5px] leading-relaxed text-ink-2";

/** Resume showcases the strongest three projects, regardless of site order. */
const featured = ["AI ATS Resume Analyzer", "StyleSphere", "ElectroHub Catalog"]
  .map((t) => projects.find((p) => p.title === t))
  .filter((p): p is (typeof projects)[number] => Boolean(p));

export default function ResumePage() {
  const skillLine = (cat: string) =>
    skills
      .filter((s) => s.category === cat)
      .map((s) => s.name)
      .join(" · ");

  return (
    <div className="min-h-screen bg-paper-2 py-4 md:py-8">
      <PrintControls />

      <article className="print-a4 mx-auto max-w-[880px] bg-white px-8 py-10 shadow-[0_30px_80px_-30px_rgba(18,17,15,0.3)] md:px-14 md:py-14">
        {/* header */}
        <header className="border-b-4 border-ink pb-6">
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            AVISH BORICHA
          </h1>
          <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.3em] text-accent">
            Python Full Stack Developer
          </p>
          <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-2">
            {profile.phone} · {profile.email} · {profile.location}
          </p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-2">
            LinkedIn: in/boricha-avish · GitHub: @avishahir4812-crypto
          </p>
        </header>

        {/* objective */}
        <section className="mt-7">
          <h2 className={h2}>Career Objective</h2>
          <p className="text-[12.5px] leading-relaxed text-ink-2">
            Python Full Stack Developer with a strong foundation in building
            responsive, scalable web applications. Skilled in Python, Django,
            FastAPI, PHP, MySQL, React.js, Next.js and Tailwind CSS with
            practical experience across frontend, backend, database management,
            AI/NLP integrations and REST API development. Passionate about clean
            code and efficient software solutions.
          </p>
        </section>

        {/* experience */}
        <section className="mt-7">
          <h2 className={h2}>Professional Experience</h2>
          <div className="flex items-baseline justify-between">
            <h3 className="text-[14px] font-semibold">
              {experience.role} — {experience.company}
            </h3>
            <span className="font-mono text-[10px] uppercase text-ink-3">
              {experience.place} · {experience.type}
            </span>
          </div>
          <ul className="mt-2 space-y-1.5">
            {experience.bullets.map((b, i) => (
              <li key={i} className={li}>
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                {b}
              </li>
            ))}
            <li className={li}>
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
              Projects shipped: {experience.shipped.map((s) => s.name).join(", ")}.
            </li>
          </ul>
        </section>

        {/* projects */}
        <section className="mt-7">
          <h2 className={h2}>Projects — all live in production</h2>
          <div className="space-y-4">
            {featured.map((p) => (
              <div key={p.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[13px] font-semibold">
                    {p.title} — <span className="font-normal text-ink-2">{p.category}</span>
                  </h3>
                  <span className="font-mono text-[9.5px] text-accent">
                    {p.live.replace("https://", "").replace(/\/$/, "")}
                  </span>
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-2">
                  {p.description}
                </p>
                <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-3">
                  {p.stack.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* skills */}
        <section className="mt-7">
          <h2 className={h2}>Technical Skills</h2>
          <div className="space-y-1.5 text-[12px] leading-relaxed text-ink-2">
            <p><strong className="text-ink">Languages:</strong> {skillLine("Languages")}</p>
            <p><strong className="text-ink">Frontend:</strong> {skillLine("Frontend")}, Responsive Design, UI/UX, Cross-browser Compatibility</p>
            <p><strong className="text-ink">Backend:</strong> {skillLine("Backend")}, JWT Authentication, OAuth, CRUD, Query Optimization, Swagger Docs, Error Handling &amp; Logging</p>
            <p><strong className="text-ink">Databases:</strong> {skillLine("Database")}, Indexing, Data Modeling, Performance Tuning</p>
            <p><strong className="text-ink">Tools &amp; DevOps:</strong> {skillLine("Tools & DevOps")}</p>
          </div>
        </section>

        {/* education */}
        <section className="mt-7">
          <h2 className={h2}>Education</h2>
          <div className="space-y-2.5">
            {education.map((e) => (
              <div key={e.title} className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="text-[13px] font-semibold">{e.title}</p>
                  <p className="text-[11.5px] text-ink-2">{e.school}</p>
                </div>
                <p className="font-mono text-[10px] uppercase text-ink-3">
                  {e.period} · <span className="text-accent">{e.score}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* extras */}
        <section className="mt-7">
          <h2 className={h2}>Soft Skills & Languages</h2>
          <p className="text-[12px] leading-relaxed text-ink-2">
            <strong className="text-ink">Soft skills:</strong> Problem Solving · Quick Learner · Communication · Team Collaboration
          </p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-ink-2">
            <strong className="text-ink">Languages:</strong> English (Professional) · Hindi (Native) · Gujarati (Professional)
          </p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-ink-2">
            <strong className="text-ink">Interests:</strong> Full Stack Development · Artificial Intelligence · UI/UX Design · Learning New Technologies
          </p>
        </section>
      </article>

      <p className="no-print mt-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-ink-3">
        Tip — use the button above, or press Ctrl/Cmd + P to save as PDF
      </p>
    </div>
  );
}
