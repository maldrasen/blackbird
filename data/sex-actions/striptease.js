
// The Striptease action uses the dance skill, but it's not technically a
// dance, which allows non-dancers to earn some dancing skills. This action
// requires active participation from the partner so they can't be unwilling,
// and must be able to move.
SexAction.register('striptease',{
  name: 'Striptease',
  mainCategory: SexAction.MainCategory.performance,
  playerCategory: SexAction.PartCategory.none,
  partnerCategory: SexAction.PartCategory.none,
  direction: ActionDirection.partnerToPlayer,
  description: `{T:name} will sensually remove {T:his} clothes for your enjoyment.`,

  time: 5,
  playerStamina: -10,
  partnerStamina: 50,

  forcePosition: {
    code: 'apart',
    clearPersisted: true,
  },

  availableWhen:{
    conditions:['T:unbound','T:equipment.not-naked']
  },

  consentTarget: 10,
  minimumConsent: Consent.reluctant,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.performance },
    { type:'arousal', strength:1.5 },
    { type:'gender', scale:1.25 },
    { type:'preference', code:'exhibitionist', scale:3 },
    { type:'preference', code:'humiliation-slut' },
    { type:'preference', code:'submissive' },
  ],

  partnerSensations: {
    comfort:    10,
    desire:     20,
    shame:      60,
    submission: 40,
  },
  playerSensations: {
    desire: 10
  },

  techniqueTarget: 17,
  skills: {
    partner:['dance','performance']
  },
  orientation: {
    submission: 1,
    masochism: 0,
    shame: 2,
  },
});
