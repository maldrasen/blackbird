describe("PhysicalAttackSystem", function() {

  describe("processHit()", function() {

    function endanger(species) {
      return { pattern:'endanger', properties:{ species } };
    }

    // The player at P.0.2 hits the rogue at P.1.2 in the chest with an enchanted steel longsword. The rogue is made a
    // kobold and defends with dodge, carrying neither a sword nor a shield. The attacker's strength and the rogue's
    // dodge are pinned so the stubbed rolls always mean the same thing, and the rogue's vitality is raised so a hit
    // that downs them knocks them out rather than killing them.
    function prepare(enchantment, health=100) {
      const state = BattleSupport.startBattle();
      const attacker = state.getEntityAtPosition('P',0,2);
      const target = state.getEntityAtPosition('P',1,2);

      CharacterSupport.setAttribute(attacker, Attrib.strength, 50);
      CharacterSupport.setSpecies(target, SpeciesCode.kobold);
      CharacterSupport.setSkill(target, 'dodge', 20);
      CharacterSupport.setAttribute(target, Attrib.vitality, 100);
      CharacterSupport.setHealth(target, health);

      const weapon = ItemSupport.equip(attacker, 'longsword', ['steel'], { enchantment });
      BattleSystem.specRound(attacker, { target });

      return { attacker, target, weapon };
    }

    // The stubbed values, in the order they are consumed. The between queue covers the contest and the damage: attack
    // crit roll, attack value, defend crit roll, defend value, then the damage roll. The roll queue starts with the
    // two skill improvement rolls (attack, then defend), followed by the resist roll when the enchantment fires: the
    // d20 critical band roll, the resist contest floor, the power contest floor, and the power roll. The target has
    // no shock resistance, so no roll is spent on it. The effect lands when the power total beats the resist total.
    function hit({ attacker, target, weapon }, resistRolls) {
      Random.stubBetween(50, 1, 50, 1, 80);
      Random.stubRoll(20, 20, ...resistRolls);

      const contest = PhysicalAttackContest(attacker, target);
      contest.setWeapon(weapon);
      contest.setHitLocation('chest');
      contest.roll();

      PhysicalAttackSystem.processHit(contest.getAttackRoll(), contest.getDefendRoll());
      return BattleSystem.getRound().getMessages().map(message => message.text);
    }

    it("applies the enchantment after the damage so its effects wait for the next attack", function() {
      const battle = prepare(endanger('kobold'));
      const messages = hit(battle, [10, 10, 10, 5]);

      expect(StatusEffects(battle.target).hasVulnerable()).to.equal(true);
      expect(messages.length).to.equal(2);
      expect(messages[0]).to.include('Hit for');
      expect(messages[1]).to.include('crackling sparks');
    });

    it("says nothing about the enchantment when the target resists", function() {
      const battle = prepare(endanger('kobold'));
      const messages = hit(battle, [10, 15, 10, 2]);

      expect(StatusEffects(battle.target).hasVulnerable()).to.equal(false);
      expect(messages.length).to.equal(1);
      expect(messages[0]).to.include('Hit for');
    });

    // With no resist rolls stubbed, the roll queue runs dry and throws if the enchantment tries to land anything.
    it("leaves the enchantment out of a hit on a species it doesn't endanger", function() {
      const battle = prepare(endanger('vermen'));
      const messages = hit(battle, []);

      expect(StatusEffects(battle.target).hasVulnerable()).to.equal(false);
      expect(messages.length).to.equal(1);
    });

    it("leaves an enchantment that isn't triggered on hit out of it", function() {
      const battle = prepare({ pattern:'vigilant' });
      expect(hit(battle, []).length).to.equal(1);
    });

    it("doesn't apply the enchantment to a target the hit downs", function() {
      const battle = prepare(endanger('kobold'), 1);
      const messages = hit(battle, []);

      expect(BattleSystem.getState().isDown(battle.target)).to.equal(true);
      expect(StatusEffects(battle.target).hasVulnerable()).to.equal(false);
      expect(messages[0]).to.include('Hit for');
      expect(messages[1]).to.include('knocked out');
    });
  });

});
