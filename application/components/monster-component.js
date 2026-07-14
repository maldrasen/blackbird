global.MonsterComponent = (function() {
  const properties = ['code','basicAttack','threatTable','abilityCooldowns'];

  function create(id,data) {
    Registry.createComponent(id,ComponentType.monster,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.monster,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.monster);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.monster);
  }

  function validate(id) {
    const monsterComponent = lookup(id);
    Object.keys(monsterComponent).forEach(key => {
      if (properties.includes(key) === false) {
        throw new Error(`Monster component does not have a ${key} property.`);
      }
    });
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();
