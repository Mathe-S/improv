import YesAndGame from "@/components/exercises/YesAnd";
import WordAssociation from "@/components/exercises/WordAssociation";

export default function SpontaneityChapter() {
  return (
    <div className="min-h-screen pt-32 px-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-20 text-center">
        <span className="text-sm font-mono text-accent-red tracking-widest uppercase mb-4 block">Chapter 2</span>
        <h1 className="text-6xl md:text-8xl font-bold mb-8 text-spotlight tracking-tighter">SPONTANEITY</h1>
        <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
          "The improviser must be like a man walking backwards. He sees where he has been, but he pays no attention to the future."
        </p>
      </header>

      {/* Content Block */}
      <section className="prose prose-invert prose-lg max-w-none mb-24">
        <p>
          We are often taught to "think before we speak". In improv, this is the enemy. 
          The "Censor" in our mind tries to keep us safe by blocking ideas that might seem "crazy" or "obscene".
        </p>
        <p>
          To be spontaneous, we must silence the Censor. We do this by <strong>Accepting Offers</strong>. 
          When we block an offer, the scene dies. When we accept and add to it ("Yes, And"), the scene lives.
        </p>
      </section>

      {/* Interaction Prompt - Exercise 1 */}
      <section className="border-t border-white/10 pt-16 mb-24">
        <h2 className="text-3xl font-bold mb-8">Exercise 1: Word Association (Voice)</h2>
        <WordAssociation />
      </section>

      {/* Interaction Prompt - Exercise 2 */}
      <section className="border-t border-white/10 pt-16">
        <h2 className="text-3xl font-bold mb-8">Exercise 2: The Offer Acceptance</h2>
        <YesAndGame />
      </section>
    </div>
  );
}
