SexAction.register('fuck-pussy',{
  name: 'Pussy Fucking',
  mainCategory: SexAction.MainCategory.sex,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.pussy,
  direction: ActionDirection.playerToPartner,
  description: `You'll fuck {T:name's} pussy.`,

  time: 2,
  playerStamina: 100,
  partnerStamina: 100,

  requires:['P:has-cock','T:has-pussy'],

  consentTarget: 45,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.penetration },
    { type:'arousal' },
    { type:'gender' },
    { type:'preference', code:'pussy-slut', scale:3 },
    { type:'preference', code:'cock-lover' },
    { type:'preference', code:'cum-dump' },
    { type:'preference', code:'submissive' },
    { type:'preference', code:'humiliation-slut' },
    { type:'preference', code:'dominant', conflicting:true },
    { type:'preference', code:'debaser', conflicting:true },
  ],

  partnerSensations: {
    clit:       35,
    pussy:      100,
    anger:      20,
    comfort:    40,
    desire:     100,
    shame:      80,
    submission: 80,
    suffering:  40,
  },
  playerSensations: {
    cock:   100,
    desire: 80
  },

  techniqueTarget: 18,
  skills: {
    player:['ravishing']
  },
  alignment: {
    submission: 2,
    masochism: 0,
    shame: 1,
  },

});
