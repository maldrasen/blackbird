global.BattleFixtures = (function() {

  // TODO: We'll need more control over the characters in the party for the tests.
  function prepareForBattle() {
    const player = CharacterFixtures.randomPlayer();
    const characters = CharacterFixtures.randomCharacters(2, { triggers:[] });

    PartyConfiguration.setCharacter(player,'0.1');
    PartyConfiguration.setCharacter(characters[0],'0.2');
    PartyConfiguration.setCharacter(characters[1],'1.1');
  }

  return Object.freeze({
    prepareForBattle,
  })

})();