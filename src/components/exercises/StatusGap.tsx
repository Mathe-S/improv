"use client";

import { useState } from "react";

const SCENARIOS = [
  {
    line: "I'm so sorry to bother you, but could I possibly have a glass of water?",
    status: -8, // Very Low
    explanation: "Apologizing before making a simple request lowers status immediately.",
  },
  {
    line: "Bring me some water.",
    status: 8, // Very High
    explanation: "Direct commands with no mitigation maximize status.",
  },
  {
    line: "Do you know where the water is?",
    status: 0, // Neutral
    explanation: "A simple information question is usually neutral.",
  },
];

export default function StatusGap() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState(0); // -10 to 10
  const [submitted, setSubmitted] = useState(false);

  const currentScenario = SCENARIOS[currentIndex];

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleNext = () => {
    setSubmitted(false);
    setGuess(0);
    setCurrentIndex((prev) => (prev + 1) % SCENARIOS.length);
  };

  const getAccuracy = () => {
    const diff = Math.abs(currentScenario.status - guess);
    if (diff < 3) return "Spot On!";
    if (diff < 6) return "Close";
    return "Not quite";
  };

  return (
    <div className="bg-zinc-900 border border-white/10 p-8 rounded-sm max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold mb-2">Identify the Status</h3>
        <p className="text-zinc-400">Read the line. Is the speaker High or Low status?</p>
      </div>

      <div className="bg-black/50 p-8 rounded-sm mb-12 border border-white/5 min-h-[120px] flex items-center justify-center">
        <p className="text-2xl font-serif text-white italic">"{currentScenario.line}"</p>
      </div>

      <div className="mb-12 relative px-4">
        <div className="flex justify-between text-xs uppercase tracking-widest text-zinc-500 mb-4">
          <span>Low Status (-10)</span>
          <span>High Status (+10)</span>
        </div>
        
        <input
          type="range"
          min="-10"
          max="10"
          value={guess}
          onChange={(e) => setGuess(parseInt(e.target.value))}
          disabled={submitted}
          className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-accent-red"
        />
        
        <div className="mt-4 text-center font-mono text-accent-red font-bold">
          {guess > 0 ? `+${guess}` : guess}
        </div>
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
        >
          Check Status
        </button>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className={`p-4 mb-4 text-center border ${getAccuracy() === "Spot On!" ? "border-green-500/50 bg-green-500/10" : "border-yellow-500/50 bg-yellow-500/10"}`}>
            <h4 className="font-bold text-lg mb-2">{getAccuracy()}</h4>
            <p className="text-zinc-300">{currentScenario.explanation}</p>
            <p className="mt-2 text-sm text-zinc-500">Target: {currentScenario.status}</p>
          </div>
          <button
            onClick={handleNext}
            className="w-full py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            Next Scenario
          </button>
        </div>
      )}
    </div>
  );
}
