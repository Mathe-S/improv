"use client";

import { useState } from "react";
import Link from "next/link";
import { getRandomItem } from "@/data/toolboxData";

const absurdSubjects = [
  "teaching hippopotamuses to knit",
  "building a time machine out of cheese",
  "translating the language of unhappy houseplants",
  "training pigeons to perform Shakespeare",
  "inventing a color that makes people sneeze",
  "negotiating peace treaties with angry bees",
  "turning spaghetti into a renewable energy source",
  "teaching mushrooms to yodel",
];

const interviewerPrompts = [
  "Good evening... We are fortunate enough to have someone who has just returned from...",
  "Tell me, Professor, how exactly do you go about...",
  "I understand you've brought some charts regarding...",
  "Can you elaborate on the difficulties of...",
  "Isn't it true that your early experiments resulted in...",
  "What do you say to the critics who argue that...",
  "Could you demonstrate exactly how you hold the...",
];

export default function ExpertsGamePage() {
  const [subject, setSubject] = useState(absurdSubjects[0]);
  const [prompt, setPrompt] = useState(interviewerPrompts[0]);

  const generateNewSubject = () => {
    setSubject(getRandomItem(absurdSubjects));
  };

  const generateNewPrompt = () => {
    setPrompt(getRandomItem(interviewerPrompts));
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-4xl mx-auto">
      <Link href="/games" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors">
        ← Back to Games
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase">
          Experts
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Instantly justify and formulate answers to impossible questions without hedging.
        </p>
      </div>

      <div className="bg-zinc-900 border border-white/10 rounded-sm p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Expert Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-accent-red uppercase tracking-widest text-center">
              The Expert
            </h2>
            <div className="bg-black/50 border border-white/5 p-8 rounded-sm text-center shadow-lg">
              <p className="text-sm text-zinc-500 uppercase tracking-widest mb-4">Your Expert Subject</p>
              <p className="text-2xl font-bold text-white mb-8 min-h-[5rem] flex items-center justify-center">
                "{subject}"
              </p>
              <button
                onClick={generateNewSubject}
                className="w-full py-4 bg-white/10 text-white font-bold uppercase tracking-widest hover:bg-white/20 transition-colors"
              >
                New Subject
              </button>
            </div>
            <div className="text-zinc-400 text-sm space-y-2 bg-black/20 p-4 rounded-sm">
              <p>• Never hedge or waffle.</p>
              <p>• Give any answer, no matter how ridiculous.</p>
              <p>• Speak with complete authority.</p>
            </div>
          </div>

          {/* Interviewer Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest text-center">
              Interviewer
            </h2>
            <div className="bg-black/50 border border-white/5 p-8 rounded-sm text-center shadow-lg">
              <p className="text-sm text-zinc-500 uppercase tracking-widest mb-4">Sentence Starter</p>
              <p className="text-xl font-medium text-white mb-8 min-h-[5rem] flex items-center justify-center italic">
                "{prompt}"
              </p>
              <button
                onClick={generateNewPrompt}
                className="w-full py-4 bg-accent-red text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
              >
                Next Question
              </button>
            </div>
            <div className="text-zinc-400 text-sm space-y-2 bg-black/20 p-4 rounded-sm">
              <p>• Demand specific, immediate answers.</p>
              <p>• Refer to imaginary props or charts.</p>
              <p>• Start sentences without knowing the end.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
