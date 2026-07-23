*Bug:* Our player character starts at level 0.

⟪ Random Test Seed : 2386563525 ⟫

random.js:58 Uncaught (in promise) Error: Random.from() ran out of stubbed values
    at stubbedValue (random.js:58:13)
    at Object.from (random.js:115:43)
    at Object.randomPlayer (character-fixtures.js:7:20)
    at addPlayer (battle-fixtures.js:17:38)
    at Object.prepareForBattle (battle-fixtures.js:10:5)
    at setupBattle (fixtures.js:11:20)
    at Object.startNewGame (game-system.js:20:47)
    at startFixture (main-menu.js:72:22)
    at exacto.js:58:9