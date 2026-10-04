global.PartySelectFrame = function() {
  const frameElement = X.createElement(`<div class='party-select-frame hide'></div>`);
  const characterFrames = {};
  const characterBars = {};

  let selected = null;
  let onTarget = null;

  Object.keys(GameSystem.getState().getPartyConfiguration()).forEach(id => {
    characterFrames[id] = buildCharacterFrame(id);
    frameElement.appendChild(characterFrames[id]);
  });

  function buildCharacterFrame(id) {
    const character = Character(id);
    const element = X.createElement(`<div class='character-frame'>
      <div class='portrait'></div>
      <div class='right-side'>
        <div class='name-row'>
          <div class='name'>${character.getName()}</div>
          <ul class='status-effects'></ul>
        </div>
        <div class='health-bar'></div>
        <div class='mana-bar'></div>
        <div class='stamina-bar'></div>
      </div>
    </div>`);

    element.querySelector('.portrait').style['background-image'] = X.assetURL(character.getCardArt());

    characterBars[id] = {
      health: buildBar('health'),
      mana: buildBar('mana'),
      stamina: buildBar('stamina'),
    };

    Object.keys(characterBars[id]).forEach(type => {
      element.querySelector(`.${type}-bar`).appendChild(characterBars[id][type].getElement());
    });

    characterFrames[id] = element;
    element.addEventListener('click', () => { clickCharacter(id); });

    updateBars(id);
    updateStatusEffects(id);

    return element;
  }

  // The frame is too small for labels, so the bars are shown without their text rows.
  function buildBar(color) {
    const bar = BarDisplay({ minValue:0, maxValue:0, currentValue:0, color:color });
    bar.hideTextRow();
    return bar;
  }

  // There's only room for a single mana bar, so it shows the character's mana summed across every color.
  function updateBars(id) {
    const health = HealthComponent.lookup(id);
    const mana = Character(id).getTotalMana();
    const bars = characterBars[id];

    bars.health.setMaxValue(health.maxHealth);
    bars.health.setCurrentValue(health.currentHealth);
    bars.mana.setMaxValue(mana.max);
    bars.mana.setCurrentValue(mana.current);
    bars.stamina.setMaxValue(Math.round(Attributes(id).getMaxStamina()));
    bars.stamina.setCurrentValue(Math.round(health.currentStamina));
  }

  function updateStatusEffects(id) {
    const list = characterFrames[id].querySelector('.status-effects');
    X.empty(list);

    StatusEffects(id).list().forEach(effect => {
      const name = StatusEffectType.lookup(effect.code).getName();
      const icon = X.createElement(`<li class='status-effect-icon' data-name='${name}'></li>`);
      icon.style['background-image'] = X.assetURL(`icons/${effect.code}.png`);
      list.appendChild(icon);
    });
  }

  function update() {
    Object.keys(characterFrames).forEach(id => {
      updateBars(id);
      updateStatusEffects(id);
    });
  }

  // Clicking a character normally toggles the selection. In target mode a click always selects the character and
  // hands them to whatever is waiting for a target.
  function clickCharacter(id) {
    if (onTarget) {
      const callback = onTarget;
      cancelTargeting();
      select(id);
      return callback(id);
    }

    select(selected === id ? null : id);
  }

  function select(id) {
    if (selected) { X.removeClass(characterFrames[selected],'selected'); }
    selected = id;
    if (selected) { X.addClass(characterFrames[selected],'selected'); }
  }

  function startTargeting(callback) {
    onTarget = callback;
    X.addClass(frameElement,'target-mode');
  }

  function cancelTargeting() {
    onTarget = null;
    X.removeClass(frameElement,'target-mode');
  }

  function hide() {
    cancelTargeting();
    X.addClass(frameElement,'hide');
  }

  return {
    getElement: () => { return frameElement; },
    getSelected: () => { return selected; },
    show: () => { X.removeClass(frameElement,'hide'); },
    hide,
    startTargeting,
    cancelTargeting,
    update,
  }
}
