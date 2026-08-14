global.ManaComponent = (function() {
  const properties = ['red','yellow','green','blue','black'];

  function create(id,data) {
    Registry.createComponent(id,ComponentType.mana,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.mana,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.mana);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.mana);
  }

  function validate(id) {
    const manaComponent = lookup(id)

    Object.keys(manaComponent).forEach(key => {
      if (properties.includes(key) === false) {
        throw new Error(`Mana component does not have a ${key} property.`);
      }
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
