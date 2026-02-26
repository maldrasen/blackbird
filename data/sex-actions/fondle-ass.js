SexAction.register('fondle-ass',{
  name: 'Fondle Ass',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.ass,
  direction: ActionDirection.playerToPartner,
  description: `Fondle and squeeze {T:name's} ass.`,

  time: 1,
  playerStamina: 30,
  partnerStamina: 30,

  consentTarget: 20,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive', scale:1.5 },
    { type:'preference', code:'anal-slut' },
  ],

  partnerSensations: {
    anus:       10,
    comfort:    10,
    desire:     30,
    shame:      10,
    submission: 10
  },
  playerSensations: {
    desire: 30,
  },

  techniqueTarget: 6,
  skills: {},

});
