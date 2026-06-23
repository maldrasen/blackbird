global.CombatantPanel = function(type, entity) {

  Validate.isIn('CombatantPanel.type',type,['monster','character']);
  Validate.exists('CombatantPanel.entity',entity);

  let healthBar;

  const element = X.createElement(`<div class='combatant ${type}' data-id="${entity}">
    <div class='fill content'>
      <div class='name'></div>
      <div class='status-panel'></div>
      <div class='health-bar'></div>
    </div>
    <div class='fill background-cover'></div>
    <div class='fill background'></div>
  </div>`);

  function build() {
    setName();
    setImage();
    addHealthBar();
  }

  function setName() {
    const name = element.querySelector('.name');
    if (type === 'character') { name.textContent = Character(entity).getName(); }
    if (type === 'monster') { name.textContent = Monster(entity).getBaseMonster().getName(); }
  }

  function setImage() {
    if (type === 'monster') {
      const code = Monster(entity).getBaseMonster().getCode()
      element.querySelector('.background').style['background-image'] = X.assetURL(`temp-art/${code}.png`);
    }
    if (type === 'character') {
      const code = GameState.getPlayer() === entity ? 'player' : 'character'
      element.querySelector('.background').style['background-image'] = X.assetURL(`temp-art/${code}.png`);
    }
  }

  function addHealthBar() {
    const health = HealthComponent.lookup(entity);

    healthBar = BarDisplay({
      label: 'Health',
      currentValue: health.currentHealth,
      minValue: 0,
      maxValue: health.maxHealth,
      color: 'health',
    });
    healthBar.hideTextRow();

    element.querySelector('.health-bar').appendChild(healthBar.getElement());
  }

  function update(state) {
    if (state.isAlive(entity)) {
      updateHealthBar();
      updateStatusPanel();
    }
  }

  function updateHealthBar() {
    healthBar.setCurrentValue(HealthComponent.lookup(entity).currentHealth);
  }

  function updateStatusPanel() {
    const state = BattleSystem.getState();
    const statusPanel = element.querySelector('.status-panel');
    const statusEffects = state.getStatusEffects(entity);
    const isMonster = state.isMonster(entity);

    let isHidden = false;

    X.empty(statusPanel);

    // If we detect that we have more than 12 status effects we can add a class
    // to the icons to display them at a smaller size.
    if (Object.keys(statusEffects).length > 12) {
      throw new Error(`We can only display 12 status effects. Do something about that.`)
    }

    Object.entries(statusEffects).forEach(([code, effect]) => {
      let includeStatus = true;

      if (isMonster && effect.getCode() === 'hidden') {
        includeStatus = false;
        isHidden = true;
        X.addClass(element,'hidden');
      }

      if (includeStatus) {
        const icon = X.createElement(`<div class='status-effect-icon' data-name='${effect.getName()}'></div>`)
        icon.style['background-image'] = X.assetURL(`ai-icons/${code}.png`);
        statusPanel.appendChild(icon);
      }
    });

    if (isMonster && isHidden === false && X.hasClass(element, 'hidden')) { unhideMonster(); }
  }

  // Unhiding the monster has to first add the unhiding class so that the fade in transition will play properly.
  // Once the transition has played (it should take 500ms, but that value is buried in the SCSS file) we need to
  // remove both the hidden and unhidden classes. A potential trap here is what happens if the monster gets hidden
  // again while the transition is being played. It's unlikely, but just to make sure we check to see if the monster
  // is currently hidden, only remove the class if it's not hidden.
  function unhideMonster() {
    X.addClass(element, 'unhiding');
    setTimeout(() => {
      X.removeClass(element,'unhiding');
      if (BattleSystem.getState().hasStatusEffect(entity,'hidden') === false) {
        X.removeClass(element,'hidden');
      }
    },500);
  }

  function getPosition() {
    return X.hasClass(element,'removed') ? null : element.closest('.position').dataset['position'];
  }

  return Object.freeze({
    getType: () => { return type; },
    getEntity: () => { return entity; },
    getElement: () => { return element; },
    getPosition,
    build,
    update,
  });
}
