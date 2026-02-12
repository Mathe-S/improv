"use client";

import { useState } from "react";
import Link from "next/link";
import { getRandomItem } from "@/data/toolboxData";
import { VenetianMask, Plus, Minus, MoveRight } from "lucide-react";

// For "Imaginary" masks or physical triggers
const maskTensionPoints = [
  "Tight forehead, scowling brow",
  "Wide, perfectly round unblinking eyes",
  "A jaw locked into a massive, unnatural grin",
  "Nose scrunched up as if smelling something foul",
  "Mouth pulled tightly to the left side",
  "Total slackness, dead expressionless eyes",
  "Upper lip curled into a permanent snarl",
];

// Environments to drop the mask into
const environments = [
  "A crowded subway car.",
  "At the altar getting married.",
  "In a job interview for a bank.",
  "Waiting in line at the DMV.",
  "Sitting in a quiet library.",
  "At a chaotic toddler's birthday party.",
];

export default function MasksGamePage() {
  const [tension, setTension] = useState(maskTensionPoints[0]);
  const [environment, setEnvironment] = useState(environments[0]);
  
  // A hypothetical "Trance" level state just for visual flavor
  const [tranceLevel, setTranceLevel] = useState(0);

  const generateNewMask = () => setTension(getRandomItem(maskTensionPoints));
  const generateNewEnvironment = () => setEnvironment(getRandomItem(environments));

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6 max-w-5xl mx-auto flex flex-col">
      <Link href="/games" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors shrink-0">
        ← Back to Games
      </Link>

      <div className="text-center mb-12 shrink-0">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase relative inline-block">
          Masks
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Put on a physical or imaginary mask. Do not plan the character. Let the physical tension possess you and dictate the scene.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8 flex-1">
        
        {/* The Possession Board */}
        <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 md:p-8 flex flex-col shadow-lg relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <VenetianMask className="w-64 h-64" />
          </div>

          <h2 className="text-2xl font-bold text-accent-red uppercase tracking-widest mb-6 border-b border-accent-red/20 pb-4 relative z-10 text-center">
            The Possession
          </h2>
          
          <div className="flex-1 space-y-6 flex flex-col relative z-10">
             
             {/* The Mask / Tension */}
             <div className="bg-black/50 border border-white/5 p-6 rounded-sm text-center shadow-lg">
                <p className="text-sm font-bold text-accent-red uppercase tracking-widest mb-4">
                  The Mask (Physical Trigger)
                </p>
                <div className="flex items-center justify-center min-h-[5rem] px-4">
                   <p className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider leading-tight">
                      "{tension}"
                   </p>
                </div>
                <button 
                   onClick={generateNewMask}
                   className="mt-6 py-3 w-full bg-white/5 text-zinc-300 font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors border border-white/10"
                >
                   Generate Imaginary Mask
                </button>
             </div>

             {/* The Environment */}
             <div className="bg-black/50 border border-white/5 p-6 rounded-sm text-center shadow-lg">
                <p className="text-sm font-bold text-white uppercase tracking-widest mb-4">
                  Drop Them Into:
                </p>
                <div className="flex items-center justify-center min-h-[4rem] px-4">
                   <p className="text-lg font-medium text-zinc-300 italic">
                      "{environment}"
                   </p>
                </div>
                <button 
                   onClick={generateNewEnvironment}
                   className="mt-6 py-3 w-full bg-white/5 text-zinc-300 font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors border border-white/10"
                >
                   Drop Into New Environment
                </button>
             </div>

          </div>
        </div>

        {/* Trance Status / Rules */}
        <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 md:p-8 flex flex-col shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4 text-center">
            The Process
          </h2>
          
          <div className="flex-1 flex flex-col">
             
             <div className="space-y-6 flex-1 text-left">
                <div className="relative pl-6 border-l-2 border-white/20 pb-2">
                   <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                   <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">1. Focus Internally</h3>
                   <p className="text-zinc-400 text-sm">Look at yourself in a mirror. Put the physical mask on, or force your face into the generated physical tension. <strong className="text-accent-red">Hold it perfectly still.</strong></p>
                </div>
                
                <div className="relative pl-6 border-l-2 border-white/20 pb-2">
                   <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                   <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">2. Wait for the Body</h3>
                   <p className="text-zinc-400 text-sm">Do not decide who the character is. Let the tension in your face naturally spread down your neck, into your shoulders, and distort your spine.</p>
                </div>

                <div className="relative pl-6 border-l-2 border-white/20 pb-2">
                   <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                   <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">3. Move Before Speaking</h3>
                   <p className="text-zinc-400 text-sm">Begin walking around the room. How does this new spine shift your gait? Is it heavy? Light? Creeping?</p>
                </div>

                <div className="relative pl-6 border-l-2 border-transparent">
                   <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                   <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">4. Let Them Speak</h3>
                   <p className="text-zinc-400 text-sm">Only once the body feels alien, open the mouth and see what voice comes out. It shouldn't feel like "acting", it should feel like being possessed.</p>
                </div>
             </div>

             {/* Trance Level Toy */}
             <div className="mt-8 bg-black/50 border border-white/5 p-6 rounded-sm text-center">
                <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">Trance Metronome</p>
                <div className="flex items-center justify-center gap-4">
                   <button 
                     onClick={() => setTranceLevel(Math.max(0, tranceLevel - 1))}
                     className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 text-white"
                   >
                     <Minus className="w-4 h-4" />
                   </button>
                   <div className="w-16 h-16 rounded-full border-4 border-accent-red flex items-center justify-center text-xl font-black text-white bg-accent-red/10">
                     {tranceLevel}
                   </div>
                   <button 
                     onClick={() => setTranceLevel(Math.min(10, tranceLevel + 1))}
                     className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 text-white"
                   >
                     <Plus className="w-4 h-4" />
                   </button>
                </div>
                <p className="text-zinc-500 text-[10px] mt-4 uppercase tracking-widest">
                  Use this to abstractly track your immersion. (10 = fully possessed)
                </p>
             </div>

          </div>
        </div>

      </div>
    </div>
  );
}
