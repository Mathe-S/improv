import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex justify-center p-6 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
      <div className="flex items-center gap-8 text-sm font-medium tracking-widest uppercase text-zinc-400">
        <Link 
          href="/" 
          className="hover:text-white transition-colors hover:text-spotlight"
        >
          Home
        </Link>
        <Link 
          href="/guide" 
          className="hover:text-white transition-colors hover:text-spotlight"
        >
          Guide
        </Link>
        <Link 
          href="/toolbox" 
          className="hover:text-white transition-colors hover:text-spotlight"
        >
          Toolbox
        </Link>
        <Link 
          href="/games" 
          className="hover:text-white transition-colors hover:text-spotlight"
        >
          Games
        </Link>
        <Link 
          href="/community" 
          className="hover:text-white transition-colors hover:text-spotlight"
        >
          Community
        </Link>
      </div>
    </nav>
  );
}
