global.ItemConstants = {

  damageValue: 1,
  healthValue: 1,
  manaValue: 3,
  potencyValue: 20,

  // A status effect is worth a base amount for every turn (turn count effects) or second (fixed time effects) that it
  // lasts. Only the effects that articles actually apply need a value, an unpriced effect is an error so that new
  // effects are priced deliberately rather than silently adding nothing.
  statusEffectValues: {
    blind: 4,
    stun: 15,
  },

};
