global.BaseArmor = (function() {
  const $armors = {};

  // The skill register() function also needs to add the skill code as a property of the Skills component.
  function register(code,data) {
    $armors[code] = data;
  }

  function getAllCodes() {
    return Object.keys($armors);
  }

  function lookup(code) {
    if ($armors[code] == null) { throw new Error(`Bad base armor code [${code}]`); }

    const armor = { ...$armors[code] };

    return Object.freeze({
      getCode: () => { return armor.code; },
      getSlots: () => { return armor.slots; },
    });
  }

  return Object.freeze({
    register,
    getAllCodes,
    lookup,
  });

})();
