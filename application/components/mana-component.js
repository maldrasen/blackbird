global.ManaComponent = (function() {
  const colors = Object.values(Mana);
  const poolProperties = ['current','max'];

  // Every character carries a pool for each of the five colors, even when it's empty. A species with no affinity for
  // a color (or a human, who has no natural mana at all) just has a 0/0 pool there.
  function create(id, data={}) {
    colors.forEach(color => {
      if (data[color] == null) { data[color] = { current:0, max:0 }; }
    });

    Registry.createComponent(id,ComponentType.mana,data);
    validate(id);
    moderate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.mana,data);
    validate(id);
    moderate(id);
  }

  // The registry only clones the top level of a component, which would leave the color pools shared with the stored
  // component. The mana component is small enough that a deep clone is cheap, and it means callers can safely change
  // a pool on the looked up copy before passing it back to update().
  function lookup(id) {
    const manaComponent = Registry.lookupComponent(id,ComponentType.mana);
    return (manaComponent == null) ? undefined : structuredClone(manaComponent);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.mana);
  }

  // Mana is counted in whole points. A pool can't have a negative maximum, and the current mana is clamped between
  // zero and that maximum, so adding or spending mana never needs to check the bounds itself.
  function moderate(id) {
    const manaComponent = lookup(id);

    colors.forEach(color => {
      const pool = manaComponent[color];
      pool.max = Math.max(0, Math.floor(pool.max));
      pool.current = Math.min(pool.max, Math.max(0, Math.floor(pool.current)));
    });

    Registry.updateComponent(id,ComponentType.mana,manaComponent);
  }

  function validate(id) {
    const manaComponent = lookup(id);

    Object.keys(manaComponent).forEach(key => {
      if (colors.includes(key) === false) {
        throw new Error(`Mana component does not have a ${key} property.`);
      }
    });

    colors.forEach(color => {
      const pool = manaComponent[color];
      Validate.exists(`Mana.${color}`, pool);

      Object.keys(pool).forEach(key => {
        if (poolProperties.includes(key) === false) {
          throw new Error(`Mana pool does not have a ${key} property.`);
        }
      });

      Validate.isNumber(`Mana.${color}.current`, pool.current);
      Validate.isNumber(`Mana.${color}.max`, pool.max);
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
