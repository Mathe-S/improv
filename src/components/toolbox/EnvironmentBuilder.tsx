"use client";

import { useState, useCallback } from "react";
import {
  allLocations,
  objects,
  timeSettings,
  getRandomItem,
} from "@/data/toolboxData";

interface EnvironmentState {
  location: string | null;
  object: string | null;
  time: string | null;
}

export default function EnvironmentBuilder() {
  const [environment, setEnvironment] = useState<EnvironmentState>({
    location: null,
    object: null,
    time: null,
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAll = useCallback(() => {
    setIsGenerating(true);

    // Staggered generation for effect
    setTimeout(() => {
      setEnvironment((prev) => ({
        ...prev,
        location: getRandomItem(allLocations),
      }));
    }, 100);

    setTimeout(() => {
      setEnvironment((prev) => ({
        ...prev,
        object: getRandomItem(objects),
      }));
    }, 300);

    setTimeout(() => {
      setEnvironment((prev) => ({
        ...prev,
        time: getRandomItem(timeSettings.timeOfDay),
      }));
      setIsGenerating(false);
    }, 500);
  }, []);

  const generateSingle = (type: keyof EnvironmentState) => {
    if (type === "location") {
      setEnvironment((prev) => ({
        ...prev,
        location: getRandomItem(allLocations),
      }));
    } else if (type === "object") {
      setEnvironment((prev) => ({
        ...prev,
        object: getRandomItem(objects),
      }));
    } else if (type === "time") {
      setEnvironment((prev) => ({
        ...prev,
        time: getRandomItem(timeSettings.timeOfDay),
      }));
    }
  };

  const isEmpty = !environment.location && !environment.object && !environment.time;

  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-sm hover:border-accent-red/30 transition-all duration-300">
      <h3 className="text-lg font-bold mb-2 uppercase tracking-wider text-zinc-300">
        🎭 Environment Builder
      </h3>
      <p className="text-xs text-zinc-500 mb-6">
        Build a complete scene environment
      </p>

      {/* Environment Display */}
      <div className="space-y-4 mb-6">
        {/* Location */}
        <div
          className="relative p-4 bg-black/60 border border-white/5 rounded-sm cursor-pointer hover:border-zinc-700 transition-colors"
          onClick={() => generateSingle("location")}
        >
          <span className="absolute top-2 left-3 text-[10px] uppercase tracking-widest text-zinc-600">
            Location
          </span>
          <p
            className={`pt-3 font-serif ${
              environment.location ? "text-white" : "text-zinc-600"
            }`}
          >
            {environment.location || "Click to generate"}
          </p>
        </div>

        {/* Object */}
        <div
          className="relative p-4 bg-black/60 border border-white/5 rounded-sm cursor-pointer hover:border-zinc-700 transition-colors"
          onClick={() => generateSingle("object")}
        >
          <span className="absolute top-2 left-3 text-[10px] uppercase tracking-widest text-zinc-600">
            Key Object
          </span>
          <p
            className={`pt-3 font-serif ${
              environment.object ? "text-white" : "text-zinc-600"
            }`}
          >
            {environment.object || "Click to generate"}
          </p>
        </div>

        {/* Time */}
        <div
          className="relative p-4 bg-black/60 border border-white/5 rounded-sm cursor-pointer hover:border-zinc-700 transition-colors"
          onClick={() => generateSingle("time")}
        >
          <span className="absolute top-2 left-3 text-[10px] uppercase tracking-widest text-zinc-600">
            Time
          </span>
          <p
            className={`pt-3 font-serif ${
              environment.time ? "text-white" : "text-zinc-600"
            }`}
          >
            {environment.time || "Click to generate"}
          </p>
        </div>
      </div>

      {/* Generate All Button */}
      <button
        onClick={generateAll}
        disabled={isGenerating}
        className={`
          w-full py-3 font-bold uppercase tracking-widest text-sm
          transition-all duration-300
          ${
            isGenerating
              ? "bg-accent-red/50 text-white cursor-wait"
              : "bg-white text-black hover:bg-accent-red hover:text-white"
          }
        `}
      >
        {isGenerating ? "Building..." : isEmpty ? "Build Environment" : "Rebuild All"}
      </button>

      {/* Tip */}
      <p className="mt-4 text-[10px] text-zinc-600 text-center">
        Click individual fields to regenerate just that element
      </p>
    </div>
  );
}
