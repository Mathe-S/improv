"use client";

import { useState } from "react";
import Link from "next/link";
import { getRandomItem } from "@/data/toolboxData";
import { Gift, RotateCcw } from "lucide-react";

const obscureGifts = [
  "A live, agitated wolverine",
  "A completely invisible bicycle",
  "A box full of someone else's teeth",
  "A ticket to last week's concert",
  "A miniature, fully storming raincloud",
  "A single, very heavy bowling ball",
  "A ticking, glowing briefcase",
  "A completely melted ice cream cone",
];

const overacceptReactions = [
  "Tear up with joy. This is exactly what you've always wanted.",
  "Scream. It's the most exciting thing you've ever held.",
  "Immediately put it on/eat it/use it like an expert.",
  "Act like it's a sacred, ancient artifact.",
  "Tell a quick, fake childhood story about why this means so much to you.",
];

export default function PresentsGamePage() {
  const [giftIdea, setGiftIdea] = useState(obscureGifts[0]);
  const [reaction, setReaction] = useState(overacceptReactions[0]);

  const generateNewGift = () => setGiftIdea(getRandomItem(obscureGifts));
  const generateNewReaction = () => setReaction(getRandomItem(overacceptReactions));

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6 max-w-5xl mx-auto flex flex-col">
      <Link href="/games" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors shrink-0">
        ← Back to Games
      </Link>

      <div className="text-center mb-12 shrink-0">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase relative inline-block">
          Presents
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Stop planning gifts. Just hold your hands out as a shape, and watch the other person delight in whatever they decide it is.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 mb-8 flex-1">
        
        {/* Play Space Board */}
        <div className="lg:col-span-8 bg-zinc-900 border border-white/10 rounded-sm p-6 md:p-8 flex flex-col shadow-lg">
          
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4 shrink-0">
             <h2 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Gift className="w-5 h-5" /> The Exchange
             </h2>
          </div>

          <div className="flex-1 space-y-8 flex flex-col justify-center animate-in fade-in zoom-in-95 duration-300 py-8">
             
             {/* The Receiver section is the most important part of "Presents" according to Johnstone */}
             <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-white/10 pb-2">
                   <p className="text-sm font-bold text-accent-red uppercase tracking-widest">
                     The Receiver Decides The Gift
                   </p>
                   <button 
                     onClick={generateNewGift}
                     className="text-xs text-zinc-500 hover:text-white transition-colors uppercase font-bold tracking-widest flex items-center gap-1"
                   >
                     <RotateCcw className="w-3 h-3"/> Reroll Idea
                   </button>
                </div>
                <div className="bg-black/50 border border-white/5 p-8 rounded-sm text-center shadow-lg">
                   <p className="text-2xl md:text-3xl font-bold text-white leading-tight min-h-[4rem] flex items-center justify-center italic">
                      "Oh my god! You got me... {giftIdea.toLowerCase()}!"
                   </p>
                </div>
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-white/10 pb-2">
                   <p className="text-sm font-bold text-white uppercase tracking-widest">
                     How To Overaccept It
                   </p>
                   <button 
                     onClick={generateNewReaction}
                     className="text-xs text-zinc-500 hover:text-white transition-colors uppercase font-bold tracking-widest flex items-center gap-1"
                   >
                     <RotateCcw className="w-3 h-3"/> Reroll Reaction
                   </button>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-sm text-center shadow-lg">
                   <p className="text-lg font-medium text-zinc-300 min-h-[3rem] flex items-center justify-center">
                      {reaction}
                   </p>
                </div>
             </div>

          </div>
        </div>

        {/* Rules Sidebar */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          
          <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 shadow-lg flex-1">
            <h2 className="text-lg font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
              Core Principles
            </h2>
            
            <div className="space-y-6">
               <div className="relative pl-6 border-l-2 border-accent-red pb-4">
                  <div className="absolute w-3 h-3 bg-accent-red rounded-full -left-[7px] top-1"></div>
                  <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">Hold The Shape</h3>
                  <p className="text-zinc-400 text-sm">The Giver does not invent the gift. They just offer a random physical shape with their hands. Let the Receiver decide what fits in that shape.</p>
               </div>
               
               <div className="relative pl-6 border-l-2 border-white pb-4">
                  <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                  <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">The Burden is on the Receiver</h3>
                  <p className="text-zinc-400 text-sm">It's the Receiver's job to make the Giver look like a genius. Whatever awkward shape they handed over, it must be exactly what you needed.</p>
               </div>

               <div className="relative pl-6 border-l-2 border-white pb-4">
                  <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                  <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">Overaccepting</h3>
                  <p className="text-zinc-400 text-sm">Normal acceptance: "Thanks, a watch." <strong className="text-accent-red">Overacceptance:</strong> "A WATCH?! My grandfather's watch! I thought it was lost in the river forever!"</p>
               </div>

               <div className="relative pl-6 border-l-2 border-transparent">
                  <div className="absolute w-3 h-3 bg-white rounded-full -left-[7px] top-1"></div>
                  <h3 className="text-white font-bold mb-1 uppercase tracking-widest text-sm">Interact With It</h3>
                  <p className="text-zinc-400 text-sm">Once you unwrap it, you MUST physically use it immediately in the space.</p>
               </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
