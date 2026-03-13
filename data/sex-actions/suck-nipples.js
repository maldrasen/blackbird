SexAction.register('suck-nipples',{
  name: 'Suck Nipples',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.mouth,
  partnerCategory: SexAction.PartCategory.breasts,
  direction: ActionDirection.playerToPartner,
  description: `You'll lick and suck on {T:name's} nipples.`,

  time: 1,
  playerStamina: 40,
  partnerStamina: 30,

  requires:['T:has-breasts'],

  consentTarget: 15,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.reverseService },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'breast-slut' },
  ],

  partnerSensations: {
    nipple:     60,
    comfort:    30,
    desire:     40,
    shame:      15,
    submission: 10,
  },
  playerSensations: {
    desire: 30
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

function tellUnwillingStory(result) { return `TODO: Unwilling Nipple Sucking story.` }
function tellReluctantStory(result) { return `TODO: Reluctant Nipple Sucking story.` }
function tellWillingStory(result) { return `TODO: Willing Nipple Sucking story.` }
function tellEagerStory(result) { return `TODO: Eager Nipple Sucking story.` }
