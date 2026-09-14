describe.only("Ability.CastSpell", function() {

  // The flamescale screamer is the only spellcasting monster. A single monster battle puts it at M.0.2.
  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ monster:'flamescale-screamer', ambushState:'normal' });
    return BattleSystem.getState();
  }

  it("rejects an unknown spell or a missing power level", function() {
    expect(() => Ability.CastSpell({ spell:'no-such-spell', powerLevel:1 })).to.throw('Bad spell code');
    expect(() => Ability.CastSpell({ spell:'ember' })).to.throw('CastSpell.powerLevel');
  });

  it("is named for its spell and carries the monster's cooldown and priority", function() {
    const ability = Ability.CastSpell({ spell:'searing-lance', powerLevel:3, cooldown:2000, priority:75 });

    expect(ability.getName()).to.equal('Cast Searing Lance');
    expect(ability.getCooldown()).to.equal(2000);
    expect(ability.getPriority()).to.equal(75);
    expect(ability.isPossible()).to.equal(true);
  });

  it("targets an enemy for a single target spell and nobody for a formation spell", function() {
    expect(Ability.CastSpell({ spell:'ember', powerLevel:1 }).getTargetingMode()).to.equal(TargetingMode.anyEnemy);
    expect(Ability.CastSpell({ spell:'overwhelming-effulgence', powerLevel:2 }).getTargetingMode()).to.equal(null);
  });

  // Ember is a medium cast, so power level 1 takes 1000ms before the speed factor.
  it("spends the turn starting the cast and stores the spell for the caster's next action", function() {
    const state = startBattle();
    const caster = state.getActiveMonsters()[0];
    const target = state.getEntityAtPosition('P.0.2');
    const ability = Ability.CastSpell({ spell:'ember', powerLevel:1 });

    BattleSystem.specRound(caster, { target });
    ability.execute();

    const round = BattleSystem.getRound();
    expect(round.getAbility()).to.equal(ability);
    expect(round.getTime()).to.equal(Math.ceil(1000 * round.getSpeedFactor()));
    expect(round.getMessages()[0].text).to.include('begins casting');
    expect(state.isCastingSpell(caster)).to.equal(true);

    BattleSystem.specRound(caster);
    expect(state.finishCastingSpell()).to.deep.equal({ code:'ember', powerLevel:1, target, targetPosition:'P.0.2' });
  });

});
