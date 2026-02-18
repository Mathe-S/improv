"use client";

import { useState } from "react";
import Link from "next/link";
import { getRandomItem } from "@/data/toolboxData";
import { MoveRight, Shuffle, EyeOff } from "lucide-react";

// For generating random limbs to "offer" blindly
const bodyParts = [
  "Hold out your right hand, palm up.",
  "Stick your left elbow out to the side.",
  "Point your index finger straight ahead.",
  "Present the back of your hand.",
  "Cross both arms in front of your chest.",
  "Hold both hands out as if grasping something heavy.",
  "Put your hands on your hips.",
  "Tap your own shoulder.",
];

// Unrelated topics to discuss during the advanced version
const unrelatedTopics = [
  "How to properly change a tire.",
  "The recipe for the best lasagna.",
  "Your favorite childhood television show.",
  "Explaining the rules of chess.",
  "Why the DMV takes so long.",
  "Reviewing the last movie you watched.",
];

export default function BlindOffersGamePage() {
  const [offerPose, setOfferPose] = useState(bodyParts[0]);
  const [topic, setTopic] = useState(unrelatedTopics[0]);

  // View mode
  const [advancedMode, setAdvancedMode] = useState(false);

  const generateNewPose = () => setOfferPose(getRandomItem(bodyParts));
  const generateNewTopic = () => setTopic(getRandomItem(unrelatedTopics));

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6 max-w-5xl mx-auto flex flex-col">
      <Link href="/games" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors shrink-0">
        ← Back to Games
      </Link>

      <div className="text-center mb-12 shrink-0">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase relative inline-block">
          Blind Offers
          {advancedMode && (
            <span className="absolute -top-4 -right-10 text-accent-red animate-pulse">
               <EyeOff className="w-8 h-8" />
            </span>
          )}
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Make an intentionless physical gesture. Let your partner decide what it means. Accept their reality immediately.
        </p>
      </div>

      <div className="flex justify-center mb-8 gap-4">
         <button 
           onClick={() => setAdvancedMode(false)}
           className={`px-6 py-2 text-sm font-bold uppercase tracking-widest transition-colors border ${!advancedMode ? "bg-white text-black border-white" : "bg-transparent text-zinc-500 border-zinc-800 hover:text-white"}`}
         >
            Standard Drill
         </button>
         <button 
           onClick={() => setAdvancedMode(true)}
           className={`px-6 py-2 text-sm font-bold uppercase tracking-widest transition-colors border ${advancedMode ? "bg-accent-red text-white border-accent-red" : "bg-transparent text-zinc-500 border-zinc-800 hover:text-white"}`}
         >
            Advanced Integration
         </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 mb-8 flex-1">
        
        {/* Play Space Board */}
        <div className="lg:col-span-8 bg-zinc-900 border border-white/10 rounded-sm p-6 md:p-8 flex flex-col shadow-lg relative overflow-hidden">
          
          <h2 className="text-xl font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4 mb-8 text-center">
            {advancedMode ? "Dual-Focus Training" : "Physical Ping-Pong"}
          </h2>

          <div className="flex-1 flex flex-col justify-center animate-in fade-in zoom-in-95 duration-300">
             
             {/* The Pose Generator */}
             <div className="max-w-md mx-auto w-full mb-12">
                <p className="text-sm font-bold text-accent-red uppercase tracking-widest mb-4 text-center">
                  Player A: The Blind Pose
                </p>
                <div className="bg-black/50 border border-white/5 p-8 rounded-sm text-center shadow-lg">
                   <p className="text-xl md:text-2xl font-bold text-white leading-tight min-h-[4rem] flex items-center justify-center">
                      "{offerPose}"
                   </p>
                </div>
                <button 
                   onClick={generateNewPose}
                   className="mt-6 py-4 w-full bg-white/5 text-zinc-300 font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors border border-white/10 flex justify-center items-center gap-2"
                >
                   <Shuffle className="w-3 h-3" /> Roll New Pose
                </button>
             </div>

             {advancedMode && (
                <div className="max-w-md mx-auto w-full animate-in slide-in-from-bottom-6 fade-in duration-300">
                  <p className="text-sm font-bold text-white uppercase tracking-widest mb-4 text-center">
                    Simultaneous Conversation Topic
                  </p>
                  <div className="bg-accent-red/10 border border-accent-red/20 p-6 rounded-sm text-center shadow-lg">
                     <p className="text-lg font-medium text-white italic">
                        "{topic}"
                     </p>
                  </div>
                  <button 
                     onClick={generateNewTopic}
                     className="mt-4 py-3 w-full bg-transparent text-accent-red border border-accent-red/30 font-bold uppercase tracking-widest text-xs hover:bg-accent-red/10 transition-colors flex justify-center items-center gap-2"
                  >
                     <Shuffle className="w-3 h-3" /> Roll New Topic
                  </button>
                  <p className="text-xs text-zinc-500 text-center mt-6">
                     You must have a completely normal conversation about this topic while silently running the physical "Blind Offer" game underneath it. Do not let the physical actions interrupt your speech.
                  </p>
                </div>
             )}

          </div>
        </div>

        {/* Rules Sidebar */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          
          <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 shadow-lg flex-1">
            <h2 className="text-lg font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
              Step-by-Step Flow
            </h2>
            
            <div className="space-y-6">
               <div className="relative pl-6 border-l-2 border-accent-red pb-4">
                  <div className="absolute w-3 h-3 bg-accent-red rounded-full -left-[7px] top-1"></div>
                  <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">1. Intentionless Pose</h3>
                  <p className="text-zinc-400 text-sm">Player A makes a completely random, meaningless physical gesture (like extending a palm) and freezes.</p>
               </div>
               
               <div className="relative pl-6 border-l-2 border-white pb-4">
                  <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                  <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">2. Justify and Act</h3>
                  <p className="text-zinc-400 text-sm">Player B immediately decides what the pose means and physically engages with it (e.g., placing invisible money on A's palm).</p>
               </div>

               <div className="relative pl-6 border-l-2 border-white pb-4">
                  <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                  <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">3. The Acceptance</h3>
                  <p className="text-zinc-400 text-sm">Player A completely accepts B's reality without hesitation. A says <strong className="text-accent-red italic">"Thank You."</strong></p>
               </div>

               <div className="relative pl-6 border-l-2 border-transparent">
                  <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                  <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">4. Ping Pong</h3>
                  <p className="text-zinc-400 text-sm">Player B now instantly makes their own random, meaningless gesture and waits for A to interpret it. The cycle repeats.</p>
               </div>
            </div>

          </div>

          <div className="bg-black/50 border border-white/5 rounded-sm p-6 shadow-lg text-sm text-zinc-400">
             <strong className="text-accent-red uppercase tracking-widest text-xs block mb-2">Why play this?</strong>
             It proves that you don't need to "think up" a good scene. If you simply give intentionless offers, your partner will automatically construct meaning for you.
          </div>

        </div>

      </div>
    </div>
  );
}
