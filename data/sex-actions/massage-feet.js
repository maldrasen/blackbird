SexAction.register('massage-feet',{
  name: 'Massage Feet',
  mainCategory: SexAction.MainCategory.giving,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.none,
  description: `You'll give {T:name} a relaxing foot massage.`,

  consentTarget: 0,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.reverseService },
    { type:'gender', scale:1.25 },
    { type:'preference', code:'affection-slut' },
    { type:'preference', code:'humiliation-slut', conflicting:true },
  ],

  sensations: {
    comfort:    25,
    desire:     15,
    shame:      5,
  },
  playerSensations: {
    desire: 10
  },

  skills: {
    player:['servicing']
  },

});
