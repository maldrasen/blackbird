SexAction.register('deep-kiss',{
  name: 'Deep Kiss',
  persistedName: `Deeply Kissing Each Other`,
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.mouth,
  partnerCategory: SexAction.PartCategory.mouth,
  direction: ActionDirection.mutual,
  description: `You and {T:name} will share a passionate kiss, thrusting your tongue deep into {T:his} mouth, while 
    {T:he} does the same.`,

  time: 1,
  playerStamina: 40,
  partnerStamina: 40,

  persist: { action:'deep-kiss', revert:'kiss', when:Consent.willing },
  uses: {
    player: [TrainingSlot.mouth],
    partner: [TrainingSlot.mouth],
  },
  availableWhen:{
    player: [TrainingSlot.mouth],
    partner: [TrainingSlot.mouth]
  },

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
  orientation: {
    submission: 1,
    masochism: 0,
    shame: 0,
  },
});
