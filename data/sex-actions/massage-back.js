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

  // Giving a massage uses the TrainingSlot.all array because starting a
  // massage action should stop all the other persisted actions. This does not
  // persist an action, but should have follow on actions based on this action
  // being a previous action.

  // TODO: The persistence here is kind of odd. The massage actions shouldn't
  //   persist the massage as an action, but there should be some kind of
  //   after-massage mode where we could follow a massage up with an ass
  //   massage or a turn-over event that could be followed on by a handjob.
  //   I think to make that happen the "availableWhen" property needs to be
  //   able to look at the previous action, not just persisted states. These
  //   follow on actions would only be available for a single round though, so
  //   they should somehow be flagged as limited time actions.

  uses: {
    player: TrainingSlot.all,
    partner: [],
  },

  // TODO: The slot connectivity with this action isn't enough to force the
  //   correct sex position. We'll need a way to let the position system know
  //   that the partner's back should be to the player and within reach somehow.

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
  alignment: {
    submission: 0,
    masochism: -1,
    shame: 0,
  },
});
