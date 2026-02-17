SexAction.register('massage-feet',{
  name: 'Massage Feet',
  mainCategory: 'Reverse Service',
  playerCategory: 'Hands',
  partnerCategory: 'Other',
  description: `You'll give {T:name} a relaxing foot massage.`,

  consentTarget: 0,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.reverseService },
    { type:'gender', scale:1.25 },
    { type:'preference', code:'affection-slut' },
    { type:'preference', code:'humiliation-slut', conflicting:true },
  ],

});
