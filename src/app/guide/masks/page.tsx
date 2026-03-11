"use client";

import { useEffect, useState } from "react";

const principles = [
  "Do not act the mask. Let it act you.",
  "Use the mirror briefly, then move immediately.",
  "Start with objects, not dialogue.",
  "If you start showing off, reset.",
  "When in doubt, become simpler and younger.",
] as const;

const drills = [
  {
    title: "Mirror Shock",
    steps: [
      "Look for two seconds only.",
      "Set the mouth to match the face.",
      "Turn away before you can invent anything.",
    ],
  },
  {
    title: "Prop First",
    steps: [
      "Choose one simple object.",
      "Let the mask discover texture, weight, and danger.",
      "Do not name the object unless speech arrives on its own.",
    ],
  },
  {
    title: "Catch The Switch",
    steps: [
      "Notice the exact instant the mask feels alive.",
      "Notice the exact instant you take control again.",
      "Repeat until you can recognize both states quickly.",
    ],
  },
  {
    title: "Speech Last",
    steps: [
      "Allow breath, sound, or noise before words.",
      "Keep vocabulary tiny at first.",
      "Protect awkwardness. Do not rush toward fluency.",
    ],
  },
] as const;

const mistakes = [
  "Explaining the mask instead of following impulses.",
  "Trying to be impressive too early.",
  "Using big planned gestures instead of simple discoveries.",
  "Talking before the body has found the character.",
] as const;

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

  useEffect(() => {
    if (!tranceMode) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setTranceMode(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [tranceMode]);

  return (
    <div
      className={`min-h-screen px-8 ${
        tranceMode
          ? "fixed inset-0 z-50 flex items-center justify-center bg-black px-0 pt-0"
          : "mx-auto max-w-5xl pt-32"
      }`}
    >
      {!tranceMode && (
        <>
          <header className="mb-20 text-center">
            <span className="mb-4 block font-mono text-sm uppercase tracking-widest text-accent-red">
              Chapter 4
            </span>
            <h1 className="mb-6 text-6xl font-bold tracking-tighter text-spotlight md:text-8xl">
              MASKS AND TRANCE
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto">
              &ldquo;The mask is a device for driving the personality out of the
              body.&rdquo;
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-sm uppercase tracking-[0.25em] text-zinc-500">
              Improvisation begins when the performer stops illustrating and
              starts being moved.
            </p>
          </header>

          <section className="mb-16 grid gap-6 md:grid-cols-3">
            <div className="border border-white/10 bg-zinc-950/60 p-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                Core Premise
              </p>
              <p className="text-zinc-200">
                In mask work, you do not &ldquo;play&rdquo; a character. You let the
                mask play <strong>you</strong>.
              </p>
            </div>
            <div className="border border-white/10 bg-zinc-950/60 p-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                Trance State
              </p>
              <p className="text-zinc-200">
                The useful state is absorbed, impulsive, less verbal, and less
                concerned with social correctness.
              </p>
            </div>
            <div className="border border-white/10 bg-zinc-950/60 p-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                Why It Matters
              </p>
              <p className="text-zinc-200">
                The essay argues that living theatre appears when control loosens
                and the performer becomes more responsive than self-conscious.
              </p>
            </div>
          </section>

          <section className="mb-24">
            <div className="mb-8 flex items-end justify-between gap-6 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-3xl font-bold text-white">Core Rules</h2>
                <p className="mt-2 text-zinc-400">
                  Keep it practical. Keep it simple.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {principles.map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 border border-white/10 bg-zinc-950/40 p-5"
                >
                  <span className="font-mono text-xs text-zinc-500">
                    0{index + 1}
                  </span>
                  <p className="text-zinc-200">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-24 border-y border-white/10 py-16">
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-bold text-white">
                Try These Drills
              </h2>
              <p className="text-zinc-400">
                Each one should take under two minutes.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {drills.map((drill) => (
                <article
                  key={drill.title}
                  className="border border-white/10 bg-zinc-950/40 p-6"
                >
                  <h3 className="mb-4 text-xl font-semibold text-white">
                    {drill.title}
                  </h3>
                  <ul className="space-y-3 text-zinc-300">
                    {drill.steps.map((step) => (
                      <li key={step} className="border-b border-white/5 pb-3">
                        {step}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-24 grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="mb-5 text-3xl font-bold text-white">Use This Test</h2>
              <p className="max-w-2xl text-lg leading-8 text-zinc-300">
                Ask one question only: <em>am I deciding, or is it deciding?</em>
                If you are planning, decorating, or presenting, the mask is off.
                If behavior feels inevitable, strange, and slightly ahead of
                thought, you are closer.
              </p>
            </div>

            <div>
              <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                Avoid These Mistakes
              </h3>
              <ul className="space-y-4 text-zinc-300">
                {mistakes.map((note) => (
                  <li key={note} className="border-b border-white/5 pb-4">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mb-32 border-t border-white/10 pt-16">
            <div className="border border-white/10 bg-linear-to-b from-black to-zinc-900 p-16 text-center">
              <h2 className="mb-6 text-3xl font-bold">Enter Trance</h2>
              <p className="mx-auto mb-4 max-w-2xl text-zinc-300">
                Use this to quiet commentary before a mask drill, not as a
                substitute for one.
              </p>
              <p className="mx-auto mb-8 max-w-md text-sm uppercase tracking-[0.2em] text-zinc-500">
                Dark room if possible. Click or press escape to wake.
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

      {tranceMode && (
        <div
          className="relative h-full w-full cursor-none overflow-hidden"
          onClick={() => setTranceMode(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              setTranceMode(false);
            }
          }}
          aria-label="Exit trance mode"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),rgba(0,0,0,0.96)_45%,rgba(0,0,0,1)_70%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-96 bg-white rounded-[50%] animate-pulse blur-3xl opacity-20" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-72 w-48 animate-bounce items-center justify-center rounded-[40%] border border-white/20 bg-black duration-3000">
              <div className="w-full space-y-12 text-center">
                <div className="mx-auto h-2 w-24 rounded-full bg-white/10" />
                <div className="mx-auto h-12 w-12 rounded-full border-2 border-white/10" />
                <div className="mx-auto h-px w-20 bg-white/10" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-24 w-full text-center">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-zinc-600">
              Breathe in for four
            </p>
            <p className="mt-4 text-sm tracking-[0.2em] text-zinc-700">
              Hold the face. Drop the commentary. Let the image arrive.
            </p>
          </div>
          <div className="absolute bottom-12 w-full animate-pulse text-center text-xs uppercase tracking-widest text-zinc-600">
            Click anywhere or press escape to wake
          </div>
        </div>
      )}
    </div>
  );
}
