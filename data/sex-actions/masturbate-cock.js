SexAction.register('masturbate-cock',{
  name: 'Masturbate (Cock)',
  mainCategory: SexAction.MainCategory.performance,
  playerCategory: SexAction.PartCategory.none,
  partnerCategory: SexAction.PartCategory.cock,
  direction: ActionDirection.partnerToSelf,
  description: `{T:name} will masturbate for you while you watch.`,

  time: 1,
  playerStamina: -10,
  partnerStamina: 60,

  requires:['T:has-cock'],

  consentTarget: 30,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.performance },
    { type:'arousal', strength:1.5 },
    { type:'preference', code:'sensitive' },
    { type:'preference', code:'cock-slut' },
    { type:'preference', code:'humiliation-slut' },
    { type:'preference', code:'exhibitionist', scale:3 },
    { type:'preference', code:'masturbator', scale:3 },
  ],

  partnerSensations: {
    cock:       65,
    desire:     50,
    shame:      80,
    submission: 60,
  },
  playerSensations: {
    desire: 20
  },

  techniqueTarget: 7,
  skills: {
    partner:['performance'],
  },
  alignment: {
    submission: 1,
    masochism: 0,
    shame: 2,
  },

});
