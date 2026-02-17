SexAction.register('get-cunnilingus',{
  name: 'Get Cunnilingus',
  mainCategory: 'Oral',
  playerCategory: 'Pussy',
  partnerCategory: 'Mouth',
  description: `{T:name} will eat your pussy.`,

  // persistPlayer: 'pussy',
  // persistPartner: 'mouth',
  //
  // skill:         'oral-sex',

  consentTarget: 30,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.service },
    { type:'arousal', strength:0.4 },
    { type:'gender' },
    { type:'preference', code:'oral-slut', scale:3 },
    { type:'preference', code:'pussy-lover', scale:3 },
    { type:'preference', code:'submissive' },
    { type:'preference', code:'dominant', conflicting:true },
  ],

});
