"use client";

import { useState, useEffect, useRef } from "react";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";

const INITIAL_TIME = 3000; // 3 seconds to speak

export default function WordAssociation() {
  
  const [words, setWords] = useState<string[]>([]);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [lastWordTime, setLastWordTime] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [gameOverReason, setGameOverReason] = useState<"time" | "duplicate" | "error">("time");
  
  // Track valid words set for O(1) lookups
  const wordsSet = useRef<Set<string>>(new Set());
  
  // Ref to access startListening inside callback (circular dependency resolution)
  const startListeningRef = useRef<() => void>(() => {});

  // Handle detected word immediately via callback
  // Handle detected word immediately via callback
  // User reverted hook to not support callback, so we restore useEffect logic.
  
  const { isListening, transcript, startListening, stopListening, isSupported, error } = useSpeechRecognition();

  // Sync startListening to ref to avoid circular dependency in useEffect if needed, 
  // but actually we can just use the function directly if dependency handling is clean.
  // We'll keep the ref pattern for now to minimize churn.
  useEffect(() => {
    startListeningRef.current = startListening;
  }, [startListening]);

  useEffect(() => {
      // Logic only runs if playing and JUST stopped listening
      if (gameState === "playing" && !isListening) {
          const finalWord = transcript.trim().toLowerCase();
          
          if (finalWord && finalWord.length > 1) {
             if (wordsSet.current.has(finalWord)) {
                setTimeout(() => {
                    setGameState("gameover");
                    setGameOverReason("duplicate");
                }, 0);
                return;
             }
    
             setWords(prev => [...prev, finalWord]);
             wordsSet.current.add(finalWord);
             setScore(s => s + 1);
             setLastWordTime(Date.now());
             
             // Restart loop
             startListeningRef.current();
           } else {
              // Noise/Silence - restart
              startListeningRef.current();
           }
      }
  }, [isListening, gameState, transcript]);

  // Track latest transcript in ref to access it reliably in effects
  const transcriptRef = useRef("");
  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  // Force re-render for smooth progress bar
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameState === "playing" && isListening) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = now - lastWordTime;
        setCurrentTime(now); // Update state for render
        if (elapsed > INITIAL_TIME) {
           // Timer finished. Check if we have a pending word ("Buzz-beater")
           const pendingWord = transcriptRef.current.trim().toLowerCase();
           if (pendingWord && pendingWord.length > 1) {
               // We have a word! Check if it is valid.
               if (wordsSet.current.has(pendingWord)) {
                   setGameState("gameover");
                   setGameOverReason("duplicate");
                   stopListening();
               } else {
                   // Valid word, save it!
                   setWords(prev => [...prev, pendingWord]);
                   wordsSet.current.add(pendingWord);
                   setScore(s => s + 1);
                   setLastWordTime(now);
                   // Restart listening to clear transcript and continue
                   startListeningRef.current();
               }
           } else {
              setGameState("gameover");
              setGameOverReason("time");
              stopListening();
           }
        }
      }, 50);
    } else if (gameState === "playing" && !isListening) {
       // If not listening (processing?) pause timer or keep it?
       // Actually we usually just want it to keep burning? 
       // If we are processing, maybe give a grace period? as is, this "resets" timer.
       // But with the new flow, isListening only flickers false briefly.
       setTimeout(() => {
          setLastWordTime(Date.now());
          setCurrentTime(Date.now());
       }, 0);
    }
    return () => clearInterval(interval);
  }, [gameState, lastWordTime, stopListening, isListening]);

  const startGame = () => {
    setWords([]);
    wordsSet.current.clear();
    setScore(0);
    setGameState("playing");
    setLastWordTime(Date.now());
    startListening();
  };

  if (!isSupported || error) {
     // ... (Keep existing fallback) ...
     /* NOTE: Assuming the fallback code is below and unchanged, 
        but since I am replacing logic blocks, I need to be careful with layout. 
        I will just return the main render here. 
     */
     return (
      <div className="bg-zinc-900 border border-white/10 p-8 rounded-sm max-w-2xl mx-auto text-center">
         <h3 className="text-xl font-bold mb-2 text-white">Voice Feature Unavailable</h3>
         <p className="text-red-500 mb-4">{error || "Browser not supported"}</p>
         <p className="text-zinc-500 text-sm">
            Note: Chrome&apos;s Web Speech API requires access to Google&apos;s servers. 
            If you are seeing &quot;Network Error&quot;, it is likely a firewall or ISP issue blocking the connection to &apos;speech-service.google.com&apos;.
         </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-white/10 p-8 rounded-sm max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Voice Word Association</h3>
        <p className="text-zinc-400">Speak a new word before the bar runs out. Any word. Don&apos;t think.</p>
        <p className="text-xs text-zinc-600 mt-2">Requires Microphone Access</p>
      </div>

      <div className="min-h-[200px] relative flex flex-col items-center justify-center bg-black/50 border border-white/5 rounded-sm mb-8 overflow-hidden">
        {gameState === "idle" && (
          <button 
            onClick={startGame}
            className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Start Game
          </button>
        )}

        {gameState === "playing" && (
          <>
             {/* Timer Bar - Now Absolutely Positioned at Top */}
             <div className="absolute top-0 left-0 w-full h-2 bg-zinc-800 z-10">
                <div 
                  className={`absolute top-0 left-0 h-full transition-all duration-100 ease-linear ${((100 - ((currentTime - lastWordTime) / INITIAL_TIME) * 100) < 30) ? 'animate-burn bg-orange-500' : 'bg-accent-red'}`} 
                  style={{ width: `${Math.max(0, 100 - ((currentTime - lastWordTime) / INITIAL_TIME) * 100)}%` }} 
                >
                   {/* Spark at the tip */}
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-yellow-300 rounded-full blur-[2px] animate-ping opacity-75" />
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-white rounded-full blur-[1px]" />
                </div>
             </div>
             
             <div className="mt-8 relative z-10">
                <div className="mb-8 min-h-[4rem]">
                   {words.length > 0 ? (
                       <h4 className="text-5xl font-black text-white drop-shadow-lg animate-in zoom-in duration-300">
                          {words[words.length - 1].toUpperCase()}
                       </h4>
                   ) : (
                       <h4 className="text-zinc-500 text-xl animate-pulse">Start speaking...</h4>
                   )}
                </div>

                <div className="text-zinc-400 text-sm mb-2 uppercase tracking-widest">
                   {isListening ? "Listening..." : "Processing"}
                </div>
                
                {transcript && (
                  <p className="text-2xl text-zinc-300 italic min-h-[2rem] opacity-80">
                    &quot;{transcript}&quot;
                  </p>
                )}
             </div>
             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </>
        )}

        {gameState === "gameover" && (
          <div className="space-y-4 animate-in zoom-in">
            <h4 className="text-3xl font-bold text-accent-red">
               {gameOverReason === "duplicate" ? "DUPLICATE WORD!" : "TIME UP!"}
            </h4>
            <p className="text-zinc-400">
               {gameOverReason === "duplicate" 
                  ? "You said that already. Originality checks only." 
                  : "The Censor stopped you."}
            </p>
            <p className="text-xl">Score: {score} words</p>
            <button 
              onClick={startGame}
              className="px-6 py-2 border border-white/20 hover:bg-white/10"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
      
      {words.length > 0 && (
         <div className="flex flex-wrap gap-2 justify-center opacity-50">
           {words.map((w, i) => (
             <span key={i} className="px-2 py-1 bg-white/10 rounded">{w}</span>
           ))}
         </div>
      )}
    </div>
  );
}
