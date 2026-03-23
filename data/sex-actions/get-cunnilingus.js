SexAction.register('get-cunnilingus',{
  name: 'Get Cunnilingus',
  persistedName: `Eating Your Pussy`,
  mainCategory: SexAction.MainCategory.receiving,
  playerCategory: SexAction.PartCategory.pussy,
  partnerCategory: SexAction.PartCategory.mouth,
  direction: ActionDirection.partnerToPlayer,
  description: `{T:name} will eat your pussy.`,

  time: 1,
  playerStamina: 60,
  partnerStamina: 70,

  alignment: SexAlignment.getOral(TrainingSlot.pussy),
  persist: { action:'get-cunnilingus', revert:_nothing, when:Consent.reluctant },

  consentTarget: 30,
  minimumConsent: Consent.reluctant,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.service },
    { type:'arousal', strength:0.4 },
    { type:'gender' },
    { type:'preference', code:'oral-slut', scale:3 },
    { type:'preference', code:'pussy-lover', scale:3 },
    { type:'preference', code:'submissive' },
    { type:'preference', code:'dominant', conflicting:true },
  ],

  partnerSensations: {
    comfort:    15,
    desire:     40,
    shame:      50,
    submission: 70,
    suffering:  20,
  },
  playerSensations: {
    clit:   80,
    pussy:  20,
    desire: 60,
  },

  techniqueTarget: 22,
  skills: {
    partner:['servicing']
  },
  orientation: {
    submission: 2,
    masochism: 0,
    shame: 1,
  },
});
