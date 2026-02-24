SexAction.register('fuck-anus',{
  name: 'Ass Fucking',
  mainCategory: SexAction.MainCategory.sex,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.ass,
  description: `You'll fuck {T:name's} ass.`,

  requires:['P:has-cock'],

  consentTarget: 50,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.penetration },
    { type:'arousal' },
    { type:'gender' },
    { type:'preference', code:'anal-slut', scale:3 },
    { type:'preference', code:'cock-lover' },
    { type:'preference', code:'cum-dump' },
    { type:'preference', code:'submissive' },
    { type:'preference', code:'humiliation-slut' },
    { type:'preference', code:'dominant', conflicting:true },
    { type:'preference', code:'debaser', conflicting:true },
  ],

  sensations: {
    anus:       100,
    prostate:   100,
    anger:      40,
    comfort:    20,
    desire:     90,
    shame:      150,
    submission: 200,
    suffering:  100,
  },
  playerSensations: {
    cock:   100,
    desire: 90,
  },

  skills: {
    partner:['ravishing']
  },

});
