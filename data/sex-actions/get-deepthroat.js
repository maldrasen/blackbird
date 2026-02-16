SexAction.register('get-deepthroat',{
  name: 'Get Deepthroated',
  mainCategory: 'Oral',
  partCategory: 'Cock',

  // A follow-up action may require one or more persisted actions to be happening.
  // while:['get-blowjob'],
  //
  // persistPlayer:'cock',
  // persistPartner:'mouth',
  //
  // requirements:["check to see if partner can fit player's cock in mouth","and throat"],
  //
  // complementing: ['cum-dump','masochistic','breath-player'],
  // conflicting:   ['dominant'],
  // skill:         'oral-sex',

  consentTarget: 80,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.roughService },
    { type:'arousal', strength:0.4 },
  ],

});
