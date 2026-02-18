SexAction.register('fondle-pussy',{
  name: 'Fondle Pussy',
  mainCategory: 'Foreplay',
  playerCategory: 'Hands',
  partnerCategory: 'Pussy',
  description: `Fondle and rub {T:name's} clit and pussy.`,

  requires:['T:has-pussy'],

  consentTarget: 25,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive', scale:1.5 },
    { type:'preference', code:'pussy-slut' },
  ],

});
