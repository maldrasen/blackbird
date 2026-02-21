global.AnimusComponent = (function() {

  // Animus Totals (Animus is like experience or gems, earned through training, spent to upgrade sensitivity levels)
  const $properties = [
    'anus',
    'cervix',
    'cock',
    'clit',
    'nipple',
    'oral',
    'prostate',
    'pussy',
    'urethra',
  ];

  function createBaseline(id) {
    const baseline = {};
    $properties.forEach(key => { baseline[key] = 0; });
    create(id, baseline);
  }

  function create(id,data) {
    Registry.createComponent(id, ComponentType.animus,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.animus,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.animus);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.animus);
  }

  function validate(id) {
    const animusComponent = lookup(id);

    Object.keys(animusComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Animus component does not have a ${key} property.`
      }
    });

    Object.keys($properties).forEach(key => {
      Validate.atLeast(key, animusComponent[key], 0);
    });
  }

  return Object.freeze({
    hasParent: () => { return false; },
    createBaseline,
    create,
    update,
    lookup,
    destroy,
  });

})();
