import Link from "next/link";

const chapters = [
  {
    id: "status",
    title: "Chapter 1: Status",
    description: "The hidden power dynamics in every interaction.",
    status: "available",
    href: "/guide/status",
  },
  {
    id: "spontaneity",
    title: "Chapter 2: Spontaneity",
    description: "Unlocking the flow of creativity.",
    status: "locked",
    href: "#",
  },
  {
    id: "narrative",
    title: "Chapter 3: Narrative",
    description: "Building stories that captive.",
    status: "locked",
    href: "#",
  },
  {
    id: "masks",
    title: "Chapter 4: Masks",
    description: "Transforming the self.",
    status: "locked",
    href: "#",
  },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen pt-32 px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-spotlight">The Curriculum</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={chapter.href}
            aria-disabled={chapter.status === "locked"}
            className={`
              group relative p-8 border border-white/10 rounded-sm transition-all duration-500
              ${chapter.status === "locked" ? "opacity-50 cursor-not-allowed" : "hover:border-white/40 hover:bg-white/5"}
            `}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2 block">
              {chapter.status === "locked" ? "Coming Soon" : "Available Now"}
            </span>
            <h2 className="text-2xl font-serif font-bold mb-4">{chapter.title}</h2>
            <p className="text-zinc-400 font-light">{chapter.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
