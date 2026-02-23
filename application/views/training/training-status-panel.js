global.TrainingStatusPanel = (function() {

  let healthBar;
  let staminaBar;
  let manaBar;
  let arousalBar;

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

    manaBar = BarDisplay({
      label: 'Mana',
      currentValue: 0,
      minValue: 0,
      maxValue: 0,
      color: 'mana',
    });

    arousalBar = BarDisplay({
      label: 'Arousal',
      currentValue: ArousalComponent.lookup(partner).arousal,
      minValue: 0,
      maxValue: 100,
      color: 'arousal',
    });

    X.fill('#trainingView .partner-status-panel .full-name',character.getFullName());
    X.fill('#trainingView .partner-status-panel .gender',character.getGenderName());
    X.fill('#trainingView .partner-status-panel .species',character.getSpeciesName());
    X.fill('#trainingView .partner-status-bars .health',healthBar.getElement());
    X.fill('#trainingView .partner-status-bars .stamina',staminaBar.getElement());
    X.fill('#trainingView .partner-status-bars .mana',manaBar.getElement());
    X.fill('#trainingView .partner-status-bars .arousal',arousalBar.getElement());
  }

  function updateHealth() {}
  function updateStamina() {}
  function updateMana() {}
  function updateArousal() {}

  return Object.freeze({
    build,
    updateHealth,
    updateStamina,
    updateMana,
    updateArousal,
  });

})();
