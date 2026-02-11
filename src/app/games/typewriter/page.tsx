"use client";

import { useState } from "react";
import Link from "next/link";
import { getRandomItem } from "@/data/toolboxData";
import { Shuffle } from "lucide-react";

const typewriterGenres = [
  "Classic 1940s Film Noir",
  "A cheesy 1980s Action Movie",
  "A gloomy Victorian Gothic Novel",
  "A high-stakes Heist Thriller",
  "A melodramatic Soap Opera",
  "A gritty Sci-Fi Dystopia",
  "A gentle Children's Fairytale",
];

const narratorStarters = [
  "It was a dark and stormy night when our hero entered the room...",
  "The doors blasted open, and standing there in the dust was...",
  "Little did she know, the man across the table was secretly...",
  "He looked at the empty glass, then suddenly, an overwhelming feeling of...",
  "She tried to remain calm, but her left eye began to twitch as..."
];

export default function TypewriterGamePage() {
  const [genre, setGenre] = useState(typewriterGenres[0]);
  const [starter, setStarter] = useState(narratorStarters[0]);

  const generateNewGenre = () => setGenre(getRandomItem(typewriterGenres));
  const generateNewStarter = () => setStarter(getRandomItem(narratorStarters));

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6 max-w-5xl mx-auto flex flex-col">
      <Link href="/games" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors shrink-0">
        ← Back to Games
      </Link>

      <div className="text-center mb-12 shrink-0">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase relative inline-block">
          Typewriter
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          An omniscient narrator types out the story while the actor is forced to physically manifest their every word and thought.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8 flex-1">
        
        {/* Narrator Panel */}
        <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 md:p-8 flex flex-col shadow-lg">
          <h2 className="text-2xl font-bold text-accent-red uppercase tracking-widest mb-6 border-b border-accent-red/20 pb-4 text-center">
            The Narrator
          </h2>
          
          <div className="flex-1 space-y-6 flex flex-col">
             <div className="bg-black/50 border border-white/5 p-6 rounded-sm text-center shadow-lg">
                <p className="text-sm font-bold text-accent-red uppercase tracking-widest mb-4">
                  Literary Voice / Genre
                </p>
                <p className="text-xl md:text-2xl font-bold text-white min-h-[5rem] flex items-center justify-center uppercase tracking-wider">
                   "{genre}"
                </p>
                <button 
                   onClick={generateNewGenre}
                   className="mt-6 py-3 w-full bg-white/5 text-zinc-300 font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors border border-white/10 flex justify-center items-center gap-2"
                >
                   <Shuffle className="w-3 h-3" /> New Genre
                </button>
             </div>

             <div className="bg-black/50 border border-white/5 p-6 rounded-sm text-center shadow-lg">
                <p className="text-sm font-bold text-white uppercase tracking-widest mb-4">
                  Starting Sentence
                </p>
                <p className="text-lg font-medium text-zinc-300 min-h-[5rem] flex items-center justify-center italic">
                   "{starter}"
                </p>
                <button 
                   onClick={generateNewStarter}
                   className="mt-6 py-3 w-full bg-white/5 text-zinc-300 font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors border border-white/10 flex justify-center items-center gap-2"
                >
                   <Shuffle className="w-3 h-3" /> New Start
                </button>
             </div>
             
             <div className="mt-auto bg-accent-red/10 border border-accent-red/20 p-6 rounded-sm">
                <p className="text-white text-sm font-bold uppercase tracking-widest mb-2">Narrator Rules:</p>
                <ul className="text-zinc-400 text-sm list-disc pl-4 space-y-2">
                   <li>Speak in the 3rd Person ("He walked to the door", not "I walked...").</li>
                   <li>Mime typing on an old typewriter while you speak.</li>
                   <li>Dictate not just the action, but their <strong className="text-white">internal thoughts and emotions</strong> ("He suddenly felt an overwhelming wave of sadness").</li>
                </ul>
             </div>
          </div>
        </div>

        {/* Actor Panel */}
        <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 md:p-8 flex flex-col shadow-lg">
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4 text-center">
            The Actor
          </h2>
          
          <div className="flex-1 flex flex-col justify-center">
             
             <div className="bg-black/50 border border-white/5 p-8 rounded-sm text-center shadow-lg my-auto space-y-8">
                <h3 className="text-3xl font-black text-white uppercase tracking-widest">
                  Surrender completely.
                </h3>
                
                <div className="text-left space-y-4">
                   <div className="relative pl-6 border-l-2 border-white/20 pb-4">
                      <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                      <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">Obey Instantly</h4>
                      <p className="text-zinc-400 text-sm">You must physically manifest whatever the narrator types the second they type it.</p>
                   </div>
                   
                   <div className="relative pl-6 border-l-2 border-white/20 pb-4">
                      <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                      <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">Don't Get Ahead</h4>
                      <p className="text-zinc-400 text-sm">Do not anticipate the story. If they say "He raised his hand—", stop there until they say what you do with it.</p>
                   </div>

                   <div className="relative pl-6 border-l-2 border-transparent">
                      <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                      <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">Push Back (Optional Tension)</h4>
                      <p className="text-zinc-400 text-sm">A fun advanced move: If a narrator types "He did a perfect backflip", and you can't, do a terrible flop, forcing the narrator to type: "...or at least he tried to."</p>
                   </div>
                </div>
             </div>

          </div>
        </div>

      </div>
    </div>
  );
}
