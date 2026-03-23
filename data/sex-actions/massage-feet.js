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

  // Even though the characters are still touching, we can force the apart
  // position. Any other action would need to reposition anyway.

  forcePosition: {
    code: 'apart',
    clearPersisted: true,
  },
  uses: {
    player: [TrainingSlot.hands],
    partner: [],
  },

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
