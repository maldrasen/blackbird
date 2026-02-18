SexAction.register('get-titfuck',{
  name: 'Get Handjob',
  mainCategory: SexAction.MainCategory.receiving,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.breasts,
  description: `{T:name} will squeeze your cock between {T:his} tits.`,

  requires:['P:has-cock','T:has-breasts'],

  consentTarget: 30,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.service },
    { type:'arousal', strength:0.4 },
    { type:'gender' },
    { type:'preference', code:'cock-lover', scale:3 },
    { type:'preference', code:'submissive' },
    { type:'preference', code:'dominant', conflicting:true },
  ],

});
