SexAction.register('suck-cock',{
  name: 'Suck Cock',
  mainCategory: SexAction.MainCategory.giving,
  playerCategory: SexAction.PartCategory.mouth,
  partnerCategory: SexAction.PartCategory.cock,
  direction: ActionDirection.playerToPartner,
  description: `You'll suck {T:name's} cock.`,

  time: 1,
  playerStamina: 80,
  partnerStamina: 60,

  requires:['T:has-cock'],

  consentTarget: 17,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.reverseService },
    { type:'arousal', strength:3 },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive' },
    { type:'preference', code:'cock-slut' },
    { type:'preference', code:'dominant' },
  ],

  partnerSensations: {
    cock:    80,
    comfort: 50,
    desire:  70,
    shame:   10,
  },
  playerSensations: {
    throat: 20,
    desire: 40,
  },

  techniqueTarget: 22,
  skills: {
    player:['servicing']
  },
  alignment: {
    submission: -1,
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

function tellUnwillingStory(result) { return `TODO: Unwilling Cock Sucking story.` }
function tellReluctantStory(result) { return `TODO: Reluctant Cock Sucking story.` }
function tellWillingStory(result) { return `TODO: Willing Cock Sucking story.` }
function tellEagerStory(result) { return `TODO: Eager Cock Sucking story.` }
