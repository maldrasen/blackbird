global.BattleStatusEffect = function(id, code, options={}) {

  const entity = id;
  const status = StatusEffect.lookup(code);
  let duration = options.duration || null;

  // TODO: Power Level.
  //
  // When a status effect is applied we should be able to adjust the duration and the power level. The power level
  // indicates how much damage a Burn effect does, or how bad Hex effects the character's accuracy. It could also be
  // used to determine how difficult the effect is to resist.
  //
  // The duration works differently depending on the duration type. If the duration is a time we set it to a value in
  // MS, then reduce it every turn until it's 0. If it's a fixed count or turns it's an integer we decrease every time
  // the effect triggers or every turn. Some effects wont have a duration and will last until they're removed. These
  // battle status effects though shouldn't be persisted after the battle is over, so we'll need another way to persist
  // the effects like Paralysis or Infestation.
  //
  // Another option is to make the status effect speed a property. A fast poison could be applied every 500ms, or a
  // slow poison could do a lot of damage every 3000 ms. Status effects should have a default speed and the effects
  // can overwrite it.

  return Object.freeze({
    getCode: () => { return code; },
    getEntity: () => { return entity; },
    getStatus: () => { return status; },
    getName: () => { return status.getName(); },
    getCategory: () => { return status.getCategory(); },
    getDurationType: () => { return status.getDurationType(); },
    getDamageType: () => { return status.getDamageType(); },
    getRemovedAt: () => { return status.getRemovedAt(); },
    getDuration: () => { return duration; },
    setDuration: d => { duration = d; },
    extendDuration: d => { duration += d; },
    reduceDuration: d => { duration -= d; },
  });
}


