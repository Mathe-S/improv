"use client";

import { useState } from "react";
import Link from "next/link";
import { getRandomItem } from "@/data/toolboxData";

const dreamStarts = [
  "You're standing on a beach.",
  "You are swimming in a large lake.",
  "You're walking through a dense forest.",
  "You are floating in space.",
  "You're in the attic of an old house.",
  "You are exploring a cavern.",
  "You are in a completely white room.",
];

const questionPrompts = [
  "Can you see anything?",
  "Is it dark or light?",
  "Did you think that up, or did you just know?",
  "Are you alone?",
  "Does the path lead up or down?",
  "What do you hear?",
  "Is it from your right or your left?",
  "What are they wearing?",
  "What do you do with it?",
];

export default function DreamsGamePage() {
  const [start, setStart] = useState(dreamStarts[0]);
  const [question, setQuestion] = useState(questionPrompts[0]);

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6 max-w-4xl mx-auto">
      <Link href="/games" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors">
        ← Back to Games
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase">
          Dreams
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Relax, bypass the censor, and experience effortless imagination. 
        </p>
      </div>

      <div className="bg-zinc-900 border border-white/10 rounded-sm p-8 md:p-12 relative overflow-hidden">
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Questioner Guide */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-accent-red uppercase tracking-widest mb-6 border-b border-accent-red/20 pb-2">
              The Questioner
            </h2>
            
            <div className="bg-white/5 border border-white/10 p-6 rounded-sm shadow-md">
              <p className="text-sm text-zinc-500 uppercase tracking-widest mb-2">Starting Suggestion</p>
              <p className="text-lg font-medium text-white mb-4 italic">"{start}"</p>
              <button 
                onClick={() => setStart(getRandomItem(dreamStarts))}
                className="text-xs text-accent-red font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                → Generate New Start
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-sm shadow-md">
              <p className="text-sm text-zinc-500 uppercase tracking-widest mb-2">Question Idea</p>
              <p className="text-lg font-medium text-white mb-4 italic">"{question}"</p>
              <button 
                onClick={() => setQuestion(getRandomItem(questionPrompts))}
                className="text-xs text-accent-red font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                → Generate New Question
              </button>
            </div>
            
            <div className="text-sm text-zinc-400 space-y-3 bg-black/30 p-4 rounded-sm border border-white/5">
              <p><strong className="text-white uppercase text-xs tracking-widest">Tips</strong></p>
              <p>• Enter a similar trance state.</p>
              <p>• Avoid asking leading questions.</p>
              <p>• Ask questions they can answer simply.</p>
              <p>• Coax them near threatening areas, but don't force.</p>
              <p>• Observe their breathing for signs of alarm.</p>
            </div>
          </div>

          {/* Dreamer Guide */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-6 border-b border-white/20 pb-2">
              The Dreamer
            </h2>

            <div className="text-lg text-zinc-300 space-y-6 leading-relaxed bg-black/50 p-8 rounded-sm border border-white/5 shadow-md">
              <p>
                Lie comfortably on the floor. Close your eyes.
              </p>
              <p className="text-accent-red">
                Take a deep breath and let your body sink into the floor.
              </p>
              <p>
                Do not try to "think up" a story. Let the images arrive on their own. 
                If the questioner asks "Are you on a beach?", you just look and see if you are. 
              </p>
              <p>
                Report what you sense around you honestly and effortlessly. 
                The goal is absolute choiceless creativity.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
