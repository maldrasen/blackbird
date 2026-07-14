global.CacheComponent = (function() {
  const properties = ['speedFactor'];

  function create(id,data) {
    Registry.createComponent(id,ComponentType.cache,data);
    validate(id);
  }

  function build(id) {
    create(id,{
      speedFactor: CharacterMath.calculateSpeedFactor(id),
    });
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.cache,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.cache);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.cache);
  }

  function validate(id) {
    const cacheComponent = lookup(id);

    Object.keys(cacheComponent).forEach(key => {
      if (properties.includes(key) === false) {
        throw new Error(`Cache component does not have a ${key} property.`);
      }
    });
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    build,
    update,
    lookup,
    destroy,
  });

})();
