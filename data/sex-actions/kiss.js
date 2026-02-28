SexAction.register('kiss',{
  name: 'Kissing',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.mouth,
  partnerCategory: SexAction.PartCategory.mouth,
  direction: ActionDirection.mutual,
  description: `You and {T:name} will share an intimate kiss.`,

  time: 1,
  playerStamina: 30,
  partnerStamina: 30,

  consentTarget: 15,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.emotional },
    { type:'arousal', strength:0.2 },
    { type:'gender' },
    { type:'preference', code:'oral-slut', scale:3 },
    { type:'preference', code:'affection-slut' },
    { type:'preference', code:'humiliation-slut', conflicting:true },
    { type:'preference', code:'debaser', conflicting:true },
    { type:'preference', code:'sadist', conflicting:true },
  ],

  partnerSensations: {
    comfort:    30,
    desire:     20,
    shame:      5,
    submission: 5,
  },
  playerSensations: {
    desire: 15
  },

  techniqueTarget: 10,
  alignment: {
    submission: 0,
    masochism: 0,
    shame: 0,
  },

});
