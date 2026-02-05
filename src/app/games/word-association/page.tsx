"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { getRandomItem } from "@/data/toolboxData";
import { ArrowRight, RotateCcw } from "lucide-react";

const starterWords = [
  "Apple", "Ocean", "Night", "Running", "Metal", "Whisper", "Giant", "Yellow", 
  "Telephone", "Mountain", "Glass", "Train", "Spoon", "Shadow", "Plastic"
];

export default function WordAssociationGamePage() {
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const wordsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wordsEndRef.current) {
      wordsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [words]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const trimmed = currentWord.trim();
      if (trimmed) {
        setWords((prev) => [...prev, trimmed]);
        setCurrentWord("");
      }
    } else if (e.key === "Backspace" && currentWord === "") {
      e.preventDefault();
      setWords((prev) => prev.slice(0, -1));
    }
  };

  const startNewChain = () => {
    setWords([getRandomItem(starterWords)]);
    setCurrentWord("");
    inputRef.current?.focus();
  };

  const clearChain = () => {
    setWords([]);
    setCurrentWord("");
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6 max-w-5xl mx-auto flex flex-col">
      <Link href="/games" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors shrink-0">
        ← Back to Games
      </Link>

      <div className="text-center mb-12 shrink-0">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase">
          Word Association
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Unlock spontaneity through rapid-fire connections. No hesitation, no overthinking.
        </p>
      </div>

      <div className="flex-1 grid md:grid-cols-3 gap-8 min-h-0">
        {/* Rules & Controls Sidebar */}
        <div className="md:col-span-1 space-y-6 flex flex-col shrink-0">
          <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 shadow-lg">
            <h2 className="text-lg font-bold text-white uppercase tracking-widest mb-4">
              How To Play
            </h2>
            <div className="text-zinc-400 text-sm space-y-4">
              <p>• Speak or type the very <strong className="text-white">first word</strong> that comes to your mind.</p>
              <p>• Only associate with the <strong className="text-accent-red">immediately preceding word</strong>. Do not relate back to the original theme.</p>
              <p>• <strong className="text-white">Speed is key.</strong> If you hesitate, you are censoring yourself.</p>
              <p>• Press <strong className="text-white">Space</strong> or <strong className="text-white">Enter</strong> to submit your word.</p>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 shadow-lg flex-1">
            <h2 className="text-lg font-bold text-accent-red uppercase tracking-widest mb-4">
              Controls
            </h2>
            <div className="space-y-3">
               <button
                  onClick={startNewChain}
                  className="w-full py-3 bg-white/5 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/10"
                >
                  Give Me A Starter Word
                </button>
                <button
                  onClick={clearChain}
                  className="w-full py-3 bg-transparent text-zinc-500 font-bold text-xs uppercase tracking-widest hover:text-accent-red transition-colors border border-zinc-800 hover:border-accent-red/50 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Clear Chain
                </button>
            </div>
          </div>
        </div>

        {/* Association Chain Visualizer */}
        <div className="md:col-span-2 bg-zinc-900 border border-white/10 rounded-sm p-6 md:p-8 flex flex-col shadow-lg relative min-h-[500px]">
          
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4 shrink-0">
             <h2 className="text-lg font-bold text-white uppercase tracking-widest">
                The Chain
             </h2>
             <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
                {words.length} Links
             </span>
          </div>

          {/* Chain Display */}
          <div className="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar">
            {words.length === 0 ? (
              <div className="h-full flex items-center justify-center text-zinc-600 italic text-xl">
                Ready to begin... type a word.
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-y-4 text-2xl md:text-3xl font-medium leading-relaxed">
                {words.map((word, index) => (
                  <div key={index} className="flex items-center animate-in fade-in zoom-in-95 duration-200">
                    <span 
                      className={`px-3 py-1 rounded-sm shadow-sm transition-colors ${
                        index === words.length - 1 
                        ? "text-white bg-accent-red/20 border border-accent-red/30" 
                        : "text-zinc-300 bg-white/5 border border-white/10"
                      }`}
                    >
                      {word}
                    </span>
                    {index < words.length - 1 && (
                      <ArrowRight className="w-6 h-6 text-zinc-700 mx-2" />
                    )}
                  </div>
                ))}
                <div ref={wordsEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="mt-auto shrink-0 relative">
            <div className="absolute -top-3 left-4 bg-zinc-900 px-2 text-[10px] uppercase tracking-widest text-accent-red font-bold z-10">
              Your Turn
            </div>
            <input
              ref={inputRef}
              type="text"
              value={currentWord}
              onChange={(e) => {
                const val = e.target.value.replace(/\s/g, ''); // no spaces allowed
                setCurrentWord(val);
              }}
              onKeyDown={handleKeyDown}
              className="w-full bg-black border-2 border-white/20 focus:border-accent-red text-2xl md:text-4xl text-white font-bold py-6 px-6 focus:outline-none rounded-sm transition-colors"
              placeholder="Type your association..."
              autoComplete="off"
              autoFocus
            />
          </div>

        </div>
      </div>
    </div>
  );
}
