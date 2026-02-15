SexAction.register('get-blowjob',{
  name: 'Get Blowjob',
  mainCategory: 'Oral',
  partCategory: 'Cock',

  // persistPlayer: 'cock',
  // persistPartner: 'mouth',
  //
  // requirements:["check to see if partner can fit player's cock in mouth"],
  //
  // complementing: ['cum-dump'],
  // conflicting:   ['dominant'],
  // skill:         'oral-sex',

  consentTarget: 35,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.service },
  ],

});
