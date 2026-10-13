describe("EnchantmentSystem", function() {

  // The spec party's rogue at P.1.2 sits in the back rank with a plain dagger in each hand. The specs arm them with an
  // assassin's dagger so its chance can be pinned, replacing the primary unless a slot says otherwise.
  function armRogue(state, slot=null) {
    const rogue = state.getEntityAtPosition('P.1.2');
    const options = { enchantment:{ pattern:'assassin' } };
    if (slot) { options.slot = slot; }

    return { rogue, weapon:ItemSupport.equip(rogue, 'dagger', ['steel'], options) };
  }

  // A sneak attack spends rolls on its contest before the buff is rolled, so rather than stubbing the lot the chance
  // is pinned to an end of the d100: 100 always takes hold and 0 never does.
  function pinChance(weapon, strength) {
    const item = ItemComponent.lookup(weapon);
    item.enchantment.effects.forEach(effect => { effect.strength = strength; });
    ItemComponent.update(weapon, item);
  }

  // The command that built the ability normally ends the round, so the helper ends it itself to run the end of round
  // systems in their real order: stealth reveals the rogue before the enchantment gets its say.
  function sneakAttack(state, rogue) {
    BattleSystem.addStatus(rogue, 'hidden');
    BattleSupport.startCharacterRound(rogue, state.getEntityAtPosition('M.0.2'));
    Ability.SneakAttack().execute();
    BattleSystem.finishCharacterRound();
    return BattleSystem.getRound().getMessages().map(message => message.text);
  }

  function getMessages() {
    return BattleSystem.getRound().getMessages().map(message => message.text);
  }

  function armPlayer(state) {
    const player = state.getEntityAtPosition('P.0.2');
    return { player, weapon:ItemSupport.equip(player, 'longsword', ['steel'], { enchantment:{ pattern:'dualist' } }) };
  }

  function basicAttack(state, player) {
    BattleSupport.startCharacterRound(player, state.getEntityAtPosition('M.0.2'));
    Ability.WeaponAttack().execute();
    BattleSystem.finishCharacterRound();
    return getMessages();
  }

  describe("processEndRound() with a dualist's sword", function() {
    it("leaves the player poised after a basic attack", function() {
      const state = BattleSupport.startBattle();
      const { player, weapon } = armPlayer(state);
      pinChance(weapon, 100);

      const messages = basicAttack(state, player);

      expect(StatusEffects(player).hasPoised()).to.equal(true);
      expect(messages[messages.length - 1]).to.include('Poised');
    });

    it("leaves the player as they were when the chance fails", function() {
      const state = BattleSupport.startBattle();
      const { player, weapon } = armPlayer(state);
      pinChance(weapon, 0);

      basicAttack(state, player);

      expect(StatusEffects(player).hasPoised()).to.equal(false);
    });

    it("sits out an ability that isn't a basic attack", function() {
      const state = BattleSupport.startBattle();
      const { player, weapon } = armPlayer(state);
      pinChance(weapon, 100);

      BattleSystem.specRound(player, { target:state.getEntityAtPosition('M.0.2') });
      BattleSystem.getRound().setAbility(Ability.SneakAttack());
      EnchantmentSystem.processEndRound();

      expect(StatusEffects(player).hasPoised()).to.equal(false);
      expect(getMessages()).to.deep.equal([]);
    });
  });

  describe("processEndRound()", function() {
    it("lets the rogue slip back into hiding after a sneak attack", function() {
      const state = BattleSupport.startBattle();
      const { rogue, weapon } = armRogue(state);
      pinChance(weapon, 100);

      const messages = sneakAttack(state, rogue);

      expect(StatusEffects(rogue).hasHidden()).to.equal(true);
      expect(messages[messages.length - 1]).to.include('slips back into the shadows');
    });

    it("leaves the rogue revealed when the chance fails", function() {
      const state = BattleSupport.startBattle();
      const { rogue, weapon } = armRogue(state);
      pinChance(weapon, 0);

      const messages = sneakAttack(state, rogue);

      expect(StatusEffects(rogue).hasHidden()).to.equal(false);
      expect(messages.join(' ')).to.not.include('slips back');
    });

    it("sits out a sneak attack made with the other hand", function() {
      const state = BattleSupport.startBattle();
      const { rogue, weapon } = armRogue(state, EquipmentSlot.secondary);
      pinChance(weapon, 100);

      sneakAttack(state, rogue);

      expect(StatusEffects(rogue).hasHidden()).to.equal(false);
    });

    it("sits out an ability that isn't a sneak attack", function() {
      const state = BattleSupport.startBattle();
      const { rogue, weapon } = armRogue(state);
      pinChance(weapon, 100);

      BattleSystem.specRound(rogue, { target:state.getEntityAtPosition('M.0.2') });
      BattleSystem.getRound().setAbility(Ability.WeaponAttack());
      BattleSystem.getRound().addToContext('weapon', weapon);
      EnchantmentSystem.processEndRound();

      expect(StatusEffects(rogue).hasHidden()).to.equal(false);
      expect(getMessages()).to.deep.equal([]);
    });

    it("does nothing in a round with no ability", function() {
      const state = BattleSupport.startBattle();
      const { rogue, weapon } = armRogue(state);
      pinChance(weapon, 100);

      BattleSystem.specRound(rogue);
      EnchantmentSystem.processEndRound();

      expect(StatusEffects(rogue).hasHidden()).to.equal(false);
      expect(getMessages()).to.deep.equal([]);
    });

    it("does nothing for an actor downed during their own round", function() {
      const state = BattleSupport.startBattle();
      const { rogue, weapon } = armRogue(state);
      pinChance(weapon, 100);

      BattleSystem.specRound(rogue, { target:state.getEntityAtPosition('M.0.2') });
      BattleSystem.getRound().setAbility(Ability.SneakAttack());
      BattleSystem.getRound().addToContext('weapon', weapon);
      state.setCondition(rogue, BattleCondition.knockedOut);
      EnchantmentSystem.processEndRound();

      expect(StatusEffects(rogue).hasHidden()).to.equal(false);
    });
  });

});
