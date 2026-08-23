global.ManaSystem = (function() {

  function lookup(id) {
    const mana = ManaComponent.lookup(id);
    if (mana == null) { throw new Error(`Entity[${id}] has no mana component.`); }
    return mana;
  }

  function assertColor(color) {
    Validate.isIn('ManaSystem.color', color, Object.values(Mana));
  }

  function assertAmount(amount) {
    Validate.atLeast('ManaSystem.amount', amount, 0);
  }

  function getPool(id, color) {
    assertColor(color);
    return lookup(id)[color];
  }

  // The mana fonts found in the dungeon deepen a pool, raising its maximum and filling the new depth at the same
  // time. This is the only way a human ever gains mana.
  function deepenPool(id, color, amount) {
    assertColor(color);
    assertAmount(amount);

    const mana = lookup(id);
    mana[color].max += amount;
    mana[color].current += amount;
    ManaComponent.update(id, mana);

    return getPool(id, color);
  }

  // Returns the amount actually gained, which is less than asked for when the pool can't hold it all.
  function addMana(id, color, amount) {
    assertColor(color);
    assertAmount(amount);

    const before = getPool(id, color).current;
    const mana = lookup(id);
    mana[color].current += amount;
    ManaComponent.update(id, mana);

    return getPool(id, color).current - before;
  }

  function hasMana(id, color, amount) {
    return getPool(id, color).current >= amount;
  }

  function spendMana(id, color, amount) {
    assertAmount(amount);

    if (hasMana(id, color, amount) === false) {
      throw new Error(`${Character(id).getName()} doesn't have ${amount} ${color} mana to spend.`);
    }

    const mana = lookup(id);
    mana[color].current -= amount;
    ManaComponent.update(id, mana);

    return getPool(id, color);
  }

  function restoreAll(id) {
    const mana = lookup(id);
    Object.values(Mana).forEach(color => {
      mana[color].current = mana[color].max;
    });
    ManaComponent.update(id, mana);
  }

  return {
    getPool,
    deepenPool,
    addMana,
    hasMana,
    spendMana,
    restoreAll,
  };

})();
