global.EmotionsComponent = (function() {

  // The Emotions (not to be confused with feelings) are upgraded by spending anima. Like the sensitivities, they scale
  // the sexual emotion responses from the sex action sensations.
  const $properties = [
    'comfort',
    'desire',
    'shame',
    'submission',
    'suffering',
  ];

  function create(id,data) {
    Registry.createComponent(id, ComponentType.emotions,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.emotions,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.emotions);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.emotions);
  }

  function validate(id) {
    const emotionsComponent = lookup(id);

    Object.keys(emotionsComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Emotions component does not have a ${key} property.`
      }
    });

    Object.keys($properties).forEach(key => {
      Validate.exists(key, emotionsComponent[key]);
      Validate.between(key, emotionsComponent[key], 0, 8);
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
