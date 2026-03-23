SexAction.register('get-blowjob',{
  name: 'Get Blowjob',
  persistedName: `Sucking Your Cock`,
  mainCategory: SexAction.MainCategory.receiving,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.mouth,
  direction: ActionDirection.partnerToPlayer,
  description: `{T:name} will suck your cock.`,

  time: 1,
  playerStamina: 60,
  partnerStamina: 80,

  alignment: SexAlignment.getOral(TrainingSlot.cock),
  persist: { action:'get-blowjob', revert:'get-lick-cock', when:Consent.willing },
  penetration: { player:'cock', partner:'mouth' },

  consentTarget: 35,
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
    throat:     20,
    comfort:    10,
    desire:     40,
    shame:      60,
    submission: 80,
    suffering:  40,
  },
  playerSensations: {
    cock:   80,
    desire: 70
  },

  techniqueTarget: 22,
  skills: {
    partner:['servicing']
  },
  orientation: {
    submission: 2,
    masochism: 1,
    shame: 1,
  },
});
