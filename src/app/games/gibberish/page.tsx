"use client";

import { useState } from "react";
import Link from "next/link";
import { getRandomItem, allEmotions } from "@/data/toolboxData";
import { Shuffle } from "lucide-react";

const simpleObjectives = [
  "You want to borrow money from them.",
  "You are trying to break up with them.",
  "You need them to help you move a very heavy couch.",
  "You are trying to sell them a vacuum cleaner.",
  "You are accusing them of eating your lunch.",
  "You are confessing your undying love.",
  "You are firing them from their job.",
  "You are asking for directions to the bathroom.",
];

const translatorTopics = [
  "A scientist explaining their new time machine.",
  "A chef detailing their secret recipe.",
  "An alien ambassador demanding surrender.",
  "A fashion designer critiquing a terrible outfit.",
  "A sports coach giving an intense halftime speech.",
];

export default function GibberishGamePage() {
  const [objective, setObjective] = useState(simpleObjectives[0]);
  const [emotion, setEmotion] = useState(allEmotions[0]);
  const [translatorTopic, setTranslatorTopic] = useState(translatorTopics[0]);

  // Mode state: 2 Player (Direct) vs 3 Player (Translator)
  const [isTranslatorMode, setIsTranslatorMode] = useState(false);

  const generateNewObjective = () => setObjective(getRandomItem(simpleObjectives));
  const generateNewEmotion = () => setEmotion(getRandomItem(allEmotions));
  const generateNewTranslatorTopic = () => setTranslatorTopic(getRandomItem(translatorTopics));

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6 max-w-5xl mx-auto flex flex-col">
      <Link href="/games" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors shrink-0">
        ← Back to Games
      </Link>

      <div className="text-center mb-12 shrink-0">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase relative inline-block">
          Gibberish
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Communicate entirely without real words. Let your tone, gesture, and physical emotion do the talking.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 mb-8 flex-1">
        
        {/* Main Stage Panel */}
        <div className="lg:col-span-8 border bg-zinc-900 border-white/10 rounded-sm p-6 md:p-8 flex flex-col shadow-lg">
          
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4 shrink-0">
             <h2 className="text-lg font-bold text-white uppercase tracking-widest">
                The Stage
             </h2>
             <div className="flex bg-black/50 p-1 rounded-sm border border-white/5">
                <button 
                  onClick={() => setIsTranslatorMode(false)}
                  className={`px-4 py-1 text-xs font-bold uppercase tracking-widest transition-colors ${!isTranslatorMode ? "bg-accent-red text-white" : "text-zinc-500 hover:text-white"}`}
                >
                  2 Player
                </button>
                <button 
                  onClick={() => setIsTranslatorMode(true)}
                  className={`px-4 py-1 text-xs font-bold uppercase tracking-widest transition-colors ${isTranslatorMode ? "bg-accent-red text-white" : "text-zinc-500 hover:text-white"}`}
                >
                  3 Player (Translator)
                </button>
             </div>
          </div>

          {!isTranslatorMode ? (
            // 2 PLAYER MODE
            <div className="flex-1 flex flex-col justify-center animate-in fade-in zoom-in-95 duration-200">
               <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  {/* Objective Box */}
                  <div className="bg-black/50 border border-white/5 p-6 rounded-sm text-center shadow-lg flex flex-col">
                     <p className="text-sm font-bold text-accent-red uppercase tracking-widest mb-4">
                       Your Objective
                     </p>
                     <p className="text-xl md:text-2xl font-bold text-white min-h-[6rem] flex items-center justify-center italic">
                        "{objective}"
                     </p>
                     <button 
                        onClick={generateNewObjective}
                        className="mt-6 py-3 bg-white/5 text-zinc-300 font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors border border-white/10 flex justify-center items-center gap-2"
                     >
                        <Shuffle className="w-3 h-3" /> New Objective
                     </button>
                  </div>

                  {/* Emotion Box */}
                  <div className="bg-black/50 border border-white/5 p-6 rounded-sm text-center shadow-lg flex flex-col">
                     <p className="text-sm font-bold text-white uppercase tracking-widest mb-4">
                       Your Emotion
                     </p>
                     <p className="text-xl md:text-2xl font-bold text-white min-h-[6rem] flex items-center justify-center uppercase tracking-wider text-zinc-300">
                        {emotion}
                     </p>
                     <button 
                        onClick={generateNewEmotion}
                        className="mt-6 py-3 bg-white/5 text-zinc-300 font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors border border-white/10 flex justify-center items-center gap-2"
                     >
                        <Shuffle className="w-3 h-3" /> New Emotion
                     </button>
                  </div>
               </div>
               
               <div className="bg-accent-red/10 border border-accent-red/20 p-6 rounded-sm text-center">
                  <p className="text-accent-red font-bold uppercase tracking-widest text-sm">
                    Communicate the objective above using ONLY made-up sounds, physical gestures, and the assigned emotion.
                  </p>
               </div>
            </div>
          ) : (
            // 3 PLAYER TRANSLATOR MODE
            <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-right-4 duration-200">
               <div className="bg-black/50 border border-white/5 p-8 rounded-sm text-center mb-8 shadow-lg flex flex-col">
                     <p className="text-sm font-bold text-accent-red uppercase tracking-widest mb-4">
                       The Foreign Expert's Topic
                     </p>
                     <p className="text-2xl md:text-3xl font-bold text-white min-h-[8rem] flex items-center justify-center italic">
                        "{translatorTopic}"
                     </p>
                     <button 
                        onClick={generateNewTranslatorTopic}
                        className="mt-6 py-4 bg-white/5 text-zinc-300 font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors border border-white/10 flex justify-center items-center gap-2 mx-auto px-8"
                     >
                        <Shuffle className="w-4 h-4" /> New Topic
                     </button>
                  </div>
            </div>
          )}

        </div>

        {/* Rules Sidebar */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          
          <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 shadow-lg flex-1">
            <h2 className="text-lg font-bold text-white uppercase tracking-widest mb-6">
              How To Play
            </h2>
            
            {!isTranslatorMode ? (
               <div className="space-y-6">
                  <div className="relative pl-6 border-l-2 border-accent-red pb-4">
                     <div className="absolute w-3 h-3 bg-accent-red rounded-full -left-[7px] top-1"></div>
                     <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">Tone & Volume</h3>
                     <p className="text-zinc-400 text-sm">Are you yelling harsh consonants (K, T, CH) or whispering soft vowels (O, U, AH)? Tone conveys 90% of the meaning.</p>
                  </div>
                  
                  <div className="relative pl-6 border-l-2 border-accent-red pb-4">
                     <div className="absolute w-3 h-3 bg-accent-red rounded-full -left-[7px] top-1"></div>
                     <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">Physicality</h3>
                     <p className="text-zinc-400 text-sm">Point. Gesture wildly. Stomp. Cross your arms. Make your body match your gibberish.</p>
                  </div>

                  <div className="relative pl-6 border-l-2 border-transparent">
                     <div className="absolute w-3 h-3 bg-accent-red rounded-full -left-[7px] top-1"></div>
                     <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">Commitment</h3>
                     <p className="text-zinc-400 text-sm">Don't giggle or act embarrassed. Speak your fake language as if it's your native tongue.</p>
                  </div>
               </div>
            ) : (
               <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="relative pl-6 border-l-2 border-white pb-4">
                     <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                     <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">The Expert</h3>
                     <p className="text-zinc-400 text-sm">Speaks entirely in expressive gibberish to explain their topic. Uses lots of physical gestures.</p>
                  </div>
                  
                  <div className="relative pl-6 border-l-2 border-white pb-4">
                     <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                     <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">The Interviewer</h3>
                     <p className="text-zinc-400 text-sm">Asks the Expert questions in normal English.</p>
                  </div>

                  <div className="relative pl-6 border-l-2 border-transparent">
                     <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                     <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">The Translator</h3>
                     <p className="text-zinc-400 text-sm">Listens to the Expert's gibberish, observes their emotions/gestures, and simultaneously translates it into English for the Interviewer.</p>
                  </div>
               </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
