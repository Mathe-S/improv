"use client";

import { useState } from "react";
import Link from "next/link";
import { getRandomItem } from "@/data/toolboxData";
import { Shuffle } from "lucide-react";

// Incredibly boring, mundane statements
const mundaneStatements = [
  "It's Tuesday.",
  "I think the milk is about to expire.",
  "It's raining outside.",
  "The bus was five minutes late today.",
  "I bought a new type of sponge.",
  "They painted the fence across the street.",
  "I'm wearing socks with sandals.",
  "The mail arrived.",
  "I think I need a haircut.",
];

// Maximum intensity reactions/emotions to apply to the mundane statement
const extremeReactions = [
  "Absolute Terror and Panic",
  "Overwhelming, Tearful Joy",
  "Burning, Jealous Rage",
  "Crushing Heartbreak and Despair",
  "Uncontrollable Awe and Wonder",
  "Frenzied, Frantic Paranoia",
  "Disgust that is Physically Nauseating",
];

export default function ItsTuesdayGamePage() {
  const [statement, setStatement] = useState(mundaneStatements[0]);
  const [reaction, setReaction] = useState(extremeReactions[0]);

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6 max-w-5xl mx-auto flex flex-col">
      <Link href="/games" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors shrink-0">
        ← Back to Games
      </Link>

      <div className="text-center mb-12 shrink-0">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase relative inline-block">
          It's Tuesday
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          The ultimate overaccepting game. Treat the most inconsequential remarks as if they are the most devastating pieces of news you've ever heard.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8 flex-1">
        
        {/* Play Space Board */}
        <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 md:p-8 flex flex-col shadow-lg">
          <h2 className="text-2xl font-bold text-accent-red uppercase tracking-widest mb-6 border-b border-white/10 pb-4 text-center">
            The Exchange
          </h2>
          
          <div className="flex-1 space-y-6 flex flex-col justify-center">
             
             {/* The Statement */}
             <div className="bg-black/50 border border-white/5 p-6 rounded-sm text-center shadow-lg animate-in fade-in duration-300">
                <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">
                  The Mundane Prompt (Player A)
                </p>
                <div className="flex items-center justify-center min-h-[5rem] px-4">
                   <p className="text-xl md:text-2xl font-medium text-white italic leading-tight">
                      "{statement}"
                   </p>
                </div>
                <button 
                   onClick={() => setStatement(getRandomItem(mundaneStatements))}
                   className="mt-6 py-3 w-full bg-white/5 text-zinc-300 font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors border border-white/10 flex justify-center items-center gap-2"
                >
                   <Shuffle className="w-3 h-3" /> Roll New Statement
                </button>
             </div>

             {/* The Reaction */}
             <div className="bg-accent-red/10 border border-accent-red/20 p-6 rounded-sm text-center shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
                <p className="text-sm font-bold text-accent-red uppercase tracking-widest mb-2">
                  The Reaction (Player B)
                </p>
                <p className="text-xs text-zinc-400 mb-4 px-4 leading-relaxed">
                  React to the prompt above with the absolute maximum intensity of:
                </p>
                <div className="flex items-center justify-center min-h-[4rem] px-4">
                   <p className="text-xl font-bold text-white uppercase tracking-wider text-shadow-glow">
                      {reaction}
                   </p>
                </div>
                <button 
                   onClick={() => setReaction(getRandomItem(extremeReactions))}
                   className="mt-6 py-3 w-full bg-transparent text-accent-red border border-accent-red/30 font-bold uppercase tracking-widest text-xs hover:bg-accent-red/10 transition-colors flex justify-center items-center gap-2"
                >
                   <Shuffle className="w-3 h-3" /> Roll New Reaction
                </button>
             </div>

          </div>
        </div>

        {/* Rules Sidebar */}
        <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 md:p-8 flex flex-col shadow-lg">
          <h2 className="text-lg font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
            How The Loop Works
          </h2>
          
          <div className="flex-1 space-y-8 flex flex-col justify-center text-left">
             <div className="relative pl-6 border-l-2 border-white/20 pb-4">
                <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">1. The Mundane Drop</h3>
                <p className="text-zinc-400 text-sm">Player A delivers a completely matter-of-fact, utterly boring statement (e.g., "I ironed my shirt today.") and goes completely neutral.</p>
             </div>
             
             <div className="relative pl-6 border-l-2 border-accent-red pb-4">
                <div className="absolute w-3 h-3 bg-accent-red rounded-full -left-[7px] top-1 shadow-[0_0_10px_rgba(255,51,51,0.5)]"></div>
                <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">2. Total Overaccept</h3>
                <p className="text-zinc-400 text-sm">Player B instantly acts as if they were just told the most catastrophic or magnificent news in the world. Drop to your knees, sob, or scream. <strong className="text-white">Push the emotion until you physically can't take it any further.</strong></p>
             </div>

             <div className="relative pl-6 border-l-2 border-white/20 pb-4">
                <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">3. The Reset</h3>
                <p className="text-zinc-400 text-sm">At the absolute peak of Player B's emotional breakdown, they suddenly drop into total neutrality and deliver a new mundane statement: <em className="text-zinc-500">"...I forgot my umbrella."</em></p>
             </div>

             <div className="relative pl-6 border-l-2 border-transparent">
                <div className="absolute w-3 h-3 bg-accent-red rounded-full -left-[7px] top-1 shadow-[0_0_10px_rgba(255,51,51,0.5)]"></div>
                <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">4. The Ping-Pong</h3>
                <p className="text-zinc-400 text-sm">Player A must immediately overaccept *that* umbrella statement with their own maximum emotional meltdown.</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
