SexAction.register('masturbate-cock',{
  name: 'Masturbate (Cock)',
  mainCategory: 'Performance',
  playerCategory: 'Watch',
  partnerCategory: 'Cock',
  description: `{T:name} will masturbate for you while you watch.`,

  // persistPartner:'cock',

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

});
