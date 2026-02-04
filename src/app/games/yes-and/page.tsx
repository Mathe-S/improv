"use client";

import { useState } from "react";
import Link from "next/link";
import { getRandomItem } from "@/data/toolboxData";
import { Check, X, RotateCcw } from "lucide-react";

// Pre-generated starting statements to kick things off.
const starterStatements = [
  "I brought the penguin like you requested.",
  "This spaceship is definitely leaking.",
  "I think you're holding that sword backwards.",
  "We are the worst bank robbers in history.",
  "I didn't expect the president to wear sweatpants.",
  "Your time machine seems to just be a cardboard box.",
  "I told you not to push the big red button.",
  "Look at the size of that spider!",
];

export default function YesAndGamePage() {
  const [statement, setStatement] = useState(starterStatements[0]);

  // For a simple interactive practice: we can simulate a back-and-forth
  // by letting users type their "Yes, And..." response, adding it to a list.
  const [sceneHistory, setSceneHistory] = useState<string[]>([starterStatements[0]]);
  const [currentInput, setCurrentInput] = useState("");

  const handleGenerateStart = () => {
    const newStart = getRandomItem(starterStatements);
    setStatement(newStart);
    setSceneHistory([newStart]);
    setCurrentInput("");
  };

  const handleReset = () => {
    setSceneHistory([statement]);
    setCurrentInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;
    setSceneHistory(prev => [...prev, currentInput]);
    setCurrentInput("");
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6 max-w-4xl mx-auto flex flex-col">
      <Link href="/games" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors">
        ← Back to Games
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase">
          Yes, And
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          The golden rule of improv. Accept the reality you are given ("Yes"), and add new information to it ("And").
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {/* Tracker/Interactive Side */}
        <div className="md:col-span-2 bg-zinc-900 border border-white/10 rounded-sm p-6 shadow-lg flex flex-col min-h-[500px]">
          
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4 shrink-0">
             <h2 className="text-lg font-bold text-white uppercase tracking-widest">
                Scene Builder
             </h2>
             <button 
                onClick={handleReset}
                className="text-zinc-500 hover:text-accent-red transition-colors flex items-center gap-1 text-xs uppercase tracking-widest font-bold"
             >
                <RotateCcw className="w-3 h-3" /> Reset Scene
             </button>
          </div>

          <div className="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar space-y-4">
             {sceneHistory.map((line, index) => {
                const isPlayerA = index % 2 === 0;
                return (
                  <div 
                    key={index} 
                    className={`flex flex-col animate-in fade-in slide-in-from-bottom-2 ${isPlayerA ? "items-start" : "items-end"}`}
                  >
                     <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 px-1">
                        {isPlayerA ? "Player A" : "Player B"}
                     </span>
                     <div 
                        className={`px-4 py-3 rounded-sm max-w-[85%] ${
                           isPlayerA 
                           ? "bg-white/5 border border-white/10 text-white" 
                           : "bg-accent-red/10 border border-accent-red/20 text-accent-red"
                        }`}
                     >
                        {line}
                     </div>
                  </div>
                );
             })}
          </div>

          <form onSubmit={handleSubmit} className="shrink-0 relative">
             <div className="absolute -top-3 left-4 bg-zinc-900 px-2 text-[10px] uppercase tracking-widest text-accent-red font-bold z-10">
                Your Turn
             </div>
             <div className="flex gap-2">
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  className="w-full bg-black border-2 border-white/20 focus:border-accent-red text-lg text-white font-medium py-4 px-4 focus:outline-none rounded-sm transition-colors"
                  placeholder='Start with "Yes, and..."'
                  autoComplete="off"
                />
                <button 
                   type="submit"
                   disabled={!currentInput.trim()}
                   className="bg-accent-red text-white px-6 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                   Add
                </button>
             </div>
          </form>

        </div>

        {/* Rules Side */}
        <div className="md:col-span-1 space-y-6 flex flex-col shrink-0">
          
          <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 shadow-lg">
            <h2 className="text-lg font-bold text-accent-red uppercase tracking-widest mb-4">
              Start Seed
            </h2>
            <p className="text-lg font-medium text-white mb-6 italic">"{statement}"</p>
            <button
              onClick={handleGenerateStart}
              className="w-full py-3 bg-white/5 text-xs text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/10"
            >
              New Start Seed
            </button>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 shadow-lg flex-1">
            <h2 className="text-lg font-bold text-white uppercase tracking-widest mb-4">
              How To Play
            </h2>
            
            <div className="space-y-6">
               <div>
                  <div className="flex items-center gap-2 text-green-400 font-bold mb-1">
                     <Check className="w-4 h-4"/> <span>YES (Accept)</span>
                  </div>
                  <p className="text-zinc-400 text-sm">Agree to whatever reality was just stated. If they say you are a dog, you are a dog.</p>
               </div>
               
               <div>
                  <div className="flex items-center gap-2 text-accent-red font-bold mb-1">
                     <span className="text-xl leading-none">+</span> <span>AND (Build)</span>
                  </div>
                  <p className="text-zinc-400 text-sm">Add new information. Don't just agree; advance the scene by contributing a new detail.</p>
               </div>

               <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-zinc-500 font-bold mb-1">
                     <X className="w-4 h-4"/> <span>BLOCKING</span>
                  </div>
                  <p className="text-zinc-500 text-sm italic">"No, that's not a penguin, it's a dog."</p>
                  <p className="text-zinc-400 text-xs mt-1">Denying your partner's reality instantly stops a scene dead in its tracks.</p>
               </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
