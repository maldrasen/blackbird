global.Consumable = (function() {
  const consumables = {};

  function register(code,data) {
    consumables[code] = data;
  }

  function lookup(code) {
    if (consumables[code] == null) { throw new Error(`Bad consumable code [${code}]`); }

    const consumable = { ...consumables[code] };

    function consume(entity) {
      const context = { A:entity, I:code };
      const results = (consumable.effects||[]).map(effect => { effect(entity); });

      if (consumable.stories) {
        return consumable.stories.pick(context);
      }

      return `[TODO: ${entity} consumes ${consumable.name} with results:${JSON.stringify(results)}]`;
    }

    return Object.freeze({
      getCode: () => { return code; },
      getName: () => { return consumable.name; },
      getDescription: () => { return consumable.description; },
      getCategory: () => { return consumable.category; },
      getTags: () => { return [...consumable.tags]; },
      getEffects: () => { return structuredClone(consumable.effects); },
      consume,
    });
  }

  return Object.freeze({
    register,
    lookup,
  });

})();
