SexAction.register('deep-kiss',{
  name: 'Deep Kiss',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.mouth,
  partnerCategory: SexAction.PartCategory.mouth,
  direction: ActionDirection.mutual,
  description: `You and {T:name} will share a passionate kiss, thrusting your tongue deep into {T:his} mouth, while 
    {T:he} does the same.`,

  // A follow up action may require one or more persisted actions to be happening.
  // availableWhile:['kiss'],
  //
  // persistPlayer:'mouth',
  // persistPartner:'mouth',
  //
  // Personality
  // complementing: ['gentle personality'],
  // conflicting:   ['aggressive personality'],

  time: 1,
  playerStamina: 40,
  partnerStamina: 40,

  consentTarget: 30,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.emotional },
    { type:'arousal', strength:0.3 },
    { type:'gender' },
    { type:'preference', code:'oral-slut', scale:3 },
    { type:'preference', code:'affection-slut' },
    { type:'preference', code:'humiliation-slut', conflicting:true },
    { type:'preference', code:'debaser', conflicting:true },
  ],

  partnerSensations: {
    throat:     10,
    comfort:    20,
    desire:     40,
    shame:      10,
    submission: 10,
  },
  playerSensations: {
    throat: 10,
    desire: 40,
  },

  techniqueTarget: 12,
  alignment: {
    submission: 1,
    masochism: 0,
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

function tellUnwillingStory(result) { return `TODO: Unwilling Deep Kissing story.` }
function tellReluctantStory(result) { return `TODO: Reluctant Deep Kissing story.` }
function tellWillingStory(result) { return `TODO: Willing Deep Kissing story.` }
function tellEagerStory(result) { return `TODO: Eager Deep Kissing story.` }
