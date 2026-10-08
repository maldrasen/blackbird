describe("PhysicalAttackSystem", function() {

  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });
    return BattleSystem.getState();
  }

  describe("processEnchantment()", function() {

    // The player at P.0.2 swings at the kobold runt at M.0.2 with a longsword enchanted to endanger the given species.
    // Building the sword rolls for its materials and effects, so the resist stubs go in after the weapon exists.
    function prepare(species) {
      const state = startBattle();
      const attacker = state.getEntityAtPosition('P',0,2);
      const target = state.getEntityAtPosition('M',0,2);
      const weapon = ItemFixtures.equip(attacker, 'longsword', ['steel'], {
        enchantment: { pattern:'endanger', properties:{ species } },
      });

      BattleSystem.specRound(attacker, { target });
      return { weapon:Item(weapon), target };
    }

    function swing(weapon, target) {
      PhysicalAttackSystem.processEnchantment(weapon, target, { slash:40 });
      return BattleSystem.getRound().getMessages();
    }

    // The resist roll consumes the d20 critical band roll, the resist contest floor, the power contest floor, and the
    // power roll. Kobolds have no shock resistance, so no roll is spent on it. The effect lands when the power total
    // beats the resist total.
    it("applies the enchantment's effects when the target fails to resist", function() {
      const { weapon, target } = prepare('kobold');
      Random.stubRoll(10, 10, 10, 5);

      const messages = swing(weapon, target);

      expect(StatusEffects(target).hasVulnerable()).to.equal(true);
      expect(messages.length).to.equal(1);
      expect(messages[0].text).to.include('crackling sparks');
    });

    it("says nothing when the target resists", function() {
      const { weapon, target } = prepare('kobold');
      Random.stubRoll(10, 90, 10, 5);

      const messages = swing(weapon, target);

      expect(StatusEffects(target).hasVulnerable()).to.equal(false);
      expect(messages).to.eql([]);
    });

    // An empty roll stub throws if anything rolls, so these prove the pattern was never asked to resist.
    it("does nothing against a species the enchantment doesn't endanger", function() {
      const { weapon, target } = prepare('vermen');
      Random.stubRoll();

      expect(swing(weapon, target)).to.eql([]);
      expect(StatusEffects(target).hasVulnerable()).to.equal(false);
    });

    it("ignores weapons without an on hit enchantment", function() {
      const { target } = prepare('kobold');
      const mundane = ItemFixtures.buildSteel('longsword');
      const resistant = ItemFixtures.buildSteel('longsword', { enchantment:{ pattern:'resistant-to-blind' } });
      Random.stubRoll();

      expect(swing(Item(mundane), target)).to.eql([]);
      expect(swing(Item(resistant), target)).to.eql([]);
    });
  });

});
