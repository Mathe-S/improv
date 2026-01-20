// Toolbox Data - All generator content for The Toolbox page

// ============ RELATIONSHIPS ============
export interface RelationshipCategory {
  name: string;
  relationships: string[];
}

export const relationshipCategories: RelationshipCategory[] = [
  {
    name: "Family",
    relationships: [
      "Estranged Siblings",
      "Parent discovering child's secret",
      "Grandparent and rebellious teen",
      "Twin separated at birth, meeting for first time",
      "Child confronting adoptive parent",
    ],
  },
  {
    name: "Work",
    relationships: [
      "Boss and Fired Employee",
      "Co-workers competing for same promotion",
      "Intern's first day, meeting the CEO",
      "Former business partners after bankruptcy",
      "Manager apologizing to wronged employee",
    ],
  },
  {
    name: "Romance",
    relationships: [
      "Ex-Lovers trapped in an elevator",
      "First date going horribly wrong",
      "Couple deciding whether to break up",
      "Wedding day cold feet confession",
      "Reconnecting after 20 years apart",
    ],
  },
  {
    name: "Strangers",
    relationships: [
      "Two Spies meeting for the first time",
      "Strangers stuck on a broken-down train",
      "Competing for the last item at a store",
      "Wrong number leads to unexpected connection",
      "Witnesses to the same crime",
    ],
  },
  {
    name: "Comedy",
    relationships: [
      "Teacher and Student 10 years later",
      "Superhero and their nemesis at group therapy",
      "Ghost and the new tenant of their house",
      "Time traveler meeting their past self",
      "Rival mascots at a sports game",
    ],
  },
];

export const allRelationships = relationshipCategories.flatMap((c) => c.relationships);

// ============ EMOTIONS ============
export interface EmotionCategory {
  name: string;
  intensity: "subtle" | "moderate" | "intense";
  emotions: string[];
}

export const emotionCategories: EmotionCategory[] = [
  {
    name: "Subtle",
    intensity: "subtle",
    emotions: [
      "Mildly curious",
      "Slightly amused",
      "Quietly hopeful",
      "Gently melancholic",
      "Peacefully content",
      "Cautiously optimistic",
      "Wistfully nostalgic",
      "Pleasantly surprised",
      "Mildly annoyed",
      "Quietly proud",
    ],
  },
  {
    name: "Moderate",
    intensity: "moderate",
    emotions: [
      "Genuinely excited",
      "Clearly frustrated",
      "Deeply grateful",
      "Openly jealous",
      "Visibly nervous",
      "Noticeably impatient",
      "Warmly affectionate",
      "Genuinely confused",
      "Clearly disappointed",
      "Openly suspicious",
    ],
  },
  {
    name: "Intense",
    intensity: "intense",
    emotions: [
      "Overwhelmingly joyful",
      "Absolutely furious",
      "Utterly heartbroken",
      "Consumed by guilt",
      "Paralyzed by fear",
      "Bursting with pride",
      "Desperately hopeful",
      "Seething with resentment",
      "Radiating euphoria",
      "Drowning in grief",
    ],
  },
];

export const allEmotions = emotionCategories.flatMap((c) => c.emotions);

// ============ CHARACTER TRAITS ============
export interface TraitCategory {
  name: string;
  traits: string[];
}

export const traitCategories: TraitCategory[] = [
  {
    name: "Physical Quirks",
    traits: [
      "Always fidgeting with something",
      "Speaks with hands constantly",
      "Chronic throat-clearing",
      "Walks on tiptoes",
      "Blinks excessively when lying",
      "Unconscious humming",
      "Finger-snapping habit",
      "Constant hair-touching",
      "Nervous laughter",
      "Exaggerated facial expressions",
    ],
  },
  {
    name: "Personality",
    traits: [
      "Relentlessly optimistic",
      "Chronically indecisive",
      "Compulsive truth-teller",
      "Pathological people-pleaser",
      "Conspiracy theorist",
      "Overly literal interpreter",
      "Humble-bragger",
      "One-upper in every story",
      "Unsolicited advice giver",
      "Dramatic exaggerator",
    ],
  },
  {
    name: "Background",
    traits: [
      "Former child star",
      "Identical twin (the forgotten one)",
      "Grew up in a cult",
      "Lottery winner who lost it all",
      "Witness protection program",
      "Raised by eccentric grandparents",
      "Former professional athlete",
      "Escaped a pyramid scheme",
      "Homeschooled by survivalists",
      "Once briefly famous for a viral video",
    ],
  },
  {
    name: "Secret",
    traits: [
      "Has a hidden talent nobody knows about",
      "Secretly wealthy",
      "Living a double life",
      "Hiding a massive fear",
      "Knows something they shouldn't",
      "Has never read a book",
      "Pretending to like something they hate",
      "Has an imaginary nemesis",
      "Secretly doesn't know how to read a clock",
      "Has a collection nobody can know about",
    ],
  },
];

export const allTraits = traitCategories.flatMap((c) => c.traits);

// ============ OPENING LINES ============
export const openingLines = [
  "I thought I'd never see you again.",
  "We need to talk about what happened.",
  "Is it true what they're saying about you?",
  "I'm only going to ask you this once.",
  "Before you say anything, let me explain.",
  "I found this in your drawer.",
  "How long have you known?",
  "I don't think I can do this anymore.",
  "You're the last person I expected to see here.",
  "I've been practicing what I wanted to say for weeks.",
  "Something's different about you.",
  "I'm not who you think I am.",
  "I need you to trust me right now.",
  "This isn't what it looks like.",
  "I think I made a terrible mistake.",
  "You weren't supposed to find out this way.",
  "I've been keeping something from you.",
  "Can we pretend this never happened?",
  "I know what you did.",
  "I need your help. No questions asked.",
];

// ============ LOCATIONS ============
export interface LocationCategory {
  name: string;
  locations: string[];
}

export const locationCategories: LocationCategory[] = [
  {
    name: "Indoor",
    locations: [
      "Hospital waiting room",
      "Fancy restaurant kitchen",
      "Elevator stuck between floors",
      "Airport security checkpoint",
      "Therapist's office",
      "Escape room",
      "Museum after hours",
      "Laundromat at 3am",
    ],
  },
  {
    name: "Outdoor",
    locations: [
      "Rooftop at sunset",
      "Empty parking lot",
      "Bus stop in the rain",
      "Cemetery at twilight",
      "Beach during a storm",
      "State fair closing night",
      "Mountain trail fork",
      "Playground at midnight",
    ],
  },
  {
    name: "Fantastical",
    locations: [
      "Limbo (the afterlife waiting room)",
      "Inside someone's dream",
      "Time travel nexus point",
      "Parallel universe version of Earth",
      "The moment before the universe began",
      "A memory that keeps looping",
      "The last place on Earth",
      "Between dimensions",
    ],
  },
];

export const allLocations = locationCategories.flatMap((c) => c.locations);

// ============ OBJECTS/PROPS ============
export const objects = [
  "A mysterious letter",
  "An old photograph",
  "A broken watch",
  "A key to an unknown door",
  "A half-eaten sandwich",
  "A winning lottery ticket",
  "A child's drawing",
  "An engagement ring",
  "A burner phone",
  "A bloodstained shirt",
  "A fake ID",
  "A locked diary",
  "A plane ticket to nowhere",
  "A love letter to someone else",
  "A secret recipe",
  "A ransom note",
  "A family heirloom",
  "A USB drive with no label",
  "A goodbye note",
  "A vial of something unknown",
  "A mask",
  "A countdown timer",
  "An empty suitcase",
  "A birth certificate",
  "A weapon that's never been used",
];

// ============ TIME SETTINGS ============
export interface TimeSetting {
  timeOfDay: string[];
  era: string[];
  urgency: string[];
}

export const timeSettings: TimeSetting = {
  timeOfDay: [
    "Dawn, just as the sun rises",
    "Midday, harsh sunlight",
    "Golden hour, everything glowing",
    "Twilight, last light fading",
    "Midnight, dead silence",
    "3am, the witching hour",
    "Sunrise after an all-nighter",
    "Dusk, shadows growing long",
  ],
  era: [
    "Present day",
    "10 years in the future",
    "100 years in the past",
    "The distant future",
    "An alternate timeline",
    "Post-apocalypse",
    "The Renaissance",
    "The 1980s",
  ],
  urgency: [
    "You have 5 minutes",
    "It's already too late",
    "Time is frozen",
    "You have until sunrise",
    "The clock is ticking",
    "There's no rush... or is there?",
    "This is your last chance",
    "Time is running backwards",
  ],
};

// ============ IMPROV GAMES ============
export interface ImprovGame {
  name: string;
  description: string;
  rules: string[];
  playerCount: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export const improvGames: ImprovGame[] = [
  {
    name: "Yes, And",
    description: "The foundational improv exercise. Accept and build on every offer.",
    rules: [
      "Player A makes a statement or suggestion",
      "Player B must accept it ('Yes') and add something ('And')",
      "Continue building the scene together",
      "Never deny or block an offer",
    ],
    playerCount: "2+",
    difficulty: "beginner",
  },
  {
    name: "Word Association",
    description: "Rapid-fire word connections to unlock spontaneity.",
    rules: [
      "One player says a word",
      "Next player immediately says the first word that comes to mind",
      "No hesitation or overthinking",
      "Keep the chain going as long as possible",
    ],
    playerCount: "2+",
    difficulty: "beginner",
  },
  {
    name: "Status Game",
    description: "Explore high and low status dynamics in relationships.",
    rules: [
      "Each player is assigned a status (1-10, where 10 is highest)",
      "Play a scene embodying that status through physicality and speech",
      "Try status transfers mid-scene",
      "Explore what happens when status is challenged",
    ],
    playerCount: "2-4",
    difficulty: "intermediate",
  },
  {
    name: "Freeze Tag",
    description: "Jump in and completely transform the scene.",
    rules: [
      "Two players begin a scene",
      "At any point, someone yells 'Freeze!'",
      "Players freeze in position",
      "The person who called freeze taps a player and takes their exact position",
      "They start a completely new scene inspired by the positions",
    ],
    playerCount: "4+",
    difficulty: "intermediate",
  },
  {
    name: "Emotional Rollercoaster",
    description: "Rapidly switch between extreme emotions on command.",
    rules: [
      "Players perform a simple scene",
      "The director calls out random emotions",
      "Players must immediately embody that emotion fully",
      "Continue the same scene through every emotion",
    ],
    playerCount: "2+",
    difficulty: "beginner",
  },
  {
    name: "One Word Story",
    description: "Build a story one word at a time as a group.",
    rules: [
      "Sit in a circle",
      "Each person adds exactly one word",
      "Build complete sentences and a narrative",
      "Focus on listening and supporting the story",
    ],
    playerCount: "4+",
    difficulty: "beginner",
  },
  {
    name: "Expert Interview",
    description: "Become an expert on a subject you know nothing about.",
    rules: [
      "One player is the 'expert' on a made-up or absurd topic",
      "Other player is the interviewer",
      "The expert must answer all questions with complete confidence",
      "Commit fully to the nonsense",
    ],
    playerCount: "2",
    difficulty: "intermediate",
  },
  {
    name: "Gibberish",
    description: "Communicate entirely without real words.",
    rules: [
      "Partners speak only in made-up sounds",
      "Communicate through tone, gesture, and emotion",
      "Start with simple objectives, then try scenes",
      "A third player can 'translate' for added comedy",
    ],
    playerCount: "2-3",
    difficulty: "intermediate",
  },
  {
    name: "Typewriter",
    description: "An omniscient narrator controls the scene.",
    rules: [
      "One player is the 'narrator' speaking in third person",
      "Actor must do exactly what the narrator describes",
      "Narrator can describe emotions, actions, even thoughts",
      "Explore the tension between actor and narrator",
    ],
    playerCount: "2-3",
    difficulty: "advanced",
  },
  {
    name: "Masks",
    description: "Transform completely by wearing a mask.",
    rules: [
      "Put on a neutral mask or imagine wearing one",
      "Let the mask 'possess' you with a new character",
      "Discover how the character moves before speaking",
      "Explore through physical impulses, not planning",
    ],
    playerCount: "1+",
    difficulty: "advanced",
  },
  {
    name: "Presents",
    description: "A collaborative game about giving and receiving imaginary gifts to generate warmth.",
    rules: [
      "Divide into pairs (A and B). A gives an imaginary present to B.",
      "B receives it, then gives a present back to A. Continue back and forth.",
      "Stop planning gifts. Just hold your hands out and see what the other person takes.",
      "Overaccept the offer. Everything you are given delights you.",
      "Interact with the object: wind it up, put it on, or let it fly.",
      "Focus on making the gift you receive interesting, not the gift you give.",
    ],
    playerCount: "2",
    difficulty: "beginner",
  },
];

// ============ UTILITY FUNCTIONS ============
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomFromCategory<T extends { name: string }>(
  categories: T[],
  categoryName?: string
): T {
  if (categoryName) {
    const found = categories.find((c) => c.name === categoryName);
    if (found) return found;
  }
  return getRandomItem(categories);
}
