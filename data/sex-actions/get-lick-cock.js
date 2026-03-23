SexAction.register('get-lick-cock',{
  name: 'Cock Licking',
  persistedName: `Licking Your Cock`,
  mainCategory: SexAction.MainCategory.receiving,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.mouth,
  direction: ActionDirection.partnerToPlayer,
  description: `{T:name} will lick your cock.`,

  time: 1,
  playerStamina: 40,
  partnerStamina: 60,

  persist: { action:'get-lick-cock', revert:_nothing, when:Consent.willing },
  uses: {
    player: [TrainingSlot.cock],
    partner: [TrainingSlot.mouth],
  },

  consentTarget: 27,
  minimumConsent: Consent.reluctant,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.service },
    { type:'arousal', strength:0.4 },
    { type:'gender' },
    { type:'preference', code:'oral-slut', scale:3 },
    { type:'preference', code:'cock-lover', scale:3 },
    { type:'preference', code:'cum-dump', scale:3 },
    { type:'preference', code:'submissive' },
    { type:'preference', code:'dominant', conflicting:true },
  ],

  partnerSensations: {
    comfort:    10,
    desire:     40,
    shame:      50,
    submission: 70,
  },
  playerSensations: {
    cock:   70,
    desire: 60
  },

  techniqueTarget: 16,
  skills: {
    partner:['servicing']
  },
  orientation: {
    submission: 1,
    shame: 1,
  },
});
