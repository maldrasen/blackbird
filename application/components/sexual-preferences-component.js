global.SexualPreferencesComponent = (function() {

  function getProperties() { return SexualPreference.getAllCodes(); }

  function validate(id) {
    const sexualPreferencesComponent = Registry.lookupSexualPreferencesComponent(id)

    Object.keys(sexualPreferencesComponent).forEach(key => {
      if (getProperties().includes(key) === false) {
        throw `Sexual preference component does not have a ${key} property.`
      }
    });

    getProperties().forEach(preferenceCode => {
      if (sexualPreferencesComponent[preferenceCode] != null) {
        Validate.between(preferenceCode, sexualPreferencesComponent[preferenceCode], -100, 100);
      }
    });
  }

  return Object.freeze({
    getProperties,
    validate,
  });

})();
