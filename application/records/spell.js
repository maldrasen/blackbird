global.Spell = (function() {
  const spells = {};

  function register(code,data) {
    spells[code] = data;
  }

  function getAllCodes() {
    return Object.keys(spells);
  }

  function lookup(code) {
    if (spells[code] == null) { throw new Error(`Bad spell code [${code}]`); }

    const spell = { ...spells[code] };

    // TODO: The 700+100x casting time is for a 'fast' casting time. Other casting times (medium, slow) can either
    //       adjust these values with a known 'castingTime' property or provide their own formula in a getCastingTime
    //       property.
    function getCastingTime(powerLevel) {
      let base = 700;
      let multiplier = 100;
      return (powerLevel * multiplier) + base;
    }

    return {
      getCode: () => { return code; },
      getName: () => { return spell.name; },
      getColor: () => { return spell.color; },
      getManaCost: (powerLevel=1) => { return spell.manaCost * powerLevel; },
      getCastingTime,
      getAreaOfEffect: () => { return spell.areaOfEffect; },
      getEffects: (powerLevel=1) => { return spell.getEffects(powerLevel); },
      pickStory: context => { return spell.stories.pick(context); },
      messageForEntity: (id,results) => { return spell.messageForEntity(id,results); },
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
