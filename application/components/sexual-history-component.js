global.SexualHistoryComponent =  (function() {
  const $properties = ['actions','firsts'];

  function create(id,data) {
    Registry.createComponent(id, ComponentType.sexualHistory, data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.sexualHistory,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.sexualHistory);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.sexualHistory);
  }

  function validate(id) {
    const historyComponent = SexualHistoryComponent.lookup(id);

    Object.keys(historyComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw new Error(`Sexual history component does not have a ${key} property.`);
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
