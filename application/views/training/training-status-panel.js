global.TrainingStatusPanel = (function() {

  let healthBar;
  let staminaBar;
  let arousalBar;
  let pleasureBar;

  function build() {
    const partner = TrainingController.getPartner()
    const health = HealthComponent.lookup(partner);
    const character = Character(partner);

    healthBar = BarDisplay({
      label: 'Health',
      currentValue: health.currentHealth,
      minValue: 0,
      maxValue: health.maxHealth,
      color: 'health',
    });

    staminaBar = BarDisplay({
      label: 'Stamina',
      currentValue: Math.round(health.currentStamina),
      minValue: 0,
      maxValue: Math.round(AttributesComponent.createWrapper({ id:partner }).getMaxStamina()),
      color: 'stamina',
    });

    arousalBar = BarDisplay({
      label: 'Arousal',
      currentValue: ArousalComponent.lookup(partner).arousal,
      minValue: 0,
      maxValue: 100,
      color: 'arousal',
    });

    // 10000 is standard orgasm threshold, but this can be altered by
    // 'premature' aspect. The pleasure can also go well above 10000 when
    // edging.
    pleasureBar = BarDisplay({
      label: 'Pleasure',
      currentValue: 0,
      minValue: 0,
      maxValue: 10000,
      color: 'pleasure',
    });

    X.fill('#trainingView .partner-status-panel .full-name',character.getFullName());
    X.fill('#trainingView .partner-status-panel .gender',character.getGenderName());
    X.fill('#trainingView .partner-status-panel .species',character.getSpeciesName());
    X.fill('#trainingView .partner-status-bars .health',healthBar.getElement());
    X.fill('#trainingView .partner-status-bars .stamina',staminaBar.getElement());
    X.fill('#trainingView .partner-status-bars .arousal',arousalBar.getElement());
    X.fill('#trainingView .partner-status-bars .pleasure',pleasureBar.getElement());
  }

  function updateHealth() {}
  function updateStamina() {}
  function updateArousal() {}
  function updatePleasure() {}

  return Object.freeze({
    build,
    updateHealth,
    updateStamina,
    updateArousal,
    updatePleasure,
  });

})();
