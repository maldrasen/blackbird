SexAction.register('masturbate-pussy',{
  name: 'Masturbate (Pussy)',
  mainCategory: 'Performance',
  playerCategory: 'Watch',
  partnerCategory: 'Pussy',
  description: `{T:name} will masturbate for you while you watch.`,

  // persistPartner:'pussy',

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

});
