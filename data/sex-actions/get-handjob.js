SexAction.register('get-handjob',{
  name: 'Get Handjob',
  mainCategory: SexAction.MainCategory.receiving,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.hands,
  description: `{T:name} will jack off your cock.`,

  requires:['P:has-cock'],

  consentTarget: 25,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.service },
    { type:'arousal', strength:0.4 },
    { type:'gender' },
    { type:'preference', code:'cock-lover', scale:3 },
    { type:'preference', code:'submissive' },
    { type:'preference', code:'dominant', conflicting:true },
  ],

  sensations: {
    desire:     30,
    shame:      20,
    submission: 20,
  },
  playerSensations: {
    cock:   60,
    desire: 50,
  },

});
