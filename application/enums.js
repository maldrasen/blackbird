
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
  feelings: 'FeelingsComponent',
  health: 'HealthComponent',
  mana: 'ManaComponent',
  mark: 'MarkComponent',
  memory: 'MemoryComponent',
  mouth: 'MouthComponent',
  personality: 'PersonalityComponent',
  pussy: 'PussyComponent',
  sensitivities: 'SensitivitiesComponent',
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

global.AspectType = Object.freeze({
  flexible: 'flexible', // Makes larger insertions work and enables special positions (folded in half, self sucking)
  premature: 'premature', // Lowers orgasm thresholds (2000,1000,500)
  productive: 'productive', // Increases cum and milk volumes.
  prude: 'prude',
  bimbo: 'bimbo',
  slut: 'slut',
  noble: 'noble',
  slave: 'slave',
});

// === Personality ===

global.Attitude = {
  afraid: 'afraid',
  angry: 'angry',
  horny: 'horny',
  resigned: 'resigned',
};

global.Architype = {
  // Timid and inexperienced, based on sexual history and lack of strong preferences.
  innocent: 'innocent',

  // Personality from species.
  koboldDom: 'koboldDom',
  koboldSub: 'koboldSub',

  // Personality strongly influenced by aspects.
  bimbo: 'bimbo',  // Loves sex and is kind of stupid.
  prude: 'prude',  // Uninterested in sex, cold, unfeeling, frigid, angry.
  slut: 'slut',    // Loves sex and is up for anything with anyone.

  // Personality strongly influenced by sexual preferences.
  pervert: 'pervert',   // Up for anything, lewd, sometimes gross.

  // Lowest priority archetypes, based entirely on personality factors.
  sweet: 'sweet',         // Kind, gentle.
  playful: 'playful',     // Playful, fun loving.
  brat: 'brat',           // Playful, disobedient, and insulting.
  serious: 'serious',     // Violent when they need to be, takes situations seriously.
  heartless: 'heartless', // Violent, cruel, insulting, hateful.
  timid: 'timid',         // Passive, but excitable, so they're probably a bit fearful.
  bitch: 'bitch',         // The most interesting thing about them is they're kind of mean.
  reserved: 'reserved',   // No strong personality in any direction, they are unemotional and stoic.
}

// === Training ===

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

// Consent uses numbers so that they can be compared.
global.Consent = Object.freeze({
  eager: 3,
  willing: 2,
  reluctant: 1,
  unwilling: 0,
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
