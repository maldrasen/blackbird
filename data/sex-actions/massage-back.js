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

});
