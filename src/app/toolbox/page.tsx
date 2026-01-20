"use client";

import GeneratorCard from "@/components/toolbox/GeneratorCard";
import EnvironmentBuilder from "@/components/toolbox/EnvironmentBuilder";
import {
  allRelationships,
  allEmotions,
  allTraits,
  openingLines,
} from "@/data/toolboxData";

export default function ToolboxPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-spotlight">
          The Toolbox
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Random generators to spark scenes for solo or group practice.
          Generate relationships, emotions, environments, and more.
        </p>
      </header>

      {/* Section 1: Quick Generators */}
      <section className="mb-16">
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-zinc-700" />
          Quick Generators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GeneratorCard 
            title="Relationship" 
            items={allRelationships}
          />
          <GeneratorCard 
            title="Emotion" 
            items={allEmotions}
          />
          <GeneratorCard 
            title="Character Trait" 
            items={allTraits}
          />
          <GeneratorCard 
            title="Opening Line" 
            items={openingLines}
            showHistory={false}
          />
        </div>
      </section>

      {/* Section 2: Environment Builder */}
      <section className="mb-16">
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-zinc-700" />
          Scene Environment
        </h2>
        <div className="max-w-md">
          <EnvironmentBuilder />
        </div>
      </section>
    </div>
  );
}
