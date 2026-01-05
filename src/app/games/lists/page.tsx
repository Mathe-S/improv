"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const GAME_DURATION = 60000; // 60 seconds total ? Or maybe per word?
// The prompt says "start by naming a list of objects as fast as you can".
// It also says "I'll try typing out some nonsense as fast as I can".
// It implies a continuous stream.
// Let's make it a free-flow typing input where hitting Enter submits the word.
// And we measure speed or just encourage it.
// The "Burning Fuse" from Word Association is good for "per word" pressure.
// Let's use a "Per Word" timer that resets on Enter to force speed.
const WORD_TIME_LIMIT = 5000; // 5 seconds per word initially? Or faster?

export default function ListsGamePage() {
  const [words, setWords] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [mode, setMode] = useState<"associative" | "non-associative">("non-associative");
  const [lastWordTime, setLastWordTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0); // for visual update
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === "playing") {
      interval = setInterval(() => {
        const now = Date.now();
        setCurrentTime(now);
        if (now - lastWordTime > WORD_TIME_LIMIT) {
          setGameState("gameover");
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [gameState, lastWordTime]);

  const startGame = () => {
    setWords([]);
    setCurrentInput("");
    setGameState("playing");
    const now = Date.now();
    setLastWordTime(now);
    setCurrentTime(now);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const submitWord = () => {
    if (!currentInput.trim()) return;
    setWords(prev => [...prev, currentInput.trim()]);
    setCurrentInput("");
    setLastWordTime(Date.now());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitWord();
    }
  };

  const timeLeftPct = Math.max(0, 100 - ((currentTime - lastWordTime) / WORD_TIME_LIMIT) * 100);

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-6 max-w-4xl mx-auto">
      <Link href="/games" className="text-zinc-500 hover:text-white mb-8 inline-block transition-colors">
        ← Back to Games
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
          LISTS
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          Bypass your internal censor. Speed is your only weapon.
        </p>
      </div>

      <div className="bg-zinc-900 border border-white/10 rounded-sm p-8 md:p-12 relative overflow-hidden">
        
        {/* Visual Timer Bar (Top) */}
        {gameState === "playing" && (
            <div className="absolute top-0 left-0 w-full h-2 bg-zinc-800">
            <div 
                className={`h-full transition-all duration-100 ease-linear ${timeLeftPct < 30 ? 'bg-red-500' : 'bg-white'}`}
                style={{ width: `${timeLeftPct}%` }}
            />
            </div>
        )}

        {gameState === "idle" && (
          <div className="text-center space-y-8">
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div 
                className={`p-6 border rounded-sm cursor-pointer transition-all ${mode === "associative" ? "border-white bg-white/10" : "border-white/10 hover:border-white/30"}`}
                onClick={() => setMode("associative")}
              >
                <h3 className="font-bold text-white mb-2">Associative</h3>
                <p className="text-zinc-400 text-sm">Rational jumps. Logical connections.</p>
                <p className="text-zinc-500 text-xs mt-2 italic">"Dog, Cat, Milk, Saucer"</p>
              </div>
              <div 
                className={`p-6 border rounded-sm cursor-pointer transition-all ${mode === "non-associative" ? "border-accent-red bg-accent-red/10" : "border-white/10 hover:border-white/30"}`}
                onClick={() => setMode("non-associative")}
              >
                <h3 className="font-bold text-white mb-2">Non-Associative</h3>
                <p className="text-zinc-400 text-sm">Random jumps. Clearing the garbage.</p>
                <p className="text-zinc-500 text-xs mt-2 italic">"Duck, Rhomboid, Platypus"</p>
              </div>
            </div>

            <button 
              onClick={startGame}
              className="px-12 py-4 bg-white text-black font-black text-xl uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Start Typing
            </button>
            <p className="text-zinc-500 text-sm">Don't stop. Don't think.</p>
          </div>
        )}

        {gameState === "playing" && (
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-12">
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-b-4 border-white text-4xl md:text-5xl font-bold py-4 focus:outline-none focus:border-accent-red text-center text-white placeholder-white/20"
                placeholder="Type here..."
                autoComplete="off"
                autoFocus
              />
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {words.slice().reverse().map((word, i) => (
                <span key={i} className="text-xl text-zinc-500 animate-in zoom-in fade-in slide-in-from-bottom-4 duration-300">
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}

        {gameState === "gameover" && (
          <div className="text-center animate-in zoom-in duration-300">
            <h2 className="text-4xl font-black text-accent-red mb-4">CENSORED!</h2>
            <p className="text-xl text-white mb-8">
              You hesitated. The censor caught you.
            </p>
            
            <div className="mb-8">
               <p className="text-zinc-500 uppercase tracking-widest mb-2">Your List ({words.length})</p>
               <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto p-4 bg-black/20 rounded-sm">
                 {words.map((w, i) => (
                   <span key={i} className="text-zinc-300">{w}{i < words.length - 1 ? "," : ""}</span>
                 ))}
               </div>
            </div>

            <button 
              onClick={startGame}
              className="px-8 py-3 border border-white/20 text-white font-bold hover:bg-white hover:text-black transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
