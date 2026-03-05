SexAction.register('get-titfuck',{
  name: 'Get Titfuck',
  mainCategory: SexAction.MainCategory.receiving,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.breasts,
  direction: ActionDirection.partnerToPlayer,
  description: `{T:name} will squeeze your cock between {T:his} tits.`,

  time: 1,
  playerStamina: 30,
  partnerStamina: 60,

  requires:['P:has-cock','T:has-breasts'],

  consentTarget: 30,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.service },
    { type:'arousal', strength:0.4 },
    { type:'gender' },
    { type:'preference', code:'cock-lover', scale:3 },
    { type:'preference', code:'submissive' },
    { type:'preference', code:'dominant', conflicting:true },
  ],

  partnerSensations: {
    nipple:     20,
    comfort:    10,
    desire:     40,
    shame:      60,
    submission: 80,
    suffering:  10,
  },
  playerSensations: {
    cock:   50,
    desire: 80,
  },

  techniqueTarget: 14,
  skills: {
    partner:['servicing']
  },
  alignment: {
    submission: 2,
    masochism: 0,
    shame: 1,
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

function tellUnwillingStory(result) { return `TODO: Unwilling Titfuck story.` }
function tellReluctantStory(result) { return `TODO: Reluctant Titfuck story.` }
function tellWillingStory(result) { return `TODO: Willing Titfuck story.` }
function tellEagerStory(result) { return `TODO: Eager Titfuck story.` }
