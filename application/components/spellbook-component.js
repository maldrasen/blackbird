global.SpellbookComponent = (function() {

  // The spellbook is a map of spell codes to the highest power level the character can cast that spell at.
  function create(id, data={}) {
    Registry.createComponent(id,ComponentType.spellbook,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.spellbook,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.spellbook);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.spellbook);
  }

  function validate(id) {
    const spellbookComponent = lookup(id);

    Object.keys(spellbookComponent).forEach(code => {
      Spell.lookup(code);
      Validate.isWholeNumber(`Spellbook.${code}`, spellbookComponent[code]);
      Validate.between(`Spellbook.${code}`, spellbookComponent[code], 1, BattleConstants.maxPowerLevel);
    });
  }

  return {
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  };

})();
