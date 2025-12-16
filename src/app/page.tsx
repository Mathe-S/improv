import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-20">
      <main className="flex flex-col gap-8 items-center text-center">
        <h1 className="text-6xl sm:text-9xl font-bold tracking-tighter text-spotlight">
          IMPRO
        </h1>
        <p className="text-xl sm:text-2xl text-zinc-400 max-w-2xl font-light">
          Improvisation and the Theatre
        </p>
        
        <div className="mt-12 flex gap-4">
          <Link href="/guide">
            <button className="px-8 py-3 bg-foreground text-background font-bold text-lg rounded-sm hover:scale-105 transition-transform duration-300">
              Start Learning
            </button>
          </Link>
          <Link href="/toolbox">
            <button className="px-8 py-3 border border-white/20 text-white font-medium text-lg rounded-sm hover:bg-white/10 transition-colors duration-300">
              Toolbox
            </button>
          </Link>
        </div>
      </main>
      
      <footer className="absolute bottom-8 text-sm text-zinc-600">
        Based on the work of Keith Johnstone
      </footer>
    </div>
  );
}
