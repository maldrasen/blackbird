SexAction.register('fondle-breasts',{
  name: 'Fondle Breasts',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.breasts,
  description: `Fondle and squeeze {T:name's} breasts.`,

  // persistPlayer: 'hands',
  // persistPartner: 'breasts',

  requires:['T:has-breasts'],

  consentTarget: 15,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive', scale:1.5 },
    { type:'preference', code:'breast-slut' },
  ],

  sensations: {
    nipple:     30,
    comfort:    20,
    desire:     30,
    shame:      10,
    submission: 10,
  },
  playerSensations: {
    desire: 30
  },

});
