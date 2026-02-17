SexAction.register('suck-nipples',{
  name: 'Suck Nipples',
  mainCategory: 'Foreplay',
  playerCategory: 'Mouth',
  partnerCategory: 'Breasts',
  description: `You'll lick and suck on {T:name's} nipples.`,

  consentTarget: 15,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.reverseService },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive' },
    { type:'preference', code:'breast-slut' },
  ],

});
