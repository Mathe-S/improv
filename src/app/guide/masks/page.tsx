"use client";

import { useEffect, useState } from "react";

const principles = [
  "Do not act the mask. Let it act you.",
  "Use the mirror briefly, then move immediately.",
  "Start with objects, not dialogue.",
  "If you start showing off, reset.",
  "When in doubt, become simpler and younger.",
] as const;

const setupChecklist = [
  "One clear room, one prop, one chair.",
  "Two minutes of quiet before you start.",
  "A mirror or camera preview for the first look only.",
  "A timer, so you stop before the state goes stale.",
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

const sceneEngines = [
  "Two masks want the same object.",
  "One mask guards a secret. The other needs it now.",
  "One mask arrives hungry. The other arrives proud.",
  "A gift is offered, refused, then desperately wanted.",
  "Someone is thrown out, then begs to be let back in.",
] as const;

const resetTools = [
  "Freeze. Exhale. Drop the shoulders.",
  "Return to one object and rediscover it.",
  "Remove speech for thirty seconds.",
  "Ask: what does the mask want right now?",
] as const;

const mistakes = [
  "Explaining the mask instead of following impulses.",
  "Trying to be impressive too early.",
  "Using big planned gestures instead of simple discoveries.",
  "Talking before the body has found the character.",
] as const;

const masks = [
  {
    id: "innocent",
    name: "The Innocent",
    essence: "Wonder before logic",
    accent: "border-amber-200/30 bg-amber-100/10 text-amber-100",
    glow: "bg-amber-100/30",
    bodyCue: "Lead with forehead and fingertips.",
    voiceCue: "Small breath. Delayed words. Gentle surprise.",
    wants: "To touch, keep, and protect small discoveries.",
    danger: "Becoming cute instead of genuinely curious.",
    starterActions: [
      "Touch one object as if it has never existed before.",
      "Hide a tiny treasure from the room.",
      "Offer something, then panic and take it back.",
    ],
    sceneOffers: [
      "Someone tries to take your new treasure away.",
      "You are told not to touch the thing you most want.",
      "You meet a bigger mask who seems dangerous but lonely.",
    ],
    coachCalls: ["Less language.", "More wonder.", "Stay with the object."],
  },
  {
    id: "glutton",
    name: "The Glutton",
    essence: "Need before manners",
    accent: "border-red-300/30 bg-red-200/10 text-red-100",
    glow: "bg-red-200/30",
    bodyCue: "Lead with belly, mouth, and grabbing hands.",
    voiceCue: "Wet breath. Short bursts. Hungry focus.",
    wants: "To take, hoard, consume, and claim more.",
    danger: "Playing anger instead of appetite.",
    starterActions: [
      "Smell the room for something edible or valuable.",
      "Claim one prop as entirely yours.",
      "Try to hide abundance inside your clothes or behind you.",
    ],
    sceneOffers: [
      "A second mask wants a share of what you have.",
      "You are offered a bargain that feels insulting.",
      "Something better appears across the room.",
    ],
    coachCalls: ["Need it more.", "Take less time.", "Let greed lead."],
  },
  {
    id: "judge",
    name: "The Judge",
    essence: "Order above warmth",
    accent: "border-sky-200/30 bg-sky-200/10 text-sky-100",
    glow: "bg-sky-200/30",
    bodyCue: "Lift the chest. Cut space with the chin.",
    voiceCue: "Measured rhythm. Precise endings. No rush.",
    wants: "To rank, correct, approve, and condemn.",
    danger: "Turning intellectual instead of authoritative.",
    starterActions: [
      "Inspect the room and silently assign value to each thing.",
      "Choose one rule and enforce it absolutely.",
      "Reward one object, punish another.",
    ],
    sceneOffers: [
      "A foolish mask enters and breaks your favorite rule.",
      "You discover that your authority has no effect.",
      "Someone flatters you and you want to believe them.",
    ],
    coachCalls: ["Hold stiller.", "Judge faster.", "Use fewer words."],
  },
  {
    id: "mischief",
    name: "The Trickster",
    essence: "Play through disruption",
    accent: "border-fuchsia-200/30 bg-fuchsia-200/10 text-fuchsia-100",
    glow: "bg-fuchsia-200/30",
    bodyCue: "Lead with eyes, shoulders, and quick pivots.",
    voiceCue: "Broken rhythm. Sharp changes. Teasing air.",
    wants: "To provoke, test, steal attention, and escape.",
    danger: "Doing jokes instead of creating trouble.",
    starterActions: [
      "Copy the room badly on purpose.",
      "Borrow something without asking.",
      "Invent a private game and force others into it.",
    ],
    sceneOffers: [
      "A solemn mask refuses to play.",
      "You are caught but not yet punished.",
      "Someone trusts you and makes you dangerous.",
    ],
    coachCalls: ["Change targets.", "Tease, do not mug.", "Stay light."],
  },
  {
    id: "mourner",
    name: "The Mourner",
    essence: "Loss seeking contact",
    accent: "border-zinc-200/30 bg-zinc-200/10 text-zinc-100",
    glow: "bg-zinc-200/30",
    bodyCue: "Lead with sternum and heavy hands.",
    voiceCue: "Falling tone. Long exhale. Pulled vowels.",
    wants: "To be seen, held, forgiven, or returned to wholeness.",
    danger: "Playing sadness instead of attachment.",
    starterActions: [
      "Hold one object as if it is the last thing left.",
      "Move toward someone, then fail to reach them.",
      "Try to restore a broken ritual.",
    ],
    sceneOffers: [
      "A cheerful mask enters and cannot understand your grief.",
      "You are offered comfort that does not fit.",
      "The thing you lost may still be in the room.",
    ],
    coachCalls: ["Stay connected.", "Need contact.", "Do less, feel more."],
  },
] as const;

export default function MasksChapter() {
  const [tranceMode, setTranceMode] = useState(false);
  const [selectedMaskId, setSelectedMaskId] = useState<
    (typeof masks)[number]["id"]
  >(masks[0].id);
  const [actionIndex, setActionIndex] = useState(0);
  const [offerIndex, setOfferIndex] = useState(0);

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

  const selectedMask =
    masks.find((mask) => mask.id === selectedMaskId) ?? masks[0];

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

          <section className="mb-16 grid gap-6 md:grid-cols-4">
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
            <div className="border border-white/10 bg-zinc-950/60 p-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                Practice Mode
              </p>
              <p className="text-zinc-200">
                Choose a mask, enter trance, then work from offers, actions, and
                resets instead of theory.
              </p>
            </div>
          </section>

          <section className="mb-24">
            <div className="mb-8 flex items-end justify-between gap-6 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-3xl font-bold text-white">Before You Start</h2>
                <p className="mt-2 text-zinc-400">
                  Build the room so the mask has something to do.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {setupChecklist.map((item, index) => (
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

          <section className="mb-24 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="mb-5 text-3xl font-bold text-white">
                Partner Scene Engines
              </h2>
              <ul className="space-y-4 text-zinc-300">
                {sceneEngines.map((engine) => (
                  <li key={engine} className="border-b border-white/5 pb-4">
                    {engine}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-5 text-3xl font-bold text-white">
                If The Mask Dies
              </h2>
              <ul className="space-y-4 text-zinc-300">
                {resetTools.map((tool) => (
                  <li key={tool} className="border-b border-white/5 pb-4">
                    {tool}
                  </li>
                ))}
              </ul>
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
                Choose a mask, receive playable offers, and work from impulse
                instead of analysis.
              </p>
              <p className="mx-auto mb-8 max-w-md text-sm uppercase tracking-[0.2em] text-zinc-500">
                Dark room if possible. Press escape to wake.
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
          className="relative h-full w-full overflow-auto bg-black"
          aria-label="Mask lab"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),rgba(0,0,0,0.98)_50%,rgba(0,0,0,1)_80%)]" />
          <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col p-6 md:p-10">
            <div className="mb-8 flex items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-zinc-500">
                  Mask Lab
                </p>
                <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                  Choose A Mask
                </h2>
              </div>
              <button
                onClick={() => setTranceMode(false)}
                className="border border-white/15 px-5 py-3 text-sm font-mono uppercase tracking-[0.2em] text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/5"
              >
                Wake
              </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
              <aside className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                  Select Mask
                </p>
                {masks.map((mask) => {
                  const active = mask.id === selectedMaskId;

                  return (
                    <button
                      key={mask.id}
                      onClick={() => {
                        setSelectedMaskId(mask.id);
                        setActionIndex(0);
                        setOfferIndex(0);
                      }}
                      className={`w-full border p-4 text-left transition-all ${
                        active
                          ? `${mask.accent} shadow-[0_0_60px_rgba(255,255,255,0.06)]`
                          : "border-white/10 bg-zinc-950/40 text-zinc-300 hover:border-white/20 hover:bg-zinc-900/80"
                      }`}
                    >
                      <p className="text-lg font-semibold">{mask.name}</p>
                      <p className="mt-1 text-sm text-current/80">
                        {mask.essence}
                      </p>
                    </button>
                  );
                })}
              </aside>

              <section className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="border border-white/10 bg-zinc-950/40 p-6 md:p-8">
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                        Active Mask
                      </p>
                      <h3 className="mt-2 text-3xl font-bold text-white">
                        {selectedMask.name}
                      </h3>
                      <p className="mt-2 text-zinc-400">{selectedMask.essence}</p>
                    </div>
                    <div className={`h-4 w-4 rounded-full ${selectedMask.glow}`} />
                  </div>

                  <div className="relative mb-8 flex h-80 items-center justify-center overflow-hidden border border-white/10 bg-black">
                    <div
                      className={`absolute inset-0 blur-3xl ${selectedMask.glow}`}
                    />
                    <div className="relative flex h-72 w-52 items-center justify-center rounded-[40%] border border-white/20 bg-black/80">
                      <div className="w-full space-y-10 text-center">
                        <div className="flex justify-center gap-12">
                          <div className="h-3 w-10 rounded-full bg-white/15" />
                          <div className="h-3 w-10 rounded-full bg-white/15" />
                        </div>
                        <div className="mx-auto h-14 w-14 rounded-full border-2 border-white/10" />
                        <div className="mx-auto h-1 w-24 rounded-full bg-white/15" />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border border-white/10 bg-black/30 p-4">
                      <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                        Body Cue
                      </p>
                      <p className="mt-3 text-zinc-200">{selectedMask.bodyCue}</p>
                    </div>
                    <div className="border border-white/10 bg-black/30 p-4">
                      <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                        Voice Cue
                      </p>
                      <p className="mt-3 text-zinc-200">{selectedMask.voiceCue}</p>
                    </div>
                    <div className="border border-white/10 bg-black/30 p-4">
                      <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                        Wants
                      </p>
                      <p className="mt-3 text-zinc-200">{selectedMask.wants}</p>
                    </div>
                    <div className="border border-white/10 bg-black/30 p-4">
                      <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                        Watch Out
                      </p>
                      <p className="mt-3 text-zinc-200">{selectedMask.danger}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="border border-white/10 bg-zinc-950/40 p-6">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                          Action Now
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-white">
                          Start Here
                        </h3>
                      </div>
                      <button
                        onClick={() =>
                          setActionIndex(
                            (current) =>
                              (current + 1) % selectedMask.starterActions.length,
                          )
                        }
                        className="border border-white/15 px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/5"
                      >
                        Next Action
                      </button>
                    </div>
                    <p className="text-lg leading-8 text-zinc-200">
                      {selectedMask.starterActions[actionIndex]}
                    </p>
                  </div>

                  <div className="border border-white/10 bg-zinc-950/40 p-6">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                          Scene Offer
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-white">
                          Escalate
                        </h3>
                      </div>
                      <button
                        onClick={() =>
                          setOfferIndex(
                            (current) =>
                              (current + 1) % selectedMask.sceneOffers.length,
                          )
                        }
                        className="border border-white/15 px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/5"
                      >
                        Next Offer
                      </button>
                    </div>
                    <p className="text-lg leading-8 text-zinc-200">
                      {selectedMask.sceneOffers[offerIndex]}
                    </p>
                  </div>

                  <div className="border border-white/10 bg-zinc-950/40 p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                      Side Coach
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {selectedMask.coachCalls.map((call) => (
                        <span
                          key={call}
                          className="border border-white/10 px-3 py-2 text-sm text-zinc-200"
                        >
                          {call}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border border-white/10 bg-black/30 p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                      Trance Cue
                    </p>
                    <p className="mt-4 text-zinc-300">
                      Breathe in for four. Hold the face. Drop the commentary.
                      Move before you can explain.
                    </p>
                    <p className="mt-4 text-sm uppercase tracking-[0.2em] text-zinc-500">
                      Escape to wake
                    </p>
                  </div>
                </div>
              </section>
              </div>
            </div>
          </div>
      )}
    </div>
  );
}
