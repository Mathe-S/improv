"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { getRandomItem } from "@/data/toolboxData";

const starterWords = [
  "We", "The", "Suddenly", "Yesterday", "When", "Dear", "Why", "Are", "Giant", "Once"
];

const prompts = [
  "Write a letter to a relative.",
  "Tell a story starting with 'We'.",
  "Write an action-packed thriller.",
  "Compose a philosophical thought.",
  "Create a strange recipe.",
];

export default function WordAtATimeGamePage() {
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [prompt, setPrompt] = useState(prompts[0]);
  const inputRef = useRef<HTMLInputElement>(null);
  const wordsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom of words list when a new word is added
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

  const handleAddRandomStarter = () => {
    setWords((prev) => [...prev, getRandomItem(starterWords)]);
    inputRef.current?.focus();
  };

  const clearStory = () => {
    setWords([]);
    setCurrentWord("");
    inputRef.current?.focus();
  };

  const downloadStory = () => {
    if (words.length === 0) return;
    const story = words.join(" ");
    const blob = new Blob([story], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "word-at-a-time-story.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6 max-w-5xl mx-auto flex flex-col">
      <Link href="/games" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors shrink-0">
        ← Back to Games
      </Link>

      <div className="text-center mb-12 shrink-0">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase">
          Word at a Time
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Surrender control. Add exactly one word. Do not plan the next one. Let the story write itself.
        </p>
      </div>

      <div className="flex-1 grid md:grid-cols-3 gap-8 min-h-0">
        {/* Constraints & Prompts Column */}
        <div className="md:col-span-1 space-y-6 flex flex-col shrink-0">
          <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 shadow-lg">
            <h2 className="text-lg font-bold text-accent-red uppercase tracking-widest mb-4">
              Current Prompt
            </h2>
            <p className="text-xl font-medium text-white mb-6 italic">"{prompt}"</p>
            <button
              onClick={() => setPrompt(getRandomItem(prompts))}
              className="text-xs text-accent-red font-bold uppercase tracking-widest hover:text-white transition-colors"
            >
              → Shuffle Prompt
            </button>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 shadow-lg flex-1">
            <h2 className="text-lg font-bold text-white uppercase tracking-widest mb-4">
              The Rules
            </h2>
            <div className="text-zinc-400 text-sm space-y-3">
              <p>• Speak/Type <strong className="text-white">one word</strong> at a time.</p>
              <p>• Spacebar or Enter submits the word.</p>
              <p>• Avoid punctuation until absolutely necessary.</p>
              <p>• <strong className="text-accent-red">No planning!</strong> If you try to control the story's direction, you will freeze.</p>
              <p>• Be obvious, be boring, and watch the story naturally become insane.</p>
            </div>
            
            <div className="mt-8 space-y-3">
               <button
                  onClick={handleAddRandomStarter}
                  className="w-full py-3 bg-white/5 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/10"
                >
                  Give Me A Starter Word
                </button>
                <button
                  onClick={downloadStory}
                  disabled={words.length === 0}
                  className="w-full py-3 bg-accent-red/10 text-accent-red font-bold text-xs uppercase tracking-widest hover:bg-accent-red hover:text-white transition-colors border border-accent-red/30 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ↓ Download Story
                </button>
                <button
                  onClick={clearStory}
                  className="w-full py-3 bg-transparent text-zinc-500 font-bold text-xs uppercase tracking-widest hover:text-accent-red transition-colors border border-zinc-800 hover:border-accent-red/50"
                >
                  Clear Story
                </button>
            </div>
          </div>
        </div>

        {/* Story Visualizer Column */}
        <div className="md:col-span-2 bg-zinc-900 border border-white/10 rounded-sm p-6 md:p-8 flex flex-col shadow-lg relative min-h-[500px]">
          
          {/* Story Display */}
          <div className="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar">
            {words.length === 0 ? (
              <div className="h-full flex items-center justify-center text-zinc-600 italic text-xl">
                The story begins in the void...
              </div>
            ) : (
              <div className="flex flex-wrap content-start gap-2 text-2xl md:text-3xl font-medium leading-relaxed">
                {words.map((word, index) => (
                  <span 
                    key={index} 
                    className="animate-in fade-in zoom-in-95 duration-200 text-white bg-white/5 px-2 py-1 rounded-sm border border-white/10 shadow-sm"
                  >
                    {word}
                  </span>
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
                // Prevent spaces from ever existing in the input string
                const val = e.target.value.replace(/\s/g, '');
                setCurrentWord(val);
              }}
              onKeyDown={handleKeyDown}
              className="w-full bg-black border-2 border-white/20 focus:border-accent-red text-2xl md:text-4xl text-white font-bold py-6 px-6 focus:outline-none rounded-sm transition-colors"
              placeholder="Type one word..."
              autoComplete="off"
              autoFocus
            />
            <p className="text-zinc-500 text-xs mt-3 text-center uppercase tracking-widest">
              Press <span className="text-white font-bold">Space</span> or <span className="text-white font-bold">Enter</span> to commit word. Use Backspace to delete.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
