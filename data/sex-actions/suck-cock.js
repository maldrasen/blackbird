SexAction.register('suck-cock',{
  name: 'Suck Cock',
  mainCategory: SexAction.MainCategory.giving,
  playerCategory: SexAction.PartCategory.mouth,
  partnerCategory: SexAction.PartCategory.cock,
  description: `You'll suck {T:name's} cock.`,

  requires:['T:has-cock'],

  consentTarget: 17,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.reverseService },
    { type:'arousal', strength:3 },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive' },
    { type:'preference', code:'cock-slut' },
    { type:'preference', code:'dominant' },
  ],

  sensations: {
    cock:    80,
    comfort: 50,
    desire:  70,
    shame:   10,
  },
  playerSensations: {
    throat: 20,
    desire: 40,
  },

});
