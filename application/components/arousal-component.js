global.ArousalComponent = (function() {
  const $properties = ['arousal','pleasure','edging','refectory'];

  function create(id,data) {
    Registry.createComponent(id,ComponentType.arousal,data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.arousal,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.arousal);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.arousal);
  }

  function validate(id) {
    const arousalComponent = lookup(id)

    Object.keys(arousalComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Arousal component does not have a ${key} property.`
      }
    });

    Validate.atLeast('Arousal.arousal',arousalComponent.arousal,0);
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();
