SexAction.register('deep-kiss',{
  name: 'Deep Kiss',
  mainCategory: 'Foreplay',
  partCategory: 'Mouth',
  difficulty: 30,

  // A follow up action may require one or more persisted actions to be happening.
  availableWhile:['kiss'],

  persistPlayer:'mouth',
  persistPartner:'mouth',

  complementing: [],
  conflicting:   [],
});
