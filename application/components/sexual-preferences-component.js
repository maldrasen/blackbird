global.SexualPreferencesComponent = (function() {

  function create(id,data) {
    Registry.createComponent(id, ComponentType.sexualPreferences, data);
    validate(id);
  }

  function update(id,data) {
    Registry.updateComponent(id,ComponentType.sexualPreferences,data);
    validate(id);
  }

  function lookup(id) {
    return Registry.lookupComponent(id,ComponentType.sexualPreferences);
  }

  function destroy(id) {
    Registry.deleteComponent(id,ComponentType.sexualPreferences);
  }

  function validate(id) {
    const codes = SexualPreference.getAllCodes();
    const sexualPreferencesComponent = lookup(id)

    Object.keys(sexualPreferencesComponent).forEach(key => {
      if (codes.includes(key) === false) {
        throw `Sexual preference component does not have a ${key} property.`
      }
    });

    codes.forEach(preferenceCode => {
      if (sexualPreferencesComponent[preferenceCode] != null) {
        Validate.between(preferenceCode, sexualPreferencesComponent[preferenceCode], -100, 100);
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
