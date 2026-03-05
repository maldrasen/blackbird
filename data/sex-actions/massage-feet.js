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

  consentTarget: 0,
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

function tellUnwillingStory(result) { return `TODO: Unwilling Foot Massage story.` }
function tellReluctantStory(result) { return `TODO: Reluctant Foot Massage story.` }
function tellWillingStory(result) { return `TODO: Willing Foot Massage story.` }
function tellEagerStory(result) { return `TODO: Eager Foot Massage story.` }
