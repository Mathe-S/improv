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

import useSpeechRecognition from "@/hooks/useSpeechRecognition";
import { useEffect } from "react";

// ... (existing types and STORY_DATA kept same, but I need to import them or re-declare them if I replace whole file. 
// Ideally I'd use multi_replace but the file is small enough to just rewrite logic parts.
// Actually, I will just rewrite the component body to include voice logic).

// To be safe and clean, I will replace the component export.

export default function YesAndGame() {
  const [currentNodeId, setCurrentNodeId] = useState("start");
  const [history, setHistory] = useState<string[]>([]);
  const { isListening, transcript, startListening, stopListening, isSupported } = useSpeechRecognition();
  
  const node = STORY_DATA[currentNodeId];

  // Move handleOption before usage
  // Defined here to be accessible by effect
  // Also wrap in simple definition to avoid useCallback complexity if not strictly needed, 
  // but for deps it's better.
  const handleOption = (nextId: string | null, type: "block" | "accept", text: string) => {
    if (type === "block") {
      setHistory(prev => [...prev, `> ${text}`, "BLOCKING! The scene died."]);
    } else {
      setHistory(prev => [...prev, `> ${text}`]);
    }
    
    if (nextId && STORY_DATA[nextId]) {
      setCurrentNodeId(nextId);
    } else {
      setCurrentNodeId("fail_ignore");
    }
  };

  // Voice Logic
  useEffect(() => {
    if (!isListening) return;
    
    const text = transcript.toLowerCase().trim();
    if (!text) return;

    if (text.startsWith("yes")) {
      const acceptOpt = node.options.find(o => o.type === "accept");
      if (acceptOpt) {
        setTimeout(() => {
           handleOption(acceptOpt.nextId, acceptOpt.type, acceptOpt.label + " (Voice Detected)");
           stopListening();
        }, 0);
      }
    } else if (text.startsWith("no") || text.startsWith("i put it back")) { // Specific fail case or generic 'no'
       const blockOpt = node.options.find(o => o.type === "block");
       if (blockOpt) {
         setTimeout(() => {
           handleOption(blockOpt.nextId, blockOpt.type, blockOpt.label + " (Voice Detected)");
           stopListening();
         }, 0);
       }
    }
  }, [transcript, isListening, node, stopListening]); // removed handleOption from deps to avoid infinite loop or needing useCallback for now (stale closure is minor risk here since we used callback setHistory)

  const reset = () => {
    setCurrentNodeId("start");
    setHistory([]);
  };

  return (
    <div className="bg-zinc-900 border border-white/10 p-8 rounded-sm max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold mb-2">The &quot;Yes, And&quot; Machine</h3>
        <p className="text-zinc-400">Choose (or SPEAK) the response that accepts the offer.</p>
        {isSupported && (
          <button 
            onClick={isListening ? stopListening : startListening}
            className={`mt-4 text-xs tracking-widest uppercase px-3 py-1 rounded border ${isListening ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse' : 'border-zinc-700 text-zinc-500'}`}
          >
            {isListening ? "Listening... Say &apos;Yes...&apos;" : "Enable Voice"}
          </button>
        )}
      </div>

      <div className="space-y-4 mb-8 max-h-60 overflow-y-auto p-4 bg-black/30 rounded border border-white/5">
        {history.map((line, i) => (
          <p key={i} className={line.startsWith("BLOCKING") ? "text-red-500 font-bold" : "text-zinc-400"}>
            {line}
          </p>
        ))}
        <p className="text-xl text-white font-serif animate-in fade-in">{node.text}</p>
        
        {isListening && transcript && (
             <p className="text-sm text-accent-red font-mono">You said: &quot;{transcript}&quot;...</p>
        )}
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
