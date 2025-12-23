import StatusGap from "@/components/exercises/StatusGap";

export default function StatusChapter() {
  return (
    <div className="min-h-screen pt-32 px-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-20 text-center">
        <span className="text-sm font-mono text-accent-red tracking-widest uppercase mb-4 block">Chapter 1</span>
        <h1 className="text-6xl md:text-8xl font-bold mb-8 text-spotlight tracking-tighter">STATUS</h1>
        <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
          "We are pecking-order animals, and this affects the tiniest details of our behavior."
        </p>
      </header>

      {/* Content Block */}
      <section className="prose prose-invert prose-lg max-w-none mb-24">
        <p>
          Status is not about social class or position. It is something you <strong>do</strong>. 
          It is a series of tiny, often subconscious signals we send to each other in every interaction.
        </p>
        <p>
          You can play high status (expanding, keeping eye contact, smooth movements) or low status (contracting, breaking eye contact, jerky movements).
          The master improviser chooses their status consciously to serve the scene.
        </p>
      </section>

      {/* Interaction Prompt */}
      <section className="border-t border-white/10 pt-16">
        <h2 className="text-3xl font-bold mb-8">Exercise 1: The Status See-Saw</h2>
        <StatusGap />
      </section>
    </div>
  );
}
