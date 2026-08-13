global.StatusEffect = function(id) {
  const opposingCodes = { 'poised':'off-balance', 'off-balance':'poised' };

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


  function findEntity(parentId, code) {
    return Registry.findComponentsWith(ComponentType.statusEffect, data => {
      return data[_parentId] === parentId && data.code === code;
    })[0];
  }

  return Object.freeze({

  });

}
