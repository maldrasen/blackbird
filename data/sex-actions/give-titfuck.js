// Currently the only give action? The sex action naming convention is
// "verb-part", but there's not really an associated verb that means to rub
// something with your tits. puff puff maybe?

SexAction.register('give-titfuck',{
  name: 'Give Titfuck',
  mainCategory: SexAction.MainCategory.giving,
  playerCategory: SexAction.PartCategory.breasts,
  partnerCategory: SexAction.PartCategory.cock,
  description: `You'll rub and squeeze {T:name's} cock between your tits.`,

  requires:['P:has-breasts','T:has-cock'],

  consentTarget: 10,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.reverseService },
    { type:'arousal' },
    { type:'gender' },
    { type:'preference', code:'breast-lover', scale:3 },
    { type:'preference', code:'dominant' },
  ],

  partnerSensations: {
    cock:    50,
    comfort: 40,
    desire:  80,
    shame:   20,
  },
  playerSensations: {
    nipple: 20,
    desire: 40,
  },

  skills: {
    player:['servicing']
  },

});
