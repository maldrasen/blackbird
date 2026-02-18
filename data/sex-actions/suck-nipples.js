SexAction.register('suck-nipples',{
  name: 'Suck Nipples',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.mouth,
  partnerCategory: SexAction.PartCategory.breasts,
  description: `You'll lick and suck on {T:name's} nipples.`,

  requires:['T:has-breasts'],

  consentTarget: 15,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.reverseService },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive' },
    { type:'preference', code:'breast-slut' },
  ],

});
