global.StatusEffectComponent = (function() {
  const properties = [_parentId,'code','count','interval','duration','strength'];
  const numericProperties = ['count','interval','duration','strength'];

  function create(id,data) {
    const entity = Registry.createEntity();
    const componentData = { _parentId:id, ...data };

    numericProperties.forEach(key => {
      if (componentData[key] == null) { componentData[key] = null; }
    });

    Registry.createComponent(entity, ComponentType.statusEffect, componentData);
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
    Registry.deleteEntity(id);
  }

  function validate(id) {
    const statusEffectComponent = lookup(id);

    Object.keys(statusEffectComponent).forEach(key => {
      if (properties.includes(key) === false) {
        throw new Error(`Status Effect component does not have a ${key} property.`);
      }
    });

    Validate.exists('StatusEffect._parentId',statusEffectComponent._parentId);
    Validate.isIn('StatusEffect.code',statusEffectComponent.code,StatusEffectType.getAllCodes());

    numericProperties.forEach(key => {
      if (statusEffectComponent[key] != null) {
        Validate.atLeast(`StatusEffect.${key}`,statusEffectComponent[key],1);
      }
    });

    Validate.equals('StatusEffect.uniqueness',Registry.findComponentsWith(ComponentType.statusEffect, component => {
      return component._parentId === statusEffectComponent._parentId && component.code === statusEffectComponent.code;
    }).length,1);
  }

  function of(parent) {
    return Registry.findComponentsWith(ComponentType.statusEffect, data => {
      return data[_parentId] === parent;
    });
  }

  return {
    hasParent: () => { return true; },
    create,
    update,
    lookup,
    destroy,
    of,
  };

})();
