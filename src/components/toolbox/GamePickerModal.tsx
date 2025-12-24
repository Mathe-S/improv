"use client";

import { useState } from "react";
import { ImprovGame } from "@/data/toolboxData";

interface GamePickerModalProps {
  game: ImprovGame | null;
  isOpen: boolean;
  onClose: () => void;
  onRegenerate: () => void;
}

export default function GamePickerModal({
  game,
  isOpen,
  onClose,
  onRegenerate,
}: GamePickerModalProps) {
  if (!isOpen || !game) return null;

  const difficultyColors = {
    beginner: "bg-green-500/20 text-green-400 border-green-500/30",
    intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    advanced: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-zinc-900 border border-white/10 rounded-sm max-w-lg w-full p-8 animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-spotlight mb-2">
            {game.name}
          </h2>
          <div className="flex gap-2">
            <span
              className={`px-2 py-1 text-xs uppercase tracking-wider border rounded-sm ${
                difficultyColors[game.difficulty]
              }`}
            >
              {game.difficulty}
            </span>
            <span className="px-2 py-1 text-xs uppercase tracking-wider bg-zinc-800 text-zinc-400 border border-zinc-700 rounded-sm">
              {game.playerCount} players
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-300 mb-6 leading-relaxed">
          {game.description}
        </p>

        {/* Rules */}
        <div className="mb-8">
          <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-3">
            How to Play
          </h3>
          <ol className="space-y-2">
            {game.rules.map((rule, index) => (
              <li key={index} className="flex gap-3 text-zinc-400">
                <span className="text-accent-red font-bold">
                  {index + 1}.
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={onRegenerate}
            className="flex-1 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-accent-red hover:text-white transition-colors"
          >
            Different Game
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors"
          >
            Let&apos;s Play!
          </button>
        </div>
      </div>
    </div>
  );
}
