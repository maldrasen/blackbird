global.CombatantPanel = function(type, entity) {

  Validate.isIn('CombatantPanel.type',type,['monster','character']);
  Validate.exists('CombatantPanel.entity',entity);

  let healthBar;

  const element = X.createElement(`<div class='combatant ${type}' data-id="${entity}">
    <div class='name'></div>
    <div class='status-panel'></div>
    <div class='health-bar'></div>
  </div>`);

  function build() {
    setName();
    addHealthBar();
  }

  function setName() {
    const name = element.querySelector('.name');
    if (type === 'character') { name.textContent = Character(entity).getName(); }
    if (type === 'monster') { name.textContent = Monster(entity).getBaseMonster().getName(); }
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

    if (type === 'monster') {
      healthBar.hideValues();
    }

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

    X.empty(statusPanel);

    Object.entries(statusEffects).forEach(([code, effect]) => {
      const icon = X.createElement(`<div class='status-effect-icon' data-name='${effect.getName()}'></div>`)
      icon.style['background-image'] = X.assetURL(`ai-icons/${code}.png`);
      statusPanel.appendChild(icon);
    });
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
