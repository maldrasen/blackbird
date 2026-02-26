SexAction.register('massage-feet',{
  name: 'Massage Feet',
  mainCategory: SexAction.MainCategory.giving,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.none,
  direction: ActionDirection.playerToPartner,
  description: `You'll give {T:name} a relaxing foot massage.`,

  time: 10,
  playerStamina: 50,
  partnerStamina: -60,

  consentTarget: 0,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.reverseService },
    { type:'gender', scale:1.25 },
    { type:'preference', code:'affection-slut' },
    { type:'preference', code:'humiliation-slut', conflicting:true },
  ],

  partnerSensations: {
    comfort:    25,
    desire:     15,
    shame:      5,
  },
  playerSensations: {
    desire: 10
  },

  techniqueTarget: 11,
  skills: {},

});
