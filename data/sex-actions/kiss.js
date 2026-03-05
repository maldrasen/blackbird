SexAction.register('kiss',{
  name: 'Kissing',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.mouth,
  partnerCategory: SexAction.PartCategory.mouth,
  direction: ActionDirection.mutual,
  description: `You and {T:name} will share an intimate kiss.`,

  time: 1,
  playerStamina: 30,
  partnerStamina: 30,

  consentTarget: 15,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.emotional },
    { type:'arousal', strength:0.2 },
    { type:'gender' },
    { type:'preference', code:'oral-slut', scale:3 },
    { type:'preference', code:'affection-slut' },
    { type:'preference', code:'humiliation-slut', conflicting:true },
    { type:'preference', code:'debaser', conflicting:true },
    { type:'preference', code:'sadist', conflicting:true },
  ],

  partnerSensations: {
    comfort:    30,
    desire:     20,
    shame:      5,
    submission: 5,
  },
  playerSensations: {
    desire: 15
  },

  techniqueTarget: 10,
  alignment: {
    submission: 0,
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

function tellUnwillingStory(result) { return `TODO: Unwilling Kissing story.` }
function tellReluctantStory(result) { return `TODO: Reluctant Kissing story.` }
function tellWillingStory(result) { return `TODO: Willing Kissing story.` }
function tellEagerStory(result) { return `TODO: Eager Kissing story.` }
