SexAction.register('suck-pussy',{
  name: 'Eat Pussy',
  mainCategory: SexAction.MainCategory.giving,
  playerCategory: SexAction.PartCategory.mouth,
  partnerCategory: SexAction.PartCategory.pussy,
  direction: ActionDirection.playerToPartner,
  description: `You'll eat {T:name's} pussy, focusing on sucking and licking {T:his} clit.`,

  time: 1,
  playerStamina: 70,
  partnerStamina: 60,

  requires:['T:has-pussy'],

  consentTarget: 17,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.reverseService },
    { type:'arousal', strength:3 },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'pussy-slut' },
    { type:'preference', code:'dominant' },
  ],

  partnerSensations: {
    clit:    80,
    pussy:   40,
    comfort: 50,
    desire:  60,
    shame:   10,
  },
  playerSensations: {
    desire: 40
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

function tellUnwillingStory(result) { return `TODO: Unwilling Pussy Eating story.` }
function tellReluctantStory(result) { return `TODO: Reluctant Pussy Eating story.` }
function tellWillingStory(result) { return `TODO: Willing Pussy Eating story.` }
function tellEagerStory(result) { return `TODO: Eager Pussy Eating story.` }
