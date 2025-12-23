"use client";

import { useState } from "react";

export default function ToolboxPage() {
  const [prompt, setPrompt] = useState<string | null>(null);

  const relationships = [
    "Estranged Siblings",
    "Boss and Fired Employee",
    "Two Spies meeting for the first time",
    "Ex-Lovers trapped in an elevator",
    "Teacher and Student 10 years later",
  ];

  const generatePrompt = () => {
    const random = relationships[Math.floor(Math.random() * relationships.length)];
    setPrompt(random);
  };

  return (
    <div className="min-h-screen pt-32 px-8 max-w-5xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-12 text-spotlight">The Toolbox</h1>
      <p className="text-zinc-400 mb-16 max-w-2xl mx-auto">
        Random generators to spark scenes for solo or group practice.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Relationship Generator */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-sm hover:border-accent-red/50 transition-colors group">
          <h3 className="text-xl font-bold mb-4">Relationship Generator</h3>
          <div className="h-32 flex items-center justify-center bg-black/50 border border-white/5 mb-8 rounded-sm">
            <p className="text-2xl font-serif text-white">
              {prompt || "Click to Generate"}
            </p>
          </div>
          <button 
            onClick={generatePrompt}
            className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-accent-red hover:text-white transition-colors"
          >
            Generate
          </button>
        </div>

        {/* Placeholder for future tools */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-sm opacity-50 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
            <span className="text-xs uppercase tracking-widest text-zinc-500">Coming Soon</span>
          </div>
          <h3 className="text-xl font-bold mb-4">Environment Builder</h3>
          <div className="h-32 bg-black/50 border border-white/5 mb-8 rounded-sm" />
          <button disabled className="w-full py-4 bg-zinc-800 text-zinc-500 font-bold uppercase tracking-widest cursor-not-allowed">
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
