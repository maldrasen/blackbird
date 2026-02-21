global.SensitivitiesComponent = (function() {

  // The Sensitivities are upgraded by spending animus, they effect the scale of sensations during sex acts.
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

  function create(id,data) {
    Registry.createComponent(id, ComponentType.sensitivities,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.sensitivities,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.sensitivities);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.sensitivities);
  }

  function validate(id) {
    const sensitivitiesComponent = lookup(id);

    Object.keys(sensitivitiesComponent).forEach(key => {
      Validate.between(key, sensitivitiesComponent[key], 1, 8);
      if ($properties.includes(key) === false) {
        throw `Sensitivities component does not have a ${key} property.`
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
