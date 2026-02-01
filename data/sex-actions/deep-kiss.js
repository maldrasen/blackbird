SexAction.register('deep-kiss',{
  category: 'Foreplay',
  name: 'Deep Kissing',

  // A follow up action may require one or more persisted actions to be happening.
  while:['kiss'],

  persistPlayer:'mouth',
  persistPartner:'mouth',

  difficulty: 30,
  complementing: [],
  conflicting:   [],



});
