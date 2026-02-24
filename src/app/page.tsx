import Link from "next/link";

const sections = [
  {
    title: "Start Learning",
    description:
      "Move through the core ideas: status, spontaneity, narrative, and masks.",
    href: "/guide",
    eyebrow: "4 Chapters",
    style: "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/8",
  },
  {
    title: "Play Games",
    description:
      "Explore a growing library of improv games for solo practice or groups.",
    href: "/games",
    eyebrow: "18 Games",
    style:
      "border-accent-red/20 bg-accent-red/10 hover:border-accent-red/40 hover:bg-accent-red/15",
  },
  {
    title: "Open Toolbox",
    description:
      "Use generators for relationships, emotions, openings, and environments.",
    href: "/toolbox",
    eyebrow: "Scene Sparks",
    style: "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/8",
  },
  {
    title: "Join Community",
    description:
      "See what is coming next and join the growing ensemble around the work.",
    href: "/community",
    eyebrow: "In Progress",
    style: "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/8",
  },
] as const;

const exploreTags = [
  "Masks",
  "Status",
  "Gibberish",
  "Yes, And",
  "Word At A Time",
  "Blind Offers",
  "Narrative",
  "Typewriter",
  "Presents",
  "Freeze Tag",
] as const;

export default function Home() {
  return (
    <div className="min-h-screen px-8 pb-16 pt-28 sm:px-12 sm:pt-32">
      <main className="mx-auto flex max-w-7xl flex-col gap-20">
        <section className="text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-accent-red">
            Keith Johnstone Playground
          </p>
          <h1 className="text-6xl font-bold tracking-tighter text-spotlight sm:text-9xl">
            IMPRO
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl font-light text-zinc-300 sm:text-2xl">
            Improvisation and the Theatre, expanded into a space for reading,
            playing, generating, and exploring.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="border border-white/10 px-4 py-2 text-sm text-zinc-300">
              4 Chapters
            </span>
            <span className="border border-white/10 px-4 py-2 text-sm text-zinc-300">
              18 Games
            </span>
            <span className="border border-white/10 px-4 py-2 text-sm text-zinc-300">
              Toolbox Generators
            </span>
            <span className="border border-white/10 px-4 py-2 text-sm text-zinc-300">
              Interactive Labs
            </span>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/guide"
              className="rounded-sm bg-foreground px-8 py-3 text-lg font-bold text-background transition-transform duration-300 hover:scale-105"
            >
              Start Learning
            </Link>
            <Link
              href="/games"
              className="rounded-sm border border-white/20 px-8 py-3 text-lg font-medium text-white transition-colors duration-300 hover:bg-white/10"
            >
              Explore Games
            </Link>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className={`group border p-6 transition-all duration-300 ${section.style}`}
            >
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                {section.eyebrow}
              </p>
              <h2 className="text-2xl font-bold text-white transition-colors group-hover:text-white">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                {section.description}
              </p>
              <p className="mt-6 text-xs uppercase tracking-[0.22em] text-zinc-500">
                Enter
              </p>
            </Link>
          ))}
        </section>
      </main>

      <footer className="mt-16 text-center text-sm text-zinc-600">
        Based on the work of Keith Johnstone
      </footer>
    </div>
  );
}
