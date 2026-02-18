SexAction.register('suck-cock',{
  name: 'Suck Cock',
  mainCategory: 'Reverse Service',
  playerCategory: 'Mouth',
  partnerCategory: 'Cock',
  description: `You'll suck {T:name's} cock.`,

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

});
