SexAction.register('fondle-pussy',{
  name: 'Fondle Pussy',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.pussy,
  description: `Fondle and rub {T:name's} clit and pussy.`,

  time: 1,
  playerStamina: 30,
  partnerStamina: 40,

  requires:['T:has-pussy'],

  consentTarget: 25,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive', scale:1.5 },
    { type:'preference', code:'pussy-slut' },
  ],

  partnerSensations: {
    clit:       50,
    pussy:      25,
    comfort:    30,
    desire:     50,
    shame:      20,
    submission: 10,
  },
  playerSensations: {
    desire: 40
  },

  techniqueTarget: 10,
  skills: {
    player:['servicing']
  },

});
