"use client";

import { useState } from "react";
import Link from "next/link";
import { getRandomItem } from "@/data/toolboxData";

const routinePrompts = [
  "Two sailors transporting a prisoner.",
  "Taking a basket of goodies to Grandma.",
  "A vet rectally examining an elephant.",
  "Brain surgeons doing a delicate operation.",
  "Mountaineers climbing a mountain.",
  "A couple getting ready for bed.",
  "Two window cleaners washing a skyscraper.",
];

const interruptionPrompts = [
  "A bear attacks.",
  "Someone discovers they are growing feathers.",
  "They find a crashed airplane.",
  "One person injects the other with a strange syringe.",
  "They find a hidden trapdoor under the rug.",
  "The object they are holding suddenly comes alive.",
];

export default function PlaywritingGamePage() {
  const [routine, setRoutine] = useState(routinePrompts[0]);
  const [interruption, setInterruption] = useState(interruptionPrompts[0]);

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6 max-w-4xl mx-auto flex flex-col">
      <Link href="/games" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors">
        ← Back to Games
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase">
          Playwriting
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Don't make up a story. Just establish a routine and interrupt it.
        </p>
      </div>

      <div className="bg-zinc-900 border border-white/10 rounded-sm p-8 md:p-12 relative overflow-hidden flex-1 mb-12">
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Inspiration Column */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-accent-red uppercase tracking-widest mb-6 border-b border-accent-red/20 pb-2">
              The Playwright
            </h2>
            
            <div className="bg-white/5 border border-white/10 p-6 rounded-sm shadow-md">
              <p className="text-sm text-zinc-500 uppercase tracking-widest mb-2">1. Establish Routine</p>
              <p className="text-lg font-medium text-white mb-4 italic">"{routine}"</p>
              <button 
                onClick={() => setRoutine(getRandomItem(routinePrompts))}
                className="text-xs text-accent-red font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                → Generate New Routine
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-sm shadow-md">
              <p className="text-sm text-zinc-500 uppercase tracking-widest mb-2">2. Interrupt It</p>
              <p className="text-lg font-medium text-white mb-4 italic">"{interruption}"</p>
              <button 
                onClick={() => setInterruption(getRandomItem(interruptionPrompts))}
                className="text-xs text-accent-red font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                → Generate New Interruption
              </button>
            </div>
            
            <div className="text-sm text-zinc-400 space-y-3 bg-black/30 p-4 rounded-sm border border-white/5">
              <p className="text-white uppercase text-xs tracking-widest font-bold">Directions</p>
              <p>Command your actors precisely. E.g., "Dennis, sit on the chair. Betty, ask him how he feels."</p>
            </div>
          </div>

          {/* Rules Column */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 border-b border-white/20 pb-2">
              The 3 Golden Rules
            </h2>

            <div className="space-y-6">
              <div className="bg-black/50 p-6 rounded-sm border border-white/5 shadow-md">
                <h3 className="text-lg font-bold text-white mb-2">1. Interrupt a Routine</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  A mountain climb isn't a story until the climbers find a crashed plane or start eating each other. Establish normal behavior, then blatantly break it.
                </p>
              </div>

              <div className="bg-black/50 p-6 rounded-sm border border-white/5 shadow-md">
                <h3 className="text-lg font-bold text-white mb-2">2. Keep Action Onstage</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Don't let the actors start talking about someone else, somewhere else, or something in the past. If they do, command them to interact with a physical object *right now*.
                </p>
              </div>

              <div className="bg-black/50 p-6 rounded-sm border border-white/5 shadow-md">
                <h3 className="text-lg font-bold text-white mb-2">3. Don't Cancel the Story</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  If you give a character a glass of water, don't let them drink it and say "I feel better now." Make the water fall straight through them onto the floor! Escalate, don't revert.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
