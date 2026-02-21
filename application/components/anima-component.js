global.AnimaComponent = (function() {

  // Anima is like experience or gems, earned through training, spent to
  // upgrade sexual preferences and other components.
  const $properties = [
    'comfort',
    'desire',
    'shame',
    'submission',
    'suffering',
  ];

  function createBaseline(id) {
    const baseline = {};
    $properties.forEach(key => { baseline[key] = 0; });
    create(id, baseline);
  }

  function create(id,data) {
    Registry.createComponent(id, ComponentType.anima,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.anima,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.anima);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.anima);
  }

  function validate(id) {
    const animaComponent = lookup(id);

    Object.keys(animaComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Anima component does not have a ${key} property.`
      }
    });

    $properties.forEach(key => {
      Validate.atLeast(`Anima.${key}`, animaComponent[key], 0);
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
