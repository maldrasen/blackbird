SexAction.register('kiss',{
  name: 'Kissing',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.mouth,
  partnerCategory: SexAction.PartCategory.mouth,
  description: `You and {T:name} will share an intimate kiss.`,

  // An action can persist body parts, such that if the next command issued doesn't involve these parts, the action
  // will persist on the next turn. An action could also just 'use' a body part, to release it from a previous action,
  // but won't repeat next round.
  //
  // The player and partner parts will also inform some kind of body configuration system. If the bodies are arranged
  // in a way that's impossible for the action to be performed, the body configuration should adjust to the new action,
  // releasing body parts as necessary rather than locking the people in place. For example, if two people are fucking
  // in the piled river position, and then they kiss, they have to then stop fucking. Body configuration will move them
  // to the nearist state that has mouth to mouth contact.
  // persistPlayer:'mouth',
  // persistPartner:'mouth',

  // Besides the obvious of needing the used or target parts sex acts can have different requirements.
  // requires:[],

  // By default, oral preferences will complement mouth actions. Other preferences won't be as straight forward, such
  // as a gentle personality preferring kissing, while an aggressive personality won't care for it.

  // complementing: ['affection-slut','oral-slut'],
  // conflicting:   ['humiliation-slut'],

  // complementing: ['gentle personality'],
  // conflicting:   ['aggressive personality'],

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

  sensations: {
    comfort:    30,
    desire:     20,
    shame:      5,
    submission: 5,
  },
  playerSensations: {
    desire: 15
  },

  skills: {
    partner:['servicing'],
    player:['servicing'],
  },


});
