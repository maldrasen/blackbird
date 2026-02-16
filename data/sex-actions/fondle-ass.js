SexAction.register('fondle-ass',{
  name: 'Fondle Ass',
  mainCategory: 'Foreplay',
  partCategory: 'Ass',

  // persistPlayer: 'hands',

  consentTarget: 20,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
  ],


});
