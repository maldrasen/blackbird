describe("EnchantmentSystem", function() {

  // The fixture rogue at P.1.2 sits in the back rank with an assassin's dagger in the primary hand and a poisoned one
  // in the off hand. The specs arm them with an assassin's dagger of their own so its chance can be pinned, replacing
  // the primary unless a slot says otherwise.
  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });
    return BattleSystem.getState();
  }

  function armRogue(state, slot=null) {
    const rogue = state.getEntityAtPosition('P.1.2');
    const options = { enchantment:{ pattern:'assassin' } };
    if (slot) { options.slot = slot; }

    return { rogue, weapon:ItemFixtures.equip(rogue, 'dagger', ['steel'], options) };
  }

  // A sneak attack spends rolls on its contest before the buff is rolled, so rather than stubbing the lot the chance
  // is pinned to an end of the d100: 100 always takes hold and 0 never does.
  function pinChance(weapon, strength) {
    const item = ItemComponent.lookup(weapon);
    item.enchantment.effects.forEach(effect => { effect.strength = strength; });
    ItemComponent.update(weapon, item);
  }

  // finishCharacterRound() requires the acting entity to be next in the turn order.
  function startCharacterRound(acting, target) {
    BattleSystem.getState().moveToTopOfTurnOrder({ type:'character', id:acting });
    BattleSystem.specRound(acting, { target });
  }

  // The command that built the ability normally ends the round, so the helper ends it itself to run the end of round
  // systems in their real order: stealth reveals the rogue before the enchantment gets its say.
  function sneakAttack(state, rogue) {
    BattleSystem.addStatus(rogue, 'hidden');
    startCharacterRound(rogue, state.getEntityAtPosition('M.0.2'));
    Ability.SneakAttack().execute();
    BattleSystem.finishCharacterRound();
    return BattleSystem.getRound().getMessages().map(message => message.text);
  }

  function getMessages() {
    return BattleSystem.getRound().getMessages().map(message => message.text);
  }

  describe("processEndRound()", function() {
    it("lets the rogue slip back into hiding after a sneak attack", function() {
      const state = startBattle();
      const { rogue, weapon } = armRogue(state);
      pinChance(weapon, 100);

      const messages = sneakAttack(state, rogue);

      expect(StatusEffects(rogue).hasHidden()).to.equal(true);
      expect(messages[messages.length - 1]).to.include('slips back into the shadows');
    });

    it("leaves the rogue revealed when the chance fails", function() {
      const state = startBattle();
      const { rogue, weapon } = armRogue(state);
      pinChance(weapon, 0);

      const messages = sneakAttack(state, rogue);

      expect(StatusEffects(rogue).hasHidden()).to.equal(false);
      expect(messages.join(' ')).to.not.include('slips back');
    });

    // The fixture's own assassin's dagger is swapped for a plain one so only the off hand carries the enchantment.
    it("sits out a sneak attack made with the other hand", function() {
      const state = startBattle();
      const { rogue, weapon } = armRogue(state, EquipmentSlot.secondary);
      ItemFixtures.equip(rogue, 'dagger', ['steel']);
      pinChance(weapon, 100);

      sneakAttack(state, rogue);

      expect(StatusEffects(rogue).hasHidden()).to.equal(false);
    });

    it("sits out an ability that isn't a sneak attack", function() {
      const state = startBattle();
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
      const state = startBattle();
      const { rogue, weapon } = armRogue(state);
      pinChance(weapon, 100);

      BattleSystem.specRound(rogue);
      EnchantmentSystem.processEndRound();

      expect(StatusEffects(rogue).hasHidden()).to.equal(false);
      expect(getMessages()).to.deep.equal([]);
    });

    it("does nothing for an actor downed during their own round", function() {
      const state = startBattle();
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
