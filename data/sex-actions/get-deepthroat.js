SexAction.register('get-deepthroat',{
  category: 'Oral',
  name: 'Get Deepthroated',
  difficulty: 80,

  // A follow up action may require one or more persisted actions to be happening.
  while:['get-blowjob'],

  persistPlayer:'cock',
  persistPartner:'mouth',

  requirements:["check to see if partner can fit player's cock in mouth","and throat"],

  complementing: ['cum-dump','masochistic','breath-player'],
  conflicting:   ['dominant'],
  skill:         'oral-sex',
});
