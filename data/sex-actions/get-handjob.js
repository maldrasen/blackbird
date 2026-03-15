SexAction.register('get-handjob',{
  name: 'Get Handjob',
  persistedName: `Stroking Your Cock`,
  mainCategory: SexAction.MainCategory.receiving,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.hands,
  direction: ActionDirection.partnerToPlayer,
  description: `{T:name} will jack off your cock.`,

  time: 1,
  playerStamina: 60,
  partnerStamina: 50,

  persist: { action:'get-handjob', revert:'nothing', when:Consent.reluctant },
  uses: {
    player: [TrainingSlot.cock],
    partner: [TrainingSlot.hands],
  },

  consentTarget: 25,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.service },
    { type:'arousal', strength:0.4 },
    { type:'gender' },
    { type:'preference', code:'cock-lover', scale:3 },
    { type:'preference', code:'submissive' },
    { type:'preference', code:'dominant', conflicting:true },
  ],

  partnerSensations: {
    desire:     30,
    shame:      20,
    submission: 20,
  },
  playerSensations: {
    cock:   60,
    desire: 50,
  },

  techniqueTarget: 8,
  skills: {
    partner:['servicing']
  },
  alignment: {
    submission: 1,
    masochism: 0,
    shame: 0,
  },
});
