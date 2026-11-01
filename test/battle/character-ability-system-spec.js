describe("CharacterAbilitySystem", function() {

  // A single kobold runt at M.0.2 faces the spec party: the player in front of it with a longsword, and rogues with
  // short reach daggers at P.1.2 and P.1.3.
  function startBattle() {
    return BattleSupport.startBattle({ monster:'kobold-runt' });
  }

  describe("getCommands()", function() {
    it("offers the player in the front rank an attack but nowhere to hide", function() {
      startBattle();

      BattleSystem.specRound(BattleSupport.player());
      const commands = CharacterAbilitySystem.getCommands();

      expect(commands).to.include.members([StandardAbility.attack, StandardAbility.defend, StandardAbility.negotiate]);
      expect(commands).to.not.include(StandardAbility.hide);
      expect(commands).to.not.include(StandardAbility.sneakAttack);
      expect(commands).to.not.include(StandardAbility.pass);
    });

    it("offers a rogue in the back rank a hiding place but no attack", function() {
      startBattle();

      BattleSystem.specRound(BattleSupport.rogue());
      const commands = CharacterAbilitySystem.getCommands();

      expect(commands).to.include(StandardAbility.hide);
      expect(commands).to.not.include(StandardAbility.attack);
      expect(commands).to.not.include(StandardAbility.negotiate);
    });

    it("offers a hidden rogue a sneak attack in place of hiding", function() {
      startBattle();
      const rogue = BattleSupport.rogue();

      BattleSystem.addStatus(rogue, 'hidden');
      BattleSystem.specRound(rogue);
      const commands = CharacterAbilitySystem.getCommands();

      expect(commands).to.include(StandardAbility.sneakAttack);
      expect(commands).to.not.include(StandardAbility.hide);
    });

    it("offers only pass to a character who must pass", function() {
      startBattle();
      const player = BattleSupport.player();

      BattleSystem.addStatus(player, 'stun', { count:1 });
      BattleSystem.specRound(player);

      expect(CharacterAbilitySystem.getCommands()).to.deep.equal([StandardAbility.pass]);
    });

    // The player starts with an empty spellbook and empty mana pools, so both the spell and the mana to cast it are
    // granted here. Ember costs 2 red mana.
    it("offers cast spell once the character knows a spell they can pay for", function() {
      startBattle();
      const player = BattleSupport.player();

      BattleSystem.specRound(player);
      expect(CharacterAbilitySystem.getCommands()).to.not.include(StandardAbility.castSpell);

      SpellbookComponent.setSpell(player, 'ember', 1);
      expect(CharacterAbilitySystem.getCommands()).to.not.include(StandardAbility.castSpell);

      BattleSupport.grantMana(Mana.red, 2);
      expect(CharacterAbilitySystem.getCommands()).to.include(StandardAbility.castSpell);
    });

    it("withholds cast spell from a silenced character", function() {
      startBattle();
      const player = BattleSupport.player();

      SpellbookComponent.setSpell(player, 'ember', 1);
      BattleSupport.grantMana(Mana.red, 2);
      BattleSystem.addStatus(player, 'silence', { duration:3000 });
      BattleSystem.specRound(player);

      expect(CharacterAbilitySystem.getCommands()).to.not.include(StandardAbility.castSpell);
    });

    it("removes the negotiate command after a negotiation has been attempted", function() {
      const state = startBattle();

      BattleSystem.specRound(GameSystem.getState().getPlayer());
      expect(CharacterAbilitySystem.getCommands()).to.include(StandardAbility.negotiate);

      state.setNegotiationAttempted();
      expect(CharacterAbilitySystem.getCommands()).to.not.include(StandardAbility.negotiate);
    });
  });

});
