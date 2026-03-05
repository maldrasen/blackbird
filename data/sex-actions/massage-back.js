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

  consentTarget: 5,
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

  storyTeller: result => { return tellStory(result); },
});

function tellStory(result) {
  const consent = result.getConsent().getConsent();
  if (consent === Consent.unwilling) { tellUnwillingStory(result); }
  if (consent === Consent.reluctant) { tellReluctantStory(result); }
  if (consent === Consent.willing) { tellWillingStory(result); }
  if (consent === Consent.eager) { tellEagerStory(result); }
}

function tellUnwillingStory(result) { return `TODO: Unwilling Back Massage story.` }
function tellReluctantStory(result) { return `TODO: Reluctant Back Massage story.` }
function tellWillingStory(result) { return `TODO: Willing Back Massage story.` }
function tellEagerStory(result) { return `TODO: Eager Back Massage story.` }
