SexAction.register('get-rimming',{
  name: 'Get Rimming',
  mainCategory: SexAction.MainCategory.receiving,
  playerCategory: SexAction.PartCategory.ass,
  partnerCategory: SexAction.PartCategory.mouth,
  description: `{T:name} will eat your ass.`,

  consentTarget: 40,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.service },
    { type:'arousal', strength:0.4 },
    { type:'gender' },
    { type:'preference', code:'oral-slut', scale:3 },
    { type:'preference', code:'ass-lover', scale:3 },
    { type:'preference', code:'submissive' },
    { type:'preference', code:'humiliation-slut' },
    { type:'preference', code:'debaser', conflicting:true },
    { type:'preference', code:'dominant', conflicting:true },
  ],

  sensations: {
    anger:      10,
    desire:     40,
    shame:      80,
    submission: 120,
    suffering:  20,
  },
  playerSensations: {
    anus:   80,
    desire: 60
  },

  skills: {
    partner:['servicing']
  },

});
