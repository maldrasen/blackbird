SexAction.register('fondle-cock',{
  name: 'Fondle Cock',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.cock,
  direction: ActionDirection.playerToPartner,
  description: `Fondle and stroke {T:name's} cock.`,

  time: 1,
  playerStamina: 30,
  partnerStamina: 40,

  requires:['T:has-cock'],

  consentTarget: 15,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive', scale:1.5 },
    { type:'preference', code:'cock-slut' },
  ],

  partnerSensations: {
    cock:       60,
    comfort:    30,
    desire:     50,
    shame:      20,
    submission: 10,
  },
  playerSensations: {
    desire: 40
  },

  techniqueTarget: 8,
  alignment: {
    submission: 0,
    masochism: 0,
    shame: 1,
  },

});
