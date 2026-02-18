SexAction.register('fondle-cock',{
  name: 'Fondle Cock',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.cock,
  description: `Fondle and stroke {T:name's} cock.`,

  requires:['T:has-cock'],

  consentTarget: 15,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive', scale:1.5 },
    { type:'preference', code:'cock-slut' },
  ],

});
