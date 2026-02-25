SexAction.register('striptease',{
  name: 'Striptease',
  mainCategory: SexAction.MainCategory.performance,
  playerCategory: SexAction.PartCategory.none,
  partnerCategory: SexAction.PartCategory.none,
  description: `{T:name} will sensually remove {T:his} clothes for your enjoyment.`,

  // TODO: Dancing requirements. Is this a skill that needs to be learned? Is this even a 'dance'?

  consentTarget: 10,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.performance },
    { type:'arousal', strength:1.5 },
    { type:'gender', scale:1.25 },
    { type:'preference', code:'exhibitionist', scale:3 },
    { type:'preference', code:'humiliation-slut' },
    { type:'preference', code:'submissive' },
  ],

  partnerSensations: {
    comfort:    10,
    desire:     20,
    shame:      40,
    submission: 30,
  },
  playerSensations: {
    desire: 25
  },

  skills: {
    partner:['dance','performance']
  },

});
