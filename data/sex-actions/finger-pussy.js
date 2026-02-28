SexAction.register('finger-pussy',{
  name: 'Finger Pussy',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.pussy,
  direction: ActionDirection.playerToPartner,
  description: `Fuck {T:name's} pussy with your fingers.`,

  time: 1,
  playerStamina: 40,
  partnerStamina: 60,

  requires:['T:has-pussy'],

  consentTarget: 28,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive', scale:1.5 },
    { type:'preference', code:'pussy-slut' },
  ],

  partnerSensations: {
    clit:       30,
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

  techniqueTarget: 14,
  alignment: {
    submission: 1,
    masochism: 0,
    shame: 1,
  },

});
