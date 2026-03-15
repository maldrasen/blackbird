
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

  // TODO: Rework action requirements as four arrays. We'll include the
  //   show/hide and disable/enable arrays in order to give the conditions
  //   more logical names. (hideWhen isNaked is better than showWhen
  //   isNotNaked) Disable/Enable should disable the actions, but they should
  //   still be visible, giving show/hide a higher priority.

  showWhen: [],
  hideWhen: ['partner.isNaked'],
  disableWhen: ['consent.unwilling'],
  enableWhen: ['partner.canMove'],

  consentTarget: 10,
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
  alignment: {
    submission: 1,
    masochism: 0,
    shame: 2,
  },
});
