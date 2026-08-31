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

    function getManaCost(powerLevel=1) {
      return spell.manaCost * powerLevel;
    }

    function getSpellSkill() {
      switch (spell.color) {
        case Mana.red: return 'sorcery';
        case Mana.yellow: return 'thaumaturgy';
        case Mana.green: return 'witchcraft';
        case Mana.blue: return 'magic';
        case Mana.black: return 'wizardry';
        default: throw new Error(`Incorrect Mana Color: ${spell.color}`);
      }
    }

    // When a spell is cast we roll the associated magic skill against the spell's difficulty level, which (for now at
    // least) is the amount of mana used to cast the spell. If the skill check was a crit, then the spell's power level
    // is increased.
    function rollSkillCheck(caster, powerLevel) {
      const check = SkillCheck(caster, getSpellSkill());
      const difficulty = getManaCost(powerLevel);

      if (check.fumble || check.value < difficulty) {
        return { result:'fail' }
      }

      return {
        result: 'success',
        powerLevel: check.crit ? boost(powerLevel) : powerLevel
      };
    }

    // For each level boost() increases resulting level by 2, 3, 4, or 5. A critical boost is more significant at
    // lower levels, tripling then doubling damage, tapering off to around a 150% boost at higher levels, but still
    // remains significant. Assuming the highest upcast is level 8, resulting in a max power level of 13x.
    function boost(level) {
      switch (level) {
        case 1: return 3;
        case 2: return 4;
        case 3: return 6;
        case 4: return 7;
        case 5: return 9;
        case 6: return 10;
        case 7: return 12;
        case 8: return 13;
        default: throw new Error(`Unexpected power level: ${level}`);
      }
    }

    return {
      getCode: () => { return code; },
      getName: () => { return spell.name; },
      getColor: () => { return spell.color; },
      getManaCost,
      getCastingTime,
      getTarget: () => { return spell.target || EffectTarget.self; },
      getAreaOfEffect: () => { return spell.areaOfEffect; },
      getEffects: (powerLevel=1) => { return spell.getEffects(powerLevel); },
      pickStory: context => { return spell.stories.pick(context); },
      messageForEntity: (id,results) => { return spell.messageForEntity ? spell.messageForEntity(id,results) : null; },
      getSpellSkill,
      rollSkillCheck,
    };
  }

  return {
    register,
    getAllCodes,
    lookup,
  };

})();
