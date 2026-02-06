"use client";

import { useState } from "react";
import Link from "next/link";
import { getRandomItem, allRelationships, allLocations } from "@/data/toolboxData";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function StatusGamePage() {
  const [relationship, setRelationship] = useState(allRelationships[0]);
  const [location, setLocation] = useState(allLocations[0]);
  
  // High vs Low status
  const [playerAStatus, setPlayerAStatus] = useState<number>(3);
  const [playerBStatus, setPlayerBStatus] = useState<number>(8);

  const generateNewScenario = () => {
    setRelationship(getRandomItem(allRelationships));
    setLocation(getRandomItem(allLocations));
  };

  const generateNewStatuses = () => {
    // Generate two random distinct numbers between 1 and 10
    const a = Math.floor(Math.random() * 10) + 1;
    let b = Math.floor(Math.random() * 10) + 1;
    while (b === a) {
      b = Math.floor(Math.random() * 10) + 1;
    }
    setPlayerAStatus(a);
    setPlayerBStatus(b);
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6 max-w-5xl mx-auto flex flex-col">
      <Link href="/games" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors">
        ← Back to Games
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase">
          Status Game
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Master the subtle art of dominance and submission. Adjust your posture, voice, and eye contact to command the scene.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 mb-8">
        {/* Play Space */}
        <div className="lg:col-span-8 bg-zinc-900 border border-white/10 rounded-sm p-6 md:p-8 flex flex-col shadow-lg">
          
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-8 border-b border-white/10 pb-4 text-center">
            The Scene
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
             <div className="bg-black/50 p-6 rounded-sm border border-white/5 text-center">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Relationship</p>
                <p className="text-xl font-medium text-white min-h-[4rem] flex items-center justify-center">
                   {relationship}
                </p>
             </div>
             <div className="bg-black/50 p-6 rounded-sm border border-white/5 text-center">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Location</p>
                <p className="text-xl font-medium text-white min-h-[4rem] flex items-center justify-center">
                   {location}
                </p>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
             {/* Player A Status */}
             <div className="flex flex-col items-center">
                <p className="text-sm font-bold text-accent-red uppercase tracking-widest mb-4">Player A</p>
                <div className="w-24 h-24 rounded-full border-4 border-accent-red flex items-center justify-center text-4xl font-black text-white bg-accent-red/10 shadow-[0_0_30px_rgba(255,51,51,0.2)]">
                   {playerAStatus}
                </div>
                <p className="mt-4 text-xs text-zinc-400 font-bold uppercase tracking-wider">Status Level</p>
             </div>

             {/* Player B Status */}
             <div className="flex flex-col items-center">
                <p className="text-sm font-bold text-white uppercase tracking-widest mb-4">Player B</p>
                <div className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center text-4xl font-black text-white bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                   {playerBStatus}
                </div>
                <p className="mt-4 text-xs text-zinc-400 font-bold uppercase tracking-wider">Status Level</p>
             </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-auto">
             <button 
                onClick={generateNewScenario}
                className="py-4 bg-white/5 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/10"
             >
                New Scenario
             </button>
             <button 
                onClick={generateNewStatuses}
                className="py-4 bg-accent-red text-white font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
             >
                Randomize Statuses
             </button>
          </div>

        </div>

        {/* Status Guide */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          
          <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 shadow-lg flex-1">
            <h2 className="text-lg font-bold text-white uppercase tracking-widest mb-6">
              Status Masterclass
            </h2>
            
            <div className="space-y-8">
               <div>
                  <div className="flex items-center gap-2 text-white font-bold mb-3 border-b border-white/10 pb-2">
                     <ArrowUp className="w-5 h-5"/> <span className="text-lg tracking-widest uppercase">High Status (7-10)</span>
                  </div>
                  <ul className="text-zinc-400 text-sm space-y-2 list-disc list-inside">
                     <li>Don't move your head when speaking.</li>
                     <li>Hold eye contact confidently.</li>
                     <li>Keep hands away from your face/neck.</li>
                     <li>Move smoothly, comfortably taking up space.</li>
                     <li>Speak in complete sentences without hesitating.</li>
                  </ul>
               </div>

               <div>
                  <div className="flex items-center gap-2 text-zinc-500 font-bold mb-3 border-b border-white/10 pb-2">
                     <span className="text-lg tracking-widest uppercase">Neutral (4-6)</span>
                  </div>
                  <ul className="text-zinc-500 text-sm space-y-2 list-disc list-inside">
                     <li>Equal give and take.</li>
                     <li>Conversational pacing.</li>
                  </ul>
               </div>
               
               <div>
                  <div className="flex items-center gap-2 text-accent-red font-bold mb-3 border-b border-accent-red/20 pb-2">
                     <ArrowDown className="w-5 h-5"/> <span className="text-lg tracking-widest uppercase">Low Status (1-3)</span>
                  </div>
                  <ul className="text-zinc-400 text-sm space-y-2 list-disc list-inside">
                     <li>Break eye contact quickly or look down.</li>
                     <li>Jerky/rapid head movements.</li>
                     <li>Touch your face, hair, or neck constantly.</li>
                     <li>Keep limbs close to your body.</li>
                     <li>Hesitate, use "Er" or "Um". Let sentences drift.</li>
                  </ul>
               </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
