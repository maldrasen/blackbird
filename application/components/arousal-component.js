global.ArousalComponent = (function() {
  const properties = ['arousal','pleasure','edging','refractory'];

  function create(id,data={}) {
    if (data.arousal == null) { data.arousal = 0; }
    if (data.pleasure == null) { data.pleasure = 0; }
    if (data.edging == null) { data.edging = 0; }
    if (data.refractory == null) { data.refractory = 0; }

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
      if (properties.includes(key) === false) {
        throw new Error(`Arousal component does not have a ${key} property.`);
      }
    });

    Validate.between('Arousal.arousal',arousalComponent.arousal,0,100);
    Validate.atLeast('Arousal.pleasure',arousalComponent.pleasure,0);
    Validate.atLeast('Arousal.edging',arousalComponent.edging,0);
    Validate.atLeast('Arousal.refractory',arousalComponent.refractory,0);
  }

  return Object.freeze({
    hasParent: () => { return false; },
    create,
    update,
    lookup,
    destroy,
  });

})();
