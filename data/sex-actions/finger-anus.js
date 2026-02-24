SexAction.register('finger-anus',{
  name: 'Finger Anus',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.ass,
  description: `Fuck {T:name's} asshole with your fingers.`,

  consentTarget: 30,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive', scale:1.5 },
    { type:'preference', code:'anal-slut' },
  ],

  sensations: {
    anus:       60,
    prostate:   40,
    anger:      20,
    comfort:    20,
    desire:     80,
    shame:      100,
    submission: 100,
    suffering:  20,
  },
  playerSensations: {
    desire: 60
  },

  skills: {
    player:['servicing']
  },

});
