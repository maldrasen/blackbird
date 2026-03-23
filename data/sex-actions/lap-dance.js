SexAction.register('lap-dance',{
  name: 'Lap Dance',
  mainCategory: SexAction.MainCategory.performance,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.ass,
  direction: ActionDirection.partnerToBoth,
  description: `{T:name} will straddle your legs and grind {T:his} ass on your cock.`,

  time: 5,
  playerStamina: 20,
  partnerStamina: 70,

  // TODO: Needs to unpersist all actions. Maybe it's better to handle that by
  //   triggering a major position change somehow. Slots aren't the way to do
  //   this.

  persist: { action:'lap-grinding' },
  uses: {
    player: [TrainingSlot.cock],
    partner: [TrainingSlot.ass],
  },
  availableWhen:{
    conditions:['T:unbound']
  },

  consentTarget: 18,
  minimumConsent: Consent.reluctant,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.performance },
    { type:'arousal', strength:1.5 },
    { type:'gender', scale:1.25 },
    { type:'preference', code:'exhibitionist', scale:3 },
    { type:'preference', code:'humiliation-slut' },
    { type:'preference', code:'submissive' },
  ],

  partnerSensations: {
    anus:       5,
    clit:       5,
    nipple:     5,
    cock:       10,
    pussy:      5,
    comfort:    10,
    desire:     15,
    shame:      60,
    submission: 80,
  },
  playerSensations: {
    cock:   40,
    desire: 30,
  },

  techniqueTarget: 18,
  skills: {
    partner:['dance','performance']
  },
  orientation: {
    submission: 1,
    masochism: 0,
    shame: 2,
  },
});
