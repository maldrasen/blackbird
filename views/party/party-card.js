// The card shown for a party member in the party overlay and the dungeon controls. The health bar is optional
// because the party overlay is for arranging the formation, and doesn't show it.
global.PartyCard = function(id, options={}) {

  const element = X.createElement(`<div class='entity-card party-card' data-id='${id}'>
    <div class='fill content'>
      <div class='name'></div>
      <div class='health-bar'></div>
    </div>
    <div class='fill background-cover'></div>
    <div class='fill background'></div>
  </div>`);

  element.querySelector('.name').textContent = Character(id).getName();
  element.querySelector('.background').style['background-image'] = X.assetURL(Character(id).getCardArt());

  if (options.healthBar === true) { addHealthBar(); }

  function addHealthBar() {
    const health = HealthComponent.lookup(id);

    const healthBar = BarDisplay({
      label: 'Health',
      currentValue: health.currentHealth,
      minValue: 0,
      maxValue: health.maxHealth,
      color: 'health',
    });
    healthBar.hideTextRow();

    element.querySelector('.health-bar').appendChild(healthBar.getElement());
  }

  return {
    getEntity: () => { return id; },
    getElement: () => { return element; },
  };

}
