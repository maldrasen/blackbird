SexAction.register('fondle-ass',{
  name: 'Fondle Ass',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.ass,
  direction: ActionDirection.playerToPartner,
  description: `Fondle and squeeze {T:name's} ass.`,

  time: 1,
  playerStamina: 30,
  partnerStamina: 30,

  consentTarget: 20,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive', scale:1.5 },
    { type:'preference', code:'anal-slut' },
  ],

  partnerSensations: {
    anus:       10,
    comfort:    10,
    desire:     30,
    shame:      10,
    submission: 10
  },
  playerSensations: {
    desire: 30,
  },

  techniqueTarget: 6,
  alignment: {
    submission: 0,
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

function tellUnwillingStory(result) { return `TODO: Unwilling Ass Fondling story.` }
function tellReluctantStory(result) { return `TODO: Reluctant Ass Fondling story.` }
function tellWillingStory(result) { return `TODO: Willing Ass Fondling story.` }
function tellEagerStory(result) { return `TODO: Eager Ass Fondling story.` }
