SexAction.register('get-deepthroat',{
  name: 'Get Deepthroated',
  mainCategory: 'Oral',
  playerCategory: 'Cock',
  partnerCategory: 'Mouth',
  description: `{T:name} will try and deepthroat your cock, taking it as deep as {T:he} can.`,

  // A follow-up action may require one or more persisted actions to be happening.
  // while:['get-blowjob'],
  //
  // persistPlayer:'cock',
  // persistPartner:'mouth',
  //
  // requirements:["check to see if partner can fit player's cock in mouth","and throat"],
  //
  // skill:         'oral-sex',

  consentTarget: 80,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.roughService },
    { type:'arousal', strength:0.4 },
    { type:'gender' },
    { type:'preference', code:'oral-slut', scale:3 },
    { type:'preference', code:'cock-lover', scale:3 },
    { type:'preference', code:'cum-dump', scale:3 },
    { type:'preference', code:'breath-player' },
    { type:'preference', code:'submissive' },
    { type:'preference', code:'masochistic' },
    { type:'preference', code:'sadist', conflicting:true },
    { type:'preference', code:'dominant', conflicting:true },
  ],

});
