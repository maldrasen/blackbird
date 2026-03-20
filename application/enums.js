
// === System ===

global.LogType = Object.freeze({
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
});

global.CommandType = Object.freeze({
  trainingPropose: 'Training.Propose',
  trainingStart: 'Training.Start',
  trainingSexAction: 'Training.SexAction',
  trainingEnd: 'Training.End',
});

global.GameMode = Object.freeze({
  dungeon: 'dungeon',
  enlighten: 'enlighten',
  episode: 'episode',
  location: 'location',
  training: 'training',
});

// === Views ===

global.AlertPosition = Object.freeze({
  side: 'side',
  center: 'center',
  event: 'event',
});

global.KeyCodes = Object.freeze({
  Backquote: 'Backquote',
  Enter: 'Enter',
  Escape: 'Escape',
  Space: 'Space',
  CapsLock: 'CapsLock',
  ShiftLeft: 'ShiftLeft',
  ShiftRight: 'ShiftRight',
  ControlLeft: 'ControlLeft',
  ControlRight: 'ControlRight',
  AltLeft: 'AltLeft',
  AltRight: 'AltRight',
  MetaLeft: 'MetaLeft',
  ContextMenu: 'ContextMenu',
  PageUp: 'PageUp',
  PageDown: 'PageDown',
  Home: 'Home',
  End: 'End',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  Digit1: 'Digit1',
  Digit2: 'Digit2',
  Digit3: 'Digit3',
  Numpad1: 'Numpad1',
  Numpad2: 'Numpad2',
  Numpad3: 'Numpad3',
  A: 'KeyA',
  D: 'KeyD',
  E: 'KeyE',
  Q: 'KeyQ',
  S: 'KeyS',
  W: 'KeyW',
  F11: 'F11',
});

// === Components ===

global.ComponentType = Object.freeze({
  actor: 'ActorComponent',
  anima: 'AnimaComponent',
  animus: 'AnimusComponent',
  anus: 'AnusComponent',
  arousal: 'ArousalComponent',
  aspects: 'AspectsComponent',
  attributes: 'AttributesComponent',
  body: 'BodyComponent',
  breasts: 'BreastsComponent',
  cock: 'CockComponent',
  controlled: 'ControlledComponent',
  description: 'DescriptionComponent',
  equipment: 'EquipmentComponent',
  feelings: 'FeelingsComponent',
  health: 'HealthComponent',
  inventory: 'InventoryComponent',
  item: 'ItemComponent',
  mana: 'ManaComponent',
  mark: 'MarkComponent',
  memory: 'MemoryComponent',
  mouth: 'MouthComponent',
  personality: 'PersonalityComponent',
  pussy: 'PussyComponent',
  sensitivities: 'SensitivitiesComponent',
  sexualHistory: 'SexualHistoryComponent',
  sexualPreferences: 'SexualPreferencesComponent',
  situated: 'SituatedComponent',
  skills: 'SkillsComponent',
});

global.Attrib = Object.freeze({
  strength: 'strength',
  dexterity: 'dexterity',
  vitality: 'vitality',
  intelligence: 'intelligence',
  beauty: 'beauty',
});

global.Gender = Object.freeze({
  male: 'male',
  female: 'female',
  futa: 'futa',
  enby: 'enby',
});

global.GenderName = Object.freeze({
  male: 'Male',
  female: 'Female',
  futa: 'Futanari',
  enby: 'Non-Binary',
});

global.SpeciesCode = Object.freeze({
  elf: 'elf',
  equian: 'equian',
  halfling: 'halfling',
  human: 'human',
  kobold: 'kobold',
  lupin: 'lupin',
  nymph: 'nymph',
  sylph: 'sylph',
  vermen: 'vermen',
});

global.AspectType = Object.freeze({
  flexible: 'flexible', // Makes larger insertions work and enables special positions (folded in half, self sucking)
  premature: 'premature', // Lowers orgasm thresholds (2000,1000,500)
  productive: 'productive', // Increases cum and milk volumes.
});

global.VirginityType = Object.freeze({
  kiss: 'kiss',
  oral: 'oral',
  pussy: 'pussy',
  cock: 'cock',
  anal: 'anal',
});

// === Personality ===

global.ArchetypeCode = {
  bastard: 'bastard',
  bimbo: 'bimbo',
  bitch: 'bitch',
  brat: 'brat',
  flowerChild: 'flower-child',
  innocent: 'innocent',
  koboldDom: 'kobold-dom',
  koboldSub: 'kobold-sub',
  maniac: 'maniac',
  nice: 'nice',
  pervert: 'pervert',
  playful: 'playful',
  prude: 'prude',
  reserved: 'reserved',
  savage: 'savage',
  serious: 'serious',
  slut: 'slut',
  sweet: 'sweet',
  timid: 'timid',
  vermenDom: 'vermen-dom',
  vermenSub: 'vermen-sub',
};

global.SexStyle = {
  bashful: 'bashful',
  frisky: 'frisky',
  gentle: 'gentle',
  rough: 'rough',
  shameless: 'shameless',
  submissive: 'submissive',
};

// === Training ===

// Consent uses numbers so that they can be compared.
global.Consent = Object.freeze({
  eager: 3,
  willing: 2,
  reluctant: 1,
  unwilling: 0,
});

global.TrainingSlot = {
  ass: 'ass',
  breasts: 'breasts',
  cock: 'cock',
  hands: 'hands',
  mouth: 'mouth',
  pussy: 'pussy',
}

global.MouthAlignment = {
  ass: 'ass',
  cock: 'cock',
  mouth: 'mouth',
  breasts: 'breasts',
};

global.HandAlignment = {
  ass: 'ass',
  breasts: 'breasts',
  cock: 'cock',
  head: 'head', // We will probably have actions that require hands on head, around neck or in mouth.


  any: 'any',              // The hands can comfortably reach any other part that can be rubbed or fingered.
  back: 'back',            // The hands can comfortably reach any back facing part, pretty much just the ass.
  bottom: 'bottom',        // The hands can comfortably reach the ass, cock, or pussy.
  front: 'front',          // The hands can comfortably reach any front facing part, just not the ass.
  self: 'self',            // The hands can comfortably reach this person's breasts, cock or pussy.
  top: 'top',              // The hands can comfortably reach the head or breasts.
};

global.CockAlignment = {
  oral: 'oral',            // The cock is in a position where it can be sucked.
  rubbed: 'rubbed',        // Only the hands can reach the cock from here.
  frottage: 'frottage',    // The waists are aligned, but not in a way where the cock can penetrate.
  penetrate: 'penetrate',  // The cock is in a position where it can penetrate the other person's ass or pussy.
};

global.AssAlignment = {
  eatAss: 'eatAss',        // The ass can be licked or fingered, but not the clit.
  eatPussy: 'eatPussy',    // The pussy or clit can be sucked, but not the ass. Ass can be fingered still.
  oral: 'oral',            // The ass (or pussy) can be sucked or fingered.
  penetrate: 'penetrate',  // The ass (or pussy) can be fucked or fingered.
  fingered: 'fingered',    // The ass (or pussy) can only be fingered.
};

global.ScaleLabels = {
  anus:       'Anus Sense',
  cervix:     'Cervix Sense',
  clit:       'Clitoris Sense',
  nipple:     'Nipple Sense',
  throat:     'Throat Sense',
  cock:       'Cock Sense',
  prostate:   'Prostate Sense',
  urethra:    'Urethra Sense',
  pussy:      'Vagina Sense',
  anger:      'Anger',
  comfort:    'Comfort',
  desire:     'Desire',
  shame:      'Shame',
  submission: 'Submission',
  suffering:  'Suffering',
}

global.DenialStyle = Object.freeze({
  angry: 'angry',
  frightened: 'frightened',
  horny: 'horny',
  violent: 'violent',
});

// Currently the same as the consent values, but there should be more nuance.
global.TrainingAttitude = Object.freeze({
  eager: 'eager',
  willing: 'willing',
  reluctant: 'reluctant',
  unwilling: 'unwilling',
});

global.ActionDirection = Object.freeze({
  mutual: 'mutual',
  partnerToPlayer: 'partner-to-player',
  partnerToSelf: 'partner-to-self',
  partnerToBoth: 'partner-to-both',
  playerToPartner: 'player-to-partner',
  playerToSelf: 'player-to-self',
  playerToBoth: 'player-to-both',
});

// =====================
//   Items & Equipment
// =====================

global.OutfitStyle = Object.freeze({
  barbaric: 'barbaric',
  flirty: 'flirty',
  natural: 'natural',
  sensible: 'sensible',
  slutty: 'slutty',
});

global.EquipmentSlot = Object.freeze({
  chest: 'chest',
  feet: 'feet',
  hands: 'hands',
  head: 'head',
  legs: 'legs',
  underchest: 'underchest',
  underlegs: 'underlegs',
});
