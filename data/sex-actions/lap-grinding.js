SexAction.register('lap-grinding',{
  name: 'Grinding',
  mainCategory: SexAction.MainCategory.performance,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.ass,
  direction: ActionDirection.partnerToBoth,
  description: `{T:name} will continue to grind {T:his} ass on your cock.`,

  time: 1,
  playerStamina: 15,
  partnerStamina: 50,

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
    anus:       8,
    clit:       7,
    nipple:     7,
    cock:       12,
    pussy:      7,
    comfort:    12,
    desire:     20,
    shame:      70,
    submission: 90,
  },
  playerSensations: {
    cock:   50,
    desire: 40,
  },

  techniqueTarget: 18,
  skills: {
    partner:['dance','performance']
  },
  alignment: {
    submission: 1,
    masochism: 0,
    shame: 2,
  },
});
