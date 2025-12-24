"use client";

import { useState, useCallback } from "react";

interface GeneratorCardProps {
  title: string;
  items: string[];
  accentColor?: string;
  showHistory?: boolean;
}

export default function GeneratorCard({
  title,
  items,
  accentColor = "accent-red",
  showHistory = true,
}: GeneratorCardProps) {
  const [currentItem, setCurrentItem] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);

  const generate = useCallback(() => {
    setIsFlipping(true);
    
    // Shuffle effect - rapid changes
    let shuffleCount = 0;
    const shuffleInterval = setInterval(() => {
      const random = items[Math.floor(Math.random() * items.length)];
      setCurrentItem(random);
      shuffleCount++;
      
      if (shuffleCount >= 8) {
        clearInterval(shuffleInterval);
        
        // Final selection
        const finalItem = items[Math.floor(Math.random() * items.length)];
        setCurrentItem(finalItem);
        setIsFlipping(false);
        
        // Add to history (keep last 3, avoid duplicates at top)
        setHistory((prev) => {
          if (prev[0] === finalItem) return prev;
          return [finalItem, ...prev].slice(0, 3);
        });
      }
    }, 50);
    
  }, [items]);

  return (
    <div className="group relative">
      {/* Card Container */}
      <div
        className={`
          relative bg-white/5 border border-white/10 p-6 rounded-sm
          hover:border-${accentColor}/50 transition-all duration-300
          ${isFlipping ? "animate-pulse" : ""}
        `}
        style={{
          boxShadow: isFlipping
            ? `0 0 30px rgba(210, 43, 43, 0.3)`
            : undefined,
        }}
      >
        {/* Title */}
        <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-zinc-300">
          {title}
        </h3>

        {/* Display Area */}
        <div
          className={`
            relative h-28 flex items-center justify-center 
            bg-black/60 border border-white/5 mb-4 rounded-sm
            overflow-hidden
            ${isFlipping ? "border-accent-red/30" : ""}
          `}
        >
          {/* Glow effect when flipping */}
          {isFlipping && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-red/10 to-transparent animate-pulse" />
          )}
          
          <p
            className={`
              text-lg font-serif text-white text-center px-4
              transition-all duration-150
              ${isFlipping ? "scale-95 opacity-80" : "scale-100 opacity-100"}
              ${currentItem ? "" : "text-zinc-500 text-sm uppercase tracking-widest"}
            `}
          >
            {currentItem || "Click to Generate"}
          </p>
        </div>

        {/* Generate Button */}
        <button
          onClick={generate}
          disabled={isFlipping}
          className={`
            w-full py-3 font-bold uppercase tracking-widest text-sm
            transition-all duration-300
            ${isFlipping
              ? "bg-accent-red/50 text-white cursor-wait"
              : "bg-white text-black hover:bg-accent-red hover:text-white"
            }
          `}
        >
          {isFlipping ? "..." : "Generate"}
        </button>

        {/* History */}
        {showHistory && history.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-xs uppercase tracking-widest text-zinc-600 mb-2">
              Recent
            </p>
            <ul className="space-y-1">
              {history.slice(1).map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="text-xs text-zinc-500 truncate"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Spotlight hover effect */}
      <div
        className={`
          absolute -inset-px rounded-sm opacity-0 group-hover:opacity-100 
          transition-opacity duration-500 pointer-events-none
          bg-gradient-to-r from-transparent via-accent-red/5 to-transparent
        `}
      />
    </div>
  );
}
