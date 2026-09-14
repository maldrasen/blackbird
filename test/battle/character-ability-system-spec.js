describe("CharacterAbilitySystem", function() {

  // A single kobold runt at M.0.2 faces the fixture party: the player in front of it with a longsword, and rogues
  // with short reach daggers in the back rank.
  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ monster:'kobold-runt', ambushState:'normal' });
    return BattleSystem.getState();
  }

  describe("getCommands()", function() {
    it("offers the player in the front rank an attack but nowhere to hide", function() {
      const state = startBattle();

      BattleSystem.specRound(state.getEntityAtPosition('P.0.2'));
      const commands = CharacterAbilitySystem.getCommands();

      expect(commands).to.include.members([BattleCommandCode.basicAttack, BattleCommandCode.basicDefend, BattleCommandCode.negotiate]);
      expect(commands).to.not.include(BattleCommandCode.hide);
      expect(commands).to.not.include(BattleCommandCode.sneakAttack);
      expect(commands).to.not.include(BattleCommandCode.pass);
    });

    it("offers a rogue in the back rank a hiding place but no attack", function() {
      const state = startBattle();

      BattleSystem.specRound(state.getEntityAtPosition('P.1.2'));
      const commands = CharacterAbilitySystem.getCommands();

      expect(commands).to.include(BattleCommandCode.hide);
      expect(commands).to.not.include(BattleCommandCode.basicAttack);
      expect(commands).to.not.include(BattleCommandCode.negotiate);
    });

    it("offers a hidden rogue a sneak attack in place of hiding", function() {
      const state = startBattle();
      const rogue = state.getEntityAtPosition('P.1.2');

      BattleSystem.addStatus(rogue, 'hidden');
      BattleSystem.specRound(rogue);
      const commands = CharacterAbilitySystem.getCommands();

      expect(commands).to.include(BattleCommandCode.sneakAttack);
      expect(commands).to.not.include(BattleCommandCode.hide);
    });

    it("offers only pass to a character who must pass", function() {
      const state = startBattle();
      const player = state.getEntityAtPosition('P.0.2');

      BattleSystem.addStatus(player, 'stun', { count:1 });
      BattleSystem.specRound(player);

      expect(CharacterAbilitySystem.getCommands()).to.deep.equal([BattleCommandCode.pass]);
    });

    it("removes the negotiate command after a negotiation has been attempted", function() {
      const state = startBattle();

      BattleSystem.specRound(GameSystem.getState().getPlayer());
      expect(CharacterAbilitySystem.getCommands()).to.include(BattleCommandCode.negotiate);

      state.setNegotiationAttempted();
      expect(CharacterAbilitySystem.getCommands()).to.not.include(BattleCommandCode.negotiate);
    });
  });

});
