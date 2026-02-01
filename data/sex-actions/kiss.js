SexAction.register('kiss',{
  category: 'Foreplay',
  name: 'Kissing',

  // An action can persist body parts, such that if the next command issued doesn't involve these parts, the action
  // will persist on the next turn. An action could also just 'use' a body part, to release it from a previous action,
  // but won't repeat next round.
  //
  // The player and partner parts will also inform some kind of body configuration system. If the bodies are arranged
  // in a way that's impossible for the action to be performed, the body configuration should adjust to the new action,
  // releasing body parts as necessary rather than locking the people in place. For example, if two people are fucking
  // in the piled river position, and then they kiss, they have to then stop fucking. Body configuration will move them
  // to the nearist state that has mouth to mouth contact.
  persistPlayer:'mouth',
  persistPartner:'mouth',

  // Besides the obvious of needing the used or target parts sex acts can have different requirements.
  requires:[],


  // consent
  // Part of the sex action logic will be determining how the target will react to the action. The reaction can range
  // from refusal and fighting back to enthusiastic. The consent calculation will take a ton of different things into
  // consideration, mostly about sexual preferences and attitude towards the player.
  difficulty: 15,

  // By default, oral preferences will complement mouth actions. Other preferences won't be as straight forward, such
  // as a gentle personality preferring kissing, while an aggressive personality won't care for it.
  complementing: ['gentle personality'],
  conflicting:   ['aggressive personality'],

});
