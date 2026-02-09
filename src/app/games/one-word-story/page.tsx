"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { getRandomItem } from "@/data/toolboxData";
import { Download, RotateCcw } from "lucide-react";

const starterWords = [
  "Once", "There", "A", "Long", "The", "My", "In", "We", "Nobody", "Everyone", "Because"
];

const storyPrompts = [
  "A story about a disastrous camping trip.",
  "A tale of the world's worst superhero.",
  "An epic journey to find the perfect sandwich.",
  "A mystery involving a missing left shoe.",
  "A romance between two rival chefs.",
  "A sci-fi adventure on a planet made of jelly.",
];

export default function OneWordStoryPage() {
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [prompt, setPrompt] = useState(storyPrompts[0]);
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
         // Allow punctuation formatting (e.g. if they want to add a period, it attaches to the previous word)
        if (["!", ".", "?", ",", ";", ":"].includes(trimmed) && words.length > 0) {
           const newWords = [...words];
           newWords[newWords.length - 1] += trimmed;
           setWords(newWords);
        } else {
           setWords((prev) => [...prev, trimmed]);
        }
        setCurrentWord("");
      }
    } else if (e.key === "Backspace" && currentWord === "") {
      e.preventDefault();
      setWords((prev) => prev.slice(0, -1));
    }
  };

  const startNewStory = () => {
    setWords([getRandomItem(starterWords)]);
    setCurrentWord("");
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
    a.download = "one-word-story.txt";
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
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase relative inline-block">
          One Word Story
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Sit in a circle. Each person adds exactly one word to build a cohesive narrative.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 mb-8 flex-1">
        
        {/* Main Story Board */}
        <div className="lg:col-span-8 border bg-zinc-900 border-white/10 rounded-sm p-6 md:p-8 flex flex-col shadow-lg">
          
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4 shrink-0">
             <h2 className="text-lg font-bold text-white uppercase tracking-widest">
                The Manuscript
             </h2>
             <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
                {words.length} Words
             </span>
          </div>

          <div className="flex-1 overflow-y-auto mb-6 pr-4 custom-scrollbar">
            {words.length === 0 ? (
               <div className="h-full flex items-center justify-center text-zinc-600 italic text-xl">
                 Awaiting the first word...
               </div>
            ) : (
               <div className="text-2xl md:text-3xl font-medium leading-relaxed text-zinc-200">
                 {words.map((word, index) => (
                   <span key={index} className="animate-in fade-in duration-300">
                      {word}{" "}
                   </span>
                 ))}
                 <div ref={wordsEndRef} />
               </div>
            )}
          </div>

          {/* Input Area */}
          <div className="mt-auto shrink-0 relative pt-4 border-t border-white/10">
             <div className="absolute top-0 left-4 -translate-y-1/2 bg-zinc-900 px-2 text-[10px] uppercase tracking-widest text-accent-red font-bold z-10">
                Next Word
             </div>
             <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={currentWord}
                  onChange={(e) => {
                     // No spaces allowed in a single word input
                     const val = e.target.value.replace(/\s/g, ''); 
                     setCurrentWord(val);
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-black border-2 border-white/20 focus:border-accent-red text-xl text-white font-bold py-4 px-6 focus:outline-none rounded-sm transition-colors"
                  placeholder="Type a word..."
                  autoComplete="off"
                  autoFocus
                />
             </div>
             <p className="text-zinc-500 text-xs mt-3 uppercase tracking-widest text-center">
               Press <span className="text-white font-bold">Space</span> or <span className="text-white font-bold">Enter</span> to submit. Punctuation (. , ?) attaches to the previous word.
             </p>
          </div>

        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          
          <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 shadow-lg">
             <h2 className="text-lg font-bold text-accent-red uppercase tracking-widest mb-4">
                Story Prompt
             </h2>
             <p className="text-lg font-medium text-white mb-6 italic min-h-[4rem]">
                "{prompt}"
             </p>
             <button
               onClick={() => setPrompt(getRandomItem(storyPrompts))}
               className="w-full py-3 bg-white/5 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center"
             >
               New Prompt
             </button>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 shadow-lg flex-1 flex flex-col">
             <h2 className="text-lg font-bold text-white uppercase tracking-widest mb-4">
                Controls
             </h2>
             <div className="space-y-3">
                <button
                  onClick={startNewStory}
                  className="w-full py-3 bg-white/5 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors border border-white/10"
                >
                  Random Starter Word
                </button>
                <button
                  onClick={clearStory}
                  className="w-full py-3 bg-transparent text-zinc-500 font-bold text-xs uppercase tracking-widest hover:text-accent-red transition-colors border border-zinc-800 hover:border-accent-red/50 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Clear Story
                </button>
             </div>

             <div className="mt-auto pt-6 border-t border-white/10">
                <button
                  onClick={downloadStory}
                  disabled={words.length === 0}
                  className="w-full py-4 bg-accent-red text-white font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download Story
                </button>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
