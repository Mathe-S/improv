"use client";

import { useState } from "react";

const STEPS = [
  { label: "Once upon a time...", placeholder: "a lonely robot lived on the moon." },
  { label: "Every day...", placeholder: "he dusted the craters." },
  { label: "But one day...", placeholder: "a rocket crashed nearby." },
  { label: "Because of that...", placeholder: "he found a puppy inside." },
  { label: "Until finally...", placeholder: "he wasn't lonely anymore." },
];

export default function StorySpine() {
  const [inputs, setInputs] = useState<string[]>(Array(5).fill(""));
  const [isViewing, setIsViewing] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  return (
    <div className="bg-zinc-900 border border-white/10 p-8 rounded-sm max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold mb-2">The Story Spine</h3>
        <p className="text-zinc-400">The skeleton of every great narrative. Fill in the blanks.</p>
      </div>

      {!isViewing ? (
        <div className="space-y-6">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col gap-2">
              <label className="text-accent-red font-mono font-bold tracking-widest text-sm uppercase">
                {step.label}
              </label>
              <textarea
                value={inputs[i]}
                onChange={(e) => handleInputChange(i, e.target.value)}
                placeholder={`...${step.placeholder}`}
                className="bg-black/40 border border-white/10 p-4 text-white focus:border-accent-red focus:outline-none rounded-sm min-h-[80px]"
              />
            </div>
          ))}
          <button
            onClick={() => setIsViewing(true)}
            disabled={inputs.some((i) => i.trim() === "")}
            className="w-full py-4 mt-8 bg-white text-black font-bold uppercase tracking-widest hover:bg-accent-red hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Tell the Story
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in zoom-in-95 duration-700">
          <div className="prose prose-invert prose-lg text-center mx-auto mb-12 font-serif leading-loose">
            {STEPS.map((step, i) => (
              <p key={i}>
                <span className="text-zinc-500 block text-sm font-sans uppercase tracking-widest mb-1">{step.label}</span>
                <span className="text-2xl">{inputs[i]}</span>
              </p>
            ))}
          </div>
          <button
            onClick={() => setIsViewing(false)}
            className="w-full py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            Edit Story
          </button>
        </div>
      )}
    </div>
  );
}
