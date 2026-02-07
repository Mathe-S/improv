"use client";

import { useState } from "react";
import Link from "next/link";
import { getRandomItem, allLocations, allRelationships } from "@/data/toolboxData";
import { Snowflake, MoveRight, RotateCcw } from "lucide-react";

const starterActivites = [
  "Changing a tire on the side of the road",
  "Trying to assemble IKEA furniture",
  "Performing a very delicate surgery",
  "Painting a portrait of the other person",
  "Wrestling over the TV remote",
  "Planting a tree in the backyard",
  "Measuring someone for a tailored suit",
  "Tuning a piano",
];

const transformationPrompts = [
  "You're falling off a building.",
  "You are defusing a bomb.",
  "You are begging for your life.",
  "You are delivering a baby.",
  "You're hiding from the cops.",
  "You are proposing marriage.",
  "You are lifting a heavy boulder.",
];

export default function FreezeTagGamePage() {
  const [activity, setActivity] = useState(starterActivites[0]);
  const [transformation, setTransformation] = useState(transformationPrompts[0]);
  
  // Optional: A large "FREEZE" button that flashes or displays
  const [isFrozen, setIsFrozen] = useState(false);

  const generateNewStart = () => {
    setActivity(getRandomItem(starterActivites));
    setIsFrozen(false);
  };

  const generateNewTransformation = () => {
    setTransformation(getRandomItem(transformationPrompts));
  };

  const triggerFreeze = () => {
    setIsFrozen(true);
    // Give them a new transformation idea when they freeze
    generateNewTransformation();
  };

  const unfreeze = () => {
    setIsFrozen(false);
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6 max-w-5xl mx-auto flex flex-col">
      <Link href="/games" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors">
        ← Back to Games
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase relative inline-block">
          Freeze Tag
          {isFrozen && (
            <span className="absolute -top-4 -right-12 animate-pulse text-accent-red">
               <Snowflake className="w-10 h-10" />
            </span>
          )}
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Call freeze, tap a player, take their exact physical position, and instantly justify it as a completely new scene.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 mb-8 flex-1">
        
        {/* Main Stage Panel */}
        <div className={`lg:col-span-8 border rounded-sm p-6 md:p-8 flex flex-col shadow-lg transition-all duration-300 ${
           isFrozen 
           ? "bg-accent-red/5 border-accent-red/30" 
           : "bg-zinc-900 border-white/10"
        }`}>
          
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4 shrink-0">
             <h2 className="text-lg font-bold text-white uppercase tracking-widest">
                The Stage
             </h2>
             <span className={`text-xs uppercase tracking-widest font-bold px-2 py-1 rounded-sm ${isFrozen ? "bg-accent-red text-white" : "bg-zinc-800 text-zinc-500"}`}>
                {isFrozen ? "SCENE FROZEN" : "SCENE ACTIVE"}
             </span>
          </div>

          {!isFrozen ? (
            <div className="flex-1 flex flex-col justify-center animate-in fade-in zoom-in-95 duration-200">
               <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6 text-center">
                 Initial Scene Activity
               </p>
               <div className="bg-black/50 border border-white/5 p-8 rounded-sm text-center mb-12 shadow-lg">
                  <p className="text-2xl md:text-3xl font-bold text-white min-h-[5rem] flex items-center justify-center">
                     "{activity}"
                  </p>
               </div>
               
               <button 
                  onClick={triggerFreeze}
                  className="w-full py-8 bg-zinc-800 text-white font-black text-3xl uppercase tracking-[0.2em] hover:bg-accent-red transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] transform hover:scale-[1.02]"
               >
                  FREEZE!
               </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-top-4 duration-200">
               <p className="text-sm font-bold text-accent-red uppercase tracking-widest mb-6 text-center">
                 Jump in and justify this physical position as...
               </p>
               <div className="bg-accent-red/10 border border-accent-red/20 p-8 rounded-sm text-center mb-8 shadow-lg">
                  <p className="text-2xl md:text-3xl font-bold text-white min-h-[5rem] flex items-center justify-center italic">
                     "{transformation}"
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <button 
                     onClick={generateNewTransformation}
                     className="py-4 bg-transparent text-accent-red border border-accent-red/30 font-bold uppercase tracking-widest hover:bg-accent-red/10 transition-colors"
                  >
                     New Idea
                  </button>
                  <button 
                     onClick={unfreeze}
                     className="py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                  >
                     Resume Play
                  </button>
               </div>
            </div>
          )}

        </div>

        {/* Director's Toolkit Sidebar */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          
          <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 shadow-lg">
            <h2 className="text-lg font-bold text-white uppercase tracking-widest mb-4">
               Setup
            </h2>
            <button
               onClick={generateNewStart}
               className="w-full py-4 bg-white/5 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center gap-2"
             >
               <RotateCcw className="w-4 h-4" /> New Starting Scene
             </button>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 shadow-lg flex-1">
            <h2 className="text-lg font-bold text-accent-red uppercase tracking-widest mb-4">
              How To Play
            </h2>
            
            <div className="space-y-6">
               <div className="relative pl-6 border-l-2 border-white/20 pb-4">
                  <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                  <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">1. Start</h3>
                  <p className="text-zinc-400 text-sm">Two players begin a scene making physical choices (e.g. assembling furniture).</p>
               </div>
               
               <div className="relative pl-6 border-l-2 border-white/20 pb-4">
                  <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                  <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">2. Freeze!</h3>
                  <p className="text-zinc-400 text-sm">Anyone watching can loudly call "Freeze!" The actors must freeze exactly as they are.</p>
               </div>

               <div className="relative pl-6 border-l-2 border-transparent">
                  <div className="absolute w-3 h-3 bg-accent-red rounded-full -left-[7px] top-1 shadow-[0_0_10px_rgba(255,51,51,0.5)]"></div>
                  <h3 className="text-accent-red font-bold mb-1 uppercase tracking-widest text-sm">3. Transform</h3>
                  <p className="text-zinc-400 text-sm">The caller taps one player out, assumes their exact frozen position, and immediately initiates a completely <strong className="text-white">different</strong> scene to justify the physical pose.</p>
               </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
