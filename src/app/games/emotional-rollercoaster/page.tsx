"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getRandomItem, allEmotions } from "@/data/toolboxData";
import { Shuffle } from "lucide-react";

const starterScenarios = [
  "Working at a fast food drive-thru",
  "Breaking up at a fancy restaurant",
  "Trying to return a defective parachute",
  "Two pilots flying a plane into turbulence",
  "Roommates arguing over dirty dishes",
  "A hostage negotiator and a bank robber",
  "Meeting the in-laws for the first time",
  "Two astronauts on a spacewalk",
];

export default function EmotionalRollercoasterPage() {
  const [scenario, setScenario] = useState(starterScenarios[0]);
  const [currentEmotion, setCurrentEmotion] = useState("Neutral");
  const [nextEmotion, setNextEmotion] = useState(allEmotions[0]);
  
  // To highlight exactly when they switch
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    // Generate an initial random emotion
    setNextEmotion(getRandomItem(allEmotions));
  }, []);

  const handleGenerateScenario = () => {
    setScenario(getRandomItem(starterScenarios));
  };

  const handleSwitchEmotion = () => {
    // Current emotion becomes what was "next", and we queue a new "next"
    setCurrentEmotion(nextEmotion);
    
    let nextRand = getRandomItem(allEmotions);
    // ensure we don't pick the exact same one twice in a row
    while (nextRand === nextEmotion) {
      nextRand = getRandomItem(allEmotions);
    }
    setNextEmotion(nextRand);

    // Trigger visual flash
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6 max-w-5xl mx-auto flex flex-col">
      <Link href="/games" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors">
        ← Back to Games
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase relative inline-block">
          Emotional Rollercoaster
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Perform a simple scene. When the director yells out an emotion, instantly switch your behavior without changing the plot.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 mb-8 flex-1">
        
        {/* Main Stage Panel */}
        <div className={`lg:col-span-8 border rounded-sm p-6 md:p-8 flex flex-col shadow-lg transition-all duration-300 ${
           flash 
           ? "bg-white border-white scale-[1.01]" 
           : "bg-zinc-900 border-white/10"
        }`}>
          
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4 shrink-0">
             <h2 className={`text-lg font-bold uppercase tracking-widest ${flash ? "text-black" : "text-white"}`}>
                Current Emotion
             </h2>
          </div>

          <div className="flex-1 flex flex-col justify-center text-center py-12">
               <div className={`text-5xl md:text-7xl font-black uppercase tracking-widest transition-colors ${
                  flash ? "text-black" : "text-accent-red"
               }`}>
                  {currentEmotion}
               </div>
          </div>

          {/* Director's Controls (Queue) */}
          <div className="mt-auto border-t border-white/10 pt-8">
             <p className={`text-xs uppercase tracking-widest font-bold mb-3 ${flash ? "text-zinc-600" : "text-zinc-500"}`}>
               Up Next
             </p>
             <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <div className={`flex-1 border border-dashed rounded-sm p-4 text-center font-bold text-xl ${
                   flash ? "border-zinc-400 text-zinc-800" : "border-zinc-700 text-zinc-300"
                }`}>
                   {nextEmotion}
                </div>
                
                <button 
                   onClick={handleSwitchEmotion}
                   className={`h-full sm:h-auto sm:w-48 py-4 font-black text-lg uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] ${
                      flash 
                      ? "bg-black text-white hover:bg-zinc-800" 
                      : "bg-white text-black hover:bg-zinc-200"
                   }`}
                >
                   SWITCH
                </button>
             </div>
          </div>

        </div>

        {/* Setup & Sidebar */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          
          <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 shadow-lg">
            <h2 className="text-lg font-bold text-white uppercase tracking-widest mb-4">
               The Base Scene
            </h2>
            <div className="bg-black/50 border border-white/5 p-4 text-center mb-4 rounded-sm">
               <p className="font-medium text-white italic">
                  "{scenario}"
               </p>
            </div>
            <button
               onClick={handleGenerateScenario}
               className="w-full py-3 bg-white/5 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center gap-2"
             >
               <Shuffle className="w-4 h-4" /> New Base Scene
             </button>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 shadow-lg flex-1">
            <h2 className="text-lg font-bold text-accent-red uppercase tracking-widest mb-4">
              How To Play
            </h2>
            
            <div className="space-y-4">
               <p className="text-zinc-400 text-sm">
                 <strong className="text-white">1. The Setup:</strong> Two players begin the base scene acting perfectly neutral and normal.
               </p>
               <p className="text-zinc-400 text-sm">
                 <strong className="text-white">2. The Director:</strong> A third person acts as the director using this dashboard.
               </p>
               <p className="text-zinc-400 text-sm">
                 <strong className="text-accent-red">3. The Switch:</strong> The director clicks "SWITCH" and loudly calls out the new emotion taking over the screen.
               </p>
               <p className="text-zinc-400 text-sm">
                 <strong className="text-white">4. The Commitment:</strong> Without disrupting the plot or changing the topic, both actors must completely surrender to the new emotion immediately.
               </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
