"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";

type StoryNode = {
  text: string;
  options: {
    label: string;
    nextId: string | null; // null means end of this branch/fail
    type: "block" | "accept";
  }[];
  isEnd?: boolean;
};

// Expanded Story Data with multiple genres
const STORY_DATA: Record<string, StoryNode> = {
  // --- SCENARIO 1: The Orb (Fantasy) ---
  start_orb: {
    text: "You find a mysterious glowing orb in the attic. It hums with a low vibration.",
    options: [
      { label: "I put it back in the box. It looks dangerous.", nextId: "fail_ignore", type: "block" },
      { label: "I pick it up and it burns my hand!", nextId: "orb_burn", type: "accept" },
    ],
  },
  orb_burn: {
    text: "It burns your hand, but triggers a holographic projection of a map onto the dusty floor.",
    options: [
      { label: "I act like I didn't see it and go downstairs.", nextId: "fail_ignore", type: "block" },
      { label: "I trace the map to the old lighthouse!", nextId: "orb_lighthouse", type: "accept" },
    ],
  },
  orb_lighthouse: {
    text: "You rush to the lighthouse. The door creaks open, revealing a spiral staircase going... down?",
    options: [
      { label: "No way, I'm going home.", nextId: "fail_chicken", type: "block" },
      { label: "I descend into the darkness, hearing chanting.", nextId: "end_success_orb", type: "accept" },
    ],
  },
  end_success_orb: {
    text: "You find a secret society of improv comedians who have been waiting for you. You are their chosen one.",
    options: [],
    isEnd: true,
  },

  // --- SCENARIO 2: The Barista (Slice of Life) ---
  start_coffee: {
    text: "The barista hands you a coffee, but it's bright blue and bubbling.",
    options: [
      { label: "I return it. 'I ordered a latte, not a potion.'", nextId: "fail_boring", type: "block" },
      { label: "I take a sip and suddenly I can hear thoughts!", nextId: "coffee_thoughts", type: "accept" },
    ],
  },
  coffee_thoughts: {
    text: "You hear the barista thinking: 'I hope they don't realize I'm actually a wizard in hiding.'",
    options: [
      { label: "I ignore it and walk away.", nextId: "fail_ignore", type: "block" },
      { label: "I lean over and whisper, 'Your secret is safe with me.'", nextId: "coffee_wizard", type: "accept" },
    ],
  },
  coffee_wizard: {
    text: "The barista's eyes widen. He passes you a napkin with a rune on it.",
    options: [
      { label: "I throw it in the trash.", nextId: "fail_rude", type: "block" },
      { label: "I activate the rune and teleport to the coffee dimension.", nextId: "end_success_coffee", type: "accept" },
    ],
  },
  end_success_coffee: {
    text: "You are now the king of the Coffee Dimension. Perpetual caffeine awaits!",
    options: [],
    isEnd: true,
  },

  // --- SCENARIO 3: Spaceship (Sci-Fi) ---
  start_ship: {
    text: "The ship's AI announces, 'Oxygen levels critical. Please stop breathing so loudly.'",
    options: [
      { label: "I file a complaint with HR.", nextId: "fail_karen", type: "block" },
      { label: "I hold my breath and float to the airlock.", nextId: "ship_airlock", type: "accept" },
    ],
  },
  ship_airlock: {
    text: "At the airlock, you see a gremlin chewing on the oxygen cables!",
    options: [
      { label: "I wait strictly for maintenance.", nextId: "fail_passive", type: "block" },
      { label: "I grab a wrench and challenge him to a dance-off.", nextId: "ship_dance", type: "accept" },
    ],
  },
  ship_dance: {
    text: "The gremlin accepts! He does a moonwalk. It's shockingly good.",
    options: [
      { label: "I refuse to dance with aliens.", nextId: "fail_bigot", type: "block" },
      { label: "I counter with the Robot, and he explodes from joy.", nextId: "end_success_ship", type: "accept" },
    ],
  },
  end_success_ship: {
    text: "You saved the ship with your sick moves. The AI apologizes and gives you extra oxygen.",
    options: [],
    isEnd: true,
  },

  // --- GENERIC FAILS ---
  fail_ignore: {
    text: "The story ends. You ignored the offer. Spontaneity dies when we block.",
    options: [],
    isEnd: true,
  },
  fail_boring: {
    text: "The scene fizzles out. You chose logic over magic. The audience falls asleep.",
    options: [],
    isEnd: true,
  },
  fail_chicken: {
    text: "You ran away from the adventure. The story ends right there.",
    options: [],
    isEnd: true,
  },
  fail_rude: {
    text: "Blocking isn't just saying no; it's shutting down the flow. The wizard cries.",
    options: [],
    isEnd: true,
  },
  fail_karen: {
    text: "While you were filling out forms, the ship exploded. Game over.",
    options: [],
    isEnd: true,
  },
  fail_passive: {
    text: "In improv, you must ACT. Waiting killed the scene (and the crew).",
    options: [],
    isEnd: true,
  },
  fail_bigot: {
    text: "You judged the gremlin instead of playing with him. The scene ended awkwardly.",
    options: [],
    isEnd: true,
  },
};

const START_NODES = ["start_orb", "start_coffee", "start_ship"];

export default function YesAndGame() {
  const [currentNodeId, setCurrentNodeId] = useState<string>("start_orb");
  const [history, setHistory] = useState<{ text: string; type: "narrator" | "user" | "block" }[]>([]);
  const { isListening, transcript, startListening, stopListening, isSupported } = useSpeechRecognition();
  
  // Initialize with a random scenario only on mount
  useEffect(() => {
    const randomStart = START_NODES[Math.floor(Math.random() * START_NODES.length)];
    setCurrentNodeId(randomStart);
  }, []);

  const node = STORY_DATA[currentNodeId];
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of history
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, node]);

  const handleOption = useCallback((nextId: string | null, type: "block" | "accept", text: string) => {
    if (type === "block") {
      setHistory(prev => [...prev, { text: `> ${text}`, type: "block" }]);
    } else {
      setHistory(prev => [...prev, { text: `> ${text}`, type: "user" }]);
    }
    
    // Tiny delay for dramatic effect before showing result
    setTimeout(() => {
      if (nextId && STORY_DATA[nextId]) {
        setCurrentNodeId(nextId);
      } else {
        // Fallback if ID invalid, though our data should be good
        setCurrentNodeId("fail_ignore");
      }
    }, 400);
  }, []);

  // Voice Logic
  useEffect(() => {
    if (!isListening) return;
    
    // Normalize text
    const text = transcript.toLowerCase().trim();
    if (!text) return;

    // Check for "Yes" keywords for acceptance
    // We look for "yes" AND user not saying "no" immediately after (simple heuristic)
    const isYes = text.startsWith("yes") || text.includes(" yes ");
    const isNo = text.startsWith("no") || text.includes(" i put it back") || text.includes(" i ignore") || text.includes(" return it");

    if (isYes && !isNo) {
      const acceptOpt = node.options.find(o => o.type === "accept");
      if (acceptOpt) {
        // Debounce slightly so we don't trigger on partial phrases if user corrects themselves? 
        // Actually, speed is key. Let's trigger.
        stopListening();
        handleOption(acceptOpt.nextId, acceptOpt.type, `${acceptOpt.label} (Voice)`);
      }
    } else if (isNo) { 
       const blockOpt = node.options.find(o => o.type === "block");
       if (blockOpt) {
         stopListening();
         handleOption(blockOpt.nextId, blockOpt.type, `${blockOpt.label} (Voice)`);
       }
    }
  }, [transcript, isListening, node, stopListening, handleOption]);

  const reset = () => {
    const randomStart = START_NODES[Math.floor(Math.random() * START_NODES.length)];
    setCurrentNodeId(randomStart);
    setHistory([]);
  };

  return (
    <div className="bg-zinc-900 border border-white/10 p-8 rounded-xl max-w-3xl mx-auto shadow-2xl relative overflow-hidden">


      <div className="text-center mb-8 relative z-10">
        <h3 className="text-2xl font-bold mb-2 text-white">
            The &quot;Yes, And&quot; Machine
        </h3>
        <p className="text-zinc-400 text-sm">Say <strong>&quot;Yes...&quot;</strong> to accept the offer and advance the story.</p>
        
        {isSupported && (
          <div className="mt-6 flex justify-center">
            <button 
                onClick={isListening ? stopListening : startListening}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    isListening 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                    : 'bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700 hover:text-white'
                }`}
            >
                {isListening ? (
                    <>
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"/>
                        Listening...
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                        Enable Voice
                    </>
                )}
            </button>
          </div>
        )}
      </div>

      <div 
        ref={scrollRef}
        className="space-y-4 mb-8 h-80 overflow-y-auto p-6 bg-black/40 rounded-lg border border-white/5 scroll-smooth relative z-10 shadow-inner"
      >
        {history.length === 0 && <p className="text-zinc-500 text-center italic mt-20">The scene begins...</p>}
        
        {history.map((line, i) => (
          <div key={i} className={`animate-in slide-in-from-bottom-2 fade-in duration-300 ${
              line.type === "block" ? "text-red-500 font-bold" : 
              line.type === "user" ? "text-zinc-300 italic" : "text-zinc-400"
          }`}>
             {line.text}
          </div>
        ))}

        {/* Current Node Text */}
        {!node.isEnd && (
            <div className="mt-6 p-4 bg-white/5 rounded border-l-4 border-zinc-500 animate-in fade-in zoom-in-95 duration-500">
                <p className="text-lg text-white font-serif leading-relaxed">{node.text}</p>
            </div>
        )}

        {/* End State Message */}
        {node.isEnd && (
             <div className="mt-6 text-center animate-in zoom-in duration-500">
                 <p className={`text-xl font-bold mb-2 ${currentNodeId.includes('fail') ? 'text-red-500' : 'text-zinc-100'}`}>
                     {node.text}
                 </p>
             </div>
        )}
        
        {isListening && transcript && (
             <p className="text-xs text-zinc-500 font-mono mt-2 animate-pulse">&gt; {transcript}...</p>
        )}
      </div>

      <div className="relative z-10 min-h-[120px]">
        {node.options.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
            {node.options.map((opt, i) => (
                <button
                key={i}
                onClick={() => handleOption(opt.nextId, opt.type, opt.label)}
                className="group relative w-full py-4 px-6 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/50 rounded-lg text-left transition-all duration-200"
                >
                    <span className="relative z-10 flex items-center justify-between">
                        <span className="text-zinc-200 group-hover:text-white">{opt.label}</span>
                        <span className="text-xs text-zinc-500 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                            {opt.type === 'accept' ? 'Yes, And...' : 'Block'}
                        </span>
                    </span>
                </button>
            ))}
            </div>
        ) : (
            <div className="text-center pt-2">
            <button
                onClick={reset}
                className="px-8 py-3 bg-red-600 text-white font-bold uppercase tracking-widest hover:bg-red-700 hover:scale-105 transition-all rounded shadow-lg shadow-red-900/20"
            >
                Play Again
            </button>
            </div>
        )}
      </div>
    </div>
  );
}
