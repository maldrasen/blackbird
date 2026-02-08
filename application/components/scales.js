global.Scales = (function() {

  const $properties = [
    // Animus Levels (physical sensitivity and pleasure)
    'anusSensitivity',
    'cervixSensitivity',
    'cockSensitivity',
    'clitSensitivity',
    'nippleSensitivity',
    'oralSensitivity',
    'prostateSensitivity',
    'pussySensitivity',
    'urethraSensitivity',

    // Animus Totals (earned through training, spent to upgrade animus levels)
    'anusAnimus',
    'cervixAnimus',
    'cockAnimus',
    'clitAnimus',
    'nippleAnimus',
    'oralAnimus',
    'prostateAnimus',
    'pussyAnimus',
    'urethraAnimus',

    // Anima Levels (sexual fears and desires)
    'comfort',
    'desire',
    'shame',
    'submission',
    'suffering',

    // Anima Levels (earned through training, spent to upgrade anima levels)
    //    Note: We don't persist angerAnima as it isn't used to upgrade anything. At the end of training all acquired
    //    angerAnima will be used to reduce the comfort and desire anima earned. Shame, submission, and suffering are
    //    the BDSM related anima and can be increased even when anger is high. High anger can also generate hate marks
    //    which is the primary way anger is preserved across training sessions.
    'comfortAnima',
    'desireAnima',
    'shameAnima',
    'submissionAnima',
    'sufferingAnima',
  ];

  function getProperties() { return $properties; }

  function validate(id) {
    const scalesComponent = Registry.lookupScalesComponent(id);

    Object.keys(scalesComponent).forEach(key => {
      if ($properties.includes(key) === false) {
        throw `Scales component does not have a ${key} property.`
      }
    });
  }

  return Object.freeze({
    getProperties,
    validate,
  });

})();
