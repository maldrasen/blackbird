SexAction.register('get-cunnilingus',{
  name: 'Get Cunnilingus',
  mainCategory: SexAction.MainCategory.receiving,
  playerCategory: SexAction.PartCategory.pussy,
  partnerCategory: SexAction.PartCategory.mouth,
  direction: ActionDirection.partnerToPlayer,
  description: `{T:name} will eat your pussy.`,

  time: 1,
  playerStamina: 60,
  partnerStamina: 70,

  requires:['P:has-pussy'],

  consentTarget: 30,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.service },
    { type:'arousal', strength:0.4 },
    { type:'gender' },
    { type:'preference', code:'oral-slut', scale:3 },
    { type:'preference', code:'pussy-lover', scale:3 },
    { type:'preference', code:'submissive' },
    { type:'preference', code:'dominant', conflicting:true },
  ],

  partnerSensations: {
    comfort:    15,
    desire:     40,
    shame:      50,
    submission: 70,
    suffering:  20,
  },
  playerSensations: {
    clit:   80,
    pussy:  20,
    desire: 60,
  },

  techniqueTarget: 22,
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

function tellUnwillingStory(result) { return `TODO: Unwilling Cunnilingus story.` }
function tellReluctantStory(result) { return `TODO: Reluctant Cunnilingus story.` }
function tellWillingStory(result) { return `TODO: Willing Cunnilingus story.` }
function tellEagerStory(result) { return `TODO: Eager Cunnilingus story.` }
