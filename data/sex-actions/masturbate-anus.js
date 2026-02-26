SexAction.register('masturbate-anus',{
  name: 'Masturbate (Anus)',
  mainCategory: SexAction.MainCategory.performance,
  playerCategory: SexAction.PartCategory.none,
  partnerCategory: SexAction.PartCategory.ass,
  description: `{T:name} will finger {T:his} asshole for you while you watch.`,

  time: 1,
  playerStamina: -10,
  partnerStamina: 70,

  consentTarget: 45,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.performance },
    { type:'arousal', strength:1.5 },
    { type:'preference', code:'sensitive' },
    { type:'preference', code:'anal-slut' },
    { type:'preference', code:'humiliation-slut', scale:2.5 },
    { type:'preference', code:'exhibitionist', scale:3 },
    { type:'preference', code:'masturbator', scale:3 },
  ],

  partnerSensations: {
    anus:       70,
    prostate:   20,
    anger:      10,
    desire:     30,
    shame:      120,
    submission: 120,
  },
  playerSensations: {
    desire: 40
  },

  techniqueTarget: 13,
  skills: {
    partner:['performance','technique'],
  },

});
