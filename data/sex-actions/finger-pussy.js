SexAction.register('finger-pussy',{
  name: 'Finger Pussy',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.pussy,
  description: `Fuck {T:name's} pussy with your fingers.`,

  requires:['T:has-pussy'],

  consentTarget: 28,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive', scale:1.5 },
    { type:'preference', code:'pussy-slut' },
  ],

  sensations: {
    clit:       40,
    pussy:      60,
    anger:      10,
    comfort:    30,
    desire:     80,
    shame:      50,
    submission: 40,
    suffering:  10,
  },
  playerSensations: {
    desire: 50
  },

});
