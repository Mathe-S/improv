"use client";

import { useEffect, useState } from "react";

export default function MasksChapter() {
  const [tranceMode, setTranceMode] = useState(false);

  useEffect(() => {
    if (tranceMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [tranceMode]);

  return (
    <div className={`min-h-screen pt-32 px-8 ${tranceMode ? 'z-50 fixed inset-0 bg-black pt-0 px-0 flex items-center justify-center' : 'max-w-4xl mx-auto'}`}>
      
      {!tranceMode && (
        <>
          {/* Header */}
          <header className="mb-20 text-center">
            <span className="text-sm font-mono text-accent-red tracking-widest uppercase mb-4 block">Chapter 4</span>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 text-spotlight tracking-tighter">MASKS</h1>
            <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
              "The mask is a device for driving the personality out of the body."
            </p>
          </header>

          {/* Content Block */}
          <section className="prose prose-invert prose-lg max-w-none mb-24">
            <p>
              In mask work, you do not "play" a character. You let the mask play <strong>you</strong>. 
              It requires a state of trance, where the conscious self steps aside.
            </p>
            <p>
              We cannot give you a physical mask through a screen, but we can help you reach the state of mind required to wear one.
            </p>
          </section>

          {/* Interaction Prompt */}
          <section className="border-t border-white/10 pt-16 mb-32">
            <div className="bg-gradient-to-b from-black to-zinc-900 border border-white/10 p-16 rounded-sm text-center">
              <h2 className="text-3xl font-bold mb-6">Enter Trance</h2>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                This visual exercise uses rhythmic pulsing and focus to clear the mind. Best experienced in a dark room.
              </p>
              <button 
                onClick={() => setTranceMode(true)}
                className="px-12 py-4 bg-white text-black font-bold tracking-[0.2em] hover:scale-105 transition-transform duration-500"
              >
                BEGIN
              </button>
            </div>
          </section>
        </>
      )}

      {/* Trance Overlay */}
      {tranceMode && (
        <div className="w-full h-full relative cursor-none" onClick={() => setTranceMode(false)}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-96 bg-white rounded-[50%] animate-pulse blur-3xl opacity-20" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-72 border border-white/20 rounded-[40%] bg-black flex items-center justify-center animate-bounce duration-[3000ms]">
               <div className="w-full text-center space-y-12">
                 <div className="w-24 h-2 bg-white/10 mx-auto rounded-full" />
                 <div className="w-12 h-12 border-2 border-white/10 rounded-full mx-auto" />
               </div>
            </div>
          </div>
          <div className="absolute bottom-12 w-full text-center text-zinc-600 text-xs tracking-widest uppercase animate-pulse">
            Click anywhere to wake up
          </div>
        </div>
      )}
    </div>
  );
}
