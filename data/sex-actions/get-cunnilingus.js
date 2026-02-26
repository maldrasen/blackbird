SexAction.register('get-cunnilingus',{
  name: 'Get Cunnilingus',
  mainCategory: SexAction.MainCategory.receiving,
  playerCategory: SexAction.PartCategory.pussy,
  partnerCategory: SexAction.PartCategory.mouth,
  description: `{T:name} will eat your pussy.`,

  time: 1,
  playerStamina: 60,
  partnerStamina: 70,

  requires:['P:has-pussy'],

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

  partnerSensations: {
    comfort:    15,
    desire:     40,
    shame:      50,
    submission: 70,
    suffering:  20,
  },
  playerSensations: {
    clit:   80,
    pussy:  20,
    desire: 60,
  },

  techniqueTarget: 22,
  skills: {
    partner:['servicing']
  },

});
