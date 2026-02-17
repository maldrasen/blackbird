SexAction.register('massage-back',{
  name: 'Massage Back',
  mainCategory: 'Reverse Service',
  playerCategory: 'Hands',
  partnerCategory: 'Other',
  description: `You'll give {T:name} a relaxing back massage.`,

  consentTarget: 5,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.reverseService },
    { type:'gender', scale:1.25 },
    { type:'preference', code:'affection-slut' },
    { type:'preference', code:'humiliation-slut', conflicting:true },
  ],

});
