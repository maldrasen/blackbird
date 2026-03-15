SexAction.register('get-titfuck',{
  name: 'Get Titfuck',
  persistedName: `Titfucking Your Cock`,
  mainCategory: SexAction.MainCategory.receiving,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.breasts,
  direction: ActionDirection.partnerToPlayer,
  description: `{T:name} will squeeze your cock between {T:his} tits.`,

  time: 1,
  playerStamina: 30,
  partnerStamina: 60,

  requires:['T:breasts-at-least-big'],

  persist: { action:'get-titfuck', revert:'nothing', when:Consent.reluctant },
  uses: {
    player: [TrainingSlot.cock],
    partner: [TrainingSlot.breasts, TrainingSlot.hands],
  },

  consentTarget: 30,
  minimumConsent: Consent.reluctant,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.service },
    { type:'arousal', strength:0.4 },
    { type:'gender' },
    { type:'preference', code:'cock-lover', scale:3 },
    { type:'preference', code:'submissive' },
    { type:'preference', code:'dominant', conflicting:true },
  ],

  partnerSensations: {
    nipple:     20,
    comfort:    10,
    desire:     40,
    shame:      60,
    submission: 80,
    suffering:  10,
  },
  playerSensations: {
    cock:   50,
    desire: 80,
  },

  techniqueTarget: 14,
  skills: {
    partner:['servicing']
  },
  alignment: {
    submission: 2,
    masochism: 0,
    shame: 1,
  },
});
