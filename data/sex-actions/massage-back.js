SexAction.register('massage-back',{
  name: 'Massage Back',
  mainCategory: SexAction.MainCategory.giving,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.none,
  description: `You'll give {T:name} a relaxing back massage.`,

  consentTarget: 5,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.reverseService },
    { type:'gender', scale:1.25 },
    { type:'preference', code:'affection-slut' },
    { type:'preference', code:'humiliation-slut', conflicting:true },
  ],

  sensations: {
    comfort:    30,
    desire:     10,
    shame:      5,
  },
  playerSensations: {
    desire: 10
  },

  skills: {
    player:['servicing']
  },

});
