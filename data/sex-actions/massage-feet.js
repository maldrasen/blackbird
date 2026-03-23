SexAction.register('massage-feet',{
  name: 'Massage Feet',
  mainCategory: SexAction.MainCategory.giving,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.none,
  direction: ActionDirection.playerToPartner,
  description: `You'll give {T:name} a relaxing foot massage.`,

  time: 10,
  playerStamina: 50,
  partnerStamina: -60,

  uses: {
    player: [TrainingSlot.hands],
    partner: [],
  },

  // TODO: Stop all the other persisted actions.

  // TODO: Like the massage-back action there isn't enough information in the
  //   'uses' property for the position system to know that the player needs to
  //   be able to reach the partner's feet. Not sure how to implement that
  //   other than a list of valid positions for this action.

  consentTarget: 0,
  minimumConsent: Consent.reluctant,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.reverseService },
    { type:'gender', scale:1.25 },
    { type:'preference', code:'affection-slut' },
    { type:'preference', code:'humiliation-slut', conflicting:true },
    { type:'preference', code:'masochistic', conflicting:true },
  ],

  partnerSensations: {
    comfort:    40,
    desire:     15,
    shame:      5,
  },
  playerSensations: {
    desire: 10
  },

  techniqueTarget: 11,
  orientation: {
    submission: 0,
    masochism: -1,
    shame: 0,
  },
});
