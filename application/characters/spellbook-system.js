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

  // A successful cast can raise the level a character can cast that spell at. A crit always does; otherwise the
  // chance falls as the level climbs, from 14% at the first level to 2% at the seventh, and nothing past the cap.
  // Returns the new level, or null when it didn't move.
  function improvePowerLevel(id, code, guaranteed=false) {
    const level = lookup(id)[code];
    if (level == null) { throw new Error(`Entity[${id}] doesn't know the ${code} spell.`); }
    if (level >= BattleConstants.maxPowerLevel) { return null; }
    if (guaranteed === false && Random.between(1,100) > (BattleConstants.maxPowerLevel - level) * 2) { return null; }

    SpellbookComponent.setSpell(id, code, level + 1);
    return level + 1;
  }

  return {
    getMaxCastablePowerLevel,
    getCastableSpells,
    improvePowerLevel,
  };

})();
