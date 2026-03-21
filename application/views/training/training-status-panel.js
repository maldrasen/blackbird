global.TrainingStatusPanel = (function() {

  let healthBar;
  let staminaBar;
  let arousalBar;
  let pleasureBar;

  function build() {
    const partner = TrainingController.getState().getPartner()
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

    X.fill('#trainingView .position-frame',buildPositionFrame());
    X.fill('#trainingView .partner-status-panel .full-name',character.getFullName());
    X.fill('#trainingView .partner-status-panel .gender',character.getGenderName());
    X.fill('#trainingView .partner-status-panel .species',character.getSpeciesName());
    X.fill('#trainingView .partner-status-bars .health',healthBar.getElement());
    X.fill('#trainingView .partner-status-bars .stamina',staminaBar.getElement());
    X.fill('#trainingView .partner-status-bars .arousal',arousalBar.getElement());
    X.fill('#trainingView .partner-status-bars .pleasure',pleasureBar.getElement());
  }

  function update() {
    X.fill('#trainingView .position-frame',buildPositionFrame());

    const partner = TrainingController.getState().getPartner()
    const health = HealthComponent.lookup(partner);
    const arousalData = ArousalComponent.lookup(partner);

    healthBar.setCurrentValue(health.currentHealth);
    staminaBar.setCurrentValue(Math.round(health.currentStamina));
    arousalBar.setCurrentValue(arousalData.arousal);
    pleasureBar.setCurrentValue(arousalData.pleasure);
  }

  // TODO: This is really just a temporary version of this panel. What I'd really like are some graphics for each
  //   position that highlights the player and the partner in a different color so that we can see which role they're
  //   in. The graphics should be simple, a silhouette with solid color figures, but with enough detail that we can
  //   easily tell their genders. (Show cocks and tits on each figure basically)
  function buildPositionFrame() {
    const state = TrainingController.getState();
    const position = state.getPosition().getName();
    const context = state.getPositionContext();
    const first = Character(context.A).getName();
    const second = Character(context.B).getName();

    return X.createElement(`<ul>
      <li class='name'>${position}</li>
      <li class='person'>A → ${first}</li>
      <li class='person'>B → ${second}</li>
    </ul>`);
  }

  return Object.freeze({
    build,
    update,
  });

})();
