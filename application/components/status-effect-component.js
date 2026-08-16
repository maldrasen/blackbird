global.StatusEffectComponent = (function() {
  const properties = [_parentId,'code','count','interval','duration','strength','damage'];
  const numericProperties = ['count','interval','duration','strength'];
  const rangeProperties = ['damage'];

  function create(id,data) {
    const entity = Registry.createEntity();
    const componentData = { _parentId:id, ...data };

    [...numericProperties, ...rangeProperties].forEach(key => {
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

    // The effect carries a damage range rather than a single number, so that whatever applied it can decide how hard
    // it hits without the effect itself needing to know where it came from.
    rangeProperties.forEach(key => {
      if (statusEffectComponent[key] != null) {
        Validate.isRange(`StatusEffect.${key}`,statusEffectComponent[key]);
        Validate.atLeast(`StatusEffect.${key}`,statusEffectComponent[key][0],1);
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
