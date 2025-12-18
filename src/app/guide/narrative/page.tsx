import StorySpine from "@/components/exercises/StorySpine";

export default function NarrativeChapter() {
  return (
    <div className="min-h-screen pt-32 px-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-20 text-center">
        <span className="text-sm font-mono text-accent-red tracking-widest uppercase mb-4 block">Chapter 3</span>
        <h1 className="text-6xl md:text-8xl font-bold mb-8 text-spotlight tracking-tighter">NARRATIVE</h1>
        <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
          "A story is not a list of events. It is a sequence of cause and effect."
        </p>
      </header>

      {/* Content Block */}
      <section className="prose prose-invert prose-lg max-w-none mb-24">
        <p>
          Beginners try to serve up "interesting" ideas. Masters embrace the boring. 
          A story starts with a <strong>Routine</strong>. We must establish the "Every Day" before we can break it with the "One Day".
        </p>
        <p>
          The "Story Spine" is a tool used by Pixar and playwrights alike. It forces you to link events causally ("Because of that...") rather than just listing them ("And then...").
        </p>
      </section>

      {/* Interaction Prompt */}
      <section className="border-t border-white/10 pt-16">
        <h2 className="text-3xl font-bold mb-8">Exercise: The Spine Builder</h2>
        <StorySpine />
      </section>
    </div>
  );
}
