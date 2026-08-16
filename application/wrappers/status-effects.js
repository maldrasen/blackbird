global.StatusEffects = function(parentId) {
  const opposingCodes = { 'poised':'off-balance', 'off-balance':'poised' };

  function apply(code, values={}) {
    StatusEffectType.lookup(code);

    const existing = findEntity(code);
    if (existing) { return { id:renew(existing,values), removed:[] }; }

    const id = StatusEffectComponent.create(parentId, { code, ...values });
    return { id, removed:removeOpposing(code) };
  }

  // When a status effect is applied, and the character already has that status effect, we can increase the effect's
  // duration and strength to the newly applied value, but these values are never reduced. This can lead to an
  // unexpected outcome where a long lasting but weak poison is first applied, followed by a short duration, high
  // strength poison, leaving the character with a long duration high damage poison. Not sure what to do in this case.
  // We may either to recalculate the total damage and spread it out over the longer duration or have multiple poison
  // types. I think I need to wait until we actually have multiple different types of poison (or burn or whatever
  // status effects have different durations and strengths) before figuring this out though.
  function renew(id, values) {
    const current = StatusEffectComponent.lookup(id);
    const renewed = {};

    ['count','interval','duration','strength'].forEach(key => {
      if (values[key] != null && (current[key] == null || values[key] > current[key])) {
        renewed[key] = values[key];
      }
    });

    if (isHarderHitting(current.damage, values.damage)) { renewed.damage = values.damage; }

    if (Object.keys(renewed).length > 0) { StatusEffectComponent.update(id,renewed); }
    return id;
  }

  // Damage ranges follow the same never-reduced rule as the numeric values, compared on the high end of the range.
  function isHarderHitting(current, applied) {
    if (applied == null) { return false; }
    if (current == null) { return true; }
    return applied[1] > current[1];
  }

  function removeOpposing(code) {
    const opposing = opposingCodes[code];
    if (opposing && has(opposing)) {
      remove(opposing);
      return [opposing];
    }
    return [];
  }

  function remove(code) {
    const entity = findEntity(code);
    if (entity == null) { throw new Error(`Entity[${parentId}] does not have ${code}`); }
    StatusEffectComponent.destroy(entity);
  }

  function has(code) {
    return findEntity(code) != null;
  }

  function list() {
    return StatusEffectComponent.of(parentId).map(StatusEffectComponent.lookup);
  }

  function get(code) {
    const entity = findEntity(code);
    return entity ? StatusEffectComponent.lookup(entity) : null;
  }

  function findEntity(code) {
    return Registry.findComponentsWith(ComponentType.statusEffect, data => {
      return data[_parentId] === parentId && data.code === code;
    })[0];
  }

  return {
    apply,
    get,
    has,
    remove,
    list
  };

}
