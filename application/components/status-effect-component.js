global.StatusEffectComponent = (function() {
  const $properties = [_parentId,'code'];

  function create(id,data) {
    const entity = Registry.createEntity();
    Registry.createComponent(entity, ComponentType.statusEffect, { _parentId:id, ...data});
    validate(entity);
    return entity;
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.statusEffect,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.statusEffect);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.statusEffect);
  }

  function validate(id) {
    const statusEffectComponent = lookup(id);

    Object.keys(statusEffectComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw new Error(`Status Effect component does not have a ${key} property.`);
      }
    });

    Validate.exists('StatusEffect._parentId',statusEffectComponent._parentId);
    Validate.exists('StatusEffect.code',statusEffectComponent.code);

  }

  function of(parent) {
    return Registry.findComponentsWith(ComponentType.statusEffect, data => {
      return data[_parentId] === parent;
    });
  }

  return Object.freeze({
    hasParent: () => { return true; },
    create,
    update,
    lookup,
    destroy,
    of,
  });

})();
