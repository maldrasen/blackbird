global.CharacterFixtures = (function() {

  // When we build a player object, we set the player entity id in the GameState. This function could take character
  // options if I wanted to test a specific player type.
  function randomPlayer() {
    const player = PlayerFactory.build({
      style:Random.from(['domination','degradation','sadism'])
    });
    GameSystem.getState().setPlayer(player);
    PartyConfiguration.addCharacter(player);
    return player;
  }

  // Creating random characters needs a player to exist in order to create their feelings. This fixture is still using
  // placeholder values for the control and feelings components. Should figure out what the default values there are.
  function randomCharacters(count, options={}) {
    const characters = []
    const player = GameSystem.getState().getPlayer();
    const location = GameSystem.getState().getCurrentLocation();

    for (let i=0; i<count; i++) {
      characters.push(CharacterFactory.build(options));
    }

    characters.forEach(id => {
      ControlledComponent.create(id,{ control:0 });
      ArousalComponent.update(id,{ arousal:Random.between(0,25) });
      GameSystem.getState().addToRoster(id);

      if (location) {
        SituatedComponent.create(id,{ currentLocation:location });
      }

      if (player) {
        FeelingsComponent.create(id,{ target:player,
          affection: Random.between(100,400),
          respect: Random.between(100,400),
          fear: Random.between(0,200)
        });
      }
    });

    return characters;
  }

  return {
    randomPlayer,
    randomCharacters,
  };

})();
