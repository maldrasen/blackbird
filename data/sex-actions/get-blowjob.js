SexAction.register('get-blowjob',{
  name: 'Get Blowjob',
  mainCategory: SexAction.MainCategory.receiving,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.mouth,
  description: `{T:name} will suck your cock.`,

  requires:['P:has-cock'],

  // persistPlayer: 'cock',
  // persistPartner: 'mouth',
  //
  // requirements:["check to see if partner can fit player's cock in mouth"],
  //
  // skill:         'oral-sex',

  consentTarget: 35,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.service },
    { type:'arousal', strength:0.4 },
    { type:'gender' },
    { type:'preference', code:'oral-slut', scale:3 },
    { type:'preference', code:'cock-lover', scale:3 },
    { type:'preference', code:'cum-dump', scale:3 },
    { type:'preference', code:'submissive' },
    { type:'preference', code:'dominant', conflicting:true },
  ],

  sensations: {
    throat:     20,
    comfort:    10,
    desire:     40,
    shame:      60,
    submission: 80,
    suffering:  40,
  },
  playerSensations: {
    cock:   80,
    desire: 70
  },

  skills: {
    partner:['servicing']
  },

});
