global.SpellbookSystem = (function() {

  function lookup(id) {
    const book = SpellbookComponent.lookup(id);
    if (book == null) { throw new Error(`Entity[${id}] has no spellbook.`); }
    return book;
  }

  // The highest power level a character can cast a spell at right now: the level their spellbook allows, held back
  // by what the matching mana pool can pay for. Zero when they can't afford even the first level, or don't know the
  // spell at all.
  function getMaxCastablePowerLevel(id, code) {
    const spell = Spell.lookup(code);
    const affordable = Math.floor(ManaSystem.getPool(id, spell.getColor()).current / spell.getManaCost());
    return Math.min(lookup(id)[code] || 0, affordable);
  }

  // Every spell the character can cast at least once, with the highest level they can pay for.
  function getCastableSpells(id) {
    return Object.keys(lookup(id)).
      map(code => ({ code, color:Spell.lookup(code).getColor(), maxPowerLevel:getMaxCastablePowerLevel(id, code) })).
      filter(entry => entry.maxPowerLevel > 0);
  }

  return {
    getMaxCastablePowerLevel,
    getCastableSpells,
  };

})();
