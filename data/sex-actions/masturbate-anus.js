SexAction.register('masturbate-anus',{
  name: 'Masturbate (Anus)',
  mainCategory: 'Performance',
  partCategory: 'Cock',
  description: `{T:name} will finger {T:his} asshole for you while you watch.`,

  // persistPartner:'anus',

  consentTarget: 50,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.performance },
    { type:'arousal', strength:1.5 },
    { type:'preference', code:'sensitive' },
    { type:'preference', code:'anal-slut' },
    { type:'preference', code:'humiliation-slut', scale:2.5 },
    { type:'preference', code:'exhibitionist', scale:3 },
    { type:'preference', code:'masturbator', scale:3 },
  ],

});
