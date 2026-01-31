"use client";

import { useState } from "react";
import Link from "next/link";
import { getRandomItem } from "@/data/toolboxData";

const sceneSettings = [
  "You're in a street.",
  "You're in a box.",
  "You're falling off a cliff.",
  "You're trapped in an elevator.",
  "You're standing on an alien planet.",
  "You're inside a giant sandwich.",
];

const questionPrompts = [
  "What's in there with you?",
  "What shop are you looking at?",
  "Who put you there?",
  "What is their secret plan?",
  "What do they point at you?",
  "What comes out of it?",
  "What is written on the side?",
  "Inside you meet who?",
  "What are they holding?",
];

export default function VerbalChaseGamePage() {
  const [setting, setSetting] = useState(sceneSettings[0]);
  const [question, setQuestion] = useState(questionPrompts[0]);

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6 max-w-4xl mx-auto">
      <Link href="/games" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors">
        ← Back to Games
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase">
          Verbal Chase
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Jerk spontaneous answers out of your partner by constantly changing the 'set' of the questions.
        </p>
      </div>

      <div className="bg-zinc-900 border border-white/10 rounded-sm p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Questioner Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-accent-red uppercase tracking-widest text-center border-b border-accent-red/20 pb-2">
              The Questioner
            </h2>
            
            <div className="bg-black/50 border border-white/5 p-6 text-center shadow-lg rounded-sm">
              <p className="text-sm text-zinc-500 uppercase tracking-widest mb-4">Start Phrase</p>
              <p className="text-xl font-bold text-white mb-6 min-h-[3rem] flex items-center justify-center italic">
                "{setting}"
              </p>
              <button
                onClick={() => setSetting(getRandomItem(sceneSettings))}
                className="text-xs text-accent-red font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                → New Start Phrase
              </button>
            </div>

            <div className="bg-black/50 border border-white/5 p-6 text-center shadow-lg rounded-sm">
              <p className="text-sm text-zinc-500 uppercase tracking-widest mb-4">Jerk Question Idea</p>
              <p className="text-xl font-bold text-white mb-6 min-h-[3rem] flex items-center justify-center italic">
                "{question}"
              </p>
              <button
                onClick={() => setQuestion(getRandomItem(questionPrompts))}
                className="text-xs text-accent-red font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                → New Question
              </button>
            </div>

            <div className="text-zinc-400 text-sm space-y-2 bg-white/5 p-4 rounded-sm border border-white/5">
              <p className="text-white font-bold uppercase text-xs mb-2 tracking-widest">Questioning Rules</p>
              <p>• Speak as fast as possible.</p>
              <p>• Avoid predictable follow-ups.</p>
              <p>• Ignore logic; go for the absurd.</p>
              <p>• Don't do the work—jolt the answer out of them.</p>
            </div>
          </div>

          {/* Answerer Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest text-center border-b border-white/20 pb-2">
              The Victim
            </h2>
            <div className="bg-black/50 border border-white/5 p-8 text-center shadow-lg rounded-sm h-full flex flex-col justify-center">
              <p className="text-zinc-300 text-xl leading-relaxed italic mb-8">
                Your only goal is to immediately blurt the absolute first thing that comes to mind, regardless of context or coherence.
              </p>
              <div className="text-zinc-400 text-sm space-y-4 text-left p-6 bg-accent-red/10 border border-accent-red/20 rounded-sm">
                <p>• You have 0 seconds to think.</p>
                <p>• Don't plan a coherent story.</p>
                <p>• If they ask "What's in the box?", and your brain says "A toilet", say "A toilet".</p>
                <p>• Trust the speed to bypass your censor.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
