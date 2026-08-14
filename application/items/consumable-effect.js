global.ConsumableEffect = (function() {

  // TODO: Effects should return an object with the rolled effect. Add health or mana should return a { value } with
  //       the amount rolled. Some effects have only a chance of working, and should return {} when it does nothing.
  function addHealth(entity, min, max) { return {}; }
  function addMana(entity, color, min, max) { return {}; }
  function addStatusEffect(entity, code, options) { return {}; }
  function increasePotency(entity, level) { return {}; }

  return {
    addHealth: (min, max) => { return entity => addHealth(entity, min, max); },
    addMana: (color, min, max) => { return entity => addMana(entity, color, min, max); },
    addStatusEffect: (code, options) => { return entity => addStatusEffect(entity, code, options); },
    increasePotency: level => { return entity => increasePotency(entity, level); }
  };

})();