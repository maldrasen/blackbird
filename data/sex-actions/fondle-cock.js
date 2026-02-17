SexAction.register('fondle-cock',{
  name: 'Fondle Cock',
  mainCategory: 'Foreplay',
  playerCategory: 'Hands',
  partnerCategory: 'Cock',
  description: `Fondle and stroke {T:name's} cock.`,

  consentTarget: 15,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive', scale:1.5 },
    { type:'preference', code:'cock-slut' },
  ],

});
