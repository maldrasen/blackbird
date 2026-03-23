SexAction.register('frottage',{
  name: 'Frottage',
  persistedName: `Rubbing Your Cocks Together`,
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.cock,
  direction: ActionDirection.mutual,
  description: `You and {T:name} will rub your cocks together.`,

  time: 1,
  playerStamina: 60,
  partnerStamina: 60,

  alignment: SexAlignment.frottage(),
  persist: { action:'frottage' },

  consentTarget: 17,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender' },
    { type:'preference', code:'cock-slut' },
    { type:'preference', code:'cock-lover' },
  ],

  partnerSensations: {
    cock:       60,
    comfort:    30,
    desire:     60,
    shame:      30,
    submission: 15,
  },
  playerSensations: {
    cock:   60,
    desire: 60
  },

  techniqueTarget: 9,
  orientation: {
    submission: 0,
    masochism: 0,
    shame: 1,
  },
});
