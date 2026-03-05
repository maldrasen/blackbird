SexAction.register('get-handjob',{
  name: 'Get Handjob',
  mainCategory: SexAction.MainCategory.receiving,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.hands,
  direction: ActionDirection.partnerToPlayer,
  description: `{T:name} will jack off your cock.`,

  time: 1,
  playerStamina: 60,
  partnerStamina: 50,

  requires:['P:has-cock'],

  consentTarget: 25,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.service },
    { type:'arousal', strength:0.4 },
    { type:'gender' },
    { type:'preference', code:'cock-lover', scale:3 },
    { type:'preference', code:'submissive' },
    { type:'preference', code:'dominant', conflicting:true },
  ],

  partnerSensations: {
    desire:     30,
    shame:      20,
    submission: 20,
  },
  playerSensations: {
    cock:   60,
    desire: 50,
  },

  techniqueTarget: 8,
  skills: {
    partner:['servicing']
  },
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

function tellUnwillingStory(result) { return `TODO: Unwilling Handjob story.` }
function tellReluctantStory(result) { return `TODO: Reluctant Handjob story.` }
function tellWillingStory(result) { return `TODO: Willing Handjob story.` }
function tellEagerStory(result) { return `TODO: Eager Handjob story.` }
