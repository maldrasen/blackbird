SexAction.register('deep-kiss',{
  name: 'Deep Kiss',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.mouth,
  partnerCategory: SexAction.PartCategory.mouth,
  description: `You and {T:name} will share a passionate kiss, thrusting your tongue deep into {T:his} mouth, while 
    {T:he} does the same.`,

  // A follow up action may require one or more persisted actions to be happening.
  // availableWhile:['kiss'],
  //
  // persistPlayer:'mouth',
  // persistPartner:'mouth',
  //
  // Personality
  // complementing: ['gentle personality'],
  // conflicting:   ['aggressive personality'],

  consentTarget: 30,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.emotional },
    { type:'arousal', strength:0.3 },
    { type:'gender' },
    { type:'preference', code:'oral-slut', scale:3 },
    { type:'preference', code:'affection-slut' },
    { type:'preference', code:'humiliation-slut', conflicting:true },
    { type:'preference', code:'debaser', conflicting:true },
  ],

  partnerSensations: {
    throat:     10,
    comfort:    20,
    desire:     40,
    shame:      10,
    submission: 10,
  },
  playerSensations: {
    throat: 10,
    desire: 40,
  },

  skills: {
    partner:['servicing'],
    player:['servicing'],
  },

});
