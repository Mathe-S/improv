"use client";

import { useState, useCallback } from "react";
import GeneratorCard from "@/components/toolbox/GeneratorCard";
import EnvironmentBuilder from "@/components/toolbox/EnvironmentBuilder";
import GamePickerModal from "@/components/toolbox/GamePickerModal";
import {
  allRelationships,
  allEmotions,
  allTraits,
  openingLines,
  improvGames,
  getRandomItem,
  ImprovGame,
} from "@/data/toolboxData";

export default function ToolboxPage() {
  const [selectedGame, setSelectedGame] = useState<ImprovGame | null>(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  const pickRandomGame = useCallback(() => {
    const game = getRandomItem(improvGames);
    setSelectedGame(game);
    setIsGameModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-spotlight">
          The Toolbox
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Random generators to spark scenes for solo or group practice.
          Generate relationships, emotions, environments, and more.
        </p>
      </header>

      {/* Section 1: Quick Generators */}
      <section className="mb-16">
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-zinc-700" />
          Quick Generators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GeneratorCard 
            title="Relationship" 
            items={allRelationships}
          />
          <GeneratorCard 
            title="Emotion" 
            items={allEmotions}
          />
          <GeneratorCard 
            title="Character Trait" 
            items={allTraits}
          />
          <GeneratorCard 
            title="Opening Line" 
            items={openingLines}
            showHistory={false}
          />
        </div>
      </section>

      {/* Section 2: Environment Builder */}
      <section className="mb-16">
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-zinc-700" />
          Scene Environment
        </h2>
        <div className="max-w-md">
          <EnvironmentBuilder />
        </div>
      </section>

      {/* Section 3: Improv Game Picker */}
      <section className="mb-16">
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-zinc-700" />
          Game Picker
        </h2>
        <div className="max-w-md">
          <div className="bg-gradient-to-br from-accent-red/10 to-transparent border border-accent-red/20 p-8 rounded-sm">
            <h3 className="text-xl font-bold mb-3">🎲 Random Improv Game</h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              Not sure what to practice? Let fate decide. Get a random game
              with full instructions.
            </p>
            <button
              onClick={pickRandomGame}
              className="w-full py-4 bg-accent-red text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              Pick a Game
            </button>
            
            {/* Show last picked game name */}
            {selectedGame && !isGameModalOpen && (
              <p className="mt-4 text-xs text-zinc-500 text-center">
                Last picked: <span className="text-zinc-400">{selectedGame.name}</span>
                <button 
                  onClick={() => setIsGameModalOpen(true)}
                  className="ml-2 text-accent-red hover:underline"
                >
                  View
                </button>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* All Games Reference */}
      <section>
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-3">
          <span className="w-8 h-px bg-zinc-700" />
          All Games
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {improvGames.map((game) => (
            <button
              key={game.name}
              onClick={() => {
                setSelectedGame(game);
                setIsGameModalOpen(true);
              }}
              className="p-4 bg-white/5 border border-white/10 rounded-sm text-left hover:border-accent-red/30 hover:bg-white/10 transition-all group"
            >
              <p className="font-medium text-sm text-white group-hover:text-accent-red transition-colors">
                {game.name}
              </p>
              <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">
                {game.difficulty}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Game Modal */}
      <GamePickerModal
        game={selectedGame}
        isOpen={isGameModalOpen}
        onClose={() => setIsGameModalOpen(false)}
        onRegenerate={pickRandomGame}
      />
    </div>
  );
}
