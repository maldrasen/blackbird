global.StatusEffectComponent = (function() {
  const properties = [_parentId,'code','count','interval','duration','strength'];
  const numericProperties = ['count','interval','duration','strength'];
  const opposingCodes = { 'poised':'off-balance', 'off-balance':'poised' };

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

  // A status effect is its own entity, so destroying one deletes the whole entity rather than just the component,
  // otherwise empty entities would pile up in the registry.
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

    // An entity should have at most one instance of each status effect.
    Validate.equals('StatusEffect.uniqueness',Registry.findComponentsWith(ComponentType.statusEffect, component => {
      return component._parentId === statusEffectComponent._parentId && component.code === statusEffectComponent.code;
    }).length,1);
  }

  // Applying an effect the entity already has renews it rather than stacking. Each numeric property keeps the larger
  // value, so a renewed effect is never weakened or shortened. Returns the removed opposing codes so battle callers
  // know when a combatant's status display needs to be refreshed.
  function apply(parentId, code, values={}) {
    StatusEffectType.lookup(code);

    const existing = findEntity(parentId, code);
    if (existing) { return { id:renew(existing,values), removed:[] }; }

    const id = create(parentId, { code, ...values });
    return { id, removed:removeOpposing(parentId,code) };
  }

  function renew(id, values) {
    const current = lookup(id);
    const renewed = {};

    numericProperties.forEach(key => {
      if (values[key] != null && (current[key] == null || values[key] > current[key])) {
        renewed[key] = values[key];
      }
    });

    if (Object.keys(renewed).length > 0) { update(id,renewed); }
    return id;
  }

  function removeOpposing(parentId, code) {
    const opposing = opposingCodes[code];
    if (opposing && has(parentId,opposing)) {
      remove(parentId,opposing);
      return [opposing];
    }
    return [];
  }

  function remove(parentId, code) {
    const entity = findEntity(parentId,code);
    if (entity == null) { throw new Error(`Entity[${parentId}] does not have ${code}`); }
    destroy(entity);
  }

  function has(parentId, code) {
    return findEntity(parentId,code) != null;
  }

  function findByCode(parentId, code) {
    const entity = findEntity(parentId,code);
    return entity ? lookup(entity) : null;
  }

  function listFor(parentId) {
    return of(parentId).map(lookup);
  }

  // Called when a battle is torn down. Effects on dead and fled monsters are already gone with their parent
  // entities, so this sweep clears the battle only effects left on the survivors.
  function removeBattleEffects() {
    Registry.findComponentsWith(ComponentType.statusEffect, data => {
      return StatusEffectType.lookup(data.code).isClearedAfterBattle();
    }).forEach(destroy);
  }

  function findEntity(parentId, code) {
    return Registry.findComponentsWith(ComponentType.statusEffect, data => {
      return data[_parentId] === parentId && data.code === code;
    })[0];
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
    apply,
    remove,
    has,
    findByCode,
    findEntity,
    listFor,
    of,
    removeBattleEffects,
  });

})();
