SexAction.register('massage-back',{
  name: 'Massage Back',
  mainCategory: SexAction.MainCategory.giving,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.none,
  direction: ActionDirection.playerToPartner,
  description: `You'll give {T:name} a relaxing back massage.`,

  time: 10,
  playerStamina: 50,
  partnerStamina: -80,

  // TODO: Stop all the other persisted actions.

  // TODO: The slot connectivity with this action isn't enough to force the
  //   correct sex position. We'll need a way to let the position system know
  //   that the partner's back should be to the player and within reach somehow.

  // TODO: There should be some follow up actions like an ass massage or a
  //   "turn-over" event that could build a large amount of lust in
  //   anticipation. These actions would need to use the previousAction
  //   availableWhen property because this doesn't persist anything.

  uses: {
    player: [TrainingSlot.hands],
    partner: [],
  },

  consentTarget: 5,
  minimumConsent: Consent.reluctant,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.reverseService },
    { type:'gender', scale:1.25 },
    { type:'preference', code:'affection-slut' },
    { type:'preference', code:'humiliation-slut', conflicting:true },
    { type:'preference', code:'masochistic', conflicting:true },
  ],

  partnerSensations: {
    comfort:    50,
    desire:     10,
    shame:      5,
  },
  playerSensations: {
    desire: 10
  },

  techniqueTarget: 12,
  orientation: {
    submission: 0,
    masochism: -1,
    shame: 0,
  },
});
