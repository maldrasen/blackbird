
// ==========
//   System
// ==========

global.LogType = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

global.GameMode = {
  battle: 'battle',
  dungeon: 'dungeon',
  enlighten: 'enlighten',
  episode: 'episode',
  location: 'location',
  training: 'training',
};

global.DialogCategory = {
  attackText: 'attackText',
};

// Contents and feature rarity levels (not item rarity)
global.Rarity = {
  common: 'common',
  unusual: 'unusual',
  rare: 'rare',
  astonishing: 'astonishing',
  unheardOf: 'unheardOf',
}

// =========
//   Views
// =========

global.AlertPosition = {
  side: 'side',
  center: 'center',
  event: 'event',
};

global.KeyCodes = {
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
};

global.ArticleType = {
  ammunition: 'ammunition',
  consumable: 'consumable',
};

// This category enum is ordered as the categories should appear in the inventory.
global.InventoryCategory = {
  weapon: 'weapon',
  armor: 'armor',
  restoreHealth: 'restore-health',
  restoreMana: 'restore-mana',
  drug: 'drug',
  grenades: 'grenades',
  mutagen: 'mutagen',
  ammo: 'ammo',
  valuables: 'valuables',
};

global.UsableWhen = {
  anyTime: 'any-time',
  inCombat: 'in-combat',
  outOfCombat: 'out-of-combat',
  never: 'never',
};

global.EpisodePriority = {
  critical: 10,
  important: 8,
  standard: 5,
  flavor: 2,
};

global.EpisodeTarget = {
  anyInParty: 'any-in-party' // Any single character in the party.
};

// A character in the party moves with the player, so their situated location is this pseudo-location rather than a
// registered location code.
global.SpecialLocation = {
  inParty: '(in-party)',
};

// ==============
//   Components
// ==============

global.ComponentType = {
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
  cock: 'CockComponent',
  controlled: 'ControlledComponent',
  description: 'DescriptionComponent',
  equipment: 'EquipmentComponent',
  experience: 'ExperienceComponent',
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
};

global.Attrib = {
  strength: 'strength',
  dexterity: 'dexterity',
  vitality: 'vitality',
  intelligence: 'intelligence',
  beauty: 'beauty',
};

global.Gender = {
  male: 'male',
  female: 'female',
  futa: 'futa',
  enby: 'enby',
  none: 'none',
};

global.GenderName = {
  male: 'Male',
  female: 'Female',
  futa: 'Futanari',
  enby: 'Non-Binary',
  none: 'None',
};

global.SpeciesCode = {
  elf: 'elf',
  equian: 'equian',
  havlin: 'havlin',
  human: 'human',
  kobold: 'kobold',
  lupin: 'lupin',
  nymph: 'nymph',
  sylph: 'sylph',
  vermen: 'vermen',
};

global.Mana = {
  red: 'red',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue',
  black: 'black',
};

global.AspectType = {
  flexible: 'flexible', // Makes larger insertions work and enables special positions (folded in half, self sucking)
  premature: 'premature', // Lowers orgasm thresholds (2000,1000,500)
  productive: 'productive', // Increases cum and milk volumes.
  animalAttraction: 'animal-attraction' // No mechanical effect yet.
};

global.VirginityType = {
  kiss: 'kiss',
  oral: 'oral',
  pussy: 'pussy',
  cock: 'cock',
  anal: 'anal',
};

global.RollMode = {
  normal: 'normal',
  advantage: 'advantage',
  disadvantage: 'disadvantage',
};

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
};

global.SexStyle = {
  bashful: 'bashful',
  frisky: 'frisky',
  gentle: 'gentle',
  rough: 'rough',
  shameless: 'shameless',
  submissive: 'submissive',
};

global.NegotiationStyle = {
  brat: 'brat',
  fierce: 'fierce',
  lewd: 'lewd',
  playful: 'playful',
  reserved: 'reserved',
  serious: 'serious',
  timid: 'timid',
  warm: 'warm',
};

// ============
//   Training
// ============

// Consent uses numbers so that they can be compared.
global.Consent = {
  eager: 3,
  willing: 2,
  reluctant: 1,
  unwilling: 0,
};

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

global.DenialStyle = {
  angry: 'angry',
  frightened: 'frightened',
  horny: 'horny',
  violent: 'violent',
};

// Will also need intoxicated, maybe hypnotized.
global.Attitude = {
  loving: 'loving',
  lustful: 'lustful',
  accepting: 'accepting', // Willing, consenting, but not interested or into it.
  fearful: 'fearful',
  resistant: 'resistant', // Unhappy, trying to stop you.
  violent: 'violent',     // Angry, actively fighting back.
};

// Currently the same as the consent values, but there should be more nuance,
// depending on the action types they're willing to consent to. i.e., Willing
// to suck you off, but won't kiss you.
global.TrainingAttitude = {
  eager: 'eager',
  willing: 'willing',
  reluctant: 'reluctant',
  unwilling: 'unwilling',
};

global.ActionDirection = {
  mutual: 'mutual',
  partnerToPlayer: 'partner-to-player',
  partnerToSelf: 'partner-to-self',
  partnerToBoth: 'partner-to-both',
  playerToPartner: 'player-to-partner',
  playerToSelf: 'player-to-self',
  playerToBoth: 'player-to-both',
};

// ==========
//   Battle
// ==========

global.AmbushState = {
  normal: 'normal',
  partyAmbushed: 'partyAmbushed',
  monstersAmbushed: 'monstersAmbushed',
}

global.DamageType = {
  crush: 'crush',
  slash: 'slash',
  pierce: 'pierce',
  fire: 'fire',
  shock: 'shock',
  arcane: 'arcane',
  psychic: 'psychic',
  corruption: 'corruption',
  nature: 'nature',
};

global.ThreatWeight = {
  closest: 'closest',
  leastArmor: 'leastArmor',
  leastHealth: 'leastHealth',
  killMen: 'killMen',
  killWomen: 'killWomen',
};

global.BattleCondition = {
  active: 'active',
  dead: 'dead',
  knockedOut: 'knocked-out',
  fled: 'fled',
  recruited: 'recruited',
};

global.BattleCommand = {
  basicAttack: 'basic-attack',
  basicDefend: 'basic-defend',
  changeEquipment: 'change-equipment',
  hide: 'hide',
  negotiate: 'negotiate',
  sneakAttack: 'sneak-attack',
  useItem: 'use-item',
  pass: 'pass',
};

global.StatusEffectDurationType = {
  fixedTime: 'fixed-time',         // The specified time has elapsed.
  fixedCount: 'fixed-count',       // The effect has been triggered a set number of times.
  special: 'special',              // Some other conditions will need to be met
  turnCount: 'turn-count',         // Effect will last until a set number of player turns have passed.
  untilCured: 'until-cured',       // Effect will persist until it is cured
  untilResisted: 'until-resisted', // Effect will persist until a resist roll is passed
};

// =====================
//   Items & Equipment
// =====================

global.OutfitStyle = {
  barbaric: 'barbaric',
  flirty: 'flirty',
  natural: 'natural',
  sensible: 'sensible',
  slutty: 'slutty',
};

global.MaterialType = {
  wool: 'wool',
  silk: 'silk',
  wood: 'wood',
  bone: 'bone',
  leather: 'leather',
  iron: 'iron',
  steel: 'steel',
  silver: 'silver',
};

global.MaterialFactor = {
  sharpness: 'sharpness',
  heft: 'heft',
  lash: 'lash',
  tension: 'tension',
  absorption: 'absorption',
  potential: 'potential',
};

global.EquipmentSlot = {
  primary:'primary',
  secondary:'secondary',
  chest: 'chest',
  feet: 'feet',
  hands: 'hands',
  head: 'head',
  legs: 'legs',
  underchest: 'underchest',
  underlegs: 'underlegs',
};

global.WeaponHandedness = {
  one: 'one',
  main: 'main',
  off: 'off',
  two: 'two',
};

global.WeaponReach = {
  short: 'short',
  close: 'close',
  extended: 'extended',
  long: 'long',
};

global.ArmorEnchantments = {
  resist: 'resist',
};

global.WeaponEnchantments = {
  endanger: 'endanger',
};

global.ResistResult = {
  pass: 'pass',
  fail: 'fail',
};

global.StandardAbility = {
  basicAttack: 'basic-attack',
  basicDefend: 'basic-defend',
  hide: 'hide',
  sneakAttack: 'sneak-attack',
};

global.TargetingMode = {
  enemyInWeaponRange: 'enemy-in-weapon-range',
  anyEnemy: 'any-enemy',
};
