SexAction.register('get-deepthroat',{
  name: 'Get Deepthroated',
  mainCategory: SexAction.MainCategory.receiving,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.mouth,
  direction: ActionDirection.partnerToPlayer,
  description: `{T:name} will try and deepthroat your cock, taking it as deep as {T:he} can.`,

  time: 1,
  playerStamina: 60,
  partnerStamina: 160,

  requires:['P:has-cock'],

  consentTarget: 80,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.roughService },
    { type:'arousal', strength:0.4 },
    { type:'gender' },
    { type:'preference', code:'oral-slut', scale:3 },
    { type:'preference', code:'cock-lover', scale:3 },
    { type:'preference', code:'cum-dump', scale:3 },
    { type:'preference', code:'breath-player' },
    { type:'preference', code:'submissive' },
    { type:'preference', code:'masochistic' },
    { type:'preference', code:'sadist', conflicting:true },
    { type:'preference', code:'dominant', conflicting:true },
  ],

  partnerSensations: {
    throat:     80,
    anger:      50,
    desire:     30,
    shame:      100,
    submission: 300,
    suffering:  200,
  },
  playerSensations: {
    cock:   100,
    desire: 100,
  },

  techniqueTarget: 28,
  skills: {
    partner:['servicing','deepthroating']
  },
  alignment: {
    submission: 3,
    masochism: 3,
    shame: 2,
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

function tellUnwillingStory(result) { return `TODO: Unwilling Deepthroat story.` }
function tellReluctantStory(result) { return `TODO: Reluctant Deepthroat story.` }
function tellWillingStory(result) { return `TODO: Willing Deepthroat story.` }
function tellEagerStory(result) { return `TODO: Eager Deepthroat story.` }
