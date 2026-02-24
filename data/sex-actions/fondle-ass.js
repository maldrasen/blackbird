SexAction.register('fondle-ass',{
  name: 'Fondle Ass',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.ass,
  description: `Fondle and squeeze {T:name's} ass.`,

  // persistPlayer: 'hands',

  consentTarget: 20,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive', scale:1.5 },
    { type:'preference', code:'anal-slut' },
  ],

  sensations: {
    anus:       10,
    comfort:    10,
    desire:     30,
    shame:      10,
    submission: 10
  },
  playerSensations: {
    desire: 30,
  },

  skills: {
    player:['servicing']
  },

});
