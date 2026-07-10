
// ==========
//   System
// ==========

global.LogType = Object.freeze({
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
});

global.GameMode = Object.freeze({
  battle: 'battle',
  dungeon: 'dungeon',
  enlighten: 'enlighten',
  episode: 'episode',
  location: 'location',
  training: 'training',
});

global.DialogCategory = Object.freeze({
  attackText: 'attackText',
});

// =========
//   Views
// =========

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

// ==============
//   Components
// ==============

global.ComponentType = Object.freeze({
  actor: 'ActorComponent',
  anima: 'AnimaComponent',
  animus: 'AnimusComponent',
  anus: 'AnusComponent',
  armor: 'ArmorComponent',
  arousal: 'ArousalComponent',
  aspects: 'AspectsComponent',
  attributes: 'AttributesComponent',
  body: 'BodyComponent',
  breasts: 'BreastsComponent',
  cache: 'CacheComponent',
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
  monster: 'MonsterComponent',
  mouth: 'MouthComponent',
  personality: 'PersonalityComponent',
  pussy: 'PussyComponent',
  sensitivities: 'SensitivitiesComponent',
  sexualHistory: 'SexualHistoryComponent',
  sexualPreferences: 'SexualPreferencesComponent',
  situated: 'SituatedComponent',
  skills: 'SkillsComponent',
  statusEffect: 'StatusEffectComponent',
  weapon: 'WeaponComponent',
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
  havlin: 'havlin',
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
  animalAttraction: 'animal-attraction' // No mechanical effect yet.
});

global.VirginityType = Object.freeze({
  kiss: 'kiss',
  oral: 'oral',
  pussy: 'pussy',
  cock: 'cock',
  anal: 'anal',
});

global.RollMode = Object.freeze({
  normal: 'normal',
  advantage: 'advantage',
  disadvantage: 'disadvantage',
})

// ===============
//   Personality
// ===============

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

global.NegotiationTone = Object.freeze({
  dominant: 'dominant',
  kind: 'kind',
  boastful: 'boastful',
  honest: 'honest',
  lewd: 'lewd',
});

global.NegotiationSupertype = Object.freeze({
  fierce: 'fierce',
  timid: 'timid',
  warm: 'warm',
  lewd: 'lewd',
});

// ============
//   Training
// ============

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

global.TrainingMessage = {
  changePosition: 'change-position',
  shiftPosition: 'shift-position',
}

// Currently the breast alignment is only used for the get-titfuck and
// give-titfuck actions (and only available when kneeling or prone) but it
// should follow the same pattern as the other alignments and could be
// extended at some point (especially once we add exotic nipple types)
global.BreastAlignment = { cock:'cock' }

// With hand alignment we can assume that a person can always reach themselves
// for masturbation type actions. This would only be false in case of bondage
// positions, which would be an entirely different system.
global.HandAlignment = {
  ass:     'ass',
  breasts: 'breasts',
  cock:    'cock',
  mouth:   'mouth',
};

// The mouth alignment can use the same values as the hands.
global.MouthAlignment = {
  ass:     'ass',
  breasts: 'breasts',
  cock:    'cock',
  mouth:   'mouth',
};

global.CockAlignment = {
  frottage: 'frottage',  // The participants cocks can be rubbed together.
  fucked:   'fucked',    // The cock can penetrate the other person's ass or pussy.
  rubbed:   'rubbed',    // The cock can be rubbed with hands.
  sucked:   'sucked',    // The cock can be sucked.
};

// Rarely (in positions where the legs are together) only the ass or pussy
// might be edible, though even when the legs are together both holes can get
// fingered or fucked.
global.AssAlignment = {
  onlyAssEaten:   'only-ass-eaten',
  onlyPussyEaten: 'only-pussy-eaten',
  eaten:          'eaten',
  fingered:       'fingered',
  fucked:         'fucked',
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

// Will also need intoxicated, maybe hypnotized.
global.Attitude = Object.freeze({
  loving: 'loving',
  lustful: 'lustful',
  accepting: 'accepting', // Willing, consenting, but not interested or into it.
  fearful: 'fearful',
  resistant: 'resistant', // Unhappy, trying to stop you.
  violent: 'violent',     // Angry, actively fighting back.
});

// Currently the same as the consent values, but there should be more nuance,
// depending on the action types they're willing to consent to. i.e., Willing
// to suck you off, but won't kiss you.
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

// ==========
//   Battle
// ==========

global.DamageType = Object.freeze({
  crush: 'crush',
  slash: 'slash',
  pierce: 'pierce',
  fire: 'fire',
  shock: 'shock',
  arcane: 'arcane',
  psychic: 'psychic',
  corruption: 'corruption',
  nature: 'nature',
});

global.ThreatWeight = Object.freeze({
  closest: 'closest',
  leastArmor: 'leastArmor',
  leastHealth: 'leastHealth',
  killMen: 'killMen',
  killWomen: 'killWomen',
});

global.BattleCommand = Object.freeze({
  basicAttack: 'basic-attack',
  basicDefend: 'basic-defend',
  changeEquipment: 'change-equipment',
  hide: 'hide',
  negotiate: 'negotiate',
  sneakAttack: 'sneak-attack',
  useItem: 'use-item',
  pass: 'pass',
});

global.StatusEffectDurationType = Object.freeze({
  fixedTime: 'fixed-time',         // The specified time has elapsed.
  fixedCount: 'fixed-count',       // The effect has been triggered a set number of times.
  special: 'special',              // Some other conditions will need to be met
  turnCount: 'turn-count',         // Effect will last until a set number of player turns have passed.
  untilCured: 'until-cured',       // Effect will persist until it is cured
  untilResisted: 'until-resisted', // Effect will persist until a resist roll is passed
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

global.MaterialType = Object.freeze({
  wool: 'wool',
  silk: 'silk',
  wood: 'wood',
  bone: 'bone',
  leather: 'leather',
  iron: 'iron',
  steel: 'steel',
  silver: 'silver',
});

global.MaterialFactor = Object.freeze({
  sharpness: 'sharpness',
  heft: 'heft',
  lash: 'lash',
  tension: 'tension',
  absorption: 'absorption',
  potential: 'potential',
});

global.EquipmentSlot = Object.freeze({
  primary:'primary',
  secondary:'secondary',
  chest: 'chest',
  feet: 'feet',
  hands: 'hands',
  head: 'head',
  legs: 'legs',
  underchest: 'underchest',
  underlegs: 'underlegs',
});

global.WeaponHandedness = Object.freeze({
  one: 'one',
  main: 'main',
  off: 'off',
  two: 'two',
});

global.WeaponReach = Object.freeze({
  short: 'short',
  close: 'close',
  extended: 'extended',
  long: 'long',
});

global.ArmorEnchantments = Object.freeze({
  resist: 'resist',
});

global.WeaponEnchantments = Object.freeze({
  endanger: 'endanger',
});

global.ResistResult = Object.freeze({
  pass: 'pass',
  fail: 'fail',
});

global.StandardAbility = Object.freeze({
  basicAttack: 'basic-attack',
  basicDefend: 'basic-defend',
  hide: 'hide',
  sneakAttack: 'sneak-attack',
});

global.TargetingMode = Object.freeze({
  enemyInWeaponRange: 'enemy-in-weapon-range',
  anyEnemy: 'any-enemy',
});
