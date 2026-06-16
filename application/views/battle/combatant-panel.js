global.CombatantPanel = function(type, entity) {

  console.log(`Build Combatant Panel - ${type}[${entity}]`)

  function build(position) {
    console.log(`   Position: ${position}`)

  }

  function update() {

  }

  return Object.freeze({
    getType: () => { return type; },
    getEntity: () => { return entity; },
    build,
    update,
  });

}

/*
function buildMonsterElement(monsterId) {
  const monsterComponent = MonsterComponent.lookup(monsterId);
  const monster = BaseMonster.lookup(monsterComponent.code);

  return X.createElement(`<div class="monster" data-id="${monsterId}">
      <div class='name'>${monster.getName()}</div>
      <div class='status-panel'></div>
      <div class='health-bar'></div>
    </div>`);
}

function buildCharacterElement(characterId) {
  return X.createElement(`<div class="character" data-id="${characterId}">
      <div class='name'>${Character(characterId).getName()}</div>
      <div class='status-panel'></div>
      <div class='health-bar'></div>
    </div>`);
}

function addHealthBar(element, entity, hideValues=false) {
  const health = HealthComponent.lookup(entity);
  const healthBar = BarDisplay({
    label: 'Health',
    currentValue: health.currentHealth,
    minValue: 0,
    maxValue: health.maxHealth,
    color: 'health',
  });

  if (hideValues) {
    healthBar.hideValues();
  }
  healthBars[entity] = healthBar;

  element.querySelector('.health-bar').appendChild(healthBar.getElement());
}


  function updateEntity(id) {
    if (BattleSystem.getState().isAlive(id)) {
      updateStatusPanel(id,getPositionElement(id));
      updateHealthBar(id);
    }
  }

  function updateHealthBar(id) {
    const health = HealthComponent.lookup(id);
    healthBars[id].setCurrentValue(health.currentHealth);
  }

  function updateStatusPanel(id, position) {
    const state = BattleSystem.getState();
    const statusPanel = position.querySelector('.status-panel');
    const statusEffects = state.getStatusEffects(id);

    X.empty(statusPanel);

    Object.entries(statusEffects).forEach(([code, effect]) => {
      const icon = X.createElement(`<div class='status-effect-icon' data-name='${effect.getName()}'></div>`)
      icon.style['background-image'] = X.assetURL(`ai-icons/${code}.png`);
      statusPanel.appendChild(icon);
    });
  }




*/