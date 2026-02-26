SexAction.register('suck-cock',{
  name: 'Suck Cock',
  mainCategory: SexAction.MainCategory.giving,
  playerCategory: SexAction.PartCategory.mouth,
  partnerCategory: SexAction.PartCategory.cock,
  direction: ActionDirection.playerToPartner,
  description: `You'll suck {T:name's} cock.`,

  time: 1,
  playerStamina: 80,
  partnerStamina: 60,

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

  partnerSensations: {
    cock:    80,
    comfort: 50,
    desire:  70,
    shame:   10,
  },
  playerSensations: {
    throat: 20,
    desire: 40,
  },

  techniqueTarget: 22,
  skills: {
    player:['servicing']
  },

});
