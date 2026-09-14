describe.only("Ability.SneakAttack", function() {

  // The fixture rogues sit in the back rank with a dagger in each hand, out of reach of everything.
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

  // A hidden rogue sneak attacks the kobold in front of them, with the weapon they came with unless told otherwise.
  function sneakAttackWith(base=null) {
    const state = startBattle();
    const rogue = state.getEntityAtPosition('P.1.2');

    if (base) { BattleFixtures.equipWeapon(rogue, { base }, EquipmentSlot.primary); }
    BattleSystem.addStatus(rogue, 'hidden');
    startCharacterRound(rogue, state.getEntityAtPosition('M.0.2'));
    Ability.SneakAttack().execute();

    return { rogue, text:BattleSystem.getRound().getMessages()[0].text };
  }

  it("is a hard-hitting any-enemy strike worth 25 essence", function() {
    const ability = Ability.SneakAttack();

    expect(ability.getName()).to.equal('Sneak Attack');
    expect(ability.getTargetingMode()).to.equal(TargetingMode.anyEnemy);
    expect(ability.getEssence()).to.equal(25);
    expect(ability.getAccuracyBonus()).to.equal(1.5);
    expect(ability.getDamageBonus()).to.equal(2);
    expect(ability.getPriority()).to.equal(50);
    expect(Ability.SneakAttack({ priority:30 }).getPriority()).to.equal(30);
  });

  it("is only possible while hidden", function() {
    const state = startBattle();
    const rogue = state.getEntityAtPosition('P.1.2');

    BattleSystem.specRound(rogue);
    expect(Ability.SneakAttack().isPossible()).to.equal(false);

    BattleSystem.addStatus(rogue, 'hidden');
    expect(Ability.SneakAttack().isPossible()).to.equal(true);
  });

  it("strikes from the shadows and is revealed by it", function() {
    const { rogue, text } = sneakAttackWith();

    expect(text).to.include('sneak-attack-pierce');
    expect(StatusEffects(rogue).hasHidden()).to.equal(false);
  });

  it("picks its attack text by the weapon", function() {
    expect(sneakAttackWith('shortbow').text).to.include('sneak-attack-ranged');
    expect(sneakAttackWith('mace').text).to.include('sneak-attack-swing');
  });

});
