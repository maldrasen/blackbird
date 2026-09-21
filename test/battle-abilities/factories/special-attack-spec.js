describe("Ability.SpecialAttack", function() {

  const strike = { name:'Strike' };

  // The fixture party puts the player at P.0.2 with a longsword and a shield, and rogues in the back rank with a
  // dagger in each hand. The runt pack is a single rank of kobolds.
  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });
    return BattleSystem.getState();
  }

  // finishCharacterRound() requires the acting entity to be next in the turn order.
  function startCharacterRound(acting, target) {
    BattleSystem.getState().moveToTopOfTurnOrder({ type:'character', id:acting });
    BattleSystem.specRound(acting, { target });
  }

  // A stunned target can't defend at all, and a trained attacker with some dexterity never rolls zero, so the strike
  // always lands.
  function guaranteeHit(attacker, target) {
    const attributes = AttributesComponent.lookup(attacker);
    attributes.dexterity = 20;
    AttributesComponent.update(attacker, attributes);

    const skills = SkillsComponent.lookup(attacker);
    skills.swords = 50;
    SkillsComponent.update(attacker, skills);

    BattleSystem.addStatus(target, 'stun', { count:1 });
  }

  // Every strike ends with exactly one hit or miss message.
  function countStrikes() {
    return BattleSystem.getRound().getMessages().filter(message => {
      return message.text.includes('Hit for') || message.color === 'miss';
    }).length;
  }

  it("rejects an attack without a name", function() {
    expect(() => Ability.SpecialAttack({})).to.throw('SpecialAttack.name');
  });

  it("keeps a hand-set essence and passes its targeting mode, cooldown, and bonuses through", function() {
    const ability = Ability.SpecialAttack({ ...strike,
      targetingMode: TargetingMode.anyEnemy,
      essence: 25,
      cooldown: 2500,
      getAccuracyBonus: () => { return 1.5; },
      getDamageBonus: () => { return 2; },
    });

    expect(ability.getTargetingMode()).to.equal(TargetingMode.anyEnemy);
    expect(ability.getEssence()).to.equal(25);
    expect(ability.getCooldown()).to.equal(2500);
    expect(ability.getAccuracyBonus()).to.equal(1.5);
    expect(ability.getDamageBonus()).to.equal(2);
    expect(Ability.SpecialAttack(strike).getTargetingMode()).to.equal(TargetingMode.enemyInWeaponRange);
  });

  describe("isPossible()", function() {
    it("is not possible without a weapon", function() {
      const state = startBattle();
      const player = state.getEntityAtPosition('P.0.2');
      const equipment = EquipmentManager(player);

      equipment.unequipItem(equipment.getSlot(EquipmentSlot.primary));
      BattleSystem.specRound(player);

      expect(Ability.SpecialAttack(strike).isPossible()).to.equal(false);
    });

    it("needs a monster in reach of a character's weapon", function() {
      const state = startBattle();

      BattleSystem.specRound(state.getEntityAtPosition('P.0.2'));
      expect(Ability.SpecialAttack(strike).isPossible()).to.equal(true);

      BattleSystem.specRound(state.getEntityAtPosition('P.1.2'));
      expect(Ability.SpecialAttack(strike).isPossible()).to.equal(false);
    });

    it("reaches any position when it can target any enemy", function() {
      const state = startBattle();

      BattleSystem.specRound(state.getEntityAtPosition('P.1.2'));

      expect(Ability.SpecialAttack({ ...strike, targetingMode:TargetingMode.anyEnemy }).isPossible()).to.equal(true);
    });

    it("checks a monster's reach against its chosen target", function() {
      const state = startBattle();
      const kobold = state.getEntityAtPosition('M.0.2');

      ItemFixtures.equip(kobold, 'dagger', ['steel']);

      BattleSystem.specRound(kobold, { target:state.getEntityAtPosition('P.0.2') });
      expect(Ability.SpecialAttack(strike).isPossible()).to.equal(true);

      BattleSystem.specRound(kobold, { target:state.getEntityAtPosition('P.1.2') });
      expect(Ability.SpecialAttack(strike).isPossible()).to.equal(false);
    });

    it("defers to its own possibility check", function() {
      const state = startBattle();

      BattleSystem.specRound(state.getEntityAtPosition('P.0.2'));

      expect(Ability.SpecialAttack({ ...strike, isPossible:() => false }).isPossible()).to.equal(false);
    });
  });

  describe("execute()", function() {
    it("resolves a single strike with the primary weapon, whatever its speed", function() {
      const state = startBattle();
      const player = state.getEntityAtPosition('P.0.2');
      const kobold = state.getEntityAtPosition('M.0.2');
      const ability = Ability.SpecialAttack(strike);

      ItemFixtures.equip(player, 'dagger', ['steel']);
      startCharacterRound(player, kobold);
      ability.execute();

      const round = BattleSystem.getRound();
      expect(round.getAbility()).to.equal(ability);
      expect(countStrikes()).to.equal(1);
      expect(round.getTime()).to.equal(Math.ceil(500 * round.getSpeedFactor()));
      expect(round.getContext().weapon).to.equal(EquipmentManager(player).getSlot(EquipmentSlot.primary));
    });

    it("uses its own attack text and hands it the weapon", function() {
      const state = startBattle();
      const player = state.getEntityAtPosition('P.0.2');
      const kobold = state.getEntityAtPosition('M.0.2');

      let swung = null;

      const ability = Ability.SpecialAttack({ ...strike,
        getAttackText: (weapon, context) => { swung = weapon.getId(); return `{A:ActingName} lunges at {T:targetName}.`; },
      });

      startCharacterRound(player, kobold);
      ability.execute();

      expect(swung).to.equal(EquipmentManager(player).getSlot(EquipmentSlot.primary));
      expect(BattleSystem.getRound().getMessages()[0].text).to.include('lunges at');
    });

    it("applies its effects on a hit and reports which of them landed", function() {
      const state = startBattle();
      const player = state.getEntityAtPosition('P.0.2');
      const kobold = state.getEntityAtPosition('M.0.2');

      let hit = null;
      let results = null;

      const ability = Ability.SpecialAttack({ ...strike,
        effects: [Effect.poison({ strength:10, damage:{ x:1, d:4 } })],
        onHit: (acting, target) => { hit = { acting, target }; },
        messageForEntity: (target, landed) => { results = landed; return landed.poison ? 'Venom!' : 'Shrugged off.'; },
      });

      guaranteeHit(player, kobold);
      startCharacterRound(player, kobold);
      ability.execute();

      expect(hit).to.deep.equal({ acting:player, target:kobold });
      expect(results).to.have.property('poison');
      expect(StatusEffects(kobold).hasPoison()).to.equal(results.poison);

      const expected = results.poison ? 'Venom!' : 'Shrugged off.';
      expect(BattleSystem.getRound().getMessages().some(message => message.text.includes(expected))).to.equal(true);
    });
  });

});
