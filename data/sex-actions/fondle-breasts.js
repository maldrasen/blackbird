SexAction.register('fondle-breasts',{
  name: 'Fondle Breasts',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.breasts,
  direction: ActionDirection.playerToPartner,
  description: `Fondle and squeeze {T:name's} breasts.`,

  time: 1,
  playerStamina: 30,
  partnerStamina: 30,

  requires:['T:has-breasts'],

  consentTarget: 15,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive', scale:1.5 },
    { type:'preference', code:'breast-slut' },
  ],

  partnerSensations: {
    nipple:     30,
    comfort:    20,
    desire:     30,
    shame:      10,
    submission: 10,
  },
  playerSensations: {
    desire: 30
  },

  techniqueTarget: 6,
  alignment: {
    submission: 0,
    masochism: 0,
    shame: 1,
  },

});
