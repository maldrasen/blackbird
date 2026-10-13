describe("Ability.SneakAttack", function() {

  // The spec party's rogue at P.1.3 sits in the back rank with a dagger in each hand, out of reach of everything.

  // A hidden rogue sneak attacks the kobold in front of them with the given weapon. An arrow is loaded in case the
  // weapon is a bow. The command that built an ability ends the round, so the helper ends it itself to see the rogue
  // revealed.
  function sneakAttackWith(base) {
    const state = BattleSupport.startBattle();
    const rogue = state.getEntityAtPosition('P.1.3');

    ItemSupport.equip(rogue, base, ['steel']);
    QuiverComponent.update(rogue, { ammunition:'elm-arrow', quantity:1 });
    BattleSystem.addStatus(rogue, 'hidden');
    BattleSupport.startCharacterRound(rogue, state.getEntityAtPosition('M.0.2'));
    Ability.SneakAttack().execute();
    BattleSystem.finishCharacterRound();

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
    const state = BattleSupport.startBattle();
    const rogue = state.getEntityAtPosition('P.1.3');

    BattleSystem.specRound(rogue);
    expect(Ability.SneakAttack().isPossible()).to.equal(false);

    BattleSystem.addStatus(rogue, 'hidden');
    expect(Ability.SneakAttack().isPossible()).to.equal(true);
  });

  it("is not possible with a bow and an empty quiver", function() {
    const state = BattleSupport.startBattle();
    const rogue = state.getEntityAtPosition('P.1.3');

    ItemSupport.equip(rogue, 'shortbow', ['wood']);
    BattleSystem.addStatus(rogue, 'hidden');
    BattleSystem.specRound(rogue);
    expect(Ability.SneakAttack().isPossible()).to.equal(false);

    QuiverComponent.update(rogue, { ammunition:'elm-arrow', quantity:1 });
    expect(Ability.SneakAttack().isPossible()).to.equal(true);
  });

  it("spends an arrow when shot from a bow", function() {
    const state = BattleSupport.startBattle();
    const rogue = state.getEntityAtPosition('P.1.3');

    ItemSupport.equip(rogue, 'shortbow', ['wood']);
    QuiverComponent.update(rogue, { ammunition:'elm-arrow', quantity:2 });
    BattleSystem.addStatus(rogue, 'hidden');
    BattleSupport.startCharacterRound(rogue, state.getEntityAtPosition('M.0.2'));
    Ability.SneakAttack().execute();

    expect(QuiverComponent.lookup(rogue).quantity).to.equal(1);
  });

  it("strikes from the shadows and is revealed by it", function() {
    const { rogue, text } = sneakAttackWith('dagger');

    expect(text).to.include('sneak-attack-pierce');
    expect(StatusEffects(rogue).hasHidden()).to.equal(false);
  });

  it("picks its attack text by the weapon", function() {
    expect(sneakAttackWith('shortbow').text).to.include('sneak-attack-ranged');
    expect(sneakAttackWith('mace').text).to.include('sneak-attack-swing');
  });

});
