SexAction.register('fondle-breasts',{
  name: 'Fondle Breasts',
  mainCategory: 'Foreplay',
  partCategory: 'Breasts',

  // persistPlayer: 'hands',
  // persistPartner: 'breasts',

  consentTarget: 15,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', strength:0.5 },
  ],

});
