describe("Ability.NaturalAttack", function() {

  const bite = {
    name: 'Bite',
    skill: 'daggers',
    textKey: 'bite',
    damageType: DamageType.pierce,
    reach: WeaponReach.short,
    damage: [10,20],
    speed: 1000,
  };

  function startBattle(pack=BattleFixtures.runtPack()) {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...pack, ambushState:'normal' });
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
    skills.daggers = 50;
    SkillsComponent.update(attacker, skills);

    BattleSystem.addStatus(target, 'stun', { count:1 });
  }

  function lastMessage() {
    const messages = BattleSystem.getRound().getMessages();
    return messages[messages.length - 1];
  }

  it("rejects an attack without a damage range", function() {
    expect(() => Ability.NaturalAttack({ ...bite, damage:undefined })).to.throw('NaturalAttack.damage');
  });

  it("keeps a hand-set essence and passes its cooldown and bonuses through", function() {
    const ability = Ability.NaturalAttack({ ...bite,
      essence: 75,
      cooldown: 2500,
      getAccuracyBonus: () => { return 1.5; },
      getDamageBonus: () => { return 2; },
    });

    expect(ability.getEssence()).to.equal(75);
    expect(ability.getCooldown()).to.equal(2500);
    expect(ability.getAccuracyBonus()).to.equal(1.5);
    expect(ability.getDamageBonus()).to.equal(2);
    expect(ability.getTargetingMode()).to.equal(TargetingMode.enemyInWeaponRange);
  });

  describe("isPossible()", function() {
    it("is possible for a monster with its target in reach", function() {
      const state = startBattle();

      BattleSystem.specRound(state.getEntityAtPosition('M.0.2'), { target:state.getEntityAtPosition('P.0.2') });

      expect(Ability.NaturalAttack(bite).isPossible()).to.equal(true);
    });

    it("is not possible when the target is out of reach", function() {
      const state = startBattle();

      BattleSystem.specRound(state.getEntityAtPosition('M.0.2'), { target:state.getEntityAtPosition('P.1.2') });

      expect(Ability.NaturalAttack(bite).isPossible()).to.equal(false);
    });

    it("is not possible while hidden", function() {
      const state = startBattle();
      const kobold = state.getEntityAtPosition('M.0.2');

      BattleSystem.addStatus(kobold, 'hidden');
      BattleSystem.specRound(kobold, { target:state.getEntityAtPosition('P.0.2') });

      expect(Ability.NaturalAttack(bite).isPossible()).to.equal(false);
    });

    it("defers to the attack's own target check", function() {
      const state = startBattle();

      BattleSystem.specRound(state.getEntityAtPosition('M.0.2'), { target:state.getEntityAtPosition('P.0.2') });

      expect(Ability.NaturalAttack({ ...bite, canTarget:() => false }).isPossible()).to.equal(false);
    });

    it("needs a target whose body has the forced hit location", function() {
      const state = startBattle({ monster:'gnawbones' });
      const beast = state.getActiveMonsters()[0];

      BattleSystem.specRound(state.getEntityAtPosition('P.0.2'), { target:beast });

      const punch = { ...bite, reach:WeaponReach.long };
      expect(Ability.NaturalAttack({ ...punch, hitLocation:EquipmentSlot.hands }).isPossible()).to.equal(false);
      expect(Ability.NaturalAttack({ ...punch, hitLocation:EquipmentSlot.head }).isPossible()).to.equal(true);
    });
  });

  describe("execute()", function() {
    it("resolves a strike from the attack's profile", function() {
      const state = startBattle();
      const ability = Ability.NaturalAttack(bite);

      BattleSystem.specRound(state.getEntityAtPosition('M.0.2'), { target:state.getEntityAtPosition('P.0.2') });
      ability.execute();

      const round = BattleSystem.getRound();
      expect(round.getAbility()).to.equal(ability);
      expect(round.getTime()).to.equal(Math.ceil(1000 * round.getSpeedFactor()));
      expect(lastMessage().text.includes('Hit for') || lastMessage().color === 'miss').to.equal(true);
    });

    it("forces the hit location and uses its own attack text", function() {
      const state = startBattle();
      const ability = Ability.NaturalAttack({ ...bite,
        hitLocation: EquipmentSlot.head,
        getAttackText: () => { return `{A:ActingName} gnaws on {T:targetName's} {hitLocation}.`; },
      });

      BattleSystem.specRound(state.getEntityAtPosition('M.0.2'), { target:state.getEntityAtPosition('P.0.2') });
      ability.execute();

      const round = BattleSystem.getRound();
      expect(round.getContext().hitLocation).to.equal(EquipmentSlot.head);
      expect(round.getMessages()[0].text).to.include('gnaws on');
    });

    it("applies its effects on a hit and reports which of them landed", function() {
      const state = startBattle();
      const player = state.getEntityAtPosition('P.0.2');
      const kobold = state.getEntityAtPosition('M.0.2');

      let hit = null;
      let results = null;

      const ability = Ability.NaturalAttack({ ...bite,
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
