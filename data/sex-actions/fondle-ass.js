SexAction.register('fondle-ass',{
  name: 'Fondle Ass',
  mainCategory: 'Foreplay',
  playerCategory: 'Hands',
  partnerCategory: 'Ass',
  description: `Fondle and squeeze {T:name's} ass.`,

  // persistPlayer: 'hands',

  consentTarget: 20,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive', scale:1.5 },
    { type:'preference', code:'anal-slut' },
  ],
});
