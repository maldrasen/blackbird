global.HealthFactory = (function() {

  function build() {
    const state = CharacterFactory.getState();
    const attributes = state.getAttributes();
    const health = Math.round(Random.rollDice({ x:attributes.vitality, d:10 }) * state.getSpecies().getHealthFactor());
    const stamina = Attributes(attributes).getMaxStamina();

    state.setHealth({ currentStamina:stamina, currentHealth:health, maxHealth:health });
  }

  return { build };

})();
