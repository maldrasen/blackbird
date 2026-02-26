SexAction.register('masturbate-pussy',{
  name: 'Masturbate (Pussy)',
  mainCategory: SexAction.MainCategory.performance,
  playerCategory: SexAction.PartCategory.none,
  partnerCategory: SexAction.PartCategory.pussy,
  description: `{T:name} will masturbate for you while you watch.`,

  time: 1,
  playerStamina: -10,
  partnerStamina: 60,

  requires:['T:has-pussy'],

  consentTarget: 35,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.performance },
    { type:'arousal', strength:1.5 },
    { type:'preference', code:'sensitive' },
    { type:'preference', code:'pussy-slut' },
    { type:'preference', code:'humiliation-slut' },
    { type:'preference', code:'exhibitionist', scale:3 },
    { type:'preference', code:'masturbator', scale:3 },
  ],

  partnerSensations: {
    clit:       60,
    pussy:      50,
    desire:     40,
    shame:      60,
    submission: 80,
  },
  playerSensations: {
    desire: 20
  },

  techniqueTarget: 9,
  skills: {
    partner:['performance','technique'],
  },

});
