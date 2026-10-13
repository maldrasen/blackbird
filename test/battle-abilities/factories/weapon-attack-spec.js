describe("Ability.WeaponAttack", function() {

  // The fixture party puts the player at P.0.2 with a longsword and a shield, and a rogue at P.1.3 with a
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

  // The speed factor comes from the species. A human's factor of 1 keeps the number of strikes a known weapon fits
  // into a second predictable whatever species the fixture rolled. A kobold's 0.87 squeezes two shots from a bow.
  function pinSpeed(id, species=SpeciesCode.human) {
    const actor = ActorComponent.lookup(id);
    actor.species = species;
    ActorComponent.update(id, actor);
  }

  // A target that can't go down never cuts the strikes short.
  function makeUnkillable(id) {
    const health = HealthComponent.lookup(id);
    health.maxHealth = 100000;
    health.currentHealth = 100000;
    HealthComponent.update(id, health);
  }

  // Every strike ends with exactly one hit or miss message. Woven text carries a marker prefix, so the hit message
  // can't be matched from its start.
  function countStrikes() {
    return BattleSystem.getRound().getMessages().filter(message => {
      return message.text.includes('Hit for') || message.color === 'miss';
    }).length;
  }

  it("carries a monster's priority", function() {
    expect(Ability.WeaponAttack().getPriority()).to.equal(50);
    expect(Ability.WeaponAttack({ priority:10 }).getPriority()).to.equal(10);
  });

  describe("isPossible()", function() {
    it("is possible for a character with a monster in reach", function() {
      const state = startBattle();

      BattleSystem.specRound(state.getEntityAtPosition('P.0.2'));

      expect(Ability.WeaponAttack().isPossible()).to.equal(true);
    });

    it("is not possible when no monster is in reach", function() {
      const state = startBattle();

      BattleSystem.specRound(state.getEntityAtPosition('P.1.3'));

      expect(Ability.WeaponAttack().isPossible()).to.equal(false);
    });

    it("is not possible without a weapon", function() {
      const state = startBattle();
      const player = state.getEntityAtPosition('P.0.2');
      const equipment = EquipmentManager(player);

      equipment.unequipItem(equipment.getSlot(EquipmentSlot.primary));
      BattleSystem.specRound(player);

      expect(Ability.WeaponAttack().isPossible()).to.equal(false);
    });

    it("is not possible while hidden", function() {
      const state = startBattle();
      const player = state.getEntityAtPosition('P.0.2');

      BattleSystem.addStatus(player, 'hidden');
      BattleSystem.specRound(player);

      expect(Ability.WeaponAttack().isPossible()).to.equal(false);
    });

    it("is not possible with a bow and an empty quiver", function() {
      const state = startBattle();
      const player = state.getEntityAtPosition('P.0.2');

      ItemSupport.equip(player, 'shortbow', ['wood']);
      BattleSystem.specRound(player);

      expect(Ability.WeaponAttack().isPossible()).to.equal(false);
    });

    it("is possible with a bow and a loaded quiver", function() {
      const state = startBattle();
      const player = state.getEntityAtPosition('P.0.2');

      ItemSupport.equip(player, 'shortbow', ['wood']);
      QuiverComponent.update(player, { ammunition:'elm-arrow', quantity:1 });
      BattleSystem.specRound(player);

      expect(Ability.WeaponAttack().isPossible()).to.equal(true);
    });

    it("lets a monster shoot a bow without a quiver", function() {
      const state = startBattle();
      const kobold = state.getEntityAtPosition('M.0.2');

      ItemSupport.equip(kobold, 'shortbow', ['wood']);
      BattleSystem.specRound(kobold, { target:state.getEntityAtPosition('P.1.2') });

      expect(Ability.WeaponAttack().isPossible()).to.equal(true);
    });

    it("checks a monster's reach against its chosen target", function() {
      const state = startBattle();
      const kobold = state.getEntityAtPosition('M.0.2');

      ItemSupport.equip(kobold, 'dagger', ['steel']);

      BattleSystem.specRound(kobold, { target:state.getEntityAtPosition('P.0.2') });
      expect(Ability.WeaponAttack().isPossible()).to.equal(true);

      BattleSystem.specRound(kobold, { target:state.getEntityAtPosition('P.1.2') });
      expect(Ability.WeaponAttack().isPossible()).to.equal(false);
    });
  });

  describe("execute()", function() {
    it("resolves a single strike from a weapon that takes the whole second", function() {
      const state = startBattle();
      const player = state.getEntityAtPosition('P.0.2');
      const kobold = state.getEntityAtPosition('M.0.2');
      const ability = Ability.WeaponAttack();

      pinSpeed(player);
      makeUnkillable(kobold);
      startCharacterRound(player, kobold);
      ability.execute();

      const round = BattleSystem.getRound();
      expect(round.getAbility()).to.equal(ability);
      expect(countStrikes()).to.equal(1);
      expect(round.getTime()).to.equal(Math.ceil(1000 * round.getSpeedFactor()));
    });

    it("fills the second with strikes from a quick weapon", function() {
      const state = startBattle();
      const player = state.getEntityAtPosition('P.0.2');
      const kobold = state.getEntityAtPosition('M.0.2');

      ItemSupport.equip(player, 'dagger', ['steel']);
      pinSpeed(player);
      makeUnkillable(kobold);
      startCharacterRound(player, kobold);
      Ability.WeaponAttack().execute();

      const round = BattleSystem.getRound();
      expect(countStrikes()).to.equal(2);
      expect(round.getTime()).to.equal(2 * Math.ceil(500 * round.getSpeedFactor()));
    });

    it("spends an arrow on every shot", function() {
      const state = startBattle();
      const player = state.getEntityAtPosition('P.0.2');
      const kobold = state.getEntityAtPosition('M.0.2');

      ItemSupport.equip(player, 'shortbow', ['wood']);
      QuiverComponent.update(player, { ammunition:'elm-arrow', quantity:3 });
      pinSpeed(player);
      makeUnkillable(kobold);
      startCharacterRound(player, kobold);
      Ability.WeaponAttack().execute();

      expect(countStrikes()).to.equal(1);
      expect(QuiverComponent.lookup(player).quantity).to.equal(2);
    });

    it("stops shooting when the quiver runs dry", function() {
      const state = startBattle();
      const player = state.getEntityAtPosition('P.0.2');
      const kobold = state.getEntityAtPosition('M.0.2');

      ItemSupport.equip(player, 'shortbow', ['wood']);
      QuiverComponent.update(player, { ammunition:'elm-arrow', quantity:1 });
      pinSpeed(player, SpeciesCode.kobold);
      makeUnkillable(kobold);
      startCharacterRound(player, kobold);
      Ability.WeaponAttack().execute();

      const round = BattleSystem.getRound();
      expect(countStrikes()).to.equal(1);
      expect(round.getTime()).to.equal(Math.ceil(1000 * round.getSpeedFactor()));
      expect(QuiverComponent.lookup(player)).to.deep.equal({ ammunition:'elm-arrow', quantity:0 });
    });

    it("fires twice with a quick bow and a stocked quiver", function() {
      const state = startBattle();
      const player = state.getEntityAtPosition('P.0.2');
      const kobold = state.getEntityAtPosition('M.0.2');

      ItemSupport.equip(player, 'shortbow', ['wood']);
      QuiverComponent.update(player, { ammunition:'elm-arrow', quantity:5 });
      pinSpeed(player, SpeciesCode.kobold);
      makeUnkillable(kobold);
      startCharacterRound(player, kobold);
      Ability.WeaponAttack().execute();

      expect(countStrikes()).to.equal(2);
      expect(QuiverComponent.lookup(player).quantity).to.equal(3);
    });

    it("lets a monster shoot without spending anything", function() {
      const state = startBattle();
      const player = state.getEntityAtPosition('P.0.2');
      const kobold = state.getEntityAtPosition('M.0.2');

      ItemSupport.equip(kobold, 'shortbow', ['wood']);
      makeUnkillable(player);
      BattleSystem.getState().moveToTopOfTurnOrder({ type:'monster', id:kobold });
      BattleSystem.specRound(kobold, { target:player });
      Ability.WeaponAttack().execute();

      expect(countStrikes()).to.be.at.least(1);
      expect(QuiverComponent.lookup(kobold).quantity).to.equal(0);
    });

    it("gets an extra strike in with a weapon in each hand", function() {
      const state = startBattle();
      const rogue = state.getEntityAtPosition('P.1.3');
      const kobold = state.getEntityAtPosition('M.0.2');

      pinSpeed(rogue);
      makeUnkillable(kobold);
      startCharacterRound(rogue, kobold);
      Ability.WeaponAttack().execute();

      const round = BattleSystem.getRound();
      expect(countStrikes()).to.equal(3);
      expect(round.getTime()).to.equal(3 * Math.ceil(500 * round.getSpeedFactor()));
    });
  });

});
