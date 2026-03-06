
// === System ===

global.LogType = Object.freeze({
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
});

global.CommandType = Object.freeze({
  trainingStart: 'Training.Start',
  trainingSexAction: 'Training.SexAction',
});

global.GameMode = Object.freeze({
  dungeon: 'dungeon',
  event: 'event',
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
  chaste: 'chaste',
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
  barbaric: 'barbaric', // Wild, violent, animalistic, crude, brutal.
  bimbo: 'bimbo',       // Lots of sexual experience and kind of stupid.
  brat: 'brat',         // Playful, disobedient, and insulting.
  innocent: 'innocent', // Timid and inexperienced, but not necessarily uninterested, but can be afraid.
  pervert: 'pervert',   // Up for anything, lewd, sometimes gross.
  prude: 'prude',       // Uninterested in sex, cold, unfeeling, frigid, angry.
  reserved: 'reserved', // Unemotional but accepting
  slut: 'slut',         // Lots of sexual experience, and interested.
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
