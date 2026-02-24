SexAction.register('suck-pussy',{
  name: 'Eat Pussy',
  mainCategory: SexAction.MainCategory.giving,
  playerCategory: SexAction.PartCategory.mouth,
  partnerCategory: SexAction.PartCategory.pussy,
  description: `You'll eat {T:name's} pussy, focusing on sucking and licking {T:his} clit.`,

  requires:['T:has-pussy'],

  consentTarget: 17,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.reverseService },
    { type:'arousal', strength:3 },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive' },
    { type:'preference', code:'pussy-slut' },
    { type:'preference', code:'dominant' },
  ],

  sensations: {
    clit:    80,
    pussy:   20,
    comfort: 50,
    desire:  60,
    shame:   10,
  },
  playerSensations: {
    desire: 40
  },

});
