SexAction.register('fondle-breasts',{
  name: 'Fondle Breasts',
  mainCategory: 'Foreplay',
  playerCategory: 'Hands',
  partnerCategory: 'Breasts',
  description: `Fondle and squeeze {T:name's} breasts.`,

  // persistPlayer: 'hands',
  // persistPartner: 'breasts',

  consentTarget: 15,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive', scale:1.5 },
    { type:'preference', code:'breast-slut' },
  ],

});
