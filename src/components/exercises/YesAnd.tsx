"use client";

import { useState } from "react";

type StoryNode = {
  text: string;
  options: {
    label: string;
    nextId: string | null; // null means end of this branch/fail
    type: "block" | "accept";
  }[];
};

const STORY_DATA: Record<string, StoryNode> = {
  start: {
    text: "You find a mysterious glowing orb in the attic.",
    options: [
      { label: "I put it back in the box. It looks dangerous.", nextId: "fail_ignore", type: "block" },
      { label: "I pick it up and it burns my hand!", nextId: "mid_burn", type: "accept" },
    ],
  },
  fail_ignore: {
    text: "The story ends. You ignored the offer. Spontaneity dies when we block.",
    options: [],
  },
  mid_burn: {
    text: "It burns your hand, but triggers a holographic projection of a map.",
    options: [
      { label: "I act like I didn't see it and go downstairs.", nextId: "fail_ignore", type: "block" },
      { label: "I trace the map to the old lighthouse!", nextId: "end_success", type: "accept" },
    ],
  },
  end_success: {
    text: "You rush to the lighthouse, adventure awaiting! You said YES, AND kept the story moving.",
    options: [],
  },
};

export default function YesAndGame() {
  const [currentNodeId, setCurrentNodeId] = useState("start");
  const [history, setHistory] = useState<string[]>([]);
  
  const node = STORY_DATA[currentNodeId];

  const handleOption = (nextId: string | null, type: "block" | "accept", text: string) => {
    if (type === "block") {
      setHistory([...history, `> ${text}`, "BLOCKING! The scene died."]);
    } else {
      setHistory([...history, `> ${text}`]);
    }
    
    if (nextId && STORY_DATA[nextId]) {
      setCurrentNodeId(nextId);
    } else {
      // Create a generic fail state if id missing, though our data covers it
      setCurrentNodeId("fail_ignore");
    }
  };

  const reset = () => {
    setCurrentNodeId("start");
    setHistory([]);
  };

  return (
    <div className="bg-zinc-900 border border-white/10 p-8 rounded-sm max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold mb-2">The "Yes, And" Machine</h3>
        <p className="text-zinc-400">Choose the response that accepts the offer and advances the scene.</p>
      </div>

      <div className="space-y-4 mb-8 max-h-60 overflow-y-auto p-4 bg-black/30 rounded border border-white/5">
        {history.map((line, i) => (
          <p key={i} className={line.startsWith("BLOCKING") ? "text-red-500 font-bold" : "text-zinc-400"}>
            {line}
          </p>
        ))}
        <p className="text-xl text-white font-serif animate-in fade-in">{node.text}</p>
      </div>

      {node.options.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {node.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOption(opt.nextId, opt.type, opt.label)}
              className="py-4 px-6 bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/50 text-left transition-all"
            >
              {opt.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={reset}
            className="px-8 py-3 bg-accent-red text-white font-bold uppercase tracking-widest hover:bg-red-600 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
