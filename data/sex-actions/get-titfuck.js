SexAction.register('get-titfuck',{
  name: 'Get Titfuck',
  mainCategory: SexAction.MainCategory.receiving,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.breasts,
  description: `{T:name} will squeeze your cock between {T:his} tits.`,

  requires:['P:has-cock','T:has-breasts'],

  consentTarget: 30,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.service },
    { type:'arousal', strength:0.4 },
    { type:'gender' },
    { type:'preference', code:'cock-lover', scale:3 },
    { type:'preference', code:'submissive' },
    { type:'preference', code:'dominant', conflicting:true },
  ],

  sensations: {
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

  skills: {
    partner:['servicing']
  },

});
